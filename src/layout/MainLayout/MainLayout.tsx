import { Outlet } from 'react-router-dom';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';

type MainLayoutProp = {
  children?: React.ReactNode;
  renderChildren?: boolean;
};

function MainLayout({ children, renderChildren = false }: MainLayoutProp) {
  return (
    <>
      <Header />
      {renderChildren ? children : <Outlet />}
      <Footer />
    </>
  );
}

export default MainLayout;
