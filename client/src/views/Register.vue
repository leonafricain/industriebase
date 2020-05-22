<template>
    <v-container>
        <v-row no-gutters class="mt-6">
            <v-col cols="6" offset="3">
                <auth-form isRegisterPanel=true title="Register" btn-text="Sign-up" icon="account-plus" @submitform="register" />
                <div class="pa-3">

                <v-alert v-if="err" border="left"
                        colored-border
                        dismissible
                        color="red accent-4"
                        elevation="2">
                    <span class="caption" v-html="err" />
                </v-alert>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import AuthForm from '../components/AuthForm'
    import Service from '../services/AuthenticationService'
    const ServiceAuth = new Service()
    export default {
        data() {
            return {
                err:null
            }
        },

        components: {
            AuthForm
        },
       methods: {
        async register(event) {
            this.err = null
            try {
                let user = await  ServiceAuth.register(event)
                console.log(user)
            } catch (error) {
                this.err = error.response.data.message
            }
         }
       },

    }

</script>

<style lang="scss" scoped>
    ::v-deep .v-label {
        font-size: 12px
    }

</style>
