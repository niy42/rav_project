import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function CustomSignOutButton() {
    const { signOut } = useClerk();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut(); // function from clerk
        { /*navigate('/sign-in')*/ } // Navigate to the sign-in page after signing out with Clerk
        navigate('/') // Navigate to the AuthScreen
    };

    return (
        <div className="flex gap-4 p-4 cursor-pointer" onClick={handleSignOut}>
            <img
                src="/images/logout.svg"
                alt="logout"
                width={24}
                height={24}
            />
            <p className="text-light-2 max-lg:hidden hover:text-gray-400 transition duration-300 text-white">Logout</p>
        </div>
    );
}