import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Search, Sparkles, ChefHat, Heart, Star, Zap, Map, TrendingUp, Award, Quote, Play, Check, Users, Globe, Apple, Smartphone, Facebook, Instagram, Twitter, Linkedin, Youtube, Mail } from 'lucide-react';

// Placeholder for the QR Code image
const qrCode = "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg";

export default function LandingPage({ onGetStarted }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

useEffect(() => {
    // Optimization: Only add listener if window width is > 768px (Desktop)
    if (window.innerWidth > 768) {
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const floatingCards = [
    { image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400', rotate: -5, delay: 0 },
    { image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', rotate: 5, delay: 0.2 },
    { image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', rotate: -3, delay: 0.4 },
    { image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400', rotate: 8, delay: 0.6 },
    { image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', rotate: -8, delay: 0.8 },
    { image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', rotate: 3, delay: 1 },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Food Blogger',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      text: 'Somato has completely transformed how I discover new restaurants. The curated collections are absolutely perfect!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Restaurant Critic',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      text: 'The most comprehensive food discovery platform I\'ve ever used. Real reviews from real people make all the difference.',
      rating: 5
    },
    {
      name: 'Emma Davis',
      role: 'Food Enthusiast',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      text: 'I love how easy it is to find exactly what I\'m craving. The search is lightning fast and results are always spot on!',
      rating: 5
    }
  ];

  const showcaseImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
    'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=600',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600',
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden font-sans">
      
      {/* Cursor Follower Glow */}
      <motion.div
        className="hidden md:block fixed w-96 h-96 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Floating Gradient Blobs */}
      <div className="hidden md:block fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-orange-300/20 via-pink-300/20 to-purple-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 80, -60, 0],
            scale: [1, 0.8, 1.3, 1],
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-gradient-to-r from-blue-300/20 via-cyan-300/20 to-teal-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-red-300/20 via-orange-300/20 to-yellow-300/20 rounded-full blur-3xl"
        />
      </div>

      {/* Animated Gradient Mesh Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-100 via-transparent to-transparent"></div>
      </div>

      {/* Hero Section with Split Design */}
      <section className="relative min-h-screen">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Content */}
          <div className="relative flex items-center justify-center px-6 lg:px-12 py-20 bg-white">
            <div className="max-w-xl">
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-full px-4 py-2 mb-6"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-orange-500" />
                </motion.div>
                <span className="text-sm text-orange-700">🎉 Join 10M+ Happy Food Lovers</span>
              </motion.div>

              {/* Animated Logo/Brand */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block"
                >
                  <span className="text-7xl md:text-8xl italic bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent font-black">
                    somato
                  </span>
                </motion.div>
              </motion.div>

              {/* Headline with Typing Effect */}
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl text-slate-900 mb-6 leading-tight font-bold"
              >
                Discover Food
                <br />
                <motion.span 
                  className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: '200% auto' }}
                >
                  Worth Traveling For
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-slate-600 mb-10 leading-relaxed"
              >
                From hidden gems to celebrity chef restaurants, explore curated collections 
                of the world's best dining experiences.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  onClick={onGetStarted}
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(249, 115, 22, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full shadow-lg overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3 font-bold">
                    <Search className="w-5 h-5" />
                    <span className="text-lg">Explore Now</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Particle Effect on Hover */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      initial={{ opacity: 0, x: 0, y: 0 }}
                      whileHover={{
                        opacity: [0, 1, 0],
                        x: Math.cos(i * 60) * 50,
                        y: Math.sin(i * 60) * 50,
                      }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                    />
                  ))}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onGetStarted}
                  className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-full hover:border-orange-500 hover:text-orange-500 transition-colors shadow-lg font-bold"
                >
                  <Play className="w-5 h-5" />
                  <span className="text-lg">Watch Demo</span>
                </motion.button>
              </motion.div>

              {/* Animated Stats Counter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-16 grid grid-cols-3 gap-6"
              >
                {[
                  { value: 50, suffix: 'K+', label: 'Restaurants' },
                  { value: 100, suffix: '+', label: 'Cities' },
                  { value: 10, suffix: 'M+', label: 'Users' }
                ].map((stat, index) => (
                  <AnimatedCounter key={stat.label} {...stat} delay={1 + index * 0.1} />
                ))}
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-12 flex flex-wrap items-center gap-6"
              >
                {[
                  { icon: Check, text: 'Verified Reviews' },
                  { icon: Award, text: 'Top Rated' },
                  { icon: Globe, text: 'Global Coverage' }
                ].map((badge) => (
                  <div key={badge.text} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <badge.icon className="w-3 h-3 text-green-600" />
                    </div>
                    <span>{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              style={{ y: y1 }}
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-30"
            />
          </div>

          {/* Right Side - Floating Food Images */}
          <div className="relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-12">
            <div className="relative w-full h-full max-w-2xl">
              {floatingCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotate: card.rotate }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -20, 0],
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: card.delay },
                    scale: { duration: 0.6, delay: card.delay },
                    y: { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: card.delay }
                  }}
                  whileHover={{ scale: 1.15, rotate: 0, zIndex: 10 }}
                  className="absolute w-48 h-48 rounded-3xl shadow-2xl overflow-hidden cursor-pointer group"
                  style={{
                    top: `${Math.sin(index * 1.5) * 40 + 30}%`,
                    left: `${Math.cos(index * 1.5) * 40 + 30}%`,
                  }}
                >
                  <img 
                    src={card.image} 
                    alt="Food"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all" />
                  
                  {/* Heart Icon on Hover */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Heart className="w-5 h-5 text-red-500" />
                  </motion.div>
                </motion.div>
              ))}

              {/* Center Animated Element */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-2xl opacity-20" />
                <Sparkles className="w-16 h-16 text-orange-400 opacity-40" />
              </motion.div>
            </div>

            <motion.div
              style={{ y: y2 }}
              className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30"
            />
          </div>
        </div>
      </section>

      {/* Animated Marquee Section */}
      <section className="relative py-8 bg-slate-900 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-12">
              {['Trending Spots', 'Top Rated', 'Newly Opened', 'Veggie Friendly', 'Late Night', 'Fine Dining', 'Quick Bites', 'Hidden Gems'].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-orange-400" />
                  <span className="text-xl text-white font-bold">{text}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Showcase Gallery Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-white to-slate-50">
        {/* Decorative Floating Shapes */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 w-20 h-20 border-4 border-orange-200 rounded-2xl opacity-20"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-10 w-16 h-16 border-4 border-red-200 rounded-full opacity-20"
        />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <ChefHat className="w-16 h-16 text-orange-500" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl text-slate-900 mb-6 font-bold">
              Explore Stunning Venues
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From cozy cafes to Michelin-star restaurants, discover places that tell a story
            </p>
          </motion.div>

          {/* Image Grid with Stagger */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {showcaseImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group aspect-square rounded-3xl overflow-hidden shadow-lg cursor-pointer"
              >
                <img 
                  src={image} 
                  alt={`Restaurant ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Rating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white"
                >
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">4.{Math.floor(Math.random() * 3) + 7}</span>
                  </div>
                  <Heart className="w-6 h-6" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="relative py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl text-slate-900 mb-6 font-bold">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to help you discover your next favorite meal
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Feature Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="md:col-span-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-10 text-white relative overflow-hidden group"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1.2, 1, 1.2]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"
              />
              <ChefHat className="w-14 h-14 mb-6 relative z-10" />
              <h3 className="text-3xl md:text-4xl mb-4 relative z-10 font-bold">Curated Collections</h3>
              <p className="text-white/90 text-lg max-w-lg relative z-10">
                Expertly curated restaurant collections for every taste, occasion, and craving. From trending spots to hidden gems.
              </p>
            </motion.div>

            {/* Small Feature Card */}
            <FeatureCard
              icon={Map}
              title="Live Maps"
              description="Find restaurants near you with interactive maps"
              gradient="from-blue-500 to-cyan-500"
              delay={0.1}
            />

            {/* Small Feature Card */}
            <FeatureCard
              icon={Heart}
              title="Save Favorites"
              description="Keep track of places you want to try"
              gradient="from-purple-500 to-pink-500"
              delay={0.2}
            />

            {/* Medium Feature Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10 }}
              className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-white relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Star className="w-14 h-14 mb-6 text-yellow-400" />
                  <h3 className="text-3xl md:text-4xl mb-4 font-bold">Verified Reviews</h3>
                  <p className="text-white/80 text-lg max-w-lg">
                    Read authentic reviews from real food lovers. Make informed decisions with trusted ratings and detailed feedback.
                  </p>
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="hidden lg:block"
                >
                  <div className="flex gap-2">
                    {[5, 4.5, 5, 4, 5].map((rating, i) => (
                      <motion.div 
                        key={i} 
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                        whileHover={{ scale: 1.1, y: -5 }}
                      >
                        <div className="text-2xl mb-1 font-bold">{rating}</div>
                        <Star className="w-4 h-4 text-yellow-400 mx-auto fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <FeatureCard
              icon={TrendingUp}
              title="What's Hot"
              description="Discover trending restaurants in real-time"
              gradient="from-green-500 to-emerald-500"
              delay={0.4}
            />

            <FeatureCard
              icon={Award}
              title="Top Rated"
              description="Best of the best, handpicked for you"
              gradient="from-amber-500 to-orange-500"
              delay={0.5}
            />

            <FeatureCard
              icon={Zap}
              title="Instant Search"
              description="Lightning-fast search results"
              gradient="from-red-500 to-pink-500"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl text-slate-900 mb-6 font-bold">
              Loved By Food Enthusiasts
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See what our community has to say about their experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow relative"
              >
                <Quote className="w-10 h-10 text-orange-500/20 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-slate-700 mb-6 leading-relaxed font-medium">{testimonial.text}</p>

                <div className="flex items-center gap-4">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-slate-900 font-bold">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-2xl opacity-50" />
                <Sparkles className="relative w-20 h-20 text-orange-500" />
              </div>
            </motion.div>

            <h2 className="text-5xl md:text-7xl text-slate-900 mb-8 font-bold">
              Start Your Culinary
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Adventure Today
              </span>
            </h2>

            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
              Join millions discovering the best restaurants, cafes, and food experiences around the world
            </p>

            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(249, 115, 22, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-6 rounded-full text-xl shadow-2xl relative group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3 font-bold">
                <Search className="w-6 h-6" />
                <span>Explore Restaurants</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.span>
              </span>

              {/* Animated Gradient Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: '200% auto' }}
              />

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.button>

            {/* Mini Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 flex flex-wrap justify-center gap-8 text-slate-600"
            >
              {[
                { icon: Check, text: 'Free to use' },
                { icon: Users, text: '10M+ users' },
                { icon: Award, text: 'Trusted reviews' }
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 font-medium">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-green-600" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_var(--tw-gradient-stops))] from-red-500 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl text-white mb-6 font-bold">
              Get the App
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Download Somato on your device and discover amazing food experiences on the go
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* iOS App Download */}
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Apple className="w-10 h-10 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-slate-400 mb-1">Download on the</div>
                  <div className="text-2xl text-white font-bold">App Store</div>
                </div>
                <ArrowRight className="w-6 h-6 text-white ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>

            {/* Android App Download */}
            <motion.a
              href="#"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-slate-400 mb-1">Get it on</div>
                  <div className="text-2xl text-white font-bold">Google Play</div>
                </div>
                <ArrowRight className="w-6 h-6 text-white ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          </div>

          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <p className="text-slate-400 mb-6">Scan to download</p>
            <motion.div 
              className="inline-block bg-white p-6 rounded-3xl shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={qrCode} 
                alt="Download Somato App QR Code"
                className="w-40 h-40 rounded-2xl"
              />
            </motion.div>
            <p className="text-slate-500 text-sm mt-4">Point your camera at the QR code</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <span className="text-5xl italic bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent font-black">
                  somato
                </span>
              </motion.div>
              <p className="text-slate-400 mb-6 max-w-sm">
                Discover the best restaurants, cafes, and food experiences around the world. Your culinary adventure starts here.
              </p>
              
              {/* Social Media Links */}
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: 'https://instagram.com', color: 'from-pink-500 to-purple-500' },
                  { icon: Facebook, href: 'https://facebook.com', color: 'from-blue-600 to-blue-500' },
                  { icon: Twitter, href: 'https://twitter.com', color: 'from-cyan-500 to-blue-500' },
                  { icon: Youtube, href: 'https://youtube.com', color: 'from-red-600 to-red-500' },
                  { icon: Linkedin, href: 'https://linkedin.com', color: 'from-blue-700 to-blue-600' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="group relative w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <social.icon className="w-5 h-5 text-slate-400 group-hover:text-white relative z-10 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg mb-6 font-bold">Company</h3>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Press', 'Blog', 'Contact'].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors inline-flex items-center gap-2 group">
                      <span>{item}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* For Restaurants */}
            <div>
              <h3 className="text-lg mb-6 font-bold">For Restaurants</h3>
              <ul className="space-y-3">
                {['Add Restaurant', 'Business App', 'Restaurant Dashboard', 'Advertise', 'Marketing Tools'].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors inline-flex items-center gap-2 group">
                      <span>{item}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg mb-6 font-bold">Support</h3>
              <ul className="space-y-3">
                {['Help Center', 'Safety', 'Terms of Service', 'Privacy Policy', 'Sitemap'].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors inline-flex items-center gap-2 group">
                      <span>{item}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-12 mb-12"
          >
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl mb-4 font-bold">Stay in the loop</h3>
              <p className="text-slate-400 mb-6">
                Subscribe to our newsletter for the latest food trends, restaurant openings, and exclusive offers.
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 rounded-full hover:shadow-lg transition-shadow font-bold"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">
                © 2024 Somato. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-slate-500 hover:text-orange-500 text-sm transition-colors">
                  Terms
                </a>
                <a href="#" className="text-slate-500 hover:text-orange-500 text-sm transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-slate-500 hover:text-orange-500 text-sm transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Animated Counter Component
function AnimatedCounter({ value, suffix, label, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="text-center lg:text-left">
      <div className="text-3xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-1 font-bold">
        {displayValue}{suffix}
      </div>
      <div className="text-sm text-slate-500 font-medium">{label}</div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, gradient, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className="bg-white border-2 border-slate-200 rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500 transition-colors"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 10 }}
        className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 relative z-10`}
      >
        <Icon className="w-7 h-7 text-white" />
      </motion.div>
      <h3 className="text-2xl text-slate-900 mb-3 relative z-10 font-bold">{title}</h3>
      <p className="text-slate-600 relative z-10">{description}</p>
      
      {/* Hover Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.05 }}
        className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
      />
    </motion.div>
  );
}