import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Footer = () => {
  const [year] = React.useState(() => new Date().getFullYear());

  const footerSections = [
    {
      title: "About",
      links: [
        { text: "About Us", href: "/about" },
        { text: "How it Works", href: "/how-it-works" },
        { text: "Success Stories", href: "/success-stories" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Terms of Service", href: "/terms" },
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Cookie Policy", href: "/cookies" },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "Help Center", href: "/help" },
        { text: "Contact Us", href: "/contact" },
        { text: "Safety Tips", href: "/safety" },
      ],
    },
  ];

  const socialLinks = [
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="w-full py-6 lg:py-8 mt-auto backdrop-blur-sm bg-primary/80 text-secondary">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-sm font-semibold text-secondary">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      to={link.href}
                      className="hover:text-accent transition-colors duration-200"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-secondary text-center">Connect</h4>
            <div className="flex space-x-4 justify-center">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="hover:text-accent transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <Accordion type="single" collapsible className="w-full">
            {footerSections.map((section, index) => (
              <AccordionItem key={section.title} value={`item-${index}`}>
                <AccordionTrigger className="text-sm font-semibold text-secondary">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm">
                    {section.links.map((link) => (
                      <li key={link.text}>
                        <Link
                          to={link.href}
                          className="hover:text-accent transition-colors duration-200"
                        >
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-semibold text-secondary text-center">Connect</h4>
            <div className="flex space-x-4 justify-center">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="hover:text-accent transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-primary/20 pt-6 text-center">
          <p className="text-xs text-muted">
            © {year} Project Wingman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};