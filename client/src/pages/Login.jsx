import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginLogo from "../img/login-image.png";
import InstaLogo from "../img/instagram-logo.svg";
import LinkedinLogo from "../img/linkedin-logo.svg";
import YoutubeLogo from "../img/youtube-logo.svg";
import "../components/css/LoginStyles.css";
import { BsArrowRightShort } from "react-icons/bs";
import axios from "axios";
import {useCookies} from 'react-cookie';
import HeaderAuth from "../components/jsx/HeaderAuth";


const Login = () => {

  const navigate = useNavigate();

  const [cookies,setCookie,removeCookie] = useCookies([])
// const type = "forgotpassword" 

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleForm = (e) => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    setIsSubmit(true);
  }

  useEffect(() => {
  console.log("hello")
    if( Object.keys(formErrors).length === 0 && isSubmit ){
      axios.post("http://localhost:5000/auth/login",
      { 
        ...user
      },{
        withCredentials:true
      })
      .then( ({data}) => {
        console.log(data);
        if(data.errors){
          setFormErrors(data.errors);
        }
        else if(data.message == true && data.flag == true && data.type == "mother"){
             navigate(`/${data.id}/dashboard`);
        }
        else if(data.message && data.flag == false && data.type == "mother"){
          navigate(`/user/${data.id}/detailsone`);
        }
        else if(data.mesaage == true && data.flag == true && data.type == "doctor"){
          navigate(`/doctor/info/${data.id}/dashboard`);
        }
        else if(data.message == true && data.flag == false && data.type == "doctor"){
          navigate(`/doctor/info/${data.id}/detailsone`);
        }
        else {
            setFormErrors({final: data.message})
        }
      });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!values.email){
      errors.email = "Email required";
    }else if(!regex.test(values.email)){
      errors.email = "Incorrect Email Format";
    }

    if(!values.password){
      errors.password = "Password required";
    }else if(values.password.length < 6){
      errors.password = "Min 6 characters required";
    }else if(values.password.length > 12){
      errors.password = "Max 12 characters allowed";
    }

    return errors;
  }

  const googleAuth = async()=>{
    if(cookies.jwt)
    {
      const {data} = await axios.post(`http://localhost:8000/student`,{},{withCredentials:true})
      navigate(`/student/${data.id}`)
    }
    else{
     window.open("http://localhost:8000/auth/google","_self")
   }
}

  return (
    <div>
      
      <HeaderAuth />

      <div className="main_login">
        <div className="left-part_login">
          <div className="top_login">
            <h2>Find Your Baby's Care !</h2>
            <p>Login to become a part of our community</p>
          </div>

          <div className="signup-banner_login">
            <img src={LoginLogo} alt="Login" />
          </div>

          <div className="social_login">
            <div className="social-logo_login">
              <a href="https://www.remove.bg/upload">
                <img src={InstaLogo} alt="Instagram" />
              </a>
            </div>
            <div className="social-logo_login">
              <a href="https://www.remove.bg/upload">
                <img src={LinkedinLogo} alt="Linkedin" />
              </a>
            </div>
            <div className="social-logo_login">
              <a href="https://www.remove.bg/upload">
                <img src={YoutubeLogo} alt="Youtube" />
              </a>
            </div>
          </div>
        </div>

        <div className="right-part_login">
          <div className="form-container_login">
            <div className="top_login">
              <h2>Sign in</h2>
              <Link to="/signup">Create an account</Link>
            </div>

            <div className="line_login"></div>

            <div className="main-error-msg_login">
              <p>{formErrors.final}</p>
            </div>

            <div className="mid-part_login">
              <form>
                <div className="form-full_login">
                <div className="form-container-box_login">
                  <label>Email Address</label>
                  <input type="text" name="email" placeholder="Your Email Address" value={user.email} onChange={handleForm} />
                  <p className="errors-msg_login">{formErrors.email}</p>
                </div>

                <div className="form-container-box_login">
                  <label>Password</label>
                  <input type="password" name="password" placeholder="Enter Password" value={user.password} onChange={handleForm} />
                  <p className="errors-msg_login">{formErrors.password}</p>
                </div>

                <div className="container6_login">
                  <Link to='/emailverify/forgotpassword'>Forgot Password ?</Link>
                </div>
                </div>

                <button type="submit" onClick={submitForm} className="create-btn_login">
                  Login now
                  <BsArrowRightShort size={27} className="create-btn-logo_login" />
                </button> 

                {/* <a className="google-btn_login" onClick={googleAuth}>
                <img src={GoogleLogo} alt="" />
                  Login with Google
                </a>  */}
              </form>

              <div className="line_login"></div>

              <div className="bottom-part_login">
                <p>New to Maatri ?&nbsp;</p>
                <Link to="/company/signup">Register as new User</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
