import React, { useContext} from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from '@mui/icons-material/Logout';
import AppContext from "../../AppContext";
import {Link, useNavigate} from 'react-router-dom'
import { Tooltip } from "@mui/material";

const Header = () => {
  const { loggedIn, setLoggedIn ,setQuery} = useContext(AppContext);

  const navigate=useNavigate();

  const handleLogOut=()=>{
    setLoggedIn("");
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  return (
    <div className="header">
      <div className="top_left">
        <HomeIcon
          sx={{ marginRight: "1px", fontSize: "2.5rem", color: "#404258" }}
        />
        <Link to={"/"} style={{textDecoration:'none',fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",fontWeight:'bolder',cursor:'pointer'}}>HOME</Link>
      </div>
      <div className="top_center">
        <SearchIcon sx={{ fontWeight: "bolder", marginRight: "0.5rem" }} />
        <input placeholder="Search" onChange={(e)=>setQuery(e.target.value)}/>
      </div>
      <div className="top_right">
        <Link to={"/write"}>
        <button className="top_right_btn">
          <CreateIcon sx={{ color: "white" }} />
        </button>
        </Link>
        {loggedIn ? (
          <>
          <Tooltip title='profile'>
          <Link to={'/profile'}>
          <Avatar sx={{ height: "6vh", width: "6vh" }} src={loggedIn.pic}/>
          </Link>
          </Tooltip>
        
          <button style={{backgroundColor:'black',padding:'0.2rem'}} onClick={handleLogOut}><LogoutIcon sx={{color:'white',cursor:'pointer'}}/></button>
          </>
        ) : (
          <div style={{display:'flex',alignItems:'center'}}>
            <Link to={'/signUp'} style={{padding:'0.5rem',fontSize:'1rem',fontFamily:'monospace',marginRight:'0.5rem',backgroundColor:'#352F44',color:'white',textDecoration:'none'}}>
                Sign Up
            </Link>
            <Link to={'/login'} style={{padding:'0.5rem',fontSize:'1rem',fontFamily:'monospace',backgroundColor:'#352F44',color:'white',textDecoration:'none'}}>Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
