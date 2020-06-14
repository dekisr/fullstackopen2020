import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import App from './App'
import GlobalStyle from './styles/GlobalStyles'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
    <GlobalStyle />
  </Provider>,
  document.getElementById('root')
)
