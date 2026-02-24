'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Mail, Phone, MessageSquare, Send } from 'lucide-react';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * Configuration First: All changeable text, links, and image URLs MUST be defined here.
 */
const SETTINGS = {
    title: "Get in Touch",
    subtitle: "Whether it's a question or a collaboration, we'd love to hear from you.",
    fields: {
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
        message: {
            label: "Message",
            placeholder: "Type your message here",
        },
        consent: {
            text: "You agree to our friendly privacy policy.",
            linkHref: "#",
        },
        submit: "Send Message",
    },
    image: {
        src: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg",
        alt: "Abstract contact visual",
        variant: "soft" as const,
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
        message: '',
        consent: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Submit:', formData);
    };

    return (
        <div className="w-full bg-white flex flex-col items-center justify-center p-6 md:p-12">
            <div
                className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-library-gap)] items-center border-gray-thin bg-white"
                style={{ borderRadius: 'var(--radius-s)' }}
            >

                {/* Left: Form Content */}
                <div className="flex flex-col py-8 px-8 md:px-12">
                    <div className="mb-10">
                        <h1
                            className="mb-4"
                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                        >
                            {SETTINGS.title}
                        </h1>
                        <p style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', opacity: 0.6 }}>
                            {SETTINGS.subtitle}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Name Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label={SETTINGS.fields.firstName.label} id="firstName">
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder={SETTINGS.fields.firstName.placeholder}
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="lib-input"
                                />
                            </FormField>
                            <FormField label={SETTINGS.fields.lastName.label} id="lastName">
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder={SETTINGS.fields.lastName.placeholder}
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="lib-input"
                                />
                            </FormField>
                        </div>

                        {/* Email */}
                        <FormField label={SETTINGS.fields.email.label} id="email">
                            <input
                                id="email"
                                type="email"
                                placeholder={SETTINGS.fields.email.placeholder}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="lib-input"
                            />
                        </FormField>

                        {/* Message */}
                        <FormField label={SETTINGS.fields.message.label} id="message">
                            <textarea
                                id="message"
                                rows={5}
                                placeholder={SETTINGS.fields.message.placeholder}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="lib-input resize-none"
                            />
                        </FormField>

                        {/* Consent */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="consent"
                                checked={formData.consent}
                                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                className="lib-checkbox"
                            />
                            <label
                                htmlFor="consent"
                                className="cursor-pointer select-none"
                                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                            >
                                {SETTINGS.fields.consent.text}
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="btn-primary btn-lg btn-pill w-full md:w-fit px-12"
                        >
                            {SETTINGS.fields.submit}
                        </button>
                    </form>
                </div>

                {/* Right: Visual Section */}
                <div className="w-full h-full min-h-[400px] md:min-h-[600px] p-4">
                    <ImagePrimitive
                        src={SETTINGS.image.src}
                        alt={SETTINGS.image.alt}
                        imageVariant={SETTINGS.image.variant}
                        aspectRatio="none"
                        className="w-full h-full"
                        style={{ borderRadius: 'var(--radius-s)' }}
                        fallbackText="Visual Context"
                    />
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
