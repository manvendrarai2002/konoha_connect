// src/components/Kunaiicon.jsx

const KunaiIcon = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-move-up-right ${className}`}
    >
      <path d="M19.5 5.5l-14 14" />
      <path d="M12.5 5.5h7v7" />
      <path d="M10.5 10.5L2.5 18.5" />
    </svg>
  );
};

export default KunaiIcon;