// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  async function getPost() {
    let url = 'https://api.randomuser.me';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    // return data;
    getPerson(person = data);
  }

  let [posts, addPost] = useState(['abcd']);
  let [person, getPerson] = useState({});
  /*
     need useEffect to prevent infinite calls
     see:
     https://medium.com/javascript-in-plain-english/react-hooks-how-to-use-useeffect-ecea3e90d84f
  */

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <header>Tumblr original</header>
      <body>
        <label for="blogname">Enter name of blog:</label>
        <input type="text" id="blogname" name="blogname" />
        <button onClick={() => addPost(posts = posts.concat(['goodbye world']))}></button>
        <div>{JSON.stringify(person)}</div>
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
