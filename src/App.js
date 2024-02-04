import React, { useEffect, useState } from "react";
import "./App.css";
import AppContext from "./AppContext.js";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import Write from "./Pages/Write/Write";
import Profile from "./Pages/Profile/Profile.jsx";
import Blog from "./Pages/SingleBlog/Blog.jsx";
import Edit from "./Pages/Edit/Edit.jsx";
import EditProfile from "./Pages/EditProfile/EditProfile.jsx";


const App = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [query,setQuery]=useState("");


  const user={loggedIn,setLoggedIn,selectedBlog,setSelectedBlog,query,setQuery};
  

  useEffect(()=>{
    const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    setLoggedIn(userInfo);
  },[]);
  
  return (
    <AppContext.Provider value={user}>
    <div className="main_body">
      <Header />
      <div className="main_content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={!loggedIn?<SignUp />:<Navigate replace to={"/"}/>} />
          <Route path="/login" element={!loggedIn?<Login />:<Navigate replace to={"/"}/>} />
          <Route
            path="/write"
            element={JSON.parse(localStorage.getItem("userInfo")) ? <Write /> : <Navigate replace to={"/signUp"} />}
          />
          <Route path="/profile" element={JSON.parse(localStorage.getItem("userInfo"))?<Profile/>:<Navigate replace to={"/signup"}/>}/>
          <Route path="/blog" element={selectedBlog?<Blog/>:<Navigate replace to={"/"}/>}/>
          <Route path="/edit" element={selectedBlog?<Edit/>:<Navigate replace to={"/"}/>}/>
          <Route path="/editProfile" element={loggedIn?<EditProfile/>:<Navigate replace to={"/"}/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
    </AppContext.Provider>
  );
};

export default App;
