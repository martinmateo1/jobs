import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tttionkhcjqjngnbrkyj.supabase.co'; // Replace with your actual API URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dGlvbmtoY2pxam5nbmJya3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0NTY5MzQsImV4cCI6MjA0MTAzMjkzNH0.XlQA4w-9uUeaL-ZKgN06IBF507RhRaO41q3WCJxPisE'; // Replace with your actual anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
