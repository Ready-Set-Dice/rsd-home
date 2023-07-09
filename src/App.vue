<template>
  <v-app>
    <v-app-bar
      app 
      color="main"
      elevation="0"
      dense
      class=""
      v-if="mobileRoute()"
    >

      <v-toolbar-title class="">
        <span
          class="text-h6 font-weight-bold accent--text"
          >Ready Set Dice</span
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
          v-model="infoMenu"
          :nudge-width="200"
          offset-x
      >
          <template v-slot:activator="{ on, attrs }">
              <v-btn 
                  small
                  icon 
                  tile
                  class="mr-1"
                  color="accent" 
                  v-bind="attrs"
                  v-on="on"
              >
                  <v-icon>mdi-information-outline</v-icon>
              </v-btn>
          </template>
          <v-card>
              <v-list dense>
                  <v-list-item link @click="license()">
                      <v-list-item-icon><v-icon>mdi-license</v-icon></v-list-item-icon>
                      <v-list-item-title>View our licenses</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="discord()">
                      <v-list-item-icon><v-icon>mdi-discord</v-icon></v-list-item-icon>
                      <v-list-item-title>Join us on Discord!</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="patreon()">
                      <v-list-item-icon><v-icon>mdi-patreon</v-icon></v-list-item-icon>
                      <v-list-item-title>Support us on Patreon!</v-list-item-title>
                  </v-list-item>
              </v-list>
          </v-card>
      </v-menu>

      <v-menu
          v-model="accountMenu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
      >
          <template v-slot:activator="{ on, attrs }">
              <v-btn 
                  small
                  icon 
                  tile
                  class="mr-1"
                  color="accent" 
                  v-bind="attrs"
                  v-on="on"
              >
                  <v-icon>mdi-account</v-icon>
              </v-btn>
          </template>
          <v-card>
              <v-list dense>
                  <v-list-item link @click="toggleDarkMode()">
                      <v-list-item-action>
                      <v-switch :value="darkmode"></v-switch>
                      </v-list-item-action>
                      <v-list-item-title>Toggle darkmode</v-list-item-title>
                  </v-list-item>
              </v-list>
          </v-card>
        </v-menu>
    </v-app-bar>

    <v-main>
      <!--  -->
      <!-- <v-slide-x-transition mode="out-in"> -->
        <router-view></router-view>
      <!-- </v-slide-x-transition> -->
    </v-main>

  </v-app>
</template>

<script>
import router from './router'
import NavigationDrawerNoAuth from '@/.shared/components/layout/NavigationDrawerNoAuth'

export default {
  components: {
    NavigationDrawerNoAuth,
  },
  mounted() {
    setTimeout(() => {
      this.$vuetify.theme.dark = this.darkmode
    }, 1)
    document.title = 'Ready Set Dice'
  },
  data: () => ({
    drawer: false,
    routes: router.options.routes,
    accountMenu: false,
    infoMenu: false,
  }),
  computed: {
    linkcolor (state) {
      return state.darkmode ? 'accent--text' : 'primary--text'
    },
    footerstyle (state) {
      return state.darkmode ? 'background: #171717' : 'background: #e5e5e5'
    },
    footerclass (state) {
      return (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') ? 'font-size: 0.6rem; font-weight:300' : 'font-size: 0.75rem; font-weight:400' 
    },
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      // this.$vuetify.theme.dark = !$vuetify.theme.dark
      this.$store.dispatch('toggleDarkMode')
    },
    license() {
      window.location.href = "https://readysetdice.com/license/";
    },
    discord() {
      window.location.href = "https://discord.gg/9gdTrgeY3X";
    },
    patreon() {
      window.location.href = "https://www.patreon.com/readysetdice";
    },
    toggleDrawer() {
      if (!!this.$refs && !!this.$refs.navBar) {
        this.$refs.navBar.toggleDrawer()
      }
    },
    mobileRoute() {
      return !!this.$route && this.$route.path != '/mobile'
    }
  }
}
</script>