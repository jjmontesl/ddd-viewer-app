import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/styles/main.sass'
// import colors from 'vuetify/es5/util/colors'
// import VuetifyConfirm from 'vuetify-confirm'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

const theme = JSON.parse(localStorage.getItem('dark')) || false
const opts = {
    theme: {
        theme: {
            dark: theme !== false
        },
        themes: {
            light: {
                primary: "#7CB1D6",
                secondary: "#9ED461",
                accent: "#F6ED71",
                error: "#EB8477",
            }
        },
    },

    iconfont: 'mdi'
};

export default new Vuetify(opts)
