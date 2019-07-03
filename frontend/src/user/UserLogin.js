// Imports
import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {postLogin} from "./UserActions";
import withStyles from "@material-ui/core/styles/withStyles";
import * as PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import Loading from "../app/Loading"
import {withSnackbar} from "notistack";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import {fetchCategories} from "../category/CategoryActions";


const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
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
});

class UserLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            isLoading: false
        }
    }

    onSubmit(event) {
        event.preventDefault()

        let input = {}
        input.username = this.state.username
        input.password = this.state.password

        if (input.username !== '' && input.password !== '') {
            this.setState({isLoading: true})

            this.props.postLogin(input).then((response) => {
                this.setState({isLoading: false})
                if (response.success) {
                    this.props.enqueueSnackbar('Login successful, redirecting...', {
                        variant: 'success',
                        autoHideDuration: 1500
                    });

                    this.props.fetchCategories();
                    // Redirect
                    setTimeout(() => {
                        this.props.history.push("/");
                    }, 1000)
                } else {
                    this.props.enqueueSnackbar(response.errors[0].message, {variant: 'error'});
                }
            })
        } else {
            this.props.enqueueSnackbar('Please enter your username and password.', {variant: 'warning'});
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.onSubmit.bind(this)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Email Address"
                            name="username"
                            autoComplete="email"
                            autoFocus
                            onChange={this.onChange.bind(this)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.onChange.bind(this)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/user/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>


                {this.state.isLoading ? <Loading/> : ''}
            </Container>
        );
    }
}


UserLogin.propTypes = {
    postLogin: PropTypes.func.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired
}


export default connect(null, {postLogin, fetchCategories})(withStyles(styles)(withSnackbar(UserLogin)))
