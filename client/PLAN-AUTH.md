<!-- Stack note: kita pakai HANYA yang dibutuhkan & best-practice.
React Hook Form, Atomic Design, Storybook Autodocs, Jest, Zustand SUDAH wajib
di flow ini. Hooks dipakai sesuai kebutuhan (useState/useEffect/useRef/
useCallback natural di OtpInput + theme sync), BUKAN checklist kaku.
12-point brainstorming awal = referensi, bukan kontrak. -->

# PM-FE — Auth Flow Implementation Plan (Sign In / Sign Up / OTP / Forgot Password)
---

## 1. Decisions (locked)

| Item | Choice |
|---|---|
| OTP trigger | **Forgot-password reset** + **Signup verification** |
| Signup fields | Full: `name`, `email`, `password`, `confirmPassword` |
| Theme switcher | Ya — port dark/light dari prototype, wire `uiStore.theme` → `<html>` |
| Palette | Adopt prototype: `brand-blue` #0C5EAD + `brand-orange` #F99823 (dual-accent) |
| Validation | BE-side only (no Zod FE). FE maps BE errors via `setError()` |
| BE status | Belum ada → mock handler di `apiClient` (intercept `/auth/*`) |
| Temp state antar-step | `authStore.pendingEmail` (single source of truth, bukan router state) |
| OTP length | **6 digit** |
| Responsive | Wajib: mobile stack (single col), `md:` split 2-col. Ilustrasi hidden di mobile. |
| Animation | Adopt prototype: fade-in (translateY+opacity) + hover-float ilustrasi. |

---

## 2. Routing & Loaders

Tambah ke `src/routes/paths.ts`:
```
signup: '/signup',
forgotPassword: '/forgot-password',
verifyOtp: '/verify-otp',
```

Tambah ke `src/routes/router.tsx` (semua `guestLoader`):
```
/login             → LoginPage
/signup            → SignupPage
/forgot-password   → ForgotPasswordPage
/verify-otp        → OtpPage   (loader: cek pendingEmail, redirect /login kalau kosong)
```

`OtpPage` loader:
```ts
export function otpLoader() {
  if (!useAuthStore.getState().pendingEmail) throw redirect(paths.login);
  return null;
}
```

---

## 3. Stores

### `src/store/authStore.ts` (extend)
Tambah:
```ts
pendingEmail: string | null;
setPendingEmail: (email: string) => void;
clearPending: () => void;
```
- `useSignupMutation` / `useForgotPasswordMutation` → `setPendingEmail(email)`
- `useVerifyOtpMutation` (signup) → `setAuth` + `clearPending`
- `useVerifyOtpMutation` (forgot) → `clearPending`, user redirect ke login

### `src/store/uiStore.ts` (already has `theme`)
Wire ke DOM di `App.tsx`:
```ts
useEffect(() => {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
}, [theme]);
```
Load awal: baca `uiStore.theme` (default `'light'`).

---

## 4. Mock API Layer (karena BE belum ada)

File baru: `src/api/mock.ts`
- Intercept `apiClient` via axios adapter atau respon interceptor:
  - `POST /auth/login` → balikin `{ token: 'mock-jwt', user: { id, email, name, role } }`
  - `POST /auth/signup` → 200 OK (set pendingEmail di store lewat mutation)
  - `POST /auth/forgot` → 200 OK
  - `POST /auth/verify-otp` → `{ token, user }` (signup) / 200 (forgot)
- Simulasi latency 400ms + random gagal? **Tidak** — deterministic supaya test stabil.
- Aktifkan lewat `import './api/mock'` di `main.tsx` (bisa di-gate `config.isDev`).

> Nanti pas BE jadi, tinggal hapus import mock → query nyambung ke Express otomatis.

---

## 5. API Queries (BE-only validation)

`src/api/queries/auth.ts` (extend):
```ts
useLoginMutation();           // POST /auth/login        → setAuth
useSignupMutation();          // POST /auth/signup       → setPendingEmail
useForgotPasswordMutation();  // POST /auth/forgot        → setPendingEmail
useVerifyOtpMutation(mode);   // POST /auth/verify-otp    → setAuth | clearPending
```

