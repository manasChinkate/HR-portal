import { TiThMenu } from 'react-icons/ti';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { cleanUp } from '../../../app/authslice';





// interface param  {
//   setShowMenu: String[];
//   showMenu: Boolean;
// }

const Navbar = ({ setShowMenu, showMenu }) => {

  const name = useSelector((state: RootState) => state.auth.name)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const sidebartoggle = () => {
    setShowMenu(!showMenu)
  }

  const handleLogout = () =>{
    localStorage.removeItem('token');
    dispatch(cleanUp())
    navigate('/login')
  }

  return (
    <div className='  h-[9vh] flex items-center justify-between px-5 '>
      <div className=' flex gap-4 items-center'>
        <TiThMenu
          className=' text-2xl cursor-pointer'
          onClick={sidebartoggle} />

          {
            showMenu ?<></> :
         

        <img className=' h-7 hidden md:visible ' src={logo} alt="logo" /> }
      </div>

      <div>
        <h1 className='text-sm sm:text-base'>
          Hello, Welcome back, {name}
        </h1>
      </div>

      <button className=' p-1 sm:px-3 px-1 bg-[#2E6D6A] rounded-lg text-white ' onClick={handleLogout}>
        Logout
      </button>


    </div>
  )
}

export default Navbar