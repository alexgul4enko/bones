import React from 'react'
import PropTypes from 'prop-types'
import NavLink from './NavLink'

MobileNavItem.propTypes = {
  items: PropTypes.array,
  label: PropTypes.string,
}

MobileNavItem.defaultProps = {
  items: [],
  label: '',
}

export default function MobileNavItem({ items, ...props }) {
  if(!items) {
    return (
      <li className="menu__list-item">
        <NavLink className="menu__link" {...props} />
      </li>
    )
  }

  return (
    <li className="menu__list-item">
      <NavLink className="menu__link menu__link--sublist" {...props}>
        {props.label}
      </NavLink>
      <ul className="menu__list">
        {items.map((linkItemInner, i) => (
          <li className="menu__list-item" key={i}>
            <NavLink className="menu__link" {...linkItemInner} />
          </li>
        ))}
      </ul>
    </li>
  )
}
