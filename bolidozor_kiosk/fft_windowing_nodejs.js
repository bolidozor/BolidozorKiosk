// Tento kód implementuje algoritmus FFT s okénkováním v Node.js
// Používáme knihovny 'fft-js' pro FFT a 'mathjs' pro matematické operace.

const fft = require('fft-js').fft;
const math = require('mathjs');
const net = require('net');

// Definujeme funkci pro Hannovo okno
function hannWindow(nbins) {
  const window = [];
  for (let i = 0; i < nbins; i++) {
    window.push(0.5 * (1.0 - Math.cos((2 * Math.PI * i) / (nbins - 1))));
  }
  return window;
}

// Aplikujeme okénkování na vstupní signál
function applyWindow(signal, window) {
  return signal.map((value, index) => value * window[index]);
}

// FFT analýza s okénkováním
function performFFT(signal) {
  const nbins = signal.length;
  
  // Vytvoříme Hannovo okno
  const window = hannWindow(nbins);
  
  // Aplikujeme okénko na signál
  const windowedSignal = applyWindow(signal, window);
  
  // Provedeme FFT
  const spectrum = fft(windowedSignal);

  // Převod na amplitudy v decibelech
  const amplitudes = spectrum.map((complex) => {
    const magnitude = math.sqrt(math.re(complex) ** 2 + math.im(complex) ** 2);
    return 10 * Math.log10(magnitude);
  });

  return amplitudes;
}

// Funkce pro čtení dat ze streamu
function readFromStream(stream, nbins, overlap) {
  let buffer = Buffer.alloc(0);

  stream.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);

    // Zpracování signálu, když máme dostatek dat
    while (buffer.length >= nbins * 4) { // Předpokládáme, že vstup jsou reálná čísla (float32)
      const signal = [];
      for (let i = 0; i < nbins; i++) {
        signal.push(buffer.readFloatLE(i * 4));
      }

      // Provádíme FFT na signálu
      const result = performFFT(signal);
      console.log(result);

      // Posuneme buffer o počet vzorků minus překrytí
      buffer = buffer.slice((nbins - overlap) * 4);
    }
  });

  stream.on('end', () => {
    console.log('Stream ended');
  });
}

module.exports = {
  performFFT,
  readFromStream
};

// Příklad použití s TCP socketem
if (require.main === module) {
  const client = net.createConnection({ host: 'localhost', port: 3731 }, () => {
    console.log('Connected to server');
  });

  const nbins = 256;
  const overlap = 192;
  readFromStream(client, nbins, overlap);
}