<template>


<div class="card mt-5">
<h2 class="title is-2">Welcome to Bolidozor kiosk</h2>
<p>Here you can see the latest data from the Bolidozor network.</p>
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
  padding: 20px;
  border-radius: 10px;
}


p {
  font-family: 'Arial', sans-serif;
  color: #ffffff;
  font-size: 1.2em;
}




</style>
  