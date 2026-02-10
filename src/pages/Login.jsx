import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import * as Utils from "../utils";
import { useForm } from "react-hook-form";
const { VITE_BASEURL, VITE_PATH } = import.meta.env;

function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        mode: "onChange",
    });

    const submitForm = async (formData) => {
        console.log("submitForm", formData);
        const url = `${VITE_BASEURL}/admin/signin`;
        try {
            const res = await axios.post(url, formData);
            console.log(res);
            if (res.data.success) {
                const { token, expired } = res.data;
                document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
                navigate('/admin/products')
            } else {
                alert("登入失敗，請檢察帳號密碼是否正確");
            }
        } catch (error) {
            console.dir(error);
        }
    };
    return (
        <>
            <h1 className="text-center">登入</h1>

            <form
                className="border p-4 bg-light rounded col-6 offset-3"
                onSubmit={handleSubmit(submitForm)}
            >
                <div className="mb-3 text-start">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        aria-describedby="emailHelp"
                        {...register("username", {
                            required: "請輸入帳號",
                        })}
                    />
                    <span className="text-danger">
                        {errors.username?.message}
                    </span>
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        {...register("password", {
                            required: "請輸入密碼",
                        })}
                    />
                    <span className="text-danger">
                        {errors.password?.message}
                    </span>
                </div>
                <button type="submit" className="btn btn-primary">
                    Sign In
                </button>
            </form>
        </>
    );
}

export default Login;
