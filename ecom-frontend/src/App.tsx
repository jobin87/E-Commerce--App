
// ----------------------------------------------------------------------

import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { persistor, store } from 'src/store';


import { Toaster } from 'react-hot-toast';
import { LocalizationProvider } from './locales';
// import { ThemeProvider } from './theme/theme-provider';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <LocalizationProvider>
      <Toaster />
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
                <Router />
        </PersistGate>
      </ReduxProvider>
    </LocalizationProvider>
  );
}
