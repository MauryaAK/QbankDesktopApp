import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import ThemeProvider from './contexts/ThemeProvider.tsx';
import "react-calendar/dist/Calendar.css";
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { AlertProvider } from './provider/AlertProvider.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AlertProvider>
              <App />
            </AlertProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
