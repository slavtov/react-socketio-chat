import { memo } from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ children, type = 'md', className, active, ...props }) => (
  <button
    className={ `${className} btn btn-${type}`}
    style={{ fontWeight: active && 'bold' }}
    {...props}
  >
    {children}
  </button>
)

export default memo(Button)

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  active: PropTypes.bool
}
