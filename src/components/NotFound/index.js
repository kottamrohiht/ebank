import './index.css'

const NotFound = () => {
  const nfImg =
    'https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png'

  return (
    <div className="not-found-container">
      <img src={nfImg} alt="not found" className="not-found" />
      <h1 className="nf-heading"> Page Not Found </h1>
      <p className="nf-para">
        {' '}
        We are sorry, the page you requested could not be found{' '}
      </p>
    </div>
  )
}

export default NotFound
