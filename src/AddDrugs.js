import React, {useEffect, useState} from 'react';
import {Input,Button, Checkbox, Typography, Radio} from 'antd';


const { Title, Text } = Typography;

const AddDrugs = () => {

// ***************************** Hook d'etat ****************************************************
    // nom du médicament
    const [drugName, SetDrugName] = useState("");

    // contre-indications
    const [contreIndic, SetContreIndic] = useState([]);

    // photo
    const [photo, SetPhoto] = useState("");

    // prescription
    const [prescription, SetPrescription] = useState(0);

    // Carte principes actifs : une forme thérapeutique peut contenir plusieurs principes actifs.
        const [cartePA, SetCartePA] = useState([{i:0, ft:"gélule", pa:[""], dosage:[""], unite:["mg"]}]);
 
        const [icartBis, SeticartBis] = useState([]);
// ***************************** fonctions ****************************************************
     
    function CheckBox(e, name) {                // fonction controlant les checkbox
        if (e.target.checked){
            SetContreIndic([...contreIndic,name])
        }else{
            var copyCheckbox = [...contreIndic]
            copyCheckbox=copyCheckbox.filter(objet => objet !== name);
            SetContreIndic(copyCheckbox)
        }
    }

    function radioButton(e) {                   // fonction controlant les boutons radios
        SetPrescription(e.target.value)
    }

    const FormThera = (event,i) => {          // fonction controlant le champ de selection de la forme thérapeutique 
        var copyCartePA = [...cartePA]
        copyCartePA[i].ft=event
        SetCartePA(copyCartePA)
    }

    const principeActif =(lettre,icart,i) =>{         // fonction controlant le champ name des principes actifs
        var copyCartePA = [...cartePA]
        console.log(copyCartePA)
        copyCartePA[icart].pa[i]=lettre
        SetCartePA(copyCartePA)
    }

    const dosage =(lettre,icart,i) =>{                // fonction controlant le champ dosage des principes actifs
        var copyCartePA = [...cartePA]
        console.log(copyCartePA)
        copyCartePA[icart].dosage[i]=lettre
        SetCartePA(copyCartePA)
    }

    const unite = (event,icart,i) => {         // fonction controlant le champ de selection de l'unité
        var copyCartePA = [...cartePA]
        console.log(copyCartePA)
        copyCartePA[icart].unite[i]=event
        SetCartePA(copyCartePA)
    }

    const addPrincipeActif = (icart) =>{
        console.log("clické sur : ", icart)
        var copyCartePA = [...cartePA]
        console.log(copyCartePA)
        copyCartePA[icart].pa.push("")
        copyCartePA[icart].dosage.push("")
        copyCartePA[icart].unite.push("mg")
        SetCartePA(copyCartePA)
    }

    const incrementI = () => {
        var MaxValue=cartePA[0].i+1
        for (var i=0;i<cartePA.length;i++){
            if (cartePA[i].i>=MaxValue){
                MaxValue= (cartePA[i].i+1)
            }
        }
        return({i:MaxValue, ft:"gélule", pa:[""], dosage:[""], unite:["mg"]})
    }

    const deleteFT=(i)=>{
        var copyCartePA = [...cartePA]
        copyCartePA=copyCartePA.filter(objet => objet.i !== i);
        console.log(copyCartePA)
        SetCartePA(copyCartePA)
    }

    const deletePA=(icart,i)=>{
        var copyCartePA = [...cartePA]
        if (copyCartePA[icart].pa.length>1){
            console.log(">1")
            copyCartePA[icart].pa=copyCartePA[icart].pa.splice(i,1)
            copyCartePA[icart].dosage=copyCartePA[icart].dosage.splice(i,1)
            copyCartePA[icart].unite=copyCartePA[icart].unite.splice(i,1)
        }else{
            console.log("else")
            copyCartePA[icart].pa=[]
            copyCartePA[icart].dosage=[]
            copyCartePA[icart].unite=[]
        }
        SetCartePA(copyCartePA)
    }

    const handleSubmit = () =>{                 // fonction controlant le bouton "ajouter à la BDD"
        console.log(cartePA)
    }
// ***************************** Map ***********************************************************
    // 1) Cette Map sert à créer une carte pour chaque forme thérapeutique.
    var icart = 0
    var carteFTs = cartePA.map((champ,i)=>
    (
        <div key={i} style={{marginBottom:10}}>
            <div style={{border:"solid", padding:10, backgroundColor: "lightsalmon",display:'flex', flexDirection:'row', alignItems:'center'}}>
                <Text style={{marginRight:20}} strong> Forme thérapeutique :</Text>
                <form>
                    <select style={{borderRadius:10, padding:7,}} value={cartePA[i].ft} onChange={(e)=>FormThera(e.target.value,i)}>
                        <optgroup label="Voie orale : à avaler">
                            <option value="gelule">Gélules</option>
                            <option value="comprime">Comprimés</option>
                            <option value="sirop">Sirop</option>
                        </optgroup>
                        <optgroup label="Voie orale : à dissoudre">
                            <option value="Effeverscent">Effervescents</option>
                        </optgroup>
                        <optgroup label="Voie orale : à sucer">
                            <option value="orodispersible">Orodispersibles</option>
                        </optgroup>
                        <optgroup label="Voie rectale">  
                            <option value="suppositoire">Suppositoires</option>
                        </optgroup>        
                        <optgroup label="Injection">  
                            <option value="transfusion">Solution pour transfusions</option>
                            <option value="vaccin">Vaccins</option>
                        </optgroup>                                                
                    </select>
                </form>
                <Button onClick={()=>deleteFT(cartePA[i].i)} style={{marginLeft:10, backgroundColor:"rgba(255,0,0,0.3)",padding:8, borderRadius:50}}>Delete</Button>
            </div>
{/* map 2 */} 
             
            {   icart=i,
                console.log("*****************", icart),
                cartePA[i].pa.map((champ,i)=> (
                        <div key={i} style={{border:"solid",display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', padding:10, backgroundColor:"lightseagreen"}}> 
                            <div style={{border:"solid", borderRadius:15 ,paddingTop:15,paddingBottom:10,paddingRight:30,paddingLeft:30, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', alignItems:'center',backgroundColor:"white", marginBottom:10}}> 
                                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'start'}}> 
                                    <div>
                                        <Text strong>principe actif : </Text>
                                        <Input
                                            style={{marginLeft:5,width:150,padding:5, color:'black', borderRadius:10}} 
                                            onChange={(e)=>principeActif(e.target.value,icart,i)}
                                            value = {cartePA[icart].pa[i]}
                                        />
                                    </div>
                                    <div style={{display:'flex', flexDirection:'row', marginTop:10}} >
                                        <Text strong>dosage : </Text>
                                        <Input
                                            style={{marginLeft:5,width:60,padding:5, color:'black', borderRadius:10}} 
                                            onChange={(e) => dosage(e.target.value,icart,i)}
                                            value={cartePA[icart].dosage[i]}
                                        />
                                        <form>
                                            <select 
                                                value={cartePA[icart].unite[i]} 
                                                onChange={(e)=>unite(e.target.value,icart,i)}
                                                style={{width:60,padding:5, color:'black', borderRadius:10}} 
                                            > 
                                                <option value={cartePA[icart].unite[i]}>mg</option>
                                            </select>
                                        </form> 
                                        <Text style={{marginLeft:5}}>par {cartePA[icart].ft} </Text>
                                    </div>
                                </div>
                                <Button onClick={()=>deletePA(icart,i)} style={{marginTop:10, backgroundColor:"rgba(255,0,0,0.3)",padding:8, borderRadius:50}}>Delete</Button>
                            </div> 
                        <div>
                            <Button onClick={()=>addPrincipeActif(icart)} style={{padding:15,borderRadius:50}}>+ ajouter un principe actif</Button>
                        </div>
                    </div>
                ))
            }   
        </div>
    ))

// ***************************** console.log ****************************************************

console.log(icartBis)
// ***************************** composant ****************************************************

    return (
        <div style={{ display: "flex", flexDirection:'column', alignItems:'center',justifyContent:'center'}}>

            <Title level={2}>Ajout de médicaments à la BDD</Title>

            {/*  --- Une carte --- */}
            <div style={{border:"solid",padding:10, display:'flex', flexDirection:'Column', justifyContent:'center', alignItems:'center'}}> 

                {/*  --- Nom du médicament --- */}
                <div style={{width:"100%", display:'flex', flexDirection:'Column', justifyContent:'center', alignItems:'center'}}>
                    <Input
                        style={{width:"80%",padding:10, color:'black', borderRadius:50}} 
                        onChange={(e)=>SetDrugName(e.target.value)}
                        value={drugName}
                        placeholder="nom du médicament" 
                    />
                </div>

                {/*  --- Contres-indications --- */}
                <div style={{width:"100%", paddingTop:8 ,paddingBottom:10 ,display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}} >
                    <div>
                        <Text strong>Médicament déconseillé si : </Text>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'start',}}>
                        <Checkbox 
                            onChange={(e)=> CheckBox(e,"allergie")}
                        >Allergies</Checkbox>
                        <Checkbox 
                            onChange={(e)=> CheckBox(e,"enceinte")}
                        >Femme enceinte</Checkbox>
                        <Checkbox 
                            onChange={(e)=> CheckBox(e,"allaitante")}
                        >Femme allaitante</Checkbox>
                    </div>
                </div>

                {/*  --- Contre-indications --- */}
                <div style={{width:"100%", paddingTop:10 ,paddingBottom:10 ,display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}} >
                    <input 
                        type='file'
                    />
                </div> 

                {/*  --- Prescription --- */}
                <div style={{width:"100%", paddingTop:8 ,paddingBottom:10 ,display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}} >
                    <Text strong>Prescription médicale : </Text>

                    <Radio.Group onChange={(e)=> radioButton(e)} value={prescription} style={{display:'flex', flexDirection:'column', alignItems:'start',}}>
                        <Radio value={0}>Non soumis</Radio>
                        <Radio value={1}>Liste I</Radio>
                        <Radio value={2}>Liste II</Radio>
                        <Radio value={3}>Stupéfiant</Radio>
                    </Radio.Group>
                </div>

                {/*  --- carte --- */}
                <div style={{border:"solid", padding:10, backgroundColor:"lightgreen", display:'flex', flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                    {carteFTs}
                    <Button onClick={()=>{SetCartePA([...cartePA,incrementI()]);}} style={{padding:15,borderRadius:50}}>+ ajouter une forme thérapeutique</Button>
                </div>
                <Button 
                
                    style={{marginTop:15,padding:15,borderRadius:50}}
                    onClick={()=>handleSubmit()}
                >Envoyer à la BDD</Button>
            </div>
        </div>

    )

    

};

export default AddDrugs;
