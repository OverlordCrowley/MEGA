import React from 'react';
import Header from "../Components/header/Header";
import Footer from "../Components/footer/Footer";
import Output from "../Components/output/Output";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
           <Header />
           <Outlet/>
           <Footer />
        </>
    );
};

export default Layout;