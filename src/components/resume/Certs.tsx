import { useState } from 'react';
import React from '../../assets/components/React';

// DATA:
import CERTS, { CertType } from '../../data/certs';

// CSS
import './Certs.scss';

interface Certificate {
  certTitle: string;
  certTypes: string[];
  certImage: string;
  certVerificationURL: string;
  certDescription: string;
  certBy: string;
  certDate: string;
}

const CertificateList = () => {
  // State for sorting
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc'); // 'asc' or 'desc'
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([]);

  // Function to toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Function to sort certificates by date
  const sortCertificates = (certs: Certificate[], order: 'asc' | 'desc') => {
    return certs.slice().sort((a, b) => {
      const dateA = new Date(a.certDate).getTime();
      const dateB = new Date(b.certDate).getTime();

      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  // Sorted certificates
  const sortedCertificates = sortCertificates(CERTS, sortOrder);

  const filterCertificates = (type: CertType) => {
    if (type === 'all') {
      setFilteredCertificates(sortedCertificates);
    } else {
      const filtered = sortedCertificates.filter((cert) => cert.certTypes.includes(type));
      setFilteredCertificates(filtered);
    }
  };

  // Function to count certTypes
  const countCertTypes = () => {
    const typeCount: Record<string, number> = {
      all: CERTS.length,
    };

    CERTS.forEach((cert) => {
      cert.certTypes.forEach((type) => {
        if (type in typeCount) {
          typeCount[type]++;
        } else {
          typeCount[type] = 1;
        }
      });
    });

    return typeCount;
  };

  // Certificate tag cloud
  const certTypeCloud = countCertTypes();

  return (
    <div>
      <div>
        <h2>certification types</h2>
        <ul>
          {Object.entries(certTypeCloud).map(([type, count]) => (
            <li
              key={type}
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
              role='button'
              tabIndex={0}
              onClick={() => filterCertificates(type as CertType)}
              onKeyDown={(e) => e.key === 'Enter' && filterCertificates(type as CertType)}
            >
              {type} ({count})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Certifications</h2>
        <ul>
          {filteredCertificates.map((cert) => (
            <li key={cert.certTitle}>
              {cert.certDate} - {cert.certTitle}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CertificateList;
