import React from 'react'

import { Table } from '@/feature/table'

const Grid = (): JSX.Element => (
  <rect width='100%' height='100%' />
)

export default (): JSX.Element => (
  <Table grid={Grid} />
)
