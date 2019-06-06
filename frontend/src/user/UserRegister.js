// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// UI Imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

// App Imports
import { postRegister } from './UserActions'


class UserRegister extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: '',
      isLoading: false,
      isLoggingIn: false,
      notification: false,
      registered: false
    }
  }

  onSubmit (event) {
    event.preventDefault()

    console.log('E - submit #form-card')

    let input = {}
    input.username = this.state.username
    input.password = this.state.password

    if (input.username !== '' && input.password !== '') {
      this.setState({isLoggingIn: true, isLoading: true})

      this.props.postRegister(input).then((response) => {
        if (response.success) {
          this.setState({
            isLoading: false,
            isLoggingIn: false,
            notification: true,
            username: '',
            password: '',
            error: ''
          })

          // Redirect
          setTimeout(() => {
            this.setState({registered: true})
          }, 1000)
        } else {
          this.setState({
            isLoading: false,
            isLoggingIn: false,
            error: response.errors[0].message,
            notification: false
          })
        }
      })
    } else {
      this.setState({
        error: 'Please enter your username and password.',
        notification: false
      })
    }
  }

  onChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <section>
        <h2>Register</h2>

        <br/>

        {this.state.error ? <Card><CardContent >{this.state.error}</CardContent></Card> : ''}

        {this.state.message ? <Card><CardContent >{this.state.message}</CardContent></Card> : ''}

        <form id="form-card" onSubmit={this.onSubmit.bind(this)}>
          <TextField
            name="username"
            value={this.state.username}
            onChange={this.onChange.bind(this)}
            floatingLabelText="Username"
            fullWidth={true}
          />

          <TextField
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange.bind(this)}
            floatingLabelText="Password"
            fullWidth={true}
          />

          <br/>
          <br/>

          <Button label="Submit" type="submit"  />

          <Link to="/user/login"><Button label="Login"/></Link>
        </form>

        <Snackbar
          open={this.state.isLoggingIn}
          message="Logging in..."
          autoHideDuration={1000}
        />

        <Snackbar
          open={this.state.notification}
          message="Registered successfully."
          autoHideDuration={4000}
        />

        {this.state.registered ? <Redirect to="/user/login"/> : ''}
      </section>
    )
  }
}

UserRegister.propTypes = {
  postRegister: PropTypes.func.isRequired
}

export default connect(null, {postRegister})(UserRegister)
