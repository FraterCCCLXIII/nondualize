import { useState } from "react";
import { X, Copy, Check, Share2, Facebook, Twitter, Instagram, MessageCircle, MessageSquare, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(trackUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareToSocial = (platform: string) => {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                className="w-full px-3 py-2 pr-12 bg-white/10 border border-white/20 rounded-md text-white text-sm"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
            {copied && (
              <p className="text-sm text-green-400">Copied!</p>
            )}
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-white/80">Share to</label>
            <TooltipProvider>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('facebook')}
                      size="sm"
                      className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white p-0"
                    >
                      <Facebook className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on Facebook</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('twitter')}
                      size="sm"
                      className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 text-white p-0"
                    >
                      <Twitter className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on X (Twitter)</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('instagram')}
                      size="sm"
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-0"
                    >
                      <Instagram className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on Instagram</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('sms')}
                      size="sm"
                      className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white p-0"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share via SMS</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('messenger')}
                      size="sm"
                      className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white p-0"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on Messenger</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('whatsapp')}
                      size="sm"
                      className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white p-0"
                    >
                      <Phone className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on WhatsApp</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('signal')}
                      size="sm"
                      className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white p-0"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on Signal</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => shareToSocial('email')}
                      size="sm"
                      className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 text-white p-0"
                    >
                      <Mail className="h-5 w-5" />
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