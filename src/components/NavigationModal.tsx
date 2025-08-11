import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageSlug: string;
}

interface PageContent {
  title: string;
  subtitle: string;
  content: string[];
}

const pageContents: Record<string, PageContent> = {
  life: {
    title: "Life",
    subtitle: "The Journey of Awakening",
    content: [
      "Andrew Cohen's life has been a remarkable journey of spiritual discovery and transformation. From his early years in New York to his encounters with enlightened masters in India, his path has been one of continuous evolution and deepening understanding.",
      "Born in 1955, Andrew's spiritual quest began in earnest during his teenage years. His first profound spiritual experience occurred at the age of 16, setting him on a path that would lead to encounters with some of the most revered spiritual teachers of our time.",
      "In 1986, after years of intensive spiritual practice and study, Andrew experienced a profound awakening that transformed his understanding of reality. This moment marked the beginning of his role as a spiritual teacher and the founder of what would become a global spiritual community.",
      "Throughout his life, Andrew has emphasized the importance of both personal transformation and collective evolution. His teachings focus on the possibility of transcending the ego and experiencing the deeper dimensions of consciousness that lie beyond our ordinary sense of self.",
      "Today, Andrew continues to share his insights and guide others on their own spiritual journeys, offering a unique perspective that bridges ancient wisdom with contemporary understanding."
    ]
  },
  teachings: {
    title: "Teachings",
    subtitle: "The Path to Enlightenment",
    content: [
      "Andrew Cohen's teachings represent a synthesis of ancient spiritual wisdom and contemporary understanding, offering a clear and practical path for those seeking genuine spiritual transformation.",
      "At the heart of his teaching is the recognition that true spiritual awakening requires more than just intellectual understanding or emotional experiences. It demands a fundamental shift in how we relate to ourselves and the world around us.",
      "The core of Andrew's approach involves learning to recognize and transcend the ego - that part of ourselves that creates separation, conflict, and suffering. This is not about suppressing or denying our humanity, but rather about seeing through the illusions that keep us trapped in limited ways of being.",
      "Andrew emphasizes the importance of both individual practice and collective evolution. He teaches that personal transformation and the transformation of human culture are inseparable aspects of the same evolutionary process.",
      "His methods include meditation, self-inquiry, and what he calls 'conscious evolution' - actively participating in the process of human development rather than passively waiting for change to happen.",
      "Throughout his teachings, Andrew maintains that enlightenment is not a distant goal but a present possibility, accessible to anyone who is willing to undertake the necessary inner work and surrender to the process of transformation."
    ]
  },
  books: {
    title: "Books",
    subtitle: "Wisdom in Written Form",
    content: [
      "Andrew Cohen has authored several books that capture the essence of his spiritual teachings and insights, offering readers a deeper understanding of the path to awakening.",
      "His first book, 'EnlightenNext: The Magazine for Evolutionaries,' established him as a leading voice in the emerging field of evolutionary spirituality. This work explores the intersection of spiritual awakening and human evolution.",
      "In 'Living Enlightenment,' Andrew shares his personal journey and the profound realizations that have shaped his understanding of spiritual life. This book serves as both a memoir and a guide for those on their own spiritual path.",
      "'The Future of Awakening' presents Andrew's vision of how spiritual enlightenment can contribute to the evolution of human consciousness and culture. It addresses the question of what enlightenment means in the context of our rapidly changing world.",
      "His most recent work, 'Evolutionary Enlightenment,' represents the culmination of decades of teaching and practice. This book offers a comprehensive framework for understanding spiritual awakening as an evolutionary process.",
      "Each of Andrew's books reflects his commitment to making profound spiritual wisdom accessible and relevant to contemporary seekers, while maintaining the depth and authenticity that characterize genuine spiritual teaching."
    ]
  },
  archive: {
    title: "Archive",
    subtitle: "A Collection of Wisdom",
    content: [
      "The Archive contains a comprehensive collection of Andrew Cohen's teachings, lectures, and insights spanning over three decades of spiritual work and discovery.",
      "This extensive collection includes audio recordings of live teachings, transcribed lectures, and written materials that capture the evolution of Andrew's understanding and approach to spiritual awakening.",
      "The Archive serves as a valuable resource for both long-time students and newcomers to Andrew's work, offering access to teachings that might otherwise be lost or forgotten.",
      "Organized chronologically and thematically, the Archive allows visitors to explore specific topics or follow the development of particular themes throughout Andrew's teaching career.",
      "Many of the materials in the Archive are available for free, reflecting Andrew's commitment to making spiritual wisdom accessible to all who seek it.",
      "The Archive continues to grow as new teachings and insights are added, ensuring that this valuable collection of spiritual wisdom remains current and relevant for future generations of seekers."
    ]
  },
  engage: {
    title: "Engage",
    subtitle: "Join the Community",
    content: [
      "Engage offers multiple ways to connect with Andrew Cohen's teachings and become part of a global community of spiritual seekers and practitioners.",
      "Through our online platform, you can participate in live teachings, join discussion groups, and connect with others who are committed to their own spiritual development and the evolution of human consciousness.",
      "We offer regular meditation sessions, both in-person and online, where you can practice alongside others and receive guidance from experienced teachers.",
      "Our community events provide opportunities to meet fellow practitioners, share experiences, and deepen your understanding of the spiritual path.",
      "For those seeking more intensive engagement, we offer retreats and workshops that provide focused time for practice, study, and transformation.",
      "Whether you're new to spiritual practice or have been on the path for years, there are multiple levels of engagement available to support your journey and help you connect with others who share your aspirations."
    ]
  },
  donate: {
    title: "Donate",
    subtitle: "Support Our Mission",
    content: [
      "Your generous support helps us continue our mission of making spiritual wisdom accessible to all who seek it, regardless of their financial circumstances.",
      "Donations directly support our ability to offer free teachings, maintain our online platform, and provide resources to those who might not otherwise have access to spiritual guidance.",
      "We are committed to transparency in how your donations are used. All funds go directly toward supporting our teaching activities, maintaining our digital infrastructure, and expanding our reach to serve more seekers worldwide.",
      "Your contribution, no matter the size, makes a meaningful difference in our ability to serve the global spiritual community and contribute to the evolution of human consciousness.",
      "We offer multiple ways to give, including one-time donations, monthly recurring contributions, and legacy giving options for those who wish to make a lasting impact.",
      "Thank you for considering how you can support our work. Together, we can help create a world where spiritual wisdom is accessible to all and where the possibility of genuine transformation is available to everyone who seeks it."
    ]
  }
};

