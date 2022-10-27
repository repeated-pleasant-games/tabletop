import React from 'react'

import useLocalStore from '@/store/local'
import { getScale, inverseOf, toSvgMatrix } from '@/lib/Transform'

const GRID_CELL_WIDTH = 70 // Roll20 uses a 70px grid. 70px ~ 1in
const PATTERN_ID = 'rectangular-grid-pattern'

export const RectangularGrid = (): JSX.Element => {
  const viewTransform = useLocalStore(({ viewTransform }) => viewTransform)

  return (
    <>
      <defs>
        <pattern
          id={PATTERN_ID}
          width={GRID_CELL_WIDTH}
          height={GRID_CELL_WIDTH}
          patternUnits='userSpaceOnUse'
          patternTransform={toSvgMatrix(viewTransform)}
        >
          <path
            stroke='lightgrey'
            fill='none'
            d={`M ${GRID_CELL_WIDTH},0 L 0,0 0,${GRID_CELL_WIDTH} ${GRID_CELL_WIDTH},${GRID_CELL_WIDTH}`}
            strokeWidth={1 * getScale(inverseOf(viewTransform))[0]}
          />
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill={`url(#${PATTERN_ID})`} />
    </>
  )
}
