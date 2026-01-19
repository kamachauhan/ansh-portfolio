import { useState } from "react";
import { Mail, Phone, MapPin, Menu, X, Palette, Video, Code, Instagram } from "lucide-react";
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
              src="/images/logo.png"
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
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors"
            >
              Team
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
          <div className="md:hidden bg-white border-t border-amber-100">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <button
                onClick={() => scrollToSection("hero")}
                className="block w-full text-left text-sm font-medium text-amber-900 hover:text-amber-700 py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left text-sm font-medium text-amber-900 hover:text-amber-700 py-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left text-sm font-medium text-amber-900 hover:text-amber-700 py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className="block w-full text-left text-sm font-medium text-amber-900 hover:text-amber-700 py-2"
              >
                Team
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="block w-full text-left text-sm font-medium text-amber-900 hover:text-amber-700 py-2"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-sm font-medium text-amber-900 hover:text-amber-700 py-2"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1
                className="text-5xl md:text-6xl font-bold text-amber-950 mb-6"
                style={playfairStyle}
              >
                Ansh Creation
              </h1>
              <p className="text-xl text-amber-800 mb-4">
                Creative Design & Digital Studio
              </p>
              <p className="text-lg text-amber-700 mb-8 leading-relaxed">
                We are a full-service creative studio specializing in design, video editing, branding, websites, and utility applications. From individual clients to established brands, we deliver end-to-end creative solutions that elevate your vision.
              </p>
              <p className="text-amber-600 mb-8 font-medium">
                5+ Years of Professional Experience in Creative Industry
              </p>
              <button
                onClick={() => scrollToSection("services")}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-amber-200"
                style={playfairStyle}
              >
                Explore Our Services
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/image.jpg"
                alt="Ansh Creation Team"
                className="w-full max-w-md rounded-2xl shadow-2xl shadow-amber-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl md:text-5xl font-bold text-amber-950 mb-12 text-center"
            style={playfairStyle}
          >
            About Ansh Creation
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl border-2 border-amber-200">
              <p className="text-lg text-amber-900 mb-6 leading-relaxed">
                Ansh Creation is a creative design and digital studio founded on the principles of innovation, quality, and client satisfaction. We combine artistic vision with technical expertise to deliver exceptional creative solutions.
              </p>
              <p className="text-lg text-amber-900 mb-6 leading-relaxed">
                Our team brings together diverse skills in UI/UX design, video production, branding, and web development. Whether you're a startup looking to establish your brand or an established company seeking fresh creative perspectives, we're here to bring your ideas to life.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-700 mb-2">5+</div>
                  <p className="text-amber-900 font-medium">Years Experience</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-700 mb-2">100+</div>
                  <p className="text-amber-900 font-medium">Projects Completed</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-700 mb-2">50+</div>
                  <p className="text-amber-900 font-medium">Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl md:text-5xl font-bold text-amber-950 mb-16 text-center"
            style={playfairStyle}
          >
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Design & Creative */}
            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-amber-100 hover:shadow-xl hover:shadow-amber-200 transition-all duration-300 border-2 border-amber-100">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-8 h-8 text-amber-600" />
                <h3 className="text-2xl font-bold text-amber-950" style={playfairStyle}>
                  Design & Creative
                </h3>
              </div>
              <ul className="space-y-3 text-amber-900">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>UI / UX Design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Social Media Posts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Posters & Advertisements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Thumbnails</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>YouTube Banners</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Invitation Cards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Canva-based Designs</span>
                </li>
              </ul>
            </div>

            {/* Video & Media */}
            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-amber-100 hover:shadow-xl hover:shadow-amber-200 transition-all duration-300 border-2 border-amber-100">
              <div className="flex items-center gap-3 mb-6">
                <Video className="w-8 h-8 text-amber-600" />
                <h3 className="text-2xl font-bold text-amber-950" style={playfairStyle}>
                  Video & Media
                </h3>
              </div>
              <ul className="space-y-3 text-amber-900">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Professional Video Editing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Reels & Short-form Content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>YouTube Video Editing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Brand & Promotional Videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Color Grading</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Motion Effects</span>
                </li>
              </ul>
            </div>

            {/* Technology */}
            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-amber-100 hover:shadow-xl hover:shadow-amber-200 transition-all duration-300 border-2 border-amber-100">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-amber-600" />
                <h3 className="text-2xl font-bold text-amber-950" style={playfairStyle}>
                  Technology
                </h3>
              </div>
              <ul className="space-y-3 text-amber-900">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Website Design & Development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Small Utility Apps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Responsive Design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Modern Web Technologies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Performance Optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl md:text-5xl font-bold text-amber-950 mb-16 text-center"
            style={playfairStyle}
          >
            Our Team
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Team Member 1: Kamal Chauhan */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-amber-100 hover:shadow-xl hover:shadow-amber-200 transition-all duration-300 border-2 border-amber-100">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 h-2"></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-amber-950 mb-2" style={playfairStyle}>
                  Kamal Chauhan
                </h3>
                <p className="text-amber-700 font-semibold mb-6">Designer & Creative Developer</p>
                <p className="text-amber-900 mb-6 leading-relaxed">
                  Kamal is a multidisciplinary creative professional with 5+ years of experience in UI/UX design, graphic design, branding, website design, and small utility app development. He specializes in Canva-based workflows and modern design tools.
                </p>
                <div className="mb-6">
                  <p className="text-sm font-semibold text-amber-950 mb-3">Core Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {["UI/UX Design", "Canva Designs", "Posters", "Thumbnails", "Website Design", "Apps"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 2: Vivek Raghav */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-amber-100 hover:shadow-xl hover:shadow-amber-200 transition-all duration-300 border-2 border-amber-100">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 h-2"></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-amber-950 mb-2" style={playfairStyle}>
                  Vivek Raghav
                </h3>
                <p className="text-amber-700 font-semibold mb-2">Video Editor & Media Specialist</p>
                <p className="text-sm text-amber-600 mb-6">Bachelor of Computer Applications (BCA)</p>
                <p className="text-amber-900 mb-6 leading-relaxed">
                  Vivek is a professional video editor with 2+ years of experience creating high-quality reels, social media videos, and brand content. He has worked with multiple companies and brands including Anytime Fitness.
                </p>
                <div className="mb-6">
                  <p className="text-sm font-semibold text-amber-950 mb-3">Core Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Video Editing", "Reels", "YouTube Videos", "Color Grading", "Motion Effects"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="https://www.instagram.com/procuteditzzz?igsh=MTJwd2cyOHQ2czc2dg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  @procuteditzzz
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl md:text-5xl font-bold text-amber-950 mb-12 text-center"
            style={playfairStyle}
          >
            Our Portfolio
          </h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key as CategoryKey)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-200"
                    : "bg-white text-amber-900 border-2 border-amber-200 hover:border-amber-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item, index) => (
              <div
                key={`${activeCategory}-${index}`}
                onClick={() => handleItemClick(index)}
                className="group cursor-pointer rounded-xl overflow-hidden shadow-lg shadow-amber-100 hover:shadow-xl hover:shadow-amber-300 transition-all duration-300 transform hover:scale-105"
              >
                {item.type === "image" ? (
                  <img
                    src={item.path}
                    alt="Portfolio item"
                    className="w-full h-64 object-cover group-hover:brightness-75 transition-all duration-300"
                  />
                ) : item.type === "video" ? (
                  <video
                    src={item.path}
                    className="w-full h-64 object-cover group-hover:brightness-75 transition-all duration-300"
                  />
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center group-hover:brightness-75 transition-all duration-300">
                    <span className="text-amber-900 font-semibold">PDF Document</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl md:text-5xl font-bold text-amber-950 mb-16 text-center"
            style={playfairStyle}
          >
            Let's Create Something Amazing
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-amber-950 mb-8" style={playfairStyle}>
                Get In Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-amber-950">Email</p>
                    <a
                      href="mailto:chauhansagency@gmail.com"
                      className="text-amber-700 hover:text-amber-900 transition-colors"
                    >
                      chauhansagency@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-amber-950">Phone</p>
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
                    <p className="font-semibold text-amber-950">Address</p>
                    <p className="text-amber-700">
                      Ashok Vihar Phase – 3, Delhi – 52
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl border-2 border-amber-200">
                <p className="text-amber-950 font-semibold mb-2">Ready to collaborate?</p>
                <p className="text-amber-900">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        items={currentItems}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
