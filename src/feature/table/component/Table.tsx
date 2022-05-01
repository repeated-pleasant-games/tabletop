import React from 'react'

import useLocalStore from '@/store/local'
import { scaleBy, translateBy } from '@/lib/Transform'
import { Cursor } from '@/component/Cursor'

import { Token } from '../feature/token'
import { useScroll } from '../hook/useScroll'

export const Table = ({
  background: Background
}: {
  background: () => JSX.Element
}): JSX.Element => {
  const capturedPointerId = React.useRef<number>(-1)
  const prevPointerPosition = React.useRef<[x: number, y: number]>([0, 0])
  const [pointerType, setPointerType] =
    React.useState<'mouse' | 'pen' | 'touch'>('mouse')

  const [showPointer, setShowPointer] = React.useState(false)
  const [pointerPosition, setPointerPosition] =
    React.useState<[x: number, y: number]>([0, 0])

  const [viewTransform, setViewTransform] = useLocalStore(
    ({ viewTransform, setViewTransform }) =>
      [viewTransform, setViewTransform]
  )

  const { scrollY, eventListeners } = useScroll()

  React.useEffect(
    () => {
      if (scrollY !== 0) {
        const scrollMagnitude = Math.abs(scrollY) * 0.01
        const factor = scrollY > 0 ? 1 - scrollMagnitude : 1 + scrollMagnitude
        setViewTransform(scaleBy(factor, viewTransform))
      }
    },
    [scrollY]
  )

  return (
    <svg
      style={{
        width: '100%',
        height: '100%',
        cursor: 'none'
      }}
      onPointerEnter={() => setShowPointer(true)}
      onPointerLeave={({ pointerId, target }) => {
        (target as Element).releasePointerCapture(pointerId)
        setShowPointer(false)
      }}
      onPointerDown={({ pointerId, target, clientX, clientY }) => {
        capturedPointerId.current = pointerId
        prevPointerPosition.current = [clientX, clientY]

        ;(target as Element).setPointerCapture(pointerId)
      }}
      onPointerMoveCapture={({ clientX, clientY, pointerType }) => {
        setPointerType(pointerType)
        setPointerPosition([clientX, clientY])

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
        capturedPointerId.current = -1
        ;(target as Element).releasePointerCapture(pointerId)
      }}
      {...eventListeners}
    >
      <Background />
      <Token />
      {
        showPointer && pointerType === 'mouse'
          ? (
            <Cursor
              x={pointerPosition[0]}
              y={pointerPosition[1]}
              fill='black'
            />
          )
          : null
      }
    </svg>
  )
}
