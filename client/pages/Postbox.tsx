import { Postbox } from "@/components/postbox/Postbox";
import { PostboxProvider } from "@/hooks/usePostbox";

const PostboxPage = () => {
  return (
    <PostboxProvider>
      <Postbox />
    </PostboxProvider>
  );
};

export default PostboxPage;
