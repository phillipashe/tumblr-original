import React from 'react';
import './Post.css';

function Post(props) {
    // different render for posts with image info
    if (props.imgUrl) {
        return (
            <ul>
                <li><img src={props.imgUrl} alt='tumblr post preview' /></li>
                <li>{props.summary}</li>
                <li>{props.shortUrl}</li>
            </ul>
        );
    }
    // default render
    return (
        <ul>
            <li>{props.summary}</li>
            <li>{props.shortUrl}</li>
        </ul>
    );

}

export default Post;