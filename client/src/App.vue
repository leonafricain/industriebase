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
        items: [{
            icon: "mdi-contacts",
            text: "Contacts"
          },
          {
            icon: "mdi-history",
            text: "Frequently contacted"
          },
          {
            icon: "mdi-content-copy",
            text: "Duplicates"
          },
          {
            icon: "mdi-chevron-up",
            "icon-alt": "mdi-chevron-down",
            text: "Labels",
            model: true,
            children: [{
              icon: "mdi-plus",
              text: "Create label"
            }]
          },
          {
            icon: "mdi-chevron-up",
            "icon-alt": "mdi-chevron-down",
            text: "More",
            model: false,
            children: [{
                text: "Import"
              },
              {
                text: "Export"
              },
              {
                text: "Print"
              },
              {
                text: "Undo changes"
              },
              {
                text: "Other contacts"
              }
            ]
          },
          {
            icon: "mdi-settings",
            text: "Settings"
          },
          {
            icon: "mdi-message",
            text: "Send feedback"
          },
          {
            icon: "mdi-help-circle",
            text: "Help"
          },
          {
            icon: "mdi-cellphone-link",
            text: "App downloads"
          },
          {
            icon: "mdi-keyboard",
            text: "Go to the old version"
          }
        ]
      }
    },
    methods: {
      goTo(route) {
        if (route !== this.$route.name) {
          this.$router.push(route)
        }
      }
    }

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

 