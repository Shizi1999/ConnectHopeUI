import { useMutation } from '@tanstack/react-query';
import { Button, DatePicker, Form, Input, Select, Upload, UploadFile, UploadProps, message } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import { User } from '~/types/user.type';
import { handleError, showMessageRespone } from '~/utils/utils';
import UploadButton from '../Button/UploadButton';
import userApi from '~/api/user.api';

export type UserFormData = Pick<User, 'fullname' | 'address' | 'phone' | 'gender'> & {
  birthday?: Dayjs;
};

function UserUpdateInfomationForm({
  user,
  onSuccess = () => {}
}: {
  user: User | null;
  onSuccess?: (user: User) => void;
}) {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState<UploadFile[]>([]);
  useEffect(() => {
    if (user) {
      form.setFieldsValue({ ...user, birthday: dayjs(user.birthday) });
      if (user?.avatar) {
        setAvatar([
          {
            uid: 'image',
            name: 'image',
            url: user.avatar,
            fileName: 'image'
          }
        ]);
      }
    }
  }, [user]);
  const avatarUploadProps: UploadProps = useMemo(() => {
    return {
      beforeUpload: (file) => {
        if (file) {
          setAvatar([file]);
        }
        return false;
      },
      onChange: ({ fileList: newFileList }) => {
        setAvatar(newFileList);
      },
      fileList: avatar,
      listType: 'picture-card',
      multiple: false,
      onRemove: () => {
        return false;
      },
      onPreview: () => {}
    };
  }, [avatar]);
  const updateUserMutation = useMutation({
    mutationFn: (body: FormData) => {
      return userApi.updateUser(body);
    },
    onSuccess: (res) => {
      showMessageRespone(res.data);
      if (res.data.success) {
        console.log(res.data.data);

        onSuccess(res.data.data);
      }
    },
    onError: (err) => {
      handleError(err);
    }
  });
  const handleSave = (values: UserFormData) => {
    const body = new FormData();
    body.append('_id', user?._id as string);
    body.append('fullname', values.fullname || '');
    body.append('address', values.address || '');
    body.append('phone', values.phone || '');
    body.append('gender', values.gender || 'other');
    body.append('birthday', values.birthday?.format('YYYY-MM-DD') || '');
    if (avatar.length > 0) {
      if (avatar[0].originFileObj) {
        body.append('image', avatar[0].originFileObj);
      }
    }
    body.append('avatar', user?.avatar || '');
    updateUserMutation.mutate(body);
  };
  return (
    <div>
      <div className='my-4 text-lg uppercase text-orange-600 hidden md-block'>Thông tin cá nhân</div>
      <Form form={form} onFinish={handleSave} layout='vertical'>
        <FormItem>
          <div className='center-upload'>
            <Upload {...avatarUploadProps}>
              {avatar.length <= 1 && <UploadButton style={{ marginTop: '8px' }} title={'Ảnh đại diện'} />}
            </Upload>
          </div>
        </FormItem>
        <FormItem
          rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          required
          name={'fullname'}
          label='Họ và tên'
        >
          <Input />
        </FormItem>

        <FormItem
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          required
          name={'address'}
          label='Địa chỉ'
        >
          <Input />
        </FormItem>
        <FormItem
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          required
          name={'phone'}
          label='Số điện thoại'
        >
          <Input />
        </FormItem>
        <FormItem name={'birthday'} label='Ngày sinh'>
          <DatePicker placeholder='Ngày sinh' className='w-full' />
        </FormItem>
        <FormItem initialValue={'male'} name={'gender'} label='Giới tính'>
          <Select
            options={[
              { value: 'male', label: 'Nam' },
              { value: 'female', label: 'Nữ' },
              { value: 'other', label: 'Khác' }
            ]}
          />
        </FormItem>

        <FormItem>
          <Button
            loading={updateUserMutation.isLoading}
            disabled={updateUserMutation.isLoading}
            htmlType='submit'
            type='primary'
          >
            Lưu
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}

export default UserUpdateInfomationForm;
