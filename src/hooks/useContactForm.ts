
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface UseContactFormReturn {
  isSubmitting: boolean;
  submitContactForm: (formData: ContactFormData, cvFile?: File | null) => Promise<boolean>;
}

export const useContactForm = (): UseContactFormReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitContactForm = async (formData: ContactFormData, cvFile?: File | null): Promise<boolean> => {
    setIsSubmitting(true);
    
    try {
      // Prepare the data to send to the edge function
      const emailData = {
        ...formData,
        cvFileName: cvFile ? cvFile.name : undefined
      };

      console.log('Submitting contact form:', emailData);

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: emailData
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to send message');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Failed to send message');
      }

      console.log('Contact form submitted successfully:', data);

      toast({
        title: "Message Sent! 🎉",
        description: "Thank you for your message! We will get back to you within 24 hours."
      });

      return true;
    } catch (error: any) {
      console.error('Contact form submission error:', error);
      
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive"
      });

      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitContactForm
  };
};
