import React, { useState } from 'react'
import { InputGroup } from '../../components/styledComponents/inputGroup/InputGroup';
import { Input } from '../../components/styledComponents/input/Input';
import { Button } from '../../components/styledComponents/button/Button';
import { useDispatch, useSelector } from "react-redux";
import { setuserId, setloginData } from "store/slices/user/userSlice";
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import swal from "sweetalert";
import { useRouter } from 'next/router';
// import "../../styles/global.css";
import Link from 'next/link';

export default function OtpValidate() {
    const loginData = useSelector((state) => state.user.loginData);
    const loginId = useSelector((state) => state.user.userId);
    const [userOtp, setuserOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleKeyPress = async (event) => {
        console.log("here in key enter", event.key)
        if (event.key === "Enter") {
            try {
                console.log("useruser", loginId)
                setLoading(true)
                const res = await axiosInterceptor().post(
                    `/auth/verifyOTP`,
                    { id: loginId, otp: userOtp },
                );
                // setLoading(false)

                console.log("response otp verify", res.data);

                if (res.status === 200 && res.data.access_token) {
                    swal('Success', "Login Success", 'success')
                    // dispatch(postLoginSuccess(res.data))
                    localStorage.setItem("userData", JSON.stringify(res.data));
                    localStorage.setItem("role", JSON.stringify(res.data.user.roles))
                    localStorage.setItem("userLoginToken", res.data.access_token)
                    // dispatch(postUserOtp(userOtp));
                    setLoading(false)

                    router.push("/dashboard");
                }

            } catch (error) {
                setLoading(false)
                swal('Oops!', "Invalid OTP", 'error')
                console.log(error)
            }
        }
    };
    return (
        <div>
            <div style={{ marginTop: "20px" }}>
                {/* <div style={{padding:"50px",background:"black",overflow:"hidden"}}>hellow</div> */}
                <div className="login-card border">
                    <h2 className="login-heading">OTP Verification Form</h2>
                    <div>
                        <InputGroup>
                            <label>Enter OTP</label>
                            <Input
                                onChange={(e) => {
                                    setuserOtp(e.target.value);
                                }}
                                id="otp"
                                type="text"
                                pattern="[0-9.]+"
                                maxLength={6}
                                placeholder="***OTP***"
                                name="otp"
                            ></Input>
                        </InputGroup>

                        <Button
                            onClick={async () => {
                                console.log("userOtp....", userOtp)
                                try {
                                    console.log("useruser", loginId)
                                    setLoading(true)
                                    const res = await axiosInterceptor().post(
                                        `/auth/verifyOTP`,
                                        { id: loginId, otp: userOtp },
                                    );
                                    // setLoading(false)
                                    console.log("response otp verify", res.data);

                                    if (res.status === 200 && res.data.access_token) {
                                        swal('Success', "Login Success", 'success')
                                        // dispatch(postLoginSuccess(res.data))
                                        localStorage.setItem("userData", JSON.stringify(res.data));
                                        localStorage.setItem("role", JSON.stringify(res.data.user.roles));
                                        localStorage.setItem("userLoginToken", res.data.access_token);
                                        // dispatch(postUserOtp(userOtp));
                                        setLoading(false)

                                        router.push("/dashboard");
                                    }

                                } catch (error) {
                                    setLoading(false)
                                    swal('Oops!', "Invalid OTP", 'error')
                                    console.log(error)
                                }
                            }}
                        >
                            Verify
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}