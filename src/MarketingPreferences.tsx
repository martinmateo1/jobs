import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./components/ui/Form";
import { Switch } from "./components/ui/Switch";
import { Badge } from "./components/ui/Badge";

// Define a schema for validation
const FormSchema = z.object({
  logo: z.boolean().default(false),
  email_database: z.boolean().default(false),
  company_landing: z.boolean().default(false),
});

const MarketingPreferences: React.FC<{
  selectedPreferences: string[];
  onChange: (preferences: string[]) => void;
}> = ({ selectedPreferences, onChange }) => {
  // Set up the form with default values based on selected preferences
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      logo: selectedPreferences.includes('logo'),
      email_database: selectedPreferences.includes('email database'),
      company_landing: selectedPreferences.includes('company landing'),
    },
  });

  // Handle submission of the form
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const updatedPreferences = Object.entries(data)
      .filter(([, value]) => value)
      .map(([key]) => key.replace('_', ' '));
    onChange(updatedPreferences);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Logo Preference */}
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-base text-sm">✨ Mostrar el logo de mi empresa (+$1)</FormLabel>
                  <FormDescription>
                  Tu logo estará visibile en la publicación
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Email Database Preference */}
          <FormField
            control={form.control}
            name="email_database"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-base text-sm">🚀 Enviar publicación a candidatos (+$5)</FormLabel>
                  <FormDescription>
                    Nuestra base cuenta con mas de 5.000 candidatos
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Company Landing Preference */}
          <FormField
            control={form.control}
            name="company_landing"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-base text-sm">🏹 Agregar a mi landing ($10/mes)<Badge className="ml-2" variant="destructive">Business</Badge></FormLabel>
                  <FormDescription>
                    Tendrás tu publicación en una landing específica para tu empresa y podrás integrarla en tus sistemas 
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default MarketingPreferences;
