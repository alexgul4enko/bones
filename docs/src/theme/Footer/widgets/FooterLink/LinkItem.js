import React from 'react'
import PropTypes from 'prop-types'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './footer-link.module.scss'

LinkItem.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  noTitle: PropTypes.bool,
}

LinkItem.defaultProps = {
  to: '',
  href: '',
  label: '',
  icon: '',
  noTitle: false,
}

export default function LinkItem({ to, href, label, icon, noTitle, ...props }) {
  const toUrl = useBaseUrl(to)
  if(href) {
    return (
      <Link
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        className={`footer__link-item ${styles.linkItem}`}
      >
        {!!icon && <i className={`${icon} ${styles.icon}`}/>}
        {!noTitle && label}
      </Link>
    )
  }
  return (
    <Link
      {...props}
      target="_blank"
      className={`footer__link-item ${styles.linkItem}`}
      to={toUrl}
    >
      {icon && <i className={`${icon} ${styles.icon}`}/>}
      {!noTitle && label}
    </Link>
  )
}
