import Vue from 'vue'
import Vuex from 'vuex'
import pacientes  from './pacientes/pacientes'
import login from './pacientes/login'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    pacientes,
  }
})