import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Rule {
  name: string;
  rule: string;
}

const RuleList: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await axios.get('/api/rules');
      setRules(response.data);
    } catch (error) {
      console.error('Failed to fetch rules:', error);
    }
  };

  const handleDelete = async (name: string) => {
    try {
      await axios.delete(`/api/delete-rule/${name}`);
      fetchRules();
    } catch (error) {
      console.error('Failed to delete rule:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Rule List</h2>
      <ul>
        {rules.map((rule) => (
          <li key={rule.name} className="mb-2 flex justify-between items-center">
            <span>{rule.name}</span>
            <button
              onClick={() => handleDelete(rule.name)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RuleList;