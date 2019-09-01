import Vue from 'vue'
// 创建 store 状态管理
import Vuex from 'vuex'
Vue.use(Vuex)

// 每当初始化项目的时候，就先从 localStorage 中取一下数据
let car = window.JSON.parse(localStorage.getItem('cart') || '[]')

const store = new Vuex.Store({
    state: {
        cesiumInstance: null
    },
    mutations: {
        SET_CESIUMINSTANCE (state, cesiumInstance) {
            state.cesiumInstance = cesiumInstance
        }
    },
    actions: {
        async setCesiumInstance ({
                                     commit
                                 }, cesiumInstance) {
            commit('SET_CESIUMINSTANCE', cesiumInstance)
            console.log(state.cesiumInstance)
        }
    }
})

export default store