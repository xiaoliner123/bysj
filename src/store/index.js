import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        data:{
            title:'',
            userinfo:{
                username:'',
                password:''
            }
        }
    },
    mutations:{
        SET_TITLE(state,data){
            state.title = data
        },
        SET_USERINFO(state,data){
            state.data.userinfo = data
        }
    },
    actions:{
        set_title:({commit},data) =>{
            commit('SET_TITLE',data)            
        },
        set_userinfo:({commit},data) =>{
            commit('SET_USERINFO',data)
        }
    },
    getters:{
        getTitle:state =>{
            return state.data.title
        },
        getUserinfo:state =>{
            return state.data.userinfo

        }
    }
})