import React from 'react'

import useLocalStore from '@/store/local'
import { getScale, inverseOf, toSvgMatrix } from '@/lib/Transform'

export const RectangularGrid = (): JSX.Element => {
  const viewTransform = useLocalStore(({ viewTransform }) => viewTransform)

  const patternId = 'rectangular-grid-pattern'
  return (
    <>
      <defs>
        <pattern
          id={patternId}
          width='16'
          height='16'
          patternUnits='userSpaceOnUse'
          patternTransform={toSvgMatrix(viewTransform)}
        >
          <path
            stroke='lightgrey'
            fill='none'
            d='M 16,0 L 0,0 0,16 16,16'
            strokeWidth={1 * getScale(inverseOf(viewTransform))[0]}
          />
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill={`url(#${patternId})`} />
    </>
  )
}
