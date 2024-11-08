<template>
  <section class="section">
  
    <div class="card stat-container">


    <div class="description">
                  <div v-if="$i18n.locale === 'cs'">
                      <div class="is-h2">Co zde vidíme?</div>
                      <p>RMOB "colorgram" histogramy ze sítě Bolidozor ukazují hodinové četnosti a variace hodnot v průběhu dne a kalendářního měsíce.</p>
                      <p>V levé části se nachází sloupcový histogram, kde každý sloupec představuje jednu denní hodinu (od půlnoci do půlnoci UTC) a jeho výška značí hodinové četnosti detekovaných meteorů.</p>
                      <p>V pravé části je graf, ve kterém každý čtvereček reprezentuje jednu hodinu. Barva čtverečku odpovídá počtu detekovaných meteorů v danou hodinu. Jeden sloupec tedy zobrazuje celý den (od půlnoci do půlnoci).</p>
                      <p>Na tomto histogramu je dobře vidět denní variace, kdy je četnost meteorů vyšší v průběhu ranních hodin, zejména při východu slunce. To je dáno geometrickou orientací Země v prostoru, kdy se Země pohybuje ve směru svého nadhlavníku. V histogramu jsou také obvykle patrné určité meteorické roje, které se projevují jako oblasti s vyšší intenzitou několik dnů za sebou ve stejnou dobu.</p>
                  </div>

                  <div v-if="$i18n.locale === 'en'">
                      <div class="is-h2">What I can see?</div>
                      <p>The RMOB "colorgram" histograms from the Bolidozor network display hourly frequencies and variations of values throughout the day and the calendar month. In the left part, there is a bar histogram where each bar represents one hour of the day (from midnight to midnight UTC), and its height indicates the hourly counts of detected meteors.</p>

<p>In the right part, there is a graph where each square represents one hour. The color of the square corresponds to the number of meteors detected during that hour. Each column, therefore, represents an entire day (from midnight to midnight).</p>

<p>This histogram clearly shows daily variations, with higher meteor counts during the morning hours, especially at sunrise. This is due to the Earth's geometric orientation in space, as the Earth moves in the direction of its apex.</p>

<p>Meteor showers are also typically visible in the histogram, appearing as areas with higher intensity over several consecutive days at the same time.</p>

                  </div>
      </div>

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
                <div class="tag is-light-primary is-medium mb-3">
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
                    :src="`https://space.astro.cz/bolidozor/support/rmob/${station.identifier}_` + new Date().toLocaleDateString('en-GB').slice(3).replace(/\//g, '') + `.svg?` + new Date()" 
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


  .stat-container {
    margin-top: 2vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    background-color: lightblue;

  }

  .stat-container img {
    width: 100%;
  
  }

  .description {
    width: 90%;
    text-align: left !important;
    color: black !important;
  }

  .description p{
    font-family: 'Arial', sans-serif;
    color: black;
    font-size: 1.2em;
    text-align: left;
    margin-bottom: 1em;
    text-align: justify;
  }

</style>
