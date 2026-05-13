import { Card, Container, Section } from '../ui';
import { Heading, Text } from '../ui/Typography';

interface CourseCardProps {
  title: string;
  price: string;
  image: string;
  level: string;
}

function CourseCard({ title, price, image, level }: CourseCardProps) {
  return (
    <Card className="group">
      <div className="p-4">
        <div className="h-52 relative rounded-2xl overflow-hidden border-2 border-surface-container-high">
          <img
            alt="Frame"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB70-ARwssAJU4XiPyDYISFLYUQWA95w3zdJcIoaLPlki0ZL_rvmDvMpOcTLoRHwbX40Oj-ugBSTK-_P0d9wdfz_q4arFf7rMH7vqfNkuY-q8pPabLzQMkn712ySLy106ozoO76LZOIZx-gcS4OWIVAUUUYnEbi55SY-y5YS1zrJ8rfX3eObLAJlxlVFZopRECMgoZ7byl3YNg1mGaQKjNI0JDPcBspokYNwxHftV7lQkGWllH1edrXxNG7TCxxvlozZR5uXrVB70l1"
          />
          <img
            alt={title}
            className="relative z-10 w-full h-full object-cover p-2 rounded-3xl mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105"
            src={image}
          />
          <span className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-lg text-[10px] font-bold z-20">
            {level}
          </span>
        </div>
      </div>
      <div className="p-8 flex flex-col h-full">
        <Heading level="h3" size="headline-sm" className="text-primary text-xl mb-2">
          {title}
        </Heading>
        <Text variant="body-md" color="on-surface-variant" className="text-sm mb-6">
          Bridge the gap between textbook and real-world Japanese with active scenario training.
        </Text>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">${price}</span>
          <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center transition-transform group-hover:rotate-45">
            <span className="material-symbols-outlined text-sm">north_east</span>
          </button>
        </div>
      </div>
    </Card>
  );
}

function FeaturedCourseCard() {
  return (
    <div className="group relative bg-[#00164e] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[450px] border-4 border-white mb-8">
      <div className="lg:w-1/2 relative">
        <img
          alt="Keigo course"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxxn-xxWIAu4Q8fJ-91hv1WzJoztTIvidUUce3Z-xmJN6GEngC-j-uoX9lF7qWXH7dqyAGXIn86yIOZgSJx6p6sj0h9khJfQtpYb2yR0HU1UVasuc5k8ZfObntEUApa-oDaVy0KWyefc4UIDcAvAIsDU9tRCX0B-XbFGtRmUBQSN9cwCNJ7ix-oLYlk7WwZEhZSQ1f0KxGf77NH3itdMLXJxK1RG3XUcE6Lcqw_SNY3RblWKorAFEU0Lr7aIJYrJsPifREtEL_TQR1"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00164e]/40 to-transparent"></div>
      </div>
      <div className="lg:w-1/2 p-12 flex flex-col justify-center space-y-6">
        <div>
          <span className="bg-secondary/90 text-on-secondary px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase">
            Mastery Level
          </span>
          <h3 className="font-headline-lg text-4xl text-white mt-4">Mastering Keigo: Business Ethics</h3>
          <p className="text-white/80 font-body-lg mt-4 leading-relaxed">
            Deep dive into the complex world of Japanese honorifics for professional environments with our premium curriculum.
          </p>
        </div>
        <div className="flex items-center gap-6 text-secondary-fixed">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span className="font-bold">12 Weeks</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">star</span>
            <span className="font-bold">4.9 (2.1k reviews)</span>
          </div>
        </div>
        <div className="flex items-center gap-8 pt-4">
          <span className="text-4xl font-black text-white">
            $199<span className="text-sm font-normal opacity-60">.00</span>
          </span>
          <button className="bg-secondary text-white px-10 py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(121,89,0,0.4)] transition-all transform hover:-translate-y-1">
            Enroll in Course
          </button>
        </div>
      </div>
    </div>
  );
}

function CoursesHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
      <div className="max-w-xl">
        <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
          — Featured Programs
        </span>
        <Heading level="h2" size="headline-lg" className="mb-4">
          Master Your Structured Path
        </Heading>
        <Text variant="body-md" color="on-surface-variant">
          Break the traditional learning barrier with courses that blend culture, ethics, and language proficiency.
        </Text>
      </div>
      <a href="#" className="group inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-outline-variant hover:border-primary text-primary font-bold transition-all shadow-sm">
        View All Courses
        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
          arrow_forward
        </span>
      </a>
    </div>
  );
}

export function FeaturedCoursesSection() {
  const courses = [
    {
      title: 'Zero to Hiragana',
      price: '49',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB_oyft_-WMudv-u29RQSFfLFmKHdUoV6WE1C2BY9yOKhhI7yjkyLLm45yYG6FqaAWRQe0fJ0lVci6LweVhhNowTzI1HPHgnuFvz91ctAbeGQw1ylOIdem5nRrB8DMRk_ILvybXGJtwiRYps3RQGtlZSH8bh9LZgLYHjVdk9vjpfNHeXP4uRiChkqaeBppZVobtm20r5mBILmZG4L80GFrJgkqsXssELTzUm1Bezd0Q31a71hy0E6pQF2eGdW07e2ZYxa8slxXUt2Me',
      level: 'N5',
    },
    {
      title: 'Daily Conversations',
      price: '89',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAyrce9hRRZmLXDrd6ZGijDq72mUW7pbeS8LTF9S0G1uZqKz9tCOll9N7ldDd5zk8p_3-OxEoCevKexyinQ3MhpFv2B7O-uGcvkzyKVlinz295lN7-ix6QY_3xQ5ViqSAo4yV3eDNe51ZVOqrQpO_wyDsZHMaCjPjYq_XYYWGQQ5XyRtpb0YgcNV4kSRnnYHZvPo3-5VspvRDNJgiDck1oz2BasFJcAtRsF52bprBqwZWrtaQcqZ80mbWAI4IWwYvDjzTTq2LQ5yT35',
      level: 'N3',
    },
    {
      title: 'Kanji Masterclass',
      price: '129',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBv0wID18lGpii6HZ_3_DesKNo0VjOVx9b9ZmMBc_qkQFyGYP7vmwbeL28yL21SYHV2cMf4rbRX-CWRo1vElZBmxqCMlNAxnEX3D0m8HDZDbGeCUfM89yMDe7Z85hBaxwWf_xpzVCIuO4eK-5r9-q0vEXxm8dbdWxejINU5jYGdfmr_PMYm8tWfeu7PFfjriaD0Q4Hma3d3I2j1IDwahcxq4A99x0RejRJSvO-lq3SrGVn0M5vXwPSybj79klqY3uWRfS5CxWr93WOR',
      level: 'PREP',
    },
  ];

  return (
    <Section bgColor="dark">
      <div
        className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj48cGF0aCBkPSJNMCAwbDE1IDE1TDMwIDAgMTUgMzAgMCAweiIgZmlsbD0iIzAwMjM2ZiIvPjwvc3ZnPg==")',
          backgroundSize: '40px 40px',
        }}
      ></div>
      <Container className="relative z-10">
        <CoursesHeader />
        <FeaturedCourseCard />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
