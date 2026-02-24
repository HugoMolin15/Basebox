'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

declare global {
    interface Window {
        google: any;
    }
}

/**
 * Configuration First: All changeable text, links, and image URLs MUST be defined here.
 */
const SETTINGS = {
    title: "Welcome back",
    subtitle: "Login to continue your journey with us.",
    social: {
        google: "Sign up with Google",
        github: "Sign up with GitHub",
    },
    dividerText: "Or register with email",
    fields: {
        email: {
            label: "Email",
            placeholder: "Enter your email",
        },
        password: {
            label: "Password",
            placeholder: "Enter your password",
        },
    },
    actions: {
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        submit: "Sign in",
    },
    footer: {
        text: "Don't Have an account?",
        linkText: "Sign Up",
        linkHref: "#",
    },
    api: {
        googleClientId: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
    }
};

/**
 * Shared SVG Icons
 */
const GoogleIcon = () => (
    <svg className="size-5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const GithubIcon = () => (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const SocialButton = ({ icon: Icon, label, onClick }: { icon: React.FC, label: string, onClick?: () => void }) => (
    <button
        onClick={onClick}
        type="button"
        className="btn-white btn-lg btn-pill flex items-center justify-center gap-3 w-full"
        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}
    >
        <Icon />
        {label}
    </button>
);

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

export function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [googleClient, setGoogleClient] = useState<any>(null);

    // Google API Integration
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.google) {
                try {
                    const client = window.google.accounts.oauth2.initTokenClient({
                        client_id: SETTINGS.api.googleClientId,
                        scope: "openid profile email",
                        callback: (resp: any) => console.log("Google Auth success:", resp),
                    });
                    setGoogleClient(client);
                } catch (e) {
                    console.log("Google SDK ready, waiting for valid Client ID");
                }
            }
        };
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login Submit:', formData);
    };

    return (
        <div className="w-full bg-white flex items-center justify-center p-6 md:p-12">
            <div
                className="border-gray-thin w-full max-w-[500px] p-8 md:p-12 bg-white"
                style={{ borderRadius: 'var(--radius-s)' }}
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <h1
                        className="mb-2"
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                    >
                        {SETTINGS.title}
                    </h1>
                    <p style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', opacity: 0.6 }}>
                        {SETTINGS.subtitle}
                    </p>
                </div>

                {/* Social Login */}
                <div className="flex flex-col gap-3 mb-8">
                    <SocialButton
                        icon={GoogleIcon}
                        label={SETTINGS.social.google}
                        onClick={() => googleClient?.requestAccessToken()}
                    />
                    <SocialButton
                        icon={GithubIcon}
                        label={SETTINGS.social.github}
                    />
                </div>

                {/* Divider */}
                <div className="relative flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px border-t border-gray-thin"></div>
                    <span
                        className="uppercase tracking-widest whitespace-nowrap"
                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.4 }}
                    >
                        {SETTINGS.dividerText}
                    </span>
                    <div className="flex-1 h-px border-t border-gray-thin"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-[var(--spacing-library-gap)]">
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

                    <FormField label={SETTINGS.fields.password.label} id="password">
                        <div className="relative group">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder={SETTINGS.fields.password.placeholder}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="lib-input"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                                style={{ color: 'var(--color-black-lighter)', opacity: 0.5 }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </FormField>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                className="lib-checkbox"
                            />
                            <span
                                className="transition-colors group-hover:text-[var(--color-black)]"
                                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', opacity: 0.8 }}
                            >
                                {SETTINGS.actions.rememberMe}
                            </span>
                        </label>
                        <a
                            href="#"
                            className="transition-colors hover:underline hover:text-[var(--color-brand-normal)]"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', opacity: 0.8 }}
                        >
                            {SETTINGS.actions.forgotPassword}
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn-primary btn-lg btn-pill w-full mt-4"
                    >
                        {SETTINGS.actions.submit}
                    </button>
                </form>

                {/* Footer */}
                <div
                    className="text-center mt-10"
                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                >
                    {SETTINGS.footer.text}{' '}
                    <a
                        href={SETTINGS.footer.linkHref}
                        className="transition-colors hover:underline"
                        style={{ color: 'var(--color-brand-normal)', fontWeight: 'var(--font-weight-semibold)' }}
                    >
                        {SETTINGS.footer.linkText}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
