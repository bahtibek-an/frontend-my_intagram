import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import UseLike from '../../../hooks/UseLike';
import CommentModal from '../../../modals/CommentModal';

const Posts = ({ token,data }) => {
  const { like, unLike } = UseLike();
  const [user, setUser] = useState({});
  const [modalStates, setModalStates] = useState({});
  const [loading,setLoading] = useState(true);

  const headers = {
    Authorization: token,
  };

    
  
  

  useEffect(() => {
      axios.get("https://instagram-server-6onu.onrender.com/auth/me", { headers })
      .then((res) => {
        setUser(res.data)
      }).catch ((error ) => {
        console.log(error);
      }) 
  }, [data]);



  const handleLike = (item) => {
    like({ item, token });
  };

  const handleUnLike = (item) => {
    unLike({ item, token });
  };

  const toggleModal = (itemId) => {
    setModalStates((prevStates) => ({
      ...prevStates,
      [itemId]: !prevStates[itemId],
    }));
  };

  return (
    <Container className='bg-black container-fluid d-flex flex-column gap-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '100px 0px 100px 100px' }}>
      {
        data.length === 0 ?
        (
          <>
          <h1>Posts not found!</h1>
          </>
        ):
      data.map((item) => (
        <Card key={item._id} style={{ width: '500px', height: 'auto' }}>
          <Card.Header className='bg-black'>
            <Link to={user._id === item.user._id ? `/user/profile/${token}` : `/users/profile/${token}/${item._id}`} className="user_info" style={{ display: 'flex', gap: '15px', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
              <img width={'40px'} height={'40px'} style={{ borderRadius: '100%' }} src={`https://instagram-server-6onu.onrender.com/avatar/image/${item.user._id}`} alt="" />
              {item.user.name}
            </Link>
          </Card.Header>

          <Card.Body className='bg-black' style={{height:'auto'}}>
            <Card.Img src={`https://instagram-server-6onu.onrender.com/image/${item._id}`} />
            <Card.Body className='d-flex' style={{ gap: '30px' }}>
              <div className="comment-container">
                <InsertCommentIcon onClick={() => toggleModal(item._id)} style={{ color: 'white', cursor: 'pointer' }} />
                <p style={{ color: 'white' }}>{item.comments.length}</p>
              </div>
              <div className="like-container">
                {item.like.find((id) => id === user._id) ? (
                  <>
                    <FavoriteIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleUnLike(item)} />
                  </>
                ) : (
                  <>
                    <FavoriteBorderIcon onClick={() => handleLike(item)} style={{ color: 'white', cursor: 'pointer' }} />
                  </>
                )}
                <p style={{ color: 'white' }}>{item.like.length}</p>
              </div>
            </Card.Body>

            <Card.Text style={{ color: 'white', margin: '5px' }}>{item.title}</Card.Text>
          </Card.Body>

          {/* Use modal state for each post */}
          {modalStates[item._id] && (
            <CommentModal
              show={modalStates[item._id]}
              setShow={() => toggleModal(item._id)}
              token={token}
              item={item}
              user={user}
            />
          )}
        </Card>
      ))}
    </Container>
  );
};

export default Posts;
