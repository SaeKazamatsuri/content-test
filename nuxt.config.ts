// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
        '@nuxt/content',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
    ],
    content: {
        preview: {
            api: 'https://api.nuxt.studio'
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000
    },
    colorMode: {
        preference: 'system', // デフォルトはシステム
        fallback: 'light',
        classSuffix: '',      // "dark" クラスだけを付与
        storageKey: 'nuxt-color-mode'
    },
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        }
    }
})