import React from 'react'
import PropTypes from 'prop-types'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'

NavLink.propTypes = {
  activeBasePath: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  position: PropTypes.oneOf(['left', 'right']),
  label: PropTypes.string,
}

NavLink.defaultProps = {
  activeBasePath: undefined,
  href: undefined,
  to: undefined,
  position: undefined,
  label: undefined,
}

export default function NavLink({ activeBasePath, to, href, label, position, ...props }) {
  const toUrl = useBaseUrl(to)
  const activeBaseUrl = useBaseUrl(activeBasePath)

  return (
    <Link
      {...(href
        ? {
          target: '_blank',
          rel: 'noopener noreferrer',
          href,
        }
        : {
          activeClassName: 'navbar__link--active',
          to: toUrl,
          ...(activeBasePath
            ? {
              isActive: (_match, location) =>
                location.pathname.startsWith(activeBaseUrl),
            }
            : null),
        })}
      {...props}>
      {label}
    </Link>
  )
}
