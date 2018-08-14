import React from 'react'
import style from './Search.css'

const Search = () => {
  return (
    <form className={style.Search}>
        <input
          type="text"
          placeholder="Search..."
		  onClick={() => {
				  this.props.filter(['Maps'])
			  }}
        />
    </form>
  )
}

export default Search
