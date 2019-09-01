import Vue from 'vue'
// 创建 store 状态管理
import Vuex from 'vuex'
Vue.use(Vuex)

// 每当初始化项目的时候，就先从 localStorage 中取一下数据


const store = new Vuex.Store({
    state: {
        cesiumInstance: null,
        isHandleShow: true
    },
    mutations: {
        SET_CESIUMINSTANCE (state, cesiumInstance) {
            state.cesiumInstance = cesiumInstance
        },
        setIsHandleShow(state, isShow){
            state.isHandleShow = isShow;
        }
    },
    actions: {
        async setCesiumInstance ({
                                     commit
                                 }, cesiumInstance) {
            commit('SET_CESIUMINSTANCE', cesiumInstance)
            console.log(state.cesiumInstance)
        }
    },
    getters: {
        // 注意：这里的 getters， 只负责 对外提供数据，不负责 修改数据，如果想要修改 state 中的数据，请 去找 mutations
        isHandleShow: function (state) {
            return state.isHandleShow
        }
        // 经过咱们回顾对比，发现 getters 中的方法， 和组件中的过滤器比较类似，因为 过滤器和 getters 都没有修改原数据， 都是把原数据做了一层包装，提供给了 调用者；
        // 其次， getters 也和 computed 比较像， 只要 state 中的数据发生变化了，那么，如果 getters 正好也引用了这个数据，那么 就会立即触发 getters 的重新求值；
    }
})

export default store