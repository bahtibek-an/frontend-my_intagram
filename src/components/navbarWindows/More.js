import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import './More.css'
import settings from '../images/settings.webp'
import save from '../images/save.png'
import clock from '../images/clock.png'
import sun from '../images/sun.png'
import moon from '../images/moon.png'
import nightmode from '../images/nightmode.png'
import lightmode from '../images/lightmode.png'
import report from '../images/report.png'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const More = ({loginOut, setdark, dark, setOpenmore}) => {

    const [display, setDisplay] = useState(false)

    const open_switch = () => {
        display ? setDisplay(false) : setDisplay(true)
    }

    const navigate = useNavigate()

    const userSignOut = () => {
        signOut(auth)
          .then(() => {
            console.log("sign out successful");
            navigate('/', { replace: true })
            loginOut()
          })
          .catch((error) => console.log(error));
      };


    
        return (
            <div className='moree' style={{backgroundColor: dark ? "#3f3f3f" : "#fff"}}>
                <div className='options'>
                    <div className='option'
                    style={{display: display && "none"}}>
                        <img src={settings} alt="setting" width="20"/>
                        <p>Settings</p>
                    </div>
                    <div className='option'
                    style={{display: display && "none"}}>
                        <img src={clock} alt="action" width="20"/>
                        <p>Your actions</p>
                    </div>
                    <div className='option'
                    style={{display: display && "none"}}>
                        <img src={save} alt="save" width="20" height="20"/>
                        <p>Saved</p>
                    </div>
                    <div className='option'
                    onClick = {open_switch}>

                        {!display ? <img src={dark ? moon : sun} alt="sun" width="20"/> : <p style={{marginRight: "20px"}}>{"<"}</p>}
                        <p>Switch mode</p>
                        {display && <img src={dark ? moon : sun} alt="sun" width="20"
                        style={{marginLeft: "120px"}}/>}
                    </div>
                    <div className='option'
                    style={{display: display && "none"}}>
                        <img src={report} alt="report" width="20"/>
                        <p>Report a problem</p>
                    </div>
                </div>

                <div className='break'></div>
                <div className='options'>
                    <div className='option'
                    style={{display: display && "none"}}><p>Switch between accounts</p></div>
                    <div className='option'
                    style={{display: display && "none"}}
                    onClick = {()=>{
                        setOpenmore(false)
                        userSignOut()
                        }}>Go out</div>
                    <div  className='option'
                    style={{display: !display && "none", justifyContent: "space-between"}}>
                        <p>Night mode</p>
                        <img src={!dark ? lightmode : nightmode} alt="mode" width="30"
                        onClick={setdark}/>
                    </div>
                </div>

            </div>
        )
    }


    export default More
