import React, { useState, useEffect } from "react";
import "styles/Admin.css";
import CurrentDateTime from "components/CurrentDateTime";
import Man from "assets/images/Man.svg";
import Woman from "assets/images/Woman.svg";
import Couple from "assets/images/Couple.svg";
import Title from "assets/images/Title.svg";
import Tiger from "assets/images/Tiger.svg";
import Call from "assets/images/Call.svg";
import Timeout from "assets/images/Timeout.svg";
import Door from "assets/images/Door.svg";

export let Box = ({
  number,
  value,
  isSelected,
  person,
  time,
  onBoxClick,
  onButtonClick,
  exitRequested,
}) => {
  const initialBoxOptions = {
    man: { color: "#80C2FF", image: Man, alt: "Man" },
    woman: { color: "#FF8FD2", image: Woman, alt: "Woman" },
    mix: { color: "#FFC555", image: Couple, alt: "Couple" },
    join: { color: "#DD7DFF", image: Couple, alt: "Couple" },
    empty: { color: "#C8C8C8", image: null, alt: "" },
  };

  let [boxOptions, setBoxOptions] = useState(initialBoxOptions);
  let [selectedBox, setSelectedBox] = useState(null);
  let [selectedBoxes, setSelectedBoxes] = useState([]);

  const { color, image } = boxOptions[value] || boxOptions.empty;

  const boxStyle = {
    backgroundColor: color,
    position: "relative",
  };

  const imgStyle = {
    position: "absolute",
    marginTop: "20px",
    marginLeft: "-40px",
    width: "60px",
    height: "60px",
  };

  const personnumberStyle = {
    position: "absolute",
    marginTop: "28px",
    marginLeft: "30px",
    fontSize: "4rem",
    fontWeight: "800",
  };
  const buttonStyle = {
    backgroundColor: isSelected ? "black" : color,
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    left: "120px",
  };
  const timeStyle = {
    position: "absolute",
    marginTop: "75px",
    marginLeft: "-32px",
    fontSize: "2.5rem",
    fontWeight: "800",
  };

  const handleButtonClick = (event, boxNumber) => {
    event.stopPropagation();
    onButtonClick(event, number);
  };

  return (
    <div
      className="box"
      style={{
        ...boxStyle,
        ...(time === "00:00" || exitRequested
          ? { backgroundColor: "#fff" }
          : {}),
      }}
      onClick={() => onBoxClick(number)}
    >
      <span className="box-number">{number}번</span>
      {image && <img src={image} style={imgStyle} />}
      <button style={buttonStyle} onClick={handleButtonClick}></button>
      {person !== 0 && person !== "0" && (
        <span style={personnumberStyle}>{person} </span>
      )}
      <span style={timeStyle}>{time} </span>
      {time === "00:00" && !exitRequested && (
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              zIndex: "1",
            }}
          />
          <img
            src={Timeout}
            style={{ ...imgStyle, zIndex: "2" }}
            alt="Time Out"
          />
        </div>
      )}
      {exitRequested && (
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              zIndex: "1",
            }}
          />
          <img src={Door} style={{ ...imgStyle, zIndex: "2" }} alt="Door" />
        </div>
      )}
    </div>
  );
};

