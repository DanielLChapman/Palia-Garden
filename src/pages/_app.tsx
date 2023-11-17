import { GridProvider } from "@/components/GridContext/GridProvider";
import { SettingsProvider } from "@/components/SettingsProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const urlID = router.asPath.split('/')[1] || null; // Extracts the ID from the URL

    if (urlID === '[id]') {
        return <span>Loading...</span>
    }
    
    return (
        <SettingsProvider>
            <GridProvider urlID={urlID}>
                <Component {...pageProps} />
            </GridProvider>
        </SettingsProvider>
    );
}
