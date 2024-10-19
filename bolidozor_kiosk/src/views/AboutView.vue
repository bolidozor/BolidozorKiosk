<template>
    <section>
      
    <div class="card mt-5">
    <div v-if="$i18n.locale === 'cs'">
      <p>Bolidozor je síť monitorující meteory prostřednictvím rádiového odrazu signálů od ionizovaného plynu, který vzniká při průletu meteorů atmosférou. Využívá vysílače francouzského radarového systému GRAVES, který nepřetržitě vysílá rádiové signály. Když meteor vstoupí do atmosféry, ionizuje okolní vzduch, čímž vzniká krátkodobá ionizovaná stopa schopná odrazit rádiové vlny. Tyto odražené vlny jsou zachycovány přijímači rozmístěnými na různých místech ve střední Evropě.</p>

      <img :src="require('@/assets/meteor_detection.png')">

      <p>Každá stanice Bolidozor je komplexní zařízení. Obsahuje GPS přijímač pro přesnou synchronizaci času a citlivou anténu typu ground plane, která je naladěna na frekvence signálů z GRAVES. Díky této konfiguraci lze zaznamenat i slabé odrazy od meteorů. Systém v reálném čase zpracovává přijaté signály a v datech detekuje meteory. Data ze stanic jsou průběžně odesílána na centrální server, kde jsou dále analyzována a zveřejňována na webových stránkách.</p>
      
        <div class="image-container">
          <div class="image-wrapper">
            <img :src="require('@/assets/station.jpg')" alt="Station" style="width: 45vw;" />
            <span>Detekční stanice sítě Bolidozor RMDS02D</span>
          </div>
          <div class="image-wrapper">
            <img :src="require('@/assets/antenna.jpg')" alt="Antenna" style="width: 45vw;" />
            <span>Anténa, která se používá pro příjem signálu</span>
          </div>
        </div>

      <p>Každá stanice je navržena tak, aby mohla fungovat automaticky a dlouhodobě bez potřeby zásahu obsluhy.</p>

      <p>Klíčovou výhodou sítě Bolidozor je schopnost detekovat i malé meteory, které by jinými metodami mohly zůstat nepovšimnuté. Na rozdíl od optických systémů, které jsou závislé na dobrých povětrnostních podmínkách a viditelnosti, Bolidozor může nepřetržitě operovat bez ohledu na počasí nebo denní dobu.</p>

      <p>Síť má široké možnosti využití. Kromě astronomického výzkumu lze data z Bolidozoru využít také pro vzdělávací účely. Otevřená architektura sítě umožňuje amatérským radioastronomům připojit se a sdílet svá data s odbornou komunitou. Bolidozor je tedy nejen užitečný nástroj pro vědecký výzkum, ale i přístupná platforma pro nadšence a vzdělávací instituce.</p>
    </div>

    <!-- Obsah pro anglický jazyk -->
    <div v-if="$i18n.locale === 'en'">
      <p>Bolidozor is a network that monitors meteors using radio waves reflected from ionized gas created when meteors pass through the atmosphere. The system uses transmitters from the French radar system GRAVES, which constantly sends out radio signals. When a meteor enters the atmosphere, it ionizes the surrounding air, creating a short-lived ionized trail that can reflect radio signals. These reflected waves are captured by our receivers, which are placed at various locations in Central Europe.</p>

      <img :src="require('@/assets/meteor_detection.png')">
      <p>Each Bolidozor station is a complex device. It includes a GPS receiver for time synchronization and a sensitive ground plane antenna, which is tuned to the frequency of the signals from GRAVES. With this setup, even weak meteor reflections can be detected. The system processes the signals in real time and detects meteors in the data. The data from each station is continuously sent to a central server, where it is analyzed and published on the website.</p>


        <div class="image-container">
          <div class="image-wrapper">
            <img :src="require('@/assets/station.jpg')" alt="Station" style="width: 45vw;" />
            <span>Detection station of the Bolidozor network RMDS02D</span>
          </div>
          <div class="image-wrapper">
            <img :src="require('@/assets/antenna.jpg')" alt="Antenna" style="width: 45vw;" />
            <span>Antenna used for signal reception</span>
          </div>
        </div>

      <p>Each station is designed for fully automatic operation and long-term stability.</p>

      <p>The key advantage of the Bolidozor network is its ability to detect even small meteors, which might go unnoticed by other methods. Unlike optical systems, which depend on clear weather and visibility, Bolidozor can operate continuously, regardless of weather or time of day.</p>

      <p>The network has many potential uses. Besides astronomical research, Bolidozor data can be used for educational purposes. The open architecture of the network also allows amateur radio astronomers to join and share data with the scientific community. Bolidozor is not only a valuable tool for scientific research, but also an accessible platform for enthusiasts and educational institutions.</p>
    </div>
  </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
  };


  </script>

  <style scoped>
  .card {
    border: 1px solid #00ff00;
    padding: 20px;
    border-radius: 10px;
    max-height: 95vh;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  p {
    font-family: 'Arial', sans-serif;
    color: #ffffff;
    font-size: 1.2em;
    text-align: left;
    margin-bottom: 1em;
  }


  .image-container {
  display: flex;
  justify-content: center; /* Středí obrázky */
  gap: 20px; /* Mezera mezi obrázky */
}

.image-wrapper {
  text-align: center; /* Středí text pod obrázkem */
  color: rgb(82, 82, 82);
  text-size-adjust: 0.8;
}

  </style>
  