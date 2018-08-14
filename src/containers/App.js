import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = state => ({
  location: state.location
})

const actions = {
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
