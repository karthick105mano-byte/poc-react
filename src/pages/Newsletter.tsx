import React, { useState } from "react";

/**
 * NewsletterSubscribe.tsx
 *
 * A self-contained, accessible React newsletter subscription component built with Tailwind CSS.
 * - Default export is a functional React component
 * - Props allow plugging any API endpoint (e.g. your server, Mailchimp, ConvertKit, etc.)
 * - Includes client-side validation, loading/success/error states, and a honeypot for spam protection
 *
 * Usage:
 * <NewsletterSubscribe endpoint="/api/subscribe" />
 *
 * If you use Mailchimp's form action URL, set `provider="mailchimp"` and `endpoint` to the Mailchimp form action.
 */

type Props = {
  /** POST endpoint where { email } will be sent. Defaults to '/api/subscribe' */
  endpoint?: string;
  /** Optional provider hint (e.g. 'mailchimp') for behavior docs or special handling */
  provider?: string;
  /** Button text */
  buttonText?: string;
  /** Input placeholder */
  placeholder?: string;
};

export default function NewsletterSubscribe({
  endpoint = "/api/subscribe",
  provider,
  buttonText = "Subscribe",
  placeholder = "Enter your email",
}: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Simple email regex (good for client-side; server should always validate again)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Honeypot field name (hidden to humans, visible to bots)
  const honeypotName = "hp_name";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    // Basic validation
    const trimmed = email.trim();
    if (!trimmed) {
      setMessage("Please enter an email address.");
      setStatus("error");
      return;
    }
    if (!emailRegex.test(trimmed)) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      // Example POST body. Adjust according to your backend/provider requirements.
      const body = JSON.stringify({ email: trimmed });

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Thanks — check your inbox to confirm your subscription.");
        setEmail("");
      } else {
        // Try to parse JSON error message if available
        let errMsg = `Subscription failed (${res.status})`;
        try {
          const data = await res.json();
          if (data?.error) errMsg = data.error;
          else if (data?.message) errMsg = data.message;
        } catch (err) {
          // ignore
        }
        setStatus("error");
        setMessage(errMsg);
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage("Network error — please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-3"
        aria-describedby="newsletter-help"
      >
        {/* Visible email input */}
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          inputMode="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required
          aria-invalid={status === "error"}
          className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 text-sm`
        }
        />

        {/* Honeypot field (hidden). Do NOT remove — it's useful against bots. */}
        <div style={{ position: "absolute", left: -9999, top: "auto" }} aria-hidden>
          <label htmlFor={honeypotName}>Leave this field blank</label>
          <input id={honeypotName} name={honeypotName} type="text" tabIndex={-1} />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            // Simple spinner (SVG)
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : null}
          <span>{buttonText}</span>
        </button>
      </form>

      <p id="newsletter-help" className="mt-2 text-sm">
        {status === "error" ? (
          <span role="alert" className="text-red-600">
            {message}
          </span>
        ) : status === "success" ? (
          <span className="text-green-600">{message}</span>
        ) : (
          <span className="text-slate-600">We respect your privacy. Unsubscribe anytime.</span>
        )}
      </p>

      {/* Notes for integrators (not rendered) */}
      {/*
        Integration tips:
        - If you use Mailchimp's form action, you can set provider="mailchimp" and endpoint to the Mailchimp form action URL.
          Mailchimp expects a form-encoded POST (not JSON). Example (server-side forwarding recommended):

            fetch('/api/subscribe', { method: 'POST', body: new URLSearchParams({ EMAIL: email }) })

        - For production, implement server-side validation and double opt-in if required by your email provider.
        - To avoid CORS issues, either call from your server (recommended) or enable CORS on your subscription endpoint.
        - Store provider-specific IDs (e.g. list ID) securely on the server — do not expose secrets in the client.
      */}
    </div>
  );
}
