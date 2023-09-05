import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-top":
                    "linear-gradient(0deg, #8aa988ff, #8192a0ff, #90b2cdff, #c1d7a2ff, #9cb167ff)",
                "gradient-right":
                    "linear-gradient(90deg, #8aa988ff, #8192a0ff, #90b2cdff, #c1d7a2ff, #9cb167ff)",
                "gradient-bottom":
                    "linear-gradient(180deg, #8aa988ff, #8192a0ff, #90b2cdff, #c1d7a2ff, #9cb167ff)",
                "gradient-left":
                    "linear-gradient(270deg, #8aa988ff, #8192a0ff, #90b2cdff, #c1d7a2ff, #9cb167ff)",
                "gradient-top-right":
                    "linear-gradient(45deg, #8aa988ff, #8192a0ff, #90b2cdff, #c1d7a2ff, #9cb167ff)",
                "gradient-bottom-right":
                    "linear-gradient(135deg, #8aa988ff, #8192a0ff, #90b2cdff, #c1d7a2ff, #9cb167ff)",
                "gradient-top-left":
                    "linear-gradient(225deg, #8aa988ff, #8192a0ff, #90b2cdff, #c1d7a2ff, #9cb167ff)",
                "gradient-bottom-left":
                    "linear-gradient(315deg, #8aa988ff, #8192a0ff, #90b2cdff, #c1d7a2ff, #9cb167ff)",
                "gradient-radial":
                    "radial-gradient(#8aa988ff, #8192a0ff, #90b2cdff, #c1d7a2ff, #9cb167ff)",
            },
            colors: {
                "field-drab": "#645233",
                night: "#040D09",
                "dark-moss-green": "#304F15",
                "cambridge-blue": "#8aa988ff",
                "cadet-gray": "#8192a0ff",
                "powder-blue": "#90b2cdff",
                "tea-green": "#c1d7a2ff",
                olivine: "#9cb167ff",
            },
            fontFamily: {
                "pt-serif": ["PT Serif", "serif"],
                "inter": ["Inter", "serif"],
                "montserrat": ["Montserrat", "Inter", "serif"],
            },
        },
    },
    plugins: [],
};
export default config;
