<template>
  <div class="slider-container" role="region" aria-label="TV Show Slider">
    <button
      class="nav-button prev"
      @click="handleScroll(-1)"
      @mousedown="startScrolling(-1)"
      @mouseup="stopScrolling"
      v-show="canScrollBack"
      tabindex="0"
      aria-label="Previous Shows"
    >
      <span aria-hidden="true">‹</span>
    </button>
    <div
      class="shows-row"
      ref="sliderRef"
      @scroll="handleScroll"
      role="list"
    >
      <slot></slot>
    </div>
    <button
      class="nav-button next"
      @click="handleScroll(1)"
      @mousedown="startScrolling(1)"
      @mouseup="stopScrolling"
      v-show="canScrollForward"
      tabindex="0"
      aria-label="Next Shows"
    >
      <span aria-hidden="true">›</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted  } from 'vue'

defineOptions({
  name: 'ShowSlider'
})

const sliderRef = ref(null)
const canScrollBack = ref(false)
const canScrollForward = ref(true)


let scrollInterval;

// Function to handle scrolling by a specified direction
const handleScroll = (direction = null) => {
  if (!sliderRef.value || direction === null) return;

  const container = sliderRef.value;
  const scrollAmount = container.clientWidth * 3; // Scroll by three tiles

  container.scrollBy({
    left: scrollAmount * direction,
    behavior: 'smooth'
  });

  setTimeout(() => {
    canScrollBack.value = container.scrollLeft > 0;
    canScrollForward.value =
      container.scrollLeft + container.clientWidth < container.scrollWidth;
  }, 300);
};

// Function to start continuous scrolling in a specified direction
const startScrolling = (direction) => {
  scrollInterval = setInterval(() => {
    handleScroll(direction);
  }, 100);
};

// Function to stop continuous scrolling
const stopScrolling = () => {
  clearInterval(scrollInterval);
};

// Lifecycle hook to set initial scroll button visibility
onMounted(() => {
  canScrollForward.value = sliderRef.value.clientWidth < sliderRef.value.scrollWidth;
})
</script>

<style scoped>
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
  -ms-overflow-style: none;
  overflow-y: hidden;
}

.shows-row::-webkit-scrollbar {
  display: none;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3.75rem;
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

.prev:hover {
  background: linear-gradient(to right, var(--vt-c-purple), transparent);
}

.next {
  right: 0;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.7), transparent);
}

.next:hover {
  background: linear-gradient(to left, var(--vt-c-purple), transparent);
}

@media (max-width: 768px) {
  .slider-container {
    margin: 0 -1rem;
    padding: 0 1rem;
  }

  .nav-button {
    display: none;
  }
}
</style>
