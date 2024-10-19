const { app, BrowserWindow } = require('electron');
const path = require('path');
const net = require('net');
const { performFFT, readFromStream } = require('./fft_windowing_nodejs');

//const FFT = require('fft.js');
//const fft = require('fft-js');
//const FFT = require('fft.js');

const fft = require('fft-js').fft;
const fftUtil = require('fft-js').util;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 1080,
        width: 1920,
        //width: 800,  // Základní šířka při spuštění, v případě fullscreen ignorováno
        //height: 600,  // Základní výška při spuštění, v případě fullscreen ignorováno
        //fullscreen: true,  // Spustí aplikaci ve fullscreen režimu
        frame: false,  // Skryje okno aplikace a menu řádek
        kiosk: true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: true,
          preload: path.join(__dirname, 'preload.js'),
        },
      });


  //mainWindow.setMenuBarVisibility(false);

  if (process.env.NODE_ENV !== 'production') {
    mainWindow.loadURL('http://localhost:8080');  // Vue dev server
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));  // Produkční build
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', function () {
  createWindow();

  const client = new net.Socket();
  client.connect(3731, 'localhost', () => {
    console.log('Connected to TCP server');
  });
  

  //const fft = new FFT(1024);  // FFT window size (adjust as needed)
  //const signal = new Float32Array(512);  // Buffer for incoming audio data
  //let bufferData = Buffer.alloc(0);


  const nbins = 256;
  const overlap = 192;
  let buffer = Buffer.alloc(0);


  // Zpracování příchozích dat
  client.on('data', (data) => {







    buffer = Buffer.concat([buffer, data]);

    // Zpracování signálu, když máme dostatek dat
    while (buffer.length >= nbins * 4) { // Předpokládáme, že vstup jsou reálná čísla (float32)
      const signal = [];
      for (let i = 0; i < nbins; i++) {
        signal.push(buffer.readFloatLE(i * 4));
      }

      console.log(signal);

      // Provádíme FFT na signálu
      const result = performFFT(signal);
      console.log(result);

      // Posuneme buffer o počet vzorků minus překrytí
      buffer = buffer.slice((nbins - overlap) * 4);
    }




    // const complexData = [];
    // const buffer = new DataView(data.buffer);
  
    // for (let i = 0; i < buffer.byteLength; i += 8) {
    //   // Čteme reálnou a imaginární část jako float32 (4 bajty pro každý)
    //   const real = buffer.getFloat32(i, true); // true znamená little-endian
    //   const imag = buffer.getFloat32(i + 4, true); // true znamená little-endian
    //   complexData.push([real, imag]);
    // }
  
    // // Výpočet FFT
    // const phasors = fft(complexData);
    // const magnitudes = fftUtil.fftMag(phasors);
  
    // // Převod a logaritmická škála
    // //const logMagnitudes = magnitudes.map(value => Math.log10(value) * 10);
  
    // console.log('FFT calculated:', magnitudes);

    // // Posunutí spektra
    // const halfLength = Math.floor(magnitudes.length / 2);
    // const shiftedSpectrum = magnitudes.slice(halfLength).concat(magnitudes.slice(0, halfLength));

    // mainWindow.webContents.send('fft-data', shiftedSpectrum);
















    // try {
    //   // Append incoming data to buffer
    //   bufferData = Buffer.concat([bufferData, data]);

    //   // Process data only if we have enough for a complete Float32Array (e.g., multiple of 4 bytes)
    //   while (bufferData.length >= 4) {

    //     const fft = new FFT(2048);
    //     const length = Math.floor(bufferData.length / 4) * 4;
    //     //const length = 1024;
    //     const fftSize = Math.pow(2, Math.floor(Math.log2(length / 4)));
    //     //const signal = new Float32Array(fftSize);
    //     const signal = fft.createComplexArray();

    //     // for (let i = 0; i < fftSize; i++) {
    //     //   //signal[i] = i < length / 4 ? bufferData.readFloatLE(i * 4) : 0;
    //     //   signal[2 * i] = i < length / 4 ? bufferData.readFloatLE(i * 4) : 0;
    //     //   signal[2 * i + 1] = 0
    //     // }


    //     // Perform FFT on the received signal

    //     const csignal = fft.toComplexArray(data);
    //     const spectrum = fft.createComplexArray();
    //     fft.transform(spectrum, csignal);
    //     // fft.realTransform(spectrum, signal);
    //     //fft.completeSpectrum(spectrum);

    //     console.log('FFT calculated:', spectrum);

    //     // Calculate magnitudes from the spectrum
    //     var magnitudes = new Float32Array(signal.length / 2);
    //     for (let i = 0; i < magnitudes.length; i++) {
    //       const real = spectrum[2 * i];
    //       const imag = spectrum[2 * i + 1];
    //       magnitudes[i] = Math.sqrt(real * real + imag * imag);
    //       //   magnitudes[i] = Math.abs(real);
    //     }

    //     // const polovina = Math.floor(magnitudes.length / 2);

    //     // // // Rozdělení pole na dvě části
    //     // const levaCast = magnitudes.slice(0, polovina);
    //     // const pravaCast = magnitudes.slice(polovina);
        
    //     // // // Spojení částí v opačném pořadí
    //     // magnitudes = [...pravaCast, ...levaCast].reverse() ;

        
    //   // Apply fftshift-like operation to center the FFT output
    //   const half = Math.floor(magnitudes.length / 2);

    //   // Shift the array to center the spectrum
    //   //magnitudes = magnitudes.slice(half);
    //   //magnitudes = [...magnitudes.slice(half), ...magnitudes.slice(0, half)];


    //     // Send FFT magnitudes to the renderer process via Electron IPC
    //     //console.log('FFT calculated:', magnitudes);
    //     mainWindow.webContents.send('fft-data', magnitudes);

    //     // Remove processed data from buffer
    //     bufferData = bufferData.slice(length);
    //   }
    // } catch (error) {
    //   console.error('Error processing data:', error);
    // }



    //mainWindow.webContents.send('fft-data', data);

    // console.log('Data received:', data.length);
    // for (let i = 0; i < Math.min(data.length / 4, 1024); i++) {
    //   signal[i] = data.readFloatLE(i * 2);
    // }

    // // Provedení FFT na přijatém signálu
    // const spectrum = fft.createComplexArray();
    // fft.realTransform(spectrum, signal);
    // const magnitudes = new Float32Array(1024);
    // for (let i = 0; i < 1024; i++) {
    //   const real = spectrum[2 * i];
    //   const imag = spectrum[2 * i + 1];
    //   magnitudes[i] = Math.sqrt(real * real + imag * imag);
    // }
    // console.log('FFT calculated:', magnitudes)
    // mainWindow.webContents.send('fft-data', magnitudes);

    
  });

  // Zpracování chyb
  client.on('error', (err) => {
    console.error('Socket error:', err);
  });

});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
