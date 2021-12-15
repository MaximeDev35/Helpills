import React, {useEffect, useState} from 'react';
import {Input,Button, Typography} from 'antd';
const { Title } = Typography;


const Addprincipes = () => {
    const [inputValue, SetInputValue] = useState([])
    const [namePA, setNamePA] = useState([0])

    function test(a,i){
        var copy=[...inputValue]
        copy[i]=a
        SetInputValue(copy)
    }

    function test2(i){
        console.log('clicked')
        var copyInput=[...inputValue]
        console.log("Input a la position i : ",copyInput[i])
        copyInput=copyInput.filter(objet => objet !== copyInput[i]);
        console.log("apres suppression:",copyInput)
        
        var copyName=[...namePA]
        console.log("name a la position i : ",copyName[i])
        copyName=copyName.filter(objet => objet !== copyName[i]);
        console.log("apres suppression:",copyName)
        SetInputValue(copyInput)
        setNamePA(copyName)
    }

    function incrementI(){
        var MaxValue=namePA[0]
        for (var i=0;i<namePA.length;i++){
            if (namePA[i]>MaxValue){
                MaxValue= namePA[i]
            }
        }
        return(MaxValue+1)
    }

    var handleSubmit = async () => {

        var bodyRequest =''
        for(var i=0;i<inputValue.length;i++){
            
            if (i===0){
                bodyRequest="name=" + inputValue[i] + "&"
            }else if (i>0 && i!=inputValue.length-1){
                bodyRequest+=`name${i}=` + inputValue[i] + "&"
                
            }else{
                bodyRequest+=`name${i}=` + inputValue[i]
                console.log(bodyRequest)
            }
        }

        const data = await fetch('/medocs/add-principes', {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: bodyRequest
        })
    
        const body = await data.json()
    
        console.log(body)
    }
    
    var tab = namePA.map((champ,i)=>
    (
        <div key={i} style={{ padding: 15, border: 'solid',display: "flex", flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
            <Input 
                style={{width:300,marginRight:15 ,padding:15, color:'blue', borderRadius:50}} 
                onChange={(e) => test(e.target.value,i)}
                placeholder="principe actif" 
                value={inputValue[i]}
            />
            <Button onClick={()=>{setNamePA([...namePA,incrementI()]);   }} style={{padding:15,borderRadius:50}}>+</Button> 
            <Button onClick={()=>{test2(i) }} style={{backgroundColor:"rgba(255,0,0,0.3)",padding:15,borderRadius:50}}>-</Button>
        </div> )
    )
     console.log("namePA", namePA)
     console.log("input", inputValue)

    return (
        <div style={{ display: "flex", flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
            <Title level={2}>Ajout de principes actifs à la BDD</Title>
            {tab}
            <Button 
                style={{marginTop:15,padding:15,borderRadius:50}}
                onClick={()=>handleSubmit()}
            >Envoyer à la BDD</Button>
        </div>
    );
};

export default Addprincipes;