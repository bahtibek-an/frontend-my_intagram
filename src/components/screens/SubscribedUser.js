import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { URL, UserContext } from '../../App';

const Home = () => {
    const { state, dispatch } = useContext(UserContext);
    const [data, setData] = useState('');

    useEffect(() => {
        fetch(`${URL}/getsubpost`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setData(result.posts);
            });
    }, []);

    const likePost = (id) => {
        fetch(`${URL}/like`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((item) => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const unlikePost = (id) => {
        fetch(`${URL}/unlike`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((item) => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const makeComment = (e, text, postId) => {
        e.preventDefault();
        fetch(`${URL}/comment`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                text,
                postId,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((item) => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deletePost = (postId) => {
        fetch(`${URL}/deletepost/${postId}`, {
            method: 'delete',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.filter((item) => {
                    return item._id !== result._id;
                });
                setData(newData);
                console.log(newData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className='sections'>
            <div className='home-page'>
                {data &&
                    data.map((item) => {
                        return (
                            <div className='home-card' key={item._id}>
                                <h5>
                                    <Link
                                        to={
                                            item.postedBy._id !== state._id
                                                ? '/profile/' + item.postedBy._id
                                                : '/profile'
                                        }
                                    >
                                        {item.postedBy.name}
                                    </Link>
                                    {item.postedBy._id === state._id && (
                                        <i
                                            className='material-icons'
                                            onClick={() => deletePost(item._id)}
                                        >
                                            delete
                                        </i>
                                    )}
                                </h5>
                                <div className='card-image'>
                                    <img src={item.photo} alt='' />
                                </div>
                                <div className='card-content'>
                                    <div className='likes'>
                                        <i className='material-icons'>favorite</i>
                                        {item.likes.includes(state._id) ? (
                                            <i
                                                className='material-icons'
                                                onClick={() => {
                                                    unlikePost(item._id);
                                                }}
                                            >
                                                thumb_down
                                            </i>
                                        ) : (
                                            <i
                                                className='material-icons'
                                                onClick={() => {
                                                    likePost(item._id);
                                                }}
                                            >
                                                thumb_up
                                            </i>
                                        )}
                                        <span>{item.likes.length} likes</span>
                                    </div>
                                    <h6>{item.title}</h6>
                                    <p>{item.body}</p>
                                    {item.comments.map((record) => {
                                        return (
                                            <div className='posted-comment' key={record._id}>
                                                <b>{record.postedBy.name}</b>
                                                {record.text}
                                            </div>
                                        );
                                    })}
                                    <form
                                        onSubmit={(e) => {
                                            makeComment(e, e.target[0].value, item._id);
                                        }}
                                    >
                                        <input type='text' placeholder='Add a comment' />
                                        <input type='submit' value='Comment' />
                                    </form>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Home;
