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
  FaFacebookMessenger,
  FaEnvelope,
  FaSms
} from "react-icons/fa";
import { trackAudioShare, trackModalOpen, trackModalClose } from "@/lib/analytics";

// Custom Signal Icon Component
const SignalIcon = ({ className }: { className?: string }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 789 789" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M394.24 74.2941C217.34 74.3741 74.0103 217.844 74.0903 394.734C74.1203 454.994 91.1403 514.024 123.21 565.044L92.4003 696.534L223.8 665.724C373.34 760.314 571.25 715.764 665.84 566.224C760.43 416.684 715.88 218.774 566.34 124.184C514.78 91.5741 454.99 74.3641 393.99 74.5641L394.26 74.2941H394.24ZM211.16 701.984L158.31 714.344L166.73 750.174L205.69 741.214C235.24 757.154 266.73 769.194 299.38 777.044L308.34 741.214C274.19 732.914 241.44 719.634 211.16 701.804V701.984ZM38.8303 621.914L74.6603 630.244L86.9303 577.314C68.9803 547.154 55.6103 514.494 47.2503 480.404L11.4203 489.364C19.5203 522.014 31.7403 553.494 47.7803 583.054L38.8203 622.014V621.924L38.8303 621.914ZM125.53 721.784L49.2203 739.694L67.1303 663.384L31.3003 655.054L13.3903 731.274C8.52031 751.064 20.6203 771.054 40.4103 775.924C40.6003 775.974 40.7903 776.014 40.9803 776.064C46.5103 777.404 52.2903 777.404 57.8203 776.064L134.13 758.154L125.71 721.794H125.53V721.784ZM340.49 41.0641C376.12 35.7341 412.34 35.7341 447.97 41.0641L452.99 4.78406C413.8 -1.12594 373.95 -1.12594 334.76 4.78406L340.4 41.2341L340.49 41.0541V41.0641ZM731.91 190.824L700.29 209.814C718.79 240.424 732.59 273.634 741.22 308.344L777.05 299.384C767.71 260.964 752.61 224.184 732.27 190.294L731.91 190.834V190.824ZM106.63 182.674C127.93 153.694 153.44 128.064 182.32 106.634L160.2 76.8941C128.34 100.334 100.22 128.484 76.8103 160.374L106.55 182.494L106.64 182.674H106.63ZM606.16 106.624C635.06 127.924 660.6 153.434 681.93 182.314L711.67 160.374C688.27 128.554 660.19 100.474 628.37 77.0741L606.16 106.634V106.624ZM681.93 606.244C660.6 635.114 635.05 660.624 606.16 681.934L628.1 711.674C659.98 688.254 688.15 660.174 711.67 628.374L681.93 606.254V606.244ZM447.8 747.934C412.18 753.354 375.94 753.354 340.32 747.934L334.77 784.564C373.93 790.474 413.75 790.474 452.91 784.564L447.36 747.934H447.81H447.8ZM777.05 489.264L741.22 480.304C732.61 515.254 718.78 548.714 700.2 579.544L731.82 598.534C752.34 564.614 767.59 527.764 777.05 489.264ZM751.61 394.594C751.61 412.584 750.27 430.544 747.58 448.334L784.03 453.884C789.94 414.724 789.94 374.904 784.03 335.744L747.58 341.294C750.28 359.084 751.62 377.044 751.61 395.034V394.584V394.594ZM598.09 732.264L579.1 700.644C548.49 719.144 515.28 732.944 480.57 741.574L489.53 777.404C527.95 768.064 564.73 752.964 598.62 732.624L598.08 732.264H598.09ZM36.9503 394.594C36.9503 376.604 38.2703 358.644 40.8903 340.854L4.44031 335.304C-1.46969 374.464 -1.46969 414.284 4.44031 453.444L40.9803 448.164C38.3603 430.374 37.0403 412.404 37.0403 394.424L36.9503 394.604V394.594ZM56.6503 190.824C36.1503 224.724 20.9003 261.544 11.4203 300.004L47.2503 308.964C55.8603 274.084 69.6603 240.684 88.1803 209.904L56.6503 190.824ZM488.82 11.7741L479.86 47.6041C514.82 56.2541 548.27 70.1141 579.1 88.7141L598.18 57.0941C564.22 36.5641 527.35 21.2841 488.82 11.7741ZM299.56 11.7741L308.52 47.6041C273.6 56.2641 240.17 70.1241 209.37 88.7141L190.38 57.0941C224.32 36.6041 261.16 21.3541 299.65 11.8641L299.56 11.7741Z" 
      fill="currentColor"
    />
  </svg>
);

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
                      <SignalIcon className="h-4 w-4 sm:h-5 sm:w-5" />
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