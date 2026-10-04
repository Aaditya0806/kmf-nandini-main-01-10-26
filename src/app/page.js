import HomePage from '@/components/home/HomePage';

// English home page at "/". The same page is served at /en and, in Kannada, at /kn.
export default function Page() {
  return <HomePage locale="en" />;
}
