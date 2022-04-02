// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
if (!global.PointerEvent) {
  class PointerEvent extends MouseEvent {
    public pointerId?: number
    public pointerType?: string

    public isPrimary?: boolean

    public height?: number
    public width?: number

    public pressure?: number
    public tangentialPressure?: number

    public tiltX?: number
    public tiltY?: number

    public twist?: number

    constructor (type: string, params: PointerEventInit = {}) {
      super(type, params)

      this.pointerId = params.pointerId
      this.pointerType = params.pointerType
      this.isPrimary = params.isPrimary
      this.height = params.height
      this.width = params.width
      this.pressure = params.pressure
      this.tangentialPressure = params.tangentialPressure
      this.tiltX = params.tiltX
      this.tiltY = params.tiltY
      this.twist = params.twist
    }
  }

  global.PointerEvent = PointerEvent as any
}

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
if (!global.Element.prototype.setPointerCapture) {
  global.Element.prototype.setPointerCapture = () => null
}

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
if (!global.Element.prototype.releasePointerCapture) {
  global.Element.prototype.releasePointerCapture = () => null
}
