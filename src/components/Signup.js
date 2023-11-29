import React ,{useState}from 'react';
import {useNavigate} from 'react-router-dom'


export default function Signup(props) {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
  let navigate = useNavigate();


  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}), 
    });
    const json=await response.json();
    console.log(json);
    if(json.success){
      // Save the auth token and redirect
      localStorage.setItem('token',json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully","success");

    }
    else{
      // alert("Invalid credentials");
      props.showAlert("Invalid credentials","danger");

    }
    
  }

  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value}) //purana wala note uske upar overwrite kringe acc to conditions ..bracket me jo h uska mtlb h jo bhi change horha h uski name jo h uski value ke equal hojaye 
  } 
  //on submit use krne ka fayda h ki aap minLength aur required use kr skte ho

  return (
    <div className='mt-3'>
       <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your name with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password" name="password" value={credentials.password} onChange={onChange} minLength={5} required/>  
                </div>
                <div className="mb-3">
                    <label htmlFor="ConfirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="ConfirmPassword" name="ConfirmPassword"  onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    </div>
  )
}
