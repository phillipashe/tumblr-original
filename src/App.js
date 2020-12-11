// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import Post from './components/Post';
import './App.css';

function App() {

  function getImageUrl(post) {
    const imgObj = post.content.find(contents => {
      return contents.type && contents.type === "image";
    })
    // apparently the first img in the array is unadulterated
    if (imgObj) 
    {
      return imgObj.media[0].url;
    }
    return false; 
  }

  async function getPost(blogName, pageNumber) {
    let url;
    url = `https://api.tumblr.com/v2/blog/${blogName}/posts?offset=${pageNumber * 20}`;
    if (!pageNumber) url = `https://api.tumblr.com/v2/blog/${blogName}/posts`;
    const headers = {
      accept: 'application/json;format=camelcase',
      authorization: 'Bearer aIcXSOoTtqrzR8L8YEIOmBeW94c3FmbSNSWAUbxsny9KKx5VFh'
    }
    const res = await fetch(url, { headers });
    const data = await res.json();
    
    if (res.status !== 200) {
      accessOriginalPosts(originalPosts = 'Not found');
    }

    // process data
    if (res.status === 200 && data.response.posts.length) {
      for (let post of data.response.posts) {
        // no trail === original post
        if (!post.trail.length) {
          const imgUrl = getImageUrl(post);
          const originalPost = {
            summary: post.summary,
            shortUrl: post.shortUrl
          }
          if (imgUrl) originalPost.imgUrl = imgUrl;
            accessOriginalPosts(originalPosts = originalPosts.concat([originalPost]));
        }
      }

      // re-enable to get constant fetching
      getPost(blogName, pageNumber + 1);
    }
  }

  let [originalPosts, accessOriginalPosts] = useState([]);
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
        <button onClick={() => getPost(blogName, 0)}></button>
          {
          originalPosts.length ? (
          originalPosts.map(post => {
            return <Post summary={post.summary}
             shortUrl={post.shortUrl}
             imgUrl={post.imgUrl} />;
          })
          ) : (null)
          }
      </body>
    </div>
  );
}

export default App;
