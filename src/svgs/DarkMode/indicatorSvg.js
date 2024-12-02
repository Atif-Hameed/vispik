export const VixIndex = ({ fadeIcon, ishoverd }) => {
  return (
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="1.3905" width="9" height="9" rx="4.5" fill={ishoverd ? "#BBD4F4" : "#2e353a"} stroke={fadeIcon ? "#BBD4F450" : "#BBD4F4"} />
    </svg>
  );
};

export const Last = ({ fadeIcon, ishoverd }) => {
  return (
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="1.3905" width="9" height="9" rx="4.5" fill={ishoverd ? "#93FFB8" : "#272B2F"} stroke={fadeIcon ? "#93FFB850" : "#93FFB8"} />
    </svg>
  );
};

export const Open = ({ fadeIcon, ishoverd }) => {
  return (
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="1.3905" width="9" height="9" fill={ishoverd ? "#887BFF" : "#272B2F"} stroke={fadeIcon ? "#887BFF50" : "#887BFF"} />
    </svg>
  );
};

export const High = ({ fadeIcon, ishoverd }) => {
  return (
    <svg width="15" height="14" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.66987 9.3905L6 1.8905L10.3301 9.3905H1.66987Z" fill={ishoverd ? "#8037D0" : "#272B2F"} stroke={fadeIcon ? "#8037D050" : "#8037D0"} />
    </svg>
  );
};

export const Low = ({ fadeIcon, ishoverd }) => {
  return (
    <svg width="15" height="14" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.66987 1.3905L6 8.8905L10.3301 1.3905H1.66987Z" fill={ishoverd ? "#F1F99F" : "#272B2F"} stroke={fadeIcon ? "#F1F99F50" : "#F1F99F"} />
    </svg>
  );
};

export const PreviousClose = ({ fadeIcon, ishoverd }) => {
  return (
    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="1.52656" width="9" height="9" transform="rotate(45 8 1.52656)" fill={ishoverd ? "#FF0053" : "#272B2F"} stroke={fadeIcon ? "#FF005350" : "#FF0053"} />
    </svg>
  );
};

export const VIX1D = ({ fadeIcon, ishoverd }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path transform="translate(0, 3.2)"
        d="M7.05595 4.89479C5.51784 4.39186 4.31351 2.46358 4.00002 -0.00146484C3.68654 2.46358 2.48221 4.39186 0.944092 4.89479C2.48221 5.39772 3.68654 7.326 4.00002 9.79105C4.31351 7.326 5.51784 5.39772 7.05595 4.89479Z"
        fill={ishoverd ? "#FF6698" : "#272B2F"} stroke={fadeIcon ? "#FF669850" : "#FF6698"} />
    </svg>
  );
};

export const VIX9D = ({ fadeIcon, ishoverd }) => {
  return (
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="1.3905" width="9" height="9" fill={ishoverd ? "#FF6600" : "#272B2F"} stroke={fadeIcon ? "#FF660050" : "#FF6600"} />
    </svg>
  );
};

export const VIX3M = ({ fadeIcon, ishoverd }) => {
  return (
    <svg width="15" height="14" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.66987 9.3905L6 1.8905L10.3301 9.3905H1.66987Z" fill={ishoverd ? "#CC0099" : "#272B2F"} stroke={fadeIcon ? "#CC009950" : "#CC0099"} />
    </svg>
  );
};

export const VIX6M = ({ fadeIcon, ishoverd }) => {
  return (
    <svg width="15" height="14" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.66987 1.3905L6 8.8905L10.3301 1.3905H1.66987Z" fill={ishoverd ? "#00D095" : "#272B2F"} stroke={fadeIcon ? "#00D09550" : "#00D095"} />
    </svg>
  );
};

export const HV10 = ({ fadeIcon, ishoverd }) => {
  return (
    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="1.52656" width="9" height="9" transform="rotate(45 8 1.52656)"
        fill={ishoverd ? "#33CCFF" : "#272B2F"} stroke={fadeIcon ? "#33CCFF50" : "#33CCFF"} />
    </svg>
  );
};

export const HV20 = ({ fadeIcon, ishoverd }) => {
  return (
    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path transform="translate(0, 1.6)"
        d="M7.76194 0.51459C7.20714 -0.0402139 5.67805 0.54842 4.03844 1.85198C2.36952 0.507824 0.80209 -0.107873 0.238265 0.455952C-0.32556 1.01978 0.290137 2.58947 1.63655 4.25613C0.344264 5.88897 -0.239858 7.40904 0.31269 7.96159C0.867494 8.51639 2.39659 7.92776 4.03619 6.6242C5.64647 7.88491 7.13723 8.44648 7.68301 7.9007C8.22879 7.35491 7.66722 5.86416 6.40876 4.25388C7.7236 2.60976 8.319 1.07165 7.76194 0.51459Z"
        stroke={fadeIcon ? "#FFFF0050" : "#FFFF00"} fill={ishoverd ? "#FFFF00" : "#272B2F"} />
    </svg>
  );
};

export const HV30 = ({ fadeIcon, ishoverd }) => {
  return (
    <svg width="12" height="15" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path transform="translate(0, 1.6)"
        d="M10 5.20422C8.56112 4.69227 7.88002 3.04816 8.53631 1.66791C7.15607 2.32421 5.51195 1.6431 5 0.204224C4.48805 1.6431 2.84393 2.32421 1.46369 1.66791C2.11998 3.04816 1.43888 4.69227 0 5.20422C1.43888 5.71618 2.11998 7.36029 1.46369 8.74053C2.84393 8.08424 4.48805 8.76534 5 10.2042C5.51195 8.76534 7.15607 8.08424 8.53631 8.74053C7.88002 7.36029 8.56112 5.71618 10 5.20422Z"
        stroke={fadeIcon ? "#334AFF50" : "#334AFF"} fill={ishoverd ? "#334AFF" : "#272B2F"} />
    </svg>
  );
};