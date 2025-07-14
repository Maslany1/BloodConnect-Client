import React, { use } from 'react';
import NavLinks from './NavLinks';
import RegistrationButtons from './RegistrationButtons';
import { Link } from 'react-router';
import { AuthContext } from '../../provider/AuthProvider';
import ProfilePicture from './ProfilePicture';

const NavBar = () => {

    const { user } = use(AuthContext);

    return (
        <div className='max-w-[1600px] mx-auto p-4 border-2 border-b-[#ff4136] border-x-0 border-t-0'>
            <div className='flex flex-col gap-2 lg:flex-row justify-between items-center sm:px-4 md:px-20 py-8'>
                <Link to="/">
                    <img className='h-[56px]' src="https://i.ibb.co/gLZK6Snn/blood-connect-white-logo.png" alt="" />
                </Link>

                <div>
                    <NavLinks></NavLinks>
                </div>

                <div className='flex justify-center items-center gap-4'>
                    {
                        user ? <ProfilePicture></ProfilePicture> : <RegistrationButtons></RegistrationButtons>
                    }
                    {/* <RegistrationButtons></RegistrationButtons> */}
                </div>
            </div>
            {/* <div className="divider divider-error"></div> */}
        </div>
    );
};

export default NavBar;