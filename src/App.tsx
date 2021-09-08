import React from 'react'

import { Table } from '@/feature/table'

const Grid = (): JSX.Element => (
  <rect width='100%' height='100%' />
)

export default (): JSX.Element => (
  <main
    style={{
      display: 'grid',
      width: '100vw',
      height: '100vh'
    }}
  >
    <Table background={Grid} />
  </main>
)
