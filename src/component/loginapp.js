import React from 'react';
import './loginapp.css'
import { useState} from 'react';

export function Login(){
     const [text, setText] = useState('');
     const [pass, setpass] = useState("");
     const [login,setlogin]= useState(null);
     const [obj,setObj]= useState({});
    
     function updatetext(e){
        e.preventDefault();
        setText(e.target.value);
     }

     function updatepass(e){
        e.preventDefault();
         setpass(e.target.value);
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
             setlogin(true);
             localStorage.setItem('testObject', JSON.stringify(responsedata));
             setObj(responsedata.basic_info);
             
       }else{
           window.alert('not valid');
       }
     

     }

    return(
        <div>
            {login? <div> {obj.first_name} {obj.middle_name} {" "}{obj.mobile_no}  </div> : <form className="loginsection">
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