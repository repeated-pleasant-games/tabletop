import { identityTransform, Transform } from '@/lib/Transform'

interface TableStateSlice {
  viewTransform: Transform
}

export const createTableStateSlice = (): TableStateSlice => ({
  viewTransform: identityTransform()
})
