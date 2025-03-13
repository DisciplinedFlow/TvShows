<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">TV Shows</RouterLink>
        </nav>
      </div>
    </header>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  background: var(--color-background-soft);
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.main-content {
  padding-top: 80px; /* Adjust based on header height */
  min-height: 100vh;
}

.wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

nav {
  text-align: left;
}

nav a {
  color: var(--color-heading);
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
}

nav a:hover {
  color: var(--vt-c-purple);
}
</style>
