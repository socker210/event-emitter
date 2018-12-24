import { isNullOrUndefined } from './util'

export default class EventEmitter {
  constructor () {
    this.listeners = {}
  }

  /**
   * @param {string} event
   * @param {function} cb
   */
  on (event, cb) {
    if (isNullOrUndefined(event)) throw new Error('event must be string')
    if (isNullOrUndefined(cb)) throw new Error('callback must be function')

    const events = this.listeners[event] || new Set()
    this.listeners[event] = events

    if (events.has(cb)) throw new Error('duplicated callback')

    events.add(cb)

    return this
  }

  /**
   * @param {string} event
   * @param {function} cb
   */
  off (event, cb) {
    if (isNullOrUndefined(event)) throw new Error('event must be string')
    if (isNullOrUndefined(cb)) throw new Error('callback must be function')
    if (!this.listeners[event]) throw new Error(`'${event}' is not added`)
    if (!this.listeners[event].has(cb)) throw new Error('callback is not added')

    this.listeners[event].delete(cb)

    if (!this.listeners[event].size) {
      delete this.listeners[event]
    }

    return this
  }

  /**
   * @param {string} event
   * @param {any} data
   */
  emit (event, ...data) {
    if (isNullOrUndefined(event)) throw new Error('event must be string')
    if (!this.listeners[event]) throw new Error(`'${event}' is not added`)

    this.listeners[event].forEach(cb => cb(...data))
  }

  /**
   * @param {string} event
   * @return {boolean}
   */
  hasEvent (event) {
    if (isNullOrUndefined(event)) throw new Error('event must be string')

    return !!this.listeners[event]
  }

  /**
   * @param {string} event
   * @param {function} cb
   * @return {boolean}
   */
  hasCallback (event, cb) {
    if (isNullOrUndefined(event)) throw new Error('event must be string')
    if (isNullOrUndefined(cb)) throw new Error('callback must be function')

    const hasEvent = this.hasEvent(event)

    return hasEvent && this.listeners[event].has(cb)
  }
}