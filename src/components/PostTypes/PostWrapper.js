import { useEffect, useState } from "react";
import { useGet } from "@/hooks/methods";
import * as helpers from "@/helpers";
import Facebook from "@/components/PostTypes/Facebook";
import Twitter from "@/components/PostTypes/Twitter";
import Youtube from "@/components/PostTypes/Youtube";
import Modal from "@/components/Modal/Modal"
import ParticipantForm from "@/components/Participants/ParticipantForm"

function PostWithTime({ post, children }) {
    return (
      <div>
          <div className={"mb-2"}>{helpers.uploadTime(post.updated_at)}</div>
          {children}
      </div>
    );
}

export default function PostWrapper() {
    const [posts, setPosts] = useGet("/api/posts", { online: 1 });
    const [postTypes, setPostTypes] = useGet("/api/post_types");
    const [socialPosts, setSocialPosts] = useState([]);
    const [open,setOpen] = useState(false);

    useEffect(() => {
        if (posts && postTypes) {
            const updatedSocialPosts = posts.data.map((post) => {
                const postType = postTypes.data.find((type) => type.id === post.post_type_id);
                return { ...post, type: postType ? postType.name : "" };
            });
            setSocialPosts(updatedSocialPosts);
        }
    }, [posts, postTypes]);

    function renderPost(post) {
        switch (post.type) {
            case "facebook":
                return (
                  <PostWithTime key={post.id} post={post}>
                      <Facebook social={post} onClick={() => setOpen(true)} />
                  </PostWithTime>
                );
            case "twitter":
                return (
                  <PostWithTime key={post.id} post={post}>
                      <Twitter social={post} onClick={() => setOpen(true)} />
                  </PostWithTime>
                );
            case "youtube":
          // return <Youtube key={post.id} social={post} onClick={() => setOpen(true)} />;
            default:
                return null;
        }
    }

    return (
      <div className={"post-wrapper flex gap-8 bg-white card col-span-12 items-start flex-wrap"}>
          <div className={'w-full flex'}>
              <h2><span className="h-4 w-4 bg-success rounded-full inline-block mr-2"></span>Online posts</h2>
              <span className={'btn btn--primary cursor-pointer ml-auto'} onClick={() => setOpen(!open)}>Add online post</span>
          </div>
          {socialPosts.map((post) => renderPost(post))}
          <div>
              <Modal open={open} setOpen={setOpen} title={'Add participants'}>
                  <ParticipantForm requestType={'post'}/>
              </Modal>
          </div>
      </div>
    );
}
