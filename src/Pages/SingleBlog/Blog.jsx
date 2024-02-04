import React, { useContext } from 'react'
import './Blog.css';
import AppContext from '../../AppContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
  
  const {selectedBlog,loggedIn}=useContext(AppContext);
  const navigate=useNavigate();

  const handleEdit=()=>{
     navigate("/edit");
  }

  const handleDelete=async()=>{
    try{
       const res=await axios.delete(`https://bloggingsitebackend.onrender.com/api/blogs/delete/${selectedBlog._id}`);
       navigate("/");
    }catch(err){
      console.log(err.message)
    }
  }

  return (
    <div className='Blog_container'>
     <div style={{alignSelf:'center',fontSize:'2rem',fontWeight:'bold'}}>{selectedBlog.title}</div>
     <div style={{display:'flex',justifyContent:'flex-end'}}>
        <div style={{fontSize:'1rem'}}><span>By: </span><span style={{fontStyle:'italic',fontWeight:'bold'}}>{selectedBlog.author.name}</span></div>
        {(loggedIn&&loggedIn._id===selectedBlog.author._id)&&
          <>
          <EditIcon sx={{marginLeft:'2rem',marginRight:'1rem',cursor:'pointer'}} onClick={handleEdit}/>
          <DeleteIcon sx={{cursor:'pointer'}} onClick={handleDelete}/>
          </>
        }
     </div>
     {selectedBlog.file&&<img src={selectedBlog.file} style={{height:'20rem',alignSelf:'center',borderRadius:'2rem',marginTop:'2rem',marginBottom:'2rem'}}/>}
     <pre className='content'>{selectedBlog.desc}</pre>
    </div>
  )
}

export default Blog
