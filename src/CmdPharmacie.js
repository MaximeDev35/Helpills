import React,{useEffect,useState} from 'react';

import {Link} from 'react-router-dom'
import socketIOClient from "socket.io-client";
import Nav from './Nav'
import {Button,Empty,Input, Badge} from 'antd';
import {Card } from 'antd';
import { CaretDownFilled, SearchOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { Typography} from 'antd';
const { Text} = Typography;

var socket
var ville = "Courthezon"
var id = "61b86854c135dd48a00ef1fc"
var nomPharmacie = "Pharmacie idéale"
var numeroCommande = "CMD_xf35"

const CmdPharmacie = () => {

    const convertSecondeIntoMinute = (timeToConvert)=>{
        var minutes = Math.floor(timeToConvert/60)
        var secondes = timeToConvert - (60*minutes)
        var timeStamp =  minutes + " min " + secondes + " sec."
        return timeStamp
    }
    
    const [commande, setCommande] = useState([{ville:"marseille"}]);
    const [input1, setInput1] = useState([])
    const [input2, setInput2] = useState([])
   
    function remplirInput(a,i){
        var copy=[...input1]
        copy[i]=a
        setInput1(copy)
    }

    function remplirInput2(a,i){
        var copy=[...input2]
        copy[i]=a
        setInput2(copy)
    }

    
    
  useEffect(() => {
    socket = socketIOClient("https://helpillsprojectlacapsule.herokuapp.com/", { transports : ['websocket'] });
    socket.on("Validation", data2 => {
            if(data2){
                console.log("$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*:",data2)
                setCommande(data2)
            }
      });   
  }, []);  

  console.log(commande.length)
  return (
        <div>
           <Nav/>
             
            {commande.map((commandes,i)=>{
                var X =  new Date();
                var rawTimeBeforeEnd = Math.floor(commandes.timeOut/1000)-Math.floor(X/1000);
                console.log(rawTimeBeforeEnd>20)
                 var timeBeforeEnd = convertSecondeIntoMinute(rawTimeBeforeEnd);
                 var timeColor

                 if(rawTimeBeforeEnd>20){
                    console.log("1111111111")
                    timeColor = "green"
                 }else if ( rawTimeBeforeEnd>=10 && rawTimeBeforeEnd<=20){
                    console.log("222222222")
                    timeColor = "lightgrey"
                 }else{
                    console.log("33333333")
                    timeColor = "orange"
                 }

               // if (commande.length>1){
                    if (commandes.ville==ville){
                        return(
                            <div key={i} style={{width:800, display:'flex', flexDirection:'column', margin: 24, border:"solid", borderWidth:1 }}> 
                                <div style={{border:"solid", padding: 15 , width:800, backgroundColor:"lightgray", display:'flex', flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>  {/* // en tete de la carte*/}
                                    <div > {/* reference de la commande */}
                                        <Badge count= {numeroCommande} style={{ paddingLeft:15,paddingRight:15, color: '#FFF', backgroundColor:"blue" }} />
                                    </div>
                                    <div> {/* bouton pour cacher la commande*/}
                                        <Badge count="Delete" style={{ paddingLeft:15,paddingRight:15, color: "white", backgroundColor:'rgb(255,0,0)' }} />
                                    </div>
                                </div>
                                <div style={{padding: 15 ,borderLeft:"solid" ,borderBottom:"solid" , borderRight:"solid" ,width:800, backgroundColor:"lightgray", display:'flex', flexDirection:'row', justifyContent:"center", alignItems:'center'}}>   {/* informations sur la commande sur le + */}
                                    <div> {/*temps avant expiration */}
                                        <Badge count= {timeBeforeEnd} style={{ paddingLeft:15,paddingRight:15, color: '#FFF', backgroundColor:timeColor}} />
                                    </div>
                                    <div> {/* nbre de pharmacien qui ont déjà répondu à la commande */}
                                        <Badge count= "3 réponses" style={{ paddingLeft:15,paddingRight:15, color: '#FFF', backgroundColor:"blue" }} />
                                    </div>
                                </div>
                                {
                                
                                commandes.panier.map((carte,i)=>{ 
                                       return(
                                       <div key={i}style={{ width: "100%", height:"100%", backgroundColor:"red"}}>
                                            <Card title={carte.name} bordered={true} style={{ width: "100%" }}>
                                            <Image
                                                width={200}
                                                src={carte.img}
                                                />
                                                <p>Quantité: {carte.quantity}</p>
                                            </Card>
                                        </div>)
                                })}

                                <div style={{padding:15, display:"flex",flexDirection:"column" }}> { /* champ input prix */}
                                    <div style={{display:"flex"}}>
                                        <Text strong>Prix proposé : </Text>
                                            <Input 
                                                placeholder="Prix en euros." 
                                                style={{marginLeft:8, width : "50%"}}
                                                onChange={(e) => remplirInput(e.target.value,i)}
                                                value={input1[i]}
                                            > 
                                                
                                            </Input>
                                            <Text style={{marginLeft:8}} strong> Euro </Text> 
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <Text strong>Temps éstimé pour remise du paquet à la livraison : </Text> 
                                            <Input 
                                                placeholder="Temps en minutes." 
                                                style={{marginLeft:8, width : "50%"}}
                                                onChange={(e) => remplirInput2(e.target.value,i)}
                                                value={input2[i]}
                                            > 

                                            </Input>
                                        <Text style={{marginLeft:8}} strong> min </Text> 
                                    </div>
                                </div>
                                <div style={{display:"flex", flexDirection:"row"}}>
                                    <Button onClick={()=>{
                                       socket.emit("ReponsePharmacie", 
                                        {
                                            id:id,
                                            nomPharmacie : nomPharmacie,
                                            commandeN: numeroCommande,
                                            prix: input1[i],
                                            temps: input2[i]
                                        }); 

                                    }}>Valider</Button>
                                    <Button>Refuser</Button>
                                </div>
                            </div>
                        )
                    }
             /*   }else{
                    return(
                        <Empty style={{width:1000}}
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{
                            height: 60,
                            }}
                            description={
                            <span>
                                Aucune commande en attente de réponse.
                            </span>
                            }
                        >
                        </Empty>
                    )    
                }*/
            })}
        </div>
  );
}
  

export default CmdPharmacie;

