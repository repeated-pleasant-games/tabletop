import React from 'react'

import useLocalStore from '@/store/local'
import { inverseOf, apply, toSvgMatrix } from '@/lib/Transform'

import { useDrag } from '@/feature/table/hook/useDrag'
import orchestrate from '@/lib/orchestrate'

export const Token = (): JSX.Element => {
  const [[x, y], setPosition] = React.useState<[number, number]>([0, 0])
  const [[deltaX, deltaY], setDelta] = React.useState<[number, number]>([0, 0])

  const {
    pointerPosition: [pointerX, pointerY],
    eventListeners: {
      onPointerDown,
      ...eventListeners
    }
  } = useDrag()

  const viewTransform = useLocalStore(({ viewTransform }) => viewTransform)

  React.useEffect(
    () => {
      setPosition(
        apply(
          inverseOf(viewTransform),
          [pointerX + deltaX, pointerY + deltaY]
        )
      )
    },
    [pointerX, pointerY]
  )

  return (
    <rect
      x={x} y={y}
      width='70' height='70'
      transform={toSvgMatrix(viewTransform)}
      onPointerDown={orchestrate(
        onPointerDown,
        ({ clientX, clientY }) => {
          const [screenX, screenY] = apply(viewTransform, [x, y])

          setDelta([
            screenX - clientX,
            screenY - clientY
          ])
        }
      )}
      {...eventListeners}
    />
  )
}
