import React from 'react';
import { Link } from 'react-router';

const RegistrationButtons = () => {
    return (
        <div className='flex justify-center items-center gap-6'>
            <Link to="/register">
                <button className='mr-6 border-2 border-[#ff4136] hover:border-black hover:underline hover:cursor-pointer font-bold text-xl px-6 py-3 rounded-sm bg-[#ff4136]'>Register</button>
            </Link>

            <Link to="/login">
                <button className='hover:underline text-white hover:cursor-pointer bg-black font-bold text-xl px-6 py-3 rounded-sm border-2 border-black hover:border-[#ff4136] '>Login</button>
            </Link>
        </div>
    );
};

export default RegistrationButtons;