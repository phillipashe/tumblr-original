import React from 'react';

function Post(props) {
    return (
        <ul>
            <li>{props.summary}</li>
            <li>{props.shortUrl}</li>
        </ul>
    );

}

export default Post;