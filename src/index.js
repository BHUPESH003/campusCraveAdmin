import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { Provider as JotaiProvider } from 'jotai'


// import dotenv from 'dotenv';

// dotenv.config();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <JotaiProvider>
    <App />
    </JotaiProvider>
  </Provider>,
)
