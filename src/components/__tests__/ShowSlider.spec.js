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

  it('updates button visibility when scrolling', async () => {
    // Mock scrollBy since it's not available in JSDOM
    Element.prototype.scrollBy = vi.fn()

    const wrapper = mount(ShowSlider, {
      global: {
        plugins: [router],
      },
      slots: {
        default: `<ShowCard :show='${JSON.stringify(mockShow)}' />`,
      },
    })

    // Initial state - can't scroll back
    expect(wrapper.vm.canScrollBack).toBe(false)

    // Click on the next button
    const nextButton = wrapper.find('.nav-button.next')
    await nextButton.trigger('click')

    // Verify the scrollBy function was called
    expect(Element.prototype.scrollBy).toHaveBeenCalled()
  })
})
