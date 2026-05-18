import { Footer } from '../Footer';
import { Header } from '../Header';
import { Text } from '../ui/Typography';

export function LessonStatusPage({ message }: { message: string }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <Text variant="body-lg" color="on-surface-variant">
          {message}
        </Text>
      </main>
      <Footer />
    </div>
  );
}
