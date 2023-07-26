import { UploadFile } from 'antd';
import { RcFile } from 'antd/es/upload';
import { pick } from 'lodash';
import { PostFormData } from '~/pages/CreateAndUpdatePost/CreateAndUpdatePost';
import { Post } from '~/types/post.type';

export function converFormValueToFormData(formValues: PostFormData, thumbnailFile: UploadFile[]) {
  const body: FormData = new FormData();
  const { title, description, shortDescription } = formValues;
  body.append('description', description || '');
  body.append('shortDescription', shortDescription || '');
  body.append('title', title || '');
  const [thumbnailFileUpload, thumbnail] = converUploadFile(thumbnailFile);
  if (thumbnailFileUpload.length > 0) {
    body.append('thumbnailFile', thumbnailFileUpload[0] as string | Blob);
  } else {
    body.append('thumbnail', thumbnail[0]);
  }
  return body;
}
export function convertPostToFormValue(post: Post) {
  const { thumbnail } = post;
  let formValues: PostFormData = pick(post, ['description', 'shortDescription', 'title']);
  return {
    formValues,
    thumbnailFile:
      thumbnail && thumbnail !== 'undefined'
        ? [
            {
              uid: 'thumbnail',
              name: 'thumbnail',
              url: thumbnail,
              fileName: 'thumbnail'
            }
          ]
        : []
  };
}
function converUploadFile(files: UploadFile[]) {
  let fileOrigins: RcFile[] = [];
  let fileString: string[] = [];
  files.forEach((file) => {
    if (file?.originFileObj) {
      fileOrigins.push(file.originFileObj);
    } else {
      if (file.url) {
        fileString.push(file.url);
      }
    }
  });
  return [fileOrigins, fileString];
}
