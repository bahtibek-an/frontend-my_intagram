// import { useRef, useState } from "react";
// // import { SearchLogo } from "../assets/constant";
// import useSearchUser from "../hooks/useSearchUser";
// import SuggestedUser from "./SuggestedUser";
// import { AiOutlineSearch } from 'react-icons/ai';

// const Search = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const searchRef = useRef(null);
//   // eslint-disable-next-line
//   const { user, isLoading, getUserProfile, setUser } = useSearchUser();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     getUserProfile(searchRef.current.value);
//   };

//   return (
//     <>
//       <div className="flex justify-center items-center">
//         <button
//           className="flex items-center justify-center gap-4 p-2 rounded-lg items items-center transition-colors hover:bg-white bg-opacity-40"
//           onClick={() => setIsOpen(true)}
//         >
//         <AiOutlineSearch size={30} />
//         </button>
//         {isOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
//             <div className="bg-white border-gray-700 shadow-lg border-1 max-w-400 rounded-md">
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold mb-4">Search</h2>
//                 <button
//                   className="absolute top-2 right-2 text-white"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <span className="sr-only">Close</span>
//                   <svg
//                     className="h-6 w-6"
//                     fill="none"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path d="M6 18L18 6M6 6l12 12"></path>
//                   </svg>
//                 </button>
//                 <form onSubmit={handleSubmit} className="flex">
//                   <div className="mb-4">
//                     <input
//                       className="mt-4 p-2 w-full text-gray-500 bg-gray-100 border opacity-50 w-64 border-gray-600 rounded"
//                       placeholder="Enter name of user"
//                       ref={searchRef}
//                     />
//                   </div>
//                   <div className="flex px-4 py-4">
//                     <button
//                       type="submit"
//                       className="px-4 py-2 bg-blue-500 items-center text-white font-semibold rounded hover:bg-blue-600"
//                     >
//                     Search
//                     </button>
//                   </div>
//                 </form>
//                 {user && <SuggestedUser user={user} setUser={setUser} />}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Search;



import { useRef, useState } from "react";
import useSearchUser from "../hooks/useSearchUser";
import SuggestedUser from "./SuggestedUser";
import { AiOutlineSearch } from 'react-icons/ai';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  // eslint-disable-next-line
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchRef.current.value.trim(); // Get search query
    getUserProfile(query); // Perform search
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          className="flex items-center justify-center gap-4 p-2 rounded-lg items items-center transition-colors hover:bg-white bg-opacity-40"
          onClick={() => setIsOpen(true)}
        >
          <AiOutlineSearch size={30} />
        </button>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white border-gray-700 shadow-lg border-1 max-w-400 rounded-md">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Search</h2>
                <button
                  className="absolute top-2 right-2 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {/* <span className="sr-only"></span> */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <form onSubmit={handleSubmit} className="flex">
                  <div className="mb-4">
                    <input
                      className="mt-4 p-2 w-full text-gray-500 bg-gray-100 border opacity-50 w-64 border-gray-600 rounded"
                      placeholder="Enter username"
                      ref={searchRef}
                    />
                  </div>
                  <div className="flex px-4 py-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 items-center text-white font-semibold rounded hover:bg-blue-600"
                    >
                      Search
                    </button>
                  </div>
                </form>
                {user && <SuggestedUser user={user} setUser={setUser} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;

