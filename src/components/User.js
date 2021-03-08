import PropTypes from 'prop-types'

const User = ({ item: { username }, style }) => (
  <p style={style}>
    {username}
  </p>
)

export default User

User.propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired
}