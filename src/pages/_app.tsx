import Layout from "@/components/layout";
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {NavermapsProvider} from 'react-naver-maps';
import {SessionProvider} from "next-auth/react";


export default function App({Component, pageProps}: AppProps) {
    const ncpClientId: string = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID as string | ""

    return (
        <NavermapsProvider ncpClientId={ncpClientId}>
            <SessionProvider session={pageProps.session}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </NavermapsProvider>
    );
}
