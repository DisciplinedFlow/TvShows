<template>
  <div class="search-container">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search TV shows..."
      @input="handleSearch"
      class="search-input"
    />
    <div v-if="searchResults.length && searchQuery" class="search-results">
      <div
        v-for="show in searchResults"
        :key="show.id"
        class="search-result-item"
        @click="navigateToShow(show.id)"
      >
        <img :src="show.image && show.image.medium" :alt="show.name" class="result-image" />
        <div class="result-info">
          <h3>{{ show.name }}</h3>
          <p>{{ show.genres.join(', ') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'SearchBar',
  setup() {
    const router = useRouter()
    const searchQuery = ref('')
    const searchResults = ref([])

    const handleSearch = async () => {
      if (searchQuery.value.length < 2) {
        searchResults.value = []
        return
      }

      try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery.value}`)
        const data = await response.json()
        searchResults.value = data.map(item => item.show).slice(0, 5)
      } catch (error) {
        console.error('Search error:', error)
        searchResults.value = []
      }
    }

    const navigateToShow = (id) => {
      router.push(`/show/${id}`)
      searchQuery.value = ''
      searchResults.value = []
    }

    return {
      searchQuery,
      searchResults,
      handleSearch,
      navigateToShow
    }
  }
}
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
  z-index: 100;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1.25rem; /* 12px 20px */
  border: 0.125rem solid var(--color-border); /* 2px */
  border-radius: 0.5rem; /* 8px */
  font-size: 1rem;
  transition: border-color 0.3s;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-border-hover);
  border-color: blue;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  max-height: 25rem;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  -ms-overflow-style: none;
}

/* Hide webkit scrollbar */
.search-results::-webkit-scrollbar {
  display: none;
}

.search-result-item {
  display: flex;
  padding: 0.75rem; /* 12px */
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-result-item:hover {
  background-color: var(--color-background-soft);
}

.result-image {
  width: 3.125rem; /* 50px */
  height: 4.375rem; /* 70px */
  object-fit: cover;
  border-radius: 0.25rem; /* 4px */
}

.result-info {
  margin-left: 0.75rem; /* 12px */
}

.result-info h3 {
  margin: 0;
  font-size: 1rem;
}

.result-info p {
  margin: 0.25rem 0 0; /* 4px */
  font-size: 0.875rem;
  color: var(--color-text-light-2);
}
</style>
