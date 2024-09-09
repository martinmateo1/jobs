import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from './supabaseClient';
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { Label } from "./components/ui/Label";
import { Switch } from "./components/ui/Switch";
import { RadioGroup, RadioGroupItem } from "./components/ui/RadioGroup";
import { Textarea } from "./components/ui/Textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/Select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/Dialog";
import MarketingPreferences from "./MarketingPreferences"; 
import FeatureList from './FeatureList'; 
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'sonner';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';


const jobSchema = z.object({
  company_name: z.string().min(1, 'Company name is required'),
  role_needed: z.string().min(1, 'Role needed is required'),
  employment_mode: z.enum(['full-time', 'part-time', 'flexible', 'freelance']),
  work_type: z.enum(['presencial', 'remoto', 'hibrido']),
  industry: z.enum(['technology', 'finance', 'marketing', 'other']),
  job_description: z.string().min(10, 'Job description must be at least 10 characters'),
  email_applicants_receiver: z.string().email('Invalid email address'),
  company_website: z.string().url('Invalid URL').optional(),
  company_email: z.string().email('Invalid email address'),
  invoice_company_email: z.string().email('Invalid email address'),
  marketing_preferences: z.array(z.string()).optional(),
  keywords: z.array(z.string()).max(10, 'Maximum of 10 keywords allowed').optional(),
});

type JobFormSchema = z.infer<typeof jobSchema>;

