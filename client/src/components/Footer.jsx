import React from 'react';
import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    // Column data for the footer links, now with all fictional names
    const footerColumns = [
        {
            title: "ABOUT SOMATO",
            links: [
                { text: "Who We Are", url: "/about" }, 
                { text: "Blog", url: "https://blog.somato-clone.com", isExternal: true }, 
                { text: "Work With Us", url: "/careers" }, 
                { text: "Investor Relations", url: "/investors" }, 
                { text: "Report Fraud", url: "/report-fraud" }, 
                { text: "Press Kit", url: "/press" }, 
                { text: "Contact Us", url: "/contact" }
            ],
        },
        {
            title: "SOMAVERSE",
            links: [
                { text: "Somato", url: "/" }, 
                { text: "QuickBuy", url: "https://www.quickbuy-clone.com", isExternal: true }, 
                { text: "FoodRescue India", url: "https://www.foodrescue-clone.org", isExternal: true }, 
                { text: "HyperFresh", url: "https://www.hyperfresh-clone.com", isExternal: true }, 
                { text: "SomatoWorld", url: "/somato-world" }
            ],
        },
        {
            title: "FOR RESTAURANTS",
            links: [
                { text: "Partner With Us", url: "/partner" }, 
                { text: "Apps For You", url: "/apps" }
            ],
            secondTitle: "FOR ENTERPRISE",
            secondLinks: [
                { text: "Somato For Business", url: "/enterprise" }
            ],
        },
        {
            title: "LEARN MORE",
            links: [
                { text: "Privacy", url: "/privacy" }, 
                { text: "Security", url: "/security" }, 
                { text: "Terms", url: "/terms" }, 
                { text: "Sitemap", url: "/sitemap" }
            ],
        },
    ];

    const socialLinks = [
        { icon: FaLinkedin, url: "https://www.linkedin.com/company/somato-clone" },
        { icon: FaInstagram, url: "https://www.instagram.com/somato-clone" },
        { icon: FaTwitter, url: "https://twitter.com/somato-clone" },
        { icon: FaYoutube, url: "https://www.youtube.com/user/somato-clone" },
        { icon: FaFacebook, url: "https://www.facebook.com/somato-clone" }
    ];

    const handleInternalClick = (e, url) => {
        e.preventDefault();
        alert(`Navigating to simulated page: ${url}`);
        // In a real app, you would use React Router's navigate function here.
    };

    return (
        <footer className="bg-gray-100 border-t border-gray-200 py-10 md:py-16">
            <div className="max-w-6xl mx-auto px-4">
                
                {/* --- TOP ROW: Logo and Location/Language --- */}
                <div className="flex justify-between items-center mb-10 border-b border-gray-300 pb-8">
                    <Link to="/" className="text-3xl font-bold text-zomatoRed no-underline cursor-pointer">
                        Somato
                    </Link>
                    
                    <div className="flex items-center space-x-4">
                        <select className="border border-gray-400 p-2 rounded-lg text-sm bg-white cursor-pointer">
                            <option>India</option>
                            <option>USA</option>
                            <option>UK</option>
                        </select>
                        <select className="border border-gray-400 p-2 rounded-lg text-sm bg-white cursor-pointer">
                            <option>English</option>
                            <option>Hindi</option>
                        </select>
                    </div>
                </div>

                {/* --- MAIN LINKS GRID --- */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
                    
                    {footerColumns.map((col, colIndex) => (
                        <div key={colIndex} className="space-y-4">
                            <h3 className="text-xs font-extrabold text-gray-700 tracking-wider mb-2">{col.title}</h3>
                            <ul className="space-y-2">
                                {col.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        {link.isExternal ? (
                                            <a 
                                                href={link.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-sm text-gray-600 hover:text-gray-900 transition duration-150"
                                            >
                                                {link.text}
                                            </a>
                                        ) : (
                                            <Link 
                                                to={link.url} 
                                                onClick={(e) => link.url !== "/" && handleInternalClick(e, link.url)}
                                                className="text-sm text-gray-600 hover:text-gray-900 transition duration-150"
                                            >
                                                {link.text}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {/* Second mini-column */}
                            {col.secondTitle && (
                                <div className="mt-6 space-y-2">
                                    <h3 className="text-xs font-extrabold text-gray-700 tracking-wider mb-2">{col.secondTitle}</h3>
                                    <ul className="space-y-2">
                                        {col.secondLinks.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                 <Link 
                                                    to={link.url} 
                                                    onClick={(e) => handleInternalClick(e, link.url)}
                                                    className="text-sm text-gray-600 hover:text-gray-900 transition duration-150"
                                                >
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* --- SOCIAL MEDIA COLUMN --- */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-extrabold text-gray-700 tracking-wider mb-2">SOCIAL LINKS</h3>
                        <div className="flex space-x-4 text-xl text-gray-700">
                            {socialLinks.map((social, index) => (
                                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 cursor-pointer">
                                    <social.icon />
                                </a>
                            ))}
                        </div>
                        
                        <div className="space-y-4 pt-4">
                             {/* App Store Buttons - Links are kept generic */}
                             <a href="https://apps.apple.com/us/app/somato-clone/id434689440" target="_blank" rel="noopener noreferrer">
                                <img 
                                    src="https://b.zmtcdn.com/data/webuikit/9f220f18820c810d79679659b9e592f71580978601.png"
                                    alt="Download on the App Store"
                                    className="w-32 cursor-pointer"
                                />
                             </a>
                             <a href="https://play.google.com/store/apps/details?id=com.somato.android.clone" target="_blank" rel="noopener noreferrer">
                                <img 
                                    src="https://b.zmtcdn.com/data/webuikit/23e930757c32d47cd7521798361596a59b9e592f71580978648.png"
                                    alt="Get it on Google Play"
                                    className="w-32 cursor-pointer"
                                />
                             </a>
                        </div>
                    </div>

                </div>

                {/* --- COPYRIGHT --- */}
                <div className="mt-16 pt-8 border-t border-gray-300">
                    <p className="text-xs text-gray-500 leading-relaxed max-w-4xl">
                        By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy, and Content Policies. All trademarks are properties of their respective owners. 2024 © Somato Clone. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;