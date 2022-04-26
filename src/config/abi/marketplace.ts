export default [
  {
    inputs: [
      { internalType: 'contract IERC721', name: '_token721', type: 'address' },
      { internalType: 'contract IERC1155', name: '_token1155', type: 'address' },
      { internalType: 'contract IERC20', name: '_token20', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32',
      },
      {
        indexed: true, internalType: 'bytes32', name: 'previousAdminRole', type: 'bytes32',
      },
      {
        indexed: true, internalType: 'bytes32', name: 'newAdminRole', type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32',
      },
      {
        indexed: true, internalType: 'address', name: 'account', type: 'address',
      },
      {
        indexed: true, internalType: 'address', name: 'sender', type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32',
      },
      {
        indexed: true, internalType: 'address', name: 'account', type: 'address',
      },
      {
        indexed: true, internalType: 'address', name: 'sender', type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false, internalType: 'uint256', name: 'orderID', type: 'uint256',
      },
      {
        indexed: false, internalType: 'address[2]', name: 'fromTo', type: 'address[2]',
      },
      {
        indexed: false, internalType: 'uint256[2]', name: 'idAndAmount', type: 'uint256[2]',
      },
      {
        indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256',
      },
    ],
    name: 'Trade',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PERCENT_DENOMINATOR',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SIGNER_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'TOKEN_1155',
    outputs: [{ internalType: 'contract IERC1155', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'TOKEN_20',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'TOKEN_721',
    outputs: [{ internalType: 'contract IERC721', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feePercentage',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeReceiver',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[2][]', name: 'fromTo', type: 'address[2][]' },
      { internalType: 'uint256[2][]', name: 'idAndAmount', type: 'uint256[2][]' },
      { internalType: 'uint256[]', name: 'amount', type: 'uint256[]' },
    ],
    name: 'forceTradeBatch',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint16', name: '_feePercentage', type: 'uint16' }],
    name: 'setFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_feeReceiver', type: 'address' }],
    name: 'setFeeReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'orderID', type: 'uint256' },
      { internalType: 'address[2]', name: 'fromTo', type: 'address[2]' },
      { internalType: 'uint256[2]', name: 'idAndAmount', type: 'uint256[2]' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'trade',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
