import React, { useState } from 'react';
import axios from 'axios';

const RuleEvaluator: React.FC = () => {
  const [name, setName] = useState('');
  const [data, setData] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/evaluate-rule', { name, data: JSON.parse(data) });
      setResult(response.data.result);
      setMessage('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // This is an AxiosError; access response data
        setMessage(error.response?.data.message || 'Something went wrong');
        setResult(null);
      } else {
        // Handle other errors (not Axios errors)
        setMessage('An unknown error occurred');
        setResult(null);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">Evaluate Rule</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Rule Name</label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:border-green-500"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="data">JSON Data</label>
          <textarea
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:border-green-500"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
          type="submit"
        >
          Evaluate Rule
        </button>
      </form>
      {result !== null && (
        <p className="mt-4 text-blue-500">Result: {result.toString()}</p>
      )}
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default RuleEvaluator;
