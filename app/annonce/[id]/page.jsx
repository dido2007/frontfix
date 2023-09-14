'use client'
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Annonce from '@components/Marketplace/Annonce';
import { useEffect, useState } from 'react';

function AnnoncePage() {
  const pathname = usePathname();
  const [annonce, setAnnonce] = useState(null);

  console.log(pathname);
  
  useEffect(() => {
    if (pathname) {
      const match = pathname.match(/\/annonce\/(\d+)-(.+)/);

      if (match) {
        const annonceType = match[1] === '1' ? 'Offre' : 'Demande';
        const idPart = match[2];

        console.log(idPart);

        if (idPart) {
          try{
            const response = axios.post('http://localhost:3500/api/marketplace/annonce', { id: idPart, annonceType })
            alert(response.fallback)

            setAnnonce(response.data)
          } catch (error) {
            console.error('Error performing the add annonce: ', error);
            const data = {success: false, fallback: "Erreur lors de la connection a la base de donne"}
            alert(data.fallback)
          }
        }
      }
    }
  }, [pathname]);

  if (!annonce) {
    return <div>Loading...</div>;
  }

  return <Annonce annonce={annonce} />;
}

export default AnnoncePage;
