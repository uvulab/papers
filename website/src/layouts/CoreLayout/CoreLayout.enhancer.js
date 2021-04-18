import { connect } from 'react-redux'
import { compose, withProps, flattenProp } from 'recompose'
import { isEmpty, isLoaded } from 'react-redux-firebase/lib/helpers'
import { withRouter } from 'react-router-dom'

export default compose(
  withRouter,
  // Map redux state to props
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })),
  // Add custom props
  withProps(({ auth, location: { pathname: path } }) => ({
    authExists: isLoaded(auth) && !isEmpty(auth),
    path
  })),
  // Flatten profile so that avatarUrl and displayName are props
  flattenProp('profile')
)
