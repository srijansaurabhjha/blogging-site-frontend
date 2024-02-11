import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import AppContext from "../../AppContext";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Avatar, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

const Home = () => {
  const { setLoggedIn ,setSelectedBlog,query} = useContext(AppContext);

  const [blogs, setBlogs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const navigate=useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `https://bloggingsitebackend.onrender.com/api/blogs/allBlogs?q=${query}`
      );
      setBlogs(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setLoggedIn(userInfo);
    if(query.length===0||query.length>2)fetchBlogs();
  }, [query]);

  //pagination part
  const blogsPerPage = 3;
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  // const searchedBlogs=blogs.filter((b)=>{
  //      return(
  //         b.title.toLowerCase().includes(query) || 
  //         b.author.name.toLowerCase().includes(query) ||
  //         b.desc.toLowerCase().includes(query)
  //      )
  // });
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  ///////////////

  const handleClick=(b)=>{
    setSelectedBlog(b);

    //navigate
    navigate("/blog")
  }

  //mediaquery
  const isMobile = useMediaQuery({ maxWidth: 350});
  

  return (
    <div className="home_main_container">
      {currentBlogs.length>0?
        (currentBlogs.map((b, index) => 
        <div key={index} style={{display:"flex",flexGrow:'1',margin:'1rem 0',backgroundColor:'#526D82',width:'90%',padding:'0.5rem',borderRadius:'1rem',maxHeight:'25vh',cursor:'pointer'}} onClick={()=>handleClick(b)}>
          <div className="avatar_part" style={{flex:'1',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly'}}>
            <Avatar src={b.file} sx={{height:'7rem',width:'7rem',border:'4px solid #D2E0FB','@media(max-width:850px)':{width:'6rem',height:'6rem'},'@media(max-width:550px)':{width:'5rem',height:'5rem'}}}/>
          </div>
          <div style={{flex:'5',display:'flex',flexDirection:'column',justifyContent:'flex-start',marginTop:'1rem'}}>
            <div className="upper_part" style={{display:'flex',alignItems:'center',marginBottom:'3vh',justifyContent:'space-between'}}>
               
               <div className="blogTitle">{b.title}</div>

               <div className="blogAuthor" ><span style={{color:'white',fontFamily:'monospace'}}>By: </span><span style={{color:'#F5E8C7',fontFamily:'monospace'}}>{b.author.name}</span></div>

            </div>
            <p className="desc">{b.desc}</p>
          </div>
        </div>)):(
          <div>
            <CircularProgress />
          </div>
        )
      }

      <Stack spacing={2} sx={{alignSelf:'center'}}>
        <Pagination
          count={Math.ceil(blogs.length / blogsPerPage)}
          page={currentPage}
          onChange={handleChange}
          siblingCount={isMobile?0:1}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default Home;
