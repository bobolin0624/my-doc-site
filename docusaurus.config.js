// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BoLog',
  tagline: 'Make some Code & Chord',
  favicon: 'img/favicon-bobo.ico',

  // Set the production url of your site here
  url: 'https://codebolog.netlify.app/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 10,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'BoLog',
        logo: {
          alt: 'BoLog Site Logo',
          src: 'img/logo-bobo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'codeNoteSidebar',
            position: 'left',
            label: 'Code',
          },
          {
            type: 'docSidebar',
            sidebarId: 'musicNoteSidebar',
            position: 'left',
            label: 'Music',
          },
          { to: '/about-me', label: 'About', position: 'right' }
          // {to: '/blog', label: 'Blog', position: 'left'}
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/docs/category/javascript',
              }
            ]
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/BoboLin0624'
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/chia-an-lin-ba2a03218/'
              }
            ]
          },
          {
            title: 'Funny',
            items: [
              {
                label: 'Instagram',
                href: 'https://github.com/BoboLin0624'
              },
              {
                label: 'Youtube',
                href: 'https://github.com/BoboLin0624'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BoLog. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
