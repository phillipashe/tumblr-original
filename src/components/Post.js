import React from 'react';
import './Post.css';

function Post(props) {
    // different render for posts with image info
    if (props.imgUrl && props.summary) {
        return (
            <a href={props.shortUrl}>
                <div className="original-post bottom-padded">
                    <img className="original-post-image" src={props.imgUrl} alt='tumblr post preview' />
                    <div className="original-post-text">{props.summary}</div>
                </div>
            </a>
        );
    }
    
    // only img data
    if (props.imgUrl) {
        return (
            <a href={props.shortUrl}>
                <div className="original-post">
                    <img className="original-post-image" src={props.imgUrl} alt='tumblr post preview' />
                </div>
            </a>
        );
    }

    // default render
    return (
        <a href={props.shortUrl}>
            <div className="original-post bottom-padded original-post-text">{props.summary}</div>
        </a>
    );

}

export default Post;