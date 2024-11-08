<template>
  <section class="section">
    <div class="container stat-container">

      <span
        v-for="observatory in observatories"
        v-bind:key="observatory.name"
      >
      
      <div class="card-content">
        <div class="content">
          <template v-if="observatory.stations.some(station => station.status === 'active')">
                
                              <p class="mt-3" style="color: rgb(105 45 115);">{{observatory.identifier}}, {{observatory.name}} <br> {{ observatory.location }}</p>
              <div 
                class="station m-1"
                v-for="station in observatory.stations.filter(station => station.status === 'active')"
                v-bind:key="station.identificator"
              >
                <div class="tag is-llight-primary is-medium mb-3">
                  <b>{{station.identifier}}</b>
                  <span 
                    class="tag ml-2" 
                    :class="{
                      'is-success': ['active'].includes(station.status),
                      'is-warning': ['maintenance', 'updating'].includes(station.status),
                      'is-danger': ['error'].includes(station.status),
                      'is-dark': ['pending', 'retired'].includes(station.status)
                    }"
                  >
                  {{ station.status }}
                  </span>
                </div>

                <div v-if="station.status === 'active'">
                  <img 
                    :src="`https://space.astro.cz/bolidozor/support/rmob/${station.identifier}_` + new Date().toLocaleDateString('en-GB').slice(3).replace(/\//g, '') + `.svg`" 
                    alt="RMOB preview"
                  />
                </div>
              </div>
            </template>
              </div>
              </div>
      </span>

    </div>
  </section>
</template>
 
<script>
import axios from 'axios'
export default {
  name: "StatisticsView",
  data() {
    return {
      observatories: []
      }
  },
  components: {
  },
  mounted() {
    this.getStationsTree()
  },
  methods: {
    getStationsTree(){
      axios
        .get('https://rtbolidozor.astro.cz/api/v1/observatories/')
        .then(response => {
          console.log("Prijal jsem stanice.. ")
          console.log(response.data)
          this.observatories = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
};
</script>

<style scoped>
  .card {
    border: 1px solid #00ff00;
    padding: 20px;
    border-radius: 10px;
  }

  p {
    font-family: 'Arial', sans-serif;
    color: #ffffff;
    font-size: 1.2em;
    text-align: left;
    margin-bottom: 1em;
  }

  .stat-container {
    margin-top: 10vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-height: 80vh;
    overflow-y: scroll;
    scrollbar-width: none;

    border: 1px solid #0550c2;
    padding: 20px 10px;
    border-radius: 10px;
    background-color: #cde3f9ba;
    backdrop-filter: blur(5px);
    color: rgb(38, 38, 71);
  }

  .stat-container img {
    width: 100%;
  
  }

</style>