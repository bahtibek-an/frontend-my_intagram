import axios from "axios"

const UsePost = () => {
    const post = async({formData,token}) => {
        const headers = {
            Authorization:token
        }
        // const formData = new FormData();
        // formData.append('file',img)
        console.log("img",formData);
        await axios
        .post("https://instagram-server-6onu.onrender.com/post",formData,{headers})
        .then((res) => {
            console.log("post created!",res);
        }).catch((e) => {
            console.log(e);
        })
    }
    return {
        post
    }
}

export default UsePost