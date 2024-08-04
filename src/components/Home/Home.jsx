import React from 'react';
import './Home.css';

function Home({ toggleNavbar }) {
  return (
    <div className="home_container">
      <h1>Welcome to My Application</h1>
      <p>This is the home page. Use the navigation bar to explore different projects like Weather, Wikipedia, Calculator, and Text-to-Speech converter in the same app.</p>
      <p>My name is Sahanee Arman. I am a CSE undergraduate and a Web developer.</p>
      <button onClick={toggleNavbar}>Click Me</button>
    </div>
  );
}

export default Home;
