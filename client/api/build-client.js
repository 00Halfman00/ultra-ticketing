import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // on the server
    return axios.create({
      // namespace + service name + svc.cluster.local
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // on the browser
    return axios.create({
      baseURL: '/',
    });
  }
};
