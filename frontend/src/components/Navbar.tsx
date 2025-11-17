import { type FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import type { RootState } from '../store';

const Navbar: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/Home" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-linear-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/50">
                            <span className="text-white font-bold text-xl">E</span>
                        </div>
                        <span className="text-2xl font-bold bg-linear-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                            Edwardo
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/Home#features" className="text-gray-700 hover:text-teal-600 transition-colors">
                            Features
                        </Link>
                        <Link to="/Home#how-it-works" className="text-gray-700 hover:text-teal-600 transition-colors">
                            How It Works
                        </Link>
                        {isAuthenticated ? (
                            <button
                                onClick={() => navigate('/Dashboard')}
                                className="px-6 py-2 bg-linear-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all"
                            >
                                Dashboard
                            </button>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => navigate('/Register')}
                                    className="px-6 py-2 bg-linear-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all"
                                >
                                    Get Started
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 py-4 space-y-3">
                        <Link to="/Home#features" className="block text-gray-700 hover:text-teal-600 transition-colors">
                            Features
                        </Link>
                        <Link to="/Home#how-it-works" className="block text-gray-700 hover:text-teal-600 transition-colors">
                            How It Works
                        </Link>
                        {isAuthenticated ? (
                            <button
                                onClick={() => navigate('/Dashboard')}
                                className="w-full px-6 py-2 bg-linear-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all"
                            >
                                Dashboard
                            </button>
                        ) : (
                            <div className="space-y-2">
                                <button
                                    onClick={() => navigate('/Login')}
                                    className="w-full px-6 py-2 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 font-semibold transition-all"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => navigate('/Register')}
                                    className="w-full px-6 py-2 bg-linear-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all"
                                >
                                    Get Started
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;