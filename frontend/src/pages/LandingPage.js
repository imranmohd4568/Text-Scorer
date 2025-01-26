import React from "react";
import { Link } from "react-router-dom";


function LandingPage({ isDarkMode }) {
    return (
        <div className={`min-h-screen flex flex-col ${isDarkMode ? "text-white" : "text-gray-800" }`}>
        <header className="flex flex-col justify-center items-center py-20">
            <h1 className="text-5xl font-bold mb-4 font-sans">Score your Text !</h1>
            <p className="text-lg mb-5 max-w-3xl mt-12 text-center leading-relaxed font-light">
            Have you ever thought about the quality of your writing? Whether it's for an assignment, a blog, 
    or professional communication, <strong className="font-semibold">TextScorer</strong> App has got you covered. With Hugging Face models, 
    we analyze your content to identify coherence, structure, and educational value. And the best part? It’s simple to use. Input your text, and let our tools analyze and provide feedback in seconds. 
    Get ready to take your content to the next level! 🎯
            </p>
            
            <Link to="/analyze" className="flex group items-center">
            <button className={` cursor-pointer text-white px-6 py-3 mt-10 mb-6 rounded-full text-lg font-semibold hover:bg-blue-600 transition hover:scale-105 duration-200 ${isDarkMode ? "bg-gradient-to-r from-cyan-500 to-green-400" : "bg-gradient-to-r from-emerald-400 to-amber-200"}`}>
                Get Started 
            </button>
            
            </Link>
        </header>
        <section className={`flex flex-col items-center py-20 ${isDarkMode ? "text-white" : "text-gray-800"} `}>
            <h2 className="text-4xl font-bold mb-8">What’s this App About? 🤔</h2>
            <p className="text-lg max-w-4xl text-center mb-12">
            <strong>TextScorer</strong> is your personal AI-powered text analyzer. Whether you're writing
            for work, education, or just for fun, we help you understand how structured and meaningful your
            content is. Think of it as a grammar check on steroids! 💡
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
            <a
                href="https://huggingface.co/wajidlinux99/gibberish-text-detector"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 p-6 rounded-lg shadow-md hover:bg-red-100 transition-transform transform hover:scale-105 cursor-pointer"
            >
                <h3 className="text-2xl font-semibold text-black mb-4">
                Gibberish Detector 
                </h3>
                <p className="text-lg text-black">
                Is your text making sense? This model detects whether your writing is coherent or just plain
                gibberish. Perfect for spotting errors and keeping your content sharp! 
                </p>
            </a>
            <a
                href="https://huggingface.co/HuggingFaceFW/fineweb-edu-classifier"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 p-6 rounded-lg shadow-md hover:bg-red-100 transition-transform transform hover:scale-105 cursor-pointer"
            >
                <h3 className="text-2xl font-semibold text-black mb-4">
                Educational Text Classifier 
                </h3>
                <p className="text-lg text-black">
                Is your content educational or just entertaining? This model scores your text's educational
                value, making it perfect for teachers, students, and content creators! 
                </p>
            </a>
            </div>
        </section>
        </div>
    );
}

export default LandingPage;
