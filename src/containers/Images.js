import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Images from '../components/Images'
import { filter, displayMore, search } from '../actions/items'

const mapStateToProps = (state) => {
  return {
    items: state.items.items,
    position: state.items.position
  }
}

const actions = {
  filter,
  search,
  displayMore
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Images)
