import React from 'react';
import {Input} from 'antd';
// import {
//   validateSpecialCharacters,
//   validateWhiteSpaceAnywhere
// } from '@soc/utils';
// import {ValidatorUtils} from '@mcfed/utils';

// 项目空间名称的校验
function validateSpaceName(rule: object, value: any, callback: Function) {
  const regEx = /^[a-zA-Z][a-zA-Z0-9_]*$/;

  if (value && !regEx.test(value)) {
    callback('');
  } else {
    callback();
  }
}

// 阿里云ID的校验
function validateAccessId(rule: object, value: any, callback: Function) {
  const regEx = /^[a-zA-Z][a-zA-Z0-9_.\@\-]*$/;

  if (value && !regEx.test(value)) {
    callback('');
  } else {
    callback();
  }
}

export function renderOracleColumns(locale: any, item: any) {
  return [
    {
      title: locale('racName.label'),
      key: 'racName',
      dataIndex: 'racName',
      renderCol: (text: string, row: any, instance: Object) => text,
      editingStatus: false,
      editConfig: {
        rules: [
          {
            required: true,
            message: locale('GLOBAL.INPUT.REQUIRED.TEXT', {
              text: locale('racName.label')
            })
          },
          {
            max: 50,
            message: locale('RULE.OVERLENGTH', {
              text: locale('racName.label')
            })
          },
          // {
          //   validator: validateSpecialCharacters,
          //   message: locale('racName.error.message')
          // },
          // {
          //   validator: validateWhiteSpaceAnywhere,
          //   message: locale('RULE.FORMATERROE', {
          //     text: locale('racName.label')
          //   })
          // }
        ]
      },
      editComponent: (text: any) => (
        <Input placeholder={locale('GLOBAL.INPUT.PLACEHOLDER')} />
      )
    },
    {
      title: locale('racSid.label'),
      key: 'racSid',
      dataIndex: 'racSid',
      renderCol: (text: string, row: any, instance: Object) => text,
      editConfig: {
        rules: [
          {
            required: true,
            message: locale('GLOBAL.INPUT.REQUIRED.TEXT', {
              text: locale('racSid.label')
            })
          },
          {
            max: 50,
            message: locale('RULE.OVERLENGTH', {text: locale('racSid.label')})
          },
          // {
          //   validator: validateWhiteSpaceAnywhere,
          //   message: locale('RULE.FORMATERROE', {
          //     text: locale('racSid.label')
          //   })
          // }
        ]
      },
      editingStatus: false,
      editComponent: (text: any) => (
        <Input placeholder={locale('GLOBAL.INPUT.PLACEHOLDER')} />
      )
    },
    {
      title: locale('racIp.label'),
      key: 'racIp',
      dataIndex: 'racIp',
      renderCol: (text: string, row: any, instance: Object) => text,
      editingStatus: false,
      editConfig: {
        validateFirst: true,
        rules: [
          {
            required: true,
            message: locale('GLOBAL.INPUT.REQUIRED.TEXT', {
              text: locale('racIp.label')
            })
          },
          // {
          //   validator: ValidatorUtils.validateIpV4V6,
          //   message: locale('RULE.FORMATERROE', {
          //     text: locale('racIp.label')
          //   })
          // }
        ]
      },
      editComponent: (text: any) => (
        <Input placeholder={locale('please.input.ip.domain')} />
      )
    },
    {
      title: locale('racPort.label'),
      key: 'racPort',
      dataIndex: 'racPort',
      renderCol: (text: string, row: any, instance: Object) => text,
      editingStatus: false,
      editConfig: {
        rules: [
          {
            required: true,
            message: locale('GLOBAL.INPUT.REQUIRED.TEXT', {
              text: locale('racPort.label')
            })
          },
          // {
          //   validator: ValidatorUtils.validatePort,
          //   message: locale('RULE.FORMATERROE', {
          //     text: locale('racPort.label')
          //   })
          // }
        ]
      },
      editComponent: (text: any) => (
        <Input placeholder={locale('GLOBAL.INPUT.PLACEHOLDER')} />
      )
    }
  ];
}

