// import { useState } from "react"
import { useState } from "react";
import "./Home.css"
import {Switch} from "@mui/material";
import { FormLabel, Grid2,Button, Paper, TextField, Typography, grid2Classes, paperClasses, Stack, FormControl, FormControlLabel} from "@mui/material";
import { useNavigate } from 'react-router-dom';


function Home() {
  // const[username,setusername]=useState("")
  // const[password,setpassword]=useState("")
  const [checked , setchecked]=useState("false")
  // const navigate= useNavigate()

  const handletoggle=(event)=>{
    setchecked(event.target.checked)
  }


 
  // const correctusername= "admin";
  // const correctpassword="123456"
//   const handlesignin=()=>{
//     if(username===correctusername && password===correctpassword){
//       alert("login succesfull")
//       navigate("/dashboard")
      
      


//   }
//   else{
//     console.log("missing credentials")
   

//   }
// }
  return (
    <Grid2 container
    sx={{height:"100vh", width:"80rem",
      backgroundColor:"#2e7d32",
      display:"flex",
      flexDirection:"column"
    }}>
      <Stack sx={{bgcolor:"#1976d2", height:"22rem"}} component={Paper}>

        
      </Stack>
      <Stack sx={{bgcolor:"white", height:"31.6rem", width :"28rem",position:"absolute", top:"12%", left:"32%", borderRadius:"0"}} component={Paper}>
        <Typography sx={{margin:"1.7rem 0 0 2.7rem"}} variant="h5">Sign in</Typography>
        <FormLabel sx={{fontSize:".8rem", margin:".1rem 0 0 3rem"}}>please enter your login credentials</FormLabel>
        <Typography sx={{margin:"2rem 0 0 2.7rem"}} variant="body2">Username</Typography>
        <TextField sx={{ borderRadius:"0",width:"22rem", margin:".6rem 0 0 2.7rem" ,'& .MuiInputBase-input':{height:".8rem" }}} variant="outlined"></TextField>
        <Typography sx={{margin:"2rem 0 0 2.7rem"}} variant="body2">Password</Typography>
        <TextField sx={{ width:"22rem", margin:".6rem 0 0 2.7rem" ,'& .MuiInputBase-input':{height:".8rem" }}}></TextField>
        <FormControlLabel
        sx={{margin:"1.2rem 0 0 2.7rem"}}
        control={ 
          <Switch 
          checked={checked}
          onChange={handletoggle}
          color="primary"/>
        }
        label={
          <Typography sx={{fontSize:".9rem"}} variant="body1">Remember me</Typography>
        }
        />
        <Button sx={{bgcolor:"primary", height:"3.4rem", width:"22rem", margin:"1.4rem 0 0 3rem", borderRadius:"0"}} variant="contained">
          Sign in

        </Button>
        

      </Stack>
      <Stack sx={{bgcolor:"white",height:"17.5rem"}}></Stack>
      
       


    </Grid2>
  
  )
}

export default Home
