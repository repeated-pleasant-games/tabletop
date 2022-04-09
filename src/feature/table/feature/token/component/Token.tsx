import React from 'react'

import useLocalStore from '@/store/local'
import { inverseOf, apply, toSvgMatrix } from '@/lib/Transform'

import { useDrag } from '@/feature/table/hook/useDrag'

export const Token = (): JSX.Element => {
  const [[x, y], setPosition] = React.useState<[number, number]>([0, 0])

  const {
    pointerPosition: [pointerX, pointerY],
    eventListeners
  } = useDrag()

  const viewTransform = useLocalStore(({ viewTransform }) => viewTransform)

  React.useEffect(
    () => {
      setPosition(
        apply(
          inverseOf(viewTransform),
          [pointerX, pointerY]
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
      {...eventListeners}
    />
  )
}
