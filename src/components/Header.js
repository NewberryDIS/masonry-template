import React from 'react'
import style from './Header.css'

const triangle = <div className={style.Corner}><a href="http://publications.newberry.org/digital/mms-transcribe/ayer" target="_blank"><span className={style.SpanOne}>HELP</span><br /><span className={style.SpanTwo} >With historical<br /> research! transcribe<br /> these resources <u>here</u></span></a></div>

const Header = () => {
  return (
    <header className={style.Header}>
      {triangle}
      <h1>Edward E. Ayer Digital Collection</h1>
    </header>
  )
}

export default Header
