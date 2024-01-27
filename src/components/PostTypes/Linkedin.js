import React from "react";

function LinkedInPost({props}){
    return (
        <div className="linkedin-post">
            <img src={props.author.profilePicture} alt={props.author.name} />
            <div className="post-content">
                <h3>{props.title}</h3>
                <p>{props.content}</p>
                <div className="post-meta">
                    <span>By: {props.author.name}</span>
                    <span>{props.date}</span>
                </div>
            </div>
        </div>
    );
};

export default LinkedInPost;
