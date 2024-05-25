import React, { useState } from 'react';
import axios from 'axios';
import md5 from 'md5';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';  // Adjust the path according to your project structure

const AuthScreen = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [email, setEmail] = useState('');
    const [gravatarUrl, setGravatarUrl] = useState('');
    const [githubAvatarUrl, setGithubAvatarUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email) {
            setLoading(true);
            const gravatarUrl = await fetchGravatar(email);
            const githubAvatarUrl = await fetchGithubAvatar(email);
            const userData = { email, gravatarUrl, githubAvatarUrl };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData)); // store object in browser storage
            setLoading(false);
            navigate('/protectedpage');
        }
    };

    const fetchGravatar = async (email) => {
        const hash = md5(email.trim().toLowerCase());
        const url = `https://www.gravatar.com/avatar/${hash}`;
        setGravatarUrl(url);

        console.log("GravatarUrl: ", url);
        return url;
    };

    const fetchGithubAvatar = async (email) => {
        try {
            const response = await axios.get(`https://api.github.com/search/users?q=${email}+in:email`);
            if (response.data.items.length > 0) {
                const avatarUrl = response.data.items[0].avatar_url;
                setGithubAvatarUrl(avatarUrl);

                console.log('GithubUrl: ', avatarUrl);
                return avatarUrl;
            } else {
                return '';
            }
        } catch (error) {
            console.error('Error fetching GitHub avatar:', error);
            return '';
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-600">
            <div className="w-full max-w-md p-4 bg-gray-400 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className="mt-1 bg-gray-200 block outline-none w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-150 ease-in-out" type="submit">
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AuthScreen;
