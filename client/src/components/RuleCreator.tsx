import React, { useState } from 'react';
import axios from 'axios';

const RuleCreator: React.FC = () => {
  const [name, setName] = useState('');
  const [ruleString, setRuleString] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/create-rule', { name, ruleString });
      setMessage(response.data.message);
      setName('');
      setRuleString('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // This is an AxiosError; access response data
        setMessage(error.response?.data.message || 'Something went wrong');
      } else {
        // Handle other errors (not Axios errors)
        setMessage('An unknown error occurred');
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Create Rule</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Rule Name</label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:border-blue-500"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="ruleString">Rule String</label>
          <textarea
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:border-blue-500"
            id="ruleString"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          type="submit"
        >
          Create Rule
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default RuleCreator;
