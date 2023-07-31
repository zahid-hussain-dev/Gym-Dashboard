import React,{useState} from 'react'
import { Input } from "../../components/styledComponents/input/Input";
import { InputGroup } from "../../components/styledComponents/inputGroup/InputGroup";
import { Button } from "../../components/styledComponents/button/Button";
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import swal from "sweetalert";

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
    <div style={{ marginTop: "20px" }}>
      <div className="login-card border">
        <h2 className="login-heading">Sign Up</h2>
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
          <label>Phone </label>
          <Input
              onChange={(e) => {
                setUserData({ ...userData, [e.target.name]: e.target.value });
              }}
            id="phone"
            type="text"
            placeholder="Phone"
            name="phone"
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
              placeholder="UserName"
              name="userName"
            ></Input>
          </InputGroup>


         

          <InputGroup>
            <label>UserType</label>
            <Input
                onChange={(e) => {
                  setUserData({ ...userData, [e.target.name]: e.target.value });
                }}
              //   onKeyPress={handleKeyPress}
              id="userType"
              type="text"
              placeholder="userType"
              name="userType"
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
            placeholder="gymId"
            name="gymId"
          ></Input>
        </InputGroup>



          <Button
          style={{marginTop:"1rem"}}
          onClick={() => {
            SignupSuccess();
          }}
          // disabled={user.loading}
          >
            Sign up
          </Button>

        </div>
      </div>
    </div>
  )
}
