// Header.js
import React, { useState, useEffect } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { react } from '../assets/index';
import { CustomSignOutButton } from './';
import { UserButton } from "./";
import { useUser } from './UserContext';
import { useNavigate } from "react-router-dom";

const navLinks = [
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'Markets', url: '/markets' },
    { name: 'Wallet', url: '/wallet' },
    { name: 'Profile', url: '/profile' }
];

const Header = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const { user, searchItem, setSearchItem } = useUser();

    const navigate = useNavigate();

    const handleNavClick = (url) => (e) => {
        e.preventDefault();
        navigate(url);
        setToggleMenu(false);
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const toggleSearchBar = () => {
        setShowSearchBar(prevState => !prevState);
    };

    return (
        <header className="flex justify-between items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg p-4">
            <img src={react} alt='react' className="w-[52px] cursor-pointer" onClick={handleLogoClick} />
            <nav className="hidden md:flex space-x-4">
                {navLinks.map((link, index) => (
                    <a key={index} onClick={handleNavClick(link.url)} href={link.url} className="text-white hover:text-gray-400 transition duration-300">
                        {link.name}
                    </a>
                ))}
            </nav>

            <div className="flex relative md:hidden items-center space-x-2">
                <AiOutlineSearch fontSize={24} className="text-white cursor-pointer" onClick={toggleSearchBar} />
                {toggleMenu
                    ? <AiOutlineClose fontSize={28} className="text-white cursor-pointer" onClick={() => setToggleMenu(false)} />
                    : <HiMenuAlt4 fontSize={28} className="text-white cursor-pointer" onClick={() => setToggleMenu(true)} />
                }
                {toggleMenu && (
                    <ul className="z-20 fixed top-0 right-0 p-9 w-[70vw] h-screen shadow-2xl md:hidden list-none
                    flex flex-col justify-start items-end bg-gray-900 text-white animate-slide-in">
                        <li className="text-xl w-full mb-9 mt-1">
                            <AiOutlineClose onClick={() => setToggleMenu(false)} />
                        </li>
                        {navLinks.map(({ url, name }, index) => (
                            <li key={index} className="my-2 text-lg">
                                <a href={url} onClick={handleNavClick(url)} className="text-white hover:text-gray-400 transition duration-300">
                                    {name}
                                </a>
                            </li>
                        ))}
                        <CustomSignOutButton />
                        {user && <UserButton email={user.email} />}
                    </ul>
                )}
                {showSearchBar && (
                    <div className="absolute top-12 right-12 bg-gray-900 p-2 z-10">
                        <input
                            type="text"
                            value={searchItem}
                            onChange={(e) => setSearchItem(e.target.value)}
                            placeholder="Search..."
                            className="w-36 p-2 rounded-md bg-gray-100"
                        />
                    </div>
                )}
            </div>
            <div className="hidden md:flex items-center space-x-2">
                <input
                    type="text"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                    placeholder="Search..."
                    className="p-2 h-6 rounded-md bg-gray-100"
                />
            </div>
            <div className="md:flex items-center hidden gap-2">
                <CustomSignOutButton />
                {user && <UserButton email={user.email} />}
            </div>
        </header>
    );
};

export default Header;
