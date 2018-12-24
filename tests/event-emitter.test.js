import EventEmitter from '../src/event-emitter'

let eventEmitter

describe('EVENT EMITTER', () => {
  beforeEach(() => {
    eventEmitter = new EventEmitter()
  })

  it('Create instance of EventEmitter', () => {
    expect(eventEmitter).toBeInstanceOf(EventEmitter)
  })

  describe('REGISTER EVENTS TO EVENT EMITTER', () => {
    it('Register events', () => {
      expect(eventEmitter.on('sum', (val1, val2) => val1 + val2)).toBe(eventEmitter)
      expect(eventEmitter.on('sum', (val1, val2) => val2 + val1)).toBe(eventEmitter)
      expect(eventEmitter.on('sub', (val1, val2) => val1 - val2)).toBe(eventEmitter)
    })

    it('Will throw error that no passed parameters to it', () => {
      expect(() => eventEmitter.on('div')).toThrowError()
      expect(() => eventEmitter.on(undefined, (val1, val2) => val1 * val2)).toThrowError()
    })

    it('Will throw error that callback is duplicated', () => {
      const mul = (val1, val2) => val1 * val2

      expect(eventEmitter.on('mul', mul)).toBe(eventEmitter)
      expect(() => eventEmitter.on('mul', mul)).toThrowError()
    })
  })

  describe('EMIT EVENTS FROM EVENT EMITTER', () => {
    it('Emit a event', () => {
      const doAdd = jest.fn((n1, n2) => n1 + n2)

      expect(eventEmitter.on('add', doAdd)).toBe(eventEmitter)

      eventEmitter.emit('add', 1, 2)

      expect(doAdd).toHaveBeenCalled()
      expect(doAdd).toHaveBeenCalledWith(1, 2)
      expect(doAdd).toHaveReturnedWith(3)
    })

    it('Emit multiple events', () => {
      const doAdd = jest.fn((n1, n2) => n1 + n2)
      const doDouble = jest.fn((n) => n + n)
      const doSub = jest.fn((n1, n2) => n1 - n2)
      const doMul = jest.fn((n1, n2) => n1 * n2)

      expect(eventEmitter.on('add', doAdd)).toBe(eventEmitter)
      expect(eventEmitter.on('add', doDouble)).toBe(eventEmitter)
      expect(eventEmitter.on('sub', doSub)).toBe(eventEmitter)
      expect(eventEmitter.on('mul', doMul)).toBe(eventEmitter)

      eventEmitter.emit('add', 1, 2)
      eventEmitter.emit('sub', 1, 2)
      eventEmitter.emit('mul', 1, 2)

      expect(doAdd).toHaveBeenCalled()
      expect(doAdd).toHaveBeenCalledWith(1, 2)
      expect(doAdd).toHaveReturnedWith(3)

      expect(doDouble).toHaveBeenCalled()
      expect(doDouble).toHaveBeenCalledWith(1, 2)
      expect(doDouble).toHaveReturnedWith(2)

      expect(doSub).toHaveBeenCalled()
      expect(doSub).toHaveBeenCalledWith(1, 2)
      expect(doSub).toHaveReturnedWith(-1)

      expect(doMul).toHaveBeenCalled()
      expect(doMul).toHaveBeenCalledWith(1, 2)
      expect(doMul).toHaveReturnedWith(2)

      expect(doAdd.mock.results[0].value +
             doDouble.mock.results[0].value +
             doSub.mock.results[0].value +
             doMul.mock.results[0].value).toBe(6)
    })

    it('Will throw error that no passed parameters to it', () => {
      expect(eventEmitter.on('add', (n1, n2) => n1 + n2)).toBe(eventEmitter)
      expect(() => eventEmitter.emit()).toThrowError()
    })

    it('Will throw error that event is not defined', () => {
      expect(() => eventEmitter.emit('undefined-event')).toThrowError()
    })
  })

  describe('DELETE EVENTS FROM EVENT EMITTER', () => {
    it('Delete a event', () => {
      const doAdd = jest.fn((n1, n2) => n1 + n2)

      expect(eventEmitter.on('add', doAdd)).toBe(eventEmitter)
      expect(eventEmitter.off('add', doAdd)).toBe(eventEmitter)

      expect(() => eventEmitter.emit('add')).toThrowError()
    })

    it('Delete events', () => {
      const doAdd = jest.fn((n1, n2) => n1 + n2)
      const doDouble = jest.fn((n) => n + n)

      expect(eventEmitter.on('add', doAdd)).toBe(eventEmitter)
      expect(eventEmitter.on('add', doDouble)).toBe(eventEmitter)

      eventEmitter.emit('add', 1, 2)

      expect(doAdd).toHaveBeenCalledWith(1, 2)
      expect(doAdd).toHaveReturnedWith(3)

      expect(doDouble).toHaveBeenCalledWith(1, 2)
      expect(doDouble).toHaveReturnedWith(2)

      expect(eventEmitter.off('add', doAdd)).toBe(eventEmitter)

      eventEmitter.emit('add', 2)

      expect(doDouble).toHaveBeenCalledWith(2)
      expect(doDouble).toHaveReturnedWith(4)

      expect(doAdd.mock.calls.length).toBe(1)
      expect(doDouble.mock.calls.length).toBe(2)

      expect(eventEmitter.off('add', doDouble)).toBe(eventEmitter)

      expect(() => eventEmitter.emit('add', 1, 2)).toThrowError()
    })

    it('Will throw error that no passed parameters to it', () => {
      const doAdd = jest.fn((n1, n2) => n1 + n2)

      expect(eventEmitter.on('add', doAdd)).toBe(eventEmitter)

      expect(() => eventEmitter.off(undefined, doAdd)).toThrowError()
      expect(() => eventEmitter.off('add')).toThrowError()
    })

    it('Will throw error that event is not defined', () => {
      const doAdd = jest.fn((n1, n2) => n1 + n2)

      expect(eventEmitter.on('add', doAdd)).toBe(eventEmitter)

      expect(() => eventEmitter.off('sub', (n1, n2) => n1 - n2)).toThrowError()
    })

    it('Will throw error that event hasn\'t cb', () => {
      const doAdd = jest.fn((n1, n2) => n1 + n2)

      expect(eventEmitter.on('add', doAdd)).toBe(eventEmitter)

      expect(() => eventEmitter.off('add', (n) => n + n)).toThrowError()
    })
  })

  describe('TEST UTIL FUNCTIONS', () => {
    it('has event', () => {
      const doAdd = jest.fn((n1, n2) => n1 + n2)

      expect(eventEmitter.on('add', doAdd)).toBe(eventEmitter)

      expect(eventEmitter.hasEvent('sub')).toBeFalsy()
      expect(eventEmitter.hasEvent('add')).toBeTruthy()
    })

    it('has callback', () => {
      const doAdd = jest.fn((n1, n2) => n1 + n2)

      expect(eventEmitter.on('add', doAdd)).toBe(eventEmitter)

      expect(eventEmitter.hasCallback('sub', doAdd)).toBeFalsy()
      expect(eventEmitter.hasCallback('add', (n) => n + n)).toBeFalsy()
      expect(eventEmitter.hasCallback('add', doAdd)).toBeTruthy()
    })

    it('Will throw error that no passed parameters to it', () => {
      expect(() => eventEmitter.hasEvent()).toThrowError()
      expect(() => eventEmitter.hasCallback('add')).toThrowError()
      expect(() => eventEmitter.hasCallback(undefined, (n) => n + n)).toThrowError()
    })
  })
})