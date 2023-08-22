<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>
          About
        </h1>
      </v-col>
      <v-col cols="12">
        <p>
          This project was started as I found I was lacking certain tools & wanted to try and see what I could build on my own.<br />
          Ultimately, I'm hoping to develop something that the community at large can use in their games, to make it a little easier (and possible more fun!) to run PF2e games.
        </p>
        <p>
          Anyone wishing to contact me can do so through <a href="mailto:dooplan@readysetdice.com">here</a> or on Discord.<br />
          Please report any bugs found (including how you found them!) on Discord!<br />
        </p>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>
          The Team
        </h1>
      </v-col>
      <v-col cols="12">
        <p>
          <ul class="no-list-style">
            <li><v-icon>mdi-circle-small</v-icon>Dooplan - Original creator</li>
            <li><v-icon>mdi-circle-small</v-icon>TBD - might find external expertise in the future</li>
          </ul>
        </p>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>
          Patrons!
        </h1>
      </v-col>
      <v-col cols="12">
        <p>
          Special thanks to the fine folks over on Patreon for supporting this project. <br />
          Special shout-out to top patrons:
        </p>
        <p>
          <ul class="no-list-style">
            <li><v-icon color="yellow darken-1">mdi-star</v-icon>&nbsp;<span class="mt-1">AceOfOtters</span>&nbsp;<v-icon color="yellow darken-1">mdi-star</v-icon></li>
            <li><v-icon color="yellow darken-1">mdi-star</v-icon>&nbsp;<span class="mt-1">Polyhedral</span>&nbsp;<v-icon color="yellow darken-1">mdi-star</v-icon></li>
            <li><v-icon color="yellow darken-1">mdi-star</v-icon>&nbsp;<span class="mt-1">Anja Blaszczyk</span>&nbsp;<v-icon color="yellow darken-1">mdi-star</v-icon></li>
          </ul>
        </p>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>
          Special thanks
        </h1>
      </v-col>
      <v-col cols="12">
        <p>
          This section is reserved for everyone who made this website possible!
        </p>
        <p>
          <ul class="no-list-style">
            <li><v-icon>mdi-circle-small</v-icon>For allowing me to use their data, many thanks to the great people developing the <a href="https://gitlab.com/hooking/foundry-vtt---pathfinder-2e">Foundry VTT Pathfinder 2e dataset!</a></li>
            <li><v-icon>mdi-circle-small</v-icon>For allowing me to use some of her design UX ideas, I want to give a shout-out to Ashley of <a href="https://pathfinderdashboard.com/">Pathfinder 2e Dashboard!</a></li>
          </ul>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'About',
    metaInfo: {
      title: "About",
      titleTemplate: '%s | Ready Set Dice',
      htmlAttrs: {
        lang: 'en-US'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'description', content: `Ready Set Dice was created because I was struggeling with dealing with combat as a GM.
        So, I decided to create something that could take care of all my troubles,
        and decided to share it with the rest of the Pathfinder 2nd edition community.` },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    },
    computed: {
      linkcolor() { 
        return this.$vuetify.theme.dark ? 'accent--text' : 'primary--text'
      }
    }
  }
</script>

<style scoped>
.no-list-style {
  list-style-type: none;
}
</style>
