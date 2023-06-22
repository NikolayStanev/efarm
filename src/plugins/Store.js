import { createStore } from 'vuex'

const store = createStore({
    state : () => {
        if (localStorage.getItem("state"))
            return JSON.parse(localStorage.getItem("state"));
        return {
            isLoggedIn: false,
                apiKey: 'AIzaSyAi4G8BHZV19JYCZswgCmUZw-y0Nh6h580',
        }
    },
    mutations: {

    },
})

export default store
