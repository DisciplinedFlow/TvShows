<template>
  <div class="error-state">
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
})

defineOptions({
  name: 'ErrorState'
})
</script>

<style scoped>
.error-state {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #dc3545;
}
</style>
