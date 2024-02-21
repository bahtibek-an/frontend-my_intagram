import axios from "axios"
import {toast} from 'react-toastify'
const UseEditProfile = () => {
    const edit = async({formData,token}) => {
        const headers = {
            Authorization:token
        }
        await axios
        .patch("https://instagram-server-6onu.onrender.com/user/edit",formData,{headers})
        .then((res) => {
            console.log(res);
            toast.success('Successfuly edited profile!', {
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
        })
    }

    return {
        edit
    }
}

export default UseEditProfile