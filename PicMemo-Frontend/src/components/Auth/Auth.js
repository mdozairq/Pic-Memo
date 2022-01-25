import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import Input from './Input'
import Icon from './icon'
import {signin, signup} from '../../actions/auth';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    confirmPassword: '',

}


const Auth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setformData] = useState(initialState)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup){
            dispatch(signup(formData, history))
        } else{
            dispatch(signin(formData, history))
        }

        console.log(formData);
    }

    const handleChange = (e) => {
        setformData({...formData, [e.target.name]: e.target.value})
     }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setformData(initialState);
        setIsSignup((prevMode) => !prevMode)
        console.log(isSignup);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId
          
        try {
            dispatch({type: 'AUTH', data:{result, token}})
            history.push('/')
        } catch (error) {
            console.log('error');
        }
    }
    const googleFailure = () => {
        console.log("Google Sign In Failed, Try Later");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && (
                            <>
                                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            </>
                        )}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId="327492013177-090ggugf488oq1q9pqhk34hr1llhajj6.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} variant="contained" color="Secondary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}>Sign In With GOOGLE</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cooliePolicy="single_host_origin"
                    />
                </form>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode} variant="text">
                            {isSignup ? "Already have an Account? Sign in" : "Don't have an Account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Auth
