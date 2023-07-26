import { Button, Form, Input, Checkbox, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import path from '~/constant/path';
import authApi from '~/api/auth.api';
import { AppContext } from '~/context/app.context';
import { useContext } from 'react';
import { showMessageRespone } from '~/utils/utils';

type FormData = {
  email: string;
  password: string;
};

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const { isLoading, mutate } = useMutation({
    mutationFn: (data: FormData) => {
      return authApi.login(data);
    },
    onSuccess: (res) => {
      const data = res.data.data;
      if (res.data.success) {
        setIsAuthenticated(true);
        setProfile(data.user);
        navigate(path.home);
      } else {
        showMessageRespone(res.data);
      }
    },
    onError: (err) => {
      message.error('Email hoặc mật khẩu không chính xác');
    }
  });

  return (
    <Form form={form} name='normal_login' initialValues={{ remember: true }} onFinish={mutate}>
      <Form.Item name='email' rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]}>
        <Input size='large' prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true, min: 6, message: 'Vui lòng nhập mật khẩu' }]}>
        <Input.Password
          size='large'
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <div className='flex justify-between w-full py-2 mb-2'>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Ghi nhớ tài khoản</Checkbox>
        </Form.Item>

        <a className='text-blue-600 font-semibold' href={path.forgetpassword}>
          Quên mật khẩu
        </a>
      </div>

      <Form.Item>
        <Button loading={isLoading} type='primary' htmlType='submit' className='login-form-button w-full' size='large'>
          Đăng nhập
        </Button>
      </Form.Item>
      <div className='mb-2'>
        Bạn chưa có tài khoản{' '}
        <a href={path.register} className='text-blue-600 font-semibold'>
          Đăng ký
        </a>
      </div>
    </Form>
  );
}

export default Login;
