import '~/index.css';
import { AppContext } from './context/app.context';
import useRouteElements from './useRouteElements';
import { useContext, useEffect } from 'react';
import { LocalStorageEventTarget } from './utils/auth';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { ConfigProvider } from 'antd';
import theme from './constant/theme';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

const TRACKING_ID = 'G-ZP0NY7VL25';
ReactGA.initialize(TRACKING_ID);
function App() {
  const routeElements = useRouteElements();
  const location = useLocation();
  const { reset } = useContext(AppContext);
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset);
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset);
    };
  }, [reset]);
  useEffect(() => {
    ReactGA.event({
      action: 'visit_page',
      category: 'Any',
      label: 'visit_page',
      value: 1111
    });
  }, [location]);

  return <ConfigProvider theme={theme}>{routeElements}</ConfigProvider>;
}

export default App;
