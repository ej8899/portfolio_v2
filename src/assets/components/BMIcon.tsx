function BMIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 100'
      fill='none'
      className='bm-icon'
      role='img'
    >
      <title>Ernie Johnson - svg logo</title>
      <rect width='100' height='100' />
      <g clipPath='url(#clip0_0_1)'>
        <rect width='100' height='100' />
        <path d='M20 20 V80 H60 V60 H40 V40 H60 V20 Z' fill='white' />
        <path d='M80 20 V80 H60 L60 60 L40 60 H40 V20 H60 Z' fill='white' />
        <mask id='path-2-inside-1_0_1' fill='white'>
          <rect x='3' y='3' width='94' height='94' rx='2' />
        </mask>
        <rect
          x='3'
          y='3'
          width='94'
          height='94'
          rx='2'
          stroke='var(--clr-header)'
          strokeWidth='8'
          mask='url(#path-2-inside-1_0_1)'
        />
      </g>
      <defs>
        <clipPath id='clip0_0_1'>
          <rect width='100' height='100' fill='var(--clr-header)' />
        </clipPath>
      </defs>
    </svg>
  );
}

export default BMIcon;
