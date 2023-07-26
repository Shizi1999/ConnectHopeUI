import { Col, Image, Row } from 'antd';
import { Post } from '~/types/post.type';
import { User } from '~/types/user.type';

function PostExpandRow({ post, users }: { post: Post; users: User[] }) {
  const getAuthorInformation = (_id: string, field: keyof User) => {
    const user = users.find((us) => us._id === _id);
    if (user) {
      return user[field];
    }
    return '';
  };
  const { description, author } = post;
  return (
    <Row>
      <Col span={8}>
        <div className='mb-1'>
          Người đăng:
          <span className='ms-2'>
            {getAuthorInformation(author, 'fullname') || getAuthorInformation(author, 'email')}
          </span>
        </div>
      </Col>
      <Col span={16}>
        <div>Nội dung:</div>
        <div dangerouslySetInnerHTML={{ __html: description || '' }}></div>
      </Col>
    </Row>
  );
}

export default PostExpandRow;