Error mapping (konsisten di semua page):
```ts
catch (err) {
  const res = err as AxiosError<ApiErrorResponse>;
  if (res.response?.data?.errors) {
    // map per-field: email / password / name / code
    for (const [k, v] of Object.entries(res.response.data.errors)) methods.setError(k, { message: v[0] });
  } else {
    methods.setError('root', { message: res.response?.data?.message ?? 'Something went wrong' });
  }
}
```

---

## 6. Components (Atomic Design)

### Atoms (baru/dikaikan)
- `ThemeToggle` — tombol kanan-atas (🌙/☀️), pakai `uiStore.theme` + `setTheme`.
  File: `src/components/atoms/ThemeToggle/ThemeToggle.tsx` (+ test + story).
- `Input` (sudah ada) — dipakai `TextField`.

### Molecules (baru)
- `TextField` — port prototype's icon input: `label` + SVG icon kiri + `Input` + error.
  File: `src/components/molecules/TextField/TextField.tsx` (+ test + story).
- `OtpInput` — 4 box, auto-advance focus, backspace-to-prev, paste-support.
  Port JS prototype ke React (`useRef` array + `useCallback`/`useEffect` + `onInput`/`onKeyDown`).
  **6 digit** (sesuai update). File: `src/components/molecules/OtpInput/OtpInput.tsx` (+ test + story).
- `FormField` (sudah ada) — dipakai signup (name/email/password/confirm) & forgot.
- `AuthCard` — container split-layout: kiri form, kanan illustration. Port prototype's
  `grid md:grid-cols-2` + glow + card. File: `src/components/molecules/AuthCard/AuthCard.tsx`.

### Organisms (baru)
- `AuthIllustration` — SVG server/shield dari prototype (static, reusable di login & signup).
  File: `src/components/organisms/AuthIllustration/AuthIllustration.tsx`.

### Templates (upgrade)
- `AuthLayout` (sudah ada) → upgrade:
  - Terima `children` + optional `illustration` prop.
  - Render `ThemeToggle` absolute kanan-atas.
  - Pakai `AuthCard` sebagai wrapper split-layout.
  - Fallback mode (forgot/otp) → `max-w-lg` centered tanpa illustration (sesuai prototype).

### Pages (baru/upgrade)
- `LoginPage` (upgrade) — split layout: `TextField` email + password + Remember me +
  Forgot link + gradient submit + "Sign up for free" link → `/signup`.
- `SignupPage` (baru) — full: name + email + password + confirm, submit → `useSignupMutation`
  → navigate `/verify-otp` (pendingEmail terisi).
- `ForgotPasswordPage` (baru) — email + fake "I am human" captcha box + Send Reset →
  `useForgotPasswordMutation` → navigate `/verify-otp`.
- `OtpPage` (baru) — `OtpInput` 4-box + Verify + Resend + Back. Mode ditentukan dari
  asal: kalau dari signup → verify → `setAuth` → `/dashboard`; kalau dari forgot →
  verify → clearPending → `/login` + toast "Password reset, please sign in".

---

## 8. Tokens — `src/index.css` @theme (adopt prototype)

Sesuai brainstorming awal (12-point stack) + request terbaru:

- **Responsive**: `AuthCard` default `max-w-lg` centered (mobile). `md:` → `md:grid-cols-2`
  split (form kiri, illustration kanan). Illustration `hidden md:flex`. Input/button full-width
  di mobile, comfortable spacing di desktop.
- **Animation** (adopt dari prototype, port ke React/Tailwind):
  - Fade-in antar view: `animate-[fadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)]`
    (tambah `@keyframes fadeIn` translateY+opacity di `index.css`).
  - Hover-float ilustrasi: `transition-transform hover:-translate-y-2`.
  - Button hover: `hover:-translate-y-0.5 hover:shadow-glow-*`.
  - Input focus: `focus:ring-2 focus:ring-brand-orange/50`.
