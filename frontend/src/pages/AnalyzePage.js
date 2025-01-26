import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from "chart.js";

    
    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function AnalyzePage() {
    const [inputText, setInputText] = useState("");
    const [response, setResponse] = useState(null); 
    const [history, setHistory] = useState([]); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const fetchHistory = async () => {
        try {
            const res = await fetch("http://localhost:8001/api/history");
            const data = await res.json();
            setHistory(data); 
        } catch (error) {
            console.error("Error fetching history:", error);
        }
        };

        fetchHistory();
    }, []); 

    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (!inputText.trim()) {
        toast.error("Please enter some text to analyze!"); 
        return;
        }
        setLoading(true); 

        try {
        const res = await fetch("http://localhost:8001/api/analyze", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: inputText }),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setResponse(data); 
        const updatedHistory = await fetch("http://localhost:8001/api/history");
        setHistory(await updatedHistory.json());
        toast.success("Text analyzed successfully!"); 
        } catch (error) {
        console.error("Error submitting text:", error);
        toast.error("Failed to analyze text. Please try again.");
        } finally {
        setLoading(false);
        }
    };
    const graphData = {
        labels: history.map((row) => {
    const date = new Date(row.timestamp);
    const indianTime = new Date(date.getTime() + 5.5 * 60 * 60 * 1000); 
    return indianTime.toLocaleString();
    }),
        datasets: [
        {
            label: "Gibberish Score",
            data: history.map((row) => row.gibberish_score || 0), 
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.4,
        },
        {
            label: "Education Score",
            data: history.map((row) => row.education_score || 0), 
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            tension: 0.4,
        },
        ],
    };

    return (
        <div className="py-10 px-4  min-h-screen flex justify-center items-center">
        <ToastContainer />
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-4xl">
            <form onSubmit={handleSubmit} className="mb-6">
            <h1 className="text-2xl font-semibold text-center mb-4">Hello ! Let me score your text  ...</h1>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="border outline-none  p-2 rounded w-full mb-4"
                placeholder="Type your text here..."
            />
            <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-green-400 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-300"
                disabled={loading}
            >
                {loading ? (
                <AiOutlineLoading3Quarters className="inline-block animate-spin" />
                ) : (
                "Analyze"
                )}
            </button>
            </form>
            {response && (
            <div className="mt-4 p-4 bg-green-100 rounded transition-all duration-300">
                <h3 className="font-bold">Analysis Results:</h3>
                <p>
                <strong>Text:</strong> {response.text || "N/A"}
                </p>
                <p>
                <strong>Gibberish Score:</strong> {response.gibberish_score || "N/A"}
                </p>
                <p>
                <strong>Education Score:</strong> {response.education_score || "N/A"}
                </p>
            </div>
        )}
        <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">Score Trends:</h3>
            {history.length > 0 ? (
                <Line data={graphData} />
            ) : (
                <p>No data available to display trends.</p>
            )}
            </div>
        </div>
        </div>
    );
}

export default AnalyzePage;
