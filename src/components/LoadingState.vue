<template>
  <div class="loading-state">
    <span>Loading...</span>
  </div>
</template>

<script setup>
defineOptions({
  name: 'LoadingState'
})
</script>

<style scoped>
.loading-state {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: var(--color-text);
}
</style>
