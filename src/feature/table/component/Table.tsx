import React from 'react'

export const Table = ({
  grid: Grid
}: {
  grid: () => JSX.Element
}): JSX.Element => (
  <svg>
    <Grid />
  </svg>
)
