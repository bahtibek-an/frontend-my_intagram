import { addDocument } from 'services';
import { v4 as uuidv4 } from 'uuid';
export const posts = [
   {
      _image: 'https://picsum.photos/200',
      _location: {
         _latitude: 21.028511,
         _longitude: 105.804817,
      },
      _userId: 'VK05A7c1AiSHV6kxC95j36K01813',
      _userComments: [
         { _username: 'thidiem304', _content: 'bai viet hay qua' },
         { _username: 'thidiem304', _content: 'bai viet hay qua' },
         { _username: 'thidiem304', _content: 'bai viet hay qua' },
      ],
      _userLikes: [
         {
            _fullName: 'Ngoc Hai',
            _username: 'ngochai53',
            _isFollowing: false,
         },
      ],
      _content: 'This is post 1',
      postId: uuidv4(),
   },
   {
      _image: 'https://picsum.photos/200',
      _location: {
         _latitude: 21.028511,
         _longitude: 105.804817,
      },
      _userId: 'VK05A7c1AiSHV6kxC95j36K01813',
      _userComments: [
         { _username: 'thidiem304', _content: 'bai viet hay qua' },
         { _username: 'thidiem304', _content: 'bai viet hay qua' },
         { _username: 'thidiem304', _content: 'bai viet hay qua' },
      ],
      _userLikes: [
         {
            _fullName: 'Ngoc Hai',
            _username: 'ngochai53',
            _isFollowing: false,
         },
      ],
      _content: 'This is post 1',
      postId: uuidv4(),
   },
   {
      _image: 'https://picsum.photos/200',
      _location: {
         _latitude: 21.028511,
         _longitude: 105.804817,
      },
      _userId: 'VK05A7c1AiSHV6kxC95j36K01813',
      _userComments: [],
      _userLikes: [],
      _content: 'This is post 1',
      postId: uuidv4(),
   },
];

export const addPosts = async () => {
   for (const post of posts) {
      await addDocument('posts', post);
   }
};
