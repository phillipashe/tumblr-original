// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  let [posts, addPost] = useState(['abcd']);
  return (
    <div>
      <header>Tumblr original</header>
      <body>
        <label for="blogname">Enter name of blog:</label>
        <input type="text" id="blogname" name="blogname" />
        <button onClick={() => addPost(posts = posts.concat(['goodbye world']))}></button>
        <ul>
          {posts.map(post => {
            return <li>{post}</li>;
          })}
        </ul>
      </body>
    </div>
  );
}

export default App;
