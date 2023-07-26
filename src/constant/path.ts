const path = {
  home: '/',
  login: '/login',
  register: '/register',
  forgetpassword: '/forget-password',
  resetpassword: '/reset-password',
  createPost: '/create-update-post/new',
  post: '/post/:id',
  createAndUpdatePost: '/create-update-post/:id',
  userInformation: '/user-information',
  adminUser: '/admin-user',
  adminPost: '/admin-post',
  contact: '/contact',
  blog: '/blog',
  me: '/me',
  meManagePost: '/me-manage-post'
} as const;

export default path;