function Admin() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [boxtext, setBoxText] = useState("");
  {
    /*  TODO: 박스 value 관련 연결 */
  }
  let boxData = Array.from({ length: 30 }, (_, index) => {
    const number = index + 1;
    const value =
      index % 6 === 0
        ? "woman"
        : index % 6 === 1
        ? "man"
        : index % 6 === 2
        ? "mix"
        : index % 6 === 3
        ? "join"
        : "empty";

    {
      /*  TODO: 각 박스 별 시간연결 */
    }
    const person = value === "empty" ? "" : value === "mix" ? "3" : "2";
    let time = "";
    if (value === "mix") {
      time = "00:00";
    } else if (value === "man") {
      time = "21:30";
    } else if (value === "woman") {
      time = "22:45";
    } else {
      time = "";
    }
    return { number, value, person, time };
  });

  const boxesPerRow = 6;
  const totalRows = Math.ceil(boxData.length / boxesPerRow);

  const arrangedBoxData = Array.from({ length: totalRows }, (_, rowIndex) => {
    const start = rowIndex * boxesPerRow;
    const end = start + boxesPerRow;
    const rowBoxes = boxData.slice(start, end);
    return rowBoxes;
  });

  const handleBoxClick = (boxNumber) => {
    setSelectedBox(boxNumber);
    const selectedBoxText = `${boxNumber}번 테이블`;
    setBoxText(selectedBoxText);
    openPopup("box");
  };

  const [isButtonSelected, setIsButtonSelected] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleButtonClick = (event, boxNumber) => {
    event.stopPropagation();

    if (selectedBoxes.includes(boxNumber)) {
      setSelectedBoxes(selectedBoxes.filter((number) => number !== boxNumber));
    } else {
      setSelectedBoxes([...selectedBoxes, boxNumber]);
    }
  };

  const handleAllClick = () => {
    setIsButtonSelected((prevIsButtonSelected) => !prevIsButtonSelected);
  };

  useEffect(() => {
    if (isButtonSelected) {
      const allBoxNumbers = Array.from({ length: 30 }, (_, index) => index + 1);
      setSelectedBoxes(allBoxNumbers);
    } else {
      const allBoxNumbers = Array.from({ length: 30 }, (_, index) => index + 1);
      setSelectedBoxes([]);
    }
  }, [isButtonSelected]);

  const [isTimePlusVisible, setTimePlusVisible] = useState(false);
  const [isHeartPlusVisible, setHeartPlusVisible] = useState(false);
  const [isTableExitVisible, setTableExitVisible] = useState(false);
  const [isTableMixVisible, setTableMixVisible] = useState(false);
  {
    /*  TODO: 알람데이터 연결 */
  }
  let [alarmData, setAlarmData] = useState([
    {
      alarm: "[합석처리] 1번, 2번 테이블의 합석처리를 진행해주세요.",
      time: "19:20",
    },
    {
      alarm: "[하트충전] 4번 테이블의 하트 N개를 충전해주세요.",
      time: "19:20",
    },
    {
      alarm: "[직원 호출] 9번 테이블에서 직원을 호출했습니다.",
      time: "19:20",
    },
    {
      alarm: "[테이블 비우기] 5번 테이블을 비워주세요.",
      time: "19:20",
    },
    {
      alarm: "[테이블 비우기] 4번, 16번 시간이 초과되었습니다.",
      time: "19:20",
    },
  ]);

  const getColor = (alarmDataItem) => {
    const alarmPattern = /\[(.*?)\]/;
    const match = alarmDataItem.alarm.match(alarmPattern);

    if (match && match.length >= 2) {
      const extractedAlarmType = match[1];

      if (extractedAlarmType.includes("합석처리")) {
        return "#DD7DFF";
      } else if (extractedAlarmType.includes("하트충전")) {
        return "#FF8FD2";
      } else if (extractedAlarmType.includes("직원 호출")) {
        return "#FFC555";
      } else if (extractedAlarmType.includes("테이블 비우기")) {
        return "#C8C8C8";
      }
    }

    // 알람 타입이 일치하지 않는 경우 기본 색상 반환
    return "#000";
  };
  const onDelete = (index) => {
    // 삭제 로직을 구현합니다.
    // 예를 들어, alarmData 배열에서 index에 해당하는 항목을 제거할 수 있습니다.
    const updatedAlarmData = [...alarmData];
    updatedAlarmData.splice(index, 1);
    // 업데이트된 alarmData를 사용하도록 설정합니다.
    setAlarmData(updatedAlarmData);
  };

  const CurrentDateTime = () => {
    let [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    const formattedDateTime = currentDateTime.toLocaleString();

    return (
      <div>
        <p>{formattedDateTime}</p>
      </div>
    );
  };

  const [value, setValue] = useState(0);

  const increaseValue = () => {
    setValue(value + 10);
  };

  const decreaseValue = () => {
    setValue(value - 10);
  };

  const upValue = () => {
    setValue(value + 1);
  };

  const downValue = () => {
    setValue(value - 1);
  };

  const handlePopupClick = (type) => {
    if (selectedBoxes.length > 0) {
      openPopup(type);
    }
  };

  // 모달 팝업 열기 함수
  const openPopup = (type) => {
    setPopupType(type);
    toggleModal();
  };

  // 모달 팝업 닫기 함수
  const closePopup = () => {
    setPopupType(null);
    toggleModal();
    setSelectedBoxes([]);
    setValue(0);
  };
  const [selectedOption, setSelectedOption] = useState("1");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const exitPopup = () => {
    setPopupType(null);
    toggleModal();
  };

  const switchPopupClick = (type) => {
    exitPopup();
    setTimeout(() => {
      setPopupType(type);
    }, 0);
  };

  return (
    <div className="admin_body">
      <div class="v-line"></div>
      <div class="h-line1"></div>
      <div class="h-line2"></div>
      <div class="h-line3"></div>
      <div class="h-line4"></div>
      <div class="h-line5"></div>
      <div class="h-line6"></div>
      <header>
        <div class="admin_header">
          <div class="main-title">
            <img className="title-tiger" src={Tiger} alt="Tiger"></img>
            <img src={Title} alt="Title"></img>
          </div>
          <div className="digital-clock">
            <CurrentDateTime />
          </div>
        </div>
        <div class="title-alarm">
          <p class="title-notice">
            <strong>NOTICE</strong>
          </p>
          <img class="title-bell" src={Call} alt="Call Image" />
        </div>
        {/* TODO: 알람 데이터 연결 */}

        <div className="alarm-container">
          {alarmData.map((item, index) => {
            const color = getColor(item);
            return (
              <div key={index} className="alarm-item" style={{ color: color }}>
                <button className="alarmdel" onClick={() => onDelete(index)}>
                  x
                </button>
                <br />
                <p>{item.alarm}</p>
                <p>{item.time}</p>
              </div>
            );
          })}
        </div>
        <div class="bottom-line"></div>
      </header>
      <div class="table-list">
        {/* 각 테이블에 해당하는 인원수 데이터 연결 */}
        <div class="tableman">5</div>
        <div class="tablewom">5</div>
        <div class="tablecou">5</div>
        <div class="tablemix">5</div>
        <div class="tableemp">10</div>
      </div>

      <div class="admin_nav">
        <div class="info_table1">
          <p class="info_title">남자 T</p>
        </div>

        <div class="info_table2">
          <p class="info_title">여자 T</p>
        </div>

        <div class="info_table3">
          <p class="info_title">혼성 T</p>
        </div>

        <div class="info_table4">
          <p class="info_title">합성 T</p>
        </div>

        <div class="info_table5">
          <p class="info_title">&nbsp;빈 T</p>
        </div>
      </div>

      <div class="box-lists">
        <div className="table-container">
          {Array.from({ length: boxesPerRow }, (_, columnIndex) => (
            <div className="table-column" key={columnIndex}>
              {Array.from({ length: totalRows }, (_, rowIndex) => {
                const boxIndex = rowIndex * boxesPerRow + columnIndex;
                const box = boxData[boxIndex];
                if (box) {
                  return (
                    <Box
                      key={box.number}
                      number={box.number}
                      value={box.value}
                      person={box.person}
                      time={box.time}
                      isSelected={selectedBoxes.includes(box.number)}
                      onBoxClick={handleBoxClick}
                      onButtonClick={handleButtonClick}
                    />
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
      </div>
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            {popupType === "box" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-box">
                  <div className="boxtitle">
                    <div className="close-button" onClick={closePopup}>
                      x
                    </div>
                    <h2 className="boxname">{boxtext}</h2>
                  </div>

                  <div className="contentposi">
                    <div className="boxcontent">
                      <span className="boxvalue">인원수 : n</span>
                      {/*  TODO: 인원수 연결 */}
                      <br />
                      {/*  TODO: 입장,퇴장 시간연결 */}
                      <span className="boxvalue">입장시간 : 19:30</span>
                      <br />
                      <span className="boxvalue">퇴장시간 : 21:00</span>
                    </div>
                    {/*  TODO: table 컨트롤 관련 연결 */}
                    <div className="boxbuttons">
                      <button
                        className="boxbtn"
                        onClick={() => switchPopupClick("time")}
                      >
                        시간추가
                      </button>
                      <button
                        className="boxbtn"
                        onClick={() => switchPopupClick("heart")}
                      >
                        하트추가
                      </button>
                      <button
                        className="boxbtn"
                        onClick={() => switchPopupClick("exit")}
                      >
                        퇴장처리
                      </button>
                      <button
                        className="boxbtn"
                        onClick={() => switchPopupClick("mix")}
                      >
                        합석처리
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/*  TODO: table 컨트롤 관련 연결 */}
            {popupType === "time" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-content">
                  <div className="close-button" onClick={closePopup}>
                    x
                  </div>
                  <h2 className="classname">
                    {selectedBoxes.join(", ")}번 테이블
                  </h2>

                  <div className="content-area">
                    <button className="adjust-button" onClick={decreaseValue}>
                      -
                    </button>
                    <span className="value">{value}분</span>
                    <button className="adjust-button" onClick={increaseValue}>
                      +
                    </button>
                  </div>
                  <button className="plus-button" onClick={closePopup}>
                    시간추가
                  </button>
                </div>
              </div>
            )}
            {popupType === "heart" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-content">
                  <div className="close-button" onClick={closePopup}>
                    x
                  </div>
                  <h2 className="classname">
                    {selectedBoxes.join(", ")}번 테이블
                  </h2>

                  <div className="content-area">
                    <button className="adjust-button" onClick={downValue}>
                      -
                    </button>
                    <span className="value">{value}개</span>
                    <button className="adjust-button" onClick={upValue}>
                      +
                    </button>
                  </div>
                  <button className="plus-button" onClick={closePopup}>
                    하트추가
                  </button>
                </div>
              </div>
            )}
            {popupType === "exit" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-content">
                  <div className="close-button" onClick={closePopup}>
                    x
                  </div>
                  <h2 className="classname">
                    {selectedBoxes.join(", ")}번 테이블
                  </h2>

                  <div className="content-area">
                    <span className="content">
                      <br />
                      퇴장처리하시겠습니까?
                    </span>
                  </div>
                  <button className="plus-button" onClick={closePopup}>
                    퇴장처리
                  </button>
                </div>
              </div>
            )}
            {popupType === "mix" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-content">
                  <div className="close-button" onClick={closePopup}>
                    x
                  </div>
                  <h2 className="classname">
                    {selectedBoxes.join(", ")}번 테이블
                  </h2>

                  <div className="content-area">
                    <span className="content">
                      <div>몇 번 테이블로 </div>
                      <div>합석처리하시겠습니까?</div>
                    </span>
                  </div>
                  <div>
                    <select
                      className="select"
                      value={selectedOption}
                      onChange={handleChange}
                    >
                      {[...Array(30)].map((_, index) => (
                        <option key={index + 1} value={String(index + 1)}>
                          {index + 1}번
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="plus-button" onClick={closePopup}>
                    합석처리
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="admin-footer">
        <div className="footer-button">
          <button
            className="time-plus"
            onClick={() => {
              handlePopupClick("time");
            }}
          >
            시간 추가
          </button>
          <button
            className="heart-plus"
            onClick={() => {
              handlePopupClick("heart");
            }}
          >
            하트 충전
          </button>
          <button
            className="table-exit"
            onClick={() => {
              handlePopupClick("exit");
            }}
          >
            퇴장 처리
          </button>
          <button
            className="table-mix"
            onClick={() => {
              handlePopupClick("mix");
            }}
          >
            합석 처리
          </button>
          <button class="table_choice" onClick={handleAllClick}>
            테이블 선택
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
