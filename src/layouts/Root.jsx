import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import NavBar from '../pages/shared/NavBar';
import Footer from '../pages/shared/Footer';


const Root = () => {

    // const { state } = useNavigation();

    return (
        <div>
            <header>
                <NavBar></NavBar>
            </header>

            <main>
                {/* {state == "loading" ? <Loading></Loading> : <Outlet></Outlet>} */}
                <Outlet></Outlet>
            </main>

            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Root;