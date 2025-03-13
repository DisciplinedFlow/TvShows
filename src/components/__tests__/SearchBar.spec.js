import { mount } from '@vue/test-utils'
import SearchBar from '@/components/SearchBar.vue'
import { describe, it, expect } from 'vitest'

describe('SearchBar', () => {
  it('renders correctly', () => {
    const wrapper = mount(SearchBar)
    expect(wrapper.exists()).toBe(true)
  })

  it('emits an event when input changes', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    await input.setValue('Breaking Bad')
    expect(wrapper.emitted()).toHaveProperty('input')
  })
})
