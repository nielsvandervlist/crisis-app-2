
function Twitter() {
    return (
        <div className="tweet">
            <Avatar />
            <div className="content">
                <Author /> <Time />
                <Message />
                <div className="buttons">
                    <ReplyButton />
                    <RetweetButton />
                    <LikeButton />
                    <MoreOptionsButton />
                </div>
            </div>
        </div>
    );
}

function Avatar() {
    return (
        <img
            src="https://avatar.tonies.de/static/stage/01.png"
            className="avatar"
            alt="avatar"
        />
    );
}

function Message() {
    return (
        <div className="message">My first tweet is less than 140 characters.</div>
    );
}

function Author() {
    return (
        <span className="author">
      <span className="name">Max Mustermann</span>
      <span className="handle">@maxmustermann</span>
    </span>
    );
}

const Time = () => <span className="time">3h ago</span>;
const ReplyButton = () => <i className="fa fa-reply reply-button" />;
const RetweetButton = () => <i className="fa fa-retweet retweet-button" />;
const LikeButton = () => <i className="fa fa-heart like-button" />;
const MoreOptionsButton = () => (
    <i className="fa fa-ellipsis-h more-options-button" />
);

export default Twitter
