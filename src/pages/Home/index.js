import React from "react";
import { Helmet } from "react-helmet-async";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Helmet>
        <title>Home page title</title>
      </Helmet>
    </div>
  );
};

export default Home;