- **12-point stack coverage** (audit): `useRef` + `useCallback` belum hand-written →
  `OtpInput` jadi tempatnya (checkbox #7 jadi 5/5). `useMemo` sudah di DataTablePage,
  `useState`/`useEffect` sudah ada. `QueryBuilder` + `Socket.IO` sudah di-implement tapi belum
  di-surface ke page → akan di-integrate biar checklist "integrated" 100%.


Tambah:
```css
--color-brand-blue: #0C5EAD;
--color-brand-blue-hover: #0A4C8C;
--color-brand-orange: #F99823;
--color-brand-orange-hover: #DF8216;

--color-app-bg-light: #F4F6F8;
--color-card-bg-light: #FFFFFF;
--color-border-light: #E2E8F0;
--color-input-bg-light: #F8FAFC;
--color-text-main-light: #1E293B;
--color-text-muted-light: #64748B;

--color-app-bg-dark: #0B1120;
--color-card-bg-dark: #1E293B;
--color-border-dark: #334155;
--color-input-bg-dark: #0F172A;
--color-text-main-dark: #F8FAFC;
--color-text-muted-dark: #94A3B8;
```
Plus glow shadows:
```css
--shadow-glow-blue: 0 0 20px -5px rgba(12,94,173,0.4);
--shadow-glow-orange: 0 0 20px -5px rgba(249,152,35,0.4);
```
Font Inter sudah di `@theme` → pastiin di-load (tambah `@import` Google Fonts di `index.css`
atau `<link>` di `index.html`).

> Note: Tailwind v4 dark mode = `class` strategy → sudah otomatis karena kita toggle
> class `dark` di `<html>`. Tokens `*-light`/`*-dark` dipakai eksplisit lewat
> `dark:` variant (contoh: `bg-app-bg-light dark:bg-app-bg-dark`).

---

## 8. Illustration

SVG server/shield dari prototype di-port jadi `AuthIllustration` (path + circle sama
persis, warnanya pakai `brand-blue`/`brand-orange` via `fill-current` atau hardcode hex
sesuai prototype). Reusable di Login + Signup.

---

## 9. File List (baru/diubah)

**Baru:**
- `src/api/mock.ts`
- `src/components/atoms/ThemeToggle/{ThemeToggle.tsx,.test.tsx,.stories.tsx,index.ts}`
- `src/components/molecules/TextField/{TextField.tsx,.test.tsx,.stories.tsx,index.ts}`
- `src/components/molecules/OtpInput/{OtpInput.tsx,.test.tsx,.stories.tsx,index.ts}`
- `src/components/molecules/AuthCard/{AuthCard.tsx,index.ts}`
- `src/components/organisms/AuthIllustration/{AuthIllustration.tsx,index.ts}`
- `src/pages/SignupPage.tsx`
- `src/pages/ForgotPasswordPage.tsx`
- `src/pages/OtpPage.tsx`

**Diubah:**
- `src/store/authStore.ts` (+ pendingEmail)
- `src/store/uiStore.ts` (sudah ada, cukup wire di App)
- `src/api/queries/auth.ts` (+ signup/forgot/verifyOtp)
- `src/routes/paths.ts` (+ 3 path)
- `src/routes/router.tsx` (+ 3 route + otpLoader)
- `src/routes/guards.tsx` (+ otpLoader)
- `src/components/templates/AuthLayout.tsx` (split + ThemeToggle + AuthCard)
- `src/pages/LoginPage.tsx` (split + TextField + illustration + links)
- `src/App.tsx` (wire theme → `<html>`)
- `src/main.tsx` (import mock kalau dev)
- `src/index.css` (@theme tokens + font import)
- `src/index.html` (font link, optional)

---

## 10. Validation Checklist (seperti sebelumnya)

- `npx tsc -b` → 0 errors
- `npm run build` → success
- `npm test` → semua suite pass (tambah test per page + molecule)
- `npm run lint` → 0 errors
- `npm run build-storybook` → success (autodocs jalan)
- Manual: `npm run dev` → login/signup/forgot/otp flow jalan dengan mock API

---

## 11. Assumptions

- OTP = **6 digit** (sesuai update).
- "Remember me" = UI only (ga di-wire ke persist tambahan; token tetap di `authStore.persist`).
- Fake captcha "I am human" = visual saja (Prototype emang gitu, BE nanti yang validasi nyata).
- Mock API deterministic (no random failure) biar test stabil.
- Signup verification → auto-login setelah OTP benar. Forgot → OTP benar → balik login.
- Package manager: npm (sudah terbukti butuh `--include=dev --include=optional` di env ini).
- Responsive wajib (mobile stack → md: split 2-col). Animation diadopsi dari prototype.
