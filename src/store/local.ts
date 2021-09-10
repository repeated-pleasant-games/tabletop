import create from 'zustand'

import { identityTransform } from '@/lib/Transform'

export default create(() => ({
  viewTransform: identityTransform()
}))
