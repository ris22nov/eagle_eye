import { useState,useRef,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import useAuth from '../../hooks/useAuth';
import { useNavigate,useLocation } from 'react-router-dom';
import {auth} from '../../api/axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputAdornment,IconButton } from '@mui/material';
import { OutlinedInput,FormControl,InputLabel } from '@mui/material';

const LOGIN_URL = '/login';

export const Login = () => {
  const { setAuth,persist,setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const togglePersist = () => {
    setPersist(prev => !prev);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    try{
      const response = await auth.post(LOGIN_URL,
        JSON.stringify({ "username":username, "password":password }));
      const accessToken = response?.data?.accessToken;
      const profile = response?.data?.profile;
      setAuth({profile,accessToken});
      setUsername('');
      setPassword('');
      navigate(from, {replace: true});
    }
    catch(err){
        if (!err?.response) {
          setError('No Server Response');
        } else if (err.response?.status === 400) {
          setError('Missing Username or Password');
        } else if (err.response?.status === 401) {
          setError('Invalid Staff No or Password');
        } else {
          setError('Login Failed');
        }
        setUsername('');
        setPassword('');
    }
  }

  useEffect(() => {
    localStorage.setItem("persist",JSON.stringify(persist));
  } ,[persist]);
  
  return (
    <>
    <Grid item xs={12} sm={12} md={12}>
      <Box
        sx={{
          mx: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          WELCOME TO CTS DASHBOARD
        </Typography>

        <Box component="form" validate sx={{ mt: 1 }}>

          {/* STAFF NO INPUT */}
            <FormControl sx={{ mt:1 , width: '100%' }} variant="outlined">
              <InputLabel htmlFor="staffno">Staff No</InputLabel>
              <OutlinedInput
                margin="normal"
                required
                fullWidth
                id="staffno"
                label="Staff No"
                name="staffno"
                autoFocus
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>

            {/* PASSWORD INPUT */}
            <FormControl sx={{ mt:5 , width: '100%' }} variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value= {password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {/* PERSIST CHECKBOX */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%'
            }}>
            <FormControl sx={{ mt:2 , width: '100%' }}>
              <FormControlLabel
                control={<Switch id = "persist" onChange={togglePersist} checked={persist}/>}
                label="Trust This Device"
              />
            </FormControl>
            
            {/* ERROR MESSAGE */}
            <Typography sx={{mt:3,width:'100%'}} component="p" variant="body2" color="error" ref={errRef}>{error}</Typography>
            </Box>

            {/* LOGIN BUTTON */}
            <Button
              sx={{ mt:2 , width: '100%' }}
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleClick}>
              Login
            </Button>
        </Box>
      </Box>
    </Grid>
    </>
  )
}