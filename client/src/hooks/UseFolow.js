import axios from "axios"
import { toast } from "react-toastify"

const UseFolow = () => {
    const folow = async({id,token}) => {
        const headers = {
            Authorization:token
        }
        await axios
        .post(`https://instagram-server-6onu.onrender.com/user/subscribe/${id}`, {}, {headers})
        .then((res) => {
            toast.success('Folowed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true, 
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                console.log(res);
        }).catch((e) => {
            console.log(e);
            toast.error('Error in folow!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true, 
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }).finally(() => {
            window.location.reload();
        })
    }

    return {
        folow
    }
}

export default UseFolow