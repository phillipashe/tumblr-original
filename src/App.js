import { useState } from 'react';
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

  async function getPost(Name, pageNumber) {
    setError(error = false);
    setLogin(login = false);
    let url;
    url = `https://api.tumblr.com/v2/blog/${blogName}/posts?offset=${pageNumber * 20}`;
    if (!pageNumber) {
      url = `https://api.tumblr.com/v2/blog/${blogName}/posts`;
      accessOriginalPosts(originalPosts = []);
      setProfilePic(profPicUrl = "");

    }
    const headers = {
      accept: 'application/json;format=camelcase',
      authorization: 'Bearer aIcXSOoTtqrzR8L8YEIOmBeW94c3FmbSNSWAUbxsny9KKx5VFh'
    }
    const res = await fetch(url, { headers });
    const data = await res.json();

    if (res.status !== 200) {
      // (data.errors && data.errors[0].code === 4012) ? setLogin(login = true): setError(error = true);
      (data.errors && data.errors.find(err => err.code === 4012)) ? setLogin(login = true): setError(error = true);
      // setError(error = true);
      accessOriginalPosts(originalPosts = []);
    }

    // process data
    if (res.status === 200 && data.response.posts.length) {
      if (!pageNumber) {
        setProfilePic(profPicUrl = data.response.blog.avatar[0].url);
      }

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
      getPost(blogName, pageNumber + 1);
    }
  }

  let [originalPosts, accessOriginalPosts] = useState([]);
  let [blogName, setBlogName] = useState('');
  let [error, setError] = useState(false);
  let [login, setLogin] = useState(false);
  let [profPicUrl, setProfilePic] = useState('');

  function handleKeyPress(event) {
    if (event.key === 'Enter') getPost(blogName, 0);
  }

  return (
    <body>
      <div>
        <div class="form__group field" onKeyPress={(e) => handleKeyPress(e)}>
          <input type="input" class="form__field" spellcheck="false" placeholder="Blog Name" name="name" id='name' onChange={e => setBlogName(e.target.value)} required />
          <label for="name" class="form__label">Blog Name</label>
          <button type="submit" className="blog-search-submit" onClick={() => getPost(blogName, 0)}><img src="https://img.icons8.com/FFFFFF/search"></img></button>
        </div>
        <span><img class="profile-picture" src={profPicUrl}></img></span>
      </div>
      <div class="error">
        {error && <div className="error">Error!  Blog not found!</div>}
        {login && <div className="error">Sorry!  Blogs requiring a login are not supported.</div>}
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
