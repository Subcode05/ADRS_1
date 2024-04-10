import React from 'react'
import { Input, Form, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/users/login', values);
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                toast("Redirecting to home page");
                localStorage.setItem("token", response.data.data);
                navigate("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error('Something went wrong');

        }
    }







    return (
        <div className='authentication'>
            <div className='authentication-form card p-3'>
                <h2 className='card-title'>Welcome Back</h2>
                <Form layout='vertical' onFinish={onFinish}>


                    <Form.Item label='Email:' name='email'>
                        <Input placeholder='Email'></Input>
                    </Form.Item>
                    <Form.Item label='Password:' name='password'>
                        <Input placeholder='Password' type='password'></Input>
                    </Form.Item>

               
                        <Button className='primary-button my-2 full-width' htmlType='submit'>LOGIN</Button>

                        <Link to='/register' className='anchor mt-2'>CLICK HERE TO REGISTER</Link>
                   

                </Form>

            </div>
        </div>
    )
}

export default Login;