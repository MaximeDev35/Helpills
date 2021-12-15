import React from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import {Menu, Icon} from 'antd'

function Nav() {

  return (
    <nav >
      <Menu style={{display:"flex", flexDirection:"row", justifyContent:"space-between", backgroundColor:"#8AA78B"}} mode="horizontal" theme="dark">
        <Menu.Item key="1">
            <Link to="/Home" style={{color:"black", fontSize:20, fontWeight:"bolder"}}>
                {/*<Icon type="HomeFilled" style={{color:"purple"}}/> */}
                helpills
            </Link>
        </Menu.Item>
        <Menu.Item style={{display:"flex", flexDirection:"row", justifyContent:"center"}} key="2">
            <Link to="#" style={{color:"black", fontSize:15, fontWeight:"bolder"}}>
                menu 1
            </Link>
            <Link to="#" style={{marginLeft:15,color:"black", fontSize:15, fontWeight:"bolder"}}>
                menu 2
            </Link>
            <Link to="#" style={{marginLeft:15,color:"black", fontSize:15, fontWeight:"bolder"}}>
                menu 3
            </Link>
            <Link to="#" style={{marginLeft:15,color:"black", fontSize:15, fontWeight:"bolder"}}>
                menu 4
            </Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}

export default Nav;

