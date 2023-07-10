import React from 'react'
import { InputGroup } from '../../components/styledComponents/inputGroup/InputGroup';
import { Input } from '../../components/styledComponents/input/Input';
import { Button } from '../../components/styledComponents/button/Button';
// import "../../styles/global.css";
import Link from 'next/link';
export default function OtpValidate() {
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
                                // onChange={(e) => {
                                //     setuserOtp(e.target.value);
                                // }}
                                id="otp"
                                type="text"
                                pattern="[0-9.]+"
                                // onKeyPress={handleKeyPress}
                                // pattern="[0-9]+"
                                // pattern="\d*"
                                // maxlength="4"
                                maxLength={6}
                                placeholder="***OTP***"
                                name="otp"
                            ></Input>
                        </InputGroup>

                        <Button
                        // onClick={async () => {
                        //     console.log("userOtp....", userOtp)
                        //     try {
                        //         console.log("useruser", userId)
                        //         setLoading(true)
                        //         const res = await axios.post(
                        //             `${ROUTES.BASE_URL}/auth/verifyOTP`,
                        //             { id: userId, otp: userOtp },
                        //             config
                        //         );
                        //         // setLoading(false)

                        //         console.log("response otp verify", res.data);

                        //         if (res.status === 200 && res.data.access_token) {
                        //             swal('Success', "Login Success", 'success')
                        //             console.log("res inside if", res);
                        //             dispatch(postLoginSuccess(res.data))
                        //             localStorage.setItem("role",JSON.stringify(res.data.user.roles))
                        //             dispatch(postUserOtp(userOtp));
                        //             setLoading(false)
                        //             localStorage.setItem("userLoginToken", res.data.access_token)

                        //             history.push("/dashboard");
                        //         }

                        //     } catch (error) {
                        //         setLoading(false)
                        //         swal('Oops!', "Invalid OTP", 'error')
                        //         console.log(error)
                        //     }
                        // }}
                        >
                            Verify
                        </Button>
                        <Link href={"/Signup"}>Text</Link>

                    </div>
                </div>
            </div>
        </div>
    )
}