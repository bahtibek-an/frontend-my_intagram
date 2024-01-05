import React, { memo } from 'react';
import Skeleton from "react-loading-skeleton";
import { Link } from 'react-router-dom';

const User = ({ username, fullName, avatarSrc }) => (
    !username || !fullName ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link to={`/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
            <div className="flex items-center justify-between col-span-1 w-16 h-16">
                <img
                    className="rounded-full w-full h-full"
                    src={avatarSrc}
                    alt=""
                    onError={(e) => {
                        e.target.src = "/images/avatars/default/.jpg";
                    }}
                />
            </div>
            <div className="col-span-3">
                <p className="font-bold text-sm">{ username }</p>
                <p className="text-sm">{ fullName }</p>
            </div>
        </Link>
    )
)

export default memo(User);
