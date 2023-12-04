
import './More.css'

const More = ({dark}) => {

  
    return (
      <div className='more'
      style={{backgroundColor: dark ? "#3f3f3f" : "#fff", color:  dark ? "#fff" : ""}}>
        <div style={{color: "#ed4956"}}>Complain</div>
        <div style={{color: "#0095f6"}}>Subscribe</div>
        <div>Go to publication</div>
        <div>Share...</div>
        <div>Copy link</div>
        <div>Embed on site</div>
        <div>Account information</div>
      </div>
    )
  }

  export default More
