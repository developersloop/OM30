import { generateToken } from '@/utils'
import { $http } from '@/service/service'

const state = {
    token: null,
    isLogged: false
}
const mutations = {
    CREATE_TOKEN(state,token) {
        state.token = token
        state.isLogged = !!localStorage.getItem('token')
    }
}

const actions = {
     isLogged(context,payload) {
       return new Promise((resolve,reject) => {
            $http('users').get()
                .then(response => {
                    if (response) {
                        generateToken(payload.password)
                            .then(token => {
                                if(token == response.data[0].token) {
                                    localStorage.setItem('token', token)        
                                    context.commit('CREATE_TOKEN', token)
                                } 
                            })
                        resolve(response)
                    }
                    else reject(response)
                })
       })
    }
}

const getters = {
    token: state => state.token,
    logged: state => state.isLogged
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}