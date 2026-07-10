import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'de' | 'ml' | 'hi' | 'ja';

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
}

export const languages: LanguageConfig[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

const en = {
  // Navigation
  "nav.home": "Home",
  "nav.about": "About",
  "nav.services": "Services",
  "nav.portfolio": "Portfolio",
  "nav.blog": "Blog",
  "nav.contact": "Contact",
  "nav.admin": "Admin",

  // Hero Section
  "hero.excellence": "14+ Years of Excellence in IT Industry",
  "hero.title": "Flourish with Us",
  "hero.description": "Transforming businesses with innovative technical solutions and ideas. We specialize in end-to-end website development and mobile application development.",
  "hero.servicesBtn": "Our Services",
  "hero.contactBtn": "Get in Touch",
  "hero.experienceVal": "14+",
  "hero.experienceLabel": "Years Experience",
  "hero.projectsVal": "100+",
  "hero.projectsLabel": "Projects Delivered",
  "hero.clientsVal": "50+",
  "hero.clientsLabel": "Happy Clients",

  // About Section
  "about.title": "About Graycodder",
  "about.subtitle": "Empowering businesses with cutting-edge technology solutions from the heart of Kerala",
  "about.desc1": "Established with a vision to transform businesses through technology, Graycodder has been serving clients for over 14 years from our base in Chellanam, Kochi, Kerala. We specialize in providing comprehensive technical solutions that drive business growth and innovation.",
  "about.desc2": "Our team of experienced professionals is dedicated to delivering end-to-end website development and mobile application development services. We don't just build applications; we create solutions that help businesses flourish in the digital age.",
  "about.locationTitle": "Our Location",
  "about.locationAddress": "Graycodder\nReg No: KL-02-0105921\nBuilding Number: 16/149\nS. Chellanam, Kochi - 682008\nKerala, India",
  "about.visionTitle": "Our Vision",
  "about.visionDesc": "Flourish with Us - Empowering businesses to thrive through innovative technology solutions",
  "about.missionTitle": "Our Mission",
  "about.missionDesc": "Deliver excellence in technical solutions and ideas to improve businesses across industries",
  "about.commitmentTitle": "Our Commitment",
  "about.commitmentDesc": "End-to-end solutions with 14+ years of expertise ensuring quality and client satisfaction",

  // Services Section
  "services.title": "Our Services",
  "services.subtitle": "End-to-end technical solutions to improve and grow your business",
  "services.web.title": "Website Development",
  "services.web.description": "Custom, responsive websites built with modern technologies. From simple landing pages to complex web applications.",
  "services.web.f1": "Custom Design",
  "services.web.f2": "Responsive Layout",
  "services.web.f3": "SEO Optimized",
  "services.web.f4": "Fast Performance",
  "services.mobile.title": "Mobile App Development",
  "services.mobile.description": "Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.",
  "services.mobile.f1": "iOS & Android",
  "services.mobile.f2": "Cross-Platform",
  "services.mobile.f3": "User-Friendly UI",
  "services.mobile.f4": "Scalable Architecture",
  "services.ideas.title": "Business Ideas & Planning",
  "services.ideas.description": "Strategic business planning and technical consulting to transform your ideas into successful digital products.",
  "services.ideas.f1": "Market Analysis",
  "services.ideas.f2": "Technical Strategy",
  "services.ideas.f3": "Project Planning",
  "services.ideas.f4": "ROI Optimization",
  "services.software.title": "Custom Software Solutions",
  "services.software.description": "Tailored software solutions designed to meet your specific business requirements and workflows.",
  "services.software.f1": "Custom Development",
  "services.software.f2": "API Integration",
  "services.software.f3": "Database Design",
  "services.software.f4": "Cloud Solutions",
  "services.digital.title": "Digital Transformation",
  "services.digital.description": "Help businesses modernize their operations and embrace digital technologies for growth and efficiency.",
  "services.digital.f1": "Process Automation",
  "services.digital.f2": "Legacy Migration",
  "services.digital.f3": "Cloud Adoption",
  "services.digital.f4": "Digital Strategy",
  "services.support.title": "Ongoing Support & Maintenance",
  "services.support.description": "Comprehensive support and maintenance services to keep your applications running smoothly.",
  "services.support.f1": "24/7 Support",
  "services.support.f2": "Bug Fixes",
  "services.support.f3": "Updates & Upgrades",
  "services.support.f4": "Performance Monitoring",
  "services.readyTitle": "Ready to Transform Your Business?",
  "services.readyDesc": "Let's discuss how we can help you achieve your business goals with our technical expertise.",
  "services.contactBtn": "Contact Us Today",

  // Portfolio Section
  "portfolio.title": "Our Portfolio",
  "portfolio.subtitle": "Showcasing our successful projects and innovative solutions",
  "portfolio.loading": "Loading portfolio items...",
  "portfolio.empty": "No portfolio items found in this category.",
  "portfolio.view": "View",
  "portfolio.category.all": "All",
  "portfolio.category.web": "Web Development",
  "portfolio.category.mobile": "Mobile App",
  "portfolio.category.ecommerce": "E-Commerce",
  "portfolio.category.custom": "Custom Software",

  // Blog Section
  "blog.title": "Latest Blog Posts",
  "blog.subtitle": "Insights, tips, and updates from our team",
  "blog.loading": "Loading blog posts...",
  "blog.readMore": "Read More",
  "blog.back": "← Back to Blog",
  "blog.empty": "No blog posts available yet. Check back soon!",
  "blog.sharePost": "Share this post:",

  // Contact Section
  "contact.title": "Get in Touch",
  "contact.subtitle": "Let's discuss how we can help flourish your business",
  "contact.infoTitle": "Contact Information",
  "contact.address": "Address",
  "contact.email": "Email",
  "contact.phone": "Phone",
  "contact.messageTitle": "Send us a Message",
  "contact.label.name": "Name *",
  "contact.label.email": "Email *",
  "contact.label.phone": "Phone",
  "contact.label.message": "Message *",
  "contact.placeholder.name": "Your name",
  "contact.placeholder.email": "your.email@example.com",
  "contact.placeholder.phone": "+91 12345 67890",
  "contact.placeholder.message": "Tell us about your project...",
  "contact.btn.send": "Send Message",
  "contact.btn.sending": "Sending...",
  "contact.toast.missingKey": "Web3Forms Access Key is missing. Please configure it in .env",
  "contact.toast.success": "Thank you! We will get back to you soon.",
  "contact.toast.wrong": "Something went wrong. Please try again.",
  "contact.toast.error": "An error occurred. Please try again later.",

  // Footer Section
  "footer.desc": "Flourish with Us - Empowering businesses with innovative technical solutions and ideas. 14+ years of excellence in IT industry.",
  "footer.quickLinks": "Quick Links",
  "footer.contact": "Contact",
  "footer.rights": "All rights reserved.",

  // Admin Login Section
  "admin.title": "Admin Login",
  "admin.subtitle": "Sign in to manage your content",
  "admin.email": "Email",
  "admin.password": "Password",
  "admin.emailPlaceholder": "graycodder@gmail.com",
  "admin.passwordPlaceholder": "Enter your password",
  "admin.cancel": "Cancel",
  "admin.login": "Login",
  "admin.loggingIn": "Logging in...",
  "admin.seedBtn": "Seed Database (Dev Only)",
  "admin.seedingBtn": "Seeding Database...",
  "admin.footerText": "Use your Firebase Auth credentials",
  "admin.toast.success": "Login successful!",
  "admin.toast.invalid": "Invalid email or password.",
  "admin.toast.seedConfirm": "Are you sure you want to seed the database? This might overwrite existing data.",
  "admin.toast.seedSuccess": "Database seeded successfully!",
  "admin.toast.seedFail": "Failed to seed database."
};

const de = {
  // Navigation
  "nav.home": "Startseite",
  "nav.about": "Über uns",
  "nav.services": "Leistungen",
  "nav.portfolio": "Portfolio",
  "nav.blog": "Blog",
  "nav.contact": "Kontakt",
  "nav.admin": "Admin",

  // Hero Section
  "hero.excellence": "Über 14 Jahre Exzellenz in der IT-Branche",
  "hero.title": "Gedeihen Sie mit uns",
  "hero.description": "Transformation von Unternehmen mit innovativen technischen Lösungen und Ideen. Wir sind spezialisiert auf die durchgängige Website-Entwicklung und mobile Anwendungsentwicklung.",
  "hero.servicesBtn": "Unsere Leistungen",
  "hero.contactBtn": "Kontakt aufnehmen",
  "hero.experienceVal": "14+",
  "hero.experienceLabel": "Jahre Erfahrung",
  "hero.projectsVal": "100+",
  "hero.projectsLabel": "Gelieferte Projekte",
  "hero.clientsVal": "50+",
  "hero.clientsLabel": "Zufriedene Kunden",

  // About Section
  "about.title": "Über Graycodder",
  "about.subtitle": "Unterstützung von Unternehmen mit modernsten Technologielösungen aus dem Herzen von Kerala",
  "about.desc1": "Gegründet mit der Vision, Unternehmen durch Technologie zu transformieren, betreut Graycodder seit über 14 Jahren Kunden von unserem Standort in Chellanam, Kochi, Kerala aus. Wir sind darauf spezialisiert, umfassende technische Lösungen anzubieten, die das Wachstum und die Innovation von Unternehmen fördern.",
  "about.desc2": "Unser erfahrenes professionelles Team widmet sich der Bereitstellung von End-to-End-Dienstleistungen für die Website- und App-Entwicklung. Wir bauen nicht nur Anwendungen; wir schaffen Lösungen, die Unternehmen helfen, im digitalen Zeitalter zu gedeihen.",
  "about.locationTitle": "Unser Standort",
  "about.locationAddress": "Graycodder\nReg.-Nr.: KL-02-0105921\nGebäudenummer: 16/149\nS. Chellanam, Kochi - 682008\nKerala, Indien",
  "about.visionTitle": "Unsere Vision",
  "about.visionDesc": "Gedeihen Sie mit uns - Unterstützung von Unternehmen, durch innovative Technologielösungen erfolgreich zu sein",
  "about.missionTitle": "Unsere Mission",
  "about.missionDesc": "Exzellenz in technischen Lösungen und Ideen liefern, um Unternehmen in allen Branchen zu verbessern",
  "about.commitmentTitle": "Unsere Verpflichtung",
  "about.commitmentDesc": "End-to-end-Lösungen mit über 14 Jahren Erfahrung zur Gewährleistung von Qualität und Kundenzufriedenheit",

  // Services Section
  "services.title": "Unsere Dienstleistungen",
  "services.subtitle": "Umfassende technische Lösungen zur Verbesserung und zum Wachstum Ihres Unternehmens",
  "services.web.title": "Website-Entwicklung",
  "services.web.description": "Maßgeschneiderte, responsive Websites, die mit modernen Technologien erstellt werden. Von einfachen Landingpages bis hin zu komplexen Webanwendungen.",
  "services.web.f1": "Individuelles Design",
  "services.web.f2": "Responsives Layout",
  "services.web.f3": "SEO-optimiert",
  "services.web.f4": "Schnelle Performance",
  "services.mobile.title": "App-Entwicklung",
  "services.mobile.description": "Native und plattformübergreifende mobile Anwendungen für iOS und Android, die außergewöhnliche Benutzererfahrungen bieten.",
  "services.mobile.f1": "iOS & Android",
  "services.mobile.f2": "Plattformübergreifend",
  "services.mobile.f3": "Benutzerfreundliche UI",
  "services.mobile.f4": "Skalierbare Architektur",
  "services.ideas.title": "Geschäftsideen & Planung",
  "services.ideas.description": "Strategische Geschäftsplanung und technische Beratung, um Ihre Ideen in erfolgreiche digitale Produkte zu verwandeln.",
  "services.ideas.f1": "Marktanalyse",
  "services.ideas.f2": "Technische Strategie",
  "services.ideas.f3": "Projektplanung",
  "services.ideas.f4": "ROI-Optimierung",
  "services.software.title": "Maßgeschneiderte Softwarelösungen",
  "services.software.description": "Individuelle Softwarelösungen, die auf Ihre spezifischen geschäftlichen Anforderungen und Arbeitsabläufe zugeschnitten sind.",
  "services.software.f1": "Individuelle Entwicklung",
  "services.software.f2": "API-Integration",
  "services.software.f3": "Datenbankdesign",
  "services.software.f4": "Cloud-Lösungen",
  "services.digital.title": "Digitale Transformation",
  "services.digital.description": "Unterstützung von Unternehmen bei der Modernisierung ihrer Abläufe und der Nutzung digitaler Technologien für Wachstum und Effizienz.",
  "services.digital.f1": "Prozessautomatisierung",
  "services.digital.f2": "Legacy-Migration",
  "services.digital.f3": "Cloud-Einführung",
  "services.digital.f4": "Digitale Strategie",
  "services.support.title": "Laufender Support & Wartung",
  "services.support.description": "Umfassende Support- und Wartungsdienste, damit Ihre Anwendungen reibungslos laufen.",
  "services.support.f1": "24/7 Support",
  "services.support.f2": "Fehlerbehebungen",
  "services.support.f3": "Updates & Upgrades",
  "services.support.f4": "Leistungsüberwachung",
  "services.readyTitle": "Bereit, Ihr Unternehmen zu transformieren?",
  "services.readyDesc": "Lassen Sie uns besprechen, wie wir Ihnen mit unserer technischen Expertise helfen können, Ihre Geschäftsziele zu erreichen.",
  "services.contactBtn": "Kontaktieren Sie uns noch heute",

  // Portfolio Section
  "portfolio.title": "Unser Portfolio",
  "portfolio.subtitle": "Präsentation unserer erfolgreichen Projekte und innovativen Lösungen",
  "portfolio.loading": "Portfolio-Elemente werden geladen...",
  "portfolio.empty": "Keine Portfolio-Elemente in dieser Kategorie gefunden.",
  "portfolio.view": "Ansehen",
  "portfolio.category.all": "Alle",
  "portfolio.category.web": "Webentwicklung",
  "portfolio.category.mobile": "Mobile App",
  "portfolio.category.ecommerce": "E-Commerce",
  "portfolio.category.custom": "Maßgeschneiderte Software",

  // Blog Section
  "blog.title": "Neueste Blog-Beiträge",
  "blog.subtitle": "Einblicke, Tipps und Updates von unserem Team",
  "blog.loading": "Blog-Beiträge werden geladen...",
  "blog.readMore": "Weiterlesen",
  "blog.back": "← Zurück zum Blog",
  "blog.empty": "Noch keine Blog-Beiträge verfügbar. Schauen Sie bald wieder vorbei!",
  "blog.sharePost": "Diesen Beitrag teilen:",

  // Contact Section
  "contact.title": "Kontakt aufnehmen",
  "contact.subtitle": "Lassen Sie uns besprechen, wie wir Ihrem Unternehmen zum Erfolg verhelfen können",
  "contact.infoTitle": "Kontaktinformationen",
  "contact.address": "Adresse",
  "contact.email": "E-Mail",
  "contact.phone": "Telefon",
  "contact.messageTitle": "Schreiben Sie uns eine Nachricht",
  "contact.label.name": "Name *",
  "contact.label.email": "E-Mail *",
  "contact.label.phone": "Telefon",
  "contact.label.message": "Nachricht *",
  "contact.placeholder.name": "Ihr Name",
  "contact.placeholder.email": "ihre.e-mail@beispiel.com",
  "contact.placeholder.phone": "+91 12345 67890",
  "contact.placeholder.message": "Erzählen Sie uns von Ihrem Projekt...",
  "contact.btn.send": "Nachricht senden",
  "contact.btn.sending": "Wird gesendet...",
  "contact.toast.missingKey": "Web3Forms-Zugriffsschlüssel fehlt. Bitte konfigurieren Sie ihn in .env",
  "contact.toast.success": "Vielen Dank! Wir werden uns in Kürze bei Ihnen melden.",
  "contact.toast.wrong": "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
  "contact.toast.error": "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal.",

  // Footer Section
  "footer.desc": "Gedeihen Sie mit uns - Unterstützung von Unternehmen mit innovativen technischen Lösungen und Ideen. Über 14 Jahre Exzellenz in der IT-Branche.",
  "footer.quickLinks": "Schnelllinks",
  "footer.contact": "Kontakt",
  "footer.rights": "Alle Rechte vorbehalten.",

  // Admin Login Section
  "admin.title": "Admin-Login",
  "admin.subtitle": "Melden Sie sich an, um Ihre Inhalte zu verwalten",
  "admin.email": "E-Mail",
  "admin.password": "Passwort",
  "admin.emailPlaceholder": "graycodder@gmail.com",
  "admin.passwordPlaceholder": "Geben Sie Ihr Passwort ein",
  "admin.cancel": "Abbrechen",
  "admin.login": "Anmelden",
  "admin.loggingIn": "Anmeldung läuft...",
  "admin.seedBtn": "Datenbank seeden (Nur Dev)",
  "admin.seedingBtn": "Datenbank wird geseedet...",
  "admin.footerText": "Verwenden Sie Ihre Firebase-Anmeldedaten",
  "admin.toast.success": "Anmeldung erfolgreich!",
  "admin.toast.invalid": "Ungültige E-Mail-Adresse oder Passwort.",
  "admin.toast.seedConfirm": "Sind Sie sicher, dass Sie die Datenbank seeden möchten? Dadurch könnten vorhandene Daten überschrieben werden.",
  "admin.toast.seedSuccess": "Datenbank erfolgreich geseedet!",
  "admin.toast.seedFail": "Fehler beim Seeden der Datenbank."
};

const ml = {
  // Navigation
  "nav.home": "ഹോം",
  "nav.about": "ഞങ്ങളെക്കുറിച്ച്",
  "nav.services": "സേവനങ്ങൾ",
  "nav.portfolio": "പോർട്ട്ഫോളിയോ",
  "nav.blog": "ബ്ലോഗ്",
  "nav.contact": "ബന്ധപ്പെടുക",
  "nav.admin": "അഡ്മിൻ",

  // Hero Section
  "hero.excellence": "ഐടി വ്യവസായത്തിൽ 14+ വർഷത്തെ മികവ്",
  "hero.title": "ഞങ്ങളോടൊപ്പം വളരൂ",
  "hero.description": "നൂതന സാങ്കേതിക പരിഹാരങ്ങളും ആശയങ്ങളും ഉപയോഗിച്ച് ബിസിനസുകളെ പരിവർത്തനം ചെയ്യുന്നു. എൻഡ്-ടു-എൻഡ് വെബ്സൈറ്റ് വികസനത്തിലും മൊബൈൽ ആപ്ലിക്കേഷൻ വികസനത്തിലും ഞങ്ങൾ വൈദഗ്ദ്ധ്യം നേടിയിരിക്കുന്നു.",
  "hero.servicesBtn": "ഞങ്ങളുടെ സേവനങ്ങൾ",
  "hero.contactBtn": "ബന്ധപ്പെടുക",
  "hero.experienceVal": "14+",
  "hero.experienceLabel": "വർഷത്തെ പരിചയം",
  "hero.projectsVal": "100+",
  "hero.projectsLabel": "പൂർത്തിയാക്കിയ പ്രോജക്റ്റുകൾ",
  "hero.clientsVal": "50+",
  "hero.clientsLabel": "സന്തുഷ്ടരായ ഉപഭോക്താക്കൾ",

  // About Section
  "about.title": "ഗ്രേകോഡറിനെക്കുറിച്ച്",
  "about.subtitle": "കേരളത്തിന്റെ ഹൃദയഭാഗത്ത് നിന്നുള്ള അത്യാധുനിക സാങ്കേതിക പരിഹാരങ്ങൾ ഉപയോഗിച്ച് ബിസിനസുകളെ ശാക്തീകരിക്കുന്നു",
  "about.desc1": "സാങ്കേതികവിദ്യയിലൂടെ ബിസിനസുകളെ പരിവർത്തനം ചെയ്യുക എന്ന കാഴ്ചപ്പാടോടെ സ്ഥാപിതമായ ഗ്രേകോഡർ, കേരളത്തിലെ കൊച്ചിയിലുള്ള ചെല്ലാനത്തെ ഞങ്ങളുടെ താവളത്തിൽ നിന്ന് 14 വർഷത്തിലേറെയായി ക്ലയന്റുകളെ സേവിക്കുന്നു. ബിസിനസ്സ് വളർച്ചയ്ക്കും നവീകരണത്തിനും സഹായിക്കുന്ന സമഗ്രമായ സാങ്കേതിക പരിഹാരങ്ങൾ നൽകുന്നതിൽ ഞങ്ങൾ വൈദഗ്ദ്ധ്യം നേടിയിരിക്കുന്നു.",
  "about.desc2": "എൻഡ്-ടു-എൻഡ് വെബ്‌സൈറ്റ് ഡെവലപ്‌മെന്റും മൊബൈൽ ആപ്ലിക്കേഷൻ ഡെവലപ്‌മെന്റ് സേവനങ്ങളും നൽകുന്നതിനായി ഞങ്ങളുടെ പരിചയസമ്പന്നരായ പ്രൊഫഷണലുകളുടെ ടീം സമർപ്പിതരാണ്. ഞങ്ങൾ ആപ്ലിക്കേഷനുകൾ നിർമ്മിക്കുക മാത്രമല്ല ചെയ്യുന്നത്; ഡിജിറ്റൽ യുഗത്തിൽ ബിസിനസുകളെ അഭിവൃദ്ധിപ്പെടുത്താൻ സഹായിക്കുന്ന പരിഹാരങ്ങൾ ഞങ്ങൾ സൃഷ്ടിക്കുന്നു.",
  "about.locationTitle": "ഞങ്ങളുടെ സ്ഥലം",
  "about.locationAddress": "ഗ്രേകോഡർ\nരജിസ്റ്റർ നമ്പർ: KL-02-0105921\nകെട്ടിട നമ്പർ: 16/149\nഎസ്. ചെല്ലാനം, കൊച്ചി - 682008\nകേരളം, ഇന്ത്യ",
  "about.visionTitle": "ഞങ്ങളുടെ കാഴ്ചപ്പാട്",
  "about.visionDesc": "ഞങ്ങളോടൊപ്പം വളരൂ - നൂതന സാങ്കേതിക പരിഹാരങ്ങളിലൂടെ അഭിവൃദ്ധി പ്രാപിക്കാൻ ബിസിനസുകളെ ശാക്തീകരിക്കുന്നു",
  "about.missionTitle": "ഞങ്ങളുടെ ദൗത്യം",
  "about.missionDesc": "വിവിധ വ്യവസായങ്ങളിലുടനീളമുള്ള ബിസിനസുകൾ മെച്ചപ്പെടുത്തുന്നതിനായി സാങ്കേതിക പരിഹാരങ്ങളിലും ആശയങ്ങളിലും മികവ് പുലർത്തുക",
  "about.commitmentTitle": "ഞങ്ങളുടെ പ്രതിബദ്ധത",
  "about.commitmentDesc": "ഗുണനിലവാരവും ഉപഭോക്തൃ സംതൃപ്തിയും ഉറപ്പാക്കുന്ന 14+ വർഷത്തെ വൈദഗ്ധ്യമുള്ള എൻഡ്-ടു-എൻഡ് പരിഹാരങ്ങൾ",

  // Services Section
  "services.title": "ഞങ്ങളുടെ സേവനങ്ങൾ",
  "services.subtitle": "നിങ്ങളുടെ ബിസിനസ്സ് മെച്ചപ്പെടുത്തുന്നതിനും വളർത്തുന്നതിനുമുള്ള എൻഡ്-ടു-എൻഡ് സാങ്കേതിക പരിഹാരങ്ങൾ",
  "services.web.title": "വെബ്‌സൈറ്റ് നിർമ്മാണം",
  "services.web.description": "ആധുനിക സാങ്കേതികവിദ്യകൾ ഉപയോഗിച്ച് നിർമ്മിച്ച കസ്റ്റം, റെസ്‌പോൺസീവ് വെബ്‌സൈറ്റുകൾ. ലളിതമായ ലാൻഡിംഗ് പേജുകൾ മുതൽ സങ്കീർണ്ണമായ വെബ് ആപ്ലിക്കേഷനുകൾ വരെ.",
  "services.web.f1": "കസ്റ്റം ഡിസൈൻ",
  "services.web.f2": "റെസ്‌പോൺസീവ് ലേഔട്ട്",
  "services.web.f3": "എസ്.ഇ.ഒ ഒപ്റ്റിമൈസ്ഡ്",
  "services.web.f4": "വേഗതയേറിയ പ്രവർത്തനം",
  "services.mobile.title": "മൊബൈൽ ആപ്പ് നിർമ്മാണം",
  "services.mobile.description": "മികച്ച ഉപയോക്തൃ അനുഭവം നൽകുന്ന ഐഒഎസ്, ആൻഡ്രോയിഡ് പ്ലാറ്റ്‌ഫോമുകൾക്കായുള്ള നേറ്റീവ്, ക്രോസ്-പ്ലാറ്റ്‌ഫോം മൊബൈൽ ആപ്ലിക്കേഷനുകൾ.",
  "services.mobile.f1": "ഐഒഎസ് & ആൻഡ്രോയിഡ്",
  "services.mobile.f2": "ക്രോസ്-പ്ലാറ്റ്‌ഫോം",
  "services.mobile.f3": "ഉപയോക്തൃ-സൗഹൃദ യുഐ",
  "services.mobile.f4": "സ്കേലബിൾ ആർക്കിടെക്ചർ",
  "services.ideas.title": "ബിസിനസ് ആശയങ്ങളും ആസൂത്രണവും",
  "services.ideas.description": "നിങ്ങളുടെ ആശയങ്ങളെ വിജയകരമായ ഡിജിറ്റൽ ഉൽപ്പന്നങ്ങളാക്കി മാറ്റുന്നതിനുള്ള തന്ത്രപരമായ ബിസിനസ്സ് ആസൂത്രണവും സാങ്കേതിക കൺസൾട്ടിംഗും.",
  "services.ideas.f1": "മാർക്കറ്റ് അനാലിസിസ്",
  "services.ideas.f2": "സാങ്കേതിക തന്ത്രം",
  "services.ideas.f3": "പ്രോജക്റ്റ് ആസൂത്രണം",
  "services.ideas.f4": "ആർഒഐ ഒപ്റ്റിമൈസേഷൻ",
  "services.software.title": "കസ്റ്റം സോഫ്റ്റ്‌വെയർ പരിഹാരങ്ങൾ",
  "services.software.description": "നിങ്ങളുടെ നിർദ്ദിഷ്ട ബിസിനസ്സ് ആവശ്യകതകൾക്കും വർക്ക്ഫ്ലോകൾക്കും അനുയോജ്യമായ രീതിയിൽ രൂപകൽപ്പന ചെയ്ത സോഫ്റ്റ്‌വെയർ പരിഹാരങ്ങൾ.",
  "services.software.f1": "കസ്റ്റം വികസനം",
  "services.software.f2": "എപിഐ ഇന്റഗ്രേഷൻ",
  "services.software.f3": "ഡാറ്റാബേസ് ഡിസൈൻ",
  "services.software.f4": "ക്ലൗഡ് പരിഹാരങ്ങൾ",
  "services.digital.title": "ഡിജിറ്റൽ പരിവർത്തനം",
  "services.digital.description": "ബിസിനസുകൾക്ക് അവരുടെ പ്രവർത്തനങ്ങൾ ആധുനികവത്കരിക്കാനും വളർച്ചയ്ക്കും കാര്യക്ഷമതയ്ക്കുമായി ഡിജിറ്റൽ സാങ്കേതികവിദ്യകൾ സ്വീകരിക്കാനും സഹായിക്കുക.",
  "services.digital.f1": "പ്രോസസ് ഓട്ടോമേഷൻ",
  "services.digital.f2": "ലെഗസി മൈഗ്രേഷൻ",
  "services.digital.f3": "ക്ലൗഡ് അഡോപ്ഷൻ",
  "services.digital.f4": "ഡിജിറ്റൽ തന്ത്രം",
  "services.support.title": "തുടർച്ചയായ പിന്തുണയും പരിപാലനവും",
  "services.support.description": "നിങ്ങളുടെ ആപ്ലിക്കേഷനുകൾ സുഗമമായി പ്രവർത്തിപ്പിക്കുന്നതിനുള്ള സമഗ്രമായ പിന്തുണയും പരിപാലന സേവനങ്ങളും.",
  "services.support.f1": "24/7 പിന്തുണ",
  "services.support.f2": "ബഗ് പരിഹാരങ്ങൾ",
  "services.support.f3": "അപ്‌ഡേറ്റുകളും നവീകരണങ്ങളും",
  "services.support.f4": "പെർഫോമൻസ് മോണിറ്ററിംഗ്",
  "services.readyTitle": "നിങ്ങളുടെ ബിസിനസ്സ് മാറ്റാൻ തയ്യാറാണോ?",
  "services.readyDesc": "ഞങ്ങളുടെ സാങ്കേതിക വൈദഗ്ധ്യം ഉപയോഗിച്ച് നിങ്ങളുടെ ബിസിനസ്സ് ലക്ഷ്യങ്ങൾ കൈവരിക്കാൻ ഞങ്ങൾക്ക് എങ്ങനെ സഹായിക്കാനാകുമെന്ന് ചർച്ച ചെയ്യാം.",
  "services.contactBtn": "ഇന്ന് തന്നെ ഞങ്ങളെ ബന്ധപ്പെടുക",

  // Portfolio Section
  "portfolio.title": "ഞങ്ങളുടെ പോർട്ട്ഫോളിയോ",
  "portfolio.subtitle": "ഞങ്ങളുടെ വിജയകരമായ പ്രോജക്റ്റുകളും നൂതനമായ പരിഹാരങ്ങളും പ്രദർശിപ്പിക്കുന്നു",
  "portfolio.loading": "പോർട്ട്ഫോളിയോ ഇനങ്ങൾ ലോഡ് ചെയ്യുന്നു...",
  "portfolio.empty": "ഈ വിഭാഗത്തിൽ പോർട്ട്ഫോളിയോ ഇനങ്ങളൊന്നും കണ്ടെത്തിയില്ല.",
  "portfolio.view": "കാണുക",
  "portfolio.category.all": "എല്ലാം",
  "portfolio.category.web": "വെബ് വികസനം",
  "portfolio.category.mobile": "മൊബൈൽ ആപ്പ്",
  "portfolio.category.ecommerce": "ഇ-കൊമേഴ്‌സ്",
  "portfolio.category.custom": "കസ്റ്റം സോഫ്റ്റ്‌വെയർ",

  // Blog Section
  "blog.title": "പുതിയ ബ്ലോഗ് പോസ്റ്റുകൾ",
  "blog.subtitle": "ഞങ്ങളുടെ ടീമിൽ നിന്നുള്ള വിവരങ്ങളും അപ്‌ഡേറ്റുകളും",
  "blog.loading": "ബ്ലോഗ് പോസ്റ്റുകൾ ലോഡ് ചെയ്യുന്നു...",
  "blog.readMore": "കൂടുതൽ വായിക്കുക",
  "blog.back": "← ബ്ലോഗിലേക്ക് മടങ്ങുക",
  "blog.empty": "ബ്ലോഗ് പോസ്റ്റുകളൊന്നും ഇതുവരെ ലഭ്യമായിട്ടില്ല. ഉടൻ വീണ്ടും പരിശോധിക്കുക!",
  "blog.sharePost": "ഈ പോസ്റ്റ് പങ്കിടുക:",

  // Contact Section
  "contact.title": "ബന്ധപ്പെടുക",
  "contact.subtitle": "നിങ്ങളുടെ ബിസിനസ്സ് അഭിവൃദ്ധിപ്പെടുത്താൻ ഞങ്ങൾക്ക് എങ്ങനെ സഹായിക്കാനാകുമെന്ന് ചർച്ച ചെയ്യാം",
  "contact.infoTitle": "ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ",
  "contact.address": "മേൽവിലാസം",
  "contact.email": "ഇമെയിൽ",
  "contact.phone": "ഫോൺ",
  "contact.messageTitle": "ഞങ്ങൾക്ക് ഒരു സന്ദേശം അയക്കൂ",
  "contact.label.name": "പേര് *",
  "contact.label.email": "ഇമെയിൽ *",
  "contact.label.phone": "ഫോൺ",
  "contact.label.message": "സന്ദേശം *",
  "contact.placeholder.name": "നിങ്ങളുടെ പേര്",
  "contact.placeholder.email": "your.email@example.com",
  "contact.placeholder.phone": "+91 12345 67890",
  "contact.placeholder.message": "നിങ്ങളുടെ പ്രോജക്റ്റിനെക്കുറിച്ച് ഞങ്ങളോട് പറയുക...",
  "contact.btn.send": "സന്ദേശം അയക്കുക",
  "contact.btn.sending": "അയക്കുന്നു...",
  "contact.toast.missingKey": "Web3Forms ആക്സസ് കീ കാണുന്നില്ല. .env-ൽ അത് കോൺഫിഗർ ചെയ്യുക",
  "contact.toast.success": "നന്ദി! ഞങ്ങൾ ഉടൻ തന്നെ നിങ്ങളെ ബന്ധപ്പെടും.",
  "contact.toast.wrong": "എന്തോ തകരാറിലായി. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
  "contact.toast.error": "ഒരു പിശക് സംഭവിച്ചു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.",

  // Footer Section
  "footer.desc": "ഞങ്ങളോടൊപ്പം വളരൂ - നൂതന സാങ്കേതിക പരിഹാരങ്ങളും ആശയങ്ങളും ഉപയോഗിച്ച് ബിസിനസുകളെ ശാക്തീകരിക്കുന്നു. ഐടി വ്യവസായത്തിൽ 14+ വർഷത്തെ മികവ്.",
  "footer.quickLinks": "ദ്രുത ലിങ്കുകൾ",
  "footer.contact": "ബന്ധപ്പെടുക",
  "footer.rights": "എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.",

  // Admin Login Section
  "admin.title": "അഡ്മിൻ ലോഗിൻ",
  "admin.subtitle": "ഉള്ളടക്കം നിയന്ത്രിക്കുന്നതിന് ലോഗിൻ ചെയ്യുക",
  "admin.email": "ഇമെയിൽ",
  "admin.password": "പാസ്‌വേഡ്",
  "admin.emailPlaceholder": "graycodder@gmail.com",
  "admin.passwordPlaceholder": "പാസ്‌വേഡ് നൽകുക",
  "admin.cancel": "റദ്ദാക്കുക",
  "admin.login": "ലോഗിൻ",
  "admin.loggingIn": "ലോഗിൻ ചെയ്യുന്നു...",
  "admin.seedBtn": "ഡാറ്റാബേസ് സീഡ് ചെയ്യുക (Dev മാത്രം)",
  "admin.seedingBtn": "ഡാറ്റാബേസ് സീഡ് ചെയ്യുന്നു...",
  "admin.footerText": "നിങ്ങളുടെ ഫയർബേസ് ക്രെഡൻഷ്യലുകൾ ഉപയോഗിക്കുക",
  "admin.toast.success": "ലോഗിൻ വിജയകരമായി!",
  "admin.toast.invalid": "തെറ്റായ ഇമെയിൽ അല്ലെങ്കിൽ പാസ്‌വേഡ്.",
  "admin.toast.seedConfirm": "തീർച്ചയായും ഡാറ്റാബേസ് സീഡ് ചെയ്യണമെന്നുണ്ടോ? ഇത് നിലവിലുള്ള ഡാറ്റ മാറ്റിയെഴുതിയേക്കാം.",
  "admin.toast.seedSuccess": "ഡാറ്റാബേസ് വിജയകരമായി സീഡ് ചെയ്തു!",
  "admin.toast.seedFail": "ഡാറ്റാബേസ് സീഡ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു."
};

const hi = {
  // Navigation
  "nav.home": "होम",
  "nav.about": "हमारे बारे में",
  "nav.services": "सेवाएँ",
  "nav.portfolio": "पोर्टफोलियो",
  "nav.blog": "ब्लॉग",
  "nav.contact": "संपर्क",
  "nav.admin": "एडमिन",

  // Hero Section
  "hero.excellence": "आईटी उद्योग में 14+ वर्षों की उत्कृष्टता",
  "hero.title": "हमारे साथ फलें-फूलें",
  "hero.description": "नवोन्मेषी तकनीकी समाधानों और विचारों के साथ व्यवसायों को बदलना। हम एंड-टू-एंड वेबसाइट विकास और मोबाइल एप्लिकेशन विकास में विशेषज्ञ हैं।",
  "hero.servicesBtn": "हमारी सेवाएँ",
  "hero.contactBtn": "संपर्क करें",
  "hero.experienceVal": "14+",
  "hero.experienceLabel": "वर्षों का अनुभव",
  "hero.projectsVal": "100+",
  "hero.projectsLabel": "वितरित परियोजनाएं",
  "hero.clientsVal": "50+",
  "hero.clientsLabel": "प्रसन्न ग्राहक",

  // About Section
  "about.title": "ग्रेकोडर के बारे में",
  "about.subtitle": "केरल के केंद्र से अत्याधुनिक प्रौद्योगिकी समाधानों के साथ व्यवसायों को सशक्त बनाना",
  "about.desc1": "प्रौद्योगिकी के माध्यम से व्यवसायों को बदलने के दृष्टिकोण के साथ स्थापित, ग्रेकोडर केरल के कोच्चि के चेल्लानम में स्थित अपने आधार से 14 वर्षों से अधिक समय से ग्राहकों की सेवा कर रहा है। हम व्यापक तकनीकी समाधान प्रदान करने में विशेषज्ञ हैं जो व्यावसायिक विकास और नवाचार को बढ़ावा देते हैं।",
  "about.desc2": "अनुभवी पेशेवरों की हमारी टीम एंड-टू-एंड वेबसाइट विकास और मोबाइल एप्लिकेशन विकास सेवाएं देने के लिए समर्पित है। हम केवल एप्लिकेशन नहीं बनाते हैं; हम ऐसे समाधान बनाते हैं जो डिजिटल युग में व्यवसायों को फलने-फूलने में मदद करते हैं।",
  "about.locationTitle": "हमारा स्थान",
  "about.locationAddress": "ग्रेकोडर\nपंजीकरण संख्या: KL-02-0105921\nभवन संख्या: 16/149\nएस. चेल्लानम, कोच्चि - 682008\nकेरल, भारत",
  "about.visionTitle": "हमारा दृष्टिकोण",
  "about.visionDesc": "हमारे साथ फलें-फूलें - नवोन्मेषी प्रौद्योगिकी समाधानों के माध्यम से व्यवसायों को फलने-फूलने के लिए सशक्त बनाना",
  "about.missionTitle": "हमारा उद्देश्य",
  "about.missionDesc": "विभिन्न उद्योगों में व्यवसायों को बेहतर बनाने के लिए तकनीकी समाधानों और विचारों में उत्कृष्टता प्रदान करना",
  "about.commitmentTitle": "हमारी प्रतिबद्धता",
  "about.commitmentDesc": "गुणवत्ता और ग्राहक संतुष्टि सुनिश्चित करने वाले 14+ वर्षों की विशेषज्ञता के साथ एंड-टू-एंड समाधान",

  // Services Section
  "services.title": "हमारी सेवाएँ",
  "services.subtitle": "आपके व्यवसाय को बेहतर बनाने और बढ़ाने के लिए एंड-टू-एंड तकनीकी समाधान",
  "services.web.title": "वेबसाइट विकास",
  "services.web.description": "आधुनिक तकनीकों के साथ निर्मित कस्टम, उत्तरदायी वेबसाइटें। सरल लैंडिंग पृष्ठों से लेकर जटिल वेब अनुप्रयोगों तक।",
  "services.web.f1": "कस्टम डिज़ाइन",
  "services.web.f2": "उत्तरदायी लेआउट",
  "services.web.f3": "एसईओ अनुकूलित",
  "services.web.f4": "तेज़ प्रदर्शन",
  "services.mobile.title": "मोबाइल ऐप विकास",
  "services.mobile.description": "iOS और Android के लिए देशी और क्रॉस-प्लेटफ़ॉर्म मोबाइल एप्लिकेशन जो असाधारण उपयोगकर्ता अनुभव प्रदान करते हैं।",
  "services.mobile.f1": "iOS और Android",
  "services.mobile.f2": "cross-platform",
  "services.mobile.f3": "उपयोगकर्ता के अनुकूल यूआई",
  "services.mobile.f4": "स्केलेबल आर्किटेक्चर",
  "services.ideas.title": "व्यावसायिक विचार और योजना",
  "services.ideas.description": "आपके विचारों को सफल डिजिटल उत्पादों में बदलने के लिए रणनीतिक व्यावसायिक योजना और तकनीकी परामर्श।",
  "services.ideas.f1": "बाजार विश्लेषण",
  "services.ideas.f2": "तकनीकी रणनीति",
  "services.ideas.f3": "परियोजना योजना",
  "services.ideas.f4": "आरओआई अनुकूलन",
  "services.software.title": "कस्टम सॉफ्टवेयर समाधान",
  "services.software.description": "आपकी विशिष्ट व्यावसायिक आवश्यकताओं और वर्कफ़्लो को पूरा करने के लिए डिज़ाइन किए गए कस्टम सॉफ़्टवेयर समाधान।",
  "services.software.f1": "कस्टम विकास",
  "services.software.f2": "एपीआई एकीकरण",
  "services.software.f3": "डेटाबेस डिज़ाइन",
  "services.software.f4": "क्लाउड समाधान",
  "services.digital.title": "डिजिटल रूपांतरण",
  "services.digital.description": "व्यवसायों को उनके संचालन को आधुनिक बनाने और विकास और दक्षता के लिए डिजिटल तकनीकों को अपनाने में मदद करना।",
  "services.digital.f1": "प्रक्रिया स्वचालन",
  "services.digital.f2": "विरासत प्रवासन",
  "services.digital.f3": "क्लाउड अपनाना",
  "services.digital.f4": "डिजिटल रणनीति",
  "services.support.title": "सतत सहायता एवं रखरखाव",
  "services.support.description": "आपके अनुप्रयोगों को सुचारू रूप से चलाने के लिए व्यापक सहायता और रखरखाव सेवाएँ।",
  "services.support.f1": "24/7 सहायता",
  "services.support.f2": "बग सुधार",
  "services.support.f3": "अपडेट और अपग्रेड",
  "services.support.f4": "प्रदर्शन की निगरानी",
  "services.readyTitle": "क्या आप अपने व्यवसाय को बदलने के लिए तैयार हैं?",
  "services.readyDesc": "आइए चर्चा करें कि हम अपनी तकनीकी विशेषज्ञता के साथ आपके व्यावसायिक लक्ष्यों को प्राप्त करने में आपकी कैसे मदद कर सकते हैं।",
  "services.contactBtn": "आज ही हमसे संपर्क करें",

  // Portfolio Section
  "portfolio.title": "हमारा पोर्टफोलियो",
  "portfolio.subtitle": "हमारी सफल परियोजनाओं और अभिनव समाधानों का प्रदर्शन",
  "portfolio.loading": "पोर्टफोलियो आइटम लोड हो रहे हैं...",
  "portfolio.empty": "इस श्रेणी में कोई पोर्टफोलियो आइटम नहीं मिला।",
  "portfolio.view": "देखें",
  "portfolio.category.all": "सभी",
  "portfolio.category.web": "वेब विकास",
  "portfolio.category.mobile": "मोबाइल ऐप",
  "portfolio.category.ecommerce": "ई-कॉमर्स",
  "portfolio.category.custom": "कस्टम सॉफ्टवेयर",

  // Blog Section
  "blog.title": "नवीनतम ब्लॉग पोस्ट",
  "blog.subtitle": "हमारी टीम की ओर से अंतर्दृष्टि, सुझाव और अपडेट",
  "blog.loading": "ब्लॉग पोस्ट लोड हो रहे हैं...",
  "blog.readMore": "अधिक पढ़ें",
  "blog.back": "← ब्लॉग पर वापस जाएं",
  "blog.empty": "अभी तक कोई ब्लॉग पोस्ट उपलब्ध नहीं है। जल्द ही दोबारा जांचें!",
  "blog.sharePost": "इस पोस्ट को साझा करें:",

  // Contact Section
  "contact.title": "संपर्क करें",
  "contact.subtitle": "आइए चर्चा करें कि हम आपके व्यवसाय को फलने-फूलने में कैसे मदद कर सकते हैं",
  "contact.infoTitle": "संपर्क जानकारी",
  "contact.address": "पता",
  "contact.email": "ईमेल",
  "contact.phone": "फ़ोन",
  "contact.messageTitle": "हमें एक संदेश भेजें",
  "contact.label.name": "नाम *",
  "contact.label.email": "ईमेल *",
  "contact.label.phone": "फ़ोन",
  "contact.label.message": "संदेश *",
  "contact.placeholder.name": "आपका नाम",
  "contact.placeholder.email": "your.email@example.com",
  "contact.placeholder.phone": "+91 12345 67890",
  "contact.placeholder.message": "हमें अपने प्रोजेक्ट के बारे में बताएं...",
  "contact.btn.send": "संदेश भेजें",
  "contact.btn.sending": "भेजा जा रहा है...",
  "contact.toast.missingKey": "Web3Forms एक्सेस कुंजी गायब है। कृपया इसे .env में कॉन्फ़िगर करें",
  "contact.toast.success": "धन्यवाद! हम आपसे जल्द ही संपर्क करेंगे।",
  "contact.toast.wrong": "कुछ गलत हो गया। कृपया पुन: प्रयास करें।",
  "contact.toast.error": "कोई त्रुटि हुई. कृपया बाद में पुन: प्रयास करें।",

  // Footer Section
  "footer.desc": "हमारे साथ फलें-फूलें - नवोन्मेषी तकनीकी समाधानों और विचारों के साथ व्यवसायों को सशक्त बनाना। आईटी उद्योग में 14+ वर्षों की उत्कृष्टता।",
  "footer.quickLinks": "त्वरित लिंक्स",
  "footer.contact": "संपर्क",
  "footer.rights": "सर्वाधिकार सुरक्षित।",

  // Admin Login Section
  "admin.title": "एडमिन लॉगिन",
  "admin.subtitle": "अपनी सामग्री प्रबंधित करने के लिए साइन इन करें",
  "admin.email": "ईमेल",
  "admin.password": "पासवर्ड",
  "admin.emailPlaceholder": "graycodder@gmail.com",
  "admin.passwordPlaceholder": "अपना पासवर्ड दर्ज करें",
  "admin.cancel": "रद्द करें",
  "admin.login": "लॉगिन",
  "admin.loggingIn": "लॉगिन किया जा रहा है...",
  "admin.seedBtn": "डेटाबेस सीड करें (केवल देव)",
  "admin.seedingBtn": "डेटाबेस सीड किया जा रहा है...",
  "admin.footerText": "अपने फायरबेस क्रेडेंशियल्स का उपयोग करें",
  "admin.toast.success": "लॉगिन सफल रहा!",
  "admin.toast.invalid": "अमान्य ईमेल या पासवर्ड।",
  "admin.toast.seedConfirm": "क्या आप वाकई डेटाबेस सीड करना चाहते हैं? इससे मौजूदा डेटा ओवरराइट हो सकता है।",
  "admin.toast.seedSuccess": "डेटाबेस सफलतापूर्वक सीड किया गया!",
  "admin.toast.seedFail": "डेटाबेस सीड करने में विफल।"
};

const ja = {
  // Navigation
  "nav.home": "ホーム",
  "nav.about": "私たちについて",
  "nav.services": "サービス",
  "nav.portfolio": "ポートフォリオ",
  "nav.blog": "ブログ",
  "nav.contact": "お問い合わせ",
  "nav.admin": "管理者",

  // Hero Section
  "hero.excellence": "IT業界で14年以上の卓越した実績",
  "hero.title": "私たちと共に成長しましょう",
  "hero.description": "革新的な技術ソリューションとアイデアでビジネスを変革します。私たちはエンドツーエンドのウェブサイト開発とモバイルアプリケーション開発を専門としています。",
  "hero.servicesBtn": "サービス一覧",
  "hero.contactBtn": "お問い合わせ",
  "hero.experienceVal": "14+",
  "hero.experienceLabel": "年以上の経験",
  "hero.projectsVal": "100+",
  "hero.projectsLabel": "提供されたプロジェクト",
  "hero.clientsVal": "50+",
  "hero.clientsLabel": "満足されたクライアント",

  // About Section
  "about.title": "Graycodderについて",
  "about.subtitle": "ケララ州の中心部から最先端のテクノロジーソリューションでビジネスを支援",
  "about.desc1": "テクノロジーを通じてビジネスを変革するというビジョンを掲げて設立されたGraycodderは、ケララ州コチのチェッラナムを拠点に、14年以上にわたりクライアントにサービスを提供してきました。ビジネスの成長とイノベーションを推進する包括的な技術ソリューションの提供を専門としています。",
  "about.desc2": "経験豊富なプロフェッショナルチームが、エンドツーエンドのウェブサイト開発およびモバイルアプリケーション開発サービスの提供に専念しています。単にアプリケーションを構築するだけでなく、デジタル時代においてビジネスが繁栄するためのソリューションを創造します。",
  "about.locationTitle": "当社の所在地",
  "about.locationAddress": "Graycodder\n登録番号: KL-02-0105921\nビル番号: 16/149\nS. Chellanam, Kochi - 682008\nケララ州、インド",
  "about.visionTitle": "私たちのビジョン",
  "about.visionDesc": "私たちと共に成長しましょう - 革新的なテクノロジーソリューションを通じてビジネスの繁栄を支援します",
  "about.missionTitle": "私たちの使命",
  "about.missionDesc": "さまざまな業界のビジネスを向上させるため、技術ソリューションとアイデアにおいて卓越した成果を提供します",
  "about.commitmentTitle": "私たちの約束",
  "about.commitmentDesc": "品質とクライアント満足度を保証する、14年以上の専門知識に基づいたエンドツーエンドのソリューション",

  // Services Section
  "services.title": "サービス内容",
  "services.subtitle": "ビジネスを改善し成長させるためのエンドツーエンドの技術ソリューション",
  "services.web.title": "ウェブサイト開発",
  "services.web.description": "最新技術で構築された、カスタマイズされたレスポンシブなウェブサイト。シンプルなランディングページから複雑なウェブアプリケーションまで対応します。",
  "services.web.f1": "カスタムデザイン",
  "services.web.f2": "レスポンシブレイアウト",
  "services.web.f3": "SEO最適化",
  "services.web.f4": "高速なパフォーマンス",
  "services.mobile.title": "モバイルアプリ開発",
  "services.mobile.description": "卓越したユーザー体験を提供する、iOSおよびAndroid向けのネイティブおよびクロスプラットフォームのモバイルアプリケーション。",
  "services.mobile.f1": "iOS & Android",
  "services.mobile.f2": "クロスプラットフォーム",
  "services.mobile.f3": "使いやすいUI",
  "services.mobile.f4": "拡張性の高いアーキテクチャ",
  "services.ideas.title": "ビジネスアイデアと企画",
  "services.ideas.description": "あなたのアイデアを成功するデジタル製品に変えるための、戦略的なビジネス企画と技術コンサルティング。",
  "services.ideas.f1": "市場分析",
  "services.ideas.f2": "技術戦略",
  "services.ideas.f3": "プロジェクト企画",
  "services.ideas.f4": "ROI最適化",
  "services.software.title": "カスタムソフトウェア開発",
  "services.software.description": "お客様の特定のビジネス要件やワークフローに合わせて設計された、オーダーメイドのソフトウェアソリューション。",
  "services.software.f1": "カスタム開発",
  "services.software.f2": "API連携",
  "services.software.f3": "データベース設計",
  "services.software.f4": "クラウドソリューション",
  "services.digital.title": "デジタルトランスフォーメーション",
  "services.digital.description": "ビジネスの運営を近代化し、成長と効率化のためにデジタル技術の導入を支援します。",
  "services.digital.f1": "プロセスの自動化",
  "services.digital.f2": "レガシー移行",
  "services.digital.f3": "クラウド導入",
  "services.digital.f4": "デジタル戦略",
  "services.support.title": "継続的なサポートと保守",
  "services.support.description": "アプリケーションをスムーズに動作させ続けるための、包括的なサポートおよび保守サービス。",
  "services.support.f1": "24時間365日サポート",
  "services.support.f2": "バグ修正",
  "services.support.f3": "更新 & アップグレード",
  "services.support.f4": "パフォーマンス監視",
  "services.readyTitle": "ビジネスを変革する準備はできていますか？",
  "services.readyDesc": "当社の技術的専門知識により、ビジネスゴールの達成をどのようにサポートできるかご相談ください。",
  "services.contactBtn": "今すぐお問い合わせ",

  // Portfolio Section
  "portfolio.title": "ポートフォリオ",
  "portfolio.subtitle": "当社の成功プロジェクトと革新的なソリューションの紹介",
  "portfolio.loading": "ポートフォリオ項目を読み込んでいます...",
  "portfolio.empty": "このカテゴリのポートフォリオ項目が見つかりませんでした。",
  "portfolio.view": "表示",
  "portfolio.category.all": "すべて",
  "portfolio.category.web": "ウェブ開発",
  "portfolio.category.mobile": "モバイルアプリ",
  "portfolio.category.ecommerce": "Eコマース",
  "portfolio.category.custom": "カスタムソフトウェア",

  // Blog Section
  "blog.title": "最新のブログ記事",
  "blog.subtitle": "チームからのインサイト、ヒント、最新情報",
  "blog.loading": "ブログ記事を読み込んでいます...",
  "blog.readMore": "続きを読む",
  "blog.back": "← ブログに戻る",
  "blog.empty": "ブログ記事はまだありません。また近いうちにお越しください！",
  "blog.sharePost": "この記事を共有する:",

  // Contact Section
  "contact.title": "お問い合わせ",
  "contact.subtitle": "ビジネスの繁栄をどのようにサポートできるかご相談ください",
  "contact.infoTitle": "連絡先情報",
  "contact.address": "住所",
  "contact.email": "メールアドレス",
  "contact.phone": "電話番号",
  "contact.messageTitle": "メッセージを送信",
  "contact.label.name": "お名前 *",
  "contact.label.email": "メールアドレス *",
  "contact.label.phone": "電話番号",
  "contact.label.message": "メッセージ *",
  "contact.placeholder.name": "お名前を入力してください",
  "contact.placeholder.email": "your.email@example.com",
  "contact.placeholder.phone": "+91 12345 67890",
  "contact.placeholder.message": "プロジェクトについて教えてください...",
  "contact.btn.send": "メッセージを送信",
  "contact.btn.sending": "送信中...",
  "contact.toast.missingKey": "Web3Formsのアクセスキーがありません。.envで設定してください",
  "contact.toast.success": "ありがとうございます！追ってご連絡いたします。",
  "contact.toast.wrong": "何かがうまくいきませんでした。もう一度お試しください。",
  "contact.toast.error": "エラーが発生しました。後でもう一度お試しください。",

  // Footer Section
  "footer.desc": "私たちと共に成長しましょう - 革新的な技術ソリューションとアイデアでビジネスを支援。IT業界で14年以上の卓越した実績。",
  "footer.quickLinks": "クイックリンク",
  "footer.contact": "連絡先",
  "footer.rights": "All rights reserved.",

  // Admin Login Section
  "admin.title": "管理者ログイン",
  "admin.subtitle": "コンテンツを管理するためにサインインしてください",
  "admin.email": "メールアドレス",
  "admin.password": "パスワード",
  "admin.emailPlaceholder": "graycodder@gmail.com",
  "admin.passwordPlaceholder": "パスワードを入力してください",
  "admin.cancel": "キャンセル",
  "admin.login": "ログイン",
  "admin.loggingIn": "ログイン中...",
  "admin.seedBtn": "データベースにシード（開発のみ）",
  "admin.seedingBtn": "データベースにシード中...",
  "admin.footerText": "Firebase Authの資格情報を使用してください",
  "admin.toast.success": "ログインに成功しました！",
  "admin.toast.invalid": "メールアドレスまたはパスワードが無効です。",
  "admin.toast.seedConfirm": "データベースにシードしてもよろしいですか？既存のデータが上書きされる可能性があります。",
  "admin.toast.seedSuccess": "データベースのシードに成功しました！",
  "admin.toast.seedFail": "データベースのシードに失敗しました。"
};

const dictionaries: Record<Language, Record<string, string>> = {
  en,
  de,
  ml,
  hi,
  ja,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    if (saved && (saved === 'en' || saved === 'de' || saved === 'ml' || saved === 'hi' || saved === 'ja')) {
      return saved as Language;
    }
    // Default to browser language if supported, else English
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'de' || browserLang === 'ml' || browserLang === 'hi' || browserLang === 'ja') {
      return browserLang as Language;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const dict = dictionaries[language] || dictionaries['en'];
    return dict[key] || dictionaries['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
