const LogoIcon = ({ cStyles = 'w-[60px] h-[60px]' }: { cStyles?: string }) => (
  <svg
    width="61"
    height="61"
    viewBox="0 0 61 61"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cStyles}>
    <rect width="60.0244" height="60.0244" rx="9.1704" fill="#1B1B1D" />
    <path
      d="M29.011 29.2617L16.5059 43.5175H19.5071L32.0122 29.2617L22.0081 17.9553H25.0093L35.0134 29.2617L22.5083 43.5175H32.5124L45.0175 29.2617L32.5124 15.0059H29.011L41.516 29.2617L31.512 40.568H28.5107L38.5148 29.2617L26.0097 15.0059H16.5059L29.011 29.2617Z"
      fill="url(#paint0_linear_5154_4698)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_5154_4698"
        x1="30.7617"
        y1="15.0059"
        x2="30.7617"
        y2="43.5175"
        gradientUnits="userSpaceOnUse">
        <stop stop-color="#03FEF2" />
        <stop offset="1" stop-color="#07F2D1" />
      </linearGradient>
    </defs>
  </svg>
);
export default LogoIcon;
