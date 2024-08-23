import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import "../styles/globals.css";

// import des outils de Redux
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

import bookmarks from "../reducers/bookmarks";
import user from "../reducers/user";

// configuration de Redux Persist
const reducers = combineReducers({ bookmarks, user });
const persistConfig = { key: "tech-news-673829HDHEY", storage };

// création du store Redux
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// création du persistor
const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <>
      {/* on enveloppe l'application dans le Provider
      pour que les composants puissent accéder au store */}

      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Head>
            <title>Tech News</title>
          </Head>
          <Header />
          <Component {...pageProps} />
          <Toaster
            toastOptions={{
              className: "",
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
              },
            }}
          />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
