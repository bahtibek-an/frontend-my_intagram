import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// Компонент для отображения заглушек карточек постов
const PostCardSkeleton = () => {
  // Создаем массив из 6 элементов, чтобы отрисовать 6 заглушек
  const arrayCount = Array(6).fill(1)

  return (
    // Маппим массив и для каждого элемента создаем блок с заглушками
    arrayCount.map((val, index) => (
      <div className='card-container' key={index}>
        <div className="card-wrapper">
          {/* Секция с информацией о пользователе */}
          <div className="card-header align-center">
            <div className="image-wrapper absolute-center">
              {/* Заглушка для изображения профиля в виде круга */}
              <Skeleton circle={true} height={42} width={42} />
            </div>
            <div className="profile-username">
              {/* Заглушка для имени пользователя */}
              <Skeleton width={65} />
            </div>
          </div>
          
          {/* Основная секция с заглушкой для изображения поста */}
          <div className="post-wrapper">
            <Skeleton height={300} />
          </div>

          {/* Секция снизу с заглушками для информации о посте */}
          <div className="card-bottom">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    ))
  )
}

export default PostCardSkeleton
