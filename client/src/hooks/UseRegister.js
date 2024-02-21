import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
const UseRegister = () => {
    const navigate = useNavigate();
    const registerVal = async({nameV,passwordV}) => {
        
        console.log("values",{nameV,passwordV});
        
        await axios.post("https://instagram-server-6onu.onrender.com/auth/register",{
            name:nameV,
            password:passwordV,
        })
        .then((res) => {
            navigate(`/dashboard/${res.data.token}`)
            console.log(res);
        }).catch((e) => {
            console.log(e);
        })
    }

    return {
        registerVal
    }
}
export default UseRegister