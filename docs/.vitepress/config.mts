import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue.js Notification",
  themeConfig: {
    nav: [
      { text: 'Demo', link: '/' },
      { text: 'Get started', link: '/guide/installation' },
      { text: "API Reference", link: "/api/" },
    ],
    sidebar: {
      '/guide/': [
        { text: 'Get started', items: [
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Usage', link: '/guide/usage' },
          { text: 'Customization', link: '/guide/customization' },
          { text: 'TypeScript Support', link: '/guide/typescript'}
        ]},
      ]
  },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kyvg/vue3-notification' }
    ],
    editLink: {
      pattern: 'https://github.com/kyvg/vue3-notification/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
