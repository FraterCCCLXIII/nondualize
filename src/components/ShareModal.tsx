import React, { useState } from "react";
import { X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaWhatsapp, 
  FaSignal, 
  FaFacebookMessenger,
  FaEnvelope,
  FaSms
} from "react-icons/fa";
import { trackAudioShare, trackModalOpen, trackModalClose } from "@/lib/analytics";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackTitle: string;
  trackSlug: string;
}

export function ShareModal({ isOpen, onClose, trackTitle, trackSlug }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const currentUrl = window.location.origin;
  const trackUrl = `${currentUrl}/track/${trackSlug}`;

  // Track modal open/close
  React.useEffect(() => {
    if (isOpen) {
      trackModalOpen('share');
    }
  }, [isOpen]);

  const handleClose = () => {
    trackModalClose('share');
    onClose();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(trackUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Track copy event
      trackAudioShare(trackTitle, 0, 'clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareToSocial = (platform: string) => {
    // Track social share event
    trackAudioShare(trackTitle, 0, platform);
    
    const text = `Listen to "${trackTitle}" with Andrew Cohen`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(trackUrl);

    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      instagram: `https://www.instagram.com/?url=${encodedUrl}`,
      sms: `sms:?body=${encodedText}%20${encodedUrl}`,
      messenger: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=YOUR_APP_ID`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      signal: `https://signal.me/#p/+1234567890&text=${encodedText}%20${encodedUrl}`,
      email: `mailto:?subject=${encodeURIComponent(trackTitle)}&body=${encodedText}%20${encodedUrl}`,
    };

    const url = shareUrls[platform];
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg md:max-w-xl glass-morphism border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">Share "{trackTitle}"</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Copy Link Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Link</label>
            <div className="relative">
              <input
                type="text"
                value={trackUrl}
                readOnly
                className="w-full px-3 py-2 pr-8 bg-white/10 border border-white/20 rounded-md text-white text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded flex items-center justify-center"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
            {copied && (
              <p className="text-sm text-green-400">Copied!</p>
            )}
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-white/80">Share to</label>
            <TooltipProvider>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                {/* Facebook */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('facebook')}
                      size="sm"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white p-0 transition-all duration-200 hover:scale-105"
                    >
                      <FaFacebook className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on Facebook</p>
                  </TooltipContent>
                </Tooltip>
                
                {/* X (Twitter) */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('twitter')}
                      size="sm"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black hover:bg-gray-800 text-white p-0 transition-all duration-200 hover:scale-105"
                    >
                      <FaTwitter className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on X (Twitter)</p>
                  </TooltipContent>
                </Tooltip>
                
                {/* Instagram */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('instagram')}
                      size="sm"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#E4405F] via-[#F77737] to-[#FCAF45] hover:from-[#D62976] hover:via-[#F56040] hover:to-[#FCAF45] text-white p-0 transition-all duration-200 hover:scale-105"
                    >
                      <FaInstagram className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on Instagram</p>
                  </TooltipContent>
                </Tooltip>
                
                {/* WhatsApp */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('whatsapp')}
                      size="sm"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#22C55E] text-white p-0 transition-all duration-200 hover:scale-105"
                    >
                      <FaWhatsapp className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on WhatsApp</p>
                  </TooltipContent>
                </Tooltip>
                
                {/* Signal */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('signal')}
                      size="sm"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#3A76F0] hover:bg-[#2563EB] text-white p-0 transition-all duration-200 hover:scale-105"
                    >
                      <FaSignal className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on Signal</p>
                  </TooltipContent>
                </Tooltip>
                
                {/* Facebook Messenger */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('messenger')}
                      size="sm"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0084FF] hover:bg-[#0073E6] text-white p-0 transition-all duration-200 hover:scale-105"
                    >
                      <FaFacebookMessenger className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on Messenger</p>
                  </TooltipContent>
                </Tooltip>
                
                {/* SMS */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('sms')}
                      size="sm"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#10B981] hover:bg-[#059669] text-white p-0 transition-all duration-200 hover:scale-105"
                    >
                      <FaSms className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share via SMS</p>
                  </TooltipContent>
                </Tooltip>
                
                {/* Email */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('email')}
                      size="sm"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#6B7280] hover:bg-[#4B5563] text-white p-0 transition-all duration-200 hover:scale-105"
                    >
                      <FaEnvelope className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share via Email</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 