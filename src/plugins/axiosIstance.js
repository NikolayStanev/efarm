import axios from 'axios'
const httpServicePlugin = {
    install(App) {
        App.config.globalProperties.$axios = axios.create({
            baseURL: "",
            headers: []
        })
    }
};

export default httpServicePlugin;