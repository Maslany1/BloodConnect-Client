import React from 'react';
import Lottie from "lottie-react";
// import loading_blood from "../../assets/Loading_Blood.json"

const Loading = () => {
    return (
        <div className='flex flex-col justify-center items-center'>

            {/* <div className='w-full md:w-1/4'>
                <Lottie animationData={loading_blood} />
            </div> */}

            <div className='w-full md:w-1/4'>
                <img src="https://i.ibb.co/3mgpyXC7/loading.gif" alt="" />
            </div>

            <p className='text-5xl text-[#ff4136] mt-20 mb-8 mx-2 text-center'>
               Loading ..... ! 
            </p>

            <p className='text-4xl text-[#333333] mb-20 mx-2 text-center'>
                <span className="loading loading-spinner loading-xl"></span>
                &nbsp;&nbsp;&nbsp; Please wait for a moment ! &nbsp;&nbsp;&nbsp;
                <span className="loading loading-spinner loading-xl"></span>
            </p>
        </div>
    );
};

export default Loading;