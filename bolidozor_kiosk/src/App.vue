<template>
  <div class="columns">

    <div class="menu column is-2" style="height: 100vh;">
      <div>
        <router-link to="/" class="button is-large is-fullwidth">
            <div class="icon" >
            <i class="fas fa-home"></i>
            
            </div>
          <div>{{ $t('home.label') }}</div>
        </router-link>
        <router-link to="/real-time-map" class="button is-large is-fullwidth">
          <div class="icon">
            <i class="fas fa-map"></i>
          </div>
          <span>{{ $t('map') }}</span>
        </router-link>
        <router-link to="/statistics" class="button is-large is-fullwidth">
          <div class="icon">
            <i class="fas fa-chart-bar"></i>
          </div>
          <span>Statistics</span>
        </router-link>
        <router-link to="/stream" class="button is-large is-fullwidth">
          <div class="icon">
            <i class="fas fa-video"></i>
          </div>
          <span>{{  $t('stream') }}</span>
        </router-link>
        <router-link to="/data" class="button is-large is-fullwidth">
          <div class="icon">
            <i class="fas fa-database"></i>
          </div>
          <span>{{ $t('our data')}}</span>
        </router-link>
        <router-link to="/about" class="button is-large is-fullwidth">
          <div class="icon">
            <i class="fas fa-cogs"></i>
          </div>
          <span>{{ $t('how it works') }}</span>
        </router-link>
        </div>
        <div style="margin: 10pt; width: 120pt;">
            <img class="languageFlag" :src="require('@/assets/flag_cz.png')" @click="changeLanguage('cs')" style="height: 50px;">
            <img class="languageFlag" :src="require('@/assets/flag_uk.png')" @click="changeLanguage('en')" style="height: 50px;">
        </div>
      </div>
      
      <div class="column is-6" style="z-index: 25; height: min-content; width: 55%;">
        <router-view  :events="events" :observatories="observatories"></router-view>
      </div>


    <div class="column is-3 card list-card" style="position: absolute; right: 0; top: 0; margin: 10px;">
      <h2 style="margin: 10px 10px 10px 0pt;">{{ $t('message.latest_events') }}</h2>
      <span v-if="last_event_duration">Last event before {{ last_event_duration }} s.</span>
      <div>
      <div v-for="event in events.slice().reverse()" :key="event" class="list-events-rows">
        {{ event.message.station }}<br>
        {{ new Date(event.timestamp).toLocaleString('cs-CZ', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}<br>
      </div>
      </div>
    </div>
  </div>



      <div class="map-container">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :zoomControl="false"
      :center=center
      paddingBottomRight="[0, 0]"
      paddingTopLeft="[0, 0]"
      maxZoom=12
      minZoom=6
    >
      <l-tile-layer
        url="https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}@2x.png?key=S2rvHICi0noDquP1bxJP"
      ></l-tile-layer>


      <l-marker
          v-for="observatory in observatories"
          :key="observatory.identifier"
          :ref="`observatoryMarker-${observatory.identifier}`"
          :lat-lng="[observatory.latitude, observatory.longitude]"
          :observatory="observatory"
          >
            <l-icon>
              <div :ref="`observatoryIcon-${observatory.identifier}`" class="circle-icon icon-inactive">

              </div>
            </l-icon>
            <l-popup> <div class="leaflet-popup-content">
                <h3 class="text-strong">{{ observatory.name }} ({{observatory.identifier}})</h3>
                <p><strong>Location: </strong> {{ observatory.location }}</p>
                <template v-for="station in observatory.stations.filter(station => station.status === 'active')" v-bind:key="station.identifier">
                <img 
                    :src="`https://space.astro.cz/bolidozor/support/rmob/${station.identifier}_` + new Date().toLocaleDateString('en-GB').slice(3).replace(/\//g, '') + `.svg`" 
                    alt="RMOB preview"
                  />
                  </template>
                    <!-- <ul v-for = "station in observatory.stations">
                        <li>{{ station.identifier }} - {{ station.name }} - {{ station.status }}</li>
                    </ul> -->
            </div> </l-popup>
        </l-marker>

    </l-map>
  </div>

</template>
<script>

import axios from 'axios';

import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  // LControlLayers,
  // LTooltip,
  LPopup,
  // LPolyline,
  // LPolygon,
  // LRectangle,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";


export default {
  name: 'App',
  data() {
    return {
      last_event_duration: 0,
      last_event: null,
      intervalId: null,
      events : [],
      observatories : [],
      socket: null,
      zoom: 7,
      center: [50.8, 15.5],
    };
  },
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LPopup,
  },
  mounted() {
      this.setupWebSocket();
      this.fetchObservatories();
      this.intervalId = setInterval(() => {
        if(this.last_event){
          this.last_event_duration = Math.round((new Date() - this.last_event)/1000);
        }
      }, 500);
    },

    computed: {
    },
    methods: {

      resetMap() {
        const map = this.$refs.map.mapObject;
        map.setView([10, 10], 8); // Nastavení mapy na uložený stav
      },

      changeLanguage(lang) {
        this.$i18n.locale = lang;
      },

      fetchObservatories() {
        axios.get('https://rtbolidozor.astro.cz/api/v1/observatories/')
        .then(response => {
          this.observatories = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the observatories:', error);
        });
      },
      setupWebSocket() {
        this.socket = new WebSocket('wss://rtbolidozor.astro.cz/ws/');

        this.socket.onopen = () => {
          console.log('WebSocket connection opened');
        };

        this.socket.onmessage = (event) => {
          let data;
          try {
            data = JSON.parse(event.data);
          } catch (e) {
            console.error('Error parsing WebSocket message:', e);
            return;
          }
          console.log('Event received:', data);
          this.$emit('meteor_event', data);
          this.handleWebSocketMessage(data);
        };

        this.socket.onclose = () => {
          console.log('WebSocket connection closed');
        };

        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
      }, 
      handleWebSocketMessage(data) {

        data.timestamp = new Date();
        this.last_event = data.timestamp;
        console.log('HandleWebsocket:', data);
        this.events.push(data);
        if (this.events.length > 10) {
          this.events.shift();
        }

        var event_obs = data.message.observatory;
        console.log('HandleWebsocket:', event_obs);
        console.log(this.observatories);
        
        const obs_object = this.observatories.find(obs => obs.identifier === event_obs);
        console.log("Maarker", obs_object);

        const refName = `observatoryIcon-${event_obs}`;
        console.log("REF", refName);
   
        // Ensure the reference exists before accessing its properties
        if (this.$refs[refName] && this.$refs[refName][0]) {
          console.log(this.$refs[refName]);
          this.$refs[refName][0].classList.remove('icon-inactive', 'icon-active');
          this.$refs[refName][0].classList.add('icon-event');

          setTimeout(() => {
            this.$refs[refName][0].classList.remove('icon-event');
            this.$refs[refName][0].classList.add('icon-active');
          }, 3000);
        } else {
          console.error(`Reference ${refName} not found.`);
        }
      
    },
  }
};
</script>


<style>
html {
  height: 100%;
  overflow: hidden;

  scrollbar-width: thin;
}

body {

  scrollbar-width: thin;
}
</style>


<style scoped>


.app {
  background-color: #001f3f; /* Dark blue background */
  color: #00d1b2; /* Neon green text */
  font-family: 'Orbitron', sans-serif; /* Sci-fi font */
  width: 100%;
  height: 100%;
}


.menu .button {
  display: grid;
  margin: 10pt;
  width: 120pt;
  height: 75pt;
  justify-content: center;
  align-items: center;
  align-content: center;
  justify-items: center;
  backdrop-filter: blur(5px);
  background-color: #001f3fba;
  z-index: 50;
}

.languageFlag {
  margin: 10pt;
  height: 75pt;
  position: relative;
  z-index: 50;
}

.menu .icon {
  display: inline-table;
}

.menu {
  background-color: #001f3f00;
  width: min-content
}

.button {
  background-color: #001f3f; /* Dark blue button background */
  border: 2px solid #00d1b2; /* Neon green border */
  color: #00d1b2; /* Neon green text */
  transition: background-color 0.3s, color 0.3s;
}

.button:hover {
  background-color: #00d1b2; /* Neon green background on hover */
  color: #001f3f; /* Dark blue text on hover */
}

.columns.is-mobile.is-centered.has-background-light {
  background-color: #001f3f; /* Dark blue background for footer */
  border-top: 2px solid #00d1b2; /* Neon green top border */
}

.column {
  text-align: center;
}

.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}


