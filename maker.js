'use strict';

// For geth
if (typeof dapple === 'undefined') {
  var dapple = {};
}

// For browsers
if (typeof window !== 'undefined') {
  window.dapple = dapple;
}

// For Node
if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

// Dappsys definition
dapple['dappsys'] = (function builder () {
  var environments = {
      'morden': {
        'objects': {
          'auth_factory1': {
            'class': 'DSAuthFactory',
            'address': '0x76f1028bcda554f9fe9d12155a7359769494201f'
          },
          'data_factory1': {
            'class': 'DSDataFactory',
            'address': '0xd9534e278bfdf6960691eea2ce44265838c143c8'
          },
          'multisig_factory1': {
            'class': 'DSMultisigFactory',
            'address': '0xb99c81fc32fba27a34d7dcf6fd5873a9717946c6'
          },
          'token_factory1': {
            'class': 'DSTokenFactory',
            'address': '0x4ab815b096ade026c604f1f51b5f33947471ed9a'
          },
          'token_installer1': {
            'class': 'DSTokenInstaller',
            'address': '0x8e23132a3076e652696d61d581c44d6f94fc1cfa'
          },
          'factory1': {
            'class': 'DSFactory1',
            'address': '0x1fda97d224ebce016b9a2cb4a96864ef18090462'
          },
          'eth_token1': {
            'class': 'DSEthToken',
            'address': '0xa8079609a6aa4545aa0ab6c9d108bbeab187f5c9'
          },
          'token_registry': {
            'class': 'DSTokenRegistry',
            'address': '0x9e2a411a0eb749fa380497bdcd97dedee5514c8d'
          },
          'multisig': {
            'class': 'DSEasyMultisig',
            'address': '0x51a3a8541268076a5548b495b32a279cf01884f3'
          },
          'echo': {
            'class': 'Echo',
            'address': '0x803b0657331c7e9fa0124635d3ea5540d9150c2a'
          }
        }
      },
      'live': {
        'objects': {
          'auth_factory1': {
            'class': 'DSAuthFactory',
            'address': '0x52802189f8a5f7d0d3d80ae7c02c28514c978871'
          },
          'data_factory1': {
            'class': 'DSDataFactory',
            'address': '0xd7d9821bbf2857230482a94ff2f16ab370ca6bbb'
          },
          'multisig_factory1': {
            'class': 'DSMultisigFactory',
            'address': '0x9404b6d3fdc712fb1733dcefdef5623c4d2ce7c0'
          },
          'token_factory1': {
            'class': 'DSTokenFactory',
            'address': '0x285d11b03c9dc1f0eec21b1f18b4e1293fede90e'
          },
          'token_installer1': {
            'class': 'DSTokenInstaller',
            'address': '0x9ae19a2fd7465f38f91cc72bdd98fba92c12c00b'
          },
          'factory1': {
            'class': 'DSFactory1',
            'address': '0x4e3037b3be6b39debe54d42b2b0472326b62576d'
          },
          'eth_token1': {
            'class': 'DSEthToken',
            'address': '0x47f52d380f2983675a4020915b77dc48f773fc33'
          },
          'token_registry': {
            'class': 'DSTokenRegistry',
            'address': '0x37d3e484971a2463eef75b684ca3e17c93128884'
          },
          'multisig': {
            'class': 'DSEasyMultisig',
            'address': '0x8ba0e78c257902993354297ceb83bea95b5c652a'
          },
          'echo': {
            'class': 'Echo',
            'address': '0x7d3767952188c0843876a3c30e6985d13ba6cec2'
          }
        }
      }
    };

  function constructor (_web3, env) {
    if (!env) {
      env = 'default';
    }
    while (typeof env !== 'object') {
      env = environments[env];
    }

    if (typeof _web3 === 'undefined') {
      if (!env.rpcURL) {
        throw new Error('Need either a Web3 instance or an RPC URL!');
      }
      _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
    }
    this.web3 = _web3;

    this.headers = {
      'DSApprovalDB': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'holder',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'setApproval',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'holder',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'getApproval',
            'outputs': [
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'spender',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Approval',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          }
        ]
      },
      'DSApprovalDBEvents': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'spender',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Approval',
            'type': 'event'
          }
        ]
      },
      'DSAuth': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          }
        ]
      },
      'DSAuthFactory': {
        'interface': [
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSBasicAuthority',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          }
        ]
      },
      'DSAuthority': {
        'interface': [
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'callee',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          }
        ]
      },
      'DSAuthorized': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'inputs': [],
            'type': 'constructor'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          }
        ]
      },
      'DSAuthorizedEvents': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          }
        ]
      },
      'DSAuthorizedUser': {
        'interface': [
          {
            'constant': false,
            'inputs': [],
            'name': 'triggerAuth',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'triggerTryAuth',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          }
        ]
      },
      'DSBalanceDB': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'addBalance',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'getSupply',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'subBalance',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'moveBalance',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'new_balance',
                'type': 'uint256'
              }
            ],
            'name': 'setBalance',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'getBalance',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'who',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'new_amount',
                'type': 'uint256'
              }
            ],
            'name': 'BalanceUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          }
        ]
      },
      'DSBalanceDBEvents': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'who',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'new_amount',
                'type': 'uint256'
              }
            ],
            'name': 'BalanceUpdate',
            'type': 'event'
          }
        ]
      },
      'DSBasicAuthority': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'caller_address',
                'type': 'address'
              },
              {
                'name': 'code_address',
                'type': 'address'
              },
              {
                'name': 'signature',
                'type': 'string'
              },
              {
                'name': 'can',
                'type': 'bool'
              }
            ],
            'name': 'setCanCall',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'caller_address',
                'type': 'address'
              },
              {
                'name': 'code_address',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              },
              {
                'name': 'can',
                'type': 'bool'
              }
            ],
            'name': 'setCanCall',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller_address',
                'type': 'address'
              },
              {
                'name': 'code_address',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'caller_address',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'code_address',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'sig',
                'type': 'bytes4'
              },
              {
                'indexed': false,
                'name': 'can',
                'type': 'bool'
              }
            ],
            'name': 'DSSetCanCall',
            'type': 'event'
          }
        ]
      },
      'DSBasicAuthorityEvents': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'caller_address',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'code_address',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'sig',
                'type': 'bytes4'
              },
              {
                'indexed': false,
                'name': 'can',
                'type': 'bool'
              }
            ],
            'name': 'DSSetCanCall',
            'type': 'event'
          }
        ]
      },
      'DSDataFactory': {
        'interface': [
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSMap',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSBalanceDB',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSApprovalDB',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSNullMap',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          }
        ]
      },
      'DSEasyMultisig': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'target',
                'type': 'address'
              },
              {
                'name': 'calldata',
                'type': 'bytes'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'propose',
            'outputs': [
              {
                'name': 'action_id',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'getInfo',
            'outputs': [
              {
                'name': 'required',
                'type': 'uint256'
              },
              {
                'name': 'members',
                'type': 'uint256'
              },
              {
                'name': 'expiration',
                'type': 'uint256'
              },
              {
                'name': 'last_proposed_action',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isMember',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'action_id',
                'type': 'uint256'
              }
            ],
            'name': 'confirm',
            'outputs': [
              {
                'name': 'confirmed',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'target',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'easyPropose',
            'outputs': [
              {
                'name': 'action_id',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'addMember',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'action_id',
                'type': 'uint256'
              }
            ],
            'name': 'trigger',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'action_id',
                'type': 'uint256'
              }
            ],
            'name': 'getActionStatus',
            'outputs': [
              {
                'name': 'confirmations',
                'type': 'uint256'
              },
              {
                'name': 'expiration',
                'type': 'uint256'
              },
              {
                'name': 'triggered',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'inputs': [
              {
                'name': 'required',
                'type': 'uint256'
              },
              {
                'name': 'member_count',
                'type': 'uint256'
              },
              {
                'name': 'expiration',
                'type': 'uint256'
              }
            ],
            'type': 'constructor'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'MemberAdded',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'action_id',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': 'calldata',
                'type': 'bytes'
              }
            ],
            'name': 'Proposed',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'action_id',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'Confirmed',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'action_id',
                'type': 'uint256'
              }
            ],
            'name': 'Triggered',
            'type': 'event'
          }
        ]
      },
      'DSEasyMultisigEvents': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'MemberAdded',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'action_id',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': 'calldata',
                'type': 'bytes'
              }
            ],
            'name': 'Proposed',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'action_id',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'Confirmed',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'action_id',
                'type': 'uint256'
              }
            ],
            'name': 'Triggered',
            'type': 'event'
          }
        ]
      },
      'DSEthToken': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': 'supply',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'withdraw',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'deposit',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'allowance',
            'outputs': [
              {
                'name': '_allowance',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'who',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'Deposit',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'who',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'Withdrawal',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'from',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Transfer',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'spender',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Approval',
            'type': 'event'
          }
        ]
      },
      'DSEthTokenEvents': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'who',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'Deposit',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'who',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'Withdrawal',
            'type': 'event'
          }
        ]
      },
      'DSFactory': {
        'interface': [
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSMap',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'n',
                'type': 'uint256'
              },
              {
                'name': 'm',
                'type': 'uint256'
              },
              {
                'name': 'expiration',
                'type': 'uint256'
              }
            ],
            'name': 'buildDSEasyMultisig',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSTokenFrontend',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'frontend',
                'type': 'address'
              },
              {
                'name': 'bal_db',
                'type': 'address'
              },
              {
                'name': 'appr_db',
                'type': 'address'
              }
            ],
            'name': 'buildDSTokenController',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSBasicAuthority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSBalanceDB',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSTokenRegistry',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSApprovalDB',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'installDSTokenBasicSystem',
            'outputs': [
              {
                'name': 'token_frontend',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSNullMap',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          }
        ]
      },
      'DSFactory1': {
        'interface': [
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSMap',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'n',
                'type': 'uint256'
              },
              {
                'name': 'm',
                'type': 'uint256'
              },
              {
                'name': 'expiration',
                'type': 'uint256'
              }
            ],
            'name': 'buildDSEasyMultisig',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSTokenFrontend',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'frontend',
                'type': 'address'
              },
              {
                'name': 'bal_db',
                'type': 'address'
              },
              {
                'name': 'appr_db',
                'type': 'address'
              }
            ],
            'name': 'buildDSTokenController',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSBasicAuthority',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSBalanceDB',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSTokenRegistry',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSApprovalDB',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'installDSTokenBasicSystem',
            'outputs': [
              {
                'name': 'frontend',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSNullMap',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'inputs': [
              {
                'name': 'auth',
                'type': 'address'
              },
              {
                'name': 'data',
                'type': 'address'
              },
              {
                'name': 'ms',
                'type': 'address'
              },
              {
                'name': 'token',
                'type': 'address'
              },
              {
                'name': 'token_install',
                'type': 'address'
              }
            ],
            'type': 'constructor'
          }
        ]
      },
      'DSFactory1Morden': {
        'interface': [
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSMap',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'n',
                'type': 'uint256'
              },
              {
                'name': 'm',
                'type': 'uint256'
              },
              {
                'name': 'expiration',
                'type': 'uint256'
              }
            ],
            'name': 'buildDSEasyMultisig',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSTokenFrontend',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'frontend',
                'type': 'address'
              },
              {
                'name': 'bal_db',
                'type': 'address'
              },
              {
                'name': 'appr_db',
                'type': 'address'
              }
            ],
            'name': 'buildDSTokenController',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSBasicAuthority',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSBalanceDB',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSTokenRegistry',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSApprovalDB',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'installDSTokenBasicSystem',
            'outputs': [
              {
                'name': 'frontend',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSNullMap',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          }
        ]
      },
      'DSFactoryUser': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'f',
                'type': 'address'
              }
            ],
            'name': 'FactoryUser',
            'outputs': [],
            'type': 'function'
          }
        ]
      },
      'DSMap': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'key',
                'type': 'bytes32'
              }
            ],
            'name': 'get',
            'outputs': [
              {
                'name': 'value',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'name': 'value',
                'type': 'bytes32'
              }
            ],
            'name': 'set',
            'outputs': [],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': true,
                'name': 'value',
                'type': 'bytes32'
              }
            ],
            'name': 'Set',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          }
        ]
      },
      'DSMapEvents': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': true,
                'name': 'value',
                'type': 'bytes32'
              }
            ],
            'name': 'Set',
            'type': 'event'
          }
        ]
      },
      'DSMultisigFactory': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'n',
                'type': 'uint256'
              },
              {
                'name': 'm',
                'type': 'uint256'
              },
              {
                'name': 'expiration',
                'type': 'uint256'
              }
            ],
            'name': 'buildDSEasyMultisig',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          }
        ]
      },
      'DSNullMap': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'key',
                'type': 'bytes32'
              }
            ],
            'name': 'get',
            'outputs': [
              {
                'name': 'value',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'key',
                'type': 'bytes32'
              }
            ],
            'name': 'unset',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'key',
                'type': 'bytes32'
              }
            ],
            'name': 'tryGet',
            'outputs': [
              {
                'name': 'value',
                'type': 'bytes32'
              },
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'name': 'value',
                'type': 'bytes32'
              }
            ],
            'name': 'set',
            'outputs': [],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': true,
                'name': 'value',
                'type': 'bytes32'
              },
              {
                'indexed': true,
                'name': 'is_set',
                'type': 'bool'
              }
            ],
            'name': 'SetNullable',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          }
        ]
      },
      'DSNullMapEvents': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': true,
                'name': 'value',
                'type': 'bytes32'
              },
              {
                'indexed': true,
                'name': 'is_set',
                'type': 'bool'
              }
            ],
            'name': 'SetNullable',
            'type': 'event'
          }
        ]
      },
      'DSSimpleActor': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'target',
                'type': 'address'
              },
              {
                'name': 'calldata',
                'type': 'bytes'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'tryExecute',
            'outputs': [
              {
                'name': 'call_ret',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'target',
                'type': 'address'
              },
              {
                'name': 'calldata',
                'type': 'bytes'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'execute',
            'outputs': [],
            'type': 'function'
          }
        ]
      },
      'DSToken': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': 'supply',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'allowance',
            'outputs': [
              {
                'name': '_allowance',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'from',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Transfer',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'spender',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Approval',
            'type': 'event'
          }
        ]
      },
      'DSTokenBase': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': 'supply',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'allowance',
            'outputs': [
              {
                'name': '_allowance',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'inputs': [
              {
                'name': 'initial_balance',
                'type': 'uint256'
              }
            ],
            'type': 'constructor'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'from',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Transfer',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'spender',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Approval',
            'type': 'event'
          }
        ]
      },
      'DSTokenController': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': 'getFrontend',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_caller',
                'type': 'address'
              },
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': 'supply',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'frontend',
                'type': 'address'
              }
            ],
            'name': 'setFrontend',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_db',
                'type': 'address'
              }
            ],
            'name': 'setBalanceDB',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'getBalanceDB',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_caller',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_db',
                'type': 'address'
              }
            ],
            'name': 'setApprovalDB',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'allowance',
            'outputs': [
              {
                'name': '_allowance',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_caller',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'getApprovalDB',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'inputs': [
              {
                'name': 'frontend',
                'type': 'address'
              },
              {
                'name': 'baldb',
                'type': 'address'
              },
              {
                'name': 'apprdb',
                'type': 'address'
              }
            ],
            'type': 'constructor'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          }
        ]
      },
      'DSTokenControllerType': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': 'getFrontend',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_caller',
                'type': 'address'
              },
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': 'supply',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'frontend',
                'type': 'address'
              }
            ],
            'name': 'setFrontend',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_db',
                'type': 'address'
              }
            ],
            'name': 'setBalanceDB',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'getBalanceDB',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_caller',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_db',
                'type': 'address'
              }
            ],
            'name': 'setApprovalDB',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'allowance',
            'outputs': [
              {
                'name': '_allowance',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_caller',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'getApprovalDB',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          }
        ]
      },
      'DSTokenEventCallback': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'emitTransfer',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'holder',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'emitApproval',
            'outputs': [],
            'type': 'function'
          }
        ]
      },
      'DSTokenFactory': {
        'interface': [
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSTokenFrontend',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'frontend',
                'type': 'address'
              },
              {
                'name': 'bal_db',
                'type': 'address'
              },
              {
                'name': 'appr_db',
                'type': 'address'
              }
            ],
            'name': 'buildDSTokenController',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'buildDSTokenRegistry',
            'outputs': [
              {
                'name': 'ret',
                'type': 'address'
              }
            ],
            'type': 'function'
          }
        ]
      },
      'DSTokenFrontend': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': 'supply',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'emitTransfer',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'getController',
            'outputs': [
              {
                'name': 'controller',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'holder',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'emitApproval',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'controller',
                'type': 'address'
              }
            ],
            'name': 'setController',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'allowance',
            'outputs': [
              {
                'name': '_allowance',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'from',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Transfer',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'spender',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Approval',
            'type': 'event'
          }
        ]
      },
      'DSTokenInstaller': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'installDSTokenBasicSystem',
            'outputs': [
              {
                'name': 'frontend',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'inputs': [
              {
                'name': 'auth',
                'type': 'address'
              },
              {
                'name': 'data',
                'type': 'address'
              },
              {
                'name': 'token',
                'type': 'address'
              }
            ],
            'type': 'constructor'
          }
        ]
      },
      'DSTokenInstallerMorden': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'installDSTokenBasicSystem',
            'outputs': [
              {
                'name': 'frontend',
                'type': 'address'
              }
            ],
            'type': 'function'
          }
        ]
      },
      'DSTokenProvider': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'symbol',
                'type': 'bytes32'
              }
            ],
            'name': 'getToken',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          }
        ]
      },
      'DSTokenRegistry': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'symbol',
                'type': 'bytes32'
              }
            ],
            'name': 'getToken',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'key',
                'type': 'bytes32'
              }
            ],
            'name': 'get',
            'outputs': [
              {
                'name': 'value',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'key',
                'type': 'bytes32'
              }
            ],
            'name': 'unset',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'key',
                'type': 'bytes32'
              }
            ],
            'name': 'tryGet',
            'outputs': [
              {
                'name': 'value',
                'type': 'bytes32'
              },
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'name': 'value',
                'type': 'bytes32'
              }
            ],
            'name': 'set',
            'outputs': [],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': true,
                'name': 'value',
                'type': 'bytes32'
              },
              {
                'indexed': true,
                'name': 'is_set',
                'type': 'bool'
              }
            ],
            'name': 'SetNullable',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          }
        ]
      },
      'ERC20': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': 'supply',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'allowance',
            'outputs': [
              {
                'name': '_allowance',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'from',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Transfer',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'spender',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Approval',
            'type': 'event'
          }
        ]
      },
      'ERC20Events': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'from',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Transfer',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'spender',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Approval',
            'type': 'event'
          }
        ]
      },
      'ERC20Stateful': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          }
        ]
      },
      'ERC20Stateless': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': 'supply',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'allowance',
            'outputs': [
              {
                'name': '_allowance',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          }
        ]
      },
      'FallbackUser': {
        'interface': [
          {
            'constant': false,
            'inputs': [],
            'name': 'exec',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          }
        ]
      },
      'Vault': {
        'interface': [
          {
            'constant': false,
            'inputs': [],
            'name': 'breach',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'coins',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'breached',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'reset',
            'outputs': [],
            'type': 'function'
          },
          {
            'inputs': [],
            'type': 'constructor'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          },
        ]
      },
      'Echo': {
        'interface': [],
      }
    };

    this.classes = {};
    for (var key in this.headers) {
      this.classes[key] = _web3.eth.contract(this.headers[key].interface);
    }

    this.objects = {};
    for (var i in env.objects) {
      var obj = env.objects[i];
      this.objects[i] = this.classes[obj['class']].at(obj.address);
    }

    this.environment = env;
  }

  return {
    class: constructor,
    environments: environments
  };
})();

