<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue'
</script>

<template>
  <AuthLayout>
    <div class="vstack gap-3 login">
      <div>
        <h3>Login</h3>
      </div>

      <div>
        <label for="emailAddress" class="form-label">Email Address</label>
        <input type="email" class="form-control" id="emailAddress" placeholder="name@example.com">
      </div>

      <div>
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password">
      </div>

      <div class="mt-3 text-center">
        <button class="btn btn-primary">Log In</button>
      </div>
    </div>
  </AuthLayout>
</template>

<styles scoped lang="scss">
  .login {
    min-width: 300px;
  }
</styles>
