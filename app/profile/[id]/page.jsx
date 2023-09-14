'use client'
import axios from 'axios';
import { usePathname } from 'next/navigation'; // Utilisation du hook usePathname
import Profile from '@components/Profile/Profile';
import { useEffect, useState } from 'react';

function UserProfile() {
  const pathname = usePathname(); // Utilisation du hook usePathname à la place de useRouter
  const [user, setUser] = useState(null);

  console.log(pathname);
  
  useEffect(() => {
    if (pathname) {
      const idPart = pathname.split('/profile/')[1];

      console.log(idPart);

      if (idPart) {
        axios.get(`http://localhost:3500/api/profile/${idPart}`)
          .then(response => setUser(response.data))
          .catch(error => console.error(error));
      }
    }
  }, [pathname]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return <Profile user={user} />;
}

export default UserProfile;
