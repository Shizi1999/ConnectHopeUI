import { useState } from 'react';
import { Alert, Button, Form, Input, Space, message as alertMessage } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';

import path from '~/constant/path';
import { useQueryString } from '~/hooks/useQueryString';
import authApi from '~/api/auth.api';
import { setAccessTokenToLS } from '~/utils/auth';

function ResetPassword() {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSucess] = useState(false);
  const [form] = Form.useForm();
  const queryString = useQueryString();

  const { isLoading, mutate } = useMutation({
    mutationFn: (body: { password: string }) => {
      const token = queryString?.token || '';
      if (token) {
        setAccessTokenToLS(token);
      }
      return authApi.resetPassword(body);
    },
    onSuccess: (res) => {
      const data = res.data;
      setIsSucess(data.success);
      setMessage(data.message);
    },
    onError: (error) => {}
  });

  return (
    <Form layout='vertical' form={form} name='normal_login' initialValues={{ remember: true }} onFinish={mutate}>
      <Form.Item>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Alert message={'Your email is avaible for 5 minutes!'} type='info' showIcon />
        </Space>
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true, min: 6, message: 'Please input your Password!' }]}>
        <Input.Password
          size='large'
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item
        name='confirmPassword'
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The confirm passwords that you entered do not match!');
            }
          })
        ]}
      >
        <Input.Password
          size='large'
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Cornfirm Password'
        />
      </Form.Item>
      <Form.Item>
        <Button loading={isLoading} type='primary' htmlType='submit' className='login-form-button w-full' size='large'>
          Xác nhận
        </Button>
      </Form.Item>
      <div className='mb-2'>
        {message && (
          <Space direction='vertical' style={{ width: '100%' }}>
            <Alert message={message} type={isSuccess ? 'success' : 'error'} showIcon />
          </Space>
        )}
      </div>
      <div className='mb-2 flex justify-between'>
        <a href={path.register} className='text-blue-600 font-semibold ms-1'>
          Đăng ký
        </a>
        <a href={path.forgetpassword} className='text-blue-600 font-semibold ms-1'>
          Quên mật khẩu
        </a>
      </div>
    </Form>
  );
}

export default ResetPassword;
