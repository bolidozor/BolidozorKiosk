<template>
<div class="page-container">

<!-- Pagination Component -->
<nav class="pagination" role="navigation" aria-label="pagination">
  <span> actual page: {{ current }} </span>
  <button class="pagination-previous" :disabled="!previous" @click="goToPage(previous)">Previous</button> 
  <button class="pagination-next" :disabled="!next" @click="goToPage(next)">Next</button>
</nav>

<div v-for="group in groups" :key="group.id" class="box">
<div>{{ group.timestamp }}</div>

<!-- <table class="table is-bordered" >
    <tr style="font-weight: bold;">
        <td>Station</td>
        <td>Start time</td>
        <td>Duration</td>
        <td>Files</td>
    </tr>
    <tr v-for="event in group.events" v-bind:key="event.station">
        <td>{{ event.station.name }}</td>
        <td>{{ event.obs_start_time }}</td>
        <td>{{ event.duration }}</td>
        <td> <a :href="event.met_file.link">met</a>, <a :href="event.raw_file.link">raw</a></td>
    </tr>
</table> -->
<div class="event-container">
        <div v-for="event in group.events" :key="event.id" class="station-container">
            <span>
              <h3 class="bold">{{ event.station.name }}</h3>
              <div>{{ event.obs_start_time }} <span v-if="event.duration">({{ event.duration ? event.duration + 's' : 'N/A' }})</span> </div>
            </span>
            <img class="snapshot-image" :src="`https://rtbolidozor.astro.cz/f.png?${event.met_file.link}`" />
        </div>
</div>


</div>

<!-- Pagination Component -->
<nav class="pagination" role="navigation" aria-label="pagination">
  <span> actual page: {{ current }} </span>
  <button class="pagination-previous" :disabled="!previous" @click="goToPage(previous)">Previous</button> 
  <button class="pagination-next" :disabled="!next" @click="goToPage(next)">Next</button>
</nav>

</div>
</template>
 
<script>
import axios from 'axios'
export default {
  name: 'DataView',
    data() {
        return {
            groups: [],
            next: null,
            previous: null,
            current: 1,
        }
    },
    mounted() {
        this.getGroups('https://rtbolidozor.astro.cz/api/v1/multiStationEvent/')
    },
    methods: {
        async getGroups(url){
            axios
                .get(url)
                .then(response => {
                    console.log(response.data)
                    this.groups = response.data.results
                    this.next = response.data.next.replace('http://', 'https://')
                    this.previous = response.data.previous.replace('http://', 'https://')

                })
                .catch(error => {
                    console.log(error)
                })
        }, 
        goToPage(url) {
        if (url) {
            const urlParams = new URLSearchParams(url.split('?')[1]);
            this.current = urlParams.get('page') || 1;
            this.getGroups(url);
        }
    },
    }

}

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

.event-container {
  display: flex;
  overflow-x: auto;
  scrollbar-width: thin;
}


.station-container{display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  color: gray;
  margin: 10px;
  width: 250pt;
  justify-content: space-between;
}

img {
  min-width: 200pt;

}

.page-container{
  margin-top: 3vh;
  justify-content: center;
  max-height: 95vh;
  overflow-y: scroll;
  padding: 20px 10px;
  border-radius: 10px;
}

.box {
  background-color: #001f3fde;
  
  backdrop-filter: blur(5px);
}

</style>