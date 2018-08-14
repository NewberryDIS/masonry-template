import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import style from './Image.css'

class Image extends Component {

  render() {
    const i = this.props.item
    const className = this.props.loading ? style.ImageLoading : style.Image
    let imgurl = 'https://collections.carli.illinois.edu/utils/ajaxhelper/?CISOROOT=nby_eeayer&CISOPTR=' + i.img_ptr + '&action=2&DMWIDTH=5000&DMHEIGHT=5000&DMSCALE=50%'
    if (i.platform) {
      imgurl = 'https://archive.org/services/img/' + i.pointer
    }
    return (
      <a href={i.directlink} target="_blank">
        <figure className={className}>
          <img src={imgurl} />
          <figcaption>
            {i.Title}
          </figcaption>
        </figure>
      </a>
    )
  }

}

Image.propTypes = {
  item: PropTypes.object,
  loading: PropTypes.bool
}

export default Image
