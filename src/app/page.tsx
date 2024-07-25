import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
  return null; // This component won't render anything
}
