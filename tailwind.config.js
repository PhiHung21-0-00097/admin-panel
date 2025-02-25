/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
        container: {
            center: true,
            padding: {
                DEFAULT: "20px",
                sm: "20px",
                lg: "20px",
                xl: "20px",
                "2xl": "20px",
            },
        },
    },
    plugins: [],
};
