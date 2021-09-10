import React from 'react'

import useLocalStore from '@/store/local'
import { toSvgMatrix } from '@/lib/Transform'

import { Table } from '@/feature/table'

const Grid = (): JSX.Element => {
  const viewTransform = useLocalStore(({ viewTransform }) => viewTransform)

  return (
    <rect transform={toSvgMatrix(viewTransform)} width='10' height='10' />
  )
}

export const Editor = (): JSX.Element => (
  <Table background={Grid} />
)
