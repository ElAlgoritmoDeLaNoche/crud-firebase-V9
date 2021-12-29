import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './App'
import { Provider } from 'react-redux'
import Store from './redux/Store'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
