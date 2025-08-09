import { usePostbox } from "@/hooks/usePostbox";
import { PostboxList } from "./PostboxList";
import { PostboxDetail } from "./PostboxDetail";

export const Postbox: React.FC = () => {
  const { state } = usePostbox();
  const { selectedLetter } = state;

  // 편지가 선택된 경우 상세 화면, 아니면 목록 화면
  return selectedLetter ? <PostboxDetail /> : <PostboxList />;
};
