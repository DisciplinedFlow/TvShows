// This test suite verifies the accessibility features across multiple components in the application.
// It tests ARIA attributes, keyboard navigation, proper labeling, and other accessibility best practices
// to ensure the application is usable by people with diverse abilities using assistive technologies.

import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import ShowCard from '@/components/ShowCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import ShowSlider from '@/components/ShowSlider.vue'

const mockShow = {
  id: 1,
  name: 'Test Show',
  image: { medium: 'test-image.jpg' },
  rating: { average: 8.5 },
  genres: ['Drama', 'Action'],
}

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/show/:id', component: {} }],
})

beforeEach(() => {
  router.push = vi.fn()
})

describe('Accessibility Tests', () => {
  // Tests for ShowCard component accessibility features including ARIA attributes and keyboard interaction
  describe('ShowCard Accessibility', () => {
    // Verify the ShowCard has proper ARIA role, label, and keyboard focus attributes
    it('has correct ARIA attributes', () => {
      const wrapper = mount(ShowCard, {
        global: {
          plugins: [router],
        },
        props: {
          show: mockShow,
        },
      })

      // Check for role attribute
      expect(wrapper.attributes('role')).toBe('button')

      // Check for aria-label
      expect(wrapper.attributes('aria-label')).toContain('View details for Test Show')

      // Check for tabindex for keyboard navigation
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    // Verify the ShowCard can be activated using keyboard (Enter key press)
    it('responds to keyboard events', async () => {
      const wrapper = mount(ShowCard, {
        global: {
          plugins: [router],
        },
        props: {
          show: mockShow,
        },
      })

      // Mock the router navigation
      router.push = vi.fn()

      // Trigger Enter key
      await wrapper.trigger('keydown.enter')

      // Verify router was called
      expect(router.push).toHaveBeenCalledWith('/show/1')
    })
  })

  // Tests for ShowSlider component accessibility features including proper navigation controls
  describe('ShowSlider Accessibility', () => {
    // Verify the slider's navigation buttons have appropriate ARIA labels
    it('has proper navigation button ARIA labels', () => {
      // Mock scrollBy since it's not available in JSDOM
      Element.prototype.scrollBy = vi.fn()

      const wrapper = mount(ShowSlider, {
        global: {
          plugins: [router],
        },
        attrs: {
          'aria-label': 'Test Slider',
        },
      })

      const prevButton = wrapper.find('.nav-button.prev')
      const nextButton = wrapper.find('.nav-button.next')

      expect(prevButton.attributes('aria-label')).toBe('Previous Shows')
      expect(nextButton.attributes('aria-label')).toBe('Next Shows')
      expect(wrapper.attributes('role')).toBe('region')
    })
  })

  // Tests for SearchBar component accessibility features including form controls and labeling
  describe('SearchBar Accessibility', () => {
    // Verify the search input has proper semantic role and accessibility attributes
    it('has proper form labeling', () => {
      const wrapper = mount(SearchBar, {
        global: {
          plugins: [router],
        },
      })

      const input = wrapper.find('input')

      // Check that input has proper role
      expect(input.attributes('role')).toBe('searchbox')

      // Check that input has aria attributes
      expect(input.attributes('aria-autocomplete')).toBe('list')
      expect(input.attributes('aria-controls')).toBe('search-results')

      // Verify label exists but is visually hidden
      const label = wrapper.find('label')
      expect(label.exists()).toBe(true)
      expect(label.classes()).toContain('visually-hidden')
    })
  })
})
