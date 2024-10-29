'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function ContributePage() {
  const [contribution, setContribution] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContribution(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically handle the contribution submission, e.g., send it to a server
    console.log('Contribution submitted:', contribution);
    setContribution('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contribute to ChessNoobs</h1>
      <p className="mb-4">
        We welcome contributions from the community! Please share your ideas, feedback, or code improvements.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={contribution}
          onChange={handleInputChange}
          placeholder="Write your contribution here..."
          className="w-full p-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          rows={6}
        />
        <button
          type="submit"
          className="self-start bg-amber-200 text-amber-900 px-4 py-2 rounded-md hover:bg-amber-300 transition-colors"
        >
          Submit Contribution
        </button>
      </form>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Contribute on GitHub</h2>
        <p className="mb-4">
          You can also contribute by visiting our GitHub repository. Feel free to open issues, submit pull requests, or star our project!
        </p>
        <Link
          href="https://github.com/sad-pixel/"
          className="text-amber-700 hover:text-amber-900 underline"
        >
          Visit our GitHub Repository
        </Link>
      </div>
    </div>
  );
}

