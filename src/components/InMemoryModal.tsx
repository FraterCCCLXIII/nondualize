import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import andrewImage from "@/assets/andrew-1.png";

interface InMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InMemoryModal({ isOpen, onClose }: InMemoryModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

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

  if (!shouldRender) return null;

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
          className={`w-full max-w-6xl h-full max-h-[95vh] glass-morphism rounded-lg border border-white/10 overflow-hidden transition-all duration-300 ease-out pointer-events-auto ${
            isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex flex-col">
              <h1 className="text-4xl font-light text-white font-cinzel">In Memory of Andrew</h1>
              <span className="text-lg text-white/80">A tribute to a spiritual pioneer</span>
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
          <div className="overflow-y-auto h-[calc(100%-88px)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30 scrollbar-thumb-rounded">
            {/* Image */}
            <div className="w-full p-6 pb-4">
              <img
                src={andrewImage}
                alt="Andrew Cohen - A contemplative portrait in black and white"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Text Content */}
            <div className="px-6 pb-6">
              <div className="space-y-6 text-white/90 leading-relaxed text-lg max-w-4xl mx-auto">
                <p>
                  A profound stillness fills many hearts today, a silence that echoes the vastness of Reality — a Mystery Andrew Cohen so passionately explored and illuminated. With his passing on March 25th, 2025, in the serene embrace of the holy place of Tiruvannamalai, India, the spiritual landscape has lost one of its most dynamic, challenging, and ultimately transformative figures. Andrew Cohen was not merely a teacher; he was a catalytic force, a spiritual innovator who ignited a global quest for a deeper, more integrated understanding of consciousness and our potential within the unfolding universe.
                </p>

                <p>
                  Born into a secular world in New York City on October 23 in 1955, Andrew's life took an extraordinary turn at the age of sixteen with a spontaneous awakening to "cosmic consciousness." This profound, unbidden experience — an ecstatic recognition that the ultimate nature of Reality is timeless, limitless Oneness and Absolute Love — became the unwavering compass guiding his subsequent journey. It was a direct encounter with the interconnectedness of all things, a glimpse into the infinite that would fuel his relentless pursuit of truth and, later, his passionate commitment to sharing that truth with others.
                </p>

                <p>
                  For decades, Andrew traversed the globe. His powerful presence and articulate wisdom captivated audiences from all walks of life. He possessed a rare gift: the ability to articulate the most profound spiritual insights with a clarity and intellectual rigor that resonated deeply with the modern mind. He fearlessly challenged conventional spiritual paradigms, urging his students and readers to move beyond the comfort of established doctrines and embrace a more dynamic, world-embracing understanding of enlightenment.
                </p>

                <p>
                  His pivotal encounter with the revered Sri H.W.L. Poonja in 1986 served as a powerful accelerant on his spiritual path, igniting a further, life-altering awakening to the timeless, formless Ground of All Being. Yet, Andrew was never one to simply replicate the teachings of his predecessors. He possessed an independent spirit, a fierce intellectual curiosity, and an unyielding drive to forge a new path, one that spoke directly to the unique challenges and opportunities of our contemporary world.
                </p>

                <p>
                  This led to the birth of "Evolutionary Enlightenment," Andrew's contribution to the perennial wisdom tradition of spiritual awakening. It was not a mere rehashing of ancient truths but a bold and innovative synthesis that integrated the timeless insights of mystical nonduality with a deep understanding of cosmic, biological, and cultural evolution. He envisioned enlightenment not only as an individual attainment of transcendent Being beyond space and time, but also as an ongoing, dynamic process of awakening to our inherent connection to the evolutionary impulse — the energy and intelligence that initiated the creative process of universal Becoming, and continues to drive it.
                </p>

                <p>
                  Andrew's teachings emphasized the crucial distinction between the ego, with its ingrained need for separation and superiority, and the "Authentic Self," the radiant expression of our interconnectedness and our potential for conscious participation in the unfolding of reality. He continually advocated for taking "a deep and heroic responsibility for the evolution of the world," urging individuals to recognize that their own spiritual transformation is inextricably linked to the collective awakening of humanity.
                </p>

                <p>
                  One of Andrew's signature contributions in this regard is the creation of thriving collaborative "we-spaces" between people. Together with his community, he pioneered the subtle art of coming together, grounded in transcendent consciousness, and communicating with one another beyond ego and the games of positioning and competition it plays — a practice he called "intersubjective nonduality." His insights about how we can create truly generative we-spaces in which the co-creative power of our shared collective intelligence is unleashed, and surprising new insights can emerge, far exceeding what anyone could have come up with separately, are groundbreaking and original. This remains a subject that is very relevant today, as it is becoming increasingly clear that communication beyond ego is one of the key skills we now need most, if we aspire to initiate actual positive change in this world in crisis.
                </p>

                <p>
                  Through his seminal books, including Enlightenment Is a Secret (1991), Embracing Heaven & Earth (2000), Living Enlightenment (2002), Evolutionary Enlightenment (2011), and When Shadow Meets the Bodhisattva (2023), Andrew offered a potent roadmap for the evolutionary journey. His words were not mere intellectual constructs; they were imbued with the transformative power of his own direct experience, igniting a spark of recognition in the hearts and minds of countless seekers.
                </p>

                <p>
                  His Folio Award–winning EnlightenNext magazine, formerly What Is Enlightenment?, served as another vital platform for his vision. For nearly two decades, it fearlessly explored the most profound existential questions of our time, featuring dialogues with leading thinkers, religious leaders, scientists, and cultural innovators. It became a beacon for those seeking a deeper understanding of the human condition and the possibilities for the radical transformation of culture.
                </p>

                <p>
                  Beyond his writings, Andrew's impact was profoundly felt through the global spiritual community he founded and led, from the early years of his teaching work until 2013, known as EnlightenNext. This was not just a gathering of like-minded individuals, it was an international crucible for intense spiritual practice, a laboratory for exploring the practical implications of Evolutionary Enlightenment in the context of committed relationships and collective endeavor. He fostered an environment of rigorous self-inquiry, encouraging his students to confront their deepest limitations, embrace the transformative power of truth, and reach for authentic self-actualization, no matter how challenging.
                </p>

                <p>
                  Andrew's life was not without its complexities and controversies. As a young, passionate teacher in his early thirties, Andrew inspired many to take the ultimate risk of giving everything — their lives, their hearts, their souls — to the spiritual ideal of "creating heaven on earth." This generated a powerful training ground for radical inner transformation, refreshing innovation, clarity of understanding, intimate fellowship, and deep guru devotion, resulting in both breakthroughs and breakdowns. Though a radical spiritual experiment, over time it became vulnerable to the pitfalls of Andrew's personal shadows and the assumptions of the "perfection" of the guru, held by both Andrew himself and his students. 
                </p>

                <p>
                  An intense teacher, he was deeply committed to the evolutionary imperative, but his at times excessively harsh demands led to friction and disillusionment for many who walked his steep, ascending path. These tensions ultimately culminated in the dispersion of his EnlightenNext community in 2013.
                </p>

                <p>
                  During the final decade of his life, with courage and humility, Andrew engaged in deep introspection, resulting in profound reflections on his own journey, the challenges inherent in the guru/disciple relationship, and the evolving nature of spiritual leadership in the modern world.
                </p>

                <p>
                  In 2019, Andrew founded Manifest Nirvana, an innovative online spiritual community dedicated to intersubjective awakening and collective evolution. Through this platform, he conducted regular teachings, dialogues, and retreats, passionately exploring new dimensions of awakened consciousness and evolutionary spirituality.
                </p>

                <p>
                  Andrew's teaching style significantly changed during these years, from one of closely directing people's personal lives, to encouraging students to independently apply the teachings in their own lives. His work continued to emphasize Liberation as the foundation for a purposeful life. At the same time, he encouraged a spirit of collaboration, dialogue, and collective insight. Andrew guided his students until the very end, inspiring many through his openness, authenticity, and commitment to spiritual growth in community.
                </p>

                <p>
                  Amid all the complexity, Andrew's legacy ultimately lies in his relentless pursuit of truth, his commitment to the potential for human evolution, and the profound impact he had on the lives of countless individuals who were touched by his wisdom and fierce passion. He challenged us to step beyond the limitations of our individual egos, and to embrace our role as conscious participants in the grand unfolding of the cosmos. He called us to a spirituality that was not about escaping the world, but about fully engaging with it, with an awakened heart and a deep sense of responsibility for its future.
                </p>

                <p>
                  In a profound and mysterious synchronicity, Andrew left this world exactly 39 years to the day of his sudden enlightenment upon meeting his own Guru, Sri Poonja — a date his students celebrate annually as "Freedom Has No History" day. It was the day his life was forever changed, the beginning of a spiritual transmission that would ripple out to touch thousands.
                </p>

                <p>
                  Today, as we mourn his passing, we also celebrate the extraordinary life of Andrew Cohen — a spiritual pioneer, fearless truth-seeker, and visionary guide who illumined the path towards a more soulful, awakened, and evolved humanity. He was, as the great Swami Chidananda once described him, "a modern Western mystic who shines like a light in darkness." His teachings will continue to resonate, his books will continue to inspire, and the seeds of evolutionary consciousness he planted will continue to blossom in the hearts and minds of those who dare to embrace the heroic journey of awakening.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
