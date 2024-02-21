import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UseLogout = () => {
    const navigate = useNavigate();
    const logout = async({token}) => {
        const headers = {
            Authorization:token
        }
        axios
        .post('https://instagram-server-6onu.onrender.com/user/logout',{},{headers})
        .then((res) => {
            console.log(res);

            toast.success('Successfuly logouted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

        }).catch((e) => {
            console.log(e);
            toast.error('Error in logout!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }).finally(() =>{
             navigate(`/login`)
        })
        
    }

    return {
        logout
    }
}

export default UseLogout;