.list-card {
  z-index: 50;
  padding: 0pt;
  margin: 10pt;
  max-height: max-content;
  backdrop-filter: blur(5px);
  background-color: #001f3fe1;
}

.list-events-rows {
  margin: 0pt;
  padding: 1rem;
  border: none;
  vertical-align: left;
  color: rgb(23, 184, 23);
}

.list-events-rows:nth-child(odd) {
  background-color: #31506b61;
}

.list-events-rows:nth-child(even) {
  background-color: #1835425f;
}











.map-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

@keyframes blink {
  0%, 50%, 100% {
    opacity: 1;
    size: 2em;
  }
  25%, 75% {
    opacity: 0;
    size: 2.5em;
  }
}

  #map-container {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  }

  .section {
    padding: 0% !important;
  }

  l-marker {
    color: blue;
  }

  .circle-icon {
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    border: 1px solid rgb(168, 168, 168);
    background-color: lightgrey;
    /* center position */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .icon-inactive {
    width: 1.5em;
    height: 1.5em;
    border-color: rgb(168, 168, 168);
    background-color: lightgrey;
  }

  .icon-active {
    width: 1.6em;
    height: 1.6em;
    border-color: rgb(168, 168, 168);
    background-color: rgb(73, 192, 231); /* light blue bit darker */
  }

  .icon-event {
    width: 1.75em;
    height: 1.75em;
    background-color: lightgreen;
    border-color: grey;
    animation: blink 1s infinite;
  }

</style>