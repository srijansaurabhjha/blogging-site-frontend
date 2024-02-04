import React, { useContext, useState } from 'react'
import './Write.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TextField ,Button} from '@mui/material';
import AppContext from '../../AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Write = () => {

  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [file,setFile]=useState(null);
  const [loading,setLoading]=useState(false);
  const {loggedIn}=useContext(AppContext);
  const navigate=useNavigate();

  const handleSubmit=async()=>{
     try{
       if(!title||!desc){
         setTitle("");
         setDesc("");
         setFile(null);
         return;
       }
      
       const res=await axios.post("https://bloggingsitebackend.onrender.com/api/blogs/add",{
         author:loggedIn._id,title,desc,file
       });


      setTitle("");
      setDesc("");
      setFile(null);


      navigate("/");
     }catch(err){
      console.log(err.message);
     }
  }

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

  return (
    <div style={{minHeight:'calc(100vh - 6vh - 12vh)',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div className='content_div1'>
        {file?<img src={file} alt='#' style={{width:'30vw',borderRadius:'1rem',height:'30vw',objectFit:'cover'}}/>:(
          <>
         <label for='file-input' style={{textAlign:"center",alignSelf:'center',cursor:'pointer'}}>
           <AddCircleOutlineIcon sx={{fontSize:'3rem',color:'#363062'}}/>
         </label>
          <input id='file-input' type="file" onChange={(e)=>handlePic(e.target.files[0])} style={{display:'none'}}/>
          <span style={{marginLeft:'1rem',fontFamily:'cursive',fontSize:'1.5rem'}}>Add Image</span>
          </>
          )
        }
      </div>
      <div className='content_div2'>
          <input type="text" placeholder="Enter Title..." className="writeInput" autoFocus={true} onChange={(e)=>{
              setTitle(e.target.value)
          }}/>
        <TextField placeholder='Write your Blog...' multiline onChange={(e)=>{setDesc(e.target.value)}} sx={{width:'70%',"& fieldset": { border: 'none' },fontSize:'1.5rem'}}/>
      </div>
      <Button variant='contained' sx={{marginTop:'1rem'}} onClick={handleSubmit} disabled={loading}>Submit</Button>
    </div>
  )
}

export default Write
