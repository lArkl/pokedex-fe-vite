import { capitalize } from './strings'

describe('capitalize', () => {
  it('returns capitalized string from a single word', () => {
    expect(capitalize('strange')).toBe('Strange')
  })

  it('returns capitalized string from a sentence', () => {
    expect(capitalize('strange world')).toBe('Strange World')
  })

  it('returns capitalized string from a sentence with spacing', () => {
    expect(capitalize(' world')).toBe(' World')
  })
})
