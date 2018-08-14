import React from 'react'
import style from './Banner.css'
import logo from '../../static/media/newberry_logo_white_no_text_med.png'

const Banner = () => {
  return (
    <div className={style.Banner}>
        <a href="https://www.newberry.org" target="_blank" className={style.LogoName}>
        <img src={logo} />
        <span className={style.BannerTitle}>
		Newberry Library Digital Collections : Edward E. Ayer Digital Collection
		</span>
        </a>
	</div>
  )
}

export default Banner
