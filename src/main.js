import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import Vuetify from "vuetify";

import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(Vuetify);

import "vuetify/dist/vuetify.min.css";

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
