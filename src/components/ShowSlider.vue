<template>
  <div class="slider-container">
    <button
      class="nav-button prev"
      @click="handleScroll(-1)"
      v-show="canScrollBack"
    >
      <span>‹</span>
    </button>
    <div
      class="shows-row"
      ref="sliderRef"
      @scroll="handleScroll"
    >
      <slot></slot>
    </div>
    <button
      class="nav-button next"
      @click="handleScroll(1)"
      v-show="canScrollForward"
    >
      <span>›</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineOptions({
  name: 'ShowSlider'
})

const sliderRef = ref(null)
const canScrollBack = ref(false)
const canScrollForward = ref(true)

// const handleScroll = (direction = null) => {
//   if (!sliderRef.value) return

//   if (direction !== null) {
//     // Calculate 25% of the total scrollable width
//     const totalScrollWidth = sliderRef.value.scrollWidth - sliderRef.value.clientWidth
//     const scrollAmount = totalScrollWidth * 0.25

//     sliderRef.value.scrollBy({
//       left: scrollAmount * direction,
//       behavior: 'smooth'
//     })
//   }

//   // Update scroll buttons visibility
//   canScrollBack.value = sliderRef.value.scrollLeft > 0
//   canScrollForward.value =
//     sliderRef.value.scrollLeft + sliderRef.value.clientWidth <
//     sliderRef.value.scrollWidth
// }

const handleScroll = (direction = null) => {
  if (!sliderRef.value || direction === null) return;

  const container = sliderRef.value;
  const targetScroll = direction === 1 ?
    container.scrollWidth - container.clientWidth : // Scroll to end
    0; // Scroll to start

  container.scrollTo({
    left: targetScroll,
    behavior: 'smooth'
  });

  // Update buttons visibility after scroll animation
  setTimeout(() => {
    canScrollBack.value = container.scrollLeft > 0;
    canScrollForward.value =
      container.scrollLeft + container.clientWidth < container.scrollWidth;
  }, 300);
};


onMounted(() => {
  handleScroll()
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
  -webkit-scroll-snap-type: x mandatory;
  -ms-overflow-style: none; /* IE and Edge */
}

/* Hide webkit scrollbar */
.shows-row::-webkit-scrollbar {
  display: none;
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
  .slider-container {
    margin: 0 -1rem;
    padding: 0 1rem;
  }

  .nav-button {
    display: none;
  }
}
</style>
