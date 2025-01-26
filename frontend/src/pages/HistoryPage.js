import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css"; 

function HistoryPage() {
const [history, setHistory] = useState([]); 

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

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
        try {
            const res = await fetch(`http://localhost:8001/api/delete/${id}`, {
            method: "DELETE",
            });

            if (!res.ok) {
            throw new Error("Failed to delete the record");
            }
            const updatedHistory = history.filter((row) => row.id !== id);
            setHistory(updatedHistory); 
            toast.success("Record deleted successfully!");
        } catch (error) {
            console.error("Error deleting record:", error);
            toast.error("Failed to delete the record.");
        }
        }
    };

    return (
        <div className="mt-0 px-4 min-h-fit flex items-center">
        <ToastContainer />
        <div className="bg-gray-50 shadow-lg rounded-2xl p-8 w-full max-w-7xl">
            <h1 className="text-2xl font-bold text-center mb-6">Analysis History</h1>
            <div className="mt-8">
            {history.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-600 animate-fade-in">
                <thead>
                    <tr className="bg-teal-300">
                    <th className="border px-4 py-2">Text</th>
                    <th className="border px-4 py-2">Gibberish Score</th>
                    <th className="border px-4 py-2">Education Score</th>
                    <th className="border px-4 py-2">Timestamp</th>
                    <th className="border px-4 py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((row) => (
                    <tr
                        key={row.id} 
                        className={`border ${
                        row.id === history[history.length - 1]?.id
                            ? "bg-yellow-100"
                            : "hover:bg-gray-100"
                        }`}
                    >
                        <td className="border px-4 py-2">{row.text}</td>
                        <td className="border px-4 py-2">{row.gibberish_score}</td>
                        <td className="border px-4 py-2">{row.education_score}</td>
                        <td className="border px-4 py-2">
                        {new Date(row.timestamp).toLocaleString()}
                        </td>
                        <td className="border px-4 py-2">
                        <button
                            onClick={() => handleDelete(row.id)}
                            className="text-red-500 hover:text-red-700 pl-7"
                        >
                            <FaTrash size={12} />
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            ) : (
                <p className="text-center text-lg text-gray-700">
                No history data available yet. Start analyzing some text!
                </p>
            )}
            </div>
        </div>
        </div>
    );
    }

    export default HistoryPage;
