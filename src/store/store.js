import Vue from 'vue'
import Vuex from 'vuex'
import pacientes  from './pacientes/pacientes'
Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    pacientes,
  }
})