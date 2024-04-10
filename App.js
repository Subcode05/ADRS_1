import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./Pages/ApplyDoctor";
import Profile from "./Pages/Doctor/Profile";
import Notifications from "./Pages/Notifications";
import UsersList from "./Pages/Admin/UsersList";
import DoctorsList from "./Pages/Admin/DoctorsList";
function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <BrowserRouter>
      {
        loading && (
          <div className="spinner-parent">
            <div class="spinner-border" role="status">
            </div>
          </div>
        )
      }
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes> 
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/apply-doctor' element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>} />
        <Route path='/notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path='/userslist' element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
        <Route path='/doctorslist' element={<ProtectedRoute><DoctorsList /></ProtectedRoute>} />
        <Route path='/doctor/profile/:userId' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
