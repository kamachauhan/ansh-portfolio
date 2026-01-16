import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  variant?: "fixed" | "inline";
  className?: string;
}

export default function WhatsAppButton({
  phoneNumber = "8810491624",
  message = "Hello Kamal Chauhan, I want more information about your services at Ansh Creation.",
  variant = "fixed",
  className = "",
}: WhatsAppButtonProps) {
  // Format phone number: remove spaces, dashes, and add country code if not present
  const formattedPhone = phoneNumber.replace(/[\s\-\(\)]/g, "");
  const whatsappPhone = formattedPhone.startsWith("91")
    ? formattedPhone
    : `91${formattedPhone}`;

  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    message
  )}`;

  const handleClick = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (variant === "fixed") {
    return (
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-green-200 active:scale-95 ${className}`}
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      Chat on WhatsApp
    </button>
  );
}
