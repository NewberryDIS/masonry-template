import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-component'
import Image from './Image'
import style from './Images.css'
import imageStyle from './Image.css'
import Facets from './Facets'
/* import Home from 'react-icons/lib/fa/home'
import User from 'react-icons/lib/fa/user'
import Document from 'react-icons/lib/fa/file-text-o'
import Refresh from 'react-icons/lib/fa/refresh' */

class Images extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.handleImagesLoaded = this.handleImagesLoaded.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    this.props.filter([])
    this.setState({
      loading: true
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight)
    const windowBottom = windowHeight + window.pageYOffset
    if (windowBottom >= docHeight - 1) {
      this.props.displayMore()
    }
  }

  handleImagesLoaded() {
    this.setState({
      loading: false
    })
  }

  handleClick(filter, index) {
    this.setState({
      activeIndex: index
    })
    this.props.filter(filter)
  }

  handleChange(e) {
	  this.setState({ inputValue: e.target.value })
  }

  render() {
    const masonryOpts = {
      itemSelector: '.' + imageStyle.Image,
      transitionDuration: 0,
      fitWidth: true
    }
    const displayedItems = this.props.items.slice(0, this.props.position)
    const masstyle = {margin: 'auto'}
    const labelArray = [['ALL', []], ['Art & Artwork', ['Art and Artwork', 'Art']], ['Maps', ['Maps']], ['Letters, Journals & Diaries', ['Letters, Journals and Diaries']], ['Photographs & Prints', ['Photographs', 'Photograph albums']], ['Financial & Legal Documents', ['Bills of lading', 'Deeds', 'Receipts (Financial records)', 'Promissory notes', 'Agreements', 'Government records', 'Legal documents', 'Stock certificates', 'Claims', 'Accounts', 'Receipts', 'Account books', 'Invoices', 'Legal records', 'Financial statements', 'Ephemera', 'Business Cards', 'Passports', 'Paper money', 'Scrip', 'Clippings', 'Stock certificates', 'Financial and Legal Documents']], ['Newspapers & Broadsides', ['Newspapers and Broadsides', 'Broadsides and Newspapers', 'Broadsides (Notices)']], ['Books', ['Books']]]
    const limiters = labelArray.map((f, i) =>
                    (<Facets
                      active={this.state.activeIndex === i}
                      key={i}
                      onClick={() => this.handleClick(f[1], i)}
                      label={f} />)
                     )
    return (
      <div className={style.Images}>
      <header>
	      <div>
		      <p>
			  Explore more than 100,000 digitized images from the Newberry's Edward E. Ayer collection, one of the world's premiere sources of primary documents on American Indians. Topics covered include Native American archaeology, ethnology, art, and language; the history of the contact between Europeans and native peoples; voyages, travels, and accounts of early America; the development of cartography of the Western Hemisphere; and the history of the aboriginal peoples under the jurisdiction of the U.S. in the Philippine Islands and Hawaii. Browse the selections below, or view the entire collection of <a href="https://archive.org/details/newberry?and%5B%5D=Ayer_AM&sin=&sort=-publicdate" target="_blank">Ayer printed books at Internet Archive</a> or <a href="http://collections.carli.illinois.edu/cdm/landingpage/collection/nby_eeayer" target="_blank">Ayer manuscript content at CARLI Digital Collections</a>
			  </p>
        <p style={{paddingTop: 0}}>Additional policy information: <a href="https://www.newberry.org/rights-and-reproductions" target="_blank">Rights and Reproductions</a> | <a href="https://www.newberry.org/sites/default/files/textpage-attachments/Culturally_Sensitive_Indigenous_Materials.pdf" target="_blank">Access to Culturally Sensitive Indigenous Materials in the Newberry Library Collections</a>
        </p>
        <a href="http://publications.newberry.org/digital/mms-transcribe/ayer" style={{display: 'none'}} target="_blank" className={style.mobileTranscript} ><h3>Help with historical research! Transcribe these documents here</h3></a>
		  </div>
          <input value={this.state.inputValue} type="text" onChange={this.handleChange} />
          <input
              type="button"
              value="search"
		      onClick={() => {
				  this.props.search([this.state.inputValue])
			  }}
          />
		  <div className={style.Facets}>
	      <span>
		      BROWSE:&nbsp;
		  </span>
		  {limiters}
		  </div>
      </header>
      <Masonry
	    style={masstyle}
        onImagesLoaded={this.handleImagesLoaded}
        options={masonryOpts}>
        {displayedItems.map((item) => {
          return (
            <Image
              key={'item-' + item.pointer}
              loading={this.state.loading}
              item={item} />
          )
        })}
      </Masonry>
      </div>
    )
  }
}

Images.propTypes = {
  filter: PropTypes.func,
  search: PropTypes.func,
  includes: PropTypes.func,
  displayMore: PropTypes.func,
  items: PropTypes.array,
  position: PropTypes.number
}

export default Images
