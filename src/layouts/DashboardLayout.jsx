import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full ">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Dashboard</div>
                </div>

                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li>
                        <Link to="/">
                            <img className='h-[56px]' src="https://i.ibb.co/r2YDdhpr/blood-connect-white-logo-nobg.png" alt="" />
                        </Link>
                    </li>

                    <li>
                        <NavLink to="/dashboard">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile">
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-donation-requests">
                            My Donation Requests
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/create-donation-request">
                            Create Donation Request
                        </NavLink>
                    </li>
                    
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;