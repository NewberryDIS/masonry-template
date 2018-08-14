import React from 'react'
import PropTypes from 'prop-types'
import style from './Images.css'

const Facets = ({onClick, label, active}) => (
  	  <span title={label[0].replace('&', 'and')}>
		      <a onClick={onClick} className={active ? style.Active : null} >{label[0]}</a>|&nbsp;
		  </span>
)

Facets.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.array,
  active: PropTypes.boolean
}

export default Facets
