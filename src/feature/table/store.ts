import { SetState } from 'zustand'
import { identityTransform, Transform } from '@/lib/Transform'

interface TableStateSlice {
  viewTransform: Transform
  setViewTransform: (t: Transform) => void
}

export const createTableStateSlice = (
  set: SetState<TableStateSlice>
): TableStateSlice => ({
  viewTransform: identityTransform(),
  setViewTransform: (viewTransform: Transform) =>
    set((prevState) => ({
      ...prevState,
      viewTransform
    }))
})
