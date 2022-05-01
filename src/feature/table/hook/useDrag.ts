import React from 'react'

type PointerType = 'mouse' | 'touch' | 'pen'

interface UseDragResult {
  isDragging: boolean
  pointerPosition: [number, number]
  movementDelta: [number, number]
  pointerType: PointerType
  eventListeners: {
    onPointerDown: (e: React.PointerEvent) => void
    onPointerMove: (e: React.PointerEvent) => void
    onPointerUp: (e: React.PointerEvent) => void
  }
}

export const useDrag = (): UseDragResult => {
  const [isPointerDown, setIsPointerDown] = React.useState(false)

  const [[pointerX, pointerY], setPointerPosition] = React.useState([0, 0])
  const [[deltaX, deltaY], setPointerDelta] = React.useState([0, 0])

  const prevPointerPosition = React.useRef<[number, number]>([0, 0])

  React.useEffect(
    () => {
      const [prevX, prevY] = prevPointerPosition.current
      setPointerDelta([pointerX - prevX, pointerY - prevY])
    },
    [pointerX, pointerY]
  )

  const [pointerType, setPointerType] =
    React.useState<PointerType>('mouse')

  return {
    isDragging: isPointerDown,
    pointerPosition: [pointerX, pointerY],
    movementDelta: [deltaX, deltaY],
    pointerType,
    eventListeners: {
      onPointerDown: (e) => {
        e.preventDefault()
        e.stopPropagation()

        const { target, pointerId } = e

        setIsPointerDown(true)

        ;(target as Element).setPointerCapture(pointerId)
      },
      onPointerMove: (e) => {
        if (isPointerDown) {
          e.preventDefault()
          e.stopPropagation()

          const { pointerType, clientX, clientY } = e

          setPointerType(pointerType)
          setPointerPosition(([prevX, prevY]) => {
            prevPointerPosition.current = [prevX, prevY]
            return [clientX, clientY]
          })
        }
      },
      onPointerUp: (e) => {
        e.preventDefault()
        e.stopPropagation()

        const { target, pointerId } = e

        setIsPointerDown(false)

        ;(target as Element).releasePointerCapture(pointerId)
      }
    }
  }
}
