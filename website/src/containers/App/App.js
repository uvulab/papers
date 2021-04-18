import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

function App({ routes, store }) {
  return (
    <Provider store={store}>
      <Router>{routes}</Router>
    </Provider>
  )
}

export default App
