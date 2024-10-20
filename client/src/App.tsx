import React from 'react';
import RuleCreator from './components/RuleCreator';
import RuleEvaluator from './components/RuleEvaluator';
import RuleList from './components/RuleList';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Rule Engine</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RuleCreator />
        <RuleEvaluator />
      </div>
      <div className="mt-8">
        <RuleList />
      </div>
    </div>
  );
};

export default App;
