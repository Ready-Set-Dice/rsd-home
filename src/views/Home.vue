<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="mb-0 pb-0 mt-2">
        <h3>Welcome to Ready Set Dice!</h3>
      </v-col>
      <v-col cols="12" class="mb-0 pb-0">
        <p>
          An all-purpose toolset for GM's and players to speed up gameplay for
          Pathfinder 2e.<br />
          <i>All the VTT tools without the overhead of an actual VTT</i>
        </p>
      </v-col>
      <!-- TODO Add links -->
      <v-col cols="12" xs="12" sm="12" md="6" class="mt-n2 pt-0">
        <v-icon class="main-icon py-0">mdi-account-group</v-icon>
        <p>For Players</p>
        <div v-for="(pc, i) in pctools" :key="i">
          <div class="rounded-0 px-10 py-2">
            <v-card
              link
              elevation="10"
              class="rounded-lg pa-1"
              color="main lighten-2"
              :disabled="pc.disabled"
              :to="pc.route"
            >
              <v-card-text
                class="accent--text text--lighten-2"
                v-html="pc.text"
              ></v-card-text>
            </v-card>
          </div>
        </div>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" class="mt-n2 pt-0">
        <v-icon class="main-icon py-0">mdi-account</v-icon>
        <p>For Game Masters</p>
        <div v-for="(gt, i) in gmtools" :key="i">
          <div class="rounded-0 px-10 py-2">
            <v-card
              link
              elevation="10"
              class="rounded-lg pa-1"
              color="main lighten-2"
              :disabled="gt.disabled"
              :to="gt.route"
            >
              <v-card-text
                class="accent--text text--lighten-2"
                v-html="gt.text"
              ></v-card-text>
            </v-card>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="d-flex justify-center pb-1">
        <v-btn
          @click="discord()"
          class="mt-1 body-1 d-flex justify-space-between"
          width="240"
        >
          <v-avatar size="28" color="#5662f6" class="white--text ml-n2" tile>
            <v-icon small> mdi-discord </v-icon>
          </v-avatar>
          <span class="px-2">Join us on Discord!</span>
        </v-btn>
      </v-col>
      <v-col cols="12" class="d-flex justify-center pt-1 mb-5">
        <v-btn
          @click="patreon()"
          class="mt-1 body-1 d-flex justify-space-between"
          width="240"
        >
          <v-avatar size="28" color="#ff424d" class="white--text ml-n2">
            <v-icon small> mdi-patreon </v-icon>
          </v-avatar>
          <span class="px-2">Become a Patron!</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    metaInfo: {
        title: "Home",
        titleTemplate: "%s | Ready Set Dice",
        htmlAttrs: {
            lang: "en-US",
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "description",
                content: `Ready Set Dice is an all around tool fo your Pathfinder 2nd edition table! 
                Similar to a VTT like foundry, including elements like those found in PathBuilder, 
                we try to create a unique usecase for play around the table but using an app instead of 
                pen and paper to do the difficult things for you.`,
            },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
        ],
    },
    name: "Home",
    data() {
        return {
            pctools: [
            {
                text: "Character Manager:<br/>Set saving throws, skills, stats.",
                disabled: false,
                route: '/pc-character-manager'
            },
            {
                text: "Combat Tracker:<br/>See initiative, track HP and conditions.",
                disabled: false,
                route: '/pc-combat-tracker'
            },
            {
                text: "Character builder:<br/>(Under construction)",
                disabled: true,
            },
            ],
            gmtools: [
            {
                text: "Campaign Management:<br/>add and track players.",
                disabled: false,
                route: '/gm-campaign-manager'
            },
            {
                text: "Encounter Builder:<br/>Plan your future encounters.",
                disabled: false,
                route: '/gm-encounter-builder'
            },
            {
                text: "Combat Manager:<br/>initiative, HP, conditions &amp; alerts.",
                disabled: false,
                route: '/gm-combat-manager'
            },
            ],
        };
    },
    methods: {
        patreon() {
            window.location.href = "https://www.patreon.com/bePatron?u=734322";
        },
        discord() {
            window.location.href = "https://discord.gg/9gdTrgeY3X";
        },
    },
};
</script>

<style scoped>
.main-icon {
  font-size: 80px !important;
}
</style>