import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import { Auth0Provider } from 'auth'
import theme from './theme'
import { App } from './components'
import * as serviceWorker from './serviceWorker'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Nunito', sans-serif;
    color: ${props => props.theme.colors.primaryBlue};
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }
`

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Router>
      <Auth0Provider
        domain={'dev-d3vsj4pm.auth0.com'}
        client_id={'jXyOUy9aLUPgSNdQ1iRajZicKyWc2z0i'}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        <App />
      </Auth0Provider>
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
