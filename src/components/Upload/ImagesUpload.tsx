import { memo } from 'react';
import { Upload, UploadProps } from 'antd';
import UploadButton from '~/components/Button/UploadButton';
type ImageProps = {
  limit?: number;
  uploadProps: UploadProps;
  title?: string;
};
function ProductImages({ limit, uploadProps, title }: ImageProps) {
  const showBtn = !(!!limit && uploadProps?.fileList && uploadProps?.fileList?.length >= limit);
  return (
    <Upload {...uploadProps}>{showBtn && <UploadButton title={title || 'Ảnh'} style={{ marginTop: '8px' }} />}</Upload>
  );
}

export default memo(ProductImages);
