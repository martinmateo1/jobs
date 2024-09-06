import React, { useState } from 'react';
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
import MarketingPreferences from "./MarketingPreferences"; // Adjust the path as needed


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
    <div className="grid grid-cols-12 gap-12 p-6">
       <div className="col-span-7">
    <form onSubmit={handleSubmit}>
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
      

      

      {/* Submit Button */}
      <Button className="mt-8" type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Job Listing'}
      </Button>

      {/* Message */}
      {message && <p className="text-center text-green-600 mt-4">{message}</p>}
    </form>
    </div>
    <div className="col-span-5">
      <p className="text-sm text-gray-900">👍 Tu anuncio estará disponible por 180 días</p>
    <Card className="p-6 mt-4">
      <CardHeader>
        <CardTitle>Preferencias de Marketing</CardTitle>
      </CardHeader>
      <CardContent>
          {/* Marketing Preferences */}
     <MarketingPreferences
        selectedPreferences={job.marketing_preferences}
        onChange={handleMarketingPreferencesChange}
      />
        
      </CardContent>
    </Card>
  </div>
</div>
    
  );
};

export default JobForm;
