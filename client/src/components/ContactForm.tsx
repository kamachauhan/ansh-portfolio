import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

const playfairStyle = { fontFamily: "'Playfair Display', serif" };

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Initialize EmailJS (use public key - it's safe for frontend)
  const initEmailJS = () => {
    if (!window.emailjsInitialized) {
      emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
      window.emailjsInitialized = true;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields correctly",
      });
      return;
    }

    setStatus({
      type: "loading",
      message: "Sending your message...",
    });

    try {
      initEmailJS();

      // Send email using EmailJS
      const response = await emailjs.send(
        "YOUR_EMAILJS_SERVICE_ID",
        "YOUR_EMAILJS_TEMPLATE_ID",
        {
          to_email: "chauhansagency@gmail.com",
          to_name: "Kamal Chauhan",
          from_name: formData.fullName,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          company: "Ansh Creation",
        }
      );

      if (response.status === 200) {
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus({ type: "idle", message: "" });
        }, 5000);
      }
    } catch (error) {
      console.error("Email send error:", error);

      // Fallback to mailto if EmailJS fails
      const mailtoLink = `mailto:chauhansagency@gmail.com?subject=New Inquiry from ${encodeURIComponent(
        formData.fullName
      )}&body=${encodeURIComponent(
        `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;

      setStatus({
        type: "success",
        message:
          "Opening your email client to send the message. If it doesn't open, please email us directly.",
      });

      setTimeout(() => {
        setStatus({ type: "idle", message: "" });
      }, 5000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-amber-950 mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
              errors.fullName
                ? "border-red-400 bg-red-50"
                : "border-amber-200 bg-white hover:border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-amber-950 mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
              errors.email
                ? "border-red-400 bg-red-50"
                : "border-amber-200 bg-white hover:border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-amber-950 mb-2"
          >
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
              errors.phone
                ? "border-red-400 bg-red-50"
                : "border-amber-200 bg-white hover:border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-amber-950 mb-2"
          >
            Message / Query *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project or inquiry..."
            rows={5}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none resize-none ${
              errors.message
                ? "border-red-400 bg-red-50"
                : "border-amber-200 bg-white hover:border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            }`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Status Messages */}
        {status.type === "loading" && (
          <div className="flex items-center gap-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <div className="animate-spin">
              <Send className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-blue-700 font-medium">{status.message}</p>
          </div>
        )}

        {status.type === "success" && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-700 font-medium">{status.message}</p>
          </div>
        )}

        {status.type === "error" && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 font-medium">{status.message}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status.type === "loading"}
          className="w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-amber-400 disabled:to-amber-500 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-amber-200 disabled:shadow-none flex items-center justify-center gap-2 text-lg"
          style={playfairStyle}
        >
          <Send className="w-5 h-5" />
          {status.type === "loading" ? "Sending..." : "Send Message"}
        </button>

        <p className="text-center text-sm text-amber-800">
          * All fields are required
        </p>
      </form>
    </div>
  );
}

// Extend window type for EmailJS initialization flag
declare global {
  interface Window {
    emailjsInitialized?: boolean;
  }
}
