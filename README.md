# Event emitter

Simple event emitter like a node

## Installation

With npm
```
npm install @socker210/event-emitter
```

With yarn
```
yarn add @socker210/event-emitter
```

## Usage

```javascript
const EventEmitter = require('@socker210/event-emitter')

const eventEmitter = new EventEmitter()

const cb = () => console.log('callback')

// Register event
eventEmitter.on('print', cb)

// Execute event
eventEmitter.emit('print')

// Check if event is registered
eventEmitter.hasEvent('print')

// Check if event and callback is registered
eventEmitter.hasCallback('print', cb)

// Remove callback
eventEmitter.off('print', cb)
```

## LICENSE

MIT