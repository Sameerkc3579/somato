import React from 'react';
import { FaLinkedinIn, FaInstagram, FaTwitter, FaYoutube, FaFacebookF, FaGlobe, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    // Exact columns from your screenshot
    const footerColumns = [
        {
            title: "ABOUT SOMATO",
            links: [
                { text: "Who We Are", url: "/about" },
                { text: "Blog", url: "/blog" },
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
                { text: "QuickBuy", url: "/quickbuy" },
                { text: "FoodRescue India", url: "/food-rescue" },
                { text: "HyperFresh", url: "/hyperfresh" },
                { text: "SomatoWorld", url: "/somato-world" }
            ],
        },
        {
            title: "FOR RESTAURANTS",
            links: [
                { text: "Partner With Us", url: "/partner" },
                { text: "Apps For You", url: "/apps" }
            ],
            // Nested column for Enterprise
            secondTitle: "FOR ENTERPRISE",
            secondLinks: [
                { text: "Somato For Business", url: "/business" }
            ]
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
        { icon: FaLinkedinIn, url: "#" },
        { icon: FaInstagram, url: "#" },
        { icon: FaTwitter, url: "#" },
        { icon: FaYoutube, url: "#" },
        { icon: FaFacebookF, url: "#" }
    ];

    return (
        <footer className="bg-[#F8F8F8] w-full pt-12 pb-6 border-t border-gray-200 mt-auto font-sans">
            <div className="max-w-[1100px] mx-auto px-4">
                
                {/* --- TOP ROW: Logo & Language/Country --- */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    
                    {/* Logo - Black Text */}
                    <Link to="/" className="mb-4 md:mb-0">
                        <span className="text-3xl font-black italic tracking-tighter text-black">
                            Somato
                        </span>
                    </Link>

                    {/* Dropdowns */}
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 border border-gray-300 rounded px-2 py-1.5 bg-transparent hover:bg-gray-50 transition text-slate-800 text-[13px] font-medium min-w-[100px] justify-between">
                            <div className="flex items-center gap-2">
                                {/* India Flag */}
                                <img 
                                    src="https://flagcdn.com/w20/in.png" 
                                    alt="India" 
                                    className="w-5 h-3.5 object-cover shadow-sm" 
                                />
                                <span>India</span>
                            </div>
                            <FaChevronDown size={10} />
                        </button>

                        <button className="flex items-center gap-2 border border-gray-300 rounded px-2 py-1.5 bg-transparent hover:bg-gray-50 transition text-slate-800 text-[13px] font-medium min-w-[100px] justify-between">
                            <div className="flex items-center gap-2">
                                <FaGlobe size={14} />
                                <span>English</span>
                            </div>
                            <FaChevronDown size={10} />
                        </button>
                    </div>
                </div>

                {/* --- LINKS SECTION --- */}
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-y-8 gap-x-2 mb-16">
                    
                    {/* First 4 Columns (Text Links) */}
                    {footerColumns.map((col, index) => (
                        <div key={index} className="flex flex-col">
                            <h6 className="text-[11px] font-bold text-black tracking-[0.15em] mb-3 uppercase">
                                {col.title}
                            </h6>
                            <ul className="space-y-1.5 mb-5">
                                {col.links.map((link, i) => (
                                    <li key={i}>
                                        <Link to={link.url} className="text-[13px] text-gray-500 hover:text-gray-900 font-normal no-underline">
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Optional Second Group in same column */}
                            {col.secondTitle && (
                                <>
                                    <h6 className="text-[11px] font-bold text-black tracking-[0.15em] mb-3 uppercase">
                                        {col.secondTitle}
                                    </h6>
                                    <ul className="space-y-1.5">
                                        {col.secondLinks.map((link, i) => (
                                            <li key={i}>
                                                <Link to={link.url} className="text-[13px] text-gray-500 hover:text-gray-900 font-normal no-underline">
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    ))}

                    {/* Column 5: Social & Apps */}
                    <div className="flex flex-col">
                        <h6 className="text-[11px] font-bold text-black tracking-[0.15em] mb-3 uppercase">
                            Social Links
                        </h6>
                        <div className="flex gap-1.5 mb-5">
                            {socialLinks.map((item, i) => (
                                <a 
                                    key={i} 
                                    href={item.url} 
                                    className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-white hover:opacity-80 transition"
                                >
                                    <item.icon size={10} />
                                </a>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2">
                            <a href="#" className="block w-[130px]">
                                <img 
                                    src="https://b.zmtcdn.com/data/webuikit/9f220f18820c810d79679659b9e592f71580978601.png" 
                                    alt="App Store" 
                                    className="w-full h-auto cursor-pointer"
                                />
                            </a>
                            <a href="#" className="block w-[130px]">
                                <img 
                                    src="https://b.zmtcdn.com/data/webuikit/23e930757c32d47cd7521798361596a59b9e592f71580978648.png" 
                                    alt="Google Play" 
                                    className="w-full h-auto cursor-pointer"
                                />
                            </a>
                        </div>
                    </div>

                </div>

                {/* --- BOTTOM SECTION --- */}
                <div className="border-t border-gray-300 pt-5">
                    <p className="text-[11px] text-gray-500 leading-5 font-normal">
                        By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2024 © Somato™ Ltd. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;