// src/components/Board.js
import React from 'react';

const Board = ({ user }) => {
    return (
        <div>
            <h2>{user.displayName || user.email}님의 게시판</h2>
        </div>
    );
};

export default Board;
