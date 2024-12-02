export const VixIndex = ({ fadeIcon, ishoverd }) => {

  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="9" height="9" rx="4.5" fill={ishoverd ? '#93B9EB' : "#e5e5e5"} stroke={fadeIcon ? "#93B9EB50" : "#93B9EB"} />
    </svg>
  );
};

export const Last = ({ fadeIcon, ishoverd }) => {

  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="9" height="9" rx="4.5" fill={ishoverd ? '#00BF88' : "#e5e5e5"} stroke={fadeIcon ? "#00BF8850" : "#00BF88"} />
    </svg>
  );
}

export const Open = ({ fadeIcon, ishoverd }) => {

  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="9" height="9" fill={ishoverd ? '#887BFF' : "#e5e5e5"} stroke={fadeIcon ? "#887BFF50" : "#887BFF"} />
    </svg>
  );
}

export const High = ({ fadeIcon, ishoverd }) => {

  return (
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.66987 8.5L6 1L10.3301 8.5H1.66987Z" fill={ishoverd ? '#8037D0' : "#e5e5e5"} stroke={fadeIcon ? "#8037D050" : "#8037D0"} />
    </svg>
  );
}

export const Low = ({ fadeIcon, ishoverd }) => {

  return (
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.66987 0.5L6 8L10.3301 0.5H1.66987Z" fill={ishoverd ? '#808080' : "#e5e5e5"} stroke={fadeIcon ? "#80808050" : "#808080"} />
    </svg>
  );
}

export const PreviousClose = ({ fadeIcon, ishoverd }) => {

  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7.07104" y="0.707107" width="9" height="9" transform="rotate(45 7.07104 0.707107)" fill={ishoverd ? '#FF0053' : "#e5e5e5"} stroke={fadeIcon ? "#FF005350" : "#FF0053"} />
    </svg>
  );
}

export const VIX1D = ({ fadeIcon, ishoverd }) => {

  return (
    <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 6.02964L6.25956 1.14209L11.7295 6.02964L6.25956 15.2297L1 6.02964Z" fill={ishoverd ? '#990032' : "#e5e5e5"} stroke={fadeIcon ? "#99003250" : "#990032"} />
    </svg>
  );
}

export const VIX9D = ({ fadeIcon, ishoverd }) => {

  return (
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.729797" width="9" height="9" fill={ishoverd ? '#FF6698' : "#e5e5e5"} stroke={fadeIcon ? "#FF669850" : "#FF6698"} />
    </svg>
  );
}

export const VIX3M = ({ fadeIcon, ishoverd }) => {

  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.66987 8.7298L6 1.2298L10.3301 8.7298H1.66987Z" fill={ishoverd ? '#E928DF' : "#e5e5e5"} stroke={fadeIcon ? "#E928DF50" : "#E928DF"} />
    </svg>
  );
}

export const VIX6M = ({ fadeIcon, ishoverd }) => {

  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.66987 0.729797L6 8.2298L10.3301 0.729797H1.66987Z" fill={ishoverd ? '#4D1E80' : "#e5e5e5"} stroke={fadeIcon ? "#4D1E8050" : "#4D1E80"} />
    </svg>
  );
}

export const HV10 = ({ fadeIcon, ishoverd }) => {

  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7.07104" y="0.936904" width="9" height="9" transform="rotate(45 7.07104 0.936904)" fill={ishoverd ? '#007F5B' : "#e5e5e5"} stroke={fadeIcon ? "#007F5B50" : "#007F5B"} />
    </svg>
  );
}

export const HV20 = ({ fadeIcon }) => {

  return (
    <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.5 9.17467L7.5 6.37195L11 2.37195L8.5 0.371948L5.5 3.87195L2.19728 0.371948L0 2.57042L3.30092 5.87255L0 9.17467L2 11.3719L5 8.37195L8.30212 11.3719L10.5 9.17467Z"
        fill={fadeIcon ? '#DBBF1550' : "#DBBF15"}
      />
    </svg>
  );
}

export const HV30 = ({ fadeIcon, ishoverd }) => {

  return (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.64733 2.5L5 7.1456L8.35267 2.5H1.64733Z" fill={ishoverd ? '#1600E3' : "#e5e5e5"} stroke={fadeIcon ? "#1600E350" : "#1600E3"} />
      <path d="M1.64733 11.5L5 6.8544L8.35267 11.5H1.64733Z" fill={ishoverd ? '#1600E3' : "#e5e5e5"} stroke={fadeIcon ? "#1600E350" : "#1600E3"} />
    </svg>
  );
}
