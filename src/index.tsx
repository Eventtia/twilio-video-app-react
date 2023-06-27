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
import { ParticipantProvider } from './components/ParticipantProvider';
import { VideoProvider } from './components/VideoProvider';
import useConnectionOptions from './utils/useConnectionOptions/useConnectionOptions';
import UnsupportedBrowserWarning from './components/UnsupportedBrowserWarning/UnsupportedBrowserWarning';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
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
      <ParticipantProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ParticipantProvider>
    </VideoProvider>
  );
};

export const ReactApp = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <Router>
        <UnsupportedBrowserWarning>
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
        </UnsupportedBrowserWarning>
      </Router>
    </I18nextProvider>
  </MuiThemeProvider>
);

ReactDOM.render(<ReactApp />, document.getElementById('root'));
