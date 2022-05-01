import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { useScroll } from './useScroll'

describe('useScroll hook', () => {
  it('Starts with a x-scroll value of zero.', () => {
    const { result } = renderHook(() => useScroll())
    expect(result.current.scrollX).toBe(0)
  })

  it('Starts with a y-scroll value of zero.', () => {
    const { result } = renderHook(() => useScroll())
    expect(result.current.scrollY).toBe(0)
  })

  it('Starts with a scroll vector value of zero.', () => {
    const { result } = renderHook(() => useScroll())
    expect(result.current.scrollVector).toEqual([0, 0])
  })

  it('Updates x-scroll on horizontal scroll event.', () => {
    const Component = (): JSX.Element => {
      const { scrollX, eventListeners } = useScroll()

      return (
        <div
          data-testid='component'
          {...eventListeners}
        >
          {scrollX}
        </div>
      )
    }

    const { getByTestId } = render(<Component />)

    const component = getByTestId('component')
    fireEvent.wheel(component, { deltaX: 0 })
    fireEvent.wheel(component, { deltaX: 1 })

    expect(component.textContent).toBe('1')
  })

  it('Updates y-scroll on vertical scroll event.', () => {
    const Component = (): JSX.Element => {
      const { scrollY, eventListeners } = useScroll()

      return (
        <div
          data-testid='component'
          {...eventListeners}
        >
          {scrollY}
        </div>
      )
    }

    const { getByTestId } = render(<Component />)

    const component = getByTestId('component')
    fireEvent.wheel(component, { deltaY: 0 })
    fireEvent.wheel(component, { deltaY: 1 })

    expect(component.textContent).toBe('1')
  })

  it('Multiplies x-scroll by 40 when mode is LINE.', () => {
    const Component = (): JSX.Element => {
      const { scrollX, eventListeners } = useScroll()

      return (
        <div
          data-testid='component'
          {...eventListeners}
        >
          {scrollX}
        </div>
      )
    }

    const { getByTestId } = render(<Component />)

    const component = getByTestId('component')
    fireEvent.wheel(component, { deltaX: 0, deltaMode: 1 })
    fireEvent.wheel(component, { deltaX: 1, deltaMode: 1 })

    expect(component.textContent).toBe('40')
  })

  it('Multiplies y-scroll by 40 when mode is LINE.', () => {
    const Component = (): JSX.Element => {
      const { scrollY, eventListeners } = useScroll()

      return (
        <div
          data-testid='component'
          {...eventListeners}
        >
          {scrollY}
        </div>
      )
    }

    const { getByTestId } = render(<Component />)

    const component = getByTestId('component')
    fireEvent.wheel(component, { deltaY: 0, deltaMode: 1 })
    fireEvent.wheel(component, { deltaY: 1, deltaMode: 1 })

    expect(component.textContent).toBe('40')
  })

  it('Multiplies x-scroll by 800 when mode is PAGE.', () => {
    const Component = (): JSX.Element => {
      const { scrollX, eventListeners } = useScroll()

      return (
        <div
          data-testid='component'
          {...eventListeners}
        >
          {scrollX}
        </div>
      )
    }

    const { getByTestId } = render(<Component />)

    const component = getByTestId('component')
    fireEvent.wheel(component, { deltaX: 0, deltaMode: 2 })
    fireEvent.wheel(component, { deltaX: 1, deltaMode: 2 })

    expect(component.textContent).toBe('800')
  })

  it('Multiplies y-scroll by 800 when mode is PAGE.', () => {
    const Component = (): JSX.Element => {
      const { scrollY, eventListeners } = useScroll()

      return (
        <div
          data-testid='component'
          {...eventListeners}
        >
          {scrollY}
        </div>
      )
    }

    const { getByTestId } = render(<Component />)

    const component = getByTestId('component')
    fireEvent.wheel(component, { deltaY: 0, deltaMode: 2 })
    fireEvent.wheel(component, { deltaY: 1, deltaMode: 2 })

    expect(component.textContent).toBe('800')
  })
})
