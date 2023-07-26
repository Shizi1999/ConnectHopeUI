import { PlusOutlined } from '@ant-design/icons';
type UploadButtonProps = {
  style: React.CSSProperties;
  className?: string;
  title: string;
  icon?: React.ReactNode;
};

function UploadButton({ style, className, title, icon }: UploadButtonProps) {
  return (
    <div className={className}>
      {icon || <PlusOutlined />}
      <div style={style}>{title}</div>
    </div>
  );
}

export default UploadButton;
