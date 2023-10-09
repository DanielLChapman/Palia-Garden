import { SettingsProvider } from "@/components/SettingsProvider";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            ></link>
            <link
                rel="canonical"
                href="https://palia-garden-profits.vercel.app/"
            />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700;800&family=PT+Serif&display=swap"
                rel="stylesheet"
            />
            <link rel="preconnect" href="https://rsms.me/" />
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            <title>Palia Garden Profit Planner</title>
            <meta
                name="description"
                content="Palia Garden Profit Planner. Has a garden planning section, a crafter section, with day selector to determine how much profit you can generate!"
            ></meta>
            <body className="bg-cyan-9">
                <Main />
          

                <NextScript />
            </body>
        </Html>
    );
}
