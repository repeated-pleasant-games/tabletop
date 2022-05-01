import React from 'react'

interface UseScrollResult {
  scrollX: number
  scrollY: number
  scrollVector: [number, number]
  eventListeners: {
    onWheel: (e: React.WheelEvent) => void
  }
}

// Reasonable defaults according to:
// https://github.com/facebookarchive/fixed-data-table/blob/3a9bf338b22406169e7261f85ddeda22ddce3b6f/src/vendor_upstream/dom/normalizeWheel.js#L20
const LINE_HEIGHT = 40
const PAGE_HEIGHT = 800

enum ScrollMode {
  PIXEL = 0,
  LINE = 1,
  PAGE = 2,
}

export const useScroll = (): UseScrollResult => {
  const [scrollVector, setScrollVector] = React.useState<[ number, number ]>([0, 0])

  return {
    scrollX: scrollVector[0],
    scrollY: scrollVector[1],
    scrollVector,
    eventListeners: {
      onWheel: ({ deltaX, deltaY, deltaMode }) => {
        switch (deltaMode) {
          case ScrollMode.PIXEL: {
            setScrollVector([
              deltaX,
              deltaY
            ])
            break
          }

          case ScrollMode.LINE: {
            setScrollVector([
              deltaX * LINE_HEIGHT,
              deltaY * LINE_HEIGHT
            ])
            break
          }

          case ScrollMode.PAGE: {
            setScrollVector([
              deltaX * PAGE_HEIGHT,
              deltaY * PAGE_HEIGHT
            ])
            break
          }
        }
      }
    }
  }
}
