import cls from "./DetailArticles_EditForm.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// util
import gymArticleDataType from "util/types/gymArticleDataType";
import setInitialValue from "./setInitialValue";
import DetailArticles_EditImg from './DetailArticles_EditImg';

interface Props {
  gymInfo: gymArticleDataType;
  setIsArticleEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFetchingArticles: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailArticles_EditForm = (props: Props) => {

  const router = useRouter();
  const stateId = useSelector((state: any) => state.login.userId);
  const stateName = useSelector((state: any) => state.login.userName);
  const [openingDays, setOpeningDays] = useState([
    { name: "일", open: false },
    { name: "월", open: false },
    { name: "화", open: false },
    { name: "수", open: false },
    { name: "목", open: false },
    { name: "금", open: false },
    { name: "토", open: false },
  ]);
  const [imgFormData, setImgFormData] = useState<any>();
  const [inputImgs, setInputImgs] = useState<string[]>([]);
  
  useEffect(() => {
    setInitialValue(props.gymInfo)
    setOpeningDays(props.gymInfo.openingDays)
    setImgFormData(props.gymInfo.gymImg)
    setInputImgs(props.gymInfo.gymImg)
  }, []);

  // css style 처리
  const checkClicked = (day: string) => {
    for (const x of openingDays) {
      if (x.name === day) {
        return x.open;
      }
    }
  };

  const setClicked = (day: string) => {
    let temp = [...openingDays];
    for (const x of temp) {
      if (x.name === day) {
        x.open = !x.open;
      }
    }
    setOpeningDays(temp);
  };

  // update
  const updateArticle = async () => {

    const bodyForUpdate = getArticleEditFormData()
    // 폼데이타 확인
    console.log('------------ formdata key ------------')
    for (var key of bodyForUpdate.keys()) {
      console.log(key);
    }
    console.log('------------ formdata value ------------')
    for (var value of bodyForUpdate.values()) {
      console.log(value);
    }
  

    // try {
    //   const response = await fetch("http://localhost:4000/rental/article", {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(bodyForUpdate),
    //   });
    //   const data = await response.json();
    //   await props.setIsFetchingArticles(true);
    //   await props.setIsArticleEditing(false);
    //   alert("게시글 수정 성공");
    // } catch (err: any) {
    //   alert("게시글 수정 실패");
    // }
  };

  // make Form data
  const getArticleEditFormData = () => {
    const x1 = document.querySelector("#art_title") as HTMLInputElement;
    const x2 = document.querySelector("#art_content") as HTMLTextAreaElement;
    const x3 = document.querySelector("#art_contact") as HTMLInputElement;
    const x4 = document.querySelector("#art_price") as HTMLInputElement;
    const x5 = document.querySelector("#art_openingHours") as HTMLInputElement;
    const x6 = document.querySelector("#art_openingPeriod_1") as HTMLInputElement;
    const x7 = document.querySelector("#art_openingPeriod_2") as HTMLInputElement;

    // values
    const [title, content, contact, price, openingHours, openingPeriod] 
    = [x1.value, x2.value, x3.value, x4.value, x5.value, [x6.value, x7.value]];

    const FD = new FormData();
    FD.append('articleId', router.query.articles as string)
    FD.append("userId", stateId);
    FD.append("userName", stateName);
    FD.append("title", title);
    FD.append("content", content);
    FD.append("contact", contact);
    FD.append("gymImg", JSON.stringify(inputImgs));
    FD.append("address", JSON.stringify(props.gymInfo.address));
    FD.append("price", price);
    FD.append("openingHours", JSON.stringify(openingHours));
    FD.append("openingPeriod", JSON.stringify(openingPeriod));
    FD.append("openingDays", JSON.stringify(openingDays));

    // 이미지 데이터 폼과 병합
    for (const pair of imgFormData.entries()) {
      FD.append(pair[0], pair[1]);
    }
    return FD
  };

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <>
      <h1>체육관 정보 수정</h1>
      <div className={cls.contentBox}>
        <div className={cls.mainContent}>
          <div className={cls.eachContent}>
            <div className={cls.center}>
              <div className={cls.eachField}>
                <div className={cls.fieldName}>제목</div>
                <div className={cls.dataField}>
                  <input id="art_title" />
                </div>
              </div>

              <DetailArticles_EditImg
                imgFormData={imgFormData}
                setImgFormData={setImgFormData}
                inputImgs={inputImgs}
                setInputImgs={setInputImgs}
              />

              <div className={cls.eachField}>
                <div className={cls.fieldName}>내용</div>
                <div className={cls.dataField}>
                  <textarea id="art_content" />
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>연락처</div>
                <div className={cls.dataField}>
                  <input id="art_contact" />
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>주소</div>
                <div className={cls.dataField}>
                  <div>
                    <input id="art_address_1" disabled />
                  </div>
                  <div>
                    <input id="art_address_2" disabled />
                  </div>
                  <div>
                    <input id="art_address_3" disabled />
                  </div>
                  <div>
                    <input id="art_address_4" disabled />
                  </div>
                  <div>
                    <input id="art_address_5" disabled />
                  </div>
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>가격</div>
                <div className={cls.dataField}>
                  <input id="art_price" />
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>오픈시간</div>
                <div className={cls.dataField}>
                  <input id="art_openingHours" />
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>기간시작</div>
                <div className={cls.dataField}>
                  <input id="art_openingPeriod_1" />
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>기간종료</div>
                <div className={cls.dataField}>
                  <input id="art_openingPeriod_2" />
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>영업일</div>
                <div className={cls.dataField}>
                  {days.map((v, i) => (
                    <button
                      key={Math.random()}
                      id={v}
                      className={checkClicked(v) ? cls.on : cls.off}
                      onClick={() => {
                        setClicked(v);
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={cls.btnField}>
              <button onClick={updateArticle}>
                <Image
                  src="/images/rental/checked.png"
                  alt="수정완료"
                  width="20"
                  height="20"
                />
              </button>
              <button
                onClick={() => {
                  props.setIsArticleEditing(false);
                }}
              >
                <Image
                  src="/images/rental/cancel.png"
                  alt="cancel"
                  width="20"
                  height="20"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailArticles_EditForm;
