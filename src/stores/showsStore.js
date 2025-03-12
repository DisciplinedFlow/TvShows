import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useShowsStore = defineStore('shows', () => {
  const shows = ref([])
  const loading = ref(false)

  const fetchShows = async () => {
    loading.value = true
    try {
      const response = await fetch('https://api.tvmaze.com/shows')
      const data = await response.json()
      shows.value = data
    } catch (error) {
      console.error('Error fetching shows:', error)
      throw error // Let the component handle the error
    } finally {
      loading.value = false
    }
  }

  // Group shows by genre
  const showsByGenre = computed(() => {
    const grouped = {}
    shows.value.forEach((show) => {
      show.genres.forEach((genre) => {
        if (!grouped[genre]) {
          grouped[genre] = []
        }
        grouped[genre].push(show)
      })
    })

    // Sort shows by rating within each genre
    Object.keys(grouped).forEach((genre) => {
      grouped[genre].sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
    })

    return grouped
  })

  return {
    shows,
    loading,
    fetchShows,
    showsByGenre,
  }
})
