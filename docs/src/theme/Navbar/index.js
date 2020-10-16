import React, { useCallback, useState } from 'react'
import classnames from 'classnames'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

import SearchBar from '@theme/SearchBar'
import Toggle from '@theme/Toggle'
import useThemeContext from '@theme/hooks/useThemeContext'
import useHideableNavbar from '@theme/hooks/useHideableNavbar'
import useLockBodyScroll from '@theme/hooks/useLockBodyScroll'
import useLogo from '@theme/hooks/useLogo'
import NavItem from './widgets/NavItem'
import MobileNavItem from './widgets/MobileNavItem'
import styles from './navbar.module.scss'

export default function Navbar() {
  const {
    siteConfig: {
      themeConfig: {
        navbar: { title, links = [], hideOnScroll = false } = {},
        disableDarkMode = false,
      },
    },
    isClient,
  } = useDocusaurusContext()
  const [sidebarShown, setSidebarShown] = useState(false)
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false)

  const { isDarkTheme, setLightTheme, setDarkTheme } = useThemeContext()
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll)
  const { logoLink, logoLinkProps, logoAlt } = useLogo()

  useLockBodyScroll(sidebarShown)

  const showSidebar = useCallback(() => {
    setSidebarShown(true)
  }, [setSidebarShown])
  const hideSidebar = useCallback(() => {
    setSidebarShown(false)
  }, [setSidebarShown])

  const onToggleChange = useCallback(
    e => (e.target.checked ? setDarkTheme() : setLightTheme()),
    [setLightTheme, setDarkTheme],
  )
  const logoImageUrl = isDarkTheme ? '/bones/img/logo_white.svg' : '/bones/img/logo.svg'
  return (
    <nav
      ref={navbarRef}
      className={classnames('navbar', 'navbar--light', 'navbar--fixed-top', {
        'navbar-sidebar--show': sidebarShown,
        [styles.navbarHideable]: hideOnScroll,
        [styles.navbarHidden]: !isNavbarVisible,
      })}>
      <div className="navbar__inner">
        <div className="navbar__items">
          <div
            aria-label="Navigation bar toggle"
            className="navbar__toggle"
            role="button"
            tabIndex={0}
            onClick={showSidebar}
            onKeyDown={showSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              role="img"
              focusable="false">
              <title>Menu</title>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M4 7h22M4 15h22M4 23h22"
              />
            </svg>
          </div>
          <Link className="navbar__brand" to={logoLink} {...logoLinkProps}>

            {logoImageUrl != null && (
              <img
                key={isClient}
                className={`navbar__logo ${styles.logo}`}
                src={logoImageUrl}
                alt={logoAlt}
              />
            )}
          </Link>
          {links
            .filter(linkItem => linkItem.position === 'left')
            .map((linkItem, i) => (
              <NavItem {...linkItem} key={i} />
            ))}
        </div>
        <div className="navbar__items navbar__items--right">
          {links
            .filter(linkItem => linkItem.position === 'right')
            .map((linkItem, i) => (
              <NavItem {...linkItem} key={i} />
            ))}
          {!disableDarkMode && (
            <Toggle
              className={styles.displayOnlyInLargeViewport}
              aria-label="Dark mode toggle"
              checked={isDarkTheme}
              onChange={onToggleChange}
            />
          )}
          <SearchBar
            handleSearchBarToggle={setIsSearchBarExpanded}
            isSearchBarExpanded={isSearchBarExpanded}
          />
        </div>
      </div>
      <div
        role="presentation"
        className="navbar-sidebar__backdrop"
        onClick={hideSidebar}
      />
      <div className="navbar-sidebar">
        <div className="navbar-sidebar__brand">
          <Link
            className="navbar__brand"
            onClick={hideSidebar}
            to={logoLink}
            {...logoLinkProps}>
            {logoImageUrl != null && (
              <img
                key={isClient}
                className="navbar__logo"
                src={logoImageUrl}
                alt={logoAlt}
              />
            )}
          </Link>
          {!disableDarkMode && sidebarShown && (
            <Toggle
              aria-label="Dark mode toggle in sidebar"
              checked={isDarkTheme}
              onChange={onToggleChange}
            />
          )}
        </div>
        <div className="navbar-sidebar__items">
          <div className="menu">
            <ul className="menu__list">
              {links.map((linkItem, i) => (
                <MobileNavItem {...linkItem} onClick={hideSidebar} key={i} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
