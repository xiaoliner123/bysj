import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        data:{
            name:'1'
        }
    },
    mutations:{
        SET_TITLE(state,data){
            state.title = data
        }
    },
    actions:{
        set_title:({commit},data) =>{
            commit('SET_TITLE',data)
        }
    },
    getters:{
        getTitle:state =>{
            return state.title
        }
    }
})