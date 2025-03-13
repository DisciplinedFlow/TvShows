<template>
  <div class="search-container">
    <label for="show-search" class="visually-hidden">Search TV shows</label>
    <input
      id="show-search"
      v-model="searchQuery"
      type="search"
      placeholder="Search TV shows..."
      @input="handleSearch"
      class="search-input"
      aria-autocomplete="list"
      aria-controls="search-results"
      aria-expanded="searchResults.length && searchQuery"
      role="searchbox"
    />
    <div
      v-if="searchResults.length && searchQuery"
      class="search-results"
      id="search-results"
      role="listbox"
      aria-label="Search results"
    >
      <div
        v-for="(show, index) in searchResults"
        :key="show.id"
        class="search-result-item"
        @click="navigateToShow(show.id)"
        @keydown.enter="navigateToShow(show.id)"
        tabindex="0"
        role="option"
        :aria-selected="index === selectedIndex"
        :id="`search-result-${show.id}`"
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
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'SearchBar',
  setup() {
    const router = useRouter()
    const searchQuery = ref('')
    const searchResults = ref([])
    const selectedIndex = ref(-1)

    const handleSearch = async () => {
      if (searchQuery.value.length < 2) {
        searchResults.value = []
        return
      }

      try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery.value}`)
        const data = await response.json()
        searchResults.value = data.map(item => item.show).slice(0, 5)
        selectedIndex.value = -1
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

    // Handle keyboard navigation in search results
    const handleKeyDown = (event) => {
      if (!searchResults.value.length) return

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        selectedIndex.value = Math.min(selectedIndex.value + 1, searchResults.value.length - 1)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
      } else if (event.key === 'Enter' && selectedIndex.value >= 0) {
        event.preventDefault()
        navigateToShow(searchResults.value[selectedIndex.value].id)
      } else if (event.key === 'Escape') {
        searchQuery.value = ''
        searchResults.value = []
      }
    }

    watch(searchResults, (newVal) => {
      if (newVal.length) {
        setTimeout(() => {
          window.addEventListener('keydown', handleKeyDown)
        }, 100)
      } else {
        window.removeEventListener('keydown', handleKeyDown)
      }
    })

    return {
      searchQuery,
      searchResults,
      selectedIndex,
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
  padding: 0.75rem 1.25rem;
  border: 0.125rem solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s;
  background: var(--color-background);
  color: var(--color-text);
}

.search-input:focus {
  outline: none;
  border-color: var(--vt-c-purple);
  color: var(--vt-c-white);
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  max-height: 25rem;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
}

.search-results::-webkit-scrollbar {
  display: none;
}

.search-result-item {
  display: flex;
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-result-item:hover, .search-result-item:focus {
  background-color: var(--vt-c-purple);
  outline: none;
}

.result-image {
  width: 3.125rem;
  height: 4.375rem;
  object-fit: cover;
  border-radius: 0.25rem;
}

.result-info {
  margin-left: 0.75rem;
}

.result-info h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--color-heading);
}

.result-info p {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: var(--color-text-light-2);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
