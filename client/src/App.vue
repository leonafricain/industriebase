<template>
  <v-app>
    <nav-bar />
    <v-content>
      <v-container fluid class="ma-0 pa-0">
          <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    components: {
      'nav-bar': () => import('./components/AppNavbar.vue')
    },
    data() {
      return {
        drawer: false,
        
      }
    },
    methods: {
      goTo(route) {
        if (route !== this.$route.name) {
          this.$router.push(route)
        }
      }
    },
 };
</script>
<style lang="scss">
  .fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease-out;
}
.fade-enter-active{
  transition-delay: .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  /* //transform: translateX(10px) */
}

 