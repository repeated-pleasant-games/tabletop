import React from 'react'

type PointerType = 'mouse' | 'touch' | 'pen'

interface UseDragOptions {
  onMove: (e: React.PointerEvent) => void
}

interface UseDragResult {
  pointerPos: [number, number]
  pointerDelta: [number, number]
  pointerType: PointerType
  onPointerDown: (e: React.PointerEvent) => void
  onPointerMoveCapture: (e: React.PointerEvent) => void
  onPointerUp: (e: React.PointerEvent) => void
}

export const useDrag = (
  {
    onMove
  }: UseDragOptions
): UseDragResult => {
  const [[pointerX, pointerY], setPointerPosition] = React.useState([0, 0])

  const prevPointerPosition = React.useRef<[number, number]>([0, 0])
  const pointerDelta = React.useRef<[number, number]>([0, 0])

  React.useEffect(
    () => {
      const [prevX, prevY] = prevPointerPosition.current
      pointerDelta.current = [
        prevX - pointerX,
        prevY - pointerY
      ]
    },
    [pointerX, pointerY]
  )

  const [pointerType, setPointerType] =
    React.useState<PointerType>('mouse')

  return {
    pointerPos: [pointerX, pointerY],
    pointerDelta: pointerDelta.current,
    pointerType,
    onPointerDown: () => {

    },
    onPointerMoveCapture: (e) => {
      const { pointerType, clientX, clientY } = e

      setPointerType(pointerType)
      setPointerPosition([clientX, clientY])
    },
    onPointerUp: () => {

    }
  }
}
