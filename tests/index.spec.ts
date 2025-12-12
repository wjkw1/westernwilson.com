import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

const REDIRECT_URL = 'https://westernwilson.webflow.io/'

describe('Index page tests', () => {
  beforeEach(() => {
    vi.useFakeTimers() // control setInterval/setTimeout [web:52][web:57]
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('renders title and subtitle text', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.get('[data-test="title"]').text()).toContain('Western Wilson')
    expect(wrapper.get('[data-test="subtitle"]').text()).toContain('We’ve moved!')
  })

  it('has two links with correct href and security attrs', async () => {
    const wrapper = await mountSuspended(IndexPage)

    const textLink = wrapper.get('[data-test="text-link"]')
    const buttonLink = wrapper.get('[data-test="button-link"]')

    expect(textLink.attributes('href')).toBe(REDIRECT_URL)
    expect(buttonLink.attributes('href')).toBe(REDIRECT_URL)

    expect(textLink.attributes('target')).toBe('_blank')
    expect(textLink.attributes('rel')).toBe('noopener noreferrer')
    expect(buttonLink.attributes('target')).toBe('_blank')
    expect(buttonLink.attributes('rel')).toBe('noopener noreferrer')
  })

  it('shows a progress bar', async () => {
    const wrapper = await mountSuspended(IndexPage)

    const bar = wrapper.get('[data-test="progress-bar"]')
    const inner = wrapper.get('[data-test="progress-inner"]')

    expect(bar.exists()).toBe(true)
    expect(inner.exists()).toBe(true)
  })

  it('updates progress over time', async () => {
    const wrapper = await mountSuspended(IndexPage)

    const inner = wrapper.get('[data-test="progress-inner"]')
    const initialWidth = inner.attributes('style') || ''

    // advance 1 second (your component uses 100ms interval) [web:52][web:54]
    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()

    const updatedWidth = inner.attributes('style') || ''
    expect(updatedWidth).not.toBe(initialWidth)
  })

  it('schedules a redirect to the new site', async () => {
    // mock window.location.href assignment [web:50][web:55]
    const originalLocation = window.location
    // @ts-expect-error allow reassignment in test
    delete window.location
    // @ts-expect-error fake minimal location object
    window.location = { href: '' }

    const wrapper = await mountSuspended(IndexPage)

    // advance time to fire the redirect timeout (5s in your code)
    vi.advanceTimersByTime(5000)
    await wrapper.vm.$nextTick()

    expect(window.location.href).toBe(REDIRECT_URL)

    // restore original
    window.location = originalLocation
  })

})

