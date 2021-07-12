import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducer'

class Store {
    public static gen() {
        const prod = process.env['NODE_ENV'] === 'production'
        if (!prod) {
            const logger = require('redux-logger').default
            return applyMiddleware(thunk, logger)(createStore)(reducer)
        }
        const old = { ...console }
        console = new Proxy(old, {
            get() {
                return () => old.log('console is disable in production mode')
            }
        })
        return applyMiddleware(thunk)(createStore)(reducer)
    }
}

export default Store.gen()
