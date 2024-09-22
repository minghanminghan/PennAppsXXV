import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AccountPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the specified URL
    router.push('https://5085896.propelauthtest.com/account');
  }, [router]);

  return null; // Optionally, you can return a loading spinner or message here
};

export default AccountPage;