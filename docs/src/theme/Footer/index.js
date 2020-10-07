import React, { useMemo } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import FooterLink from './widgets/FooterLink/LinkItem'
import styles from './footer.module.scss'

function cx() {
  return Array.from(arguments).filter(Boolean).join(' ')
}

export default function Footer() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  const { themeConfig = {} } = siteConfig
  const { footer } = themeConfig

  const { links = [], logo = {} } = footer || {}
  const content = useMemo(() => links.map(link => (<FooterLink key={link.label} {...link}/>)), [links])
  return (
    <footer className={cx('footer', styles.footer)}>

      <div className={cx('container', styles.logoContainer)}>
        <a
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logo}
        >
          <img src={useBaseUrl('img/logo_white.svg')} alt={logo.alt}/>
        </a>
        <p className={styles.copyright}>Copyright © 2020 alexgu4enko. All rights reserved.</p>
      </div>
      <div className={styles.footerLinks}>
        <div>
          {content}
        </div>
      </div>
    </footer>
  )
}
