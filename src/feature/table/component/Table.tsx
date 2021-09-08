import React from 'react'

export const Table = ({
  background: Background
}: {
  background: () => JSX.Element
}): JSX.Element => (
  <svg
    style={{
      width: '100%',
      height: '100%'
    }}
  >
    <Background />
  </svg>
)
