import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        mainList: null,
    },
    mutations: {
        SET_TODO: (state, value) => {
            state.mainList = value;
        },
        ADD_TODO: (state, value) => {
            state.mainList.push(value);
        },
    },
    actions: {
        GET_TODO: async (context, value) => {
            let {data} = await Axios.post(/* запрос */);
            context.commit('SET_TODO', data);
        },
        SAVE_TODO: async (context, value) => {
            let {data} = await Axios.post(/* запрос */);
            context.commit('ADD_TODO',value);
        },
    },
    getters: {
        MAINLIST: state => {
            return state.mainList;
        },
    }
});

export default store;