import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/firebase-config';
import { collection, getDocs, QuerySnapshot, DocumentData, where, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';

interface UserData {
  username: string;
  userId: string;
  userAvater: string;
  split: string;
}

const Search: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const avater = 'https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg';

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId('');
      }
    });

    return () => unsubscribe();
  }, []);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRef = collection(db, 'username');
        const q = query(usersRef, where('userId', '!=', ''));
        const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);
        const usersData: UserData[] = snapshot.docs.map((doc) => doc.data() as UserData);
        setUsersData(usersData);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = usersData.filter(user =>
    user && user.username && user.username.toLowerCase().includes(searchValue.toLowerCase()) && user.userId !== userId
  );

  return (
    <div className="relative p-6 h-[93vh]">
      <h1 className='text-center font-bold border-b-2 text-3xl mb-3'>Search People</h1>
      <div className="relative w-full">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Searching Instagram users..."
            required
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      {searchValue && filteredUsers.length === 0 && (
        <div className="mt-2 w-full bg-white border rounded-md shadow-lg">
          <p className="py-2 px-4 text-black text-center text-3xl font-bold content-center">User not found</p>
          <p className='text-gray-500 text-center mb-4'>Please try again</p>
        </div>
      )}
      {searchValue && filteredUsers.length > 0 && (
        <div className="mt-2 w-full bg-white border rounded-md shadow-lg">
          <ul className='m-1 border border-gray-300 rounded-sm'>
            {filteredUsers.slice(0, 8).map((user, index) => (
              <Link to={`/profile/${user.userId}/3`} key={index}>
                <div className='flex px-3 py-2 border-b hover:bg-gray-50 justify-between' key={index}>
                  <div className='flex'>
                    <li>
                      <img src={user.userAvater || avater} alt="" className='w-10 h-10 object-cover rounded-full border border-gray-400 p-0.5' />
                    </li>
                    <li className="py-2 px-4 cursor-pointer text-black">
                      {user.username}
                    </li>
                  </div>
                  {/* <button className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100">Follow</button> */}
                </div>
              </Link>
            ))}
          </ul>
        </div>
      )}
      {!searchValue && (
        <div className="mt-2 w-full bg-white border rounded-md shadow-lg">
          <ul className='m-1 border border-gray-300 rounded-sm'>
            {filteredUsers.slice(0, 8).map((user, index) => (
              <div className='flex px-3 py-2 hover:bg-gray-50 border-b justify-between' key={index}>
                <Link to={`/profile/${user.userId}/3`} key={index}>
                  <div className='flex'>
                    <li>
                      <img src={user.userAvater || avater} alt="" className='w-10 h-10 object-cover rounded-full border border-gray-400 p-0.5' />
                    </li>
                    <li className="py-2 px-4 cursor-pointer text-black">
                      {user.username}
                    </li>
                  </div>
                </Link>
                {/* <button className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100">Follow</button> */}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
