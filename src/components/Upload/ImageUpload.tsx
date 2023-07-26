import { Upload, UploadProps } from 'antd';
import UploadButton from '~/components/Button/UploadButton';

type ImageProps = {
  uploadProps: UploadProps;
  title?: string;
};
function ImageUpload({ uploadProps, title }: ImageProps) {
  return (
    <Upload {...uploadProps}>
      <UploadButton style={{ marginTop: '8px' }} title={title || ''} />
    </Upload>
  );
}

export default ImageUpload;
