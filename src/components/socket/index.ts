import io from 'socket.io-client';
const url =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.REACT_APP_EXTERNAL_URL
    : process.env.REACT_APP_LOCAL_URL;
const socket = io(url); //Sometimes the local url changes
export default socket;
