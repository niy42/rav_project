import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';


function Footer() {
    return (
        <footer className="mt-32 p-4 flex flex-col md:flex-row text-gray-300 justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <p>&copy; 2024 Sisyphus. All rights reserved.</p>
            <div className="social-icons flex space-x-4">
                <a href="#" className="text-white hover:text-gray-400"><FaFacebookF /></a>
                <a href="#" className="text-white hover:text-gray-400"><FaTwitter /></a>
                <a href="#" className="text-white hover:text-gray-400"><FaLinkedinIn /></a>
                <a href="#" className="text-white hover:text-gray-400"><FaInstagram /></a>
            </div>
            <a href="#" className="text-white hover:text-gray-300">Contact Us</a>
        </footer>
    );
}

export default Footer;