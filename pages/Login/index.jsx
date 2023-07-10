import React from 'react'
import { InputGroup } from '../../components/styledComponents/inputGroup/InputGroup';
import { Input } from '../../components/styledComponents/input/Input';
import { Button } from '../../components/styledComponents/button/Button';
import PhoneNumber from "../../components/styledComponents/Countrycode";
import { useRouter } from "next/router";

// import "../../styles/global.css";
import Link from 'next/link';
const index = () => {
    const router = useRouter()
  const handleClickLogin = () => {
    router.push("/Home");
  };
  return (
    <div style={{ marginTop: "20px" }}>
    {/* <div style={{padding:"50px",background:"black",overflow:"hidden"}}>hellow</div> */}
    <div className="login-card border">
      <h2 className="login-heading">Login</h2>
      <div>
        <InputGroup>
          <label>Username</label>
          <Input
            // onChange={(e) => {
            //   setUserData({ ...userData, [e.target.name]: e.target.value });
            // }}
            id="username"
            type="text"
            placeholder="Username"
            name="username"
          ></Input>
        </InputGroup>
       
        {/* {username ?(
          <div style={{ color: "red",textAlign:"left" }}>Please enter username</div>
        ):<div></div>} */}

        <InputGroup>
          <label>Password</label>
          <Input
            // onChange={(e) => {
            //   setUserData({ ...userData, [e.target.name]: e.target.value });
            // }}
            // onKeyPress={handleKeyPress}
            id="password"
            type="password"
            placeholder="Password"
            name="password"
          ></Input>
        </InputGroup>

        <div> OR</div>
        <InputGroup>
        <label>Phone</label>
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
        <Button
          onClick={() => {
            handleLogin();
            // console.log("userData....",userData)
          }}
          // disabled={user.loading}
        >
          Login
        </Button>

        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
          <InputGroup>
            <label>Don't have an account? <dvi style={{ color: "rgb(57, 181, 74" }}><Link href="/Signup">Sign up</Link></dvi></label>
          </InputGroup>
        </div>
      </div>
    </div>
  { /* <Loader isLoading={loading}></Loader> */}

  </div>
  )
}

export default index
