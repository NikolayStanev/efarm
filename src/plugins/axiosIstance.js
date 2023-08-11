import axios from 'axios'
const httpServicePlugin = {
    install(App) {
        App.config.globalProperties.$axios = axios.create({
            baseURL: "https://app.efarmbg.com/backend/",
            headers: ["Content-type:application/json"]
        })
    }
};

export default httpServicePlugin;