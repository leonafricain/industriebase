<template>
    <v-container>
        <v-row no-gutters class="mt-6">
            <v-col cols="5" offset="3">
                <auth-form isRegisterPanel=true title="Register" btn-text="Sign-up" icon="account-plus" @submitform="register" />
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
         register(event) {
           this.$store.dispatch('register', event);
           this.$router.push('/')
         }
       },

    }

</script>

<style lang="scss" scoped>
    ::v-deep .v-label {
        font-size: 12px
    }

</style>
