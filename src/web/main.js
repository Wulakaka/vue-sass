import Vue from "vue";
import App from "./App.vue";
import Element from "element-ui";
import "@/styles/element-variables.scss";
import "@/styles/style.scss";

Vue.use(Element);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
