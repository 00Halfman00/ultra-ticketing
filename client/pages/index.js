import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  console.log('current user: ', currentUser);
  return currentUser ? <h1>SIGNED IN</h1> : <h1>SIGNED OUT</h1>;
};

LandingPage.getInitialProps = async (context) => {
  console.log(
    'LandingPage.getInitialProps .........................'
    // Object.keys(context)
  );
  console.log('in the back end/Component.getInitialProps');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
