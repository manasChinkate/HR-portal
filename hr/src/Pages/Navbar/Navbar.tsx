import { TiThMenu } from 'react-icons/ti';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';





// interface param  {
//   setShowMenu: String[];
//   showMenu: Boolean;
// }

const Navbar = ({ setShowMenu, showMenu }) => {

  const navigate = useNavigate()

  const sidebartoggle = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className='  h-[9vh] flex items-center justify-between px-5 '>
      <div className=' flex gap-4 items-center'>
        <TiThMenu
          className=' text-2xl cursor-pointer'
          onClick={sidebartoggle} />

          {
            showMenu ?<></> :
         

        <img className=' h-7' src={logo} alt="logo" /> }
      </div>

      <div>
        <h1>
          Hello, Welcome back (user)
        </h1>
      </div>

      <button className=' p-1 px-3 bg-[#2E6D6A] rounded-lg text-white ' onClick={()=>navigate('/login')}>
        Logout
      </button>


    </div>
  )
}

export default Navbar