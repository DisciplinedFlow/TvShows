<template>
  <div class="show-card" @click="navigateToShow">
    <div class="image-container">
      <img :src="show.image && show.image.medium" :alt="show.name" class="show-image" />
      <div class="rating" v-if="show.rating && show.rating.average">
        <span>★ {{ show.rating.average }}</span>
      </div>
    </div>
    <div class="show-info">
      <h3 class="show-title">{{ show.name }}</h3>
      <p class="show-genres">{{ show.genres.join(', ') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  show: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const navigateToShow = () => {
  router.push(`/show/${props.show.id}`)
}
</script>

<style scoped>
.show-card {
  background: var(--color-background-soft);
  border-radius: 0.25rem;
  overflow: hidden;
  cursor: pointer;
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
  aspect-ratio: 2/3;
  display: flex;
  flex-direction: column;
}

.show-card:hover {
  transform: scale(1.2);
  z-index: 20;
  box-shadow: 0 0 0.9375rem rgba(0, 0, 0, 0.5);
}

.image-container {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.show-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.show-card:hover .show-image {
  transform: scale(1.05);
}

.rating {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: #ffd700;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.show-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
}

.show-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.show-genres {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 480px) {
  .show-info {
    padding: 0.5rem;
  }

  .show-title {
    font-size: 0.9rem;
  }

  .show-genres {
    font-size: 0.8rem;
  }
}

@media (max-width: 600px) {
  .show-card:hover {
    transform: scale(1.1); /* Smaller scale on mobile */
  }

  .show-info {
    padding: 8px;
  }
}
</style>
