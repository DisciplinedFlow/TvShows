<template>
  <div v-if="show" class="show-detail">
    <div class="show-header">
      <img :src="show.image && show.image.original" :alt="show.name" class="show-image" />
      <div class="show-info">
        <h1>{{ show.name }}</h1>
        <div class="show-meta">
          <span v-if="show.rating && show.rating.average" class="rating">★ {{ show.rating.average }}</span>
          <span class="genres">{{ show.genres.join(', ') }}</span>
        </div>
        <div class="show-schedule">
          <p>{{ show.schedule && show.schedule.days.join(', ') }} at {{ show.schedule && show.schedule.time }}</p>
          <p>{{ show.network && show.network.name }}</p>
        </div>
        <div class="show-summary" v-html="show.summary"></div>
      </div>
    </div>
    <div class="show-details">
      <div class="detail-section">
        <h2>Show Information</h2>
        <ul>
          <li><strong>Status:</strong> {{ show.status }}</li>
          <li><strong>Premiered:</strong> {{ show.premiered }}</li>
          <li v-if="show.ended"><strong>Ended:</strong> {{ show.ended }}</li>
          <li><strong>Language:</strong> {{ show.language }}</li>
          <li v-if="show.runtime"><strong>Runtime:</strong> {{ show.runtime }} minutes</li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else-if="loading" class="loading">Loading...</div>
  <div v-else class="error">Show not found</div>
</template>

<script>
import { ref, onMounted } from 'vue'

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

    onMounted(fetchShowDetails)

    return {
      show,
      loading
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
