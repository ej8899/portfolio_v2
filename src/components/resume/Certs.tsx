import { useEffect, useState } from 'react';

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
  certType: string;
}

const CertificateList = () => {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([]);
  const [activeSortType, setActiveSortType] = useState<CertType>('all');
  const [listVisibility, setListVisibility] = useState<'visible' | 'listhidden'>('visible');

  const formatCertDate = (certDate: string) => {
    if (certDate == 'in progress') {
      // const fontprogress = '<i class="fa-solid fa-bars-progress"></i>';
      return 'In\u00a0progress!';
    }
    const date = new Date(certDate);
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    return `✔️\u00a0${month} '${year}`;
  };

  const sortCertificates = (certs: Certificate[], order: 'asc' | 'desc') => {
    return certs.slice().sort((a, b) => {
      const dateA = new Date(a.certDate).getTime();
      const dateB = new Date(b.certDate).getTime();

      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

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

  const certTypeCloud = countCertTypes();

  useEffect(() => {
    setListVisibility('listhidden');
  }, [activeSortType, sortOrder]);

  useEffect(() => {
    // After the fade-out animation completes, update the data and set the list back to 'visible'
    const timeoutId = setTimeout(() => {
      const sortedCerts = sortCertificates(CERTS, sortOrder);
      if (activeSortType === 'all') {
        setFilteredCertificates(sortedCerts);
      } else {
        const filtered = sortedCerts.filter((cert) => cert.certTypes.includes(activeSortType));
        setFilteredCertificates(filtered);
      }
      setListVisibility('visible');
    }, 500); // Adjust the timeout duration as needed

    // Clean up the timeout to avoid potential memory leaks
    return () => clearTimeout(timeoutId);
  }, [activeSortType, sortOrder]);

  return (
    <div className='certs'>
      <div className='column centered_grid'>
        <div className='certs__header'>
          <h2 id='certs__title'>Certifications</h2>
          <div className='subtitle-message'>
            Here are just a few recent certifications & courses!
          </div>
        </div>

        <div className='certlist-main'>
          <div className='cert-subject-wrapper'>
            {Object.entries(certTypeCloud)
              .sort(([typeA], [typeB]) => typeA.localeCompare(typeB))
              .map(([type, count]) => (
                <span key={type}>
                  <span
                    className={`cert-display-subject ${
                      activeSortType === type ? 'active-sort' : ''
                    }`}
                    role='button'
                    tabIndex={0}
                    onClick={() => setActiveSortType(type as CertType)}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveSortType(type as CertType)}
                  >
                    {type.replace(' ', '\u00a0')}&nbsp;({count})
                  </span>
                  &nbsp;<span className='cert-type-divider'>|</span>{' '}
                </span>
              ))}
          </div>
          <div className={`certlist-wrapper ${listVisibility}`} id='style2'>
            <div className='ol-wrapper'>
              <div className='certs-header'></div>
              <ol className='olcards'>
                {filteredCertificates.map((cert) => (
                  <li key={cert.certTitle} data-date={formatCertDate(cert.certDate)}>
                    <div className='content'>
                      <div className='title'>{cert.certTitle}</div>
                      <div className='text'>
                        Issued by: {cert.certBy}, {cert.certDate}.{' '}
                        {cert.certVerificationURL !== 'none' ? (
                          <a
                            href={cert.certVerificationURL}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            (View Certificate)
                          </a>
                        ) : (
                          '(No Certificate Issued)'
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className='certs-footer'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateList;
