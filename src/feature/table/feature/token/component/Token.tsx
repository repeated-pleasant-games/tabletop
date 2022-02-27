import React from 'react'

import useLocalStore from '@/store/local'
import { toSvgMatrix } from '@/lib/Transform'

export const Token = (): JSX.Element => {
  const x = 0
  const y = 0

  const viewTransform = useLocalStore(({ viewTransform }) => viewTransform)

  return (
    <rect
      x={x} y={y}
      width='70' height='70'
      transform={toSvgMatrix(viewTransform)}
    />
  )
}
