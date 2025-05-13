import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './plugins/**/*.{js,ts}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Noto Sans JP"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

export default config
