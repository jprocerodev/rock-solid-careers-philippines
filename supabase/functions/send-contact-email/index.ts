
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
  cvFile?: {
    name: string;
    content: string; // base64 encoded file content
    type: string;
  };
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
    console.log("Form data received:", { 
      ...formData, 
      message: formData.message.substring(0, 50) + "...",
      cvFile: formData.cvFile ? { name: formData.cvFile.name, type: formData.cvFile.type, hasContent: !!formData.cvFile.content } : undefined
    });

    // Prepare attachments if CV file is provided
    const attachments = formData.cvFile ? [{
      filename: formData.cvFile.name,
      content: formData.cvFile.content, // base64 encoded content
      type: formData.cvFile.type,
      disposition: 'attachment'
    }] : [];

    // Send email to the test email address using your custom domain
    const companyEmailResponse = await resend.emails.send({
      from: "Rock Solid Manpower <noreply@rocksolidmanpower.online>",
      to: ["grayzxc23@gmail.com"],
      subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                🏢 Rock Solid Manpower
              </h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">New Contact Form Submission</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <!-- Alert Banner -->
              <div style="background: linear-gradient(45deg, #fef3c7, #fde68a); border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="color: #92400e; margin: 0 0 10px 0; font-size: 20px; display: flex; align-items: center;">
                  🔔 New Application Received
                </h2>
                <p style="color: #b45309; margin: 0; font-size: 14px;">A potential candidate has submitted their information through your website.</p>
              </div>
              
              <!-- Contact Information Card -->
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 25px; border-radius: 12px; margin: 25px 0;">
                <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                  👤 Contact Information
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 120px;">Full Name:</td>
                    <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${formData.firstName} ${formData.lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0;">
                      <a href="mailto:${formData.email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${formData.email}</a>
                    </td>
                  </tr>
                  ${formData.cvFile ? `
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">CV Attached:</td>
                    <td style="padding: 8px 0; color: #059669; font-weight: 500;">📎 ${formData.cvFile.name}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              
              <!-- Message Card -->
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 25px; border-radius: 12px; margin: 25px 0;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                  💬 Message
                </h3>
                <div style="background: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
                  <p style="color: #374151; margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${formData.message}</p>
                </div>
              </div>
              
              <!-- Action Button -->
              <div style="text-align: center; margin: 35px 0;">
                <a href="mailto:${formData.email}" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3); transition: transform 0.2s;">
                  📧 Reply to Candidate
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f1f5f9; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 13px;">
                This email was automatically generated from your Rock Solid Manpower contact form.<br>
                <span style="color: #94a3b8;">Received on ${new Date().toLocaleString()}</span>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: attachments
    });

    console.log("Company email sent:", companyEmailResponse);

    // Send confirmation email to the user using your custom domain
    const userEmailResponse = await resend.emails.send({
      from: "Rock Solid Manpower <noreply@rocksolidmanpower.online>",
      to: [formData.email],
      subject: "Thank you for contacting Rock Solid Manpower!",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You - Rock Solid Manpower</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                🏢 Rock Solid Manpower
              </h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Your Pathway to International Opportunities</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <!-- Thank You Message -->
              <div style="text-align: center; margin-bottom: 35px;">
                <div style="background: linear-gradient(45deg, #dcfce7, #bbf7d0); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
                  <h2 style="color: #065f46; margin: 0 0 10px 0; font-size: 24px;">
                    🎉 Thank You, ${formData.firstName}!
                  </h2>
                  <p style="color: #047857; margin: 0; font-size: 16px;">We have successfully received your message and will respond within 24 hours.</p>
                </div>
              </div>
              
              <!-- Submission Summary -->
              <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 25px; border-radius: 12px; margin: 25px 0;">
                <h3 style="color: #1e40af; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #bae6fd; padding-bottom: 10px;">
                  📋 Your Submission Summary
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #1e40af; font-weight: 600; width: 120px;">Name:</td>
                    <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${formData.firstName} ${formData.lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1e40af; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${formData.email}</td>
                  </tr>
                  ${formData.cvFile ? `
                  <tr>
                    <td style="padding: 8px 0; color: #1e40af; font-weight: 600;">CV Submitted:</td>
                    <td style="padding: 8px 0; color: #059669; font-weight: 500;">✅ ${formData.cvFile.name}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; color: #1e40af; font-weight: 600; vertical-align: top;">Message:</td>
                    <td style="padding: 8px 0; color: #1e293b;">${formData.message.substring(0, 100)}${formData.message.length > 100 ? '...' : ''}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Services Info -->
              <div style="background: linear-gradient(45deg, #fef7ff, #fae8ff); border: 1px solid #e9d5ff; padding: 25px; border-radius: 12px; margin: 25px 0;">
                <h3 style="color: #7c3aed; margin: 0 0 15px 0; font-size: 18px;">
                  🌏 Our Specialized Services
                </h3>
                <p style="color: #5b21b6; margin: 0 0 15px 0; font-size: 15px;">We connect skilled Filipino workers with premium international job opportunities:</p>
                <ul style="color: #5b21b6; margin: 0; padding-left: 20px;">
                  <li style="margin: 5px 0;">Licensed recruitment agency (DMW-154-LB-08082023-R)</li>
                  <li style="margin: 5px 0;">Comprehensive pre-deployment training</li>
                  <li style="margin: 5px 0;">End-to-end support throughout your journey</li>
                </ul>
              </div>
              
              <!-- Contact Info -->
              <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 25px; border-radius: 12px; margin: 25px 0;">
                <h3 style="color: #374151; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                  📞 Contact Information
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 80px;">Phone:</td>
                    <td style="padding: 8px 0; color: #374151; font-weight: 500;">(02) 84-2061-59</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0;">
                      <a href="mailto:rocksolidskilled@gmail.com" style="color: #2563eb; text-decoration: none; font-weight: 500;">rocksolidskilled@gmail.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600; vertical-align: top;">Address:</td>
                    <td style="padding: 8px 0; color: #374151; font-weight: 500;">2nd Floor Lifestyle building, 1928 Leon Guinto Street, Brgy 692 Malate Manila</td>
                  </tr>
                </table>
              </div>
              
              <!-- Closing Message -->
              <div style="text-align: center; margin: 35px 0;">
                <p style="color: #374151; font-size: 16px; margin: 0 0 20px 0;">
                  We look forward to helping you achieve your international career goals! 🚀
                </p>
                <p style="color: #374151; font-weight: 600; margin: 0;">
                  Best regards,<br>
                  <span style="color: #2563eb;">The Rock Solid Manpower Team</span>
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f1f5f9; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 12px;">
                This is an automated confirmation email. Please do not reply to this message.<br>
                <span style="color: #94a3b8;">© ${new Date().getFullYear()} Rock Solid Manpower. All rights reserved.</span>
              </p>
            </div>
          </div>
        </body>
        </html>
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
