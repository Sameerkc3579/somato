import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { useAuth } from "../context/AuthContext";
// Firebase Imports
import { 
    RecaptchaVerifier, 
    signInWithPhoneNumber, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth";
import { auth } from "../firebase"; 

const Login = () => {
    // --- STATE ---
    const [modalType, setModalType] = useState("login"); 
    const [phoneNumber, setPhoneNumber] = useState("");
    const [name, setName] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation(); // Hook to read navigation state
    const { user, login } = useAuth();

    // --- 1. AUTO-SWITCH TAB BASED ON NAVBAR CLICK ---
    useEffect(() => {
        if (location.state?.mode === "signup") {
            setModalType("signup");
        } else {
            setModalType("login");
        }
    }, [location.state]); // Runs whenever the URL state changes

    // Redirect if already logged in
    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);

    // --- 2. SETUP RECAPTCHA ---
    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {}
            });
        }
    };

    // --- 3. SEND OTP ---
    const handleSendOtp = async () => {
        // Clean phone number
        let cleanNumber = phoneNumber.replace(/\D/g, '');
        if (cleanNumber.length === 12 && cleanNumber.startsWith('91')) cleanNumber = cleanNumber.substring(2);
        if (cleanNumber.length === 11 && cleanNumber.startsWith('0')) cleanNumber = cleanNumber.substring(1);

        if (cleanNumber.length !== 10) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }

        setIsLoading(true);
        setupRecaptcha();

        const formattedPhone = `+91${cleanNumber}`;
        const appVerifier = window.recaptchaVerifier;

        try {
            const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
            setConfirmationResult(confirmation);
            setModalType("otp"); 
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Failed to send OTP. " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // --- 4. VERIFY OTP ---
    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 6) return;
        setIsLoading(true);

        try {
            const result = await confirmationResult.confirm(otp);
            const firebaseUser = result.user;
            
            // CHECK: Is this a new user?
            const isNewUser = result._tokenResponse?.isNewUser;

            // If user tried to LOGIN but they are NEW, we can redirect or just set a default name
            const userName = name || (isNewUser ? "Foodie" : "Somato User");

            const userData = {
                name: userName, 
                email: "", 
                phone: firebaseUser.phoneNumber,
                image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.phoneNumber}`
            };

            login(userData); 
            navigate("/"); 

        } catch (error) {
            console.error("Invalid OTP", error);
            alert("Invalid OTP.");
        } finally {
            setIsLoading(false);
        }
    };

    // --- 5. GOOGLE LOGIN ---
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const googleUser = result.user;

            const userData = {
                name: googleUser.displayName,
                email: googleUser.email,
                phone: "",
                image: googleUser.photoURL,
            };

            login(userData); 
            navigate("/"); 
        } catch (err) {
            console.error("Google Login Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    if (user) return null;

    return (
        <div className="flex justify-center items-start min-h-[calc(100vh-64px)] py-10 bg-gray-50 font-sans">
            <div className="bg-white rounded-xl shadow-2xl w-[90%] md:w-[450px] overflow-hidden relative z-10 border border-gray-100">
                <div id="recaptcha-container"></div>

                {/* HEADER */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-white">
                    <h2 className="text-3xl text-gray-800 font-medium">
                        {modalType === "otp" ? "OTP Verification" : (modalType === "login" ? "Login" : "Sign Up")}
                    </h2>
                    {/* OPTIONAL: Close button if you used this as a modal */}
                </div>

                <div className="p-6">
                    {/* LOADING */}
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/80 flex justify-center items-center z-50 backdrop-blur-[1px]">
                            <span className="w-8 h-8 border-4 border-[#EF4F5F] border-t-transparent rounded-full animate-spin"></span>
                        </div>
                    )}
                    
                    {/* SIGNUP FIELDS */}
                    {modalType === "signup" && (
                        <div className="space-y-4 mb-4">
                            <input type="text" placeholder="Full Name" className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-[#EF4F5F]" onChange={(e) => setName(e.target.value)}/>
                            <input type="email" placeholder="Email" className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-[#EF4F5F]"/>
                        </div>
                    )}

                    {/* PHONE INPUT */}
                    {modalType !== "otp" && (
                        <div>
                            <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden mb-4 focus-within:border-[#EF4F5F]">
                                <span className="px-3 py-3 bg-gray-50 text-gray-600 font-bold border-r border-gray-200 flex items-center">+91</span>
                                <input type="tel" placeholder="Phone number" className="w-full px-4 py-3 bg-transparent outline-none" onChange={(e) => setPhoneNumber(e.target.value)}/>
                            </div>
                            <button onClick={handleSendOtp} className="w-full bg-[#EF4F5F] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#e04050] transition shadow-md shadow-red-100">
                                Send One Time Password
                            </button>
                        </div>
                    )}

                    {/* OTP INPUT */}
                    {modalType === "otp" && (
                        <div className="text-center">
                            <p className="text-gray-500 mb-6 text-sm">Enter the OTP sent to <span className="font-bold text-gray-800">+91 {phoneNumber}</span></p>
                            <input className="w-full tracking-[0.5em] text-center border border-gray-300 p-3 rounded-lg text-2xl focus:border-[#EF4F5F] outline-none font-bold mb-6" placeholder="••••••" maxLength="6" onChange={(e) => setOtp(e.target.value)}/>
                            <button onClick={handleVerifyOtp} className="w-full bg-[#EF4F5F] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#e04050] transition shadow-md">Verify & Login</button>
                            <button onClick={() => setModalType("login")} className="mt-4 text-xs text-[#EF4F5F] font-bold hover:underline">Change Phone Number</button>
                        </div>
                    )}

                    {/* GOOGLE & TOGGLE */}
                    {modalType !== "otp" && (
                        <>
                            <div className="flex items-center my-6">
                                <div className="h-px bg-gray-200 flex-1"></div>
                                <span className="px-3 text-gray-400 text-sm font-medium">or</span>
                                <div className="h-px bg-gray-200 flex-1"></div>
                            </div>
                            <button onClick={handleGoogleLogin} className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium text-lg hover:bg-gray-50 transition flex items-center justify-center gap-3">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
                                Continue with Google
                            </button>
                            <div className="mt-6 text-center text-gray-500 text-sm">
                                {modalType === "login" ? (
                                    <p>New to Somato? <span className="text-[#EF4F5F] font-bold cursor-pointer hover:underline" onClick={() => setModalType("signup")}>Create account</span></p>
                                ) : (
                                    <p>Already have an account? <span className="text-[#EF4F5F] font-bold cursor-pointer hover:underline" onClick={() => setModalType("login")}>Log in</span></p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;