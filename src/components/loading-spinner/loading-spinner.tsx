export const LoadingGlobal = () => (
  <div className="fixed z-20 top-1/2 left-1/2">
    <div className="loading-spinner" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export function LoadingInline({className = 'w-4 h-4 ml-2 text-white'}) {
  return (
    <svg
      className={`animate-spin mt-1 ${className}`}
      fill="currentColor"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26.349 26.35"
    >
      <g>
        <g>
          <circle cx="13.792" cy="3.082" r="3.082" />
          <circle cx="13.792" cy="24.501" r="1.849" />
          <circle cx="6.219" cy="6.218" r="2.774" />
          <circle cx="21.365" cy="21.363" r="1.541" />
          <circle cx="3.082" cy="13.792" r="2.465" />
          <circle cx="24.501" cy="13.791" r="1.232" />
          <path
            d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05
			C6.902,18.996,5.537,18.988,4.694,19.84z"
          />
          <circle cx="21.364" cy="6.218" r="0.924" />
        </g>
      </g>
    </svg>
  );
}
