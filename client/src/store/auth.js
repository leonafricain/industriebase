export const authModule = {
    namespaced: true,
    state:{
        user: null,
        token: null,
        isUserLoggedIn: false
    },
    mutations:{
        SET_USER (state, payload) {
            state.user = payload
        },
        SET_TOKEN (state, payload) {
            state.token = payload
        }
    },
    actions:{
        set_user ({commit}, payload) {
            commit('SET_USER', payload)
        },
        set_token({commit}, payload) {
            commit('SET_TOKEN', payload)
        }
    },
    getters:{
        GET_USER : (state) => state.user    
    }
}

