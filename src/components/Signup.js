import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Avatar, Paper, boxClasses } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import bg from './bg.jpg';

const Signup = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3002/signup", { name, email, password })
        .then((res) => {
          alert('Signup Successful!');
          navigate('/'); // Redirect to login page after signup
        })
        .catch((error) => {
          console.error(error);
          alert('Signup Failed!');
        });
    } catch (error) {
      console.error(error);
      alert('An error occurred during signup.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3002/login", { email, password })
        .then((res) => {
          if (res?.data?.success) {
            localStorage.setItem('username', res?.data?.user?.name);
            navigate('/home', { state: { id: email } }); 
            alert(res?.data?.message);
            // Redirect to dashboard if login is successful
          } else if (res.data === "notexist") {
            alert('User not signed up. Please sign up first.');
          }
        })
        .catch((error) => {
          alert('Incorrect login details.');
          console.error(error);
        });
    } catch (error) {
      console.error(error);
      alert('An error occurred during login.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover', // Ensures the image covers the whole area
        backgroundPosition: 'center',
      }} 
      >
      <img src="/logo.png" // Path to your logo image
        alt="Tradwise Logo"
        style={{
          position: 'absolute',
          top: '20px', // Adjust as needed
          left: '20px', // Adjust as needed
          width: '200px', // Adjust size
          height: 'auto',
        }} />
   
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: 400 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar sx={{ backgroundColor: '#1976d2', width: 56, height: 56 }}>
            {action === "Login" ? <PersonIcon /> : <LockIcon />}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            {action === "Login" ? "Login" : "Sign Up"}
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={action === "Login" ? handleLogin : handleSignup}
          mt={2}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          {action === "Sign Up" && (
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: <PersonIcon color="action" sx={{ marginRight: 1 }} />,
              }}
            />
          )}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <EmailIcon color="action" sx={{ marginRight: 1 }} />,
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: <LockIcon color="action" sx={{ marginRight: 1 }} />,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            {action === "Login" ? "Login" : "Sign Up"}
          </Button>
        </Box>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography variant="body2">
            {action === "Login" ? "Don't have an account?" : "Already have an account?"}{' '}
            <Link to="#" onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}>
              {action === "Login" ? "Sign Up" : "Login"}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;



//  import React, { useState } from 'react';
//  import './Signup.css'
// import axios from 'axios'
// import { useNavigate , Link} from 'react-router-dom'

// import user_icon from './Assets/person.png'
// import email_icon from'./Assets/email.png'
// import password_icon from './Assets/password.png'

// function Signup() {

//     const[action,setAction] = useState("Login");
//     const [name, setName] = useState(' ')

//     const [email, setEmail] = useState(' ')
//     const [password, setPassword] = useState('')

//     async function submit(e){
//         e.preventDefault();
//         try{
//             await axios.post("http://localhost:3002/Signup" ,
//             {name, email, password}
//         )}
//         catch(e){
//             console.log(e);

//         }
//     }
//     return (
    
//         <div className='container'>
//             <form actions='POST'>
        
//             <div className='header'>
//                 <div className='text'>{action}</div>
//                 <div className='underline'></div>
//             </div>
           
            
//             <div className='inputs'>
//                 <div className='input'>
//                     <img src={user_icon} alt='' />
//                     <input type = "text" onChange={(e)=>{setName(e.target.value)}} placeholder='Name' name ='name' id='' ></input>
//                 </div>

//                 <div className='input'>
//                     <img src={email_icon} alt='' />
//                     <input type = "email" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' name ='email' id='' ></input>
//                 </div>

//                 <div className='input'>
//                     <img src={password_icon} alt='' />
//                     <input type = "password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Passward' name ='password' id='' ></input>
//                 </div>

//                 <div className='submit-container'>
//                 <div className={action==="Login"?"submit gray":"submit"}  onClick={()=>{setAction("SignUp")}}>Sign Up</div>  
//                 <div className={action==="Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("login")}}>Login</div>
//                 </div>   

//             </div>
//         </form>
//         <link to ='/LoginPage'></link>
//         </div>
//     )

// }

// export default Signup;


/*import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Login() {
    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:3002/login",{
                email,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                    history("/home",{state:{id:email}})
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="login">

            <h1>Signup</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="./Login.js">Login Page</Link>

        </div>
    )
}

export default Login;

*/