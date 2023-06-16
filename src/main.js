import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './App.vue'
import store from '@/store'
import vuetify from '@/../../shared/plugins/vuetify'

import BreakpointMixin from '@/../../shared/plugins/BreakpointMixin'
import { mapState } from 'vuex'

import router from './router'

Vue.config.productionTip = false

Vue.mixin(BreakpointMixin);
Vue.use(VueMeta)

Vue.mixin({
  computed: {
    ...mapState(['darkmode', 'page'])
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
