import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    password: '',
    errorMsg: '',
  }

  validUser = cookie => {
    Cookies.set('jwt_token', cookie, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
  }

  onClickUserId = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  onClickPass = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, password} = this.state

    if (userId === '') {
      this.setState({
        errorMsg: 'Invalid User ID',
      })
    }

    if (userId !== '' && password === '') {
      this.setState({
        errorMsg: 'Invalid PIN',
      })
    }

    if (userId !== '' && password !== '') {
      const userObj = {user_id: userId, pin: password}
      const apiUrl = 'https://apis.ccbp.in/ebank/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(userObj),
      }

      const response = await fetch(apiUrl, options)
      const data = await response.json()

      if (response.ok) {
        this.validUser(data.jwt_token)
      } else {
        this.setState({
          errorMsg: data.error_msg,
        })
      }
    }
  }

  renderInputForm = () => {
    const {userId, password, errorMsg} = this.state

    return (
      <form onSubmit={this.onSubmitForm} className="form">
        <h1 className="form-heading"> Welcome Back </h1>
        <label htmlFor="userId" className="user-name">
          {' '}
          User ID{' '}
        </label>
        <input
          type="text"
          id="userId"
          value={userId}
          className="user-input"
          placeholder="Enter User ID"
          onChange={this.onClickUserId}
        />

        <label htmlFor="userPin" className="user-name">
          PIN
        </label>
        <input
          type="password"
          id="userPin"
          value={password}
          className="user-input"
          placeholder="Enter PIN"
          onChange={this.onClickPass}
        />
        <button type="submit" className="submit">
          {' '}
          Login{' '}
        </button>
        <p className="errorMsg"> {errorMsg} </p>
      </form>
    )
  }

  render() {
    const webLogo =
      'https://assets.ccbp.in/frontend/react-js/ebank-login-img.png'

    const jwtToken = Cookies.get('jwt_token')

    return jwtToken !== undefined ? (
      <Redirect to="/" />
    ) : (
      <div className="login-container">
        <div className="inner-container">
          <img src={webLogo} alt="website login" className="web-logo" />
          {this.renderInputForm()}
        </div>
      </div>
    )
  }
}

export default Login
