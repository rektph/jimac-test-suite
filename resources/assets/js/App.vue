<template>
    <v-app>
        <navigation></navigation>
        <toolbar></toolbar>
            <v-content>
                <v-container fluid>
                    <transition name="fade" mode="out-in" @beforeLeave="beforeLeave" @enter="enter" @afterEnter="afterEnter">
                        <router-view></router-view>
                    </transition>
                </v-container>
            </v-content>
        <snackbar/>
    </v-app>
</template>

<script>
import Navigation from './includes/Navigation'
import Toolbar from './includes/Toolbar'
import Snackbar from './includes/Snackbar'

export default {
    name: 'App',
    components: {
        Toolbar,
        Navigation,
        Snackbar
    },
    methods: {
        beforeLeave(element) {
            this.prevHeight = getComputedStyle(element).height;
        },
        enter(element) {
            const { height } = getComputedStyle(element);
            element.style.height = this.prevHeight;
            setTimeout(() => {
                element.style.height = height;
            });
        },
        afterEnter(element) {
            element.style.height = 'auto';
        },
    }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}
.full-width {
    width: 100%;
}
</style>


