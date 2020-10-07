import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import NavLink from './NavLink'

NavItem.propTypes = {
  items: PropTypes.array,
  position: PropTypes.oneOf(['left', 'right']),
  label: PropTypes.string,
}

NavItem.defaultProps = {
  items: [],
  position: undefined,
  label: '',
}

export default function NavItem({ items, position, ...props }) {
  if(!items) {
    return <NavLink className="navbar__item navbar__link" {...props} />
  }

  return (
    <div
      className={classnames('navbar__item', 'dropdown', 'dropdown--hoverable', {
        'dropdown--left': position === 'left',
        'dropdown--right': position === 'right',
      })}>
      <NavLink className="navbar__item navbar__link" {...props}>
        {props.label}
      </NavLink>
      <ul className="dropdown__menu">
        {items.map((linkItemInner, i) => (
          <li key={i}>
            <NavLink className="navbar__item navbar__link" {...linkItemInner} />
          </li>
        ))}
      </ul>
    </div>
  )
}
