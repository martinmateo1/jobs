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
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-2">
            <span className="text-green-500">{feature.emoji}</span>
            <span className="text-sm text-gray-700">
              <strong>{feature.title}:</strong> {feature.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureList;
