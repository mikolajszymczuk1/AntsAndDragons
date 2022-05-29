module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}"
    ],
    theme: {
        colors: {
            "y-in-mn-blue": "#355070",
            "chinese-violet": "#6d597a",
            "cinnamon-satin": "#b56576",
            "candy-pink": "#e56b6f",
            "tumbleweed": "#eaac8b"
        },
        fontFamily: {
            "noto": ['Noto Sans', 'sans-serif'],
            "open": ['Open Sans', 'sans-serif']
        },
        screens: {
            "xsm": "500px",
            "sm": "800px",
            "md": "1200px",
            "lg": "1440px",
            "xlg": "1600px"
        }
    },
    plugins: [],
};
