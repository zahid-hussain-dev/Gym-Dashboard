import React,{useState} from 'react'
import { Input } from "../../components/styledComponents/input/Input";
import { InputGroup } from "../../components/styledComponents/inputGroup/InputGroup";
import { Button } from "../../components/styledComponents/button/Button";
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import swal from "sweetalert";
import Link from 'next/link';
import Loader from '../../components/styledComponents/loader/loader';

export default function Signup() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const SignupSuccess = async () => {
    try {
      setLoading(true)
      const res = await axiosInterceptor().post(
        `/api/auth/signUp`,
        userData,
      );
      console.log("responsse of login", res)
      setLoading(false)
      if (res.statusText === "Created" && res.data) {
        console.log("resonse.data login", res.data);
        swal('Success', "Login to Continue", 'success')

        router.push("/login");
      }
      else {
        // history.push("/otpvalidation");
        // swal("ERROR!", "While Login....")
      }


    } catch (error) {
      setLoading(false)
      swal('Oops!', "Some Thing went Wrong", 'error')
      console.log(error)
    }
  }
  return (
    <div style={{ marginTop: "10%" }}>
      <div className="signup-card border">
        <h2 className="login-heading">Sign Up</h2>
        <div>
        <div style={{display:"flex", justifyContent:"space-around",}}>
        <div>
          <InputGroup>
            <label>First Name</label>
            <Input
                onChange={(e) => {
                  setUserData({ ...userData, [e.target.name]: e.target.value });
                }}
              id="firstName"
              type="text"
              placeholder="First Name"
              name="firstName"
            ></Input>
          </InputGroup>

          <InputGroup>
            <label>Email </label>
            <Input
                onChange={(e) => {
                  setUserData({ ...userData, [e.target.name]: e.target.value });
                }}
              id="username"
              type="email"
              placeholder="Email"
              name="email"
            ></Input>
          </InputGroup>
          <InputGroup>
            <label>User Name</label>
            <Input
                onChange={(e) => {
                  setUserData({ ...userData, [e.target.name]: e.target.value });
                }}
              id="username"
              type="text"
              placeholder="User Name"
              name="userName"
            ></Input>
          </InputGroup>
          <InputGroup>
          <label>Phone </label>
          <Input
              onChange={(e) => {
                setUserData({ ...userData, [e.target.name]: e.target.value });
              }}
            id="phone"
            type="number"
            placeholder="Phone"
            name="phone"
          ></Input>
        </InputGroup>
           </div>

           <div>
           <InputGroup>
            <label>Last Name</label>
            <Input
                onChange={(e) => {
                  setUserData({ ...userData, [e.target.name]: e.target.value });
                }}
              id="lastName"
              type="text"
              placeholder="Last Name"
              name="lastName"
            ></Input>
          </InputGroup>
                    <InputGroup>
          <label>Password</label>
          <Input
              onChange={(e) => {
                setUserData({ ...userData, [e.target.name]: e.target.value });
              }}
            id="password"
            type="password"
            placeholder="Password"
            name="password"
          ></Input>
        </InputGroup>
          <InputGroup>
            <label>User Type</label>
            <Input
                onChange={(e) => {
                  setUserData({ ...userData, [e.target.name]: e.target.value });
                }}
              //   onKeyPress={handleKeyPress}
              id="userType"
              type="text"
              placeholder="userType"
              name="user Type"
            ></Input>
          </InputGroup>
          <InputGroup>
          <label>Gym ID</label>
          <Input
              onChange={(e) => {
                setUserData({ ...userData, [e.target.name]: e.target.value });
              }}
            //   onKeyPress={handleKeyPress}
            id="gymId"
            type="text"
            placeholder="gym Id"
            name="gymId"
          ></Input>
        </InputGroup>
        </div>
        </div>

          <Button
          style={{marginTop:"2rem",width:"40%"}}
          onClick={() => {
            SignupSuccess();
          }}
          >
            Sign up
          </Button>
          <InputGroup style={{ textAlign:"center",marginTop:"1.5rem" }}>
              <label >
                Already have an account?  { ''}
                <span style={{ color: "rgb(57, 181, 74)", textAlign:"center" }}>
                  <Link href="/login"> Log In</Link>
                </span>
              </label>
            </InputGroup>
        </div>
      </div>
      <Loader isLoading={loading}></Loader>
    </div>
  )
}
