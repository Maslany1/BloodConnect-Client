import React from 'react';
import { NavLink } from 'react-router';

const NavLinks = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-center items-center'>
            <NavLink className={`mr-8 text-2xl hover:underline decoration-2`} to="/">Home</NavLink>
            <NavLink className={`mr-8 text-2xl hover:underline decoration-2`} to="/search">Search</NavLink>
            <NavLink className={`mr-8 text-2xl hover:underline decoration-2`} to="/blood-donation-request">Donation Request</NavLink>
            <NavLink className={`mr-8 text-2xl hover:underline decoration-2`} to="/blogs">Blogs</NavLink>
            {/* <NavLink className={`mr-8 text-2xl hover:underline decoration-2`} to="/myProducts">My Products</NavLink>
            <NavLink className={`mr-8 text-2xl hover:underline decoration-2`} to="/cart">Cart Page</NavLink> */}
        </div>
    );
};

export default NavLinks;