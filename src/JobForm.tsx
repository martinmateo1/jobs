import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { Label } from "./components/ui/Label";
import { RadioGroup, RadioGroupItem } from "./components/ui/RadioGroup";
import { Textarea } from "./components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/Select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/Dialog";

const JobForm: React.FC = () => {
  const [job, setJob] = useState({
    company_name: '',
    role_needed: '',
    employment_mode: 'full-time',
    work_type: 'presencial',
    industry: 'technology',
    keywords: [] as string[],
    job_description: '',
    applicants_contact_type: 'mail',
    email_applicants_receiver: '',
    company_website: '',
    company_email: '',
    invoice_company_email: '',
    marketing_preferences: [] as string[],
  });

  const [keywordInput, setKeywordInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: keyof typeof job) => (value: string) => {
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
      <div className="space-y-2">
        <Label htmlFor="company_name">Company Name</Label>
        <Input
          type="text"
          name="company_name"
          id="company_name"
          value={job.company_name}
          onChange={handleChange}
          required
          placeholder="Enter Company Name"
        />
      </div>

      {/* Role Needed */}
      <div className="space-y-2">
        <Label htmlFor="role_needed">Role Needed</Label>
        <Input
          type="text"
          name="role_needed"
          id="role_needed"
          value={job.role_needed}
          onChange={handleChange}
          required
          placeholder="Enter Role"
        />
      </div>

      {/* Employment Mode */}
      <div className="space-y-2">
        <Label htmlFor="employment_mode">Employment Mode</Label>
        <Select value={job.employment_mode} onValueChange={handleSelectChange('employment_mode')}>
          <SelectTrigger id="employment_mode">
            <SelectValue placeholder="Select employment mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
            <SelectItem value="freelance">Freelance</SelectItem>
          </SelectContent>
        </Select>
      </div>

     {/* Work Type */}
<div className="space-y-2">
  <Label htmlFor="work_type">Work Type</Label>
  <RadioGroup value={job.work_type} onValueChange={handleSelectChange('work_type')}>
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="presencial" id="presencial" />
        <Label htmlFor="presencial">Presencial</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="remoto" id="remoto" />
        <Label htmlFor="remoto">Remoto</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="hibrido" id="hibrido" />
        <Label htmlFor="hibrido">Híbrido</Label>
      </div>
    </div>
  </RadioGroup>
</div>

      {/* Industry */}
      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select value={job.industry} onValueChange={handleSelectChange('industry')}>
          <SelectTrigger id="industry">
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Description */}
      <div className="space-y-2">
        <Label htmlFor="job_description">Job Description</Label>
        <Textarea
          name="job_description"
          id="job_description"
          value={job.job_description}
          onChange={handleChange}
          required
          placeholder="Enter Job Description"
        />
      </div>

      {/* Contact Email */}
      <div className="space-y-2">
        <Label htmlFor="email_applicants_receiver">Contact Email</Label>
        <Input
          type="email"
          name="email_applicants_receiver"
          id="email_applicants_receiver"
          value={job.email_applicants_receiver}
          onChange={handleChange}
          required
          placeholder="Enter Email"
        />
      </div>

      {/* Company Email */}
      <div className="space-y-2">
        <Label htmlFor="company_email">Company Email</Label>
        <Input
          type="email"
          name="company_email"
          id="company_email"
          value={job.company_email}
          onChange={handleChange}
          required
          placeholder="Enter Company Email"
        />
      </div>

      {/* Invoice Company Email */}
      <div className="space-y-2">
        <Label htmlFor="invoice_company_email">Invoice Company Email</Label>
        <Input
          type="email"
          name="invoice_company_email"
          id="invoice_company_email"
          value={job.invoice_company_email}
          onChange={handleChange}
          required
          placeholder="Enter Invoice Email"
        />
      </div>

      {/* Company Website */}
      <div className="space-y-2">
        <Label htmlFor="company_website">Company Website</Label>
        <Input
          type="url"
          name="company_website"
          id="company_website"
          value={job.company_website}
          onChange={handleChange}
          placeholder="Enter Company Website"
        />
      </div>

      {/* Keywords */}
      <div className="space-y-2">
        <Label htmlFor="keywords">Keywords</Label>
        <Input
          type="text"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          placeholder="Enter Keyword"
        />
        <Button onClick={handleAddKeyword} type="button">
          Add Keyword
        </Button>
        <div className="mt-2 flex flex-wrap gap-2">
          {job.keywords.map((keyword, index) => (
            <span key={index} className="inline-block px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700">
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Job Listing'}
      </Button>

      {/* Message */}
      {message && <p className="text-center text-green-600 mt-4">{message}</p>}
    </form>
  );
};

export default JobForm;
