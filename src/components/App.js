import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Banner from './Banner'
import Header from './Header'
import Footer from './Footer'
import Images from '../containers/Images'
import Item from '../containers/Item'
import style from './App.css'

class App extends Component {

  render() {
    /*
    const proto = window.location.protocol
    const imagesPath = proto === 'file:' ? '*index.html' : '/'
    */

    return (
      <div className={style.App} id="App">
        <Banner />
        <Header />
        <Route exact path="/" component={Images} />
        <Route path="/item/:itemId" component={Item} />
        <Footer />
      </div>
    )
  }

}

export default App
