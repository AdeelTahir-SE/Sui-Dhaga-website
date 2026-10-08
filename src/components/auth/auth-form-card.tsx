"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AccountRoleChoice } from "@/components/common/account-role-choice";
import { CountryCodeSelect } from "@/components/common/country-code-select";
import { authService } from "@/lib/api";

interface FormCardProps {
  title: string;
  intro?: string;
  fields: string[];
  button: string;
  mode?: "login" | "register" | "forgot" | "reset";
}

export function AuthFormCard({ title, intro, fields, button, mode = "login" }: FormCardProps) {
  const router = useRouter();
  const roleChoice = mode === "register";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("customer");
  const [countryCode, setCountryCode] = useState("+92");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      setLoading(true);

      if (mode === "login") {
        if (!email || !password) {
          setErrorMsg("Please enter both email and password.");
          setLoading(false);
          return;
        }
        const res = await authService.login({ email: email.trim(), password });
        if (res?.success) {
          setSuccessMsg("Logged in successfully! Redirecting...");
          const userRole = res.data?.user?.role || "customer";
          setTimeout(() => {
            if (userRole === "admin") {
              router.push("/admin/dashboard");
            } else if (userRole === "tailor") {
              router.push("/tailor/dashboard");
            } else {
              router.push("/customer/dashboard");
            }
          }, 600);
        } else {
          setErrorMsg(res?.message || "Invalid credentials.");
        }
      } else if (mode === "register") {
        if (!email || !password) {
          setErrorMsg("Please provide all required fields.");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setErrorMsg("Password must be at least 6 characters long.");
          setLoading(false);
          return;
        }
        if (confirmPassword && password !== confirmPassword) {
          setErrorMsg("Passwords do not match.");
          setLoading(false);
          return;
        }

        const role = selectedRole.toLowerCase() === "tailor" ? "tailor" : "customer";
        const fullPhone = phoneNumber ? `${countryCode}${phoneNumber.replace(/^0+/, "")}` : undefined;

        const res = await authService.register({
          name: fullName.trim() || undefined,
          email: email.trim(),
          password,
          role,
          phone: fullPhone,
        });

        if (res?.success) {
          setSuccessMsg("Account created successfully! Redirecting...");
          setTimeout(() => {
            if (role === "tailor") {
              router.push("/tailor/dashboard");
            } else {
              router.push("/customer/dashboard");
            }
          }, 700);
        } else {
          setErrorMsg(res?.message || "Could not complete registration.");
        }
      } else if (mode === "forgot") {
        if (!email) {
          setErrorMsg("Please enter your email address.");
          setLoading(false);
          return;
        }
        const res = await authService.forgotPassword(email.trim());
        setSuccessMsg(res?.message || "Password reset instructions have been sent to your email.");
      } else if (mode === "reset") {
        if (!password) {
          setErrorMsg("Please enter your new password.");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setErrorMsg("Password must be at least 6 characters long.");
          setLoading(false);
          return;
        }
        if (confirmPassword && password !== confirmPassword) {
          setErrorMsg("Passwords do not match.");
          setLoading(false);
          return;
        }
        const res = await authService.resetPassword(password);
        setSuccessMsg(res?.message || "Password updated successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1200);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      const url = await authService.getGoogleAuthUrl();
      if (url) {
        window.location.href = url;
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Google authentication is unavailable.");
      setLoading(false);
    }
  };

  return (
    <form className={`form-card ${mode ? `form-card-${mode}` : ""}`} onSubmit={handleSubmit}>
      <h2>{title}</h2>
      {intro ? <p className="form-intro">{intro}</p> : null}

      {errorMsg && (
        <div
          role="alert"
          style={{
            background: "#FEF2F2",
            border: "1px solid #FCA5A5",
            color: "#991B1B",
            padding: "10px 14px",
            borderRadius: "8px",
            fontSize: "13px",
            marginBottom: "16px",
            fontWeight: "500",
          }}
        >
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div
          role="status"
          style={{
            background: "#F0FDF4",
            border: "1px solid #86EFAC",
            color: "#166534",
            padding: "10px 14px",
            borderRadius: "8px",
            fontSize: "13px",
            marginBottom: "16px",
            fontWeight: "500",
          }}
        >
          {successMsg}
        </div>
      )}

      {roleChoice && (
        <AccountRoleChoice value={selectedRole} onChange={setSelectedRole} />
      )}

      <div className="form-fields">
        {fields.map((field) => {
          let value = "";
          let setter = (_val: string) => {};

          if (field === "Full Name") {
            value = fullName;
            setter = setFullName;
          } else if (field === "Email" || field === "Email Address") {
            value = email;
            setter = setEmail;
          } else if (field === "Phone Number") {
            value = phoneNumber;
            setter = setPhoneNumber;
          } else if (field === "Password" || field === "New Password") {
            value = password;
            setter = setPassword;
          } else if (field === "Confirm Password") {
            value = confirmPassword;
            setter = setConfirmPassword;
          }

          return (
            <div key={field} style={{ marginBottom: "16px" }}>
              <label>
                <span className="field-label">{field}</span>
                <div className={`input-wrap ${field === "Phone Number" ? "phone-input-wrap" : ""}`}>
                  {field === "Phone Number" && (
                    <CountryCodeSelect />
                  )}
                  <input
                    type={
                      field.toLowerCase().includes("password")
                        ? "password"
                        : field.toLowerCase().includes("email")
                        ? "email"
                        : field === "Phone Number"
                        ? "tel"
                        : "text"
                    }
                    placeholder={
                      field.toLowerCase().includes("password")
                        ? field.includes("Confirm")
                          ? "Confirm new password"
                          : field.includes("New")
                          ? "Enter new password"
                          : "Create a password"
                        : field.toLowerCase().includes("email")
                        ? "Enter your email"
                        : field === "Phone Number"
                        ? "Enter phone number"
                        : "Enter your full name"
                    }
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    required={field !== "Phone Number" && field !== "Full Name"}
                  />
                  {field.toLowerCase().includes("password") && (
                    <span className="eye-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    </span>
                  )}
                </div>
              </label>

              {mode === "reset" && field === "New Password" && (
                <ul className="password-checklist" style={{ listStyle: "none", padding: 0, margin: "14px 0 8px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    "At least 8 characters",
                    "One uppercase letter",
                    "One number",
                    "One special character",
                  ].map((rule) => (
                    <li key={rule} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#64748b" }}>
                      <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#e6f4f1", color: "#078b87", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {rule}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {roleChoice && (
        <label className="terms-checkbox">
          <input type="checkbox" defaultChecked required />
          <span>I agree to the <Link href="/terms-and-conditions">Terms &amp; Conditions</Link> and <Link href="/privacy-policy">Privacy Policy</Link></span>
        </label>
      )}

      {mode === "login" && (
        <div className="login-options" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "16px 0", fontSize: "14px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "var(--muted)" }}>
            <input type="checkbox" style={{ width: "16px", height: "16px", borderRadius: "4px", border: "1px solid var(--line)" }} />
            Remember me
          </label>
          <Link href="/auth/forgot-password" style={{ color: "var(--teal)", fontWeight: "600" }}>Forgot Password?</Link>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn primary submit-btn"
        style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
      >
        {loading ? "Processing..." : button}
      </button>

      {mode === "forgot" && (
        <>
          <div className="forgot-info-box" style={{ marginTop: "24px", background: "#fffdf0", border: "1px solid #fef08a", borderRadius: "12px", padding: "16px 18px", display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <div className="info-icon" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#ffffff", border: "1px solid #fde047", display: "flex", alignItems: "center", justifyContent: "center", color: "#078b87", flexShrink: 0, marginTop: "2px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "13.5px", fontWeight: "800", color: "#1e293b", marginBottom: "2px" }}>Didn&apos;t receive the email?</strong>
              <p style={{ fontSize: "12.5px", color: "#64748b", margin: 0, lineHeight: 1.4 }}>Check your spam folder or try again.</p>
            </div>
          </div>
          <Link href="/auth/login" className="back-to-login-link" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#078b87", fontWeight: "700", fontSize: "14.5px", marginTop: "24px", textDecoration: "none" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Login
          </Link>
        </>
      )}

      {mode === "reset" && (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link href="/auth/login" className="back-to-login-link" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#078b87", fontWeight: "700", fontSize: "14.5px", textDecoration: "none" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Login
          </Link>
        </div>
      )}

      {roleChoice && (
        <p className="auth-footer-link">Already have an account? <Link href="/auth/login">Login</Link></p>
      )}

      {mode === "login" && (
        <div className="social-login-section" style={{ marginTop: "24px", textAlign: "center" }}>
          <div className="divider" style={{ display: "flex", alignItems: "center", gap: "16px", color: "var(--muted)", fontSize: "12px", margin: "24px 0" }}>
            <span style={{ flex: 1, height: "1px", background: "var(--line)" }}></span>
            or continue with
            <span style={{ flex: 1, height: "1px", background: "var(--line)" }}></span>
          </div>
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="google-btn"
            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", fontWeight: "600", cursor: "pointer", color: "var(--ink)" }}
          >
            <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Continue with Google
          </button>
          <p className="auth-footer-link" style={{ marginTop: "32px" }}>Don&apos;t have an account? <Link href="/auth/register" style={{ color: "var(--teal)", fontWeight: "600" }}>Register now</Link></p>
        </div>
      )}
    </form>
  );
}
