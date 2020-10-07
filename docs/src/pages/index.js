import React, { useState, useEffect } from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from '@site/src/pages/styles.module.scss'
import PropTypes from 'prop-types'
import useBaseUrl from '@docusaurus/useBaseUrl'
import classnames from 'classnames'
import useThemeContext from '@theme/hooks/useThemeContext'
import Link from '@docusaurus/Link'


function getFeatures() {
  return [
    {
      title: 'Easy to Use',
      description: 'It was build to provide the most suitable API for front-end development. That is easy to use and configure.',
    },
    {
      title: 'Focus on What Matters',
      description: 'We tried to solve most common problems, to give you extra time for styling and animations.',
    },
    {
      title: 'Stop dublicating code',
      description: 'Our architecture rules and build-in modules help you to stop dublicating same code.',
    },
    {
      title: 'Stop making same errors',
      description: 'We provide crossbrowser support. And our modules helps you to do not make same errors.',
    },
    {
      title: 'Cross platform',
      description: 'You can use this toolkit for MPA, SPA and Mobile ( React-Native ) projects.',
    },
    {
      title: 'Best practices',
      description: 'We are using best practices and newest technologies.',
    },
  ]
}

Feature.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

Feature.defaultProps = {
  imageUrl: undefined,
  title: '',
  description: '',
}

function Feature({ imageUrl, title = null, description = null } = {}) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {!!imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}


function Header() {
  const { isDarkTheme } = useThemeContext()
  const { siteConfig } = useDocusaurusContext()
  const [theme, setTheme] = useState(undefined)
  useEffect(() => {
    if(isDarkTheme !== theme) {
      setTheme(isDarkTheme)
    }
  }, [isDarkTheme, setTheme])
  const className = theme === undefined ? '' : theme ? styles.heroBanner : styles.heroBannerLight
  return (
    <header key={isDarkTheme ? 'dark' : 'light'} className={classnames('hero hero--primary', className, styles.banner)}>
      <div className={styles.headerOverlay}/>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={classnames(
              'button button--outline button--secondary button--lg',
              styles.getStarted,
            )}
            to={useBaseUrl('docs/skeleton/skeleton_about')}>
              Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}


export default function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
    >
      <Header/>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {!!getFeatures() && getFeatures().map(({ title, imageUrl, description } = {}) => (
                <Feature
                  key={title}
                  title={title}
                  imageUrl={imageUrl}
                  description={description}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <div className={styles.overlay}></div>
    </Layout>
  )
}
