import axios from "axios"

const UseSearch = () => {
    
    const search = async({name,token,setUserData}) => {
        const headers = {
            Authorization:token
        }
        await axios
        .post(`https://instagram-server-6onu.onrender.com/user/search`, {
            name:name
        }, {headers})
        
        .then((res) => {
            console.log(res);
            setUserData([res.data])
        }).catch((e) => {
            console.log(e);
            alert("User not found!")
        })
    }

    return {
        search
    }
}

export default UseSearch