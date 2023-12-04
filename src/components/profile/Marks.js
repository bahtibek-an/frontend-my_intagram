import React, { Component } from 'react'
import './Marks.css'
import photo from '../images/photo.png'

export default class Marks extends Component {

    constructor(props) {
      super(props)
    
      this.state = {}
    }
  render() {
    return (
      <div className='publications'>
                <div className='p_img'>
                    <img src={photo} alt="foto"/>
                </div> 
                <h1>Photo with you</h1>
                <p>People who tagged you in your photo are shown here.</p>
            </div>
    )
  }
}
