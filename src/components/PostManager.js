// src/components/PostManager.js
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase'; // firebase.js 파일에서 Firestore와 인증을 가져옵니다.

const PostManager = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editPostId, setEditPostId] = useState(null);

    // Firestore에서 게시글 목록을 가져오는 함수
    const fetchPosts = async () => {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setPosts(postList);
    };

    // 게시글 추가 및 수정 함수
    const handleAddPost = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) {
            alert('로그인이 필요합니다.');
            return;
        }
        if (editPostId) {
            // 게시글 수정
            await updateDoc(doc(db, 'posts', editPostId), {
                title,
                content,
            });
            setEditPostId(null);
        } else {
            // 새 게시글 추가
            await addDoc(collection(db, 'posts'), {
                title,
                content,
                createdAt: new Date(),
                userId: auth.currentUser.uid,
            });
        }
        setTitle('');
        setContent('');
        fetchPosts(); // 게시글 목록 다시 가져오기
    };

    // 게시글 수정 함수
    const handleEditPost = (postId, currentTitle, currentContent) => {
        setEditPostId(postId);
        setTitle(currentTitle);
        setContent(currentContent);
    };

    // 게시글 삭제 함수
    const handleDeletePost = async (postId) => {
        await deleteDoc(doc(db, 'posts', postId));
        fetchPosts();
    };

    // 컴포넌트가 처음 렌더링될 때 게시글 목록을 가져옵니다.
    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>게시판</h1>
            <form onSubmit={handleAddPost}>
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} required />
                <button type="submit">{editPostId ? '게시글 수정' : '게시글 작성'}</button>
            </form>

            <div>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <button onClick={() => handleEditPost(post.id, post.title, post.content)}>수정</button>
                        <button onClick={() => handleDeletePost(post.id)}>삭제</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostManager;
