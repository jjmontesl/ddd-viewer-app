import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/styles/main.sass'
// import colors from 'vuetify/es5/util/colors'
// import VuetifyConfirm from 'vuetify-confirm'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

// const theme = JSON.parse(localStorage.getItem('dark')) || false
const opts = {
    theme: {
        theme: {
            // dark: theme !== false
            dark: false
        },
        themes: {
            light: {
                primary: "#419D78",
                secondary: "#69FF5C",
                accent: "#FF6947",
                info: "#2D3339",
                corporative: "#473D57",
                white: "#FFFFFF",
                cream: "#F7F2C8",
                error: "#BE3749"
            }
        },
    },

    iconfont: 'mdi'
};

export default new Vuetify(opts)
