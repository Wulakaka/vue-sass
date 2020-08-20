import Vue from 'vue'
import App from './App.vue'
import './styles/style.scss'
import Element from 'element-ui'
import './styles/element-variables.scss'

Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
