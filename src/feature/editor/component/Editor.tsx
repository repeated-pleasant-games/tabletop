import React, { forwardRef } from 'react'

import useLocalStore from '@/store/local'
import { getScale, inverseOf, toSvgMatrix } from '@/lib/Transform'

import { Table } from '@/feature/table'

const GridPattern = forwardRef<SVGPatternElement>((_, ref) => {
  const viewTransform = useLocalStore(({ viewTransform }) => viewTransform)

  return (
    <defs>
      <pattern
        ref={ref}
        id='rectangular-grid-pattern'
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
  )
})

const Grid = (): JSX.Element => {
  const ref = React.useRef<SVGPatternElement>(null)

  return (
    <>
      <GridPattern ref={ref} />
      <rect width='100%' height='100%' fill={`url(#${ref.current?.id ?? ''})`} />
    </>
  )
}

export const Editor = (): JSX.Element => (
  <Table background={Grid} />
)