export function renderDefaultColumns(locale: any, item: any) {
  return [
    {
      title: locale('racName.label'),
      key: 'racName',
      dataIndex: 'racName',
      renderCol: (text: string, row: any, instance: Object) => text,
      editingStatus: false,
      editConfig: {
        rules: [
          {
            required: true,
            message: locale('GLOBAL.INPUT.REQUIRED.TEXT', {
              text: locale('racName.label')
            })
          },
          {
            max: 50,
            message: locale('RULE.OVERLENGTH', {
              text: locale('racName.label')
            })
          },
          // {
          //   validator: validateSpecialCharacters,
          //   message: locale('racName.error.message')
          // },
          // {
          //   validator: validateWhiteSpaceAnywhere,
          //   message: locale('RULE.FORMATERROE', {
          //     text: locale('racName.label')
          //   })
          // }
        ]
      },
      editComponent: (text: any) => (
        <Input placeholder={locale('GLOBAL.INPUT.PLACEHOLDER')} />
      )
    },
    {
      title: locale('racIp.label'),
      key: 'racIp',
      dataIndex: 'racIp',
      renderCol: (text: string, row: any, instance: Object) => text,
      editingStatus: false,
      editConfig: {
        validateFirst: true,
        rules: [
          {
            required: true,
            message: locale('GLOBAL.INPUT.REQUIRED.TEXT', {
              text: locale('racIp.label')
            })
          },
          // {
          //   validator: ValidatorUtils.validateIpV4V6,
          //   message: locale('RULE.FORMATERROE', {
          //     text: locale('racIp.label')
          //   })
          // }
        ]
      },
      editComponent: (text: any) => (
        <Input placeholder={locale('please.input.ip.domain')} />
      )
    },
    {
      title: locale('racPort.label'),
      key: 'racPort',
      dataIndex: 'racPort',
      renderCol: (text: string, row: any, instance: Object) => text,
      editingStatus: false,
      editConfig: {
        rules: [
          {
            required: true,
            message: locale('GLOBAL.INPUT.REQUIRED.TEXT', {
              text: locale('racPort.label')
            })
          },
          // {
          //   validator: ValidatorUtils.validatePort,
          //   message: locale('RULE.FORMATERROE', {
          //     text: locale('racPort.label')
          //   })
          // }
        ]
      },
      editComponent: (text: any) => (
        <Input placeholder={locale('GLOBAL.INPUT.PLACEHOLDER')} />
      )
    }
  ];
}

export function renderODPSColumns(locale: any, item: any) {
  return [
    {
      title: locale('odpsName.label'),
      key: 'racName',
      dataIndex: 'racName',
      renderCol: (text: string) => text,
      editingStatus: false,
      editConfig: {
        validateFirst: true,
        rules: [
          {
            required: true,
            message: locale('GLOBAL.INPUT.REQUIRED.TEXT', {
              text: locale('odpsName.label')
            })
          },
          {
            min: 3,
            message: locale('odpsName.length.error.message')
          },
          {
            max: 27,
            message: locale('odpsName.length.error.message')
          },
          {
            validator: validateSpaceName,
            message: locale('odpsName.error.message')
          }
        ]
      },
      editComponent: () => (
        <Input
          autoComplete='off'
          placeholder={locale('GLOBAL.INPUT.PLACEHOLDER')}
        />
      )
    },
    {
      title: locale('racAliyunId.label'),
      key: 'racAliyunId',
      dataIndex: 'racAliyunId',
      renderCol: (text: string) => text,
      editingStatus: false,
      editConfig: {
        validateFirst: true,
        rules: [
          {
            required: true,
            message: locale('GLOBAL.INPUT.REQUIRED.TEXT', {
              text: locale('racAliyunId.label')
            })
          },
          {
            max: 90,
            message: locale('racAliyunId.length.error.message')
          },
          {
            validator: validateAccessId,
            message: locale('racAliyunId.error.message')
          }
        ]
      },
      editComponent: () => (
        <Input
          autoComplete='off'
          placeholder={locale('please.input.racAliyunId.domain')}
        />
      )
    },
    {
      title: locale('racAliyunKey.label'),
      key: 'racAliyunKey',
      dataIndex: 'racAliyunKey',
      renderCol: (text: string) => {
        return '********';
      },
      editingStatus: false,
      editConfig: {
        rules: [
          {
            required: true,
            message: locale('GLOBAL.INPUT.REQUIRED.TEXT', {
              text: locale('racAliyunKey.label')
            })
          },
          {
            max: 255,
            message: locale('racAliyunKey.length.error.message')
          }
        ]
      },
      editComponent: () => (
        <Input.Password
          autoComplete='off'
          placeholder={locale('please.input.racAliyunKey.domain')}
        />
      )
    }
  ];
}
