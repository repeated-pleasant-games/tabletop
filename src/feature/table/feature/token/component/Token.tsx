import React from 'react'

import useLocalStore from '@/store/local'
import { toSvgMatrix } from '@/lib/Transform'

import { useDrag } from '@/feature/table/hook/useDrag'

export const Token = (): JSX.Element => {
  const {
    pointerPosition: [x, y],
    eventListeners
  } = useDrag()

  const viewTransform = useLocalStore(({ viewTransform }) => viewTransform)

  return (
    <rect
      x={x} y={y}
      width='70' height='70'
      transform={toSvgMatrix(viewTransform)}
      {...eventListeners}
    />
  )
}
