<template>



<div class="card mt-5">
    <h1>Live Data Stream</h1>

    <h3>Station: No station connected.</h3>
    <canvas id="waveformCanvas" width="1000" height="0"></canvas>
  </div>
</template>


<script>
import { CircularBuffer } from './CircularBuffer'; // Import kruhového bufferu
// import FFT from 'fft.js'; // Import knihovny FFT

export default {
  data() {
    return {
      tcpData: null,
      fftData: null,
      //actualrow: 0,

      ringbuf: null,  // Zde uložíme náš kruhový buffer
      nbins: 1024,    // Velikost FFT
      overlap: 256,   // Překryv dat
      spectrum: null  // Výstupní spektrum
    };
  },
  created() {
    this.ringbuf = new CircularBuffer(this.nbins);  // Inicializace kruhového bufferu
  },
  mounted() {
    if (window.electronAPI) {
      window.electronAPI.onFFTData((event, data) => {
        //console.log('FFT data received:', data);
        this.drawWaveform(data);  // Zde můžete aktualizovat stav a vizualizovat data
        // Zde můžete aktualizovat stav a vizualizovat data
      });
    } else {
      console.error('electronAPI is not defined');
    }
  },
    methods: {
        drawWaveform(data) {
            // data = new Float32Array(1024).map(() => Math.random() * 2 - 1); 
            const canvas = document.getElementById('waveformCanvas');

            const width = canvas.width;
            const step = width / data.length; 
            const ctx = canvas.getContext('2d');

            // Shift canvas down
            const imageData = ctx.getImageData(0, 0, canvas.width, 1000);
            ctx.putImageData(imageData, 0, 2);
            
            //ctx.clearRect(0, 0, canvas.width, canvas.height);
            //ctx.beginPath();
            //ctx.moveTo(0, this.actualrow);
            for (let i = 0; i < data.length; i++) {

                const value = Math.log10((data[i] + 1)) * 10; // Apply stronger logarithm to the value
                
                const color = `rgb(${Math.floor(value * 255)}, 0, ${Math.floor((1 - value) * 255)})`;
                //const hue = (1 - value) * 240; // Hue from blue (240) to red (0)
                //const color = `hsl(${hue}, 100%, 50%)`;
                ctx.fillStyle = color;
                
                ctx.fillRect(i * step, 0, step, 2);
            }
            //this.actualrow += 1;
            //ctx.stroke();

        },

    //     calculateFFT(frame) {
    // const fft = new FFT(this.nbins);
    // const out = fft.createComplexArray();
    // const signal = fft.createComplexArray();

    // // Převod Uint8Array na Float32Array
    // const floatFrame = new Float32Array(frame.length);
    // for (let i = 0; i < frame.length; i++) {
    //     floatFrame[i] = frame[i];  // Jednoduchý převod na float
    // }

    // // Naplnění signálu reálnými daty (imaginární část bude nula)
    // for (let i = 0; i < floatFrame.length; i++) {
    //     signal[2 * i] = floatFrame[i];   // Reálná složka
    //     signal[2 * i + 1] = 0;      // Imaginární složka
    // }

    // // Provedení FFT na reálném signálu
    // fft.realTransform(out, signal);

    // // Výpočet magnitudy
    // const magnitudes = [];
    // for (let i = 0; i < this.nbins; i++) {
    //     const real = out[2 * i];
    //     const imag = out[2 * i + 1];
    //     const magnitude = Math.sqrt(real * real + imag * imag);
    //     magnitudes.push(magnitude);
    // }


    //     // Posun spektra, aby nízké frekvence byly uprostřed
    //     const shiftedSpectrum = magnitudes.slice(this.nbins / 2).concat(magnitudes.slice(0, this.nbins / 2));

    //     // Převod do logaritmické škály
    //     const logSpectrum = shiftedSpectrum.map(mag => Math.log10(mag) * 10);

        //return logSpectrum;
       // }
    }
};



</script>