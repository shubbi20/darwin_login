import React from 'react';
import './loginapp.css'
import { useState , useEffect} from 'react';

export function Login(){
     const [text, setText] = useState('');
     const [pass, setpass] = useState("");
     const [obj,setObj]= useState({});
     const [login, setLogin] = useState(null);
    
     function updatetext(e){
        e.preventDefault();
        setText(e.target.value);
     }

     function updatepass(e){
        e.preventDefault();
         setpass(e.target.value);
     }

     useEffect(()=>{
        if(localStorage.hasOwnProperty('testObject')){
            const localdata=JSON.parse(localStorage.getItem("testObject"));
            setObj(localdata.basic_info);
            setLogin(true);
        }

     },[login])

     function deletestorage(){
        localStorage.removeItem('testObject');
        setLogin(false);
        setObj({});
     }

    async function post_request(e){
        e.preventDefault();
        const payload={
            uid:text,
            password:pass
        }
       const response = await fetch('https://myphysio.digitaldarwin.in/api/login/' ,{
           method: 'POST' ,
           headers:{
               'Accept':'application/json',
               'Content-type': 'application/json'
           },
           body: JSON.stringify(payload)
       });

       const responsedata= await response.json();
          
       if(response.status===200 ){
            setObj(responsedata.basic_info);
            localStorage.setItem('testObject', JSON.stringify(responsedata));
            setLogin(true);
    
       }
       else{
      
           window.alert('User not registered');
       }
     
   
     }

    return(
        <div>
            {obj!=null && login===true ? (<div className='usertext'> {obj.first_name} {obj.middle_name} {" ,"}{obj.mobile_no} <div>
            <input type="submit" id="userlogout" value="LogOut" onClick={deletestorage}/>
                </div> </div>)
             : <form className="loginsection">
        <h1>Username</h1>
       <input type="text" className="userinput" value={text} onChange={updatetext}  />
        <h1>Password</h1>
       <input type="text" className="userinput" value={pass} onChange={updatepass} /><br/>
       <input type="submit" id="usersubmit" value="Login" onClick={post_request}/> 
     </form>
     }

        </div>
        
          

    )

}