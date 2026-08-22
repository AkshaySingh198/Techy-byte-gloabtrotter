import { useState, useEffect } from 'react';

/* ---------- helpers ---------- */
function PasswordStrength({ password }) {
  const checks = [
    { label: 'At least 8 characters', pass: password.length >= 8 },
    { label: 'One uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', pass: /[a-z]/.test(password) },
    { label: 'One number', pass: /[0-9]/.test(password) },
    { label: 'One special character (!@#$…)', pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const strengthLabel = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][score];
  const strengthColor = ['', 'bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-emerald-500'][score];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? strengthColor : 'bg-surface-container-highest'}`}
          />
        ))}
      </div>
      <p className="text-xs font-semibold" style={{ color: score <= 2 ? '#ef4444' : score === 3 ? '#eab308' : '#22c55e' }}>
        {strengthLabel}
      </p>
      <ul className="space-y-1">
        {checks.map((c) => (
          <li key={c.label} className={`flex items-center gap-1.5 text-xs ${c.pass ? 'text-emerald-600' : 'text-on-surface-variant'}`}>
            <span className="material-symbols-outlined text-sm">{c.pass ? 'check_circle' : 'radio_button_unchecked'}</span>
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function OtpInput({ onVerified, label, contact }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const sendOtp = () => {
    setSent(true);
    setTimer(30);
    setError('');
  };

  const handleOtpChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) {
      document.getElementById(`otp-${label}-${idx + 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code === '123456') {
      setVerified(true);
      onVerified(true);
      setError('');
    } else {
      setError('Invalid OTP. (Use 123456 for demo)');
    }
  };

  if (verified) {
    return (
      <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
        <span className="material-symbols-outlined text-lg">verified</span>
        {label} verified!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-xs text-on-surface-variant flex-1 truncate font-medium">{contact || `Enter ${label}`}</span>
        <button
          type="button"
          disabled={!contact || timer > 0}
          onClick={sendOtp}
          className="text-xs font-bold text-primary-container disabled:opacity-40 hover:underline whitespace-nowrap"
        >
          {sent ? (timer > 0 ? `Resend in ${timer}s` : 'Resend OTP') : 'Send OTP'}
        </button>
      </div>

      {sent && (
        <>
          <div className="flex gap-2">
            {otp.map((d, i) => (
              <input
                key={i}
                id={`otp-${label}-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                className="w-9 h-9 text-center text-sm font-bold rounded-lg border border-surface-container-highest focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none"
              />
            ))}
            <button
              type="button"
              onClick={handleVerify}
              className="ml-2 bg-primary-container text-white text-xs font-bold px-3 rounded-lg hover:bg-primary transition-colors"
            >
              Verify
            </button>
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
        </>
      )}
    </div>
  );
}

/* ---------- STEP DEFINITIONS ---------- */
const STEPS = [
  { id: 'profile', label: 'Your Profile', icon: 'person' },
  { id: 'verify', label: 'Verify Contact', icon: 'verified_user' },
  { id: 'password', label: 'Set Password', icon: 'lock' },
];

/* ---------- Google SVG icon ---------- */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" className="shrink-0">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

/* ---------- Apple SVG icon ---------- */
const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 814 1000" className="shrink-0">
    <path fill="#111" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 405.6 0 295.7 0 191.1 0 80.6 61 29.4 119.1 29.4c48.9 0 89.9 33.7 119.1 33.7 28.4 0 74.8-36.1 130.7-36.1 22.9 0 93.2 6.4 142.1 66.4zm-212.2-93.8c25.6-30.4 43.5-72.7 43.5-115.1 0-6.4-.6-12.8-1.9-18.5-40.8 1.3-89.2 27.2-118.4 57.8-23.5 25.6-45.1 68.7-45.1 111.7 0 7 1.3 14 1.9 16.2 2.6.6 6.4 1.3 10.2 1.3 36.7 0 83.1-24.4 109.8-53.4z"/>
  </svg>
);

/* ==================== MAIN COMPONENT ==================== */
export default function AuthModal({ isOpen, onClose, initialMode = 'login', onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPwd, setShowLoginPwd] = useState(false);

  // Signup multi-step
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '', gender: '', age: '', phone: '', email: '', city: '',
    password: '', confirmPassword: '',
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [showForgotPwd, setShowForgotPwd] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMode(initialMode);
    setStep(0);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const update = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  /* ---- Step Validators ---- */
  const validateProfile = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = 'Full name is required.';
    if (!formData.gender) e.gender = 'Please select your gender.';
    if (!formData.age || formData.age < 10 || formData.age > 100) e.age = 'Enter a valid age (10-100).';
    if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) e.phone = 'Enter a valid phone number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email address.';
    if (!formData.city.trim()) e.city = 'City is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateVerify = () => {
    if (!emailVerified) {
      setErrors({ verify: 'Please verify your email before continuing.' });
      return false;
    }
    if (!phoneVerified) {
      setErrors({ verify: 'Please verify your phone before continuing.' });
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const e = {};
    const pwd = formData.password;
    if (pwd.length < 8) e.password = 'Password must be at least 8 characters.';
    else if (!/[A-Z]/.test(pwd)) e.password = 'Add at least one uppercase letter.';
    else if (!/[a-z]/.test(pwd)) e.password = 'Add at least one lowercase letter.';
    else if (!/[0-9]/.test(pwd)) e.password = 'Add at least one number.';
    else if (!/[^A-Za-z0-9]/.test(pwd)) e.password = 'Add at least one special character.';
    if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Passwords do not match.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validateProfile()) return;
    if (step === 1 && !validateVerify()) return;
    if (step === 2) {
      if (!validatePassword()) return;
      alert('🎉 Account created successfully! Welcome to GlobeTrotter!');
      if (onLoginSuccess) {
        onLoginSuccess({ email: formData.email, name: formData.fullName });
      } else {
        onClose();
      }
      return;
    }
    setStep((s) => s + 1);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const e2 = {};
    if (!loginEmail) e2.loginEmail = 'Email is required.';
    if (!loginPassword) e2.loginPassword = 'Password is required.';
    if (Object.keys(e2).length) { setErrors(e2); return; }
    alert(`✈️ Welcome back! Logged in as ${loginEmail}`);
    if (onLoginSuccess) {
      onLoginSuccess({ email: loginEmail, name: loginEmail.split('@')[0] });
    } else {
      onClose();
    }
  };

  const inputCls = (field) =>
    `w-full px-4 py-2.5 rounded-xl border ${errors[field] ? 'border-red-400 ring-2 ring-red-200' : 'border-surface-container-highest focus:border-primary-container focus:ring-2 focus:ring-primary-container/20'} outline-none transition-all text-sm bg-surface text-on-surface`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface rounded-3xl max-w-md w-full relative shadow-2xl border border-surface-container-highest flex flex-col max-h-[92vh]">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-on-surface-variant hover:text-on-surface p-1.5 rounded-full hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">

          {/* Header */}
          <div className="text-center mb-5">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2.5">
              <span className="material-symbols-outlined text-2xl">travel_explore</span>
            </div>
            <h3 className="font-display text-xl font-bold text-on-surface">
              {mode === 'login' ? 'Welcome Back ✈️' : 'Join GlobeTrotter 🌍'}
            </h3>
            <p className="text-on-surface-variant text-xs mt-1">
              {mode === 'login'
                ? 'Log in to access your itineraries and plan new trips.'
                : 'Create your free account to start planning today.'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-surface-container rounded-xl p-1 mb-5">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setStep(0); setErrors({}); }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === m ? 'bg-white text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* ===================== LOGIN ===================== */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-lg">mail</span>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => { setLoginEmail(e.target.value); setErrors((p) => ({ ...p, loginEmail: '' })); }}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.loginEmail ? 'border-red-400 ring-2 ring-red-200' : 'border-surface-container-highest focus:border-primary-container focus:ring-2 focus:ring-primary-container/20'} outline-none text-sm bg-surface text-on-surface`}
                  />
                </div>
                {errors.loginEmail && <p className="text-red-500 text-xs mt-1">{errors.loginEmail}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-lg">lock</span>
                  <input
                    type={showLoginPwd ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => { setLoginPassword(e.target.value); setErrors((p) => ({ ...p, loginPassword: '' })); }}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border ${errors.loginPassword ? 'border-red-400 ring-2 ring-red-200' : 'border-surface-container-highest focus:border-primary-container focus:ring-2 focus:ring-primary-container/20'} outline-none text-sm bg-surface text-on-surface`}
                  />
                  <button type="button" onClick={() => setShowLoginPwd(!showLoginPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary">
                    <span className="material-symbols-outlined text-lg">{showLoginPwd ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                {errors.loginPassword && <p className="text-red-500 text-xs mt-1">{errors.loginPassword}</p>}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgotPwd(true)}
                  className="text-xs text-primary-container font-semibold hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Forgot Password inline panel */}
              {showForgotPwd && (
                <div className="bg-surface-container rounded-xl p-4 space-y-3 border border-surface-container-highest">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-on-surface">Reset your password</p>
                    <button type="button" onClick={() => { setShowForgotPwd(false); setForgotEmail(''); setForgotSent(false); }} className="text-on-surface-variant hover:text-on-surface">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                  {forgotSent ? (
                    <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold">
                      <span className="material-symbols-outlined text-base">mark_email_read</span>
                      Reset link sent to <span className="font-bold">{forgotEmail}</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-on-surface-variant">Enter your registered email and we'll send a reset link.</p>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="flex-1 px-3 py-2 rounded-lg border border-surface-container-highest focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none text-xs bg-surface text-on-surface"
                        />
                        <button
                          type="button"
                          disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)}
                          onClick={() => setForgotSent(true)}
                          className="bg-primary-container text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-primary transition-colors disabled:opacity-40"
                        >
                          Send
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary-container text-white py-3 rounded-xl font-bold text-sm hover:bg-primary hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                Log In to GlobeTrotter
              </button>

              {/* Divider */}
              <div className="relative my-3 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-surface-container-highest" />
                </div>
                <span className="relative bg-surface px-3 text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Or continue with</span>
              </div>

              {/* Google only — Apple removed */}
              <button
                type="button"
                onClick={() => {
                  alert('Google login simulated!');
                  if (onLoginSuccess) {
                    onLoginSuccess({ email: 'alex.google@example.com', name: 'Alex Morgan' });
                  } else {
                    onClose();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-surface-container-highest hover:bg-surface-container text-sm font-semibold transition-colors cursor-pointer"
              >
                <GoogleIcon />
                Continue with Google
              </button>
            </form>
          )}

          {/* ===================== SIGN UP ===================== */}
          {mode === 'signup' && (
            <div>
              {/* Progress Steps */}
              <div className="flex items-center gap-1 mb-6">
                {STEPS.map((s, i) => (
                  <div key={s.id} className="flex items-center flex-1">
                    <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-primary-container text-white' : 'bg-surface-container text-on-surface-variant'}`}>
                      {i < step ? <span className="material-symbols-outlined text-sm">check</span> : i + 1}
                    </div>
                    <span className={`ml-1.5 text-xs font-semibold hidden sm:block ${i === step ? 'text-on-surface' : 'text-on-surface-variant'}`}>{s.label}</span>
                    {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 rounded-full ${i < step ? 'bg-emerald-400' : 'bg-surface-container-highest'}`} />}
                  </div>
                ))}
              </div>

              {/* ---- STEP 0: Profile ---- */}
              {step === 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-on-surface mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">person</span>
                    Tell us about yourself
                  </h4>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Full Name</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-lg">badge</span>
                      <input type="text" value={formData.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Alex Morgan" className={`${inputCls('fullName')} pl-10`} />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Gender + Age */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Gender</label>
                      <select value={formData.gender} onChange={(e) => update('gender', e.target.value)} className={`${inputCls('gender')} appearance-none`}>
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Non-binary</option>
                        <option>Prefer not to say</option>
                      </select>
                      {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Age</label>
                      <input type="number" min="10" max="100" value={formData.age} onChange={(e) => update('age', e.target.value)} placeholder="25" className={inputCls('age')} />
                      {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Phone Number</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-lg">phone</span>
                      <input type="tel" value={formData.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98765 43210" className={`${inputCls('phone')} pl-10`} />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Email Address</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-lg">mail</span>
                      <input type="email" value={formData.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" className={`${inputCls('email')} pl-10`} />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Your City</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-lg">location_city</span>
                      <input type="text" value={formData.city} onChange={(e) => update('city', e.target.value)} placeholder="Mumbai, Paris, New York…" className={`${inputCls('city')} pl-10`} />
                    </div>
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                </div>
              )}

              {/* ---- STEP 1: OTP Verify ---- */}
              {step === 1 && (
                <div className="space-y-5">
                  <h4 className="font-semibold text-sm text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">verified_user</span>
                    Verify your contact details
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    We'll send a 6-digit OTP to confirm your identity. <span className="font-bold">(Use 123456 for demo)</span>
                  </p>

                  <div className="bg-surface-container rounded-xl p-4 space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                      📧 Email OTP — <span className="font-normal lowercase normal-case">{formData.email}</span>
                    </label>
                    <OtpInput label="Email" contact={formData.email} onVerified={(v) => setEmailVerified(v)} />
                  </div>

                  <div className="bg-surface-container rounded-xl p-4 space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                      📱 Phone OTP — <span className="font-normal lowercase normal-case">{formData.phone}</span>
                    </label>
                    <OtpInput label="Phone" contact={formData.phone} onVerified={(v) => setPhoneVerified(v)} />
                  </div>

                  {errors.verify && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">error</span>
                      {errors.verify}
                    </p>
                  )}
                </div>
              )}

              {/* ---- STEP 2: Password ---- */}
              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">lock</span>
                    Create a strong password
                  </h4>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Password</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-lg">lock</span>
                      <input
                        type={showPwd ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => update('password', e.target.value)}
                        placeholder="Create password"
                        className={`${inputCls('password')} pl-10 pr-10`}
                      />
                      <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary">
                        <span className="material-symbols-outlined text-lg">{showPwd ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    <PasswordStrength password={formData.password} />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Confirm Password</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-lg">lock_reset</span>
                      <input
                        type={showConfirmPwd ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => update('confirmPassword', e.target.value)}
                        placeholder="Repeat password"
                        className={`${inputCls('confirmPassword')} pl-10 pr-10`}
                      />
                      <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary">
                        <span className="material-symbols-outlined text-lg">{showConfirmPwd ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <p className="text-emerald-600 text-xs mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Passwords match!
                      </p>
                    )}
                  </div>

                  {/* Summary card */}
                  <div className="bg-surface-container rounded-xl p-3 space-y-1 text-xs text-on-surface-variant">
                    <p className="font-semibold text-on-surface mb-1.5">Account Summary</p>
                    <p>👤 {formData.fullName} · {formData.gender} · Age {formData.age}</p>
                    <p>📧 {formData.email}</p>
                    <p>📱 {formData.phone}</p>
                    <p>📍 {formData.city}</p>
                  </div>
                </div>
              )}

              {/* Nav Buttons */}
              <div className="flex gap-3 mt-6">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="flex-1 py-2.5 rounded-xl border border-surface-container-highest text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-primary-container text-white py-2.5 rounded-xl font-bold text-sm hover:bg-primary transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {step === 2 ? (
                    <><span className="material-symbols-outlined text-base">check_circle</span> Create Account</>
                  ) : (
                    <>Next Step <span className="material-symbols-outlined text-base">arrow_forward</span></>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
