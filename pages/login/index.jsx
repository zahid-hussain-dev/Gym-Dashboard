import React, { useState } from 'react';
import { InputGroup } from '../../components/styledComponents/inputGroup/InputGroup';
import { Input } from '../../components/styledComponents/input/Input';
import { Button } from '../../components/styledComponents/button/Button';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setuserId, setloginData } from "store/slices/user/userSlice";
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import swal from "sweetalert";
import Loader from '../../components/styledComponents/loader/loader';
import Link from 'next/link';

const index = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const loginData = useSelector((state) => state.user.loginData);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isButtonDisabled) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    dispatch(setloginData(userData));
    loginSuccess();
  };

  const updateButtonState = (emailValue, passwordValue) => {
    setIsButtonDisabled(emailValue === '' || passwordValue === '');
  };

  const loginSuccess = async () => {
    try {
      setLoading(true);
      const res = await axiosInterceptor().post(
        `/api/auth/signIn`,
        userData
      );
            console.log("responsse of login", res)
      dispatch(setuserId(res.data.id))
      setLoading(false)
      if (res.status === 200 && res.data.token) {
        console.log("resonse.data login", res.data)
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        localStorage.setItem("role", JSON.stringify(res.data.user.roles))
        localStorage.setItem("Userrole", JSON.stringify(res.data.user.roles[0].name))

        localStorage.setItem("userLoginToken", res.data.token)
        dispatch(setuserId(res.data.user.id))
        if (res.data.user.roles[0].name === "admin") {
          router.push("/coaches");
        }
        else if (res.data.user.roles[0].name === "coach") {
          router.push("/coaches");
        }
        else if (res.data.user.roles[0].name === "gym") {
          router.push("/gym");
        }
        else if (res.data.user.roles[0].name === "gymnast") {
          router.push("/gymnast");
        }
      }
      else {
        // history.push("/otpvalidation");
        // swal("ERROR!", "While Login....")
      }

    } catch (error) {
      setLoading(false);
      swal('Oops!', error.data.message);
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: "4rem", marginBottom: "20px" }}>
      <div className="login-card border">
        <h2 className="login-heading">Login</h2>
        <div>
          <InputGroup>
            <label style={{ color: "white" }}>Email</label>
            <Input
              onChange={(e) => {
                const newEmailValue = e.target.value;
                setUserData(prevUserData => {
                  const newUserData = { ...prevUserData, email: newEmailValue };
                  updateButtonState(newEmailValue, newUserData.password);
                  return newUserData;
                });
              }}
              id="username"
              type="email"
              placeholder="Email"
              name="email"
            />
          </InputGroup>

          <InputGroup>
            <label style={{ color: "white" }}>Password</label>
            <Input
              onChange={(e) => {
                const newPasswordValue = e.target.value;
                setUserData(prevUserData => {
                  const newUserData = { ...prevUserData, password: newPasswordValue };
                  updateButtonState(newUserData.email, newPasswordValue);
                  return newUserData;
                });
              }}
              onKeyPress={handleKeyPress}
              id="password"
              type="password"
              placeholder="Password"
              name="password"
            />
          </InputGroup>

          <Button
            disabled={isButtonDisabled}
            style={{ marginTop: "1rem" }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
            <InputGroup>
              <label>
                Don't have an account?{' '}
                <span style={{ color: "rgb(57, 181, 74)" }}>
                  <Link href="/signup">Sign up</Link>
                </span>
              </label>
            </InputGroup>
          </div>
        </div>
      </div>
      <Loader isLoading={loading}></Loader>
    </div>
  );
}

export default index;
