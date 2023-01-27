import cls from "./CommentSection.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";
import PostComment from "./PostComment";
import EachComment from "./EachComment";

// types
// import commentType from "util/types/gymCommentDataType";

const CommentSection = () => {
  const [commentData, setCommentData] = useState([]);
  const [isCommentWriting, setIsCommentWriting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const stateId = useSelector((state: any) => state.login.userId);
  const router = useRouter();

  useEffect(() => {
    if (isFetching == true) getCommentData();
  }, [isFetching]);

  const getCommentData = async () => {
    try {
      const pId = router.query.articles as string;
      const response = await fetch(
        `http://localhost:4000/rental/comment?pid=${pId}`
      );
      const res = await response.json();
      console.log("댓글 결과", res);
      await setCommentData(res);
      await setIsFetching(false);
    } catch (err: any) {}
  };

  const postCommentBtnClicked = () => {
    if (stateId == "") {
      alert("로그인이 필요합니다.");
      return;
    }
    setIsCommentWriting(true);
  };

  return (
    <>
      {!isFetching && (
        <>
          <div className={cls.CommentSectionLayout}>
            <div className={cls.postComment}>
              <button onClick={postCommentBtnClicked}>
                <Image
                  src="/images/rental/postComment.png"
                  alt="댓글 작성"
                  width="20"
                  height="20"
                />
              </button>
            </div>

            {isCommentWriting && (
              <PostComment
                isFetching={isFetching}
                setIsFetching={setIsFetching}
                setIsCommentWriting={setIsCommentWriting}
              />
            )}

            {commentData &&
              commentData.length > 0 &&
              commentData.map((item, idx) => {
                const eachCommentData = item;
                return (
                  <EachComment
                    key={"comment:" + idx.toString() + Math.random().toString()}
                    articleId={eachCommentData.articleId}
                    commentId={eachCommentData.commentId}
                    userId={eachCommentData.userId}
                    userName={eachCommentData.userName}
                    createdAt={eachCommentData.createdAt}
                    contents={eachCommentData.contents}
                    isCreater={eachCommentData.isCreater}
                    replys={eachCommentData.replys}
                    isFetching={isFetching}
                    setIsFetching={setIsFetching}
                    setIsCommentWriting={setIsCommentWriting}
                  />
                );
              })}

            <div className={cls.moreComments}>
              <button>더 불러오기</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CommentSection;
