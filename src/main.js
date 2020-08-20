import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import './styles/style.scss'     
// import './styles/element-variables.scss'

Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
