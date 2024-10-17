<template>
  <div class="container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      class="czech-map"
    >
      <!-- Zjednodušený obrys České republiky -->
      <path
        d="M200,100 C300,50 400,50 400,200 C400,300 300,400 200,350 C100,300 100,200 200,100 Z"
        fill="none"
        stroke="#00aaff"
        stroke-width="4"
      />

      <!-- Tečky reprezentující stanice -->
      <circle v-for="(station, index) in stations" :key="index"
        :cx="station.x"
        :cy="station.y"
        r="10"
        class="station"
      />
    </svg>
  </div>
</template>
 
<script>
export default {
  name: "CzechMap",
  data() {
    return {
      stations: [
        { x: 150, y: 150 }, // Umístění teček (můžete je nahradit přesnými souřadnicemi)
        { x: 250, y: 250 },
        { x: 350, y: 150 },
      ],
    };
  },
};
</script>

<style scoped>
.czech-map {
  width: 100%;
  height: auto;
  max-width: 500px;
  margin: 0 auto;
  background-color: #001f3f;
  border: 1px solid #00aaff;
}

/* Animace blikání teček */
.station {
  fill: #00aaff;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
}
</style>