export function NavigationModal({ isOpen, onClose, pageSlug }: NavigationModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const pageContent = pageContents[pageSlug];

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Use requestAnimationFrame for smoother animation timing
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Separate effect for URL navigation to avoid interfering with animation
  useEffect(() => {
    if (isOpen && pageSlug && pageSlug !== '') {
      // Update URL when modal opens
      navigate(`/${pageSlug}`, { replace: true });
    }
  }, [isOpen, pageSlug, navigate]);

  // Separate effect for URL restoration when closing
  useEffect(() => {
    if (!isOpen && location.pathname !== '/' && !location.pathname.includes('/track/')) {
      // Restore previous URL when modal closes
      navigate('/', { replace: true });
    }
  }, [isOpen, location.pathname, navigate]);

  if (!shouldRender) return null;
  if (!pageContent) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className={`w-full max-w-4xl h-full max-h-[90vh] glass-morphism rounded-lg border border-white/10 overflow-hidden transition-all duration-300 ease-out pointer-events-auto ${
            isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex flex-col">
              <h1 className="text-3xl font-light text-white font-cinzel">{pageContent.title}</h1>
              <span className="text-lg text-white/80">{pageContent.subtitle}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="p-6 overflow-y-auto h-[calc(100%-88px)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30 scrollbar-thumb-rounded">
            <div className="space-y-6">
              {pageContent.content.map((paragraph, index) => (
                <p key={index} className="text-white/90 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
