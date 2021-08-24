import React from 'react';
import ReactDOM from 'react-dom';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import App from './App';
import AppStateProvider, { useAppState } from './state';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ErrorDialog from './components/ErrorDialog/ErrorDialog';
// import LoginPage from './components/LoginPage/LoginPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import theme from './theme';
import './types';
import { ChatProvider } from './components/ChatProvider';
import { VideoProvider } from './components/VideoProvider';
import useConnectionOptions from './utils/useConnectionOptions/useConnectionOptions';
import UnsupportedBrowserWarning from './components/UnsupportedBrowserWarning/UnsupportedBrowserWarning';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import locales from './locales';

i18n.use(initReactI18next).init({
  resources: {
    ...locales,
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const VideoApp = () => {
  const { error, setError } = useAppState();
  const connectionOptions = useConnectionOptions();

  return (
    <VideoProvider options={connectionOptions} onError={setError}>
      <ErrorDialog dismissError={() => setError(null)} error={error} />
      <ChatProvider>
        <App />
      </ChatProvider>
    </VideoProvider>
  );
};

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <UnsupportedBrowserWarning>
      <Router>
        <AppStateProvider>
          <Switch>
            <PrivateRoute exact path="/">
              <h1>Invalid route</h1>
            </PrivateRoute>
            {/* <PrivateRoute path="/room/:URLRoomName"> */}
            <PrivateRoute path="/room/:eventUri/:conference/:meeting">
              <VideoApp />
            </PrivateRoute>
            {/* <Route path="/login">
              <LoginPage />
            </Route> */}
            <Redirect to="/" />
          </Switch>
        </AppStateProvider>
      </Router>
    </UnsupportedBrowserWarning>
  </MuiThemeProvider>,
  document.getElementById('root')
);
