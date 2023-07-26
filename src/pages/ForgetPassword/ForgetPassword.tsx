import { useState } from 'react';
import { Alert, Button, Form, Input, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';

import authApi from '~/api/auth.api';
import path from '~/constant/path';

function ForgetPassword() {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [form] = Form.useForm();

  const { isLoading, mutate } = useMutation({
    mutationFn: (body: { email: string }) => {
      return authApi.forgetPassword(body);
    },
    onSuccess: (res) => {
      const data = res.data;
      setMessage(data.message);
      setIsSuccess(data.success);
    },
    onError: (err) => {}
  });

  return (
    <Form layout='vertical' form={form} name='normal_login' initialValues={{ remember: true }} onFinish={mutate}>
      <Form.Item>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Alert message={'Nhập email của bạn để tiếp tục!'} type='info' showIcon />
        </Space>
      </Form.Item>
      <Form.Item name='email' rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]}>
        <Input size='large' prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
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
      <div className='mb-2'>
        Quay lại
        <a href={path.login} className='text-blue-600 font-semibold ms-1'>
          Đăng nhập
        </a>
      </div>
    </Form>
  );
}

export default ForgetPassword;
