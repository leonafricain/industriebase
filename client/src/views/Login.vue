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
    import Service from '../services/AuthenticationService.js'
    const ServiceAuth = new Service()
    export default {
        components: {
            AuthForm
        },      
       methods: {
        async login(event) {
            try {
               let user =  await ServiceAuth.login(event);
               console.log(user)
                
            } catch (error) {
                console.log(error)
            }
       },
    }
    }
</script>

<style lang="scss" scoped>
    ::v-deep .v-label {
        font-size: 12px
    }
</style>
