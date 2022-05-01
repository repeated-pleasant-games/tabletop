export type Transform = [
  [ number, number, number ],
  [ number, number, number ],
  [ number, number, number ],
]

export const identityTransform = (): Transform =>
  ([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ])

export const toSvgMatrix = (
  [
    [a, b, x],
    [c, d, y]

  ]: Transform
): string =>
  `matrix(${a},${b},${c},${d},${x},${y})`

export const translateBy = (
  [dx, dy]: [ number, number ],
  transform: Transform
): Transform =>
  composeTransforms(
    translation(dx, dy),
    transform)

export const translation = (dx: number, dy: number): Transform =>
  ([
    [1, 0, dx],
    [0, 1, dy],
    [0, 0, 1]
  ])

export const scaleBy = (factor: number, transform: Transform): Transform =>
  composeTransforms(
    scale(factor),
    transform
  )

export const scale = (factor: number): Transform =>
  ([
    [factor, 0, 0],
    [0, factor, 0],
    [0, 0, 1]
  ])

export const getScale = (
  [
    [scaleX, ,],
    [, scaleY],
    [, ,]
  ]: Transform
): [ scaleX: number, scaleY: number ] =>
  ([scaleX, scaleY])

/**
 * Applies the first transform to the second by performing matrix multiplication.
 * @param a The transform to apply.
 * @param b The transform to apply to.
 */
export const composeTransforms = (
  [
    [a11, a12, a13],
    [a21, a22, a23],
    [a31, a32, a33]
  ]: Transform,
  [
    [b11, b12, b13],
    [b21, b22, b23],
    [b31, b32, b33]
  ]: Transform
): Transform =>
  ([
    [
      (a11 * b11) + (a12 * b21) + (a13 * b31),
      (a11 * b12) + (a12 * b22) + (a13 * b32),
      (a11 * b13) + (a12 * b23) + (a13 * b33)
    ],
    [
      (a21 * b11) + (a22 * b21) + (a23 * b31),
      (a21 * b12) + (a22 * b22) + (a23 * b32),
      (a21 * b13) + (a22 * b23) + (a23 * b33)
    ],
    [
      (a31 * b11) + (a32 * b21) + (a33 * b31),
      (a31 * b12) + (a32 * b22) + (a33 * b32),
      (a31 * b13) + (a32 * b23) + (a33 * b33)
    ]
  ])

export type Transformer = (_: Transform) => Transform

export const transformerOf = (a: Transform): Transformer =>
  (b: Transform) =>
    composeTransforms(a, b)

export const apply = (
  [
    [t11, t12, t13],
    [t21, t22, t23]
  ]: Transform,
  [x, y]: [ number, number ]
): [ number, number ] =>
  ([
    t11 * x + t12 * y + t13,
    t21 * x + t22 * y + t23
  ])

export const determinantOf = (
  [
    [a, b, c],
    [d, e, f],
    [g, h, i]
  ]: Transform
): number =>
  (
    // Source: https://en.wikipedia.org/wiki/Determinant
    (a * e * i) + (b * f * g) + (c * d * h) - (c * e * g) - (b * d * i) - (a * f * h)
  )

export const inverseOf = (t: Transform): Transform => {
  const det = determinantOf(t)

  if (det === 0) throw new Error('Transform cannot be inverted.')

  const [
    [a, b, c],
    [d, e, f],
    [g, h, i]
  ] = t

  return [
    [
      (e * i - f * h) / det,
      -1 * (b * i - c * h) / det,
      (b * f - c * e) / det
    ],
    [
      -1 * (d * i - f * g) / det,
      (a * i - c * g) / det,
      -1 * (a * f - c * d) / det
    ],
    [(d * h - e * g) / det, -1 * (a * h - b * g) / det, (a * e - b * d) / det]
  ]
}

export const negationOf = ([
  [sx, , x],
  [, sy, y]
]: Transform): Transform =>
  ([
    // We check to see if x and y are zero because, for some reason, JavaScript
    // considers 0 and -0 to be different values.
    [1 / sx, 0, x == 0 ? 0 : -(x)], // eslint-disable-line eqeqeq
    [0, 1 / sy, y == 0 ? 0 : -(y)], // eslint-disable-line eqeqeq
    [0, 0, 1]
  ])

export const transformOf = (x: number, y: number, s: number): Transform => [
  [s, 0, x],
  [0, s, y],
  [0, 0, 1]
]
