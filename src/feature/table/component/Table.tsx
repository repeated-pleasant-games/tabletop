import React from 'react'

import useLocalStore from '@/store/local'
import { translateBy } from '@/lib/Transform'

export const Table = ({
  background: Background
}: {
  background: () => JSX.Element
}): JSX.Element => {
  const capturedPointerId = React.useRef<number>(-1)
  const prevPointerPosition = React.useRef<[x: number, y: number]>([0, 0])

  const [viewTransform, setViewTransform] = useLocalStore(
    ({ viewTransform, setViewTransform }) =>
      [viewTransform, setViewTransform]
  )

  return (
    <svg
      style={{
        width: '100%',
        height: '100%'
      }}
      onPointerDown={({ pointerId, target, clientX, clientY }) => {
        capturedPointerId.current = pointerId
        prevPointerPosition.current = [clientX, clientY];

        (target as Element).setPointerCapture(pointerId)
      }}
      onPointerMoveCapture={({ clientX, clientY }) => {
        if (capturedPointerId.current !== -1) {
          setViewTransform(
            translateBy(
              [
                clientX - prevPointerPosition.current[0],
                clientY - prevPointerPosition.current[1]
              ],
              viewTransform
            )
          )

          prevPointerPosition.current = [clientX, clientY]
        }
      }}
      onPointerUp={({ pointerId, target }) => {
        capturedPointerId.current = -1;
        (target as Element).releasePointerCapture(pointerId)
      }}
    >
      <Background />
    </svg>
  )
}
