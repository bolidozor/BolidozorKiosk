<template>


<div class="card mt-5">
<h2 class="title is-2">{{ $t('home.title') }}</h2>

<img :src="require('@/assets/bz_logo_white.svg')">
<br>

<p>{{ $t('home.subtext') }}</p>
  </div> 
        

</template>
  
<script>

export default {
  name: 'HomeView',
  data() {
    return {
      stations: [
        {
          zoom: 10,
          center: [51, 15.5],
        }
      ],
    };
  },
};

</script>


<style scoped>



.title {
  font-family: 'Orbitron', sans-serif;
  color: #00ff00;
  text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 40px #00ff00;
}

.card {
  /* background-color: #1a1a1a; */
  border: 1px solid #00ff00;
  padding: 50px 20px;
  border-radius: 10px;
}


p {
  font-family: 'Arial', sans-serif;
  color: #ffffff;
  font-size: 1.2em;
}




</style>
  