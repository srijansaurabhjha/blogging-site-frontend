import React, { useContext } from 'react'
import './Profile.css';
import AppContext from '../../AppContext';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const {loggedIn}=useContext(AppContext);
  const navigate=useNavigate();

  const handleClick=()=>{
    navigate("/editProfile")
  }

  return (
    <div style={{height:'calc(100vh - 6vh - 12vh)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Tooltip title="Edit">
        <Button sx={{position:'absolute',top:'9rem',right:'20rem',borderRadius:'20%',fontSize:'1rem'}} variant='contained' onClick={handleClick}>
           <EditIcon />
        </Button>
      </Tooltip>
      <div style={{backdropFilter:'blur(10px)',overflow:'hidden',display:'flex',flexDirection:'column'}}>
        <img src={loggedIn?.pic} alt='#' style={{height:'50vh',overflow:'hidden',alignSelf:'center',marginBottom:'1rem',borderRadius:'1rem'}}/>
        <div style={{fontSize:'1.5rem',fontFamily:'monospace',backgroundColor:'#FFEBD8',display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}}>{loggedIn?.name}</div>
        <div style={{fontSize:'1.5rem',fontFamily:'monospace',backgroundColor:'#FFC5C5',display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}}>{loggedIn?.email}</div>
      </div>
    </div>
  )
}

export default Profile
