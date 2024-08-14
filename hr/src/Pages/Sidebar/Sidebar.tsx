import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp, FaBuilding } from 'react-icons/fa';
import { GrDomain } from 'react-icons/gr';
import { IoMdExit } from 'react-icons/io';
import { IoHome } from 'react-icons/io5';
import { RiProjectorLine } from 'react-icons/ri';
import { SiHelpdesk } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { cleanUp } from '../../../app/authslice';
import { RootState } from '../../../app/store';

const iconMapping: Record<string, JSX.Element> = {
  'IoHome': <IoHome />,
  'FaBuilding': <FaBuilding />,
  'GrDomain': <GrDomain />,
  'RiProjectorLine': <RiProjectorLine />,
  'SiHelpdesk': <SiHelpdesk />,
  'IoMdExit': <IoMdExit />
};


const Sidebar = () => {
  const [activeParent, setActiveParent] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sidebar = useSelector((state: RootState) => state.auth.sidebar)
  const Role = useSelector((state: RootState) => state.auth.authority)
  console.log(sidebar)

  const handleParentClick = (index, link, hasChildren) => {
    if (hasChildren) {
      setActiveParent(activeParent === index ? null : index);
    } else {
      navigate(link);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(cleanUp())
    navigate('/login')
  }

  return (
    <div className='w-full h-full bg-[#ffffff] text-sm py-2 flex flex-col justify-between'>
      <div>
        <div className=' w-full flex items-center justify-center mb-4 '>
          <img className='h-7' src={logo} alt="logo" />
        </div>
        <p className='px-4 pb-2'>Menu</p>

        {(
          Role ==='masterAdmin' ? MasterAdminNavData :
          Role ==='Admin' ? AdminNavData : []
        ).map((data, index)=>(
          <div key={index}>
            <div
              className='mx-2 shadow-inner py-3 hover:bg-[#2E6D6A] hover:text-white ease-out duration-200 bg-[#e0e1e6] rounded mb-1 flex items-center gap-4 px-4 cursor-pointer'
              onClick={() => handleParentClick(index, data.link, !!data.children)}
            >
              {data.icon} {data.name}
              {data.children && (
                <div className='ml-auto'>
                  {activeParent === index ? <FaAngleUp /> : <FaAngleDown />}
                </div>
              )}
            </div>
            {data.children && activeParent === index && (
              <div>
                {data.children.map((child, childIndex) => (
                  <Link to={child.link} key={childIndex} className='no-underline'>
                    <div
                      className='mx-2 shadow-inner py-3 bg-[#e5e7ec] hover:bg-[#e0e1e6] rounded mb-1 flex items-center gap-4 pl-8 cursor-pointer'
                    >
                      {child.icon} {child.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )

        )
        
        }


        {/* {NavData.map((data, index) => (
          <div key={index}>
            <div
              className='mx-2 shadow-inner py-3 hover:bg-[#2E6D6A] hover:text-white ease-out duration-200 bg-[#e0e1e6] rounded mb-1 flex items-center gap-4 px-4 cursor-pointer'
              onClick={() => handleParentClick(index, data.link, !!data.children)}
            >
              {data.icon} {data.name}
              {data.children && (
                <div className='ml-auto'>
                  {activeParent === index ? <FaAngleUp /> : <FaAngleDown />}
                </div>
              )}
            </div>
            {data.children && activeParent === index && (
              <div>
                {data.children.map((child, childIndex) => (
                  <Link to={child.link} key={childIndex} className='no-underline'>
                    <div
                      className='mx-2 shadow-inner py-3 bg-[#e5e7ec] hover:bg-[#e0e1e6] rounded mb-1 flex items-center gap-4 pl-8 cursor-pointer'
                    >
                      {child.icon} {child.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))} */}
        
      </div>
      <button onClick={handleLogout} className='mx-2 shadow-inner py-3 hover:bg-[#2E6D6A] hover:text-white ease-out duration-200 bg-[#e0e1e6] rounded mb-1 flex items-center gap-4 px-4 cursor-pointer text-sm'>
        <IoMdExit />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

const MasterAdminNavData = [
  {
    name: 'Home',
    icon: <IoHome />,
    link: '/',
  },
  {
    name: 'Add New Company',
    icon: <FaBuilding />,
    link: '/add-new-comapny',
  },
  {
    name: 'HelpDesk',
    icon: <SiHelpdesk />,
    link: '/helpDesk',
  },
];
const AdminNavData = [
  {
    name: 'Home',
    icon: <IoHome />,
    link: '/',
  },
  {
    name: 'Add Employee',
    icon: <FaBuilding />,
    link: '/add-employee/',
  },
  {
    name: 'Main master',
    icon: <GrDomain />,
    children: [
      {
        name: 'Project master',
        icon: <RiProjectorLine />,
        link: '/project-master',
      },
      {
        name: 'Project master',
        icon: <RiProjectorLine />,
        link: '/project-master',
      },
    ],
  },
  {
    name: 'Project master',
    icon: <RiProjectorLine />,
    link: '/project-master',
  },
  {
    name: 'HelpDesk',
    icon: <SiHelpdesk />,
    link: '/helpDesk',
  },
];
