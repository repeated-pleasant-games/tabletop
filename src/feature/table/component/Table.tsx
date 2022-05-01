import React from 'react'

import useLocalStore from '@/store/local'
import { scaleBy, translateBy } from '@/lib/Transform'
import orchestrate from '@/lib/orchestrate'
import { Cursor } from '@/component/Cursor'

import { Token } from '../feature/token'
import { useScroll } from '../hook/useScroll'
import { useDrag } from '../hook/useDrag'

export const Table = ({
  background: Background
}: {
  background: () => JSX.Element
}): JSX.Element => {
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

  const {
    pointerPosition: [dragX, dragY],
    pointerType: dragPointerType,
    eventListeners: dragEventListeners
  } = useDrag()

  React.useEffect(
    () => {
      setViewTransform(
        translateBy(
          [
            dragX - prevPointerPosition.current[0],
            dragY - prevPointerPosition.current[1]
          ],
          viewTransform
        )
      )

      prevPointerPosition.current = [dragX, dragY]
    },
    [dragX, dragY]
  )

  React.useEffect(() => {
    setPointerType(dragPointerType)
  }, [dragPointerType])

  const { scrollY, eventListeners: scrollEventListeners } = useScroll()

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
      onPointerMoveCapture={orchestrate(
        (e) => setPointerPosition([e.clientX, e.clientY]),
        dragEventListeners.onPointerMoveCapture
      )}
      // eslint-disable-next-line react/jsx-handler-names
      onPointerDown={orchestrate(
        (e) => { prevPointerPosition.current = [e.clientX, e.clientY] },
        dragEventListeners.onPointerDown
      )}
      // eslint-disable-next-line react/jsx-handler-names
      onPointerUp={dragEventListeners.onPointerUp}
      {...scrollEventListeners}
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
