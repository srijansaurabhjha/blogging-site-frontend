import React, { useContext, useState } from 'react'
import './Edit.css';
import AppContext from '../../AppContext';
import { Button, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Edit = () => {

  const {selectedBlog,setSelectedBlog,loggedIn}=useContext(AppContext);
  const [title,setTitle]=useState(selectedBlog.title);
  const [desc,setDesc]=useState(selectedBlog.desc);
  const [file,setFile]=useState(selectedBlog.file);
  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();

  const handlePic=async(pic)=>{
     setLoading(true);
     if(pic===undefined){
        setLoading(false);
        return;
     }

     if(pic.type==="image/jpeg"||pic.type==="image/png"||pic.type==="image/jpg"){
        const data=new FormData();
        data.append("file",pic);
        data.append("upload_preset","blogging-site");
        data.append("cloud_name","dz0fxifsz");

        await fetch("https://api.cloudinary.com/v1_1/dz0fxifsz/image/upload",{
            method:'post',
            body:data
        }).then((res)=>res.json())
        .then((data)=>{
            if(data.url){
                setFile(data.url);
                setLoading(false);
            }else{
                setFile("");
                setLoading(false);
            }
        })
        .catch((err)=>{
            console.log(err.message);
            setFile("");
            setLoading(false);
        })
     }else{
        setFile("");
        setLoading(false);
        return;
     }
  }

  const handleSubmit=async()=>{
    try{
        if(!title||!desc){
            setTitle("");
            setDesc("");
            setFile(null);
            return;
        }

        const res=await axios.put("https://bloggingsitebackend.onrender.com/api/blogs/edit",{
            author:loggedIn._id,title,desc,file,blogId:selectedBlog._id
        });

        setTitle("");
        setDesc("");
        setFile(null);

        setSelectedBlog(res.data);
        navigate("/blog");
    }catch(err){
        console.log(err.message);
    }
  }

  return (
    <div className='edit_container' >
      <TextField value={title} onChange={(e)=>setTitle(e.target.value)} sx={{alignSelf:'center',width:"80%",margin:"1rem 0"}}/>
      {file&&<img src={file} style={{height:"20rem",alignSelf:'center'}}/>}
      <label for='file-input'  style={{textAlign:"center",alignSelf:'center',cursor:'pointer',marginTop:'1rem'}}>
         <AddCircleOutlineIcon sx={{fontSize:'3rem',color:'#363062'}}/>
      </label>
      <input id='file-input' type='file' onChange={(e)=>handlePic(e.target.files[0])} style={{display:'none'}}/>
      <TextField multiline  value={desc} onChange={(e)=>setDesc(e.target.value)} sx={{width:'80%',alignSelf:'center',margin:"1rem 0"}}/>

      <Button variant='contained' onClick={handleSubmit} sx={{width:'10%',alignSelf:'center',marginBottom:'1rem'}} disabled={loading}>Submit</Button>
    </div>
  )
}

export default Edit
