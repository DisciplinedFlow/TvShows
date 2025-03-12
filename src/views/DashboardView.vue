<template>
  <div class="dashboard-container">
    <div class="search-wrapper">
      <SearchBar />
    </div>

    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" />

    <div v-else class="shows-content">
      <!-- Top 10 Section -->
      <section class="genre-section">
        <h2 class="genre-title">Top 10 Shows</h2>
        <ShowSlider>
          <ShowCard
            v-for="show in topShows"
            :key="show.id"
            :show="show"
            class="show-item"
          />
        </ShowSlider>
      </section>

      <!-- Genre Sections -->
      <section
        v-for="(shows, genre) in showsByGenre"
        :key="genre"
        class="genre-section"
      >
        <h2 class="genre-title">{{ genre }}</h2>
        <ShowSlider>
          <ShowCard
            v-for="show in shows"
            :key="show.id"
            :show="show"
            class="show-item"
          />
        </ShowSlider>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useShowsStore } from '@/stores/showsStore'
import SearchBar from '@/components/SearchBar.vue'
import ShowCard from '@/components/ShowCard.vue'
import ShowSlider from '@/components/ShowSlider.vue'
import LoadingState from '@/components/LoadingState.vue'
import ErrorState from '@/components/ErrorState.vue'

defineOptions({
  name: 'DashboardView'
})

const showsStore = useShowsStore()
const loading = ref(true)
const error = ref(null)

const topShows = computed(() => {
  return [...showsStore.shows]
    .sort((a, b) => ((b.rating && b.rating.average) || 0) - ((a.rating && a.rating.average) || 0))
    .slice(0, 10)
})

const showsByGenre = computed(() => showsStore.showsByGenre)

onMounted(async () => {
  try {
    await showsStore.fetchShows()
  } catch{
    error.value = 'Failed to load shows. Please try again later.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.dashboard-container {
  max-width: 75rem; /* 1200px */
  margin: 0 auto;
  padding: 1.25rem; /* 20px */
  overflow-x: hidden;
}

.search-wrapper {
  max-width: 50rem; /* 800px */
  margin: 0 auto 2rem;
  width: 100%;
  padding: 0 1.25rem; /* 20px */
}

.shows-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.genre-section {
  position: relative;
}

.genre-title {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin-bottom: 0.8rem;
}

.slider-container {
  position: relative;
  margin: 0 -2rem;
  padding: 0 2rem;
}

.shows-row {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 1.5rem 0;
  scroll-snap-type: x mandatory;
}

.show-item {
  flex: 0 0 auto;
  width: 12.5rem; /* 200px */
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3.75rem; /* 60px */
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  cursor: pointer;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.2s;
}

.slider-container:hover .nav-button {
  opacity: 1;
}

.nav-button span {
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
}

.prev {
  left: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent);
}

.next {
  right: 0;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.7), transparent);
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 0 1rem;
  }

  .slider-container {
    margin: 0 -1rem;
    padding: 0 1rem;
  }

  .shows-row {
    gap: 0.25rem;
  }

  .show-item {
    width: 8.75rem; /* 140px */
  }

  .nav-button {
    display: none;
  }
}

.loading-state,
.error-state {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: var(--color-text);
}

.error-state {
  color: #dc3545;
}
</style>
