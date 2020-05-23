<template>
  <v-container>
    <v-row no-gutters class="mt-6">
      <v-col md="5" sm="6" offset-md="3" offse>
        <auth-form title="Login User" btn-text="login" icon="login" @submitform="login" />
        <div class="pa-3">
          <v-alert
            v-if="err"
            border="left"
            colored-border
            dismissible
            color="red accent-4"
            elevation="3"
          >
            <span class="caption" v-html="err" />
          </v-alert>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthForm from "../components/AuthForm";
import Service from "../services/AuthenticationService.js";
const ServiceAuth = new Service();
export default {
  data() {
    return {
      err: null
    };
  },
  components: {
    AuthForm
  },
  methods: {
    async login(event) {
      this.err = null;
      try {
        let user = await ServiceAuth.login(event);
        this.$store.dispatch("authModule/set_user", user.data.user);
        this.$store.dispatch("authModule/set_token", user.data.token);
        this.$router.push('/')
      } catch (error) {
        console.log(error);
        this.err = error.response.data.message;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .v-label {
  font-size: 12px;
}
</style>
