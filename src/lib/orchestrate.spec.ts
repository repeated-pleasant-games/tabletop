import orchestrate from './orchestrate'

describe('orchestrate', () => {
  it('Creates a function from an array of functions.', () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()

    const orchestration = orchestrate(fn1, fn2)

    orchestration('hello, world!')

    expect(fn1).toBeCalledWith('hello, world!')
    expect(fn2).toBeCalledWith('hello, world!')

    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(1)
  })
})
