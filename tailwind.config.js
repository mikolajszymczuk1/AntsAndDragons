module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}"
    ],
    theme: {
        colors: {
            "y-in-mn-blue": "#355070ff",
            "chinese-violet": "#6d597aff",
            "cinnamon-satin": "#b56576ff",
            "candy-pink": "#e56b6fff",
            "tumbleweed": "#eaac8bff"
        },
        fontFamily: {
            "noto": ['Noto Sans', 'sans-serif'],
            "open": ['Open Sans', 'sans-serif']
        },
        screens: {
            "sm": "800px",
            "md": "1200px"
        }
    },
    plugins: [],
};
