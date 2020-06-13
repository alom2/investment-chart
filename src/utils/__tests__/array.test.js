import { getLast, getLastIndex } from '../array'


describe('Array utils', () => {
  it('getLast', () => {
    const array = [1, 2]
    expect(getLast(array)).toBe(2)
  })
  it('getLastIndex', () => {
    const array = [1, 2]
    expect(getLastIndex(array)).toBe(1)
  })
})