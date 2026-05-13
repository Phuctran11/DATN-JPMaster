import { Card } from '../ui';
import { Heading, Text } from '../ui/Typography';

interface BlogCardProps {
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  link?: string;
}

export function BlogCard({ title, category, date, image, excerpt, link }: BlogCardProps) {
  return (
    <Card className="bg-surface border border-outline-variant rounded-xl overflow-hidden transition-all hover:shadow-lg duration-300">
      <div className="h-48 overflow-hidden">
        <img
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          src={image}
        />
      </div>
      <div className="p-stack-md">
        <span className="text-primary font-label-md text-label-md mb-2 block">{category}</span>
        <Heading level="h3" size="headline-md" className="text-on-surface mb-stack-sm">
          {title}
        </Heading>
        <Text variant="body-md" color="on-surface-variant" className="mb-stack-md line-clamp-2">
          {excerpt}
        </Text>
        <div className="flex items-center justify-between">
          <span className="text-outline text-label-md">{date}</span>
          <a href={link} className="text-primary font-label-md text-label-md hover:underline">
            Read More
          </a>
        </div>
      </div>
    </Card>
  );
}

interface FeaturedBlogCardProps extends BlogCardProps {
  featured?: boolean;
}

export function FeaturedBlogCard({
  title,
  category,
  date,
  image,
  excerpt,
  link,
}: FeaturedBlogCardProps) {
  return (
    <article className="md:col-span-8 group bg-surface border border-outline-variant rounded-xl overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-lg">
      <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
        <img alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={image} />
        <div className="absolute top-4 left-4">
          <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded text-label-md font-label-md">
            FEATURED
          </span>
        </div>
      </div>
      <div className="md:w-1/2 p-stack-lg flex flex-col justify-center">
        <span className="text-primary font-label-md text-label-md mb-stack-sm">{category}</span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md group-hover:text-primary transition-colors">
          {title}
        </h2>
        <Text variant="body-lg" color="on-surface-variant" className="mb-stack-lg">
          {excerpt}
        </Text>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-outline text-label-md">{date}</span>
          <a href={link} className="text-primary font-label-md text-label-md flex items-center gap-1 group/btn">
            Read More <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
      </div>
    </article>
  );
}
