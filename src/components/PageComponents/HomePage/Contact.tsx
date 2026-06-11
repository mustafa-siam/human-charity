"use client";
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send, Users, Heart, Navigation, Clock, ArrowUpRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { upsertContactMessage } from '@/app/ServerActions/contact';
import Image from 'next/image';

// Office coordinates – Shahjalal Uposhahar, Sylhet, Bangladesh
const OFFICE_LAT = 24.9045;
const OFFICE_LNG = 91.8611;

function FloatingLabel({
  id,
  label,
  active,
  filled,
}: {
  id: string;
  label: string;
  active: boolean;
  filled: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={`absolute left-4 pointer-events-none transition-all duration-200 ${
        active || filled
          ? '-top-2.5 text-[11px] font-medium text-[#10B981] bg-white px-1'
          : 'top-3.5 text-sm text-gray-400'
      }`}
    >
      {label}
    </label>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => form.append(key, value));
      const res = await upsertContactMessage(form);
      if (res.success) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        toast.error(res.error || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
        toast.success('Location found! Opening directions…');
        // Open Google Maps directions from user to office
        const url = `https://www.google.com/maps/dir/${pos.coords.latitude},${pos.coords.longitude}/${OFFICE_LAT},${OFFICE_LNG}`;
        window.open(url, '_blank');
      },
      () => {
        setLocating(false);
        toast.error('Unable to retrieve your location');
      }
    );
  };

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${OFFICE_LNG - 0.015}%2C${OFFICE_LAT - 0.01}%2C${OFFICE_LNG + 0.015}%2C${OFFICE_LAT + 0.01}&layer=mapnik&marker=${OFFICE_LAT}%2C${OFFICE_LNG}`;

  const inputClass =
    'w-full px-4 py-3 pt-5 border border-gray-200 rounded-xl focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 focus:outline-none transition-all duration-200 text-sm text-gray-900 bg-white hover:border-gray-300';

  return (
    <section id="contact" className="mb-24 bg-[#F8FAFB] relative overflow-hidden">

      {/* ── Subtle background texture ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="bg-white border-b border-gray-100">
  <div className="container mx-auto px-6 lg:px-16 pb-14">
    <motion.div
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <span className="inline-flex items-center gap-2 text-[#10B981] text-xs font-semibold tracking-widest uppercase mb-3">
          <span className="w-6 h-px bg-[#10B981]" />
          Contact Us
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight">
          Let's Make a<br />
          <span className="text-[#10B981]">Difference Together</span>
        </h2>
      </div>
      <p className="text-gray-500 text-[14px] leading-relaxed max-w-sm lg:text-right">
        Whether you want to donate, volunteer, or partner with us — our team in Sylhet is ready to hear from you.
      </p>
    </motion.div>
  </div>
</div>
      <div className="container mx-auto px-6 lg:px-16 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* ── Form ── */}
          <motion.div
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 h-full flex flex-col"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-[#0F172A] mb-1">Send us a Message</h3>
            <p className="text-gray-400 text-xs mb-6">We reply within one business day.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input id="name" type="text" name="name" value={formData.name} onChange={handleChange}
                    onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                    className={inputClass} placeholder=" " required />
                  <FloatingLabel id="name" label="Full Name" active={focusedField === 'name'} filled={!!formData.name} />
                </div>
                <div className="relative">
                  <input id="email" type="email" name="email" value={formData.email} onChange={handleChange}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    className={inputClass} placeholder=" " required />
                  <FloatingLabel id="email" label="Email Address" active={focusedField === 'email'} filled={!!formData.email} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)}
                    className={inputClass} placeholder=" " />
                  <FloatingLabel id="phone" label="Phone (Optional)" active={focusedField === 'phone'} filled={!!formData.phone} />
                </div>
                <div className="relative">
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange}
                    onFocus={() => setFocusedField('subject')} onBlur={() => setFocusedField(null)}
                    className={`${inputClass} appearance-none`} required>
                    <option value="" />
                    <option value="donation">Make a Donation</option>
                    <option value="volunteer">Volunteer with Us</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="general">General Inquiry</option>
                  </select>
                  <FloatingLabel id="subject" label="Subject" active={focusedField === 'subject'} filled={!!formData.subject} />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="relative">
                <textarea id="message" name="message" value={formData.message} onChange={handleChange}
                  onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                  rows={5} className={`${inputClass} resize-none`} placeholder=" " required />
                <FloatingLabel id="message" label="Your Message" active={focusedField === 'message'} filled={!!formData.message} />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-[#10B981] hover:bg-[#059669] text-white px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 cursor-pointer"
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
              >
                {loading ? (
                  <>
                    <motion.span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} />
                    Sending…
                  </>
                ) : (
                  <>Send Message <Send className="w-4 h-4" /></>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* ── Image ── */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-md h-full"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/carevalue.jpg"
              alt="Human Care volunteers making a difference"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-1">Our Mission</p>
              <p className="text-white text-lg font-bold leading-snug">Making Worldwide Change,<br />One Region at a Time</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAP  SECTION
      ══════════════════════════════════════════ */}
      <div className="container mx-auto px-6 lg:px-16 pb-16">
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Map header bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#10B981]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Our Location</p>
                <p className="text-xs text-gray-400">49/A Block-B, Shahjalal Uposhahar, Sylhet, Bangladesh</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Get Directions from my location */}
              <button
                onClick={handleLocate}
                disabled={locating}
                className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] disabled:bg-[#10B981]/60 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                {locating ? (
                  <motion.span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} />
                ) : (
                  <Navigation className="w-3.5 h-3.5" />
                )}
                {locating ? 'Locating…' : 'Directions from Me'}
              </button>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${OFFICE_LAT},${OFFICE_LNG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors duration-200"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                Open in Maps
              </a>
            </div>
          </div>

          {/* Embedded OpenStreetMap — no API key needed */}
          <div className="relative w-full h-72 sm:h-96">
            <iframe
              ref={iframeRef}
              src={mapSrc}
              title="Human Care Organisation – Office Location"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
            {/* Attribution overlay bottom-right already included by OSM */}
          </div>

        </motion.div>
      </div>

    </section>
  );
}