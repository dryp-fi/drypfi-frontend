export const BALANCE_BASE_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_owner', type: 'address' },
      { internalType: 'address', name: '_router', type: 'address' },
      { internalType: 'address', name: '_link', type: 'address' },
      {
        internalType: 'address',
        name: '_addressProvider',
        type: 'address',
      },
      { internalType: 'address', name: '_swapRouter02', type: 'address' },
      { internalType: 'address', name: '_swappedToken', type: 'address' },
      { internalType: 'address', name: '_borrowToken', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      { internalType: 'address', name: 'faultyCaller', type: 'address' },
    ],
    name: 'BALANCE__onlyOwnerCanCall',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'calledChainSelector',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'gasLimit',
        type: 'uint256',
      },
    ],
    name: 'ReceivedBorrowMessage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'swappedToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'swappedAmount',
        type: 'uint256',
      },
    ],
    name: 'ReceivedLendMessage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'ReceivedRePayFullMessage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'calledChainSelector',
        type: 'uint64',
      },
    ],
    name: 'ReceivedRemoveLendBalanceMessage',
    type: 'event',
  },
  {
    inputs: [],
    name: 'aavePool',
    outputs: [{ internalType: 'contract IPool', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'addressesProvider',
    outputs: [
      {
        internalType: 'contract IPoolAddressesProvider',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_user', type: 'address' },
      {
        internalType: 'address',
        name: '_calledBorrowToken',
        type: 'address',
      },
      { internalType: 'address', name: '_borrowToken', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      {
        internalType: 'uint64',
        name: '_calledChainSelector',
        type: 'uint64',
      },
      { internalType: 'address', name: '_receiver', type: 'address' },
      { internalType: 'uint256', name: '_gasLimit', type: 'uint256' },
    ],
    name: 'borrow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLinkAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOwnerAddr',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_asset', type: 'address' }],
    name: 'getReserveData',
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: 'uint256', name: 'data', type: 'uint256' },
            ],
            internalType: 'struct DataTypes.ReserveConfigurationMap',
            name: 'configuration',
            type: 'tuple',
          },
          {
            internalType: 'uint128',
            name: 'liquidityIndex',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'currentLiquidityRate',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'variableBorrowIndex',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'currentVariableBorrowRate',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'currentStableBorrowRate',
            type: 'uint128',
          },
          {
            internalType: 'uint40',
            name: 'lastUpdateTimestamp',
            type: 'uint40',
          },
          { internalType: 'uint16', name: 'id', type: 'uint16' },
          {
            internalType: 'address',
            name: 'aTokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'stableDebtTokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'variableDebtTokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'interestRateStrategyAddress',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: 'accruedToTreasury',
            type: 'uint128',
          },
          { internalType: 'uint128', name: 'unbacked', type: 'uint128' },
          {
            internalType: 'uint128',
            name: 'isolationModeTotalDebt',
            type: 'uint128',
          },
        ],
        internalType: 'struct DataTypes.ReserveData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRouterAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'getUserAccount',
    outputs: [
      {
        internalType: 'uint256',
        name: 'totalCollateralBase',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'totalDebtBase', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'availableBorrowsBase',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'currentLiquidationThreshold',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'ltv', type: 'uint256' },
      { internalType: 'uint256', name: 'healthFactor', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'getUserConfiguration',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'data', type: 'uint256' },
        ],
        internalType: 'struct DataTypes.UserConfigurationMap',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_user', type: 'address' },
      { internalType: 'address', name: '_token', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
    ],
    name: 'lend',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_user', type: 'address' },
      { internalType: 'address', name: '_token', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
    ],
    name: 'rePayBorrow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'router',
    outputs: [
      { internalType: 'contract ISwapRouter', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_tokenAddress', type: 'address' },
    ],
    name: 'setBorrowToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_tokenAddress', type: 'address' },
    ],
    name: 'setSwappedToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_user', type: 'address' },
      { internalType: 'address', name: '_token', type: 'address' },
      { internalType: 'address', name: '_callerToken', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      {
        internalType: 'uint64',
        name: '_calledChainSelector',
        type: 'uint64',
      },
      { internalType: 'address', name: '_receiver', type: 'address' },
      { internalType: 'uint256', name: '_gasLimit', type: 'uint256' },
    ],
    name: 'withdrawLendBalance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
