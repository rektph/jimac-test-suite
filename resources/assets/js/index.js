require('./bootstrap');

import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCookies from 'vue-cookies'
import router from './router'
import store from './store'
import App from './App'
import checkAuth from './utils/authHas'

Vue.use(Vuetify)
Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.prototype.$checkAuth = checkAuth

VueCookies.config('30d')

router.beforeEach((to, from, next) => {
    if(checkAuth(to.meta.auth, store.state.auth.user.auth)) {
        if(!VueCookies.isKey('testCaseTitle') && to.name == "Module Maintenance") {
            next('/dashboard')
            return
        }
        store.commit('extras/setToolbarTitle', {name : to.name})
        next()
    } else {
        if(checkAuth(store.state.auth.user.auth, [-1, 1, 2, 3, 4])) {
            if(checkAuth(store.state.auth.user.auth, [1])) {
                next('/dashboard')
            }
        } else {
            next('/')
        }
    }
})
document.getElementById('loading').style.display = 'inline-block'
axios.post(store.state.extras.baseUrl + 'api/sessioncheck', {
    token: VueCookies.isKey('token') ? VueCookies.get('token') : ''
}).then((res) => {
    document.getElementById('loading').style.display = 'none'
    if(!res.data.status) {
        // Add Error message
        return
    } else if(res.data.status == 2) {
        this.$store.commit('snackbar/showError', { "text" : res.data.message })
    }

    store.commit('auth/setUser', {user:res.data.user})
    new Vue({
        el: '#app',
        router,
        store,
        components: { App },
        template: '<App/>'
    })
}).catch((e) => {
    //Internal Server Error
})