import React, { useState } from 'react';
import {
  DeliveredProcedureOutlined,
  DesktopOutlined,
  FileOutlined,
  LoginOutlined,
  OrderedListOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import { GiDeliveryDrone } from 'react-icons/gi';
import { CiDeliveryTruck } from 'react-icons/ci';
import { ImCancelCircle } from 'react-icons/im';
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { FcFeedback } from 'react-icons/fc';
import { MdOutlineFeedback } from 'react-icons/md';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, path) {
  return {
    key,
    icon,
    children,
    label: path ? <Link to={path}>{label}</Link> : label, // Using Link for navigation
  };
}

const items = [
  // getItem('Add Product', '1', <FileOutlined />, null, '/addproduct'), // Option 1 navigates to /option1
  getItem('Orders', '3', <ShoppingCartOutlined />, null, '/orders'),
  getItem('Assignment Maker', '2', <FileOutlined />, null, '/assignmnets'), // Option 1 navigates to /option1
  getItem('Project Maker', '2', <FileOutlined />, null, '/projects'), // Option 1 navigates to /option1
  getItem('Guess paper Maker', '2', <FileOutlined />, null, '/guess'), // Option 1 navigates to /option1
  getItem('Cancelled', '4', <ImCancelCircle />, null, '/deleted-orders'),
  // getItem('Orders', 'sub1', <ShoppingCartOutlined />, [
    //   getItem('Confirmed', '5', null, null, '/user/tom'),
    //   getItem('Cancelled', '6', null, null, '/deleted-orders'),
    //   getItem('Ready to ship', '7', null, null, '/user/alex'),
    // ]),
    // getItem('Team', 'sub2', <TeamOutlined />, [
      //   getItem('Team 1', '8', null, null, '/team/team1'),
      //   getItem('Team 2', '9', null, null, '/team/team2'),
      // ]),
      getItem('Deliverd Orders', '5', <CiDeliveryTruck />, null, '/delivered-orders'),
      getItem('Feedbacks', '6', <MdOutlineFeedback />, null,'/feedbacks' ),
  getItem('Back to Admin Panel', '11', <LoginOutlined />, null, '/admin'),
];

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate(); 
  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/")
        message.success("Log Out successful.");
      })
      .catch((error) => {
        console.log("signout error", error);
      });
  };
  return (

    <>
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className='h-screen bg-black' >
      <div className='bg-black' style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'sticky' }}>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          style={{ flex: 1 }}
        />
       
    {/* <Button className="btn bg-black text-white mb-96  mt-0 pt-0"
            onClick={HandleSignOut}
            >Log Out</Button> */}
      </div>
    </Sider>
            </>
           
  );
};

export default SideMenu;
