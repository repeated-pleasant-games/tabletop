import create from 'zustand'

import { createTableStateSlice } from '@/feature/table'

export default create<ReturnType<typeof createTableStateSlice>>((set) => ({
  ...createTableStateSlice(set)
}))
