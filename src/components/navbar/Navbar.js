import React, { useContext, useState } from 'react';
import './Navbar.css';
import { MdHomeFilled, MdOutlineExplore, MdOutlineAddBox, MdOutlineMenu } from 'react-icons/md';
import { GrSearch } from 'react-icons/gr';
import { NavLink, useNavigate } from 'react-router-dom';
import firebaseContex from '../../context/FirebaseContex'; // Импорт контекста Firebase
import { auth } from '../../context/FirebaseConfig';

const Navbar = () => {
  const { logout, isUpload, setIsUpload, isSearch, setIsSearch } = useContext(firebaseContex); // Деструктуризация значений из контекста Firebase
  const [isMenuMore, setIsMenuMore] = useState(false); // Состояние для открытия/закрытия дополнительного меню

  const navigate = useNavigate(); // Хук для навигации

  const handleLogout = async () => {
    navigate('/login'); // Переход на страницу входа при выходе из системы
    await logout(); // Выход из системы
  };

  return (
    <div className="navbar-container" style={{ width: isSearch && '80px' }}>
      <div className="navbar-wrapper">
        <div className="logo-wrapper" style={{ textAlign: isSearch && 'center' }}>
          {isSearch ? (
            <img
              src={'/images/photogram-logo.png'}
              alt="instagram logo"
              className="photogram-logo"
              style={{ width: isSearch && '58px', height: isSearch && '60px' }}
            />
          ) : (
            <div className="photogram-logo" style={{ width: isSearch && '40px', height: isSearch && '40px' }}>
              instagram
            </div>
          )}
        </div>
        <div className="nav-menu-wrapper">
          {/* Ссылка на главную страницу */}
          <div className="home-menu-wrapper menu-wrapper">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link align-center' : 'align-center')}>
              <div className="icon absolute-center">
                <MdHomeFilled style={{ width: '200%', height: '200%' }} />
              </div>
              <div className={`menu-title ${isSearch && 'hide-content'}`}>Home</div>
            </NavLink>
          </div>
          {/* Кнопка поиска пользователя */}
          <div className="search-menu-wrapper menu-wrapper">
            <button
              type="button"
              className="create-btn cur-point"
              title="search user"
              onClick={() => setIsSearch(!isSearch)}
            >
              <div className="icon absolute-center">
                <GrSearch style={{ width: '200%', height: '200%' }} />
              </div>
              <div className={`menu-title ${isSearch && 'hide-content'}`}>Search</div>
            </button>
          </div>
          {/* Ссылка на страницу "Explore" */}
          <div className="explore-menu-wrapper menu-wrapper">
            <NavLink to="/explore" className={({ isActive }) => (isActive ? 'active-link align-center' : 'align-center')}>
              <div className="icon absolute-center">
                <MdOutlineExplore style={{ width: '200%', height: '200%' }} />
              </div>
              <div className={`menu-title ${isSearch && 'hide-content'}`}>Explore</div>
            </NavLink>
          </div>
          {/* Кнопка создания поста */}
          <div className="post-menu-wrapper menu-wrapper">
            <button
              type="button"
              className="create-btn cur-point"
              title="create post"
              onClick={() => setIsUpload(!isUpload)}
            >
              <div className="icon absolute-center">
                <MdOutlineAddBox style={{ width: '100%', height: '100%' }} />
              </div>
              <div className={`menu-title ${isSearch && 'hide-content'}`}>Create</div>
            </button>
          </div>
          {/* Ссылка на профиль пользователя */}
          <div className="profile-menu-wrapper menu-wrapper">
            <NavLink
              to={`/profile/${auth.currentUser?.displayName}`}
              className={({ isActive }) => (isActive ? 'active-link align-center' : 'align-center')}
            >
              <div className="user-image-wrapper absolute-center icon">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-profile" />
              </div>
              <div className={`menu-title ${isSearch && 'hide-content'}`}>Profile</div>
            </NavLink>
          </div>
          {/* Кнопка "More" с дополнительными опциями */}
          <div className="more-menu-wrapper menu-wrapper">
            <button
              type="button"
              title="more options"
              className="more-menue-btn create-btn cur-point"
              onClick={() => setIsMenuMore(!isMenuMore)}
            >
              <div className="icon">
                <MdOutlineMenu style={{ width: '100%', height: '100%' }} />
              </div>
              <div className={`menu-title ${isSearch && 'hide-content'}`}>More</div>
            </button>
            {/* Дополнительные опции, в данном случае, только кнопка выхода (logout) */}
            <div className="more-menu-options-wrapper" style={{ display: isMenuMore ? 'flex' : 'none' }}>
              <div className="logut-wrapper">
                <button
                  type="button"
                  title="logout"
                  className="logout-btn cur-point"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
