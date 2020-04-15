import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./assets/css/bulma.scss";

Vue.config.productionTip = false;

// Setup Font Awesome
Vue.component("font-awesome-icon", FontAwesomeIcon);

// Setup Apollo
Vue.use(VueApollo);
const apolloClient = new ApolloClient({
  uri: process.env.API_URL,
  request: (operation) => {
    const token = localStorage.getItem("jwt");
    if (!!token) {
      operation.setContext({
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
    }
  },
});
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
