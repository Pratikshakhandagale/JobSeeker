import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { userLogin } from "../../api/Apicall";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Header from "../Header";

function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("token");
    if (login) {
      navigate("/");
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const bodyData = {
      username: data?.username,
      password: data?.password,
      role: "seeker",
    };
    let response = await userLogin(bodyData);
    if (response?.data?.token) {
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("userName", response?.data?.user?.name);
      navigate("/collections");
    } else {
      alert(response?.error);
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div style={{ background: "linear-gradient(to bottom, #FFFFFF, #EFDA2F )", height: "73vh" }}>
      <Header />
      <div className={styles.formDiv} >
        <form className="card-body form-floating mt-3 mx-1" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="h2" style={{ color: "#3E6139", fontWeight: "bold", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            Log In
          </div>
          <br />
          <div className="form-floating">
            <label htmlFor="username" style={{color:"#3E6139"}}><strong>Email</strong></label>
            <Input id="username" type="text" placeholder="Email" {...register("username", { required: true })} />
            {errors.username && <FormErrorMessage>This field is required</FormErrorMessage>}
          </div>
          <br />
          <div className="form-floating input-with-icon">
            <label htmlFor="password"  style={{color:"#3E6139"}}><strong>Password</strong></label>
            <FormControl isInvalid={errors.password}>
              <InputGroup>
                <Input type={passwordShown ? "text" : "password"} placeholder="Password" {...register("password", { required: true, maxLength: 100 })} autoComplete="off" />
                <InputRightElement width="4.5rem">
                  <UnlockIcon onClick={togglePassword} cursor="pointer" color={passwordShown ? "blue.500" : "gray.500"} />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "25px" }}>
            <Button style={{ background: "#3E6139", color: "white" }} type="submit">Sign In</Button>
            <Button style={{ background: "#3E6139", color: "white" }} onClick={() => { navigate("/register"); }} title="Register">Register</Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
