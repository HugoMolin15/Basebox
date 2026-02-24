'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin } from 'lucide-react';

/**
 * Configuration First: All changeable text, links, and image URLs MUST be defined here.
 */
const SETTINGS = {
    content: {
        title: "Get in Touch",
        subtitle: "Whether it's a question or a collaboration, we'd love to hear from you.",
        contactItems: [
            {
                icon: Phone,
                label: "Number",
                value: "+894 022 0232",
            },
            {
                icon: Mail,
                label: "Email",
                value: "info@gmail.com",
            },
            {
                icon: MapPin,
                label: "Location",
                value: "1234 Innovation Street, Suite 567\nNew York, US",
            }
        ]
    },
    form: {
        firstName: {
            label: "First Name",
            placeholder: "Jhon",
        },
        lastName: {
            label: "Last Name",
            placeholder: "Doe",
        },
        email: {
            label: "Email",
            placeholder: "info@gmail.com",
        },
        phone: {
            label: "Phone",
            placeholder: "Enter your phone number",
        },
        message: {
            label: "Message",
            placeholder: "Type your message here",
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

const ContactItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-start gap-4">
        <div
            className="flex items-center justify-center size-10 bg-white border-gray-thin flex-shrink-0"
            style={{ borderRadius: 'var(--radius-s)' }}
        >
            <Icon className="size-5" style={{ color: 'var(--color-black-lighter)' }} />
        </div>
        <div className="flex flex-col">
            <span
                className="uppercase tracking-widest"
                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.4 }}
            >
                {label}
            </span>
            <span
                className="whitespace-pre-line leading-relaxed"
                style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
            >
                {value}
            </span>
        </div>
    </div>
);

export function ContactUs() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Submit:', formData);
    };

    return (
        <div className="w-full bg-white flex flex-col p-6 md:p-12 items-center justify-center">
            <div
                className="w-full max-w-7xl flex flex-col md:flex-row overflow-hidden border-gray-thin"
                style={{ borderRadius: 'var(--radius-s)' }}
            >
                {/* Left Column: Info Section */}
                <div className="w-full md:w-[45%] bg-zinc-50 flex flex-col justify-center p-8 md:p-24 lg:p-32">
                    <div className="max-w-md">
                        <h1
                            className="mb-4"
                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                        >
                            {SETTINGS.content.title}
                        </h1>
                        <p
                            className="mb-12 max-w-sm leading-relaxed"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', opacity: 0.6 }}
                        >
                            {SETTINGS.content.subtitle}
                        </p>

                        <div className="flex flex-col gap-8">
                            {SETTINGS.content.contactItems.map((item, index) => (
                                <ContactItem key={index} {...item} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Form Section */}
                <div className="w-full md:w-[55%] bg-white flex flex-col justify-center p-8 md:p-24 lg:p-32">
                    <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-[var(--spacing-library-gap)]">
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
        </div>
    );
}

export default ContactUs;
