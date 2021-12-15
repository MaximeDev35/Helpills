import React from 'react';
import './App.css';
import {Button} from 'antd';
import {Link} from 'react-router-dom'

const Home = () => {
    console.log("******************* Page Home *******************")
    return (
        <div style={{ display: "flex", flexDirection:'row', alignItems:'center',justifyContent:'center', height:"100vh", backgroundColor:"grey"}}>
            <Button     
                style={{width:'200px', borderRadius:50}} 
                type="primary"
            ><Link style={{textDecoration:"none", color:"black"}} to="/add-principes" > Ajouter un principe actif à la bdd </Link></Button>
            <Button 
                style={{width:'200px', borderRadius:50}} 
                type="primary"
            ><Link style={{textDecoration:"none", color:"black"}} to="/add-drugs" > Ajouter un médicament à la bdd </Link></Button>
            <Button 
                style={{width:'200px', borderRadius:50}} 
                type="primary"
            ><Link style={{textDecoration:"none", color:"black"}} to="/cmd-pharmacie" > accéder aux Websockets pharmaciens </Link></Button>
        </div>
    );
};

export default Home;