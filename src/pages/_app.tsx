import BaseLayout from '@/layouts/Baselayout';
import StoreProvider from '@/redux/StoreProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <StoreProvider>
            <BaseLayout>
                <Component {...pageProps} />
            </BaseLayout>
        </StoreProvider>
    );
}
