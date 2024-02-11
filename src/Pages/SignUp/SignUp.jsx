import React, { useState } from 'react'
import './SignUp.css'
import TextField from '@mui/material/TextField';
import { Box, Button} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SignUp = () => {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [pic,setPic]=useState("");

  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  

  const postPic=async(pics)=>{
    // console.log(pics);
    setLoading(true);
    if(pics===undefined){
      setLoading(false);
      return;
    }

    if(pics.type==="image/jpeg"||pics.type==="image/png"||pics.type==="image/jpg"){
      const data=new FormData();
      data.append("file",pics);
      data.append("upload_preset","blogging-site");
      data.append("cloud_name","dz0fxifsz");

      await fetch("https://api.cloudinary.com/v1_1/dz0fxifsz/image/upload",{
        method:'post',
        body:data,
      }).then((res)=>res.json())
      .then((data)=>{
        if(data.url){
            setPic(data.url);
            setLoading(false);
          }else{
            setPic("");
            setLoading(false);
          }
      })
      .catch((err)=>{
        console.log("Try block error "+err.message);
        setPic("");
        setLoading(false);
      })

    }else{
      setPic("");
      setLoading(false);
      return;
    }
  }

  const validateGmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@mail\.com$/;
    return regex.test(email);
  };

  const handleSubmit=async()=>{
    try{
      if(name===""||email===""||password===""){
        setName("");
        setEmail("");
        setPassword("");
        setPic("");
        return;
      }

      if(!validateGmail(email)&&!validateEmail(email)){
        alert("Enter a valid mail Address")
        setName("");
        setEmail("");
        setPassword("");
        setPic("");
        return;
      }

      const res=await axios.post("https://bloggingsitebackend.onrender.com/api/users/signup",{
         name,email,password,pic 
      });

      // console.log(res.data);
      if(res&&res.data)localStorage.setItem("userInfo",JSON.stringify(res.data));

      setName("");
      setEmail("");
      setPassword("");
      setPic("");

      //redirecting to home page
      navigate("/");
    }catch(err){
      console.log(err.message);
      setName("");
      setEmail("");
      setPassword("");
      setPic("");
    }
  }

  return (
    <Box sx={{display:'flex',height:'calc(100vh - 6vh - 12vh)',justifyContent:'center',alignItems:'center'}}>
    <Box sx={{display:'flex',flexDirection:'column',width:'30%',textAlign:'center',padding:'3rem',backdropFilter:'blur(10px)',boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',borderRadius:'4rem',alignItems:'center','@media(max-width:900px)':{width:'50%'},'@media(max-width:600px)':{width:'70%'},'@media(max-width:450px)':{width:'50%'}}}>
      <TextField label='Name' variant='standard' sx={{marginBottom:'2rem',width:'100%'}} onChange={(e)=>setName(e.target.value)} value={name}/>
      <TextField label='Email' variant='standard' sx={{marginBottom:'2rem',width:'100%'}} onChange={(e)=>setEmail(e.target.value)} value={email}/>
      <TextField label='Password' variant='standard' sx={{marginBottom:'2rem',width:'100%'}} onChange={(e)=>setPassword(e.target.value)} value={password}/>
      <TextField type='file' variant='outlined' inputProps={{accept:'image/*'}} sx={{textAlign:'center',marginBottom:'2rem',width:'100%'}} onChange={(e)=>postPic(e.target.files[0])}/>
      <Button variant='contained' sx={{width:'50%'}} onClick={handleSubmit} disabled={loading}>Submit</Button>
    </Box>
    </Box>
  )
}

export default SignUp
