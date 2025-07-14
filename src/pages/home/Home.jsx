import React from 'react';
import Hero from './Hero';
import Features from './Features';
import ContactUs from './ContactUs';

const Home = () => {

    // const products = useLoaderData();

    return (
        <div className='max-w-[1600px] mx-auto px-4 py-2 lg:py-8'>

            <Hero></Hero>
            <Features></Features>
            <ContactUs></ContactUs>
            
        </div>
    );
};

export default Home;