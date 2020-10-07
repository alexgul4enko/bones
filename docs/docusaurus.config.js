/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  title: 'Anatomy JS',
  tagline: 'Toolkit for web mobile development',
  url: 'https://alexgul4enko.github.io',
  baseUrl: '/bones/',
  favicon: 'img/favicon.ico',
  organizationName: 'alexgul4enko', // Usually your GitHub org/user name.
  projectName: 'alexgul4enko.github.io', // Usually your repo name.
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
    },
    // algolia: {
    //   apiKey: '5f7869145112d2d4555469aa8aa7655b',
    //   indexName: 'django-stars_frontend-skeleton',
    // },
    navbar: {
      title: 'Anatomy JS',
      logo: {
        alt: 'Anatomy JS',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/skeleton/skeleton_about',
          activeBasePath: 'docs/skeleton',
          label: 'Skeleton',
          position: 'left',
        },
        {
          to: 'docs/resources/resource_problem',
          activeBasePath: 'docs/resources',
          label: 'Resources',
          position: 'left',
        },
        {
          to: 'docs/queryParams/queryParams_about',
          activeBasePath: 'docs/queryParams',
          label: 'queryParams',
          position: 'left',
        },
        {
          to: 'docs/api/api_about',
          activeBasePath: 'docs/api',
          label: 'API',
          position: 'left',
        },
        {
          to: 'docs/i18n/i18n_about',
          activeBasePath: 'docs/i18n',
          label: 'i18n',
          position: 'left',
        },
        {
          to: 'docs/cache/cache_about',
          activeBasePath: 'docs/cache',
          label: 'cache',
          position: 'left',
        },
      ],
    },
    footer: {
      links: [
        {
          label: 'Packages',
          to: 'https://github.com/alexgul4enko/bones',
          icon: 'icon-github',
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()}  alexgul4enko. All rights reserved.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/alexgul4enko/bones/tree/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: ['docusaurus-plugin-sass'],
}
