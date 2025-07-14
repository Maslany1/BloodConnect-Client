import React, { use } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../provider/AuthProvider';

const ProfilePicture = () => {

    const navigate = useNavigate();
    const { user, logOut } = use(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                localStorage.removeItem("token");
                navigate('/');
            }).catch((error) => {
                // toast.error(`ERROR - ${error.message} `);
            });
    }

    return (
        <div className="dropdown dropdown-center md:dropdown-end">
            <div tabIndex={0} role="button" className="m-1">
                <div className="tooltip tooltip-left" data-tip={user.displayName}>
                    <img className="w-[40px] h-[40px] rounded-full border-2 border-green-500" src={`${user.photoURL ? user.photoURL : "https://i.ibb.co/bjvNNZsL/developer-512.jpg"}`} alt="" />
                </div>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                {/* <li><p className='btn btn-outline  btn-neutral btn-active mb-2'>{user.displayName ? user.displayName : "¯\\_(ツ)_/¯"}</p></li> */}
                <li><p className='btn btn-neutral btn-outline hover:text-white mb-2' onClick={handleLogOut}>Dashboard</p></li>
                <li><p className='btn btn-error btn-outline hover:text-white' onClick={handleLogOut}>Logout</p></li>
            </ul>
        </div>
    );
};

export default ProfilePicture;