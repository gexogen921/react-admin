import React, { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
// import {addTodo} from "../../actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const MyLoginPage = ({ dispatch }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
    const submit = (e) => {
        e.preventDefault();
        login({ email, password })
            .catch(() => notify('Invalid creds or you are not admin'));
    };
    const classes = useStyles();

    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
              {/*<button onClick={() => dispatch(addTodo('test'))}>TEST</button>*/}

              <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={submit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="email"
                  autoFocus
                  name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="current-password"
                  name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onSubmit={submit}
                  className={classes.submit}
                >
                  Sign In
                </Button>
                </form>
              </div>
          <Notification />
    </Container>
    );
};

export default connect()(MyLoginPage);
