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
  content: Array<string | { header: string; text: string }>;
  actions?: Array<{ label: string; url: string; external?: boolean }>;
}

const pageContents: Record<string, PageContent> = {
  life: {
    title: "Life",
    subtitle: "The Journey of Awakening",
    content: [
      {
        header: "Early Life and Awakening",
        text: "Andrew Cohen was born on October 23, 1955, into a secular Jewish family in New York City. His life took an extraordinary turn at the age of sixteen when he experienced a spontaneous revelation of cosmic consciousness—an unbidden awakening to what he would later describe as the ultimate nature of Reality: timeless, limitless Oneness and Absolute Love. This profound experience became the unwavering compass that would guide his entire spiritual journey and eventual mission as a teacher."
      },
      {
        header: "The Meeting with Poonja",
        text: "In 1986, at the age of thirty-one, Andrew's spiritual path was dramatically accelerated through a fateful encounter with the revered Indian master Sri H.W.L. Poonja. This meeting sparked a life-altering awakening to what he called the \"timeless, formless Ground of All Being.\" However, rather than simply adopting traditional Eastern teachings, Andrew's independent spirit and fierce intellectual curiosity drove him to forge an entirely new path that would speak directly to the challenges and opportunities of the contemporary world."
      },
      {
        header: "Evolutionary Enlightenment",
        text: "From this foundation emerged Andrew's revolutionary contribution to spiritual understanding: Evolutionary Enlightenment. This teaching represented a bold departure from traditional approaches that emphasized transcendence of the world. Instead, Andrew called for \"a deep and heroic responsibility toward its evolution.\" His philosophy integrated the timeless insights of mystical nonduality with a sophisticated understanding of cosmic, biological, and cultural evolution.\n\nAt the heart of his teaching was the crucial distinction between the ego—with its ingrained need for separation and superiority—and what he termed the \"Authentic Self,\" the radiant expression of our interconnectedness and potential for conscious participation in reality's unfolding. Andrew envisioned enlightenment not merely as individual transcendence, but as an ongoing, dynamic process of awakening to our inherent connection to the evolutionary impulse itself."
      },
      {
        header: "Innovation in Spiritual Community",
        text: "One of Andrew's most significant contributions was his pioneering work in creating what he called \"intersubjective nonduality\"—the art of coming together in transcendent consciousness and communicating beyond the ego's games of positioning and competition. He developed thriving collaborative \"we-spaces\" where the co-creative power of shared collective intelligence could be unleashed, generating insights that far exceeded what individuals could achieve separately. This work proved remarkably prescient, addressing what many now recognize as one of the key skills needed for positive change in our crisis-ridden world."
      },
      {
        header: "Literary and Media Contributions",
        text: "Andrew's vision found expression through several seminal works, including *Enlightenment Is a Secret* (1991), *Embracing Heaven & Earth* (2000), *Living Enlightenment* (2002), *Evolutionary Enlightenment* (2011), and *When Shadow Meets the Bodhisattva* (2023). His words carried the transformative power of direct experience, igniting recognition in countless seekers worldwide.\n\nFrom 1991 to 2010, Andrew served as editor-in-chief of the Folio Award-winning EnlightenNext magazine (formerly *What Is Enlightenment?*). For nearly two decades, this publication fearlessly explored profound existential questions through dialogues with leading thinkers, religious leaders, scientists, and cultural innovators, becoming a beacon for those seeking deeper understanding of human potential and cultural transformation."
      },
      {
        header: "The EnlightenNext Community",
        text: "Andrew's teachings found their most intensive expression through the global spiritual community he founded and led from his early teaching years until 2013, known as EnlightenNext. This international network, with centers established in seven countries, served as both a crucible for intense spiritual practice and a laboratory for exploring the practical implications of Evolutionary Enlightenment within committed relationships and collective endeavor.\n\nThe community fostered an environment of rigorous self-inquiry, encouraging students to confront their deepest limitations and embrace the transformative power of truth. As a young, passionate teacher, Andrew inspired many to take the ultimate risk of giving everything to the spiritual ideal of \"creating heaven on earth.\""
      },
      {
        header: "Challenges and Transformation",
        text: "Andrew's journey was not without its complexities and controversies. His intense commitment to the evolutionary imperative sometimes manifested as excessively harsh demands, leading to friction and disillusionment for many on his steep, ascending path. The community became vulnerable to pitfalls arising from Andrew's personal shadows and assumptions about the \"perfection\" of the guru—assumptions held by both teacher and students. These tensions ultimately culminated in the dispersion of the EnlightenNext community in 2013."
      },
      {
        header: "Later Years and Renewed Teaching",
        text: "Following the community's dissolution, Andrew embarked on a period of sabbatical and deep introspection. With courage and humility, he engaged in profound self-reflection, examining his own journey, the challenges inherent in the guru-disciple relationship, and the evolving nature of spiritual leadership in the modern world. He returned to public teaching at the end of 2016, bringing a significantly transformed approach.\n\nIn 2019, Andrew founded Manifest Nirvana, an innovative online spiritual community dedicated to intersubjective awakening and collective evolution. Through this platform, he conducted regular teachings, dialogues, and retreats, exploring new dimensions of awakened consciousness and evolutionary spirituality. His teaching style evolved from closely directing students' personal lives to encouraging independent application of the teachings, while maintaining his emphasis on Liberation as the foundation for purposeful living and fostering a spirit of collaboration and collective insight."
      },
      {
        header: "Death and Legacy",
        text: "In a profound and mysterious synchronicity, Andrew Cohen passed away on March 25, 2025, in the sacred town of Tiruvannamalai, India—exactly thirty-nine years to the day after his life-changing enlightenment upon meeting Sri Poonja. This date, which his students had long celebrated annually as \"Freedom Has No History\" day, marked both the beginning and end of a spiritual transmission that touched thousands of lives worldwide.\n\nAndrew Cohen's legacy lies in his relentless pursuit of truth, his unwavering commitment to human evolutionary potential, and his profound impact on countless individuals worldwide. He challenged seekers to transcend individual ego limitations and embrace their role as conscious participants in the cosmos's grand unfolding. His vision called for a spirituality not of worldly escape, but of full engagement with awakened hearts and deep responsibility for the future.\n\nAs the great Swami Chidananda once described him, Andrew was \"a modern Western mystic who shines like a light in darkness.\" His teachings continue to resonate, his books inspire new generations, and the seeds of evolutionary consciousness he planted continue to blossom in the hearts and minds of those who dare to embrace the heroic journey of awakening. Through his life's work, he illuminated a path toward a more soulful, awakened, and evolved humanity."
      }
    ]
  },
  teachings: {
    title: "Teachings",
    subtitle: "The Path to Enlightenment",
    content: [
      "If you want to learn more about Andrew Cohen's teachings and continue your spiritual journey, visit Manifest Nirvana to explore his comprehensive body of work and ongoing spiritual community."
    ],
    actions: [
      {
        label: "Visit Manifest Nirvana",
        url: "https://manifest-nirvana.com",
        external: true
      }
    ]
  },
  books: {
    title: "Books",
    subtitle: "Wisdom in Written Form",
    content: [
      "Andrew Cohen has authored several books that capture the essence of his spiritual teachings and insights, offering readers a deeper understanding of the path to awakening.",
      "Each of Andrew's books reflects his commitment to making profound spiritual wisdom accessible and relevant to contemporary seekers, while maintaining the depth and authenticity that characterize genuine spiritual teaching.",
      "A complete bibliography of Andrew's published works will be added to this page soon. In the meantime, you can order Andrew's books directly from Amazon."
    ],
    actions: [
      {
        label: "Order on Amazon",
        url: "https://www.amazon.com/stores/Andrew-Cohen/author/B0B42SGN8D?ccs_id=af34a33e-fe9d-4f6c-b5dc-ecc1db62463d",
        external: true
      }
    ]
  },
  archive: {
    title: "Archive",
    subtitle: "A Collection of Wisdom",
    content: [
      "We are working on an ongoing project of digitizing an archive of Andrew's work that is being preserved in San Diego, CA. This comprehensive collection includes teachings, lectures, and insights spanning over three decades of spiritual work and discovery."
    ]
  },
  engage: {
    title: "Engage",
    subtitle: "Join the Community",
    content: [
      "To engage more with Andrew's teachings and community of students, visit Manifest Nirvana to learn more about ongoing spiritual practices, retreats, and community events."
    ],
    actions: [
      {
        label: "Visit Manifest Nirvana",
        url: "https://manifest-nirvana.com",
        external: true
      }
    ]
  },
  "in-memory": {
    title: "In Memory of Andrew",
    subtitle: "A Tribute to His Legacy",
    content: [
      "Andrew Cohen passed away on March 25, 2025, in the sacred town of Tiruvannamalai, India—exactly thirty-nine years to the day after his life-changing enlightenment upon meeting Sri H.W.L. Poonja.",
      "His legacy lies in his relentless pursuit of truth, his unwavering commitment to human evolutionary potential, and his profound impact on countless individuals worldwide. He challenged seekers to transcend individual ego limitations and embrace their role as conscious participants in the cosmos's grand unfolding.",
      "As the great Swami Chidananda once described him, Andrew was \"a modern Western mystic who shines like a light in darkness.\" His teachings continue to resonate, his books inspire new generations, and the seeds of evolutionary consciousness he planted continue to blossom in the hearts and minds of those who dare to embrace the heroic journey of awakening.",
      "Through his life's work, he illuminated a path toward a more soulful, awakened, and evolved humanity."
    ]
  }
  // donate: {
  //   title: "Donate",
  //   subtitle: "Support Our Mission",
  //   content: [
  //     "Your generous support helps us continue our mission of making spiritual wisdom accessible to all who seek it, regardless of their financial circumstances.",
  //     "Donations directly support our ability to offer free teachings, maintain our online platform, and provide resources to those who might not otherwise have access to spiritual guidance.",
  //     "We are committed to transparency in how your donations are used. All funds go directly toward supporting our ability to offer free teachings, maintain our digital infrastructure, and expanding our reach to serve more seekers worldwide.",
  //     "Your contribution, no matter the size, makes a meaningful difference in our ability to serve the global spiritual community and contribute to the evolution of human consciousness.",
  //     "We offer multiple ways to give, including one-time donations, monthly recurring contributions, and legacy giving options for those who wish to make a lasting impact.",
  //     "Thank you for considering how you can support our work. Together, we can help create a lasting impact.",
  //     "Thank you for considering how you can support our work. Together, we can help create a world where spiritual wisdom is accessible to all and where the possibility of genuine transformation is available to everyone who seeks it."
  //   ]
  // }
};

