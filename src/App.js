import React, {useRef} from "react";
import axios from "axios";
import "./AppStyles.css";

export default function Registration(){
    const name=useRef();
    const email=useRef();
    const password=useRef();
    const repPassword=useRef();
    //const tos=useRef();

    const validateForm = () => {
        let formValid = false;
        

        if (name.current.validity.valueMissing 
            || email.current.validity.valueMissing 
            || password.current.validity.valueMissing
            || repPassword.current.validity.valueMissing){
                alert("Please fill in all text fields.");
        }
        else if (email.current.validity.typeMismatch){
            alert("Invalid e-mail address. Please enter your e-mail again.");
        }else if (password.current.validity.tooShort){
            alert("Password is too short. Please select another password");
        } else if(password.current.value !== repPassword.current.value) {
            alert("Passwords do not match. Please retry");
        } //else if (tos.current.validity.valueMissing){
		//alert("Please agree to the Terms and Conditions, and Privacy Policy.")}
        else{
            formValid = true;
        }
        return formValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(validateForm()){
            axios.post('http://localhost:8080/users',{
                fullname: name.current.value,
				mobile: null,
                email: email.current.value,
                password: password.current.value,
            }).then(response=>{
                console.log(response);
                if (response.status === 201){
                    alert("Registered successfully.")
                }
            }).then(()=>{
                name.current.value="";
                email.current.value="";
                password.current.value="";
                repPassword.current.value="";
                //tos.current.checked=false;
            })
            .catch(error=>{
                console.log(error);
            })
        }
      }

    return (
      <div>
        <p>STREETLINE</p>
        <div className="regform">
            <form className="registration" noValidate onSubmit={handleSubmit}>
            <h1>Register</h1>
            <label className="labelText">Full Name: </label>
            <input type="text" ref={name} required/><br/><br/>

            <label className="labelText">Email Address:</label>
            <input type="email" ref={email} name="email" required/><br/><br/>

            <label className="labelText">Password:</label>
            <input type="password" ref={password} name="password" required minLength="8"/><br/><br/>

            <label className="labelText">Re-enter password:</label>
            <input type="password" ref={repPassword} name="repPassword" required/><br/><br/>

            <p>By clicking Submit you agree to Streetline </p>

            <p>Terms of use.</p>
            <br/><br/>

            <button>Submit</button>
            <h1><a href="http://localhost:3001/login-page">New here? Sign up!</a></h1>
            </form>
        </div>
        </div>
    )
}
