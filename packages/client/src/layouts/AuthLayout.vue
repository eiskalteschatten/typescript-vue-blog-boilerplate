<template>
  <main class="d-flex w-100 h-100 justify-content-center content">
    <div class="card">
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.content {
  margin-top: 10vh;
}
</style>
