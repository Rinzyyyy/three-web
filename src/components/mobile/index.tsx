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
    }
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
                  }
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

            <p className="text-sm leading-[200%] mt-5 mb-2 pr-[68px] pl-3">
              建構模組化架構，設計共用元件，提升開發效率並降低維護成本。
              並重視使用者與開發者反饋，樂於討論及思考如何優化使用者體驗與開發體驗。
            </p>

            {frontEndArticle.content.map((item, index) => (
              <div key={`${item.subtitle}-${index}`} className="pr-[68px] pl-3">
                <h2 className="text-sm leading-[200%] text-[#93e8f9]">
                  {item.subtitle}
                </h2>
                <p className="text-sm leading-[150%] text-[#f9bc70]">
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

            <p className="text-sm leading-[200%] mt-5 mb-2 px-[68px]">
              具前後端整合經驗 <br />
              協作梳理業務邏輯，開發電商平台API <br />
              如會員註冊與登入及商品資料。
            </p>

            {BackEndArticle.content.map((item, index) => (
              <div key={`${item.subtitle}-${index}`} className="px-[68px]">
                <h2 className="text-sm leading-[200%] text-[#23bcdf]">
                  {item.subtitle}
                </h2>
                <p className="text-sm leading-[150%] text-[#c19663]">
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

            <p className="text-sm leading-[200%] mt-5 px-[68px]">
              多元專案經歷，遊戲平台、B2B/B2C多語系電商平台、平台內部後台系統、一頁式活動頁、EDM。
            </p>
          </article>

          <article className=" p-[20px] flex flex-col gap-5 text-slate-200 text-3xl font-semibold tracking-wide h-full overflow-scroll hidden-scrollbar">
            <img src="./images/ec.png" className=" m-auto z-20" />
            <img src="./images/db.png" className=" m-auto z-20" />
            <img src="./images/gp.png" className=" m-auto z-20" />
            <img src="./images/lp.png" className=" m-auto z-20" />
            <img src="./images/edm.png" className=" m-auto z-20" />
          </article>

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
