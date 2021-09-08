import React from 'react'

export const Table = ({
  grid: Grid
}: {
  grid: () => JSX.Element
}): JSX.Element => (
  <svg
    style={{
      width: '100%',
      height: '100%'
    }}
  >
    <Grid />
  </svg>
)
