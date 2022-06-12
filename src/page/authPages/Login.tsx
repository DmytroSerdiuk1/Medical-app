import React, {FC} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import styled from "styled-components";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {login} from "../../engine/store/app/appAction";
import {IAuthSendData} from "../../engine/interfaces/IAuthSendData";
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../../engine/hooks/useAuth";

interface IProps {
}

const TabWrapper = styled.div`
    margin: auto;
    padding: 30px 20px;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0px 0px 24px 0px rgba(0,0,0,0.35);
`

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: auto;
`
const AuthSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8, "Min length 8").required("Required")
})


const Login: FC<IProps> = () => {
    const dispatch = useDispatch()
    const {replace} = useHistory()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: AuthSchema,
        onSubmit: (values: IAuthSendData) => {
            dispatch(login(values, replace))
        }
    })


    return (
        <Box sx={{display: "flex", alignItems: "center", width: '100%', height: "100vh"}}>
            <TabWrapper>
                <FormWrapper>
                    <TextField fullWidth value={formik.values.email} error={!!formik.errors.email}
                               helperText={formik.errors.email || null} onChange={formik.handleChange}
                               id="outlined-basic" label="Email" type={"email"} name={"email"} variant="outlined"/>
                    <TextField fullWidth value={formik.values.password} error={!!formik.errors.password}
                               helperText={formik.errors.password || null} onChange={formik.handleChange}
                               id="outlined-basic" label="Password" type={"password"} name={"password"}
                               variant="outlined"/>
                    <Button color={'primary'} variant={'contained'} size={'large'} fullWidth
                            onClick={() => formik.submitForm()}>
                        Увійти
                    </Button>
                    <Link to={'/register'}>
                        <Typography>
                            У мене немає аккаунту
                        </Typography>
                    </Link>
                </FormWrapper>
            </TabWrapper>
        </Box>
    );
};

export default Login;