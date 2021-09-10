import React from 'react'

import { Editor } from '@/feature/editor'

export default (): JSX.Element => (
  <main
    style={{
      display: 'grid',
      width: '100vw',
      height: '100vh'
    }}
  >
    <Editor />
  </main>
)
