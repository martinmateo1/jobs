import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "./components/ui/Form";
import { Switch } from "./components/ui/Switch";
import { Badge } from "./components/ui/Badge";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './components/ui/Sheet';

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
                  <FormLabel className="text-base text-sm">✅ Activar el logo de mi empresa <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-green-600/20">Incluído</span></FormLabel>
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
                    <Sheet>
                        <SheetTrigger asChild>
                            <Link to="#" className="text-blue-600 hover:underline">
                                <p>¿Cómo funciona?</p>
                            </Link>
                        </SheetTrigger>
                        {/* Content of the Sheet */}
                        <SheetContent side="bottom">
                            <SheetHeader>
                                <SheetTitle>More Details</SheetTitle>
                                    <SheetDescription>
                                        Here are more details about the content of this section.
                                    </SheetDescription>
                                </SheetHeader>
                            <div className="p-4">
                                <p>This is the additional content inside the sheet. Customize this as needed.</p>
                            </div>
                        </SheetContent>
                    </Sheet>
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
                  <FormLabel className="text-base text-sm">🏹 Agregar a mi landing ($49) <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Nuevo</span></FormLabel>
                  <FormDescription>
                    <span className="mr-1">Tu publicación se publicará en la landing de tu empresa</span>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Link to="#" className="text-blue-600 hover:underline">
                                <p>¿Cómo funciona?</p>
                            </Link>
                        </SheetTrigger>
                        {/* Content of the Sheet */}
                        <SheetContent side="bottom">
                            <SheetHeader>
                                <SheetTitle>More Details</SheetTitle>
                                    <SheetDescription>
                                        Here are more details about the content of this section.
                                    </SheetDescription>
                                </SheetHeader>
                            <div className="p-4">
                                <p>This is the additional content inside the sheet. Customize this as needed.</p>
                            </div>
                        </SheetContent>
                    </Sheet>
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