
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

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = error => reject(error);
    });
  };

  const submitContactForm = async (formData: ContactFormData, cvFile?: File | null): Promise<boolean> => {
    setIsSubmitting(true);
    
    try {
      let emailData: any = { ...formData };

      // If there's a CV file, convert it to base64
      if (cvFile) {
        console.log('Converting CV file to base64:', cvFile.name, cvFile.type, cvFile.size);
        const base64Content = await convertFileToBase64(cvFile);
        emailData.cvFile = {
          name: cvFile.name,
          content: base64Content,
          type: cvFile.type
        };
        console.log('CV file converted successfully');
      }

      console.log('Submitting contact form:', {
        ...emailData,
        cvFile: emailData.cvFile ? { 
          name: emailData.cvFile.name, 
          type: emailData.cvFile.type, 
          hasContent: !!emailData.cvFile.content 
        } : undefined
      });

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
