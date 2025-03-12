import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowCard from '../ShowCard.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

describe('ShowCard', () => {
  const mockShow = {
    id: 1,
    name: 'Test Show',
    genres: ['Drama'],
    image: { medium: 'test.jpg' },
    rating: { average: 8.5 }
  }

  it('renders show information correctly', () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
      global: { plugins: [router] }
    })

    expect(wrapper.find('.show-title').text()).toBe('Test Show')
    expect(wrapper.find('.show-genres').text()).toBe('Drama')
    expect(wrapper.find('.rating').text()).toContain('8.5')
  })
})
