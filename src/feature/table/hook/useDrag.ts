import React from 'react'

type PointerType = 'mouse' | 'touch' | 'pen'

interface UseDragOptions {
  onMove: (e: React.PointerEvent) => void
}

interface UseDragResult {
  isDragging: boolean
  pointerPosition: [number, number]
  movementDelta: [number, number]
  pointerType: PointerType
  eventListeners: {
    onPointerDown: (e: React.PointerEvent) => void
    onPointerMoveCapture: (e: React.PointerEvent) => void
    onPointerUp: (e: React.PointerEvent) => void
  }
}

export const useDrag = (
  {
    onMove
  }: UseDragOptions
): UseDragResult => {
  const [isPointerDown, setIsPointerDown] = React.useState(false)

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
    isDragging: isPointerDown,
    pointerPosition: [pointerX, pointerY],
    movementDelta: pointerDelta.current,
    pointerType,
    eventListeners: {
      onPointerDown: () => {
        setIsPointerDown(true)
      },
      onPointerMoveCapture: ({ pointerType, clientX, clientY }) => {
        if (isPointerDown) {
          setPointerType(pointerType)
          setPointerPosition([clientX, clientY])
        }
      },
      onPointerUp: () => {
        setIsPointerDown(false)
      }
    }
  }
}
