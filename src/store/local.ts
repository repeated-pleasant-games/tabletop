import create from 'zustand'

export default create(() => ({
  viewTransform: [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ]
}))
