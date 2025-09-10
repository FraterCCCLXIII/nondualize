import React from "react";
import { X, Mail, Github, Code } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trackModalOpen, trackModalClose } from "@/lib/analytics";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  // Track modal open/close
  React.useEffect(() => {
    if (isOpen) {
      trackModalOpen('contact');
    }
  }, [isOpen]);

  const handleClose = () => {
    trackModalClose('contact');
    onClose();
  };

  // Obscure email for bots using multiple obfuscation techniques
  const getEmail = () => {
    const parts = ["openartist", "gmail", "com"];
    return parts[0] + "@" + parts[1] + "." + parts[2];
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md glass-morphism border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white text-center">
            Contact & Open Source
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-white/90">
          {/* Open Source Info */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Code className="h-5 w-5 text-white/70" />
              <span className="text-sm font-semibold text-white">Open Source Project</span>
            </div>
            <p className="text-sm leading-relaxed">
              Nondualize is an open source project dedicated to preserving and sharing Andrew Cohen's transformative teachings.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white text-center">Get in Touch</h3>
            
            {/* Email Contact */}
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-md">
              <Mail className="h-4 w-4 text-white/70" />
              <div className="flex-1">
                <p className="text-xs font-medium">Questions & Feedback</p>
                <button 
                  onClick={() => {
                    // Create mailto link with obscured email
                    const mailtoLink = `mailto:${getEmail()}`;
                    window.location.href = mailtoLink;
                  }}
                  className="text-xs text-white/80 hover:text-white transition-colors underline"
                >
                  Send Email
                </button>
              </div>
            </div>

            {/* GitHub Link */}
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-md">
              <Github className="h-4 w-4 text-white/70" />
              <div className="flex-1">
                <p className="text-xs font-medium">Source Code</p>
                <a 
                  href="https://github.com/FraterCCCLXIII/nondualize"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/80 hover:text-white transition-colors"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-2">
            <p className="text-xs text-white/60">
              Contributions and feedback welcome
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
