import { Avatar, Container, Section, SectionHeader, StarRating } from '../ui';
import { Text } from '../ui/Typography';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

function TestimonialCard({ quote, author, role, image }: TestimonialProps) {
  return (
    <div className="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/50 hover:border-primary transition-colors flex flex-col justify-between h-full">
      <Text variant="body-md" color="on-surface-variant" className="italic mb-8">
        "{quote}"
      </Text>
      <div className="flex items-center gap-4">
        <Avatar src={image} alt={author} size="sm" />
        <div>
          <h4 className="font-bold text-primary">{author}</h4>
          <p className="text-xs text-on-surface-variant">{role}</p>
        </div>
      </div>
    </div>
  );
}

function LargeTestimonial() {
  return (
    <div className="md:col-span-2 md:row-span-2 bg-primary/5 rounded-[2.5rem] p-12 flex flex-col justify-between border border-primary/10 relative overflow-hidden">
      <div className="absolute top-10 right-10 opacity-10">
        <span className="material-symbols-outlined text-8xl">format_quote</span>
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <Avatar
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkNJ6IQHVL6-kyo4Ex7VQH39f5Ux8V3ikx1EvK3DHs4OzIGABD_l1u9-xwKOZvEvJyqpGV-SK7koOKmi6n4pk-YtiDs4u_GKuwS6PrW1dZEp7szoNZ67HDFkqcq__9OOPdPD9CDO97XpntwI_9jwR5ciT-7P2b8nTxTCmvWzz3NM2N0ziN1WnbU6oD2XovioA_TNPoQ_QFmoXvj-RVtx6Y9ZQgm0Y3d_OEOLOFZn-cUNMkcb8uoBiuWJGBb1GEQZjm8R8CCzQlczdF"
            alt="Sarah Mitchell"
            size="md"
          />
          <div>
            <h4 className="font-bold text-xl text-primary">Sarah Mitchell</h4>
            <p className="text-on-surface-variant font-medium">JLPT N2 Scholar • Amazon Tech Lead</p>
          </div>
        </div>
        <p className="text-2xl font-medium text-primary leading-relaxed italic">
          "The structure of the Keigo course is unlike anything else online. It's actually designed for serious professionals who want to work in Japan, not just tourists looking for phrases."
        </p>
      </div>
      <StarRating rating={5} size="lg" className="mt-8" />
    </div>
  );
}

export function TestimonialsSection() {
  const smallTestimonials = [
    {
      quote: 'JPMaster cut my Kanji study time in half. The focus on academic prestige over gamification made me take studies seriously.',
      author: 'David Chen',
      role: 'CS Student, Stanford',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBQUOFbUe410hD3UmHd3TUyhusjE-CRCLYEqdHAORp8S4pjsi6_-1Kdkd2NLVABzjaXoletCnEOCTBIDAZMRykJPS8gw2W2haIbW3DshzidUjKTToilqPw0ccVWrlUju_i_YDjaTwVqI1PWfW2y9S5YPQiCXb56SuMTitRZ61tcmbrqm32o6fYaVAgtIajfghwn-ecqHVDS_rZ_IfwpRvLM4P-xlRMhH7Z5XYTzaAelXlSU0ZowU-hMLpEzzEgGllIWiFBcq-T_7I6f',
    },
    {
      quote:
        'As a researcher, I appreciate the depth of etymological explanation. It\'s not just rote memorization.',
      author: 'Elena Rodriguez',
      role: 'Linguistics Researcher',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCLgDmvcntZvOoE-0u0l16OS7Zdo2zs4v76cmfMiQKu4H7AR56j2k0vsuj2LD3K7_U7PCBmpWjyskwllPBFMwZlssSTt4b7Jf7Nx2o1uPXs2Ezr761lJwvLTT445al-9XuPDpfQhV2NKT2YJ7kmObONaiaGzHgykHcwfw-nQvaYuYQoV5m2BKaeM47w59jsFXJetNU15RLuLJU0lrw0p03Wt4_cDGPnk1ySN9Vo8W79gpKfL3hI_i8yLC7XyrtB7O3IG19so16GWAlD',
    },
  ];

  return (
    <Section bgColor="light">
      <Container>
        <SectionHeader
          badge="Community Voices"
          title="Scholars Around the World"
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          <LargeTestimonial />
          {smallTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} {...testimonial} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
