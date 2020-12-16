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
    if (imgObj) return imgObj.media[0].url;
    return false; 
  }

  async function getPost(blogName, pageNumber) {
    setError(error = false);
    let url;
    url = `https://api.tumblr.com/v2/blog/${blogName}/posts?offset=${pageNumber * 20}`;
    if (!pageNumber) {
      url = `https://api.tumblr.com/v2/blog/${blogName}/posts`;
      accessOriginalPosts(originalPosts = []);
    }
    const headers = {
      accept: 'application/json;format=camelcase',
      authorization: 'Bearer aIcXSOoTtqrzR8L8YEIOmBeW94c3FmbSNSWAUbxsny9KKx5VFh'
    }
    const res = await fetch(url, { headers });
    const data = await res.json();
    
    if (res.status !== 200) {
      // accessOriginalPosts(originalPosts = 'Not found');
      setError(error = true);
      accessOriginalPosts(originalPosts = []);
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

      // recursively call to continue getting posts
      // re-enable to get constant fetching
      getPost(blogName, pageNumber + 1);
    }
  }

  let [originalPosts, accessOriginalPosts] = useState([]);
  let [blogName, setBlogName] = useState('');
  let [error, setError] = useState(false);
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
      <body>
      <div>
      <div class="form__group field">
        <input type="input" class="form__field" placeholder="Blog Name" name="name" id='name' onChange={e => setBlogName(e.target.value)} required />
        <label for="name" class="form__label">Blog Name</label>
        <button type="submit" className="blog-search-submit" onClick={() => getPost(blogName, 0)}>Search!</button>
      </div>
      {/* <header>Tumblr Original Blog Search</header>
        <div className="blog-search-container">
          <label className="blog-search-label">Enter name of blog:</label>
          <input className="blog-search"
          type="text" 
          id="blogname" 
          name="blogname" 
          value={blogName}
          onChange={e => setBlogName(e.target.value)}
          />
        <button type="submit" className="blog-search-submit" onClick={() => getPost(blogName, 0)}>Search!</button>
        </div> */}
        {error && <div className="error">Error!  Blog not found!</div>}
        <div className="post-container">
          {
          originalPosts.length ? (
          originalPosts.map(post => {
            return <Post summary={post.summary}
             shortUrl={post.shortUrl}
             imgUrl={post.imgUrl} />;
          })
          ) : (null)
          }
          </div>
    </div>
      </body>
  );
}

export default App;
