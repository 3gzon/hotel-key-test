import Vue from 'vue'
import Vuex from 'vuex'
import { setLocalStorage, getLocalStorage } from '@/core/utils'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        listUser: getLocalStorage('userList') ? getLocalStorage('userList') : []
    },
    mutations: {
        updateUser(state, user) {
            if (!user.isEdit) {
                state.listUser.push(user)
            } else {
                const editUser = state.listUser.find((item) => { return item.id === user.id })
                editUser.name = user.name
                editUser.email = user.email
                editUser.birthday = user.birthday,
                    editUser.gender = user.birthday
            }
            setLocalStorage('userList', state.listUser)
        },
        deleteUser(state, user) {
            state.listUser.splice(user.index, 1)
            setLocalStorage('userList', state.listUser)
        }
    },
    actions: {
        updatelistUser({ commit }, data) {
            commit('updateUser', data.user)
        },
        deleteStoreUser({ commit }, data) {
            commit('deleteUser', data.user)
        }
    },
    modules: {}
})