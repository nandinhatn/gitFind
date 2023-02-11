import './styles.css';
import logogit from '../../assets/logo.png';
const Header =() => {
  return (
    <header>
      <h1> <img src={logogit} className="logogit" alt='logo'/></h1>
      
    </header>
  )
}
export {Header}