const features = [
  {
    emoji: '✅',
    title: 'Publicación optimizada para SEO',
    description: 'Lográ que tu oferta de empleo llegue a más candidatos calificados apareciendo en los primeros resultados de búsqueda.',
  },
  {
    emoji: '✅',
    title: 'Lista de compartir en redes sociales',
    description: 'Publicá tu búsqueda optimizada para captar la atención en LinkedIn, Twitter y más, atrayendo al talento donde más importa.',
  },
  // {
  //   emoji: '✅',
  //   title: 'Editable después de la publicación',
  //   description: 'Actualizá y ajustá tu publicación en cualquier momento para reflejar exactamente lo que buscás, sin limitaciones.',
  // },
];
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
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const handleMarketingPreferencesChange = (preferences: string[]) => {
    setJob((prevJob) => ({
      ...prevJob,
      marketing_preferences: preferences,
    }));
  };
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

  const { data, error } = await supabase.from('job_listings').insert([job]).select(); // Include select to get the inserted job details

  if (error) {
    console.error('Error creating job listing:', error);
    toast.error('Error creating job listing.'); // Show error toast
  } else if (data && data.length > 0) {
    console.log('Job listing created:', data);
    toast.success('¡Creaste la publicación con éxito!', { 
      duration: 5000, 
      description: 'Tu trabajo fue creado con éxito y estará visible en breve' 
    });

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

    // Ensure that data is not null before accessing it
    const jobId = data[0].id; // Assuming the created job has an ID field
    navigate(`/job/${jobId}`); // Navigate to the job detail page
  } else {
    console.error('Failed to retrieve the job ID.');
    setMessage('Failed to retrieve the job ID.');
  }

  setLoading(false);
  };



  return (
    <div className="container mx-auto pb-16">
      <div className="pt-16 pb-8 flex justify-between items-center">
        <div>
        <a href="/" className="flex items-center text-gray-600 hover:underline hover:text-gray-700">
          <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Volver a la página principal
        </a>
        <h1 className="text-4xl font-bold text-gray-900 mt-3">Nueva publicación</h1>
        </div>
        <div className="flex items-center">
          <svg fill="currentColor" className="text-indigo-700" width="16" viewBox="0 0 31 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.4631 0.511113C24.9987 0.307175 25.7352 0.674315 25.7352 1.14523L25.7352 6.93759C25.7352 7.12704 25.6071 7.28875 25.3918 7.37101L6.01231 14.776C5.47681 14.9806 4.73934 14.6134 4.73934 14.1422L4.73934 8.32387C4.73934 8.13416 4.86782 7.97229 5.08359 7.89013L24.4631 0.511113Z" fill="#9E3DEE"/>
            <path d="M24.463 10.638C24.9986 10.4341 25.7351 10.8012 25.7352 11.2721L25.7355 17.064C25.7355 17.2533 25.6075 17.415 25.3923 17.4973L6.01249 24.9108C5.47702 25.1156 4.73926 24.7484 4.73926 24.2771L4.73926 18.4502C4.73926 18.2605 4.86774 18.0986 5.08352 18.0164L24.463 10.638Z" fill="#9E3DEE"/>
            <path d="M13.3767 25.0041C13.9125 24.8013 14.6475 25.1684 14.6475 25.6387L14.6475 31.447C14.6475 31.6368 14.5188 31.7988 14.3028 31.8809L6.01108 35.0329C5.47543 35.2365 4.73932 34.8693 4.73932 34.3986L4.73932 28.5771C4.73932 28.387 4.86837 28.2248 5.08494 28.1428L13.3767 25.0041Z" fill="#9E3DEE"/>
            <path d="M32.5312 34.0015V12.1775H38.0752V34.0015H32.5312ZM35.3032 9.62546C34.3058 9.62546 33.4552 9.3028 32.7512 8.65746C32.0765 8.01213 31.7392 7.16146 31.7392 6.10546C31.7392 5.04946 32.0765 4.1988 32.7512 3.55346C33.4552 2.90813 34.3058 2.58546 35.3032 2.58546C36.3298 2.58546 37.1805 2.90813 37.8552 3.55346C38.5298 4.1988 38.8672 5.04946 38.8672 6.10546C38.8672 7.16146 38.5298 8.01213 37.8552 8.65746C37.1805 9.3028 36.3298 9.62546 35.3032 9.62546ZM44.2187 34.0015V12.1775H49.6747V15.0375H50.4667C50.8187 14.2748 51.4787 13.5561 52.4467 12.8815C53.4147 12.1775 54.8813 11.8255 56.8467 11.8255C58.548 11.8255 60.0293 12.2215 61.2907 13.0135C62.5813 13.7761 63.5787 14.8468 64.2827 16.2255C64.9867 17.5748 65.3387 19.1588 65.3387 20.9775V34.0015H59.7947V21.4175C59.7947 19.7748 59.384 18.5428 58.5627 17.7215C57.7707 16.9001 56.6267 16.4895 55.1307 16.4895C53.4293 16.4895 52.1093 17.0615 51.1707 18.2055C50.232 19.3201 49.7627 20.8895 49.7627 22.9135V34.0015H44.2187ZM81.276 34.6175C79.1053 34.6175 77.184 34.1628 75.512 33.2535C73.8693 32.3148 72.5786 31.0095 71.64 29.3375C70.7306 27.6361 70.276 25.6415 70.276 23.3535V22.8255C70.276 20.5375 70.7306 18.5575 71.64 16.8855C72.5493 15.1841 73.8253 13.8788 75.468 12.9695C77.1106 12.0308 79.0173 11.5615 81.188 11.5615C83.3293 11.5615 85.192 12.0455 86.776 13.0135C88.36 13.9521 89.592 15.2721 90.472 16.9735C91.352 18.6455 91.792 20.5961 91.792 22.8255V24.7175H75.908C75.9666 26.2135 76.524 27.4308 77.58 28.3695C78.636 29.3081 79.9266 29.7775 81.452 29.7775C83.0066 29.7775 84.1506 29.4401 84.884 28.7655C85.6173 28.0908 86.1746 27.3428 86.556 26.5215L91.088 28.8975C90.6773 29.6601 90.076 30.4961 89.284 31.4055C88.5213 32.2855 87.4946 33.0481 86.204 33.6935C84.9133 34.3095 83.2706 34.6175 81.276 34.6175ZM75.952 20.5815H86.16C86.0426 19.3201 85.5293 18.3081 84.62 17.5455C83.74 16.7828 82.5813 16.4015 81.144 16.4015C79.648 16.4015 78.46 16.7828 77.58 17.5455C76.7 18.3081 76.1573 19.3201 75.952 20.5815ZM92.6785 42.8015V38.0495H95.5825C96.4038 38.0495 96.8145 37.6095 96.8145 36.7295V12.1775H102.358V37.8735C102.358 39.3695 101.918 40.5575 101.038 41.4375C100.158 42.3468 98.9852 42.8015 97.5185 42.8015H92.6785ZM99.5865 9.62546C98.5892 9.62546 97.7385 9.3028 97.0345 8.65746C96.3598 8.01213 96.0225 7.16146 96.0225 6.10546C96.0225 5.04946 96.3598 4.1988 97.0345 3.55346C97.7385 2.90813 98.5892 2.58546 99.5865 2.58546C100.613 2.58546 101.464 2.90813 102.138 3.55346C102.813 4.1988 103.15 5.04946 103.15 6.10546C103.15 7.16146 102.813 8.01213 102.138 8.65746C101.464 9.3028 100.613 9.62546 99.5865 9.62546ZM118.884 34.6175C116.713 34.6175 114.763 34.1775 113.032 33.2975C111.301 32.4175 109.937 31.1415 108.94 29.4695C107.943 27.7975 107.444 25.7881 107.444 23.4415V22.7375C107.444 20.3908 107.943 18.3815 108.94 16.7095C109.937 15.0375 111.301 13.7615 113.032 12.8815C114.763 12.0015 116.713 11.5615 118.884 11.5615C121.055 11.5615 123.005 12.0015 124.736 12.8815C126.467 13.7615 127.831 15.0375 128.828 16.7095C129.825 18.3815 130.324 20.3908 130.324 22.7375V23.4415C130.324 25.7881 129.825 27.7975 128.828 29.4695C127.831 31.1415 126.467 32.4175 124.736 33.2975C123.005 34.1775 121.055 34.6175 118.884 34.6175ZM118.884 29.6895C120.585 29.6895 121.993 29.1468 123.108 28.0615C124.223 26.9468 124.78 25.3628 124.78 23.3095V22.8695C124.78 20.8161 124.223 19.2468 123.108 18.1615C122.023 17.0468 120.615 16.4895 118.884 16.4895C117.183 16.4895 115.775 17.0468 114.66 18.1615C113.545 19.2468 112.988 20.8161 112.988 22.8695V23.3095C112.988 25.3628 113.545 26.9468 114.66 28.0615C115.775 29.1468 117.183 29.6895 118.884 29.6895ZM148.553 34.6175C146.588 34.6175 145.077 34.2801 144.021 33.6055C142.965 32.9308 142.188 32.1828 141.689 31.3615H140.897V34.0015H135.441V3.20146H140.985V14.6855H141.777C142.1 14.1575 142.525 13.6588 143.053 13.1895C143.611 12.7201 144.329 12.3388 145.209 12.0455C146.119 11.7228 147.233 11.5615 148.553 11.5615C150.313 11.5615 151.941 12.0015 153.437 12.8815C154.933 13.7321 156.136 14.9935 157.045 16.6655C157.955 18.3375 158.409 20.3615 158.409 22.7375V23.4415C158.409 25.8175 157.955 27.8415 157.045 29.5135C156.136 31.1855 154.933 32.4615 153.437 33.3415C151.941 34.1921 150.313 34.6175 148.553 34.6175ZM146.881 29.7775C148.583 29.7775 150.005 29.2348 151.149 28.1495C152.293 27.0348 152.865 25.4215 152.865 23.3095V22.8695C152.865 20.7575 152.293 19.1588 151.149 18.0735C150.035 16.9588 148.612 16.4015 146.881 16.4015C145.18 16.4015 143.757 16.9588 142.613 18.0735C141.469 19.1588 140.897 20.7575 140.897 22.8695V23.3095C140.897 25.4215 141.469 27.0348 142.613 28.1495C143.757 29.2348 145.18 29.7775 146.881 29.7775Z" fill="#9E3DEE"/>
          </svg>
          <p className="text-gray-500 text-sm ml-1">Powered by Finejob</p>
      </div>
      </div>
      
    <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-12 gap-12">
       <div className="col-span-7">
      <Card>
        <CardHeader>
          <CardTitle>
          Información general
          </CardTitle>
        </CardHeader>
      <CardContent>
        <div className="space-y-6">
      {/* Company Name */}
        <div className="space-y-2">
          <Label htmlFor="company_name">Nombre de tu compañia</Label>
          <Input
            type="text"
            name="company_name"
            id="company_name"
            value={job.company_name}
            onChange={handleChange}
            required
            placeholder="Enter Company Name"
          />
          <p className="text-xs text-gray-500">
          Your company's brand/trade name: without Inc., Ltd., B.V., Pte., etc.
          </p>
        </div>

        {/* Role Needed */}
        <div className="space-y-2">
          <Label htmlFor="role_needed">Posición que estás buscando</Label>
          <Input
            type="text"
            name="role_needed"
            id="role_needed"
            value={job.role_needed}
            onChange={handleChange}
            required
            placeholder="Enter Role"
          />
          <p className="text-xs text-gray-500">
            Por favor, especifica un único puesto de trabajo como "Gerente de Marketing" o "Desarrollador Node JS", no una frase como "Buscando PM / Biz Dev / Manager". Sabemos que tu trabajo es importante, pero por favor NO ESCRIBAS TODO EN MAYÚSCULAS. Si publicas varios roles, crea varias publicaciones de trabajo. Una publicación de trabajo está limitada a un solo puesto.
          </p>
        </div>

        {/* Employment Mode */}
        <div className="space-y-2">
          <Label htmlFor="employment_mode">Modalidad de empleo</Label>
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
          <Label htmlFor="work_type">Forma de trabajo</Label>
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
          <Label htmlFor="industry">Area o industria</Label>
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
          <p className="text-xs text-gray-500">Esta etiqueta principal se muestra primero y aumenta la visibilidad en las secciones principales. Sin embargo, tu trabajo se muestra en cada página que tenga esta etiqueta. Por ejemplo, si lo etiquetas como PHP, aparecerá en Trabajos Remotos de PHP, etc.</p>
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
          
          <div className="mt-2 flex flex-wrap gap-2">
            {job.keywords.map((keyword, index) => (
              <span key={index} className="inline-block px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700">
                {keyword}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500">Se prefieren etiquetas cortas. Utiliza etiquetas como la industria y la pila tecnológica. Las primeras 3 o 4 etiquetas se muestran en el sitio; las demás no, pero el trabajo aparecerá en cada página específica de la etiqueta (como /remote-react-jobs). También, a veces generamos etiquetas automáticamente después de que publiques o edites para complementar.</p>
          <Button onClick={handleAddKeyword} type="button">
            Add Keyword
          </Button>
        </div>
        </div>
        </CardContent>
      </Card>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>
          Detalles del rol
          </CardTitle>
        </CardHeader>
       <CardContent>
        <div className="space-y-6">
          {/* Job Description */}
          <div className="space-y-2">
            <Label htmlFor="job_description">Descripción del rol</Label>
            <Textarea
              name="job_description"
              id="job_description"
              value={job.job_description}
              onChange={handleChange}
              required
              placeholder="Acá iría un wysigywgywgy"
            />
          </div>
          {/* Contact Email */}
          <div className="space-y-2">
            <Label htmlFor="email_applicants_receiver">Email para recibir los aplicantes</Label>
            <Input
              type="email"
              name="email_applicants_receiver"
              id="email_applicants_receiver"
              value={job.email_applicants_receiver}
              onChange={handleChange}
              required
              placeholder="Ingresá tu mail"
            />
            <p className="text-gray-500 text-xs">Este correo electrónico no es público (!). Recibirás nuevas solicitudes de empleo en esta dirección</p>
          </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>
          Compañia
          </CardTitle>
        </CardHeader>
       <CardContent>
        <div className="space-y-6">
        {/* Company Website */}
        <div className="space-y-2">
          <Label htmlFor="company_website">💻 Página web de la compañia</Label>
          <Input
            type="url"
            name="company_website"
            id="company_website"
            value={job.company_website}
            onChange={handleChange}
            placeholder="www.ejemplo.com"
          />
          <p className="text-xs text-gray-500">Twitter username without @. Not required, but used to tag your company when we tweet out your job post.</p>
        </div>
        {/* Company Email */}
        <div className="space-y-2">
          <Label htmlFor="company_email">Email de la empresa (se mantiene privado y utilizado para invoices + edición)</Label>
          <Input
            type="email"
            name="company_email"
            id="company_email"
            value={job.company_email}
            onChange={handleChange}
            required
            placeholder="Enter Company Email"
          />
          <p className="text-xs text-gray-500">¡Asegúrate de que este correo electrónico sea accesible para ti! Lo utilizamos para enviar la factura y el enlace de edición. No podemos ni reenviaremos esto manualmente. Si usas el dominio de tu empresa (el mismo que el nombre de la empresa), mostraremos una etiqueta [Verificado] en tu oferta de trabajo.</p>
        </div>

        {/* Invoice Company Email */}
        <div className="space-y-2">
          <Label htmlFor="invoice_company_email">📬 Email para recibir invoices</Label>
          <Input
          type="email"
          name="invoice_company_email"
          id="invoice_company_email"
          value={job.invoice_company_email}
          onChange={handleChange}
          required
          placeholder="Enter Invoice Email"
        />
        <p className="text-xs text-gray-500">También enviamos una copia de la factura y el enlace de edición aquí. Puedes poner el correo electrónico de tu departamento de finanzas o del contador de gastos para que reciban una copia de la factura para la contabilidad.</p>
      </div>
    </div>
  </CardContent>
</Card>
      {/* Message */}
      {message && <p className="text-center text-green-600 mt-4">{message}</p>}
    
    </div>
    <div className="col-span-5 sticky top-4 self-start">
      <p className="text-xs text-gray-500">👍 Tu publicación estará activa por 90 días, podrás pausarla cuando quieras.</p>
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Visibility Booster</CardTitle>
      </CardHeader>
      <CardContent>
          {/* Marketing Preferences */}
     <MarketingPreferences
        selectedPreferences={job.marketing_preferences}
        onChange={handleMarketingPreferencesChange}
      />
        
      </CardContent>
    </Card>
    {/* Submit Button */}
    <Button 
      className="mt-6 w-full py-7 text-lg" // Adjust the width, padding, and font size for a larger button
      type="submit" 
      disabled={loading}>
      {loading ? 'Creating...' : 'Publicá la búsqueda por UYU 329'}
    </Button>
    <div className="w-full max-w-2xl mx-auto mt-8">
      <FeatureList features={features} />
    </div>
    
  </div>
</div>
</form>
</div>
  );
};

export default JobForm;
