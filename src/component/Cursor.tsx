import React from 'react'

export const Cursor = ({
  x,
  y,
  name,
  fill
}: {
  x: number
  y: number
  name?: string
  fill: string
}): JSX.Element => (
  <g
    transform={`translate(${x},${y})`}
    style={{
      fill
    }}
  >
    <path
      d='
        M 120.099,388.586
        L 231.762,134.739
        L 343.424,388.586
        L 231.762,355.867
        L 120.099,388.586
        Z
      '
      transform='
        scale(0.025)
        matrix(1.82605,-0.803689,0.803689,1.82605,-531.498,-59.7769)
        scale(1.3)
        translate(-55, -65)
      '
      fill='white'
    />
    <path
      d='
        M 120.099,388.586
        L 231.762,134.739
        L 343.424,388.586
        L 231.762,355.867
        L 120.099,388.586
        Z
      '
      transform='
        scale(0.025)
        matrix(1.82605,-0.803689,0.803689,1.82605,-531.498,-59.7769)
      '
    />
    {
      name !== undefined
        ? (
          <text x={10} y={24}>
            {name}
          </text>
        )
        : null
    }
  </g>
)