export function NavigationModal({ isOpen, onClose, pageSlug }: NavigationModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const pageContent = pageContents[pageSlug];

  // Stable animation logic to prevent flickering
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Use a small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // URL navigation effect
  useEffect(() => {
    if (isOpen && pageSlug && pageSlug !== '') {
      navigate(`/${pageSlug}`, { replace: true });
    }
  }, [isOpen, pageSlug, navigate]);

  // URL restoration effect
  useEffect(() => {
    if (!isOpen && location.pathname !== '/' && !location.pathname.includes('/track/')) {
      navigate('/', { replace: true });
    }
  }, [isOpen, location.pathname, navigate]);

  if (!shouldRender) return null;
  if (!pageContent) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-45 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className={`w-full max-w-4xl h-full max-h-[90vh] glass-morphism rounded-lg border border-white/10 overflow-hidden transition-all duration-300 ease-out pointer-events-auto will-change-transform transform-gpu ${
            isAnimating ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
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
              {pageContent.content.map((item, index) => {
                if (typeof item === 'string') {
                  return (
                    <p key={index} className="text-white/90 leading-relaxed text-lg">
                      {item}
                    </p>
                  );
                } else {
                  return (
                    <div key={index} className="space-y-3">
                      <h2 className="text-2xl font-semibold text-white font-cinzel">
                        {item.header}
                      </h2>
                      <p className="text-white/90 leading-relaxed text-lg">
                        {item.text}
                      </p>
                    </div>
                  );
                }
              })}
              
              {/* Actions */}
              {pageContent.actions && pageContent.actions.length > 0 && (
                <div className="pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-3">
                    {pageContent.actions.map((action, index) => (
                      <a
                        key={index}
                        href={action.url}
                        target={action.external ? "_blank" : undefined}
                        rel={action.external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors duration-200 hover:scale-105 transform"
                      >
                        {action.label}
                        {action.external && (
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
