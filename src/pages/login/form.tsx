import {
  Form,
  Input,
  // Checkbox,
  // Link,
  Button,
  Space,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useRef, useState } from 'react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import { login as adminLogin } from '@/api/login';
import { LoginResParams, UserInfo } from '@/interface/interface';

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const t = useLocale(locale);

  function afterLoginSuccess(params) {
    // 记录登录状态
    localStorage.setItem('token', params.token);
    debugger;
    // 跳转首页
    window.location.href = '/';
  }

  async function login(params: UserInfo) {
    setErrorMessage('');
    setLoading(true);
    try {
      const res: LoginResParams = await adminLogin(params);
      if (res.data) {
        if (res.code === 0) {
          afterLoginSuccess(res.data);
        }
      } else {
        setErrorMessage(res.msg || t['login.form.login.errMsg']);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }

  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      login(values);
    });
  }
  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t['login.form.title']}</div>
      <div className={styles['login-form-sub-title']}>
        {t['login.form.title']}
      </div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
        initialValues={{ username: 'admin', password: '123456' }}
      >
        <Form.Item
          field="username"
          rules={[
            { required: true, message: t['login.form.username.errMsg'] },
            {
              match: /^[\u4E00-\u9FA5A-Za-z0-9_]{5,20}$/,
              message: t['username 5-20 bits'],
            },
          ]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={t['login.form.username.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[
            { required: true, message: t['login.form.password.errMsg'] },
            {
              match: /^[A-Za-z0-9_]{6,20}$/,
              message:
                t['Password 6-20 digit alphanumeric underscore combination'],
            },
          ]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t['login.form.password.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          {/*<div className={styles['login-form-password-actions']}>*/}
          {/*  <Checkbox checked={rememberPassword} onChange={setRememberPassword}>*/}
          {/*    {t['login.form.rememberPassword']}*/}
          {/*  </Checkbox>*/}
          {/*  <Link>{t['login.form.forgetPassword']}</Link>*/}
          {/*</div>*/}
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t['login.form.login']}
          </Button>
          {/*<Button*/}
          {/*  type="text"*/}
          {/*  long*/}
          {/*  className={styles['login-form-register-btn']}*/}
          {/*>*/}
          {/*  {t['login.form.register']}*/}
          {/*</Button>*/}
        </Space>
      </Form>
    </div>
  );
}
