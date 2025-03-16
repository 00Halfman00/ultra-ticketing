import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';
// import App from 'next/app';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  // console.log('currentUser in the component ', currentUser);
  return (
    <div className="container-lg">
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  console.log('appComponent: ');
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  // console.log('DATA: ', data);
  console.log('PAGE PROPS: ', pageProps);
  return { ...data, pageProps };
};

export default AppComponent;
