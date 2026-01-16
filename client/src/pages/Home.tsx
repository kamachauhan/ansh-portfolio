import { useState } from "react";
import { Mail, Phone, MapPin, Menu, X } from "lucide-react";
import Lightbox from "@/components/Lightbox";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ASSET_MANIFEST } from "@/lib/assetManifest";

type CategoryKey = keyof typeof ASSET_MANIFEST;

const CATEGORIES: Record<CategoryKey, string> = {
  advertisements: "Advertisements",
  "ai-images": "AI Images",
  banners: "Banners",
  collage: "Collage",
  invitations: "Invitation Cards",
  logos: "Logos",
  thumbnails: "Thumbnails",
  other: "Other Works",
  video: "Videos",
};

const playfairStyle = { fontFamily: "'Playfair Display', serif" };

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("advertisements");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentItems = (ASSET_MANIFEST[activeCategory] || []) as unknown as Array<{
    path: string;
    name: string;
    type: 'image' | 'video' | 'pdf';
  }>;

  const handleItemClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-amber-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/Assets/logo.png"
              alt="Ansh Creation"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-amber-900" style={playfairStyle}>
              Ansh Creation
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-amber-900" />
            ) : (
              <Menu className="w-6 h-6 text-amber-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-amber-100 py-4">
            <div className="container mx-auto px-4 flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors text-left"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Logo and Text */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-amber-950 leading-tight" style={playfairStyle}>
                  Ansh Creation
                </h1>
                <p className="text-xl text-amber-900 font-medium">
                  Freelance UI/UX Designer & Creative Services
                </p>
                <p className="text-lg text-amber-800">
                  Elevating Your Brand with Stunning UI Designs ✨
                </p>
              </div>

              <p className="text-base text-amber-800 leading-relaxed max-w-md">
                With over 5 years of experience in design and creative services,
                I transform ideas into visually compelling digital experiences.
                Specializing in UI/UX design, graphic design, and brand creation.
              </p>

              <button
                onClick={() => scrollToSection("contact")}
                className="inline-block px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-200"
              >
                Let's Work Together
              </button>
            </div>

            {/* Right: Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl blur-2xl opacity-20"></div>
                <img
                  src="/Assets/image.jpg"
                  alt="Ansh Chauhan"
                  className="relative w-full max-w-sm rounded-2xl shadow-2xl object-cover aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4" style={playfairStyle}>
              Services
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "UI/UX Design",
                description: "Beautiful and intuitive user interfaces",
              },
              {
                title: "Graphic Design",
                description: "Creative visual content and branding",
              },
              {
                title: "Social Media",
                description: "Engaging content for social platforms",
              },
              {
                title: "Website Development",
                description: "Modern, responsive web solutions",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="luxury-card p-8 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-bold text-amber-950 mb-3" style={playfairStyle}>
                  {service.title}
                </h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4" style={playfairStyle}>
              My Work
            </h2>
            <p className="text-amber-800 max-w-2xl mx-auto">
              A curated collection of my creative projects spanning UI/UX design,
              graphics, branding, and digital content
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {(Object.entries(CATEGORIES) as Array<[CategoryKey, string]>).map(
              ([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === key
                      ? "bg-amber-600 text-white shadow-lg shadow-amber-200"
                      : "bg-white text-amber-900 border-2 border-amber-200 hover:border-amber-400"
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>

          {/* Portfolio Grid */}
          {currentItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleItemClick(idx)}
                  className="luxury-card cursor-pointer overflow-hidden group"
                >
                  {item.type === "image" && (
                    <div className="relative overflow-hidden bg-gray-200 aspect-square">
                      <img
                        src={item.path}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          👁️
                        </span>
                      </div>
                    </div>
                  )}
                  {item.type === "video" && (
                    <div className="relative overflow-hidden bg-gray-900 aspect-square flex items-center justify-center group">
                      <video
                        src={item.path}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                        <span className="text-white text-4xl">▶️</span>
                      </div>
                    </div>
                  )}
                  {item.type === "pdf" && (
                    <div className="relative overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50 aspect-square flex items-center justify-center group">
                      <div className="text-center">
                        <div className="text-6xl mb-2">📄</div>
                        <p className="text-sm font-medium text-amber-900 px-4 line-clamp-2">
                          {item.name}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          👁️
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-sm text-amber-900 font-medium line-clamp-2">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-amber-800 text-lg">
                No items in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4" style={playfairStyle}>
                Let's Create Something Amazing Together!
              </h2>
              <p className="text-amber-800 text-lg">🚀💼</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-amber-950 mb-6" style={playfairStyle}>
                    Get In Touch
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-amber-950">Email</p>
                        <a
                          href="mailto:chauhansagency@gmail.com"
                          className="text-amber-700 hover:text-amber-900 transition-colors break-all"
                        >
                          chauhansagency@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-amber-950">Phone</p>
                        <a
                          href="tel:+918810491624"
                          className="text-amber-700 hover:text-amber-900 transition-colors"
                        >
                          +91 8810491624
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-amber-950">Address</p>
                        <p className="text-amber-700">Ashok Vihar Phase – 3, Delhi – 52</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-amber-800 mb-4">
                    Prefer instant messaging? Connect with me on WhatsApp for quick responses.
                  </p>
                  <WhatsAppButton variant="inline" />
                </div>
              </div>

              {/* Contact Form */}
              <div className="luxury-card p-8">
                <h3 className="text-2xl font-bold text-amber-950 mb-6" style={playfairStyle}>
                  Send a Message
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 Ansh Creation. All rights reserved. | Freelance UI/UX Designer
          </p>
          <p className="text-xs mt-2 text-amber-200">
            Crafted with ✨ and passion
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={currentItems}
        initialIndex={lightboxIndex}
      />

      {/* WhatsApp Fixed Button */}
      <WhatsAppButton variant="fixed" />
    </div>
  );
}
