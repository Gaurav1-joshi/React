import createHistory from 'history/createBrowserHistory';
const history = createHistory();
history.listen((location) => {
  //   // .log('urlPath: ', location.pathname); // /home
});
export default history;
