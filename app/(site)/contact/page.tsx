'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle2, Loader2, Church, MessageCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', type: 'general', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const contactTypes = [
    { value: 'general', label: 'General Question', icon: HelpCircle },
    { value: 'partnership', label: 'Church Partnership', icon: Church },
    { value: 'feedback', label: 'Feedback', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 mb-6">
            <Mail className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-bark mb-4">
            Get in Touch
          </h1>
          <p className="text-bark/50 text-lg">
            Have a question, want to partner, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-sprouts-light/50 rounded-2xl p-10 border border-sprouts/20 text-center">
            <CheckCircle2 className="w-14 h-14 text-sprouts mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-bark mb-2">
              Message Sent!
            </h2>
            <p className="text-bark/60">
              Thank you for reaching out. We&apos;ll get back to you as soon as we can.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Type */}
            <div>
              <label className="block text-sm font-semibold text-bark mb-3">What can we help with?</label>
              <div className="grid grid-cols-3 gap-2">
                {contactTypes.map((ct) => (
                  <button
                    key={ct.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: ct.value })}
                    className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      formData.type === ct.value
                        ? 'border-gold bg-gold/5 text-bark'
                        : 'border-bark/10 text-bark/40 hover:border-bark/20'
                    }`}
                  >
                    <ct.icon className="w-5 h-5 mx-auto mb-1.5" />
                    <span className="text-xs font-medium">{ct.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-bark mb-2">Name</label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-bark mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-bark mb-2">Message</label>
              <textarea
                placeholder="How can we help?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="flex w-full rounded-2xl border-2 border-gold/20 bg-white px-5 py-3 text-sm text-bark placeholder:text-bark/40 transition-all duration-200 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        )}

        {/* FAQ Mini */}
        <div className="mt-16">
          <h2 className="font-display text-xl font-bold text-bark mb-6 text-center">
            Common Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: 'How do I redeem my QR code?', a: 'Scan the QR code on your printed pack page with your phone camera, or visit seedlingstories.co/redeem and enter the code manually.' },
              { q: 'Can I print the packs more than once?', a: 'Absolutely! Once you purchase a pack, you can print it as many times as you need — perfect for classrooms and co-ops.' },
              { q: 'Do you offer church/ministry bulk pricing?', a: 'Yes! Use the contact form above and select "Church Partnership" to learn about our bulk pricing options.' },
              { q: 'What ages are the packs designed for?', a: 'We have packs for ages 2-12, organized into four tiers: Seeds (2-4), Sprouts (4-6), Branches (6-9), and Roots (9-12).' },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gold/10 p-5">
                <h3 className="font-display text-sm font-bold text-bark mb-1.5">{faq.q}</h3>
                <p className="text-bark/50 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
