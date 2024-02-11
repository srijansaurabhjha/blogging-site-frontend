import React, { useContext, useState } from 'react'
import './EditProfile.css';
import { Button, TextField } from '@mui/material';
import AppContext from '../../AppContext';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {

  const {loggedIn, setLoggedIn}=useContext(AppContext);
  const [name,setName]=useState(loggedIn.name);
  const [email,setEmail]=useState(loggedIn.email);
  const [password,setPassword]=useState(loggedIn.password);
  const [pic,setPic]=useState(loggedIn.pic);

  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();

  const handleSubmit=async()=>{
     try{
        if(!name||!email||!password){
            setName("");
            setEmail("");
            setPassword("");
            setPic(null);
            navigate("/profile")
            return;
        }

        const res=await axios.put("https://bloggingsitebackend.onrender.com/api/users/editProfile",{
            userId:loggedIn._id,name,email,password,pic
        })

        setName("");
        setEmail("");
        setPassword("");
        setPic(null);
        
        setLoggedIn(res.data);        

        localStorage.setItem("userInfo", JSON.stringify(res.data)); // Save back to localStorage
        navigate("/profile")
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
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            if(data.url){
                setPic(data.url);
                setLoading(false);
            }else{
                setPic("");
                setLoading(false);
            }
        })
        .catch((err)=>{
            console.log(err.message);
            setPic("");
            setLoading(false);
        })
     }else{
        setPic("");
        setLoading(false);
        return;
     }

  }

  return (
    <div className='editProfile_container'>
        {pic&&<img className='editProfile_img' src={pic} />}
        <label for="file-input" style={{alignSelf:'center',cursor:'pointer',marginTop:'1rem'}}>
          <AddCircleOutlineIcon sx={{fontSize:'3rem',color:'#363062'}}/>
        </label>
        <input id="file-input" type='file' style={{display:"none"}} onChange={(e)=>handlePic(e.target.files[0])}/>
        <TextField value={name} sx={{width:'40%',alignSelf:'center',marginBottom:"1rem",'@media(max-width:850px)':{width:'60%'},'@media(max-width:600px)':{width:'70%'},'@media(max-width:350px)':{width:'80%'}}} label="name" onChange={(e)=>setName(e.target.value)}/>
        <TextField value={email} sx={{width:'40%',alignSelf:'center',marginBottom:"1rem",'@media(max-width:850px)':{width:'60%'},'@media(max-width:600px)':{width:'70%'},'@media(max-width:350px)':{width:'80%'}}} label="email" onChange={(e)=>setEmail(e.target.value)}/>
        <TextField type='text' value={password} sx={{width:'40%',alignSelf:'center',marginBottom:"1rem",'@media(max-width:850px)':{width:'60%'},'@media(max-width:600px)':{width:'70%'},'@media(max-width:350px)':{width:'80%'}}} label="password" onChange={(e)=>setPassword(e.target.value)}/>
        <Button sx={{width:"8%",alignSelf:'center',marginBottom:"1rem"}} variant="contained" onClick={handleSubmit} disabled={loading}>Submit</Button>
    </div>
  )
}

export default EditProfile
