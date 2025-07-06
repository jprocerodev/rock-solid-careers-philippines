
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  cvFileName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Contact form submission received");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Form data received:", { ...formData, message: formData.message.substring(0, 50) + "..." });

    // Send email to the test email address using your custom domain
    const companyEmailResponse = await resend.emails.send({
      from: "Rock Solid Manpower <noreply@rocksolidmanpower.online>",
      to: ["grayzxc23@gmail.com"],
      subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Contact Information</h3>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.cvFileName ? `<p><strong>CV Attached:</strong> ${formData.cvFileName}</p>` : ''}
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Message</h3>
            <p style="white-space: pre-wrap;">${formData.message}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            This email was sent from the Rock Solid Manpower contact form.
          </p>
        </div>
      `,
    });

    console.log("Company email sent:", companyEmailResponse);

    // Send confirmation email to the user using your custom domain
    const userEmailResponse = await resend.emails.send({
      from: "Rock Solid Manpower <noreply@rocksolidmanpower.online>",
      to: [formData.email],
      subject: "Thank you for contacting Rock Solid Manpower!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank You for Your Interest!</h2>
          
          <p>Dear ${formData.firstName},</p>
          
          <p>Thank you for reaching out to Rock Solid Manpower. We have received your message and will get back to you within 24 hours.</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h3 style="margin-top: 0; color: #1e40af;">Your Message Summary</h3>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.cvFileName ? `<p><strong>CV Submitted:</strong> ${formData.cvFileName}</p>` : ''}
            <p><strong>Message Preview:</strong> ${formData.message.substring(0, 100)}${formData.message.length > 100 ? '...' : ''}</p>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">🌏 Our Services</h3>
            <p>We specialize in connecting Filipino workers with international job opportunities. Our licensed team (DMW-154-LB-08082023-R) is ready to help you start your overseas career journey.</p>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">📞 Contact Information</h3>
            <p><strong>Phone:</strong> (02) 84-2061-59</p>
            <p><strong>Email:</strong> rocksolidskilled@gmail.com</p>
            <p><strong>Address:</strong> 2nd Floor Lifestyle building, 1928 Leon guinto street, Brgy 692 Malate Manila</p>
          </div>
          
          <p>We look forward to helping you achieve your career goals abroad!</p>
          
          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>Rock Solid Manpower Team</strong>
          </p>
          
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
        </div>
      `,
    });

    console.log("User confirmation email sent:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails sent successfully",
        companyEmailId: companyEmailResponse.data?.id,
        userEmailId: userEmailResponse.data?.id
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
