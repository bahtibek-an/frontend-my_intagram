import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
const useLogin = () => {
    const navigate = useNavigate();
    const loginVal = async({emailV,passwordV}) => {
        console.log("values",{emailV,passwordV});
        await axios.post("https://instagram-server-6onu.onrender.com/auth/login",{
            name:emailV,
            password:passwordV,
        })
        .then(async(res) => {
            console.log(res);

            toast.success('Successfuly logined', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });


            navigate(`/dashboard/${res.data.token}`)
        }).catch((e) => {

            toast.error(`Error in authorization ${e.response.data.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

            console.log(e);
        })
    }

    return {
        loginVal
    }
}
export default useLogin