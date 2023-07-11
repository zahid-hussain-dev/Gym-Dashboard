import React, { useState } from 'react'
import { InputGroup } from '../../components/styledComponents/inputGroup/InputGroup';
import { Input } from '../../components/styledComponents/input/Input';
import { Button } from '../../components/styledComponents/button/Button';
import PhoneNumber from "../../components/styledComponents/Countrycode";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setuserId, setloginData } from "store/slices/user/userSlice";
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import swal from "sweetalert";
// import "../../styles/global.css";
import Link from 'next/link';

const index = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const loginData = useSelector((state) => state.user.loginData);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("here on key enter")
      if (userData.hasOwnProperty('userName') || userData.hasOwnProperty('password')) {
        delete userData.phone
      }
      dispatch(setloginData(userData));
      loginSuccess();
    }
  };

  const handleLogin = async () => {
    if (userData.hasOwnProperty('userName') || userData.hasOwnProperty('password')) {
      delete userData.phone
    }
    dispatch(setloginData(userData));
    loginSuccess();
  };

  const loginSuccess = async () => {
    try {
      setLoading(true)
      const res = await axiosInterceptor().post(
        `/auth/signin`,
        userData,
      );
      console.log("responsse of login", res.data.id)
      dispatch(setuserId(res.data.id))
      setLoading(false)

      if (userData.hasOwnProperty('phone')) {
        router.push("/otpValidate");
      }
      if (res.status === 200 && res.data.access_token) {
        console.log("resonse.data login", res.data)
        localStorage.setItem("userData", JSON.stringify(res.data));
        localStorage.setItem("role", JSON.stringify(res.data.user.roles))
        localStorage.setItem("userLoginToken", res.data.access_token)
        dispatch(setuserId(res.data.id))
        router.push("/dashboard");
      }
      else {
        // history.push("/otpvalidation");
        // swal("ERROR!", "While Login....")
      }


    } catch (error) {
      setLoading(false)
      swal('Oops!', error.data.message, 'error')
      console.log(error)
      // dispatch(postLoginFailure(error.response.data.message))
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>
      {/* <div style={{padding:"50px",background:"black",overflow:"hidden"}}>hellow</div> */}
      <div className="login-card border">
        <h2 className="login-heading">Login</h2>
        <div>
          <InputGroup>
            <label>Username</label>
            <Input
              onChange={(e) => {
                setUserData({ ...userData, [e.target.name]: e.target.value });
              }}
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
              onChange={(e) => {
                setUserData({ ...userData, [e.target.name]: e.target.value });
              }}
              onKeyPress={handleKeyPress}
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
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                // if (username === true) {
                //   // setUserData({ phone: e.target.value });
                //   console.log("not setting")
                // }
                // else {
                setUserData({ phone: e.target.value });
                // }
                // console.log("userdata", e.target.value)
              }}
              size="large"
              placeholder="phone"
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
              <label>Don't have an account? <span style={{ color: "rgb(57, 181, 74" }}><Link href="/signup">Sign up</Link></span></label>
            </InputGroup>
          </div>
        </div>
      </div>
      { /* <Loader isLoading={loading}></Loader> */}

    </div>
  )
}

export default index
