import React from "react";

function Instagram({props}){
    return (
        <div className="instagram-post">
            <img src={props.post.image} alt={props.post.caption} />
            <div className="post-content">
                <div className="post-header">
                    <img src={props.post.author.profilePicture} alt={props.post.author.username} />
                    <span className="post-author">{props.post.author.username}</span>
                </div>
                <p className="post-caption">{props.post.caption}</p>
                <div className="post-meta">
                    <span>Likes: {props.post.likes}</span>
                    <span>Comments: {props.post.comments}</span>
                </div>
            </div>
        </div>
    );
}

export default Instagram;
