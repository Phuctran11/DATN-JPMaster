import { GlassCard, Container, Section } from '../ui';
import { Heading, Text } from '../ui/Typography';

function FloatingCard({ icon, title, description, top, left }: { icon: string; title: string; description: string; top: string; left: string }) {
  return (
    <div className={`absolute ${top} ${left} glass-card p-4 rounded-2xl shadow-xl w-48 hidden md:block animate-bounce-subtle`}>
      <span className="material-symbols-outlined text-secondary bg-secondary/10 p-2 rounded-lg mb-2">
        {icon}
      </span>
      <div className="font-bold text-primary">{title}</div>
      <p className="text-xs text-on-surface-variant">{description}</p>
    </div>
  );
}

function WhyChooseUsImage() {
  return (
    <div className="relative group">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all"></div>
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-500">
        <img
          alt="Professional educators"
          className="w-full aspect-[4/5] object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBijYCrhwoGaH333sEznvPFBQHFm772AU1AbXdw8TcyvX8HYngORd5zzhOWU6f-1lSgj5P19Qq1jHlXU6Ab8IEY6y1-YiZ7qpsL8R5Tt4y7jEYahIBp5ZQouUj2jdEcueTXE0RG2gjc4SX4BJFzuwAjoMRjHYpdUxjICe7iGBWVvepYF0ISZFEQ33WnZYDd3fa1UY8x6Cijnvrjf4mLun16AOdRuP731LVEEffKkfKYcSUC3SAWq0aEEbAfBxs_qY_Aue1CzYLQ2Y5B"
        />
      </div>
      <FloatingCard
        icon="verified"
        title="University Certified"
        description="Curriculum standard"
        top="top-10"
        left="-right-12"
      />
      <FloatingCard
        icon="auto_awesome"
        title="Smart Flashcards"
        description="AI-powered SRS"
        top="bottom-20"
        left="-left-12"
      />
    </div>
  );
}

function WhyChooseUsContent() {
  return (
    <GlassCard className="space-y-stack-lg p-8 md:p-12 lg:-ml-20 relative z-10">
      <div className="space-y-stack-sm">
        <span className="text-secondary font-label-md text-label-md tracking-widest uppercase font-bold">
          Why Choose Us
        </span>
        <Heading level="h2" size="headline-lg">
          Bridging Education and Technology
        </Heading>
        <Text variant="body-md" color="on-surface-variant" className="leading-relaxed">
          JPMaster is dedicated to providing the most rigorous and accessible Japanese language education online. Founded by a cohort of linguists and educators, we bridge the gap between casual app learning and university-level instruction. Our mission is to empower students through disciplined study and technological innovation.
        </Text>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <div>
            <h4 className="font-bold text-primary">Structured Path</h4>
            <p className="text-sm text-on-surface-variant">N5 to N1 JLPT mastery</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/5 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div>
            <h4 className="font-bold text-primary">Native Mentors</h4>
            <p className="text-sm text-on-surface-variant">Real-world practice</p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <a href="#" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
          Learn more about our methodology
          <span className="material-symbols-outlined">east</span>
        </a>
      </div>
    </GlassCard>
  );
}

export function WhyChooseUsSection() {
  return (
    <Section bgColor="light">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <WhyChooseUsImage />
        <WhyChooseUsContent />
      </Container>
    </Section>
  );
}
