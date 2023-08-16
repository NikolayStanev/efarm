import { createStore } from 'vuex'

const store = createStore({
    state : () => {
        if (localStorage.getItem("state"))
            return JSON.parse(localStorage.getItem("state"));
        return {
            isLoggedIn: false,
                apiKey: 'AIzaSyAi4G8BHZV19JYCZswgCmUZw-y0Nh6h580',
                mapViewPoint: {
                    lat: String,
                    lang: String
                },
        }
    },
    mutations: {
        changeMapView (state,langLat) {
            // mutate state
            state.mapViewPoint = {}
            state.mapViewPoint.lat = langLat[1]
            state.mapViewPoint.lang = langLat[0]
        }
    },
})

export default store
