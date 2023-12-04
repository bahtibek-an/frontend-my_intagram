import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FollowHP = () => {
  const navigate = useNavigate();
  const [userFl, setUserFl] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((item) => {
        results.push({
          id: item.id,
          ...item.data(),
        });
      });
      setUserFl(results);
    });
  }, []);

  return (
    <div className="rig top-0 z-10 hidden w-1/5 h-auto mr-20 xl:block lg:w-1/5">
      <p className="mb-5">Suggestions for you</p>

      {userFl
        .sort((a, b) => b.status - a.status)
        .map((item) => (
          <div key={item.id} className="">
            <div
              onClick={() => navigate(`/Personal?userName=${item.username}`)}
              className="rg flex flex-wrap items-center p-2 mb-4 cursor-pointer"
            >
              <img
                src={
                  item.avatar ||
                  "https://w7.pngwing.com/pngs/86/421/png-transparent-computer-icons-user-profile-set-of-abstract-icon-miscellaneous-monochrome-computer-wallpaper.png"
                }
                alt=""
                className="object-cover w-10 h-10 border border-gray-400 rounded-full"
              />
              {item.status === 2 ? (
                <div className="mt-2">
                  <p className="flex items-center px-2 text-sm font-semibold fle x-wrap">
                    {item?.username || item.fullname}{" "}
                    <i className="text-blue-500 bx bxs-brightness"></i>{" "}
                  </p>
                  <p className="ml-3 text-xs text-sky-500"></p>
                </div>
                
              ) : (
                <p className="px-2 text-sm font-medium">
                  {item?.username || item.fullname}
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default FollowHP;
