import env from './env'

module.exports = {
    // mode: 'spa',
    head: {
        title: '云标书',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: "云标书"}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        ],
        script: [
            {
                src: "https://ssl.captcha.qq.com/TCaptcha.js"
            }
        ]
    },
    env: {
        BASE_API: env[process.env.NODE_ENV].BASE_API,
        NODE_ENV: env[process.env.NODE_ENV].NODE_ENV,
    },
    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/axios',
        'cookie-universal-nuxt',
        ['cookie-universal-nuxt', {alias: 'cookiz'}]
    ],
    router: {
        middleware: ['authenticated'],
        extendRoutes(routes, resolve) {
            routes.push(
                {
                    path: '/',
                    name: 'home',
                    component: resolve(__dirname, '@/pages/Home.vue')
                },
            )
        }
    },
    axios: {
        baseURL: env[process.env.NODE_ENV].BASE_API,
        timeout: 12000
    },
    srcDir: 'src',
    css: [
        "element-ui/lib/theme-chalk/index.css"
    ],
    styleResources: {
        less: [
            '@/assets/css/common.less'
        ]
    },
    plugins: [
        {src: '~plugins/element-ui', ssr: true},
        {src: '~plugins/axios', ssr: true},
        {src: '~plugins/components', ssr: true},
        {src: '~plugins/allApiUrl', ssr: true},
        {src: '~plugins/commonFn', ssr: false},
    ],
    build: {
        /*extend(config, {
            isDev,
            isClient
        }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        },*/
        postcss: {
            plugins: {},
            preset: {
                autoprefixer: true
            },
        },
    }
}
