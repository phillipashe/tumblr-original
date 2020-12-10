// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  async function getPost(blogName, pageNumber) {
    let url = `https://api.tumblr.com/v2/blog/${blogName}/posts?offset=${pageNumber * 20}`;
    const headers = {
      accept: 'application/json;format=camelcase',
      authorization: 'Bearer aIcXSOoTtqrzR8L8YEIOmBeW94c3FmbSNSWAUbxsny9KKx5VFh'
    }
    const res = await fetch(url, { headers });
    const data = await res.json();
    // console.log(data);
    
    if (res.status !== 200) {
      getPerson(person = 'Not found');
    }

    // return data;
    if (res.status === 200 && data.response.posts.length) {
      for (let post of data.response.posts) {
        if (!post.trail.length) {
          if (post.summary) console.log(`${post.summary} ${post.shortUrl}`);
        }
      }
      getPerson(person = data);
      // re-enable to get constant fetching
      getPost(blogName, pageNumber + 1);
    }
  }

  // let [posts, addPost] = useState(['abcd']);
  let [person, getPerson] = useState({});
  let [blogName, setBlogName] = useState('');
  /*
     need useEffect to prevent infinite calls
     see:
     https://medium.com/javascript-in-plain-english/react-hooks-how-to-use-useeffect-ecea3e90d84f
  */

  useEffect(() => {
    // add blogname here
    // getPost('', 1);
  }, []);

  return (
    <div>
      <header>Tumblr original</header>
      <body>
        <label for="blogname">Enter name of blog:</label>
        <input type="text" 
        id="blogname" 
        name="blogname" 
        value={blogName}
        onChange={e => setBlogName(e.target.value)}
        />
        <button onClick={() => getPost(blogName, 1)}></button>
        <div>{JSON.stringify(person)}</div>
        {/* <ul>
          {posts.map(post => {
            return <li>{post}</li>;
          })}
        </ul> */}
      </body>
    </div>
  );
}

export default App;
