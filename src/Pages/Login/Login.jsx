import React, {useState } from 'react'
import './Login.css'
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {


  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate=useNavigate();

  const handleSubmit=async()=>{
    try{
      if(email===""||password===""){
        setEmail("");
        setPassword("");
        return;
      }
      

      const res=await axios.post("https://bloggingsitebackend.onrender.com/api/users/login",{
        email,password
      })

      if(res&&res.data)localStorage.setItem("userInfo",JSON.stringify(res.data));

      setEmail("");
      setPassword("");

      //redirecting to home page
      navigate("/");
    }catch(err){
      setEmail("");
      setPassword("");
      console.log(err.message);
    }
  }

  return (
    <Box sx={{display:'flex',height:'calc(100vh - 6vh - 12vh)',justifyContent:'center',alignItems:'center'}}>
    <Box sx={{display:'flex',flexDirection:'column',width:'30%',textAlign:'center',padding:'3rem',backdropFilter:'blur(10px)',boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',borderRadius:'4rem',alignItems:'center','@media(max-width:900px)':{width:'50%'},'@media(max-width:600px)':{width:'70%'},'@media(max-width:450px)':{width:'50%'}}}>
      <TextField label='Email' variant='standard' sx={{marginBottom:'2rem',width:'100%'}} onChange={(e)=>setEmail(e.target.value)} value={email}/>
      <TextField label='Password' variant='standard' sx={{marginBottom:'2rem',width:'100%'}} onChange={(e)=>setPassword(e.target.value)} value={password}/>
      <Button variant='contained' sx={{width:'50%'}} onClick={handleSubmit}>Submit</Button>
    </Box>
    </Box>
  )
}

export default Login
