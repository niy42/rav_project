import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';
import './UserButton.css';

const UserButton = ({ email }) => {
    const [gravatarUrl, setGravatarUrl] = useState('');
    const [githubAvatarUrl, setGithubAvatarUrl] = useState('');

    useEffect(() => {
        if (email) {
            fetchGravatar(email);
            fetchGithubAvatar(email);
            console.log(email);
        }
    }, [email]);

    const fetchGravatar = (email) => {
        const hash = md5(email.trim().toLowerCase());
        const url = `https://www.gravatar.com/avatar/${hash}`;
        setGravatarUrl(url);
    };

    const fetchGithubAvatar = async (email) => {
        try {
            const response = await axios.get(`https://api.github.com/search/users?q=${email}+in:email`);
            if (response.data.items.length > 0) {
                const avatarUrl = response.data.items[0].avatar_url;
                setGithubAvatarUrl(avatarUrl);
            }
        } catch (error) {
            console.error('Error fetching GitHub avatar:', error);
        }
    };

    return (
        <button className="user-button">
            <img
                src={githubAvatarUrl || gravatarUrl || 'https://via.placeholder.com/40'} // Fallback image
                alt="User"
                className="w-10 h-10 rounded-full mr-2"
            />
        </button>
    );
};

export default UserButton;