// This test suite verifies the functionality of the ShowSlider component, including rendering and scrolling behavior.
// It uses Vue Test Utils and Vitest for testing, and includes a mock router setup to handle routing-related functionality.
// A mock show object is provided to satisfy the ShowCard prop requirements.

import { mount } from '@vue/test-utils'
import ShowSlider from '@/components/ShowSlider.vue'
import ShowCard from '@/components/ShowCard.vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'

const mockShow = {
  id: 1,
  name: 'Mock Show',
  image: { medium: 'mock-image.jpg' },
  rating: { average: 8.5 },
  genres: ['Drama', 'Action'],
}

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/show/:id', component: ShowCard }],
})

beforeEach(() => {
  router.push = vi.fn()
})

describe('ShowSlider', () => {
  it('renders correctly', () => {
    const wrapper = mount(ShowSlider, {
      global: {
        plugins: [router],
      },
      slots: {
        default: `<ShowCard :show='${JSON.stringify(mockShow)}' />`,
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('scrolls correctly when buttons are clicked', async () => {
    const wrapper = mount(ShowSlider, {
      global: {
        plugins: [router],
      },
      slots: {
        default: `<ShowCard :show='${JSON.stringify(mockShow)}' />`,
      },
    })
    const nextButton = wrapper.find('.nav-button.next')
    const initialScrollLeft = wrapper.find('.shows-row').element.scrollLeft

    await nextButton.trigger('click')

    const newScrollLeft = wrapper.find('.shows-row').element.scrollLeft
    expect(newScrollLeft).toBeGreaterThan(initialScrollLeft)
  })
})
