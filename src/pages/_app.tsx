import Layout from "@/components/layout";
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {NavermapsProvider} from 'react-naver-maps';


export default function App({Component, pageProps}: AppProps) {
    const ncpClientId: string = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID as string | ""

    console.log(ncpClientId);

    return (
        <NavermapsProvider ncpClientId={ncpClientId}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NavermapsProvider>
    );
}
