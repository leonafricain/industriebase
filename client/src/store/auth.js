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
            if(payload) {
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
       
    },
    actions:{
        set_user ({commit}, payload) {
            commit('SET_USER', payload)
        },
        set_token({commit}, payload) {
            commit('SET_TOKEN', payload);
        },
        logout ({commit},) {
            if (this.state.isUserLoggedIn) {
                localStorage.removeItem('set_token')
            }
            commit('SET_USER', null);
            commit('SET_TOKEN', null)
        },
        logoutExpToken({commit}) {
            commit('SET_USER', null)
        }
        
    },
    getters:{
        GET_USER : (state) => state.user    
    }
}

