// This test suite verifies the core functionality of the ShowCard component.
// It tests the rendering of show information and ensures that all show details
// are displayed correctly to provide users with accurate show metadata.

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowCard from '../ShowCard.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('ShowCard', () => {
  const mockShow = {
    id: 1,
    name: 'Test Show',
    genres: ['Drama'],
    image: { medium: 'test.jpg' },
    rating: { average: 8.5 },
  }

  // Verify that the component correctly displays the show's title, genres, and rating
  it('renders show information correctly', () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
      global: { plugins: [router] },
    })

    expect(wrapper.find('.show-title').text()).toBe('Test Show')
    expect(wrapper.find('.show-genres').text()).toBe('Drama')
    expect(wrapper.find('.rating').text()).toContain('8.5')
  })
})
