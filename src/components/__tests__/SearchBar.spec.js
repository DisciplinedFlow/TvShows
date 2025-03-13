// This test suite verifies the core functionality of the SearchBar component.
// It tests proper rendering and event handling to ensure the search feature
// works correctly and communicates with parent components as expected.

import { mount } from '@vue/test-utils'
import SearchBar from '@/components/SearchBar.vue'
import { describe, it, expect } from 'vitest'

describe('SearchBar', () => {
  // Verify the component renders correctly in the DOM
  it('renders correctly', () => {
    const wrapper = mount(SearchBar)
    expect(wrapper.exists()).toBe(true)
  })

  // Verify the component emits input events when the search field value changes
  it('emits an event when input changes', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    await input.setValue('Breaking Bad')
    expect(wrapper.emitted()).toHaveProperty('input')
  })
})
