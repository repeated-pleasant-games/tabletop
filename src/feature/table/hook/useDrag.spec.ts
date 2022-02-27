import { renderHook } from '@testing-library/react-hooks'
import { useDrag } from './useDrag'

describe('useDrag hook', () => {
  it('Starts with a pointer position of [0,0].', () => {
    const { result } = renderHook(() => useDrag({
      onMove: () => {}
    }))

    expect(result.current.pointerPosition).toEqual([0, 0])
  })

  it('Starts with a movement delta of [0,0].', () => {
    const { result } = renderHook(() => useDrag({
      onMove: () => {}
    }))

    expect(result.current.movementDelta).toEqual([0, 0])
  })

  it('Starts with a pointer type of "mouse".', () => {
    const { result } = renderHook(() => useDrag({
      onMove: () => {}
    }))

    expect(result.current.pointerType).toBe('mouse')
  })
})
