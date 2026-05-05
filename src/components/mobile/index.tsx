import React, { useCallback, useEffect, useRef, useState } from "react";
import { BackEndArticle, frontEndArticle } from "../../constant/skillData";

const MobileLayout = () => {
  const [visible, setVisible] = useState<string>("home");
  const [count, setCount] = useState(0);
  const allSectionsRef = useRef(new Map());
  const color: Record<string, string> = {
    home: "#636364",
    frontEnd: "#938e8e",
    backEnd: "#5a605f",
    project: "#929689",
  };
  const [background, setBackground] = useState<string>("#000");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) {
            setBackground(color[id] || "#000");
            setVisible(id);
          }
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  const setSectionRef = useCallback((id: string, node: HTMLElement | null) => {
    if (node) {
      allSectionsRef.current.set(node.id, node);
      observer.observe(node);
    } else {
      const oldNode = allSectionsRef.current.get(id);
      if (oldNode) {
        observer.unobserve(oldNode);
        allSectionsRef.current.delete(id);
      }
    }
  }, []);

  useEffect(() => {
    const time = setInterval(() => {
      setCount((pre) => {
        if (pre > 3) {
          return 0;
        }
        return pre + 1;
      });
    }, 300);
    return () => {
      observer.disconnect();
      clearInterval(time);
    };
  }, []);

  return (
    <>
      <main
        style={{ background }}
        className="flex flex-col text-[#271818] text-3xl tracking-wide min-h-[100dvh] transition-all duration-300"
      >
        {/* home */}
        <section
          ref={(ref) => setSectionRef("home", ref)}
          id="home"
          className={
            `relative overflow-hidden h-[100dvh] flex flex-col justify-center items-center` +
            " " +
            `${visible === "home" ? "opacity-100" : "opacity-0"}`
          }
        >
          <div className=" p-2 z-20 border-2 border-gray-700">
            <img
              src="./images/ini.png"
              alt="loading"
              className="w-[80dvw] object-cover mix-blend-multiply"
            />
          </div>
          <div className="flex flex-col absolute z-10 text-[#5e5606]">
            {Array.from({ length: 25 }).map((_, lineIndex) => (
              <p key={`portfolio-${lineIndex}`} className="flex gap-1 text-sm">
                {["P", "O", "R", "T", "F", "O", "L", "I", "O"].map(
                  (letter, letterIndex, array) => {
                    const letterLength = array.length;
                    const lineNumberPerGroup = Math.ceil(letterLength / 2);
                    const middleLetterIndexInGroup = lineNumberPerGroup - 1;

                    const lineIndexInGroup =
                      (lineIndex + 5 - count) % lineNumberPerGroup;

                    const isLightLetterIndex =
                      letterIndex > middleLetterIndexInGroup
                        ? letterLength - 1 - lineIndexInGroup
                        : lineIndexInGroup;

                    return (
                      <span
                        key={`letter-${letterIndex}-${lineIndex}`}
                        className={`${
                          isLightLetterIndex === letterIndex
                            ? "text-[#212121]"
                            : ""
                        }`}
                      >
                        {letter}
                      </span>
                    );
                  },
                )}
              </p>
            ))}
          </div>
        </section>

        {/* Front-End */}
        <section
          ref={(ref) => setSectionRef("frontEnd", ref)}
          id="frontEnd"
          className={
            "transition-all duration-500 text-[#2f0000] " +
            `${visible === "frontEnd" ? "opacity-100" : "opacity-0"}`
          }
        >
          <div className="sticky top-0 left-0 mb-[-56px] opacity-20 flex flex-col gap-2 items-end">
            <p className="  opacity-50 text-[56px] font-semibold tracking-widest [writing-mode:vertical-lr] [text-orientation:upright]">
              前端
            </p>
          </div>

          <article className="text-slate-200 text-3xl font-semibold tracking-wide h-full overflow-scroll hidden-scrollbar">
            <img
              src="./images/fe.png"
              alt="loading"
              className="w-[calc(100%-68px)] mr-[68px]"
            />

            <p className="text-base leading-[150%] my-4 pr-[68px] pl-3 font-bold text-[#88e8fb]">
              # 響應式多國語系前端開發 <br />
              <span className="text-sm text-[#fff]">
                React、 Next.js 、TypeScript 、Tailwind 、i18n
              </span>
            </p>

            <p className="text-base leading-[150%] my-4 pr-[68px] pl-3 font-bold text-[#88e8fb]">
              # 建構模組化架構 <br />
              <span className="text-sm text-[#fff]">
                設計共用元件以提升開發效率並降低維護成本
              </span>
            </p>

            <p className="text-base leading-[150%] my-4 pr-[68px] pl-3 font-bold text-[#88e8fb]">
              # App跨平台開發Flutter實作經驗 <br />
              <span className="text-sm text-[#fff]">
                畫面切版以及 FCM 推播與 OAuth 第三方登入功能開發
              </span>
            </p>

            <hr className="border-gray-400 my-4 w-[90%]" />

            {frontEndArticle.content.map((item, index) => (
              <div
                key={`${item.subtitle}-${index}`}
                className="pr-[68px] pl-3 mb-4"
              >
                <h2 className="text-xs leading-[100%] text-[#e1e7ea] ">
                  {item.subtitle}
                </h2>
                <p className="text-sm leading-[150%] text-[#f6e1c8] font-bold">
                  {item.content}
                </p>
              </div>
            ))}
          </article>

          <div className="sticky bottom-0 left-0 w-fit">
            <p className="font-semibold text-[56px] mt-10 ">
              Front-end
              <span className="text-xs absolute bottom-[-3px] right-0 ">
                experience
              </span>
            </p>
          </div>
        </section>

        {/* Back-End */}
        <section
          ref={(ref) => setSectionRef("backEnd", ref)}
          id="backEnd"
          className={
            "transition-all duration-500 text-[#0f011f] " +
            `${visible === "backEnd" ? "opacity-100" : "opacity-0"}`
          }
        >
          <div className="sticky top-0 left-0 opacity-30 text-[56px] h-fit mb-[-56px] ">
            <p className="opacity-50 font-bold tracking-widest [writing-mode:vertical-lr] [text-orientation:upright]">
              後端
            </p>
          </div>

          <article className="text-slate-200 text-3xl font-semibold tracking-wide h-full overflow-scroll hidden-scrollbar">
            <img
              src="./images/be.png"
              alt="loading"
              className="w-[calc(100%-68px)] ml-[68px]"
            />

            <p className="text-base leading-[150%] my-4 px-[68px] font-bold text-[#fe92bb]">
              # 後端架構 <br />
              <span className="text-sm text-[#fff]">
                整合 Supabase、Deno Oak 與 Drizzle
                ORM，建立高遷移彈性與型別安全的 API 服務
              </span>
            </p>

            <p className="text-base leading-[150%] my-4 px-[68px] font-bold text-[#fe92bb]">
              # 安全與優化 <br />
              <span className="text-sm text-[#fff]">
                實作 RLS 權限控管與 RSA+AES 混合加密，並透過 Redis
                緩存機制降低資料庫負載與查詢延遲。
              </span>
            </p>

            <hr className="border-gray-400 mx-[68px] my-4 w-[90%]" />

            {BackEndArticle.content.map((item, index) => (
              <div key={`${item.subtitle}-${index}`} className="px-[68px] mb-4">
                <h2 className="text-sm leading-[100%] text-[#e1e7ea] font-bold ">
                  {item.subtitle}
                </h2>
                <p className="text-xs leading-[150%] text-[#f6e1c8] ">
                  {item.content}
                </p>
              </div>
            ))}
          </article>

          <p className="font-semibold text-[56px] text-end sticky bottom-2 right-0">
            Back-End
            <span className="text-xs absolute bottom-[-3px] right-0 ">
              experience
            </span>
          </p>
        </section>

        {/* Project */}
        <section
          className={
            "transition-all duration-500 text-[#001720] min-h-[80dvh] flex flex-col justify-between pb-20 " +
            `${
              visible === "project" || visible === "projectContent"
                ? "opacity-100"
                : "opacity-0"
            }`
          }
        >
          <div className="sticky top-0 left-0 opacity-20 text-[56px] mb-20 z-10 ">
            <p className="m-auto transition-all duration-500 tracking-widest [writing-mode:vertical-lr] [text-orientation:upright]">
              專案
            </p>
          </div>

          <article
            ref={(ref) => setSectionRef("project", ref)}
            id="project"
            className="z-20 pb-10 text-white text-3xl font-semibold tracking-wide h-full overflow-scroll hidden-scrollbar"
          >
            <div className="bg-gray-300">
              <img
                src="./images/loading.jpg"
                alt="project"
                className=" m-auto mix-blend-multiply"
              />
            </div>

            <p className="text-base leading-[200%] mt-5 px-[68px]">
              專案經歷：遊戲部落格、B2B/B2C多語系電商平台、平台內部後台系統、一頁式活動頁、EDM。
            </p>
          </article>

          <section className="z-20 p-[20px] flex flex-col gap-5 text-slate-200 text-3xl font-semibold tracking-wide h-full overflow-scroll hidden-scrollbar">
            {/* 電商平台 */}
            <article>
              <img src="./images/ec.png" className=" m-auto z-20" />
              <div className="flex flex-col gap-5 text-sm text-[#faf4ec]">
                <h3 className="text-base font-bold mt-3">
                  電商平台 ( Next.js 14、Flutter、SWR、i18next)
                </h3>

                <ul className="list-disc list-inside gap-4 flex flex-col mb-10">
                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">
                      大量數據加載：
                    </span>
                    <p className="ml-4">
                      運用useSWRInfinite
                      處理分頁請求並搭配視窗邊界偵測API，實作捲動載入，提升用戶瀏覽的體驗。
                    </p>
                  </li>

                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">
                      即時通訊開發：
                    </span>
                    <p className="ml-4">
                      整合 Firebase
                      Realtime服務並優化訂閱生命週期，以減少不必要的後端連線。
                    </p>
                  </li>
                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">
                      第三方登入整合：
                    </span>
                    <p className="ml-4">
                      處理OAuth授權碼流程與Token管理，提升用戶註冊率，並確保身分驗證流程安全。
                    </p>
                  </li>
                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">
                      物流地圖整合：
                    </span>
                    <p className="ml-4">
                      透過 Next.js API
                      Routes串接便利商店選店服務，實作後端API代理以安全處理金鑰與參數。
                    </p>
                  </li>
                </ul>
              </div>
            </article>

            {/* 後台系統*/}
            <article>
              <img src="./images/db.png" className=" m-auto z-20" />
              <div className="flex flex-col gap-5 text-sm text-[#faf4ec]">
                <h3 className="text-base font-bold mt-3">
                  後台管理系統 ( React、Ant-Design 、TanStack Query、i18next)
                </h3>

                <ul className="list-disc list-inside gap-4 flex flex-col mb-10">
                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">
                      數據視覺化 :
                    </span>
                    <p className="ml-4">
                      運用 React-tree-graph
                      <br />
                      實作動態樹狀圖，呈現複雜的層級組織結構。
                    </p>
                  </li>

                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">
                      功能開發與優化：
                    </span>
                    <p className="ml-4">
                      實作報表生成、文件匯出與拖拽排序等複雜功能，
                      <br />
                      並透過 Custom Hooks
                      將業務邏輯與畫面分離，提升組件複用性與系統維護性。
                    </p>
                  </li>
                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">
                      存取權限控管：
                    </span>
                    <p className="ml-4">
                      運用 OutletContext
                      <br />
                      實現跨路由權限驗證狀態同步，確保頁面訪問的安全性。
                    </p>
                  </li>
                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">
                      數據檢索：
                    </span>
                    <p className="ml-4">
                      整合多重篩選與關鍵字搜尋功能，優化數據檢索體驗。
                    </p>
                  </li>
                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">
                      組件開發：
                    </span>
                    <p className="ml-4">
                      基於 React-quill 客製化 WYSIWYG
                      編輯器組件，提升編輯靈活性。
                    </p>
                  </li>
                </ul>
              </div>
            </article>

            {/* 遊戲部落格*/}
            <article>
              <img
                src="./images/gp.png"
                className=" m-auto z-20 w-full h-[45dvh] object-cover"
              />
              <div className="flex flex-col gap-5 text-sm text-[#faf4ec]">
                <h3 className="text-base font-bold mt-3">
                  遊戲部落格 (React 、i18n)
                </h3>

                <ul className="list-disc list-inside gap-4 flex flex-col mb-10">
                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">
                      動畫效果 :
                    </span>
                    淡入淡出、序列式滑動
                  </li>

                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">RWD切版：</span>
                    適應跨裝置（PC/Tablet/Mobile）
                  </li>
                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">
                      LINE 整合：
                    </span>
                    串接 LINE LIFF SDK 實現自動登入與資料同步
                  </li>
                </ul>
              </div>
            </article>

            {/* 一頁式廣告*/}
            <article>
              <img
                src="./images/lp.png"
                className=" m-auto z-20 w-full h-[45dvh] object-cover"
              />
              <div className="flex flex-col gap-5 text-sm text-[#faf4ec]">
                <h3 className="text-base font-bold mt-3">
                  一頁式廣告 (Next、Mono-Repo(Lerna))
                </h3>

                <ul className="list-disc list-inside gap-4 flex flex-col mb-10">
                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">
                      針對頻繁的行銷活動需求，將落地頁拆解為可配置的共用元件與模組版型，提高後續開發效率
                    </span>
                  </li>
                </ul>
              </div>
            </article>

            {/* EDM*/}
            <article>
              <img
                src="./images/edm.png"
                className=" m-auto z-20 w-full h-[45dvh] object-cover"
              />
              <div className="flex flex-col gap-5 text-sm text-[#faf4ec]">
                <h3 className="text-base font-bold mt-3">
                  EDM (HTML table、inline CSS)
                </h3>

                <ul className="list-disc list-inside gap-4 flex flex-col mb-10">
                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">
                      負責多樣化 EDM 模組之開發與維護
                    </span>
                  </li>
                  <li className="hover:text-amber-100 transition-all duration-300">
                    <span className="font-bold text-green-100 ">
                      研究各類郵件客戶端渲染機制以提供跨裝置解決方案並建置模板，提升團隊開發效率
                    </span>
                  </li>
                </ul>
              </div>
            </article>
          </section>

          <div className="w-full flex flex-col justify-center items-center sticky bottom-2">
            <p className="font-semibold opacity-80 text-[56px] ">Project</p>
            <p className="text-xs">experience</p>
          </div>
        </section>
      </main>

      <footer className="w-full h-ful text-sm px-10 text-gray-500 bg-[#15160f] h-[100dvh] flex flex-col justify-center items-center gap-2">
        <img src="./images/rzlogo.png" className="w-10 h-10" />

        <div className="flex flex-col gap-2">
          <p className="font-semibold tracking-wide">
            E-mail: a0191042@yahoo.com.tw
          </p>
          <p className="font-semibold tracking-wide">Phone: 0913919906</p>
        </div>

        <span className="text-xs mt-5">
          * The 3D version is available on PC *
        </span>

        <span className="text-xs mt-5">© 2025 RZ Brain.</span>
      </footer>
    </>
  );
};

export default MobileLayout;
