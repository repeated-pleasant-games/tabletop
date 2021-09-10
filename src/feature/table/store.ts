import { SetState } from 'zustand'
import { identityTransform, Transform, transformOf } from '@/lib/Transform'

interface TableStateSlice {
  viewTransform: Transform
  setViewTransformTo: (pos: [ x: number, y: number ], scale: number) => void
}

export const createTableStateSlice = (
  set: SetState<TableStateSlice>
): TableStateSlice => ({
  viewTransform: identityTransform(),
  setViewTransformTo: ([x, y], scale) =>
    set((prevState) => ({
      ...prevState,
      viewTransform: transformOf(x, y, scale)
    }))
})
