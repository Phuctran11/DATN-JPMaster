import { useState } from 'react';
import { Header, Footer, Card } from '../components';
import { Heading, Text } from '../components/ui/Typography';
import { BlogCard } from '../components/cards';

interface CommentProps {
  name: string;
  date: string;
  quote: string;
  initials: string;
  bgColor: string;
}

function Comment({ name, date, quote, initials, bgColor }: CommentProps) {
  return (
    <div className="flex gap-4">
      <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0`}>
        <span className="text-on-primary-fixed font-bold text-sm">{initials}</span>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-headline-sm text-label-md text-on-surface">{name}</h4>
          <span className="text-label-md text-outline">{date}</span>
        </div>
        <p className="text-body-md text-on-surface-variant">{quote}</p>
      </div>
    </div>
  );
}

export default function BlogDetail() {
  const [comment, setComment] = useState('');

  const blogPost = {
    title: 'Mastering Kanji: The Art of Focus',
    category: 'ACADEMIC INSIGHTS',
    author: 'Dr. Hiroshi Tanaka',
    date: 'October 24, 2024',
    readTime: '8 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsWrHlOesV2E-CYJNEHM4GII82cMvCdTo1loLIhvLMSQ2_uvX_KpSCTE859WhhMxZ-i8woA98WORbTWNLivywfi5M1C421KEVTgw0tcFWhjOZBTH2Fx0jutiHSOEC4Bj2caZ6zLNQWPgKV7e3cMTt1ajnELBq9i7NAf-YZSnrLq1LIw9pqqzl-77O7zcnpoDzG9RU8Ym2AfWTaWzff_FbRyOBFXQLUHRGAEPed-D6nVb7ooAjKwM9GAbPb6z_hwEPgGy7HtOoC2DLI',
  };

  const comments = [
    {
      name: 'Aiko Kobayashi',
      date: 'Oct 25, 2024',
      quote:
        'This perspective on radicals changed how I approach my daily N2 studies. Looking at Kanji as architecture makes it much less intimidating!',
      initials: 'AK',
      bgColor: 'bg-primary-fixed',
    },
    {
      name: 'James Dalton',
      date: 'Oct 26, 2024',
      quote:
        "The point about the environment is spot on. I've started doing my Kanji practice at 6 AM before checking any emails, and the retention rate has skyrocketed.",
      initials: 'JD',
      bgColor: 'bg-secondary-fixed',
    },
  ];

  const relatedPosts = [
    {
      title: 'The Hidden History of Katakana',
      category: 'Writing Systems',
      date: 'Oct 23, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQGdFN4vp02dpclltZ4xlEDtbxRPbySU5CcSbbROnHC1NKGp53D63bvfxlyRBZS48nxBlDYIMM7Ynyelt0Yx5FQdOOVBbd6qmxwd5Y8H4YQHl1AdhvNauqELRR00oo4TTh-YZAasL0qtPV87uh7eb9F3w_rfuB0wQI5waeP0zAg_dUCu81_UX2s91HcpAAUgiufuh4QQmGzgR8VhxPZmx6qLHtUUkDtkxsxNzTXmi5v5CObDp6RDd-K3y-VG3kRALEwMYTSOm_9D7J',
      excerpt: 'Uncovering the origins and evolution of the Japanese syllabary.',
      link: '/blog/katakana-history',
    },
    {
      title: 'Effective Mnemonics for JLPT N1',
      category: 'Study Tips',
      date: 'Oct 22, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd3LZUfX2JEWMDRGjQygM1YRMfcZFyWm2gB5XL5bHXo06F5ET4Pj2geLm2a_0EIeDJomJ5Oj4j_aTqauqZFVKO8iW16BklqCd7i1nQP0rIcdHylU-VkSLNOwLyhB2gBCK6XH6CdNFan_sEZJMMWoFAcQf6MnZ8MvlcvJdPRK0nW_pxPsgW_vEWS7dcn-z7OwRG4nGeUn097nAFOOI_SzlSIUFbXvNP9Wd7l5fMGecOaTX3_aT-ot7fWfEDU9_4sR3LxGm-GqU1NkmU',
      excerpt: 'Master advanced memorization techniques for complex kanji.',
      link: '/blog/n1-mnemonics',
    },
    {
      title: 'Polite Speech: Keigo in Business',
      category: 'Business Japanese',
      date: 'Oct 21, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs8YUmESpsKsFKSUB1Vy_SmhYuV64HQKUn_lP6GYcy1hMubO44OlDzImRqcQfq2G8L1CTH7Xmnp8RQFMokGhi9RpAcvgGf_9rZpkoaqutbYlxMqhrgtxwWQdB9MHVRYNjojHNzF0cDY1gKU6d9BggvR8rmYNQ6Bk5qFtW1boLd9CRmxieVQb2_6o7lijSFP-C18sa0PK-Z5ALIOamkXgpwtzn5RJPmOJoDOpQMRw5SQs2Rea3UUEmB7Ygrvhurxjv4EgtQuaOc4356',
      excerpt: 'Navigate formal communication in Japanese corporate environments.',
      link: '/blog/keigo-business',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1280px] mx-auto px-margin-desktop py-section-gap">
          <article className="max-w-4xl mx-auto">
            {/* Post Header */}
            <header className="mb-stack-lg text-center">
              <div className="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed text-label-md rounded mb-4">
                {blogPost.category}
              </div>
              <h1 className="font-headline-lg text-display-lg text-on-surface mb-6">{blogPost.title}</h1>
              <div className="flex items-center justify-center gap-4 text-on-surface-variant flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                  <span className="font-body-md">{blogPost.author}</span>
                </div>
                <span className="text-outline">•</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                  <span className="font-body-md">{blogPost.date}</span>
                </div>
                <span className="text-outline">•</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                  <span className="font-body-md">{blogPost.readTime}</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-section-gap shadow-lg border border-outline-variant bg-surface">
              <img alt={blogPost.title} className="w-full h-full object-cover" src={blogPost.image} />
            </div>

            {/* Content Section */}
            <div className="prose prose-lg max-w-none text-on-surface space-y-stack-lg">
              <p className="font-body-lg text-body-lg leading-relaxed">
                The journey of learning Kanji is often perceived as a daunting mountain of strokes and meanings. However, true mastery
                doesn't come from brute-force memorization, but through a disciplined approach that mirrors the meditative qualities of
                traditional Japanese calligraphy. By understanding the architectural logic behind each character, we transform a chore
                into a sophisticated cognitive practice.
              </p>

              <div>
                <h2 className="font-headline-md text-headline-lg text-primary mb-4 mt-stack-lg">The Architecture of Meaning</h2>
                <p className="font-body-md text-body-md mb-6">
                  Every Kanji character is a composition of radicals—smaller building blocks that provide clues to the meaning or
                  pronunciation. When we study characters like <span className="font-bold text-primary">森 (mori - forest)</span>, we
                  see three 'trees' <span className="font-bold text-primary">(木)</span>. This logical progression is the foundation of
                  the JPMaster philosophy: seeing the structure within the complexity.
                </p>
              </div>

              {/* In-content image */}
              <div className="my-stack-lg grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
                <div className="rounded-lg overflow-hidden border border-outline-variant h-64">
                  <img
                    className="w-full h-full object-cover"
                    alt="Zen garden"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeHp0StBZCukJTcOaQ-zsMRKJNRFufphiTEboVRXJoXeN_gOyc3jxItfxoH5BZU9AdQnWy3g01qwKolQwnXFOPyIxoyj0TpsY8a_TWOnB-t3cuy8_hT2PJD5d_GWbV8yZkfQghdU-UP7ejSKB4dXXylbwCL9LBd_EY35QujSfPcd66g9ZPLwJnGK_t6fTl08LQ05Ptlc7zYCeWO3scPa-AgAZ1jATB55is7ZnL8C7T2XlfKl_DFzXeHGhWGiJJzT8CkVKkaIQT2s6u"
                  />
                </div>
                <div>
                  <Heading level="h3" size="headline-sm" className="text-on-surface mb-2">
                    Creating a Scholarly Sanctuary
                  </Heading>
                  <Text variant="body-md" color="on-surface-variant">
                    Environment dictates focus. Just as a calligrapher prepares their inkstone with intention, a language learner must
                    cultivate a space free from digital noise. The 'Art of Focus' begins with your physical surroundings.
                  </Text>
                </div>
              </div>

              <div>
                <h2 className="font-headline-md text-headline-lg text-primary mb-4 mt-stack-lg">Etymology as a Memory Anchor</h2>
                <p className="font-body-md text-body-md mb-8">
                  To truly "know" a character is to know its history. Why does the character for 'gate' look like a swing-door? Why does
                  'rest' feature a person leaning against a tree? These visual stories are the most powerful mnemonic devices available
                  to the modern student. At JPMaster, we prioritize this etymological connection to ensure long-term retention.
                </p>
              </div>

              <div className="bg-surface-container-low p-stack-lg rounded-xl border-l-4 border-primary mb-section-gap">
                <p className="italic font-body-lg text-on-surface-variant leading-relaxed">
                  "Kanji is not just a writing system; it is a visual encyclopedia of human observation and cultural philosophy. When
                  you write a character, you are participating in a thousand-year-old conversation."
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <section className="mt-section-gap pt-section-gap border-t border-outline-variant">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-stack-lg">Comments ({comments.length})</h3>
              <div className="space-y-stack-lg mb-section-gap">
                {comments.map((cmt) => (
                  <Comment key={cmt.name} {...cmt} />
                ))}
              </div>

              {/* Input Box */}
              <Card className="bg-surface p-stack-lg rounded-xl border border-outline-variant">
                <h4 className="font-headline-sm text-headline-sm mb-4">Leave a scholarly thought</h4>
                <textarea
                  className="w-full min-h-[120px] p-4 bg-surface-container-lowest border border-outline-variant rounded focus:ring-2 focus:ring-primary focus:border-primary text-body-md mb-4 outline-none"
                  placeholder="Share your reflections on the art of Kanji..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-end">
                  <button className="bg-secondary text-on-secondary font-inter px-8 py-2 rounded shadow-sm hover:opacity-90 transition-all text-label-md uppercase tracking-wider">
                    Submit Comment
                  </button>
                </div>
              </Card>
            </section>

            {/* Related Posts */}
            <section className="mt-section-gap">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-stack-lg">Further Reading</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                {relatedPosts.map((post) => (
                  <BlogCard key={post.title} {...post} />
                ))}
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
