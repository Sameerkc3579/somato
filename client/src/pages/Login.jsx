import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    // State
    const [modalType, setModalType] = useState("login");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { user, login } = useAuth(); // Use context for auth actions

    // If user is already logged in, redirect to home
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);


    // --- 1. Phone/OTP Logic (Simulation) ---
    const handleSendOtp = () => {
        if (phoneNumber.length < 10) return alert("Enter valid phone number");
        setModalType("otp");
    };

    const handleVerifyOtp = () => {
        // SIMULATED LOGIN
        const loggedInUser = {
            name: name || "Somato Lover",
            phone: phoneNumber,
            image: "https://b.zmtcdn.com/data/user_profile_pictures/a5c/0b1c67677d2427517616238370782a5c.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A"
        };
        
        login(loggedInUser);
        navigate("/"); 
    };

    // --- 2. Google Login Logic ---
    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            try {
                // Step A: Get User Info from Google
                const accessToken = tokenResponse.access_token;
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                const googleUser = {
                    name: res.data.name, 
                    email: res.data.email,
                    image: res.data.picture,
                };

                // Step B: 🔥 NEW - Save User to Database (Server)
                try {
                    // ⚠️ IMPORTANT: If testing on Mobile, replace 'localhost' with your Laptop IP (e.g., http://192.168.1.5:4000)
                    // If deploying to Vercel, use your Vercel URL here.
                    await axios.post("http://localhost:4000/api/users", googleUser);
                    console.log("✅ User saved to database successfully!");
                } catch (dbError) {
                    console.error("❌ Failed to save user to DB (Server might be offline):", dbError);
                    // We continue anyway so the user can still login locally
                }

                // Step C: Login locally & Redirect
                login(googleUser);
                setIsLoading(false);
                navigate("/"); 
                
            } catch (err) {
                console.error("Google Login Error:", err);
                setIsLoading(false);
                alert("Google Login Failed.");
            }
        },
        onError: (error) => console.log("Login Failed:", error),
    });

    if (user) return null;

    return (
        <div className="flex justify-center items-start min-h-[calc(100vh-64px)] py-10 bg-gray-50">
            <div className="bg-white rounded-xl shadow-2xl w-[90%] md:w-[450px] overflow-hidden relative z-10">
                
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-3xl text-gray-800 font-medium">
                        {modalType === "otp" ? "OTP Verification" : (modalType === "login" ? "Login" : "Sign Up")}
                    </h2>
                </div>

                <div className="p-6">
                    {/* Loading Spinner */}
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/70 flex justify-center items-center z-20">
                            <span className="w-8 h-8 border-4 border-zomatoRed border-t-transparent rounded-full animate-spin inline-block"></span>
                        </div>
                    )}
                    
                    {/* Signup Name Input */}
                    {modalType === "signup" && (
                        <div className="space-y-4 mb-4">
                            <input type="text" placeholder="Full Name" className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-zomatoRed" onChange={(e) => setName(e.target.value)}/>
                            <input type="email" placeholder="Email (Optional)" className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-zomatoRed"/>
                        </div>
                    )}

                    {/* Phone Input */}
                    {modalType !== "otp" && (
                        <div>
                            <input 
                                type="number" 
                                placeholder="Phone number" 
                                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-zomatoRed mb-4"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <button onClick={handleSendOtp} className="w-full bg-zomatoRed text-white py-3 rounded-lg font-bold text-lg hover:bg-red-600 transition">
                                Send One Time Password
                            </button>
                        </div>
                    )}

                    {/* OTP Inputs */}
                    {modalType === "otp" && (
                        <div className="text-center">
                            <p className="text-gray-500 mb-6">Enter the OTP sent to <span className="font-bold">+91 {phoneNumber}</span></p>
                            <div className="flex gap-3 justify-center mb-6">
                                {[1,2,3,4,5,6].map((_,i) => (
                                    <input key={i} className="w-10 h-12 border border-gray-300 rounded text-center text-xl focus:border-zomatoRed outline-none" maxLength="1"/>
                                ))}
                            </div>
                            <button onClick={handleVerifyOtp} className="w-full bg-zomatoRed text-white py-3 rounded-lg font-bold text-lg hover:bg-red-600 transition">
                                Verify & Login
                            </button>
                        </div>
                    )}

                    {/* Google Button */}
                    {modalType !== "otp" && (
                        <>
                            <div className="flex items-center my-6">
                                <div className="h-px bg-gray-300 flex-1"></div>
                                <span className="px-3 text-gray-400 text-sm">or</span>
                                <div className="h-px bg-gray-300 flex-1"></div>
                            </div>

                            <button 
                                onClick={() => loginWithGoogle()}
                                disabled={isLoading}
                                className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium text-lg hover:bg-gray-50 transition flex items-center justify-center gap-3"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                                Continue with Google
                            </button>
                        </>
                    )}

                    {/* Toggle Link */}
                    {modalType !== "otp" && (
                        <div className="mt-6 text-center text-gray-500">
                            {modalType === "login" ? (
                                <p>New to Somato? <span className="text-zomatoRed cursor-pointer" onClick={() => setModalType("signup")}>Create account</span></p>
                            ) : (
                                <p>Already have an account? <span className="text-zomatoRed cursor-pointer" onClick={() => setModalType("login")}>Log in</span></p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;