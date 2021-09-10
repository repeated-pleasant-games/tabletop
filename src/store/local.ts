import create from 'zustand'

import { createTableStateSlice } from '@/feature/table'

export default create(() => ({
  ...createTableStateSlice()
}))
