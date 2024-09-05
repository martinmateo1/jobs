import React, { useState } from 'react';
import { supabase } from './supabaseClient';

interface JobListing {
  company_name: string;
  role_needed: string;
  employment_mode: 'full-time' | 'part-time' | 'flexible' | 'freelance';
  work_type: 'presencial' | 'remoto' | 'hibrido';
  industry: 'technology' | 'finance' | 'marketing' | 'other';
  keywords: string[];
  job_description: string;
  applicants_contact_type: 'mail' | 'DMs';
  email_applicants_receiver: string;
  company_website?: string;
  company_email?: string;
  invoice_company_email?: string;
  marketing_preferences?: string[];
}

const JobForm: React.FC = () => {
  const [job, setJob] = useState<JobListing>({
    company_name: '',
    role_needed: '',
    employment_mode: 'full-time',
    work_type: 'presencial',
    industry: 'technology',
    keywords: [],
    job_description: '',
    applicants_contact_type: 'mail',
    email_applicants_receiver: '',
    company_website: '',
    company_email: '',
    invoice_company_email: '',
    marketing_preferences: [],
  });

  const [keywordInput, setKeywordInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() !== '' && job.keywords.length < 10) {
      setJob((prevJob) => ({
        ...prevJob,
        keywords: [...prevJob.keywords, keywordInput],
      }));
      setKeywordInput('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.from('job_listings').insert([job]);

    if (error) {
      console.error('Error creating job listing:', error);
      setMessage('Error creating job listing.');
    } else {
      console.log('Job listing created:', data);
      setMessage('Job listing created successfully!');
      setJob({
        company_name: '',
        role_needed: '',
        employment_mode: 'full-time',
        work_type: 'presencial',
        industry: 'technology',
        keywords: [],
        job_description: '',
        applicants_contact_type: 'mail',
        email_applicants_receiver: '',
        company_website: '',
        company_email: '',
        invoice_company_email: '',
        marketing_preferences: [],
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl p-6 bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center">Create a Job Listing</h2>

      {/* Company Name */}
      <div>
        <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          type="text"
          name="company_name"
          id="company_name"
          value={job.company_name}
          onChange={handleChange}
          required
          placeholder="Enter Company Name"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Role Needed */}
      <div>
        <label htmlFor="role_needed" className="block text-sm font-medium text-gray-700">Role Needed</label>
        <input
          type="text"
          name="role_needed"
          id="role_needed"
          value={job.role_needed}
          onChange={handleChange}
          required
          placeholder="Enter Role"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Employment Mode */}
      <div>
        <label htmlFor="employment_mode" className="block text-sm font-medium text-gray-700">Employment Mode</label>
        <select
          name="employment_mode"
          id="employment_mode"
          value={job.employment_mode}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="flexible">Flexible</option>
          <option value="freelance">Freelance</option>
        </select>
      </div>

      {/* Work Type */}
      <div>
        <label htmlFor="work_type" className="block text-sm font-medium text-gray-700">Work Type</label>
        <select
          name="work_type"
          id="work_type"
          value={job.work_type}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="presencial">Presencial</option>
          <option value="remoto">Remoto</option>
          <option value="hibrido">Híbrido</option>
        </select>
      </div>

      {/* Industry */}
      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
        <select
          name="industry"
          id="industry"
          value={job.industry}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="technology">Technology</option>
          <option value="finance">Finance</option>
          <option value="marketing">Marketing</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Job Description */}
      <div>
        <label htmlFor="job_description" className="block text-sm font-medium text-gray-700">Job Description</label>
        <textarea
          name="job_description"
          id="job_description"
          value={job.job_description}
          onChange={handleChange}
          required
          placeholder="Enter Job Description"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
      
  
  
      {/* Contact Email */}
      <div>
        <label htmlFor="email_applicants_receiver" className="block text-sm font-medium text-gray-700">Contact Email</label>
        <input
          type="email"
          name="email_applicants_receiver"
          id="email_applicants_receiver"
          value={job.email_applicants_receiver}
          onChange={handleChange}
          required
          placeholder="Enter Email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {/* Company Email */}
      <div>
        <label htmlFor="company_email" className="block text-sm font-medium text-gray-700">Company email</label>
        <input
          type="email"
          name="company_email"
          id="company_email"
          value={job.company_email}
          onChange={handleChange}
          required
          placeholder="Enter Email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
       {/* invoice Email */}
       <div>
        <label htmlFor="invoice_company_email" className="block text-sm font-medium text-gray-700">Invoice Company email</label>
        <input
          type="email"
          name="invoice_company_email"
          id="invoice_company_email"
          value={job.invoice_company_email}
          onChange={handleChange}
          required
          placeholder="Enter Email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Company Website */}
      <div>
        <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">Company Website</label>
        <input
          type="url"
          name="company_website"
          id="company_website"
          value={job.company_website}
          onChange={handleChange}
          placeholder="Enter Company Website"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Keywords */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Keywords</label>
        <div className="flex space-x-2 mt-1">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="Enter Keyword"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleAddKeyword}
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            Add Keyword
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {job.keywords.map((keyword, index) => (
            <span key={index} className="inline-block px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700">
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Submit Button */}


      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:ring-2 focus:ring-green-500"
      >
        {loading ? 'Creating...' : 'Create Job Listing'}
      </button>

      {/* Message */}
      {message && <p className="text-center text-green-600 mt-4">{message}</p>}
    </form>
  );
};

export default JobForm;
