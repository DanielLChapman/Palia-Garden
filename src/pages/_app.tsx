import { GridProvider } from "@/components/GridContext/GridProvider";
import { SettingsProvider } from "@/components/SettingsProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SettingsProvider>
            <GridProvider>
                <Component {...pageProps} />
            </GridProvider>
        </SettingsProvider>
    );
}
