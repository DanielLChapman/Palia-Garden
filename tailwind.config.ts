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
                gray: {
                    '0': '#f9f9f9',
                    '1': '#ededee',
                    '2': '#e0e1e1',
                    '3': '#d2d3d4',
                    '4': '#c3c4c5',
                    '5': '#b1b3b5',
                    '6': '#9ea0a2',
                    '7': '#87898c',
                    '8': '#696d6f',
                    '9': '#3b4043'
                  },
                  blue: {
                    '0': '#f9f9fa',
                    '1': '#eceeef',
                    '2': '#dee1e3',
                    '3': '#d0d3d7',
                    '4': '#bfc4c9',
                    '5': '#adb4b9',
                    '6': '#99a1a8',
                    '7': '#808a93',
                    '8': '#616e78',
                    '9': '#31414f'
                  },
                  indigo: {
                    '0': '#f9f9fa',
                    '1': '#ededf0',
                    '2': '#e0e0e5',
                    '3': '#d2d2d9',
                    '4': '#c3c3cc',
                    '5': '#b2b2bd',
                    '6': '#9e9fac',
                    '7': '#878899',
                    '8': '#696b7f',
                    '9': '#3b3d58'
                  },
                  violet: {
                    '0': '#faf9fa',
                    '1': '#eeedf0',
                    '2': '#e2e0e4',
                    '3': '#d5d2d8',
                    '4': '#c6c2cb',
                    '5': '#b6b1bc',
                    '6': '#a49dac',
                    '7': '#8e8698',
                    '8': '#72687e',
                    '9': '#473a57'
                  },
                  fuschia: {
                    '0': '#faf9fa',
                    '1': '#efedef',
                    '2': '#e4dfe4',
                    '3': '#d7d1d8',
                    '4': '#cac1ca',
                    '5': '#bbb0bb',
                    '6': '#a99caa',
                    '7': '#958496',
                    '8': '#7b657c',
                    '9': '#523653'
                  },
                  // ... Repeat the pattern for each color group: pink, red, orange, etc...
                  pink: {
                    '0': '#faf9fa',
                    '1': '#efedee',
                    '2': '#e4dfe2',
                    '3': '#d8d1d5',
                    '4': '#cac1c6',
                    '5': '#bbb0b6',
                    '6': '#aa9ca4',
                    '7': '#96848e',
                    '8': '#7c6672',
                    '9': '#543646'
                  },
                  red: {
                    '0': '#faf9f9',
                    '1': '#efeded',
                    '2': '#e4e0e0',
                    '3': '#d8d1d2',
                    '4': '#cbc2c2',
                    '5': '#bcb0b1',
                    '6': '#ab9c9d',
                    '7': '#978586',
                    '8': '#7d6768',
                    '9': '#553739'
                  },
                  orange: {
                    '0': '#faf9f9',
                    '1': '#efedec',
                    '2': '#e3e0de',
                    '3': '#d6d2cf',
                    '4': '#c8c3bf',
                    '5': '#b8b2ac',
                    '6': '#a79e97',
                    '7': '#92877f',
                    '8': '#776a5f',
                    '9': '#4d3c2e'
                  },
                  yellow: {
                    '0': '#f9f9f8',
                    '1': '#eeeeeb',
                    '2': '#e1e1dc',
                    '3': '#d4d3cc',
                    '4': '#c5c4bb',
                    '5': '#b4b4a7',
                    '6': '#a1a191',
                    '7': '#8b8a77',
                    '8': '#6f6d56',
                    '9': '#424022'
                  },
                  lime: {
                    '0': '#f9f9f9',
                    '1': '#edeeeb',
                    '2': '#dfe1dc',
                    '3': '#d1d4cd',
                    '4': '#c1c5bb',
                    '5': '#afb5a8',
                    '6': '#9ba292',
                    '7': '#838c78',
                    '8': '#657057',
                    '9': '#354424'
                  },
                  green: {
                    '0': '#f9faf9',
                    '1': '#ebeeeb',
                    '2': '#dde2dd',
                    '3': '#ced5cd',
                    '4': '#bdc6bd',
                    '5': '#aab6aa',
                    '6': '#95a494',
                    '7': '#7c8e7a',
                    '8': '#5b725a',
                    '9': '#284626'
                  },
                  teal: {
                    '0': '#f9faf9',
                    '1': '#ebeeed',
                    '2': '#dde2df',
                    '3': '#cdd5d1',
                    '4': '#bcc6c1',
                    '5': '#a9b6af',
                    '6': '#94a39b',
                    '7': '#7a8e83',
                    '8': '#597264',
                    '9': '#264634'
                  },
                  cyan: {
                    '0': '#f9faf9',
                    '1': '#ebeeee',
                    '2': '#dde2e1',
                    '3': '#cdd4d4',
                    '4': '#bcc6c5',
                    '5': '#a9b6b5',
                    '6': '#93a3a2',
                    '7': '#798d8c',
                    '8': '#58716f',
                    '9': '#254543'
                  },
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
