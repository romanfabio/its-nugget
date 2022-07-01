<template>
  <form>
    <v-text-field
      v-model="login.username"
      label="Username"
      required
    ></v-text-field>
    <v-text-field
      v-model="login.password"
      label="Password"
      required
      type="password"
    ></v-text-field>

    <v-btn
      class="mr-4"
      @click="doLogin"
    >
      Login
    </v-btn>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        
    },
    data() {
        return {
          login: {
            username: '',
            password: ''
          }
        }
    },
    methods: {
        async doLogin() {
            try {
                await this.$auth.loginWith('local', {data: this.login});
            } catch(x) {
              console.error(x);
            }
        }
    }
})
</script>
