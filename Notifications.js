import React from "react";
import { Tabs } from 'antd';
import Layout from '../components/Layout'
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { setUser } from "../redux/userSlice";
function Notifications() {

    const {user} = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const markAllAsSeen=async()=>{
        try{
            dispatch(showLoading());
            const response=await axios.post('/api/users/mark-all-notifications-as-seen',{userId: user._id},{
                headers:
                {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success)
            {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
            }else{
                toast.error(response.data.message);
            }
        }catch(error){
            dispatch(hideLoading());
            toast.error('Something went wrong');
        }
    }
    const deleteAll=async()=>{
        try{
            dispatch(showLoading());
            const response=await axios.post('/api/users/delete-all-notifications',{userId: user._id},{
                headers:
                {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success)
            {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
            }else{
                toast.error(response.data.message);
            }
        }catch(error){
            dispatch(hideLoading());
            toast.error('Something went wrong');
        }
    }
    return (
        <Layout>
            <h1 className="page-title">Notifications</h1>
            <Tabs>

                <Tabs.TabPane tab='Unseen' key={0}>
                    <div className="d-flex justify-content-end">
                        <h2 className="anchor" onClick={()=>markAllAsSeen()} >Mark all as seen</h2>
                    </div>
                    
                    {user ?.unseenNotifications.map((notification)=>(
                        <div className="card p-2" onClick={()=>navigate(notification.onClickPath)}>
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>
                <Tabs.TabPane tab='Seen' key={1}>
                    <div className="d-flex justify-content-end">
                        <h2 className="anchor" onClick={()=>deleteAll()} >Delete all</h2>
                    </div>
                    {user ?.seenNotifications.map((notification)=>(
                        <div className="card p-2" onClick={()=>navigate(notification.onClickPath)}>
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>

            </Tabs>
        </Layout>

    )

}

export default Notifications;