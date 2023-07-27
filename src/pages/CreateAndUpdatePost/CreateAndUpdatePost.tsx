import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, UploadFile, UploadProps, message } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import { createRef, useEffect, useMemo, useState } from 'react';
import { useLocation, useMatch, useParams } from 'react-router-dom';
import postApi from '~/api/post.api';

import Editor from '~/components/Editor/Editor';
import LoadingOverlay from '~/components/Loading/LoadingOverlay';
import ImageUpload from '~/components/Upload/ImageUpload';
import { useQueryString } from '~/hooks/useQueryString';
import AdminLayout from '~/layout/AdminLayout';
import MainLayout from '~/layout/MainLayout';
import UserLayout from '~/layout/UserLayout';
import { Post } from '~/types/post.type';
import { converFormValueToFormData, convertPostToFormValue } from '~/utils/post.utils';
import { showMessageRespone } from '~/utils/utils';

export type PostFormData = Pick<Post, 'title' | 'description' | 'shortDescription'>;

function CreateAndUpdatePost() {
  const [form] = Form.useForm();
  const [thumbnail, setThumbnailFile] = useState<UploadFile[]>([]);
  const [post, setPost] = useState<Post>();
  const [description, setDescription] = useState('');
  const editorRef = createRef<HTMLInputElement>();
  const isCreateMode = useLocation().pathname.includes('/create-update-post/new');
  const { id } = useParams();
  const { layout } = useQueryString();

  const queryClient = useQueryClient();
  const getPost = useQuery({
    queryKey: ['getPost', id],
    queryFn: () => {
      return postApi.getById(id as string);
    },
    onSuccess: (res) => {
      if (res.data.success) {
        setPost(res.data.data);
      } else {
        message.error(res.data.message);
      }
    },
    enabled: !isCreateMode
  });

  useEffect(() => {
    if (post) {
      const { formValues, thumbnailFile } = convertPostToFormValue(post);
      form.setFieldsValue(formValues);
      setDescription(formValues?.description || '');
      setThumbnailFile(thumbnailFile);
    }
  }, [post]);

  const thumbnailUploadProps: UploadProps = useMemo(() => {
    return {
      beforeUpload: (file) => {
        if (file) {
          setThumbnailFile([file]);
        }
        return false;
      },
      onChange: ({ fileList: newFileList, file }) => {
        if (newFileList.length > 1) {
          setThumbnailFile([newFileList.at(-1) as UploadFile]);
        } else {
          setThumbnailFile(newFileList);
        }
      },
      fileList: thumbnail,
      listType: 'picture-card',
      multiple: false,
      onRemove: () => {
        return false;
      },
      onPreview: () => {}
    };
  }, [thumbnail]);

  const createPostMutation = useMutation({
    mutationFn: (body: FormData) => {
      return postApi.create(body);
    },
    onSuccess: (res) => {
      showMessageRespone(res.data);
      if (res.data.success) {
        if (isCreateMode) {
          setDescription('');
        }
        form.resetFields();
        setThumbnailFile([]);
        queryClient.invalidateQueries(['getAllPostByAdmin']);
      }
    },
    onError: (error) => {
      console.log(error);
    }
  });
  const updatePostMutation = useMutation({
    mutationFn: (body: FormData) => {
      return postApi.update(body);
    },
    onSuccess: (res) => {
      showMessageRespone(res.data);
      if (res.data.success) {
        setPost(res.data.data);
        queryClient.invalidateQueries(['getAllPostByAdmin']);
      }
    },
    onError: (error) => {
      console.log(error);
    }
  });
  const handleSave = (values: PostFormData) => {
    values.description = editorRef.current?.value || '';
    const body = converFormValueToFormData(values, thumbnail);
    if (isCreateMode) {
      createPostMutation.mutate(body);
    } else {
      body.append('_id', post?._id as string);
      body.append('censored', post?.censored ? 'true' : 'false');
      updatePostMutation.mutate(body);
    }
  };
  const Layout = ({ children }: { children: React.ReactNode }) => {
    return layout === 'admin' ? (
      <AdminLayout renderChildren>{children}</AdminLayout>
    ) : (
      <MainLayout renderChildren>
        <UserLayout>{children}</UserLayout>
      </MainLayout>
    );
  };
  return (
    <Layout>
      <div className='bg-white px-4 py-4 rounded-md shadow-md'>
        <div className='my-4 text-lg uppercase text-orange-600'>Bài viết:</div>
        <Form form={form} onFinish={handleSave} layout='vertical'>
          <FormItem label='Ảnh đại diện'>
            <ImageUpload uploadProps={thumbnailUploadProps} />
          </FormItem>
          <FormItem
            rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}
            required
            name={'title'}
            label='Tiêu đề'
          >
            <Input />
          </FormItem>
          <FormItem label='Mô tả ngắn. Tối đa 500 ký tự' name={'shortDescription'}>
            <TextArea rows={4} placeholder='Mô tả ngắn. Tối đa 500 ký tự' maxLength={500} />
          </FormItem>
          <FormItem required label='Mô tả:'>
            <Editor ref={editorRef} content={description} />
          </FormItem>
          <FormItem>
            <Button
              loading={createPostMutation.isLoading || updatePostMutation.isLoading}
              disabled={createPostMutation.isLoading || updatePostMutation.isLoading}
              htmlType='submit'
              type='primary'
            >
              Lưu
            </Button>
          </FormItem>
        </Form>
        {!isCreateMode && <LoadingOverlay loading={getPost.isLoading} />}
      </div>
    </Layout>
  );
}

export default CreateAndUpdatePost;
