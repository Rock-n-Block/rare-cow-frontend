import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const FiltersIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="18" height="19" viewBox="0 0 18 19" fill="none" {...props}>
    <path
      d="M9 3.7998V1.7998M9 3.7998C7.89543 3.7998 7 4.69524 7 5.7998C7 6.90437 7.89543 7.7998 9 7.7998M9 3.7998C10.1046 3.7998 11 4.69524 11 5.7998C11 6.90437 10.1046 7.7998 9 7.7998M3 15.7998C4.10457 15.7998 5 14.9044 5 13.7998C5 12.6952 4.10457 11.7998 3 11.7998M3 15.7998C1.89543 15.7998 1 14.9044 1 13.7998C1 12.6952 1.89543 11.7998 3 11.7998M3 15.7998V17.7998M3 11.7998V1.7998M9 7.7998V17.7998M15 15.7998C16.1046 15.7998 17 14.9044 17 13.7998C17 12.6952 16.1046 11.7998 15 11.7998M15 15.7998C13.8954 15.7998 13 14.9044 13 13.7998C13 12.6952 13.8954 11.7998 15 11.7998M15 15.7998V17.7998M15 11.7998V1.7998"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseSVGIcon>
);
