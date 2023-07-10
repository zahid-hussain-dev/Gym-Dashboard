import React from 'react'
import { Input } from "../../components/styledComponents/input/Input";
import { InputGroup } from "../../components/styledComponents/inputGroup/InputGroup";
import { Button } from "../../components/styledComponents/button/Button";
import PhoneNumber from "../../components/styledComponents/Countrycode";
// import "../../styles/loginstyle.css";
// import "../../styles/global.css";

export default function Signup()  {
  return (
    <div style={{ marginTop: "20px" }}>
      <div className="login-card border">
        <h2 className="login-heading">Sign Up</h2>
        <div>
          <InputGroup>
            <label>Name</label>
            <Input
              //   onChange={(e) => {
              //     setUserData({ ...userData, [e.target.name]: e.target.value });
              //   }}
              id="username"
              type="text"
              placeholder="Username"
              name="username"
            ></Input>
          </InputGroup>

          <InputGroup>
            <label>Username</label>
            <Input
              //   onChange={(e) => {
              //     setUserData({ ...userData, [e.target.name]: e.target.value });
              //   }}
              id="username"
              type="text"
              placeholder="Username"
              name="username"
            ></Input>
          </InputGroup>

          <InputGroup>
            <label>Email Address</label>
            <Input
              //   onChange={(e) => {
              //     setUserData({ ...userData, [e.target.name]: e.target.value });
              //   }}
              id="username"
              type="text"
              placeholder="Username"
              name="username"
            ></Input>
          </InputGroup>

          <InputGroup>
            <label>Zip Code</label>
            <Input
              //   onChange={(e) => {
              //     setUserData({ ...userData, [e.target.name]: e.target.value });
              //   }}
              id="username"
              type="text"
              placeholder="Username"
              name="username"
            ></Input>
          </InputGroup>

          <InputGroup>
            <label>Mobile Phone Number</label>
            <PhoneNumber
              id="phone"
              name="phone"
              // onKeyPress={handleKeyPress}
              onChange={(e) => {
                // if (username === true) {
                //   // setUserData({ phone: e.target.value });
                //   console.log("not setting")
                // }
                // else {
                //   setUserData({ phone: e.target.value });
                // }
                console.log("userdata", e.target.value)
              }}
              size="large"
              placeholder="phone"
            // name="client_primaryContactNumber"
            ></PhoneNumber>
          </InputGroup>

          <InputGroup>
            <label>Invitation Code</label>
            <Input
              //   onChange={(e) => {
              //     setUserData({ ...userData, [e.target.name]: e.target.value });
              //   }}
              id="username"
              type="text"
              placeholder="Username"
              name="username"
            ></Input>
          </InputGroup>


          <InputGroup>
            <label>Password</label>
            <Input
              //   onChange={(e) => {
              //     setUserData({ ...userData, [e.target.name]: e.target.value });
              //   }}
              //   onKeyPress={handleKeyPress}
              id="password"
              type="password"
              placeholder="Password"
              name="password"
            ></Input>
          </InputGroup>

          <InputGroup>
            <label>Re-enter Password</label>
            <Input
              //   onChange={(e) => {
              //     setUserData({ ...userData, [e.target.name]: e.target.value });
              //   }}
              //   onKeyPress={handleKeyPress}
              id="password"
              type="password"
              placeholder="Password"
              name="password"
            ></Input>
          </InputGroup>



          <Button
          // onClick={() => {
          //   handleLogin();
          // }}
          // disabled={user.loading}
          >
            Sign up
          </Button>

        </div>
      </div>
    </div>
  )
}
