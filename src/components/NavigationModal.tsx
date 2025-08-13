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
  sections: Array<{
    header: string;
    content: string[];
  }>;
}

const pageContents: Record<string, PageContent> = {
  life: {
    title: "Life",
    subtitle: "The journey of awakening and transformation",
    sections: [
      {
        header: "Early Life and Awakening",
        content: [
          "Andrew Cohen was born on October 23, 1955, into a secular Jewish family in New York City. His life took an extraordinary turn at the age of sixteen when he experienced a spontaneous revelation of cosmic consciousness—an unbidden awakening to what he would later describe as the ultimate nature of Reality: timeless, limitless Oneness and Absolute Love. This profound experience became the unwavering compass that would guide his entire spiritual journey and eventual mission as a teacher."
        ]
      },
      {
        header: "The Meeting with Poonja",
        content: [
          "In 1986, at the age of thirty-one, Andrew's spiritual path was dramatically accelerated through a fateful encounter with the revered Indian master Sri H.W.L. Poonja. This meeting sparked a life-altering awakening to what he called the 'timeless, formless Ground of All Being.' However, rather than simply adopting traditional Eastern teachings, Andrew's independent spirit and fierce intellectual curiosity drove him to forge an entirely new path that would speak directly to the challenges and opportunities of the contemporary world."
        ]
      },
      {
        header: "Evolutionary Enlightenment",
        content: [
          "From this foundation emerged Andrew's revolutionary contribution to spiritual understanding: Evolutionary Enlightenment. This teaching represented a bold departure from traditional approaches that emphasized transcendence of the world. Instead, Andrew called for 'a deep and heroic responsibility toward its evolution.' His philosophy integrated the timeless insights of mystical nonduality with a sophisticated understanding of cosmic, biological, and cultural evolution.",
          "At the heart of his teaching was the crucial distinction between the ego—with its ingrained need for separation and superiority—and what he termed the 'Authentic Self,' the radiant expression of our interconnectedness and potential for conscious participation in reality's unfolding. Andrew envisioned enlightenment not merely as individual transcendence, but as an ongoing, dynamic process of awakening to our inherent connection to the evolutionary impulse itself."
        ]
      },
      {
        header: "Innovation in Spiritual Community",
        content: [
          "One of Andrew's most significant contributions was his pioneering work in creating what he called 'intersubjective nonduality'—the art of coming together in transcendent consciousness and communicating beyond the ego's games of positioning and competition. He developed thriving collaborative 'we-spaces' where the co-creative power of shared collective intelligence could be unleashed, generating insights that far exceeded what individuals could achieve separately. This work proved remarkably prescient, addressing what many now recognize as one of the key skills needed for positive change in our crisis-ridden world."
        ]
      },
      {
        header: "Literary and Media Contributions",
        content: [
          "Andrew's vision found expression through several seminal works, including Enlightenment Is a Secret (1991), Embracing Heaven & Earth (2000), Living Enlightenment (2002), Evolutionary Enlightenment (2011), and When Shadow Meets the Bodhisattva (2023). His words carried the transformative power of direct experience, igniting recognition in countless seekers worldwide.",
          "From 1991 to 2010, Andrew served as editor-in-chief of the Folio Award-winning EnlightenNext magazine (formerly What Is Enlightenment?). For nearly two decades, this publication fearlessly explored profound existential questions through dialogues with leading thinkers, religious leaders, scientists, and cultural innovators, becoming a beacon for those seeking deeper understanding of human potential and cultural transformation."
        ]
      },
      {
        header: "The EnlightenNext Community",
        content: [
          "Andrew's teachings found their most intensive expression through the global spiritual community he founded and led from his early teaching years until 2013, known as EnlightenNext. This international network, with centers established in seven countries, served as both a crucible for intense spiritual practice and a laboratory for exploring the practical implications of Evolutionary Enlightenment within committed relationships and collective endeavor.",
          "The community fostered an environment of rigorous self-inquiry, encouraging students to confront their deepest limitations and embrace the transformative power of truth. As a young, passionate teacher, Andrew inspired many to take the ultimate risk of giving everything to the spiritual ideal of 'creating heaven on earth.'"
        ]
      },
      {
        header: "Challenges and Transformation",
        content: [
          "Andrew's journey was not without its complexities and controversies. His intense commitment to the evolutionary imperative sometimes manifested as excessively harsh demands, leading to friction and disillusionment for many on his steep, ascending path. The community became vulnerable to pitfalls arising from Andrew's personal shadows and assumptions about the 'perfection' of the guru—assumptions held by both teacher and students. These tensions ultimately culminated in the dispersion of the EnlightenNext community in 2013."
        ]
      },
      {
        header: "Later Years and Renewed Teaching",
        content: [
          "Following the community's dissolution, Andrew embarked on a period of sabbatical and deep introspection. With courage and humility, he engaged in profound self-reflection, examining his own journey, the challenges inherent in the guru-disciple relationship, and the evolving nature of spiritual leadership in the modern world. He returned to public teaching at the end of 2016, bringing a significantly transformed approach.",
          "In 2019, Andrew founded Manifest Nirvana, an innovative online spiritual community dedicated to intersubjective awakening and collective evolution. Through this platform, he conducted regular teachings, dialogues, and retreats, exploring new dimensions of awakened consciousness and evolutionary spirituality. His teaching style evolved from closely directing students' personal lives to encouraging independent application of the teachings, while maintaining his emphasis on Liberation as the foundation for purposeful living and fostering a spirit of collaboration and collective insight."
        ]
      },
      {
        header: "Death and Legacy",
        content: [
          "In a profound and mysterious synchronicity, Andrew Cohen passed away on March 25, 2025, in the sacred town of Tiruvannamalai, India—exactly thirty-nine years to the day after his life-changing enlightenment upon meeting Sri Poonja. This date, which his students had long celebrated annually as 'Freedom Has No History' day, marked both the beginning and end of a spiritual transmission that touched thousands of lives worldwide.",
          "Andrew Cohen's legacy lies in his relentless pursuit of truth, his unwavering commitment to human evolutionary potential, and his profound impact on countless individuals worldwide. He challenged seekers to transcend individual ego limitations and embrace their role as conscious participants in the cosmos's grand unfolding. His vision called for a spirituality not of worldly escape, but of full engagement with awakened hearts and deep responsibility for the future.",
          "As the great Swami Chidananda once described him, Andrew was 'a modern Western mystic who shines like a light in darkness.' His teachings continue to resonate, his books inspire new generations, and the seeds of evolutionary consciousness he planted continue to blossom in the hearts and minds of those who dare to embrace the heroic journey of awakening. Through his life's work, he illuminated a path toward a more soulful, awakened, and evolved humanity."
        ]
      }
    ]
  },
  teachings: {
    title: "Teachings",
    subtitle: "Core principles and insights for spiritual evolution",
    sections: [
      {
        header: "Core Principles",
        content: [
          "Andrew Cohen's teachings are grounded in the recognition that we are living in a unique moment in human history - a time when the possibility of conscious evolution is available to everyone who is ready to embrace it.",
          "At the heart of his message is the understanding that spiritual awakening is not an end in itself, but the beginning of a new way of being in the world. It's about recognizing that we are not separate individuals, but expressions of the one consciousness that is the ground of all being."
        ]
      },
      {
        header: "Evolutionary Spirituality",
        content: [
          "His teachings emphasize the importance of both transcendence and engagement - the need to go beyond the ego while remaining fully present in the world. This is what he calls 'evolutionary spirituality' - a path that honors both the absolute and the relative dimensions of reality.",
          "Through his guidance, students learn to recognize the patterns of ego that keep them trapped in limitation and discover the freedom that comes from living from a deeper place of awareness and authenticity."
        ]
      }
    ]
  },
  books: {
    title: "Books",
    subtitle: "Written works exploring consciousness and evolution",
    sections: [
      {
        header: "Published Works",
        content: [
          "Andrew Cohen has authored several books that explore the nature of consciousness, spiritual evolution, and the possibility of radical transformation. His writings offer both theoretical understanding and practical guidance for those on the spiritual path.",
          "In his works, he addresses the fundamental questions that arise in spiritual practice: What is the nature of consciousness? How do we transcend the limitations of the ego? What does it mean to live an awakened life in the modern world?"
        ]
      },
      {
        header: "Impact and Legacy",
        content: [
          "His books are known for their clarity, depth, and practical wisdom. They serve as both roadmaps for spiritual seekers and invitations to explore the deeper dimensions of human experience.",
          "Through his writing, Andrew continues to reach people around the world, offering them the possibility of discovering their own potential for spiritual awakening and evolution."
        ]
      }
    ]
  },
  archive: {
    title: "Archive",
    subtitle: "Historical teachings and recorded wisdom",
    sections: [
      {
        header: "Collection Overview",
        content: [
          "The archive contains a comprehensive collection of Andrew Cohen's teachings, recordings, and insights gathered over decades of spiritual work. This treasure trove of wisdom represents the evolution of his understanding and the depth of his spiritual realization.",
          "Here you'll find early teachings that reveal the foundations of his approach, as well as more recent insights that reflect the ongoing development of his understanding. The archive serves as a living record of one man's journey toward enlightenment and his efforts to share that realization with others."
        ]
      },
      {
        header: "Access and Organization",
        content: [
          "Each piece in the archive offers a unique perspective on the spiritual path, providing both inspiration and practical guidance for contemporary seekers. The materials are organized to help visitors find exactly what they need for their own spiritual development.",
          "This archive is not just a collection of historical documents, but a living resource that continues to inspire and guide spiritual seekers in their own journeys of awakening and transformation."
        ]
      }
    ]
  },
  engage: {
    title: "Engage",
    subtitle: "Ways to connect and participate in the community",
    sections: [
      {
        header: "Community Participation",
        content: [
          "Engagement with Andrew Cohen's teachings and community takes many forms, from individual study and practice to group participation and collective inquiry. There are numerous ways to connect with this transformative work and become part of a community dedicated to spiritual evolution.",
          "Regular events, retreats, and gatherings provide opportunities for direct interaction with the teachings and with others who are on similar spiritual paths. These gatherings are designed to create the conditions for deep inquiry and authentic connection."
        ]
      },
      {
        header: "Digital and In-Person",
        content: [
          "Online resources, discussion forums, and virtual events make it possible to engage with the community regardless of geographical location. Technology has made it easier than ever to connect with like-minded seekers and access the wisdom of the teachings.",
          "Whether you're new to spiritual practice or have been on the path for years, there are ways to engage that will support your own journey of awakening and help you contribute to the collective evolution of consciousness."
        ]
      }
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
              {pageContent.sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h2 className="text-2xl font-semibold text-white/90 mb-4">{section.header}</h2>
                  <div className="space-y-4">
                    {section.content.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="text-white/90 leading-relaxed text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Development Notice */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-center space-y-4">
                  <p className="text-white/70 text-sm leading-relaxed">
                    This site is in development, more content is being added. To learn more about Andrew Cohen and his teachings visit Manifest Nirvana.
                  </p>
                  <Button
                    asChild
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-200"
                  >
                    <a 
                      href="https://manifest-nirvana.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      Visit Manifest Nirvana
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                        />
                      </svg>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
