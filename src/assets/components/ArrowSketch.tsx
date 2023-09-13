function ArrowSketch() {
  const svgStyles = {
    stroke: 'none',
    strokeWidth: 0,
    strokeDasharray: 'none',
    strokeLinecap: 'butt',
    strokeLinejoin: 'miter',
    strokeMiterlimit: 10,
    fill: 'none',
    fillRule: 'nonzero',
    opacity: 1,
  };

  const pathStyles = {
    stroke: 'none',
    strokeWidth: 1,
    strokeDasharray: 'none',
    strokeLinecap: 'butt',
    strokeLinejoin: 'miter',
    strokeMiterlimit: 10,
    fill: 'rgb(255,165,0)',
    fillRule: 'nonzero',
    opacity: 1,
  };

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      version='1.1'
      width='256'
      height='256'
      viewBox='0 0 256 256'
      xmlSpace='preserve'
    >
      <g transform='translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)'>
        <path
          d='M 0.038 49.961 c 0.056 -0.062 0.152 -0.066 0.214 -0.01 c 0.949 0.83 1.882 1.659 2.852 2.436 c 0.986 0.759 1.975 1.498 2.991 2.187 c 2.038 1.372 4.178 2.542 6.4 3.5 c 2.226 0.951 4.526 1.702 6.882 2.258 c 1.464 0.345 2.948 0.624 4.44 0.873 c -0.56 -1.315 -1.068 -2.65 -1.531 -3.996 c -0.783 -2.258 -1.427 -4.554 -1.974 -6.864 l -0.012 -0.05 c -0.054 -0.226 -0.036 -0.471 0.065 -0.7 c 1.758 -3.969 3.708 -7.921 6.272 -11.51 c -4.154 0.577 -8.252 1.644 -12.169 3.212 c -4.561 1.832 -8.873 4.348 -12.702 7.493 c -0.062 0.05 -0.153 0.045 -0.207 -0.015 c -0.056 -0.062 -0.052 -0.157 0.01 -0.213 c 7.373 -6.715 16.9 -11.155 26.928 -12.49 c 0.218 -0.028 0.448 0.024 0.639 0.164 c 0.392 0.289 0.475 0.84 0.186 1.232 l -0.022 0.03 c -2.8 3.799 -4.815 8.163 -6.59 12.605 c 0.603 2.094 1.297 4.154 2.104 6.162 c 0.858 2.12 1.862 4.169 2.928 6.176 c 0.134 0.252 0.199 0.543 0.171 0.849 c -0.076 0.834 -0.814 1.449 -1.648 1.374 l -0.039 -0.003 c -2.562 -0.233 -5.126 -0.66 -7.623 -1.379 c -2.495 -0.715 -4.938 -1.666 -7.225 -2.907 c -2.292 -1.23 -4.426 -2.738 -6.333 -4.466 c -1.91 -1.724 -3.582 -3.678 -5.02 -5.761 C -0.012 50.092 -0.009 50.013 0.038 49.961 z'
          style={pathStyles}
          transform=' matrix(1 0 0 1 0 0) '
          strokeLinecap='round'
        />
        <path
          d='M 26.694 50.687 c 0.185 -1.094 1.221 -1.831 2.315 -1.646 c 7.414 1.253 14.949 1.902 22.526 2.271 c 7.578 0.368 15.196 0.498 22.817 0.669 c 3.645 0.112 7.363 -0.672 10.229 -2.881 c 1.417 -1.089 2.598 -2.506 3.33 -4.157 c 0.748 -1.643 1.084 -3.474 1.062 -5.315 c -0.027 -3.683 -1.444 -7.404 -4.077 -10.077 c -2.61 -2.713 -6.399 -4.14 -10.203 -4.221 c 1.904 -0.024 3.826 0.242 5.638 0.884 c 1.811 0.637 3.501 1.652 4.916 2.978 c 2.849 2.648 4.528 6.483 4.73 10.403 c 0.11 1.961 -0.16 3.979 -0.913 5.844 c -0.734 1.872 -1.992 3.535 -3.535 4.832 c -3.111 2.632 -7.256 3.67 -11.177 3.718 c -7.618 0.163 -15.242 0.369 -22.898 0.334 c -7.653 -0.036 -15.354 -0.355 -23.024 -1.308 c -0.027 -0.003 -0.063 -0.009 -0.09 -0.013 C 27.246 52.817 26.509 51.78 26.694 50.687 z'
          style={pathStyles}
          transform=' matrix(1 0 0 1 0 0) '
          strokeLinecap='round'
        />
      </g>
    </svg>
  );
}

export default ArrowSketch;