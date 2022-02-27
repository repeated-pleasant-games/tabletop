import { renderHook } from '@testing-library/react-hooks'
import { useDrag } from './useDrag'

describe('useDrag hook', () => {
  it('Starts with a pointer position of [0,0].', () => {
    const { result } = renderHook(() => useDrag({
      onMove: () => {}
    }))

    expect(result.current.pointerPos).toEqual([0, 0])
  })

  it('Starts with a pointer delta of [0,0].', () => {
    const { result } = renderHook(() => useDrag({
      onMove: () => {}
    }))

    expect(result.current.pointerPos).toEqual([0, 0])
  })
})
