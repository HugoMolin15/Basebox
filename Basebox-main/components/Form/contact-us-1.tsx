'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * Configuration First: All changeable text, links, and image URLs MUST be defined here.
 */
const SETTINGS = {
    title: "Contact Us",
    subtitle: "Get in touch with our team for any inquiries or assistance.",
    form: {
        firstName: {
            label: "First Name",
            placeholder: "Cameron",
        },
        lastName: {
            label: "Last Name",
            placeholder: "Williamson",
        },
        email: {
            label: "Email",
            placeholder: "yourname@company.com",
        },
        phone: {
            label: "Phone number",
            placeholder: "+1 (555) 444-0000",
        },
        message: {
            label: "Message",
            placeholder: "Type your message here",
        },
        consent: {
            text: "I'd like to receive more information about company. I understand and agree to the",
            linkText: "Privacy Policy",
            linkHref: "#",
        },
        submit: "Send Message",
    }
};

const FormField = ({ label, id, children }: { label: string, id: string, children: React.ReactNode }) => (
    <div className="flex flex-col gap-2 w-full">
        <label
            htmlFor={id}
            className="uppercase tracking-widest ml-1"
            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.5 }}
        >
            {label}
        </label>
        {children}
    </div>
);

export function ContactUs() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        consent: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Submit:', formData);
    };

    return (
        <div className="w-full bg-white flex items-center justify-center p-6 md:p-12">
            <div
                className="border-gray-thin w-full max-w-[640px] p-8 md:p-12 bg-white"
                style={{ borderRadius: 'var(--radius-s)' }}
            >
                {/* Header */}
                <div className="mb-10 text-left">
                    <h1
                        className="mb-3"
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                    >
                        {SETTINGS.title}
                    </h1>
                    <p style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', opacity: 0.6 }}>
                        {SETTINGS.subtitle}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-[var(--spacing-library-gap)]">
                    {/* Name Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-library-gap)]">
                        <FormField label={SETTINGS.form.firstName.label} id="firstName">
                            <input
                                id="firstName"
                                type="text"
                                placeholder={SETTINGS.form.firstName.placeholder}
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="lib-input"
                            />
                        </FormField>
                        <FormField label={SETTINGS.form.lastName.label} id="lastName">
                            <input
                                id="lastName"
                                type="text"
                                placeholder={SETTINGS.form.lastName.placeholder}
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="lib-input"
                            />
                        </FormField>
                    </div>

                    {/* Email */}
                    <FormField label={SETTINGS.form.email.label} id="email">
                        <input
                            id="email"
                            type="email"
                            placeholder={SETTINGS.form.email.placeholder}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="lib-input"
                        />
                    </FormField>

                    {/* Phone */}
                    <FormField label={SETTINGS.form.phone.label} id="phone">
                        <input
                            id="phone"
                            type="tel"
                            placeholder={SETTINGS.form.phone.placeholder}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="lib-input"
                        />
                    </FormField>

                    {/* Message */}
                    <FormField label={SETTINGS.form.message.label} id="message">
                        <textarea
                            id="message"
                            rows={6}
                            placeholder={SETTINGS.form.message.placeholder}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="lib-input resize-none"
                        />
                    </FormField>

                    {/* Consent */}
                    <div className="flex items-start gap-3 mt-2">
                        <input
                            type="checkbox"
                            id="consent"
                            checked={formData.consent}
                            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                            className="lib-checkbox"
                        />
                        <label
                            htmlFor="consent"
                            className="leading-snug cursor-pointer select-none"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                        >
                            {SETTINGS.form.consent.text}{' '}
                            <a
                                href={SETTINGS.form.consent.linkHref}
                                className="hover:underline transition-all"
                                style={{ color: 'var(--color-brand-normal)', fontWeight: 'var(--font-weight-semibold)' }}
                            >
                                {SETTINGS.form.consent.linkText}
                            </a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn-primary btn-lg btn-pill w-full mt-4"
                    >
                        {SETTINGS.form.submit}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactUs;
