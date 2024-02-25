import React, { useContext } from 'react'
import { AuthContext } from '../Authentication'
import { Navigate } from 'react-router-dom'
import { auth } from '../firebase';
import Navbar from '../Component/Navbar';

export default function Createpost() {
    const { currentUser } = useContext(AuthContext)
    if (!currentUser) {
        return <Navigate to="/register" />;
    }

    const logout = async () => {
        auth.signOut()
    }

    return (
        <>
            <div className="container">
                <Navbar></Navbar>
                <br />
                <br />
                <div className="Postcomponent">
                    <div className="posts">
                        <section className="main">
                            <div className="wrapper">
                                <div className="left-col">
                                    <div className="post">
                                        <div className="info">
                                            <div className="user">
                                                <div className="profile-pic"><img src="https://avatars.mds.yandex.net/get-mpic/4519349/img_id8400577499267991940.jpeg/orig" alt="Profile Pic" /></div>
                                                <p className="username">modern_web_channel</p>
                                            </div>
                                            <img src="https://avatars.mds.yandex.net/get-mpic/4519349/img_id8400577499267991940.jpeg/orig" className="options" alt="Options" />
                                        </div>
                                        <img src="https://avatars.mds.yandex.net/get-mpic/4519349/img_id8400577499267991940.jpeg/orig" className="post-image" alt="Post Image" />
                                        <div className="post-content">
                                            <div className="reaction-wrapper">

                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 512 512" fill='red'>
                                                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                                                </svg>

                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="save icon">
                                                    <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                                                </svg>
                                            </div>
                                            <p className="likes">1,012 likes</p>
                                            <p className="description"><span>username </span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
                                            <p className="post-time">2 minutes ago</p>
                                        </div>
                                        <div className="comment-wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon">
                                                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                            </svg>
                                            <input type="text" className="comment-box" placeholder="Add a comment" />
                                            <button className="comment-btn">post</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="main">
                            <div className="wrapper">
                                <div className="left-col">
                                    <div className="post">
                                        <div className="info">
                                            <div className="user">
                                                <div className="profile-pic"><img src="https://avatars.mds.yandex.net/get-mpic/4519349/img_id8400577499267991940.jpeg/orig" alt="Profile Pic" /></div>
                                                <p className="username">modern_web_channel</p>
                                            </div>
                                            <img src="https://avatars.mds.yandex.net/get-mpic/4519349/img_id8400577499267991940.jpeg/orig" className="options" alt="Options" />
                                        </div>
                                        <img src="https://avatars.mds.yandex.net/get-mpic/4519349/img_id8400577499267991940.jpeg/orig" className="post-image" alt="Post Image" />
                                        <div className="post-content">
                                            <div className="reaction-wrapper">

                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 512 512" fill='red'>
                                                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                                                </svg>

                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="save icon">
                                                    <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                                                </svg>
                                            </div>
                                            <p className="likes">1,012 likes</p>
                                            <p className="description"><span>username </span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
                                            <p className="post-time">2 minutes ago</p>
                                        </div>
                                        <div className="comment-wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon">
                                                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                            </svg>
                                            <input type="text" className="comment-box" placeholder="Add a comment" />
                                            <button className="comment-btn">post</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="main">
                            <div className="wrapper">
                                <div className="left-col">
                                    <div className="post">
                                        <div className="info">
                                            <div className="user">
                                                <div className="profile-pic"><img src="https://avatars.mds.yandex.net/get-mpic/4519349/img_id8400577499267991940.jpeg/orig" alt="Profile Pic" /></div>
                                                <p className="username">modern_web_channel</p>
                                            </div>
                                            <img src="https://avatars.mds.yandex.net/get-mpic/4519349/img_id8400577499267991940.jpeg/orig" className="options" alt="Options" />
                                        </div>
                                        <img src="https://avatars.mds.yandex.net/get-mpic/4519349/img_id8400577499267991940.jpeg/orig" className="post-image" alt="Post Image" />
                                        <div className="post-content">
                                            <div className="reaction-wrapper">

                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 512 512" fill='red'>
                                                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                                                </svg>

                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="save icon">
                                                    <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                                                </svg>
                                            </div>
                                            <p className="likes">1,012 likes</p>
                                            <p className="description"><span>username </span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
                                            <p className="post-time">2 minutes ago</p>
                                        </div>
                                        <div className="comment-wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon">
                                                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                            </svg>
                                            <input type="text" className="comment-box" placeholder="Add a comment" />
                                            <button className="comment-btn">post</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        </>
    )
}
