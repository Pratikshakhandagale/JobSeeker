import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { registerUser } from "../../api/Apicall";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Header from "../Header";

function Register() {
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
      name: data?.name,
      email: data?.email,
      password: data?.password,
    
    };
    let response = await registerUser(bodyData);
    if (response?.data) {
      navigate("/login");
    } else {
      alert(response?.error);
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div   style={{ background: "linear-gradient(to bottom, #FFFFFF, #EFDA2F )", height: "73vh" }}>
      <Header />
      <div className={styles.formDiv}>
        <form className="card-body form-floating mt-3 mx-1" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="h2" style={{ color: "#3E6139", fontWeight: "bold", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            Register
          </div>
          <br />
          <div className="form-floating">
            <label htmlFor="name" style={{color:"#3E6139"}}><strong>Name</strong></label>
            <Input id="name" type="text" placeholder="Name" {...register("name", { required: true })} />
            {errors.name && <FormErrorMessage>This field is required</FormErrorMessage>}
          </div>
          <br />
          <div className="form-floating">
            <label htmlFor="email" style={{color:"#3E6139"}}><strong>Email</strong></label>
            <Input id="email" type="text" placeholder="Email" {...register("email", { required: true })} />
            {errors.email && <FormErrorMessage>This field is required</FormErrorMessage>}
          </div>
          <br />
          <div className="form-floating input-with-icon">
            <label htmlFor="password" style={{color:"#3E6139"}}><strong>Password</strong></label>
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
          <br />
          {/* <div className="form-floating">
            <label htmlFor="source_code"><strong>Source code</strong></label>
            <Input id="source_code" type="text" placeholder="Source code" {...register("source_code", { required: true })} />
            {errors.source_code && <FormErrorMessage>This field is required</FormErrorMessage>}
          </div>
          <br />
          <div className="form-floating">
            <label htmlFor="organization"><strong>Organization</strong></label>
            <Input id="organization" type="text" placeholder="Organization" {...register("organization", { required: true })} />
            {errors.organization && <FormErrorMessage>This field is required</FormErrorMessage>}
          </div> */}
         <div style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}>
  <Button style={{ background: "#3E6139", color: "white", marginRight: "10px" }} type="submit">
    Register
  </Button>
  <Button style={{ background: "#3E6139", color: "white" }} onClick={() => { navigate("/login"); }} title="Login">
    Login
  </Button>
</div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
