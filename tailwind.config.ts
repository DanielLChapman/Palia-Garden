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
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "field-drab": "#645233",
                "night": "#040D09",
                "lion": "#B0895D",
                "avocado": "#4D7212",
                "dark-moss-green": "#304F15",
            },
            fontFamily: {
              'pt-serif': ['PT Serif', 'serif'],
              'ultra': ['Ultra', 'serif'],
            }
        },
    },
    plugins: [],
};
export default config;
