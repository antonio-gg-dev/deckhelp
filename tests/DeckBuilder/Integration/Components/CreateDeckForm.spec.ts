import { it, expect, beforeEach } from 'vitest'
import CreateDeckForm from '@/DeckBuilder/Infrastructure/Components/CreateDeckForm.vue'
import { fireEvent, render, type RenderResult } from '@testing-library/vue'

let component: RenderResult
let input: HTMLInputElement
let button: HTMLElement

beforeEach(() => {
  component = render(CreateDeckForm)
  input = component.getByPlaceholderText('Deck name...')
  button = component.getByText('New')
})

it('should emit new-deck event when submit the input and resets', async () => {
  await fireEvent.update(input, 'Expected Deck')
  await fireEvent.submit(input)

  expect(component.emitted()['new-deck'][0]).toEqual(['Expected Deck'])
  expect(input.value).toBe('')
})

it('should emit new-deck event when click the submit button and resets', async () => {
  await fireEvent.update(input, 'Expected Deck')
  await fireEvent.click(button)

  expect(component.emitted()['new-deck'][0]).toEqual(['Expected Deck'])
  expect(input.value).toBe('')
})
