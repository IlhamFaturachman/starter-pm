import type { ReactNode } from 'react';
import { AuthIllustration } from '@/components/organisms/AuthIllustration';

export interface AuthLayoutProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  withIllustration?: boolean;
}

export function AuthLayout({ title, subtitle, children, withIllustration }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#f4f6f8] dark:bg-[#070b15] p-4 transition-colors duration-300 md:p-8 lg:p-12 overflow-x-hidden select-none">
      {/* Ambient background mesh gradient glowing spheres */}
      <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0c5ead]/10 dark:bg-[#0c5ead]/25 blur-[120px] animate-[pulse_6s_infinite_alternate]" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#f99823]/5 dark:bg-[#f99823]/15 blur-[130px] animate-[pulse_8s_infinite_alternate_2s]" />
      <div className="absolute top-1/2 left-2/3 h-[300px] w-[300px] rounded-full bg-purple-500/5 dark:bg-purple-600/15 blur-[110px] animate-[pulse_7s_infinite_alternate_1s]" />

      {/* Subtle line grid pattern that adapts to light/dark themes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:35px_35px]" />

      {withIllustration ? (
        /* Main Glassmorphic Container with thin white border reflection */
        <div className="w-full max-w-7xl rounded-[2.5rem] border border-white/10 border-t-white/20 border-l-white/20 bg-white/[0.02] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 ease-in-out overflow-hidden flex items-center justify-center relative z-10 min-h-[680px]">
          <div className="grid w-full items-center gap-8 p-8 md:p-10 lg:grid-cols-12 lg:gap-12 lg:p-16">
            {/* Left side: Slogan, branding, and interactive phone mockup */}
            <div className="flex flex-col items-start text-left lg:col-span-7 select-none">
              {/* Logo and App Name */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-18 items-center justify-center rounded-xl bg-white/10 dark:bg-white/5 border border-white/20 p-1.5 shadow-md">
                  <img src="/pm-logo.svg" alt="Starter PM Logo" className="h-full w-full object-contain brightness-0 invert" />
                </div>
                <span className="text-sm font-extrabold tracking-[0.2em] text-slate-800 dark:text-white">
                  STARTER PM
                </span>
              </div>

              {/* Slogans with High-end Gradient Text */}
              <h2 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:via-white dark:to-white/70 sm:text-4xl leading-tight">
                {title === 'Welcome Back' ? (
                  <>
                    Welcome to Starter PM.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ffb14e] dark:from-brand-orange dark:to-amber-300 font-extrabold">Smarter way</span> to handle your projects.
                  </>
                ) : (
                  <>
                    Join Starter PM.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ffb14e] dark:from-brand-orange dark:to-amber-300 font-extrabold">Smarter way</span> to collaborate.
                  </>
                )}
              </h2>
              <p className="mt-3.5 max-w-md text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-300/80 md:text-sm">
                {title === 'Welcome Back' ? (
                  'Every sprint comes with details. Starter PM tracks them, organizes your Kanban boards, and coordinates tasks. You collaborate. The rest is automatic.'
                ) : (
                  'Set up your repository workspace in seconds, invite your teammates, and start shipping. Join thousands of teams running sprints with Starter PM.'
                )}
              </p>

              {/* Interactive Phone Mockup */}
              <div className="mt-6 hidden w-full justify-center md:flex lg:justify-start lg:pl-6">
                <AuthIllustration />
              </div>
            </div>

            {/* Right side: White/Slate Card Container */}
            <div className="w-full mx-auto lg:col-span-5 max-w-md">
              <div className="relative z-10 w-full overflow-hidden rounded-[2rem] border border-slate-200/40 bg-white/85 p-8 shadow-2xl backdrop-blur-lg dark:border-white/5 dark:bg-[#090d16]/75 md:p-10 transition-all duration-300">
                {/* Logo icon header - direct image without wrapper */}
                <div className="mb-6 flex justify-start">
                  <img src="/pm-logo.svg" alt="PM Logo" className="h-10 w-auto object-contain" />
                </div>

                {/* Title Header */}
                <div className="mb-5 text-left">
                  <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                    {title}
                  </h1>
                  <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {subtitle}
                  </p>
                </div>

                {/* Form Content */}
                {children}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Standalone White/Slate Card Container direct on background */
        <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-200/40 bg-white/85 p-8 shadow-2xl backdrop-blur-lg dark:border-white/5 dark:bg-[#090d16]/75 md:p-10 transition-all duration-300">
          {/* Logo icon header - direct image without wrapper */}
          <div className="mb-6 flex justify-start">
            <img src="/pm-logo.svg" alt="PM Logo" className="h-10 w-auto object-contain" />
          </div>

          {/* Title Header */}
          <div className="mb-5 text-left">
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              {title}
            </h1>
            <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          </div>

          {/* Form Content */}
          {children}
        </div>
      )}
    </div>
  );
}