dapple['maker'] = (function builder () {
  function sanitize (web3, opts, cb) {
    var defaultOpts = {
      from: web3.eth.defaultAccount || web3.eth.coinbase
    };

    if (typeof opts === 'function') {
      cb = opts;
      opts = defaultOpts;
    }
    if (typeof opts === 'undefined') {
      opts = defaultOpts;
    }
    if (typeof cb === 'undefined') {
      cb = function () {};
    }

    if (!opts.gas) {
      opts.gas = web3.eth.estimateGas(opts);
    }

    return {opts: opts, cb: cb};
  }

  var MakerAdmin = function (maker) {
    this._maker = maker;
    this._dappsys = maker.dappsys;
    this._web3 = maker.dappsys.web3;
    this._multisig = maker.dappsys.objects.multisig;
  };

  MakerAdmin.prototype.proposeAction = function (obj, func, args,
                                                 value, opts, cb) {
    var sanitized = sanitize(this._web3, opts, cb);
    opts = sanitized.opts;
    cb = sanitized.cb;

    var proposalData;

    if (this._dappsys[obj][func].getData) {
      proposalData = this._dappsys[obj][func].getData
                     .apply(this._dappsys[obj], args);
    } else {
      proposalData = this._getData(obj, func, args);
    }

    var filter = this._multisig.Proposed(
        {calldata: proposalData},
        function (err, evt) {
          filter.stopWatching();
          if (err) return cb(err);
          cb(null, evt.args.action_id);
        });

    var objects = this._dappsys.environment.objects;
    if (targetName in this._maker) {
      objects = this._maker;
    }
    var objAddress = objects[obj]['address'];
    this._multisig.propose(objAddress, proposalData, value, opts);
  };

  MakerAdmin.prototype.confirmAction = function (actionID, opts, cb) {
    var sanitized = sanitize(this._web3, opts, cb);
    opts = sanitized.opts;
    cb = sanitized.cb;

    var filter = this._web3.filter('latest', function (err, block) {
      if (err) {
        filter.stopWatching();
        return cb(err);
      }

      this._web3.getTransactionReceipt(txID, function (err, receipt) {
        if (err) {
          filter.stopWatching();
          return cb(err);
        }

        if (receipt.blockNumber) {
          filter.stopWatching();

          if (receipt.logs.length === 0) {
            return cb('Exception was thrown in multisig contract.');
          }
          return cb(null, actionID);
        }
      });
    });

    var txID = this._multisig.confirm(actionID, opts);
  };

  MakerAdmin.prototype.isAdmin = function (address) {
    if (typeof address === 'undefined') {
      address = this._web3.eth.defaultAccount || this._web3.eth.coinbase;
    }
    return this._multisig.isMember.call(address);
  };

  MakerAdmin.prototype._getData = function (targetName, func, args) {
    var objects = this._dappsys.environment.objects;

    if (targetName in this._maker) {
      objects = this._maker;
    }
    var targetClass = objects[targetName]['class'];
    var targetABI = this._dappsys.headers[targetClass].interface;

    for (var i = 0; i < targetABI.length; i += 1) {
      if (targetABI[i].type !== 'function') continue;
      targetABI[i].outputs = [{'name': '', 'type': 'bytes'}];
    }

    var echoer = this._dappsys.web3.eth.contract(targetABI)
                     .at(this._dappsys.objects.echo.address);

    return echoer[func].call.apply(echoer, args);
  };

  var Maker = function (_web3, environment) {
    if (typeof web3 === 'undefined') {
      if (typeof _web3 !== 'undefined') {
        var web3 = _web3;
      } else if (typeof Web3 !== 'undefined') {
        var web3 = new Web3(new HttpProvider('http://localhost/', '8545'));
      }
    }

    this._web3 = web3;
    this.dappsys = new dapple.dappsys.class(web3, environment);
    this.admin = new MakerAdmin(this);
  };

  Maker.prototype.getToken = function (symbol) {
    var tokenClass = 'DSTokenFrontend';
    if (symbol === 'ETH') {
      tokenClass = 'DSEthToken';
    }
    return this.dappsys.classes[tokenClass].at(
        this._web3.toHex(this._web3.toBigNumber(
            this.dappsys.objects.token_registry.get(symbol))));
  };

  // Helper function for logging callback arguments.
  Maker.prototype.logCB = function () {
    console.log(JSON.stringify(arguments));
  };

  return Maker;
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dapple['dappsys'];
}
