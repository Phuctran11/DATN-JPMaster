import { Header, Footer } from '../components';
import { Heading } from '../components/ui/Typography';
import { BlogFilterBar } from '../components/sections/BlogFilterBar';
import { BlogCard, FeaturedBlogCard } from '../components/cards';

export default function BlogList() {
  const featuredPost = {
    title: 'Mastering Hiragana in Just 7 Days',
    category: 'Study Tips',
    date: 'Oct 24, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0xj_VYUvWsUkyZnKlzKGJuWn3JjGoL_0ukpCNYbJyUc53ThNIk4z_ijfjjTRuSlrAW0jzco2J1O3ag2pEzJzdsMGH4-T8q3xdEcLZH9MUSH6q3YrGsUL9UIXr5VWjvAlVtmt4uD4AbBCp6zqZVwcnixwWOXaPSL5NcilIJcK4ZeCCR707tz8T3uToyohS1R7sX645SFvXeCqye80QJCVE2jmbSfsvN-859n2lb0gURpuXakWUyVovz4juZJz6QyLpZnIJIsYXQElR',
    excerpt:
      'Learn the mnemonic techniques that elite language learners use to memorize the basic Japanese script with 100% retention.',
    link: '/blog/mastering-hiragana',
  };

  const posts = [
    {
      title: 'Essential Business Etiquette',
      category: 'Japanese Culture',
      date: 'Oct 22, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsWrHlOesV2E-CYJNEHM4GII82cMvCdTo1loLIhvLMSQ2_uvX_KpSCTE859WhhMxZ-i8woA98WORbTWNLivywfi5M1C421KEVTgw0tcFWhjOZBTH2Fx0jutiHSOEC4Bj2caZ6zLNQWPgKV7e3cMTt1ajnELBq9i7NAf-YZSnrLq1LIw9pqqzl-77O7zcnpoDzG9RU8Ym2AfWTaWzff_FbRyOBFXQLUHRGAEPed-D6nVb7ooAjKwM9GAbPb6z_hwEPgGy7HtOoC2DLI',
      excerpt: 'Navigating the complexities of bow angles and business card exchange in Tokyo.',
      link: '/blog/business-etiquette',
    },
    {
      title: "The 'Wa' vs 'Ga' Mystery",
      category: 'Grammar',
      date: 'Oct 20, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlg_Efllnt4NRdLALQrTufPlPd2U7pdUrt4D_F4WbgatPeTQN4rUqJYjOC3QQN19SmwBUugqTz8Z9hfC7TgKxqMHK-hTeHcT7dVpLRuuThZAkg8WfpcOSEGSRB0FerrNHmzSz6ZicApf_TNZgIDZbrUiTAOgVidj-eFNiV3RLlW4HD5lyhwVOPNZbMwY9aKlzMLJ9N92yOXQHr8I53tDl6K_7SbvqCwTFIQ5Es67fbh_94csjcBONyuPKzMrb9KuaGOmdDEOpY62ar',
      excerpt: 'Finally understanding the subtle particles that define Japanese sentence structure.',
      link: '/blog/wa-vs-ga',
    },
    {
      title: 'Design Philosophy: Ma',
      category: 'Culture',
      date: 'Oct 18, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlhO4vQW4FsSW79mCZFM6Uh92uq7PgpLIahNmuLDA-SypgEBj2SxbvdvOTxGjSs3m6Ks_9B3E_7wHKAigozhI3FLoqwB6z7Nq3GA4pLXesd1pqWB1eKtneeTaYHexBFFc_kc2u4kNU9LR7f5CK3Cj0Xcc7waGv7TvK5sImOiXlpUM0aD6Ulz_JBI86Z0HL-aKCmBbewbXBpYNOBE23FFXkH3iMdkOeiq0J-sh44VwAXiG9fnMRnwtT2-P6jn7H2_8H870ujYYlnIs0',
      excerpt: 'How the concept of "negative space" influences Japanese life and language.',
      link: '/blog/ma-design',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[480px] w-full flex items-center overflow-hidden">
          <img
            alt="Japanese landscape background"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAa9ohhXsOi-YdFZ5ysTk4rVHJEMUXbm5Lgv3SwtYky0Lr7-4xFEYiVZHgWAwoRudYl6iERr1NN-wH6ILmQm5dmm8sA876OfNtlQBvNtgT8uhnMfnUeO8bignKgaULmVYB4sYAsRXQpA0eXTgeBVTw8s5wW2UWGOIcZN3kyLm_1X-592UJQOARG3kwuyFLf7SuFcvOANBaWHlpEg3dkyZAatUDsA262FSSEcVPLVwBiwv60jzOvo5yWArinQ0Cliow_vdcr14yp4kr"
          />
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"></div>
          <div className="relative max-w-[1280px] mx-auto px-margin-desktop w-full">
            <div className="max-w-2xl">
              <h1 className="font-display-lg text-display-lg text-on-primary mb-stack-md">Blog</h1>
              <p className="font-body-lg text-body-lg text-inverse-on-surface/90">
                Discover useful knowledge and study tips for learning Japanese from experts. Deep dive into grammar, culture,
                and mastery.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <BlogFilterBar />

        {/* Posts Grid */}
        <section className="max-w-[1280px] mx-auto px-margin-desktop py-section-gap">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-section-gap">
            {/* Featured Post */}
            <FeaturedBlogCard {...featuredPost} />

            {/* Sidebar Posts */}
            <div className="md:col-span-4 space-y-gutter">
              {posts.slice(0, 2).map((post) => (
                <BlogCard key={post.title} {...post} />
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="md:col-span-4 bg-surface-container-high border border-dashed border-outline rounded-xl flex flex-col items-center justify-center p-stack-lg text-center">
            <span className="material-symbols-outlined text-outline text-display-lg mb-stack-md">mail</span>
            <Heading level="h3" size="headline-md" className="text-on-surface mb-2">
              Expert Tips in Inbox?
            </Heading>
            <p className="text-on-surface-variant font-body-md text-body-md mb-stack-lg">
              Join 15,000+ students receiving weekly curated resources.
            </p>
            <button className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md">Subscribe Now</button>
          </div>

          {/* Additional Posts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-section-gap">
            {posts.map((post) => (
              <BlogCard key={post.title} {...post} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
