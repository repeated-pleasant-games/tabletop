import {
  composeTransforms,
  identityTransform,
  Transform,
  toSvgMatrix,
  translateBy,
  translation,
  scaleBy,
  scale,
  getScale,
  transformerOf,
  apply,
  determinantOf,
  inverseOf,
  negationOf,
  transformOf
} from './Transform'

describe('identityTransform', () => {
  it('Produces the identity matrix', () => {
    expect(identityTransform()).toStrictEqual(
      [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ])
  })
})

describe('transformToSvgString', () => {
  it('Converts transform to SVG transform matrix', () => {
    expect(
      toSvgMatrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]))
      .toBe('matrix(1,2,4,5,3,6)')
  })
})

describe('translateBy', () => {
  it('Increments translation by given dx and dy pair', () => {
    const original: Transform = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]

    const firstTranslation: Transform = translateBy([10, 20], original)

    expect(firstTranslation).toStrictEqual([
      [1, 0, 10],
      [0, 1, 20],
      [0, 0, 1]
    ])

    const secondTranslation: Transform = translateBy([4, 5], firstTranslation)

    expect(secondTranslation).toStrictEqual([
      [1, 0, 14],
      [0, 1, 25],
      [0, 0, 1]
    ])
  })
})

describe('translation', () => {
  it('Creates a new transform matrix with the x and y fields set.', () => {
    expect(translation(3, 5)).toStrictEqual([
      [1, 0, 3],
      [0, 1, 5],
      [0, 0, 1]
    ])
  })
})

describe('scaleBy', () => {
  it('Multiplies transform scale X and scale Y by scale factor.', () => {
    expect(scaleBy(5, identityTransform())).toStrictEqual([
      [5, 0, 0],
      [0, 5, 0],
      [0, 0, 1]
    ])
  })
})

describe('scale', () => {
  it('Creates a new transform with scale X and scale Y equal to factor.', () => {
    expect(scale(5)).toStrictEqual([
      [5, 0, 0],
      [0, 5, 0],
      [0, 0, 1]
    ])
  })
})

describe('getScale', () => {
  it('Returns the scale X and scale Y values of a transform.', () => {
    expect(getScale([
      [5, 0, 0],
      [0, 6, 0],
      [0, 0, 1]
    ]))
      .toStrictEqual([5, 6])
  })
})

describe('apply', () => {
  it('Multiplies two transforms together', () => {
    const transformOne: Transform = [
      [1, 0, 5],
      [0, 1, 5],
      [0, 0, 1]
    ]

    const transformTwo: Transform = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 1]
    ]

    expect(composeTransforms(transformOne, transformTwo))
      .toStrictEqual([
        [36, 42, 8],
        [39, 45, 11],
        [7, 8, 1]
      ])

    expect(composeTransforms(transformTwo, transformOne))
      .toStrictEqual([
        [1, 2, 18],
        [4, 5, 51],
        [7, 8, 76]
      ])
  })
})

describe('transformerOf', () => {
  it('Creates a function that applies a transform to another transform', () => {
    const transformOne: Transform = [
      [1, 0, 5],
      [0, 1, 5],
      [0, 0, 1]
    ]

    const transformTwo: Transform = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 1]
    ]

    expect(transformerOf(transformOne)(transformTwo))
      .toStrictEqual([
        [36, 42, 8],
        [39, 45, 11],
        [7, 8, 1]
      ])
  })
})

describe('apply', () => {
  it('Multiplies a vector by the given transform.', () => {
    const transform: Transform = [
      [1, 0, 5],
      [0, 1, 5],
      [0, 0, 1]
    ]

    expect(apply(transform, [1, 1])).toStrictEqual([6, 6])
  })
})

describe('determinantOf', () => {
  it('Generates a determinant for the given transform.', () => {
    const transform: Transform = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]

    expect(determinantOf(transform)).toEqual(1)
  })
})

describe('inverseOf', () => {
  it.each([
    [
      [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ] as Transform,
      [
        [1, -0, 0],
        [-0, 1, -0],
        [0, -0, 1]
      ] as Transform
    ],
    [
      [
        [1, 2, 0],
        [2, 3, 0],
        [0, 0, 1]
      ] as Transform,
      [
        [-3, 2, -0],
        [2, -1, 0],
        [-0, 0, 1]
      ] as Transform
    ]
  ])(
    'Creates the inverse of the given transform.',
    (
      initialTransform: Transform,
      inverseTransform: Transform
    ) => {
      expect(inverseOf(initialTransform)).toStrictEqual(inverseTransform)
    }
  )

  it('Throws exception if transform cannot be inverted.', () => {
    const transform: Transform = [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1]
    ]

    expect(() => inverseOf(transform)).toThrow('Transform cannot be inverted.')
  })
})

describe('negationOf', () => {
  it('Creates a transform with negated translation.', () => {
    const transform: Transform = [
      [1, 0, 4],
      [0, 1, -3],
      [0, 0, 1]
    ]

    expect(negationOf(transform)).toStrictEqual([
      [1, 0, -4],
      [0, 1, 3],
      [0, 0, 1]
    ])
  })

  it('Creates a transform with inverted scale values.', () => {
    const transform: Transform = [
      [2, 0, 0],
      [0, 3, 0],
      [0, 0, 1]
    ]

    expect(negationOf(transform)).toStrictEqual([
      [1 / 2, 0, 0],
      [0, 1 / 3, 0],
      [0, 0, 1]
    ])
  })
})

describe('transformOf', () => {
  it('Creates a transform with the provided scale and position', () => {
    expect(
      transformOf(1, 2, 3)
    ).toEqual([
      [3, 0, 1],
      [0, 3, 2],
      [0, 0, 1]
    ])
  })
})
