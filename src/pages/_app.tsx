import SearchBar from '@/components/ui/searchBar';
import BaseLayout from '@/layouts/Baselayout';
import { setValue } from '@/redux/features/searchbarSlice';
import { persistor, wrapper } from '@/redux/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App({ Component, pageProps }: AppProps) {
    const { store } = wrapper.useWrappedStore(pageProps);
    const [isShow, setIsShow] = useState(false);
    const isShowSearchBar = useSelector((state) => state?.searchbar);
    const [isChange, setIsChange] = useState('');
    const dispatch = useDispatch();

    const triggerSearchButton = () => {
        dispatch(setValue(isChange));
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
                            onChange={(e) => setIsChange(e.target.value)}
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
