import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Youtube, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add Web3Forms configuration
    formData.append("access_key", "4ae85db7-42f9-498b-a3c8-9088edc2aa98");
    formData.append("subject", "New Contact Form Submission - PCEA Thing'ati Website");
    formData.append("from_name", "PCEA Thing'ati Website");

    // Convert to JSON for more reliable fetch submission
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus('success');
        form.reset();
      } else {
        console.error("Web3Forms error:", data);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-2">Get in Touch</h2>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-6">We'd Love to Hear From You</h1>
          <p className="text-lg text-gray-600 mb-8">
            Whether you have a question about our services, need prayer, or want to get involved, we're here to help.
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://www.facebook.com/PceaThingati?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="bg-primary/5 p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"><Facebook size={24} /></a>
            <a href="https://www.youtube.com/@pceathingatichurch7316" target="_blank" rel="noopener noreferrer" className="bg-primary/5 p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"><Youtube size={24} /></a>
            <a href="https://www.tiktok.com/@thingati_pulse?_r=1&_t=ZS-96uPh6EBu0j" target="_blank" rel="noopener noreferrer" className="bg-primary/5 p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Information & Map */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary-dark mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-accent">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-dark mb-1">Our Location</h4>
                    <p className="text-gray-600 mb-2">PCEA Thing'ati<br/>Address 78-00218<br/>Ngecha, Kenya</p>
                    <a 
                      href="https://maps.app.goo.gl/ittYuezz5YGJMsYd6" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-accent transition-colors"
                    >
                      Open in Maps <MapPin size={14} />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-dark mb-1">Email Address</h4>
                    <p className="text-gray-600">church@pceathingati.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-accent">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-dark mb-1">Service Times</h4>
                    <p className="text-gray-600">Sundays at 9:00 AM & 11:00 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl border border-primary/10 overflow-hidden flex flex-col h-full min-h-[400px]">
              <div className="p-8 pb-4 flex flex-col items-center text-center">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <MapPin size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary-dark mb-2">Find Us on the Map</h3>
                <p className="text-gray-600 mb-6">
                  Get accurate directions to PCEA Thing'ati directly via Google Maps.
                </p>
                <a 
                  href="https://maps.app.goo.gl/ittYuezz5YGJMsYd6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto px-8"
                >
                  Get Directions
                </a>
              </div>
              <div className="w-full flex-1 min-h-[250px] mt-auto">
                <iframe 
                  src="https://maps.google.com/maps?q=PCEA%20Thing'ati%20Church,%20Ngecha&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '250px' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="PCEA Thing'ati Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="card-soft p-8 md:p-10 border-t-8 border-t-primary h-full">
              <h3 className="text-2xl font-serif font-bold text-primary-dark mb-6">Send a Message</h3>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <input type="text" name="first_name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                    <input type="text" name="last_name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input type="email" name="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary" required />
                </div>
                

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Inquiry Type</label>
                  <select name="inquiry_type" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary appearance-none bg-white">
                    <option value="general">General Inquiry</option>
                    <option value="prayer">Prayer Request</option>
                    <option value="volunteer">Volunteering</option>
                    <option value="visit">Planning a Visit</option>
                    <option value="pastoral">Pastoral Care</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your Message</label>
                  <textarea name="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary resize-none" required></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      <Send size={20} /> Send Message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 mt-4">
                    <CheckCircle2 size={20} />
                    <span>Your message has been sent successfully. We'll be in touch soon.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 mt-4">
                    <span>There was an error sending your message. Please try again or email us directly at <a href="mailto:church@pceathingati.org" className="underline font-bold hover:text-red-900">church@pceathingati.org</a>.</span>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

