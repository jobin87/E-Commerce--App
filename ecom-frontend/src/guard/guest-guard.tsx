import { useEffect, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import { CONFIG } from 'src/config-global';
import { SplashScreen } from 'src/components/loading-screen';

type Props = {
  children: React.ReactNode;
};

export function GuestGuard({ children }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake loading, then allow access
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // optional: simulate loading

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
