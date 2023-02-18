import { $http } from '@/service/service'

const state = {
    patients: []
}

const mutations = {
    CREATE_PATIENT(state, payload) {
        state.patients = [...payload]
    }
}
const actions = {
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