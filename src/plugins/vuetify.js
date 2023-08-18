import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as styles from 'vuetify/styles'
import colors from 'vuetify/lib/util/colors'


const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#eeeeee',
        surface: '#eeeeee',
        primary: '#eeeeee',
        'primary-darken-1': '#3700B3',
        secondary: '#519610',
        'secondary-darken-1': '#ffa600',
        orange: '#ff8f00'
    }
}


export default createVuetify({
    components,
    directives,
    styles,
    colors,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        }
    },
    defaults: {
        VBtn: {
            color: 'primary',
        },
    },
})
