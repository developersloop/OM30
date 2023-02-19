import Vue from 'vue'
import { $http } from '@/service/service'

const state = {
    patients: []
}

const mutations = {
    CREATE_PATIENT(state, payload) {
        Vue.set(state, 'patients', [...payload])
    }
}
const actions = {
    storePatient(context = null,  payload) {
        return new Promise((resolve,reject) => {
            $http('patients', 'POST').request({
                data: payload
            })
                .then(resp => {
                    if(resp) {
                        console.log(resp)
                        resolve(resp)
                    }
                    else reject(resp)
                })
        })
    },
    listPatients(context) {
        return new Promise((resolve,reject) => {
            $http('patients').get()
                .then(resp => {
                    if(resp) {
                        context.commit('CREATE_PATIENT', resp.data)
                        resolve(resp)
                    }
                    else reject(resp)
                })
        })
    },
    deletePatient(context = null, id) {
        return new Promise((resolve,reject) => {
            $http(`patients/${id}`).delete()
                .then(resp => {
                    if(resp) resolve(resp)
                    else reject(resp)
                })
        })
    }
}
const getters = {
    patients: state => state.patients
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}