import BaseLayout from '@/layouts/Baselayout';
import { persistor, wrapper } from '@/redux/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App({ Component, pageProps }: AppProps) {
    const { store } = wrapper.useWrappedStore(pageProps);
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BaseLayout>
                    <Component {...pageProps} />
                </BaseLayout>
            </PersistGate>
        </Provider>
    );
}

export default wrapper.withRedux(App);
