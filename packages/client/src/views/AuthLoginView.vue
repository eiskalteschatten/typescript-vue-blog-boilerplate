<script setup lang="ts">
import { ref } from 'vue';

import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAccountStore } from '@/stores/account'

const email = ref()
const password = ref()
const loginError = ref()

async function login() {
  const accountStore = useAccountStore();

  try {
      accountStore.isLoading = true

      await accountStore.login({
        email: email.value,
        password: password.value,
      });
    }
    catch (error: any) {
      loginError.value = error.message
    }
    finally {
      accountStore.isLoading = false
    }
}
</script>

<template>
  <AuthLayout>
    <div class="vstack gap-3 login">
      <div>
        <h3>Login</h3>
      </div>

      <div v-if="loginError" class="alert alert-danger">
        {{ loginError }}
      </div>

      <div>
        <label for="emailAddress" class="form-label">Email Address</label>
        <input type="email" class="form-control" id="emailAddress" placeholder="name@example.com" v-model.trim="email">
      </div>

      <div>
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>

      <div class="mt-3 text-center">
        <button class="btn btn-primary" @click="login">Log In</button>
      </div>
    </div>
  </AuthLayout>
</template>

<styles scoped lang="scss">
  .login {
    min-width: 300px;
  }
</styles>
