import React from 'react'

import useLocalStore from '@/store/local'
import { toSvgMatrix } from '@/lib/Transform'

export const Token = (): JSX.Element => {
  const viewTransform = useLocalStore(({ viewTransform }) => viewTransform)

  return (
    <rect width='70' height='70' transform={toSvgMatrix(viewTransform)} />
  )
}
