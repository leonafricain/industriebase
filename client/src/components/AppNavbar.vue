<template>
  <div>
    <v-app-bar app dense color="#6A76AB" dark src="../assets/usine.jpg">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top left, rgba(100,115,201,.5), rgba(25,32,72,.7)"></v-img>
      </template>

      <span class="titre">Desk Manage</span>
      <v-spacer></v-spacer>

      <!-- <span v-if="!loggedIn" class="caption font-weight-bold"> {{nameLoggedIn}}</span> -->
      <!-- <div v-if="loggedIn">
                        {{nameLoggedIn}}
      </div>-->
      <v-btn v-if="loggedIn" text @click="logout">
        <v-icon dark size="18">mdi-logout</v-icon>Exit
      </v-btn>

      <!--  <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-if="$store.state.user" text @click="logout">
                        <v-icon dark v-on="on" size="18">mdi-logout</v-icon>
                    </v-btn>
                </template>
                <span>quitter</span>
      </v-tooltip>-->

      <div v-if="!loggedIn">
        <v-btn text to="/login">
          <v-icon size="18">mdi-login</v-icon>
          <span class></span>
        </v-btn>
        <v-btn text to="/register">
          <v-icon size="18">mdi-account-plus</v-icon>
          <span class>Register</span>
        </v-btn>
      </div>

      <template v-slot:extension>
        <v-tabs align-with-title v-model="tab">
          <v-tab @click="goTo('home')">
            <a class="v-btn white--text font-weight-bold">
              <v-icon left size="20">mdi-home</v-icon>
              <span clas s="font-weight-bold">Accueil</span>
            </a>
          </v-tab>
          <v-tab @click="goTo('agenda')">
            <a class="v-btn white--text font-weight-bold">
              <v-icon left size="20">mdi-calendar-month-outline</v-icon>
              <span class="font-weight-bold">Agenda</span>
            </a>
          </v-tab>
          <v-tab @click="goTo('dashboard')">
            <a class="v-btn white--text font-weight-bold">
              <v-icon left size="18">fa-network-wired</v-icon>
              <span class="font-weight-bold">Dashboard</span>
            </a>
          </v-tab>
          <v-tab @click="goTo('structure')">
            <a class="v-btn white--text font-weight-bold">
              <span style="font-size:18px;">
                <i size="x" class="fas fa-server"></i>
              </span>
              <span class="font-weight-bold ml-1">Structures</span>
            </a>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      tab: null,
      tabs: ["home", "agenda", "dashboard", "structure"]
    };
  },
  methods: {
    goTo(route) {
      /*  if (route !== this.$route.name) {
                    this.$router.push(route)
                } */
      this.$router.push({ name: route }).catch(e => console.log(e));
    },
    logout() {
      this.$store.dispatch("authModule/logout");
      this.$router.push("/");
    }
  },
  computed: {
    /*  nameLoggedIn() {
                console.log('user => ', this.$store.state.authModule.user)
                return this.$store.state.authModule.user.email
            }, */
    loggedIn() {
      return this.$store.state.authModule.isUserLoggedIn;
    }
  },
  watch: {
    "$route.name": {
      immediate: true,
      handler(name) {
        let currentTab = this.tabs.findIndex(el => el === name);
        if (name !== "login") {
          this.tab = currentTab;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .v-btn__content {
  letter-spacing: -0.4px;
}

::v-deep .v-tabs-slider {
  background: greenyellow;
  max-width: 45px;
  margin: auto;
  margin-top: -1px;
}

::v-deep .v-toolbar {
  height: 87px !important;
}

::v-deep .v-toolbar__extension {
  height: 35px !important;
  color: green;
}

.titre {
  font-family: "Quicksand", sans-serif;
  font-size: 26px;
  text-shadow: 2px 4px 6px #fafafa;
}
</style>