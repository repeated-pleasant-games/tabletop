import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { useDrag } from './useDrag'

import '@/test/pointer-event'

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

  it('Starts with isDragging as false.', () => {
    const { result } = renderHook(() => useDrag({
      onMove: () => {}
    }))

    expect(result.current.isDragging).toBe(false)
  })

  it('Updates pointer position on mouse move.', () => {
    const Component = (): JSX.Element => {
      const {
        pointerPosition: [pointerX, pointerY],
        eventListeners
      } = useDrag({ onMove: () => {} })

      return (
        <div
          style={{
            left: `${pointerX}px`,
            top: `${pointerY}px`
          }}
          data-testid='component'
          {...eventListeners}
        />
      )
    }

    const { getByTestId } = render(<Component />)

    const component = getByTestId('component')
    fireEvent.pointerDown(component, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(component, { clientX: 1, clientY: 2 })

    expect(component.style.left).toBe('1px')
    expect(component.style.top).toBe('2px')
  })

  it('Updates pointer delta on mouse move.', () => {
    const Component = (): JSX.Element => {
      const {
        movementDelta: [dX, dY],
        eventListeners
      } = useDrag({ onMove: () => {} })

      return (
        <div
          data-testid='component'
          {...eventListeners}
        >
          {dX}, {dY}
        </div>
      )
    }

    const { getByTestId } = render(<Component />)

    const component = getByTestId('component')
    fireEvent.pointerDown(component, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(component, { clientX: 2, clientY: 1 })

    expect(component.textContent).toBe('2, 1')
  })
})
