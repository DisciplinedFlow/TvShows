<template>
  <div v-if="show" class="show-detail" role="main" aria-labelledby="show-title">
    <div class="show-header">
      <img
        :src="show.image && show.image.original"
        :alt="`Poster for ${show.name}`"
        class="show-image"
      />
      <div class="show-info">
        <h1 id="show-title">{{ show.name }}</h1>
        <div class="show-meta">
          <span v-if="show.rating && show.rating.average" class="rating" aria-label="Rating">
            <span aria-hidden="true">★</span> {{ show.rating.average }}
          </span>
          <span class="genres" aria-label="Genres">{{ show.genres.join(', ') }}</span>
        </div>
        <div class="show-schedule" aria-label="Schedule">
          <p>{{ show.schedule && show.schedule.days.join(', ') }} at {{ show.schedule && show.schedule.time }}</p>
          <p>{{ show.network && show.network.name }}</p>
        </div>
        <div class="show-summary" v-html="sanitizedSummary" aria-label="Summary"></div>
      </div>
    </div>
    <div class="show-details">
      <div class="detail-section" role="region" aria-labelledby="show-info-heading">
        <h2 id="show-info-heading">Show Information</h2>
        <ul>
          <li><strong>Status:</strong> <span>{{ show.status }}</span></li>
          <li><strong>Premiered:</strong> <span>{{ show.premiered }}</span></li>
          <li v-if="show.ended"><strong>Ended:</strong> <span>{{ show.ended }}</span></li>
          <li><strong>Language:</strong> <span>{{ show.language }}</span></li>
          <li v-if="show.runtime"><strong>Runtime:</strong> <span>{{ show.runtime }} minutes</span></li>
        </ul>
      </div>
    </div>
    <div class="actions">
      <button
        @click="goBack"
        class="back-button"
        aria-label="Return to shows listing"
      >
        &#x21a9; Back to Shows
      </button>
    </div>
  </div>
  <div v-else-if="loading" class="loading" role="status" aria-live="polite">Loading...</div>
  <div v-else class="error" role="alert">Show not found</div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ShowDetail',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const show = ref(null)
    const loading = ref(true)
    const router = useRouter()

    const sanitizedSummary = computed(() => {
      if (!show.value || !show.value.summary) return '';
      // Make sure summary has proper ARIA attributes
      return show.value.summary.replace(/<p>/g, '<p tabindex="0">');
    });

    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${props.id}`)
        show.value = await response.json()
      } catch (error) {
        console.error('Error fetching show details:', error)
      } finally {
        loading.value = false
      }
    }

    const goBack = () => {
      router.back();
    }

    onMounted(fetchShowDetails)

    return {
      show,
      loading,
      sanitizedSummary,
      goBack
    }
  }
}
</script>

<style scoped>
.show-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.show-header {
  display: grid;
  grid-template-columns: minmax(300px, 1fr) 2fr;
  gap: 40px;
  margin-bottom: 40px;
}

.show-image {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.show-info h1 {
  margin: 0 0 16px;
  font-size: 2.5rem;
}

.show-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.rating {
  color: #ffd700;
  font-size: 1.2rem;
}

.genres {
  color: var(--color-text-light-2);
}

.show-schedule {
  margin-bottom: 24px;
  color: var(--color-text-light-2);
}

.show-summary {
  line-height: 1.6;
}

.detail-section {
  margin-top: 40px;
}

.detail-section h2 {
  margin-bottom: 16px;
}

.detail-section ul {
  list-style: none;
  padding: 0;
}

.detail-section li {
  margin-bottom: 8px;
}

.actions {
  margin-top: 40px;
}

.back-button {
  padding: 10px 20px;
  background-color: var(--vt-c-purple);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.back-button:hover, .back-button:focus {
  background-color: var(--vt-c-black);
  outline: 2px solid var(--vt-c-purple);
}

.loading, .error {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
}

.error {
  color: #dc3545;
}

@media (max-width: 768px) {
  .show-header {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .show-image {
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>
