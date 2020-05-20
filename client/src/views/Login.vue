<template>
    <v-container>
        <v-row no-gutters class="mt-6">
            <v-col cols="5" offset="3">
                <auth-form title="Login User" btn-text="login" icon="login" @submitform="login"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import AuthForm from '../components/AuthForm'
    export default {
        components: {
            AuthForm
        },      
       methods: {
        async  login(event) {
          let response = await this.$store.dispatch('login', event);  //IMPORTANT************************ 
          console.log('response du login from store :', response );
           this.$router.push('/')   // pour que ca a marché il fallait return promise from store dans login c un t
         }
       },
    }
</script>

<style lang="scss" scoped>
    ::v-deep .v-label {
        font-size: 12px
    }
</style>
