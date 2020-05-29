<template>
  <v-card  class="pa-1 white" elevation=3>
    <div class="d-flex">
      <v-sheet
        elevation="8"
        class="mt-n6 ml-6 green d-flex justify-center align-center"
        width="65"
        height="75"
      >
        <v-icon dark size="28">{{`mdi-${icon}`}}</v-icon>
      </v-sheet>
      <v-card-title class="display-1 grey--text text--darken-2 font-weight-thin">{{title}}</v-card-title>
    </div>
    <v-form v-model="isValid" autocomplete="off">
        <div class="py-4 px-8">
          <v-text-field
             v-if="isRegisterPanel"
            :rules="[(v) => !!v || 'name is required']"
            dense
            color="blue darken-2"
            label="Nom"
            prepend-icon="mdi-account"
            v-model="userInfo.name"
          ></v-text-field>
          <v-text-field
            :rules="emailRules"
            dense
            color="blue darken-2"
            label="Email Adress"
            prepend-icon="mdi-account-circle"
            autocomplete="off"
            v-model="userInfo.email"
          ></v-text-field>
    
          <v-text-field
            :rules="passwordRules"
            prepend-icon="mdi-lock"
            color="blue darken-2"
            :append-icon="showIcon ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showIcon = !showIcon"
            :type="showIcon ? 'text' : 'password'"
            label="Password"
            v-model="userInfo.password"
          ></v-text-field>
        </div>
        <v-card-actions class="d-flex justify-end pr-8">
          <v-btn
            @click="$emit('submitform', userInfo)"
            class="font-weight-light caption"
            color="success"
            :disabled="!isValid"
            :loading="loading"
          >
            <span class="px-4 font-weight-bold">{{btnText}}</span>
          </v-btn>
        </v-card-actions>
        <p>
          
        </p>
    </v-form>
  </v-card>
</template>
<script>
export default {
  props: ["title", "btnText", "loading", "icon", "isRegisterPanel"],
  data: () => ({
    isValid: false,
    userInfo: {
      email: "",
      password: ""
    },
     emailRules: [
        function (v){
            return !!v || 'email is required'
        }, 
        function (v){ 
          let expression = /.+@.+[.]/
          return expression.test(v) || 'email not valid, try again...'
        }
      ],
      passwordRules: [
        function (v) {
            return v.length >= 6 || 'Password not les than 6 characters'
        }
      ],
    error: null,
    showIcon: false
  })
};
</script>
<style lang="css">
input {
  font-size: 13px;
  font-weight: 400;
}
</style>
