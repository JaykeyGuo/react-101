import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react';

const ChatAPI = {
  handle: null,
  isOnline: false,
  login(x) {
    this.isOnline = true;
    this.handle && this.handle({isOnline: true});
  },
  logout() {
    this.isOnline = false;
    this.handle && this.handle({isOnline: false});
  },
  subscribe(id, handle) {
    console.log(this);
    console.log('subscribe userId: ' + id);
    this.handle = handle;
  },
  unsubscribe(id) {
    console.log('unsubscribe userId: ' + id);
    this.handle = null;
  },
}

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribe(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribe(props.friend.id, handleStatusChange);
    }
  }, [props.friend.id]);
  // 使用 useEffect 的第二个参数来完成对应的渲染的控制，只有在定义的值发生变化的时候才会重新渲染

  if (isOnline === null) {
    return 'Loading...';
  }

  return (
    <div>
      {console.log('UPDATE FRIEND STATUS')}
      {isOnline ? 'On line': 'Off line'}
    </div>
  )
}

function App() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    console.log('I will render once');
    setCount(100);
  }, []);

  return (
    <div>
      Counter: {count}
      <button onClick={() => setCount(count + 1)}>Change Counter</button>
      <br />
      userId: {userId}
      <br />
      {show && <FriendStatus friend={{id: userId, name: 'Cool'}} />}
      <br />
      <button onClick={() => setShow(!show)}>{ show ? 'Hide' : 'Show' }</button>
      <button onClick={() => setUserId(() => Math.floor(Math.random() * 100))}>Change User Id</button>
      <br />
      <button onClick={() => ChatAPI.login()}>Login</button>
      <button onClick={() => ChatAPI.logout()}>Logout</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));