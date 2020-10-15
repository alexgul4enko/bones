import { Link as RouterLink, NavLink as RouterNavLink, Redirect as RouterRedirect } from 'react-router-dom'
import withNamedNavigation from './utils/withNamedNavigation'

export const Link = withNamedNavigation(RouterLink)
export const NavLink = withNamedNavigation(RouterNavLink)
export const Redirect = withNamedNavigation(RouterRedirect)
