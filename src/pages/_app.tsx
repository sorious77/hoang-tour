import Layout from "@/components/layout";
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {NavermapsProvider} from 'react-naver-maps';


export default function App({Component, pageProps}: AppProps) {
    return (
        <NavermapsProvider ncpClientId="p967kw7fg2">
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NavermapsProvider>
    );
}
