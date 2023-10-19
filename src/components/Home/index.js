import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const webLogo = 'https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png'
  const digitalCard =
    'https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png'

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <div className="header-container">
        <img src={webLogo} alt="website logo" className="webLogo" />
        <button onClick={onClickLogout} type="button" className="logout">
          {' '}
          Logout{' '}
        </button>
      </div>

      <div className="home-inner-container">
        <h1 className="home-heading"> Your Flexibility, Our Excellence </h1>
        <img src={digitalCard} alt="digital card" className="digital-card" />
      </div>
    </div>
  )
}

export default Home
