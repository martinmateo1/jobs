import React from 'react';

// Define the type for each feature
interface Feature {
  emoji: string;
  title: string;
  description: string;
}

// Define the props for the FeatureList component
interface FeatureListProps {
  features: Feature[];
}

// Create the FeatureList component
const FeatureList: React.FC<FeatureListProps> = ({ features }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <p className="text-md font-medium font-gray-700 mb-4">👉 También incluído en la publicación:</p>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-2">
            <span className="mt-1 text-green-500 text-sm">{feature.emoji}</span>
            <span><span className="text-md font-medium text-gray-700">{feature.title}: </span>
            <span className="text-md font-normal text-gray-700">{feature.description}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureList;
