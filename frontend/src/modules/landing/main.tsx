import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-900">
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            <span className="bg-linear-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                Your Household's
                            </span>
                            <br />
                            <span className="text-white">Chief of Operations</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                            Edwardo autonomously manages your errands, groceries, meals, and time — with minimal input from you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                id="get-started"
                                onClick={() => navigate('/Dashboard')}
                                className="px-8 py-4 bg-linear-to--r from-teal-500 to-cyan-500 text-white rounded-lg text-lg font-semibold hover:shadow-xl hover:shadow-teal-500/50 transition-all"
                            >
                                Get Started Free
                            </button>
                            <button className="px-8 py-4 border-2 border-teal-400 text-teal-400 rounded-lg text-lg font-semibold hover:bg-teal-500/10 transition-all">
                                Watch Demo
                            </button>
                        </div>
                    </div>
                    <div className="mt-16 rounded-2xl bg-linear-to--br from-slate-800 to-slate-700 p-8 shadow-2xl border border-slate-600">
                        <div className="aspect-video bg-slate-900/50 backdrop-blur rounded-xl flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-24 h-24 bg-linear-to--br from-teal-500 to-cyan-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg shadow-teal-500/50">
                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-slate-400">Dashboard Preview Coming Soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Features Section */}
            <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-teal-900/50 text-teal-400 rounded-full text-sm font-semibold mb-4 border border-teal-500/30">Multi-Agent System</div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Coordinated AI Agents
                            <br />
                            <span className="bg-linear-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Working for You</span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Each agent specializes in a different area of your household, collaborating seamlessly to keep everything running
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="group p-8 rounded-2xl bg-slate-700/50 border border-slate-600 hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300">
                            <div className="w-14 h-14 bg-teal-900/50 group-hover:bg-linear-to-br group-hover:from-teal-500 group-hover:to-cyan-500 rounded-xl flex items-center justify-center mb-4 transition-all border border-teal-500/30">
                                <svg className="w-7 h-7 text-teal-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Context Understanding</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Learns from your calendar, location, receipts, and spending patterns to understand your lifestyle
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-linear-to-br from-slate-700/50 to-slate-600/50 border border-slate-600 hover:shadow-lg hover:shadow-cyan-500/10 transition-shadow">
                            <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/50">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Need Prediction</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Anticipates groceries, laundry, medication refills, and car maintenance before you run out
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-linear-to-br from-slate-700/50 to-slate-600/50 border border-slate-600 hover:shadow-lg hover:shadow-blue-500/10 transition-shadow">
                            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-500/50">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Smart Scheduling</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Creates and optimizes schedules around your existing commitments and preferences
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-linear-to-br from-slate-700/50 to-slate-600/50 border border-slate-600 hover:shadow-lg hover:shadow-teal-500/10 transition-shadow">
                            <div className="w-12 h-12 bg-linear-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-teal-500/50">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Autonomous Grocery System</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Manages meal planning, grocery lists, and automatic ordering based on your preferences
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-linear-to-br from-slate-700/50 to-slate-600/50 border border-slate-600 hover:shadow-lg hover:shadow-emerald-500/10 transition-shadow">
                            <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/50">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Price Comparison</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Automatically compares prices across stores and services to save you money
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-linear-to-br from-slate-700/50 to-slate-600/50 border border-slate-600 hover:shadow-lg hover:shadow-yellow-500/10 transition-shadow">
                            <div className="w-12 h-12 bg-linear-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/50">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Auto-Execution</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Books services, places orders, and handles tasks automatically with your approval
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* How It Works Section */}
            <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-teal-900/50 text-teal-400 rounded-full text-sm font-semibold mb-4 border border-teal-500/30">Simple Setup</div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Get Started in Minutes
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Set it up once, and let Edwardo handle the rest
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-teal-500 to-transparent"></div>
                        <div className="relative">
                            <div className="flex flex-col items-center text-center">
                                <div className="relative z-10 w-20 h-20 bg-linear-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-teal-500/50">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Connect Your Life</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Link your calendar, preferred stores, and services
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="flex flex-col items-center text-center">
                                <div className="relative z-10 w-20 h-20 bg-linear-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-teal-500/50">
                                    2
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Set Preferences</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Tell Edwardo your dietary needs, budget, and priorities
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="flex flex-col items-center text-center">
                                <div className="relative z-10 w-20 h-20 bg-linear-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-teal-500/50">
                                    3
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">AI Takes Over</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Agents analyze patterns and predict your needs
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="flex flex-col items-center text-center">
                                <div className="relative z-10 w-20 h-20 bg-linear-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-teal-500/50">
                                    4
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Relax & Review</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Approve actions or let Edwardo handle it all
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-900 via-teal-900 to-slate-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Reclaim Your Time?
                    </h2>
                    <p className="text-xl text-slate-300 mb-8">
                        Join households letting Edwardo handle the details
                    </p>
                    <button
                        onClick={() => navigate('/Dashboard')}
                        className="px-8 py-4 bg-linear-to-r from-teal-500 to-cyan-500 text-white rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-teal-500/50 transition-all"
                    >
                        Get Started Free
                    </button>
                    <p className="text-slate-400 mt-4">Free to use • No credit card required</p>
                </div>
            </section>
        </div>
    );
};

export default Landing;