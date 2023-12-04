import { useEffect, useState } from "react";


const GetDate = ({date}) => {

    const [seconds, setSeconds] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
          const dateNow = Date.now()
          const dated = (dateNow-date)/1000
          if(dated >= 1 && dated <= 60){
            setSeconds(`${Math.floor(dated)} s`)
          }else if(dated/60 >= 1 && dated/60 <= 60){
            setSeconds(`${Math.floor(dated/60)} min`)
          }else if(dated/3600 >= 1 && dated/3600 <= 24){
            setSeconds(`${Math.floor(dated/3600)} ${Math.floor(dated/3600) > 1 ? "hours" : "hour"}`)
          }else if(dated/86400 >= 1 &&  dated/86400 <= 7){
            setSeconds(`${Math.floor(dated/86400)} ${Math.floor(dated/86400) > 1 ? "days" : "day"}`)
          }else if(dated/86400 >= 7 &&  dated/86400 <= 30){
            setSeconds(`${Math.floor(dated/604800)} ${Math.floor(dated/604800) > 1 ? "weeks" : "week"}`)
          }else if(dated/86400 >= 30 &&  dated/86400 <= 365){
            setSeconds(`${Math.floor(dated/2592000)} ${Math.floor(dated/2592000) > 1 ? "months" : "month"}`)
          }else if(dated/86400 >= 365){
            setSeconds(`${Math.floor(dated/31536000)} ${Math.floor(dated/31536000) > 1 ? "years" : "year"}`)
          }
        }, 10000);
        return () => clearInterval(interval);
      }, []);

    return(
        <>
        <p className="grey">{seconds}</p>
        </>
    )
}

export default GetDate