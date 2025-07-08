import React, { useState, useEffect } from 'react'
import { Clock, ArrowRight, Sparkles } from 'lucide-react'

// Mock Link component for demonstration
const Link = ({ to, className, children, ...props }) => (
    <a href={to} className={className} {...props}>
        {children}
    </a>
)

const SessionOut = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [particles, setParticles] = useState([])

    useEffect(() => {
        // Trigger entrance animation
        setTimeout(() => setIsVisible(true), 100)
        
        // Generate floating particles
        const particleArray = []
        for (let i = 0; i < 15; i++) {
            particleArray.push({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 3,
                duration: 4 + Math.random() * 3
            })
        }
        setParticles(particleArray)
    }, [])

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-blue-400/30 dark:bg-blue-300/20 rounded-full animate-pulse"
                        style={{
                            left: `${particle.left}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`,
                            top: '100%',
                            transform: 'translateY(-100vh)'
                        }}
                    />
                ))}
            </div>

            {/* Floating gradient orbs */}
            <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Main content container */}
            <div className={`relative z-10 flex flex-col items-center max-w-2xl mx-auto px-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
                
                {/* Header section with enhanced styling */}
                <div className={`flex flex-col gap-6 items-center text-center mb-8 transition-all duration-700 delay-200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                    {/* Clock icon with animation */}
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-bounce">
                            <Clock className="w-8 h-8 text-white" />
                        </div>
                        <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-pulse" />
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 dark:from-white dark:to-blue-300 bg-clip-text text-transparent leading-tight">
                        Session Out
                    </h1>
                    
                    <div className="max-w-md">
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Your session has expired for security reasons. Please log in again to continue.
                        </p>
                        
                        {/* Enhanced login link */}
                        <Link 
                            to="/login"
                            className="group inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-blue-500/25"
                        >
                            <span>Log In</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>

                {/* Image section with enhanced styling */}
                <div className={`relative transition-all duration-700 delay-500 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                    {/* Placeholder for session SVG with enhanced styling */}
                    <div className="relative">
                        <div className="w-72 h-72 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20">
                            {/* SVG placeholder with animation */}
                            <div className="w-48 h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center animate-pulse">
                                <Clock className="w-24 h-24 text-white/80" />
                            </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
                    </div>
                </div>

                {/* Additional helpful text */}
                <div className={`mt-8 text-center transition-all duration-700 delay-700 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        For your security, sessions automatically expire after a period of inactivity.
                    </p>
                </div>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue-500/5 to-transparent" />
        </div>
    )
}

export default SessionOut