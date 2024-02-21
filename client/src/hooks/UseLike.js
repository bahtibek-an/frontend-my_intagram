import axios from "axios"

const UseLike = () => {
    const like = async({item,token}) => {
        const headers = {
            Authorization:token
        }
        axios
        .post(`https://instagram-server-6onu.onrender.com/post/like/${item._id}`,{} , {headers})
        .then((res) => {
            console.log("liked",res);
        }).catch((e) => {
            console.log(e);
        })
    }

    const unLike = async({item,token}) => {
        const headers = {
            Authorization:token
        }
        axios
        .post(`https://instagram-server-6onu.onrender.com/post/Unlike/${item._id}`,{} , {headers})
        .then((res) => {
            console.log("Unliked",res);
        }).catch((e) => {
            console.log(e);
            alert("Error in like!")
        })
    }

    return {
        like,
        unLike
    }
}
export default UseLike