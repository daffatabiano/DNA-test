import SearchBar from '@/components/ui/searchBar';
import BaseLayout from '@/layouts/Baselayout';
import { persistor, wrapper } from '@/redux/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App({ Component, pageProps }: AppProps) {
    const { store } = wrapper.useWrappedStore(pageProps);
    const [isShow, setIsShow] = useState(false);
    const isShowSearchBar = useSelector((state) => state?.searchbar);
    console.log(isShowSearchBar);

    const triggerSearchButton = () => {
        setIsShow(!isShow);
    };
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BaseLayout>
                    <div
                        style={{
                            transform: isShowSearchBar?.open
                                ? 'translateX(0)'
                                : 'translateX(-100%)',
                            transition: 'transform 0.3s ease',
                        }}
                    >
                        <SearchBar
                            placeholders={[
                                'Corona covid-19 virus cases?',
                                'Find what you need here!',
                                'Tesla stock price , and more ?',
                                'Gooogle expansive top 10 ?',
                                'FIFA decides the world cup',
                            ]}
                            onChange={triggerSearchButton}
                            onSubmit={triggerSearchButton}
                        />
                    </div>
                    <Component {...pageProps} />
                </BaseLayout>
            </PersistGate>
        </Provider>
    );
}

export default wrapper.withRedux(App);
