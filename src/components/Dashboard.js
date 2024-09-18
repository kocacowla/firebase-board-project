// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import PostManager from './PostManager'; // 게시글 CRUD 기능을 가진 컴포넌트

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <div>
            {user ? (
                <div>
                    <h2>환영합니다, {user.displayName || user.email}</h2>
                    <button onClick={handleLogout}>로그아웃</button>
                    <PostManager /> {/* 게시글 관리 컴포넌트 */}
                </div>
            ) : (
                <p>로그인이 필요합니다.</p>
            )}
        </div>
    );
};

export default Dashboard;
