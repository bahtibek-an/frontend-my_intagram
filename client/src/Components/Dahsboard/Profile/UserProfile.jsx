import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import EditProfileModal from '../../../modals/EditProfileModal';
import UseFolow from '../../../hooks/UseFolow';
import { ToastContainer } from 'react-toastify';
import UseUnFolow from '../../../hooks/UseUnFolow';

const UserProfile = () => {
    const { token } = useParams();
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [me, setMe] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { folow } = UseFolow()
    const { Unfolow } = UseUnFolow()
    const headers = {
        Authorization: token
    }

    useEffect(() => {


        axios
            .get(`https://instagram-server-6onu.onrender.com/user/getUser/${id}`, { headers })
            .then(async (res) => {
                setUser(res.data)
                console.log(res.data);
            }).catch((e) => {
                console.log(e);
            })

            axios
            .get(`https://instagram-server-6onu.onrender.com/auth/me`, { headers })
            .then(async (res) => {
                setMe(res.data)
                console.log("mm",res.data);
            }).catch((e) => {
                console.log(e);
            })

    }, [])

    useEffect(() => {
        setLoading(true)
        axios
            .get("https://instagram-server-6onu.onrender.com/post", { headers })
            .then(async (res) => {
                setPosts(res.data.filter((post) => post.user.name === user.name))
                setLoading(false)
            }).catch((e) => {
                console.log(e);
            })

    }, [token, user,me])

    const toDashboard = () => {
        navigate(`/dashboard/${token}`)
    }
    console.log("posts", user.subscribers?.filter((user) => user === me._id));

    const handleSubscribe = (id) => {
        folow({ id, token })
    }
    const handleUnSubscribe = (id) => {
        Unfolow({ id, token })
    }
    return (

        <>
            <ToastContainer
                closeOnClick
                autoClose={5000}
                rtl={false}
            />
            <div className='bg-black d-flex' style={{ height: '100vh', padding: '25px', width: '100%', justifyContent: 'start', flexDirection: 'column', alignItems: 'center' }}>
                <Button variant='danger' style={{ position: 'absolute', left: "30px", top: '30px' }} onClick={toDashboard}>
                    Back
                </Button>
                <div className='user-container' style={{ marginLeft: "-10%" }} >
                    <div className="user_info_data" style={{ display: 'flex', gap: '30px', alignItems: 'center', flexDirection: 'column' }}>


                        <div className="user_data" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                            <img src={
                                user.avatar == {} ?
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"

                                    : `https://instagram-server-6onu.onrender.com/avatar/image/${user._id}`
                            }
                                alt="avatar" style={{ width: '170px', height: "170px", borderRadius: '50%' }}

                            />
                            <div className="user_info" style={{ display: 'flex', gap: '30px', alignItems: 'center', flexDirection: 'column' }}>
                                <b style={{ color: 'white' }}>
                                    {user.name}
                                    {
                                        user.subscribers?.find((user) => user === me._id) ? 
                                           
                                               <Button style={{ marginLeft: '30px' }} variant='danger' onClick={() => handleUnSubscribe(user._id)}>UnFolow</Button>
                                            
                                        
                                            :
                                               <Button style={{ marginLeft: '30px' }} onClick={() => handleSubscribe(user._id)}>Folow</Button>
                                            
                                        
                                    }
                                </b>
                                <div className="user_actions text-start" style={{ width: '100%', display: 'flex', gap: '30px' }}>
                                    <b style={{ color: 'white' }}>{user.subscribers?.length} Folowers </b>
                                    <b style={{ color: 'white' }}>{posts?.length} Posts </b>
                                </div>
                                <p className='text-start' style={{ color: 'white', textAlign: 'start', width: '100%' }}>{user.bio}</p>

                            </div>
                        </div>



                    </div>
                </div>
                <div className="user_posts_container p-5 d-flex" style={{ width: '100%' }}>
                    <div className="user_post bg-black border-none" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        {
                            loading === true ? (
                                <>
                                    <h1>Loading...</h1>
                                </>
                            ) :
                                // posts.length === 0 ? (
                                //     <>
                                //     <h2>Posts not found</h2>
                                //     </>
                                // ):
                                posts.map((item) => {
                                    return (
                                        <>
                                            <Card key={item._id} style={{ cursor: 'pointer', width: "300px", height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Card.Img width={"100%"} height={'300px'} style={{ objectFit: 'cover' }} src={`https://instagram-server-6onu.onrender.com/image/${item._id}`} />
                                            </Card>
                                        </>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserProfile