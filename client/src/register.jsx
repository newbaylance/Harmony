import { redirect, useNavigate } from "react-router-dom"
// import instance from "../instanceAxios"
import { useEffect, useState } from "react"
import axios from "axios";


// const instance = axios.create({
//     baseURL: 'https://some-domain.com/api/',
//   });

export default function Register() {
    const navigate = useNavigate()

    const [register, setRegister] = useState({
        email: "",
        password: "",
        gender: "",
    })

    const changeHandler = (e) => {
        const {name, value} = e.target

        setRegister({
            ...register,
            [name]: value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const {data} = await axios.post('http://localhost:3000/register', {
                email: register.email,
                password: register.password,
                gender: register.gender,
            })
            console.log(data)
            Swal.fire("Success Register")
            navigate("/login")
        } catch (error) {
            if(Array.isArray(error.response.data.message)) {
                Swal.fire(error.response.data.message[0])
                } else {
                    Swal.fire(error.response.data.message)
                }
        }
    }

    return (
        <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4 p-4 bg-light">
                        <h2 className="mb-4">Register</h2>
                        <form id="registerForm" onSubmit={submitHandler}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" value={register.email} onChange={changeHandler}  className="form-control" id="email" name="email"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password"  value={register.password} onChange={changeHandler}  className="form-control" id="password" name="password" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Gender</label>
                                <input type="text" value={register.gender} onChange={changeHandler} className="form-control" id="gender" name="gender" placeholder="male/female"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </form> <br />
                        <div>
                            <p>Already have an account?</p> <a href="/login">Login</a>
                        </div>
                        
                    </div>
                </div>
            </div>
    )
}