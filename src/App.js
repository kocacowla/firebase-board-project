// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // components 폴더로 경로 수정
import Login from './components/Login'; // components 폴더로 경로 수정
import Register from './components/Register'; // components 폴더로 경로 수정

const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/register">회원가입</Link>
                    </li>
                    <li>
                        <Link to="/login">로그인</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">대시보드</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
