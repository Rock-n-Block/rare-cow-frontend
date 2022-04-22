import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from '../components/BaseSVGIcon';

export const FacebookIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="18" height="18" fill="transparent" viewBox="0 0 18 18" {...props}>
    <path
      d="M18 9C18 4.02943 13.9706 0 9 0C4.02943 0 0 4.02943 0 9C0 13.4921 3.29115 17.2155 7.59375 17.8907V11.6016H5.30859V9H7.59375V7.01719C7.59375 4.76156 8.93742 3.51562 10.9932 3.51562C11.9776 3.51562 13.0078 3.69141 13.0078 3.69141V5.90625H11.873C10.755 5.90625 10.4062 6.60006 10.4062 7.3125V9H12.9023L12.5033 11.6016H10.4062V17.8907C14.7088 17.2155 18 13.4921 18 9Z"
      fill="#5D5FEF"
    />
  </BaseSVGIcon>
);
