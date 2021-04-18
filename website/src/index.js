import React from 'react'
import ReactDOM from 'react-dom'
import { initScripts } from './utils'
import createStore from './store/createStore'
import { version } from '../package.json'
import { env } from './config'
import App from './containers/App'
import './index.css'
import 'semantic-ui-css/semantic.min.css'

window.version = version
window.env = env
initScripts()

const initialState = window.___INITIAL_STATE__ || {
  firebase: { authError: null }
}
const store = createStore(initialState)
const routes = require('./routes/index').default(store)

ReactDOM.render(
  <App store={store} routes={routes} />,
  document.getElementById('root')
)
