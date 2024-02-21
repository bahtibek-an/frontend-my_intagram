import axios from "axios"

const UseComment = () => {

    const addComment = async({token,text,item}) => {
        const headers = {
            Authorization:token
        }
        // console.log("item",item);
        await axios
        .post(`https://instagram-server-6onu.onrender.com/post/comment/${item._id}`,{
            comment:text
        },{headers})
        .then((res) => {
            console.log(res);
        }).catch((e) => {
            console.log(e);
            alert("Error in adding comment!")
        })
    }

    return {
        addComment
    }
}

export default UseComment