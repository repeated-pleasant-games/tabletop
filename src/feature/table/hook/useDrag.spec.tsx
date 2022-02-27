import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { useDrag } from './useDrag'

describe('useDrag hook initial call', () => {
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

describe('useDrag hook event listeners', () => {
  it('Invokes onMove callback after pointer down and pointer move.', () => {
    const onMove = jest.fn()

    const Component = (): JSX.Element => {
      const { pointerPosition: [pointerX, pointerY], eventListeners } =
        useDrag({
          onMove
        })

      return (
        <div
          data-testid='component'
          style={{
            top: pointerY,
            left: pointerX
          }}
          {...eventListeners}
        />
      )
    }

    const { getByTestId } = render(<Component />)
    const component = getByTestId('component')

    fireEvent.pointerDown(component)
    fireEvent.pointerMove(component)

    expect(onMove).toBeCalled()
  })

  it('Does not invoke onMove callback on only pointerMove.', () => {
    const onMove = jest.fn()

    const Component = (): JSX.Element => {
      const { pointerPosition: [pointerX, pointerY], eventListeners } =
        useDrag({
          onMove
        })

      return (
        <div
          data-testid='component'
          style={{
            top: pointerY,
            left: pointerX
          }}
          {...eventListeners}
        />
      )
    }

    const { getByTestId } = render(<Component />)
    const component = getByTestId('component')

    fireEvent.pointerMove(component)

    expect(onMove).not.toBeCalled()
  })
})
