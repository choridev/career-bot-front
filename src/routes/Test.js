import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import { Card, Form, Button, Modal, Spinner } from "react-bootstrap";
import Navbars from "../components/Navbars";
import styles from "../css/Test.module.css";

function Test() {
  const studentId = localStorage.getItem("student-id");

  const navigate = useNavigate();
  const questions = useSelector((state) => state.questions);

  const [currentIndex, setCurrentIndex] = useState(0); // 현재 문항 인덱스
  const [userResponses, setUserResponses] = useState(["", ""]); // 사용자의 답변 (최대 2개)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { responseData, error, isLoading, request } = useAxios({
    method: "POST",
    url: `api/students/${studentId}/questions/${currentIndex + 1}/answers/`,
    requestData: {
      answer1: userResponses[0],
      ...(questions[currentIndex].content.match(/_/g)?.length > 1 && {
        answer2: userResponses[1],
      }), // _가 2개 이상인 경우에만 answer2 추가
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 서버 전송 및 응답 대기
    await submitResponse();

    // 마지막 문항인지 확인
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserResponses(["", ""]); // 입력 필드 초기화
    } else {
      // 마지막 문항의 응답을 받은 후 결과 페이지로 이동
      navigate("/result");
    }
  };

  const submitResponse = async () => {
    setIsModalVisible(true); // 모달 표시
    await request(); // 서버에 사용자의 답변 전송
    setIsModalVisible(false); // 응답을 받은 후 모달 숨김
  };

  const handleInputChange = (index, value) => {
    const newResponses = [...userResponses];
    newResponses[index] = value;
    setUserResponses(newResponses);
  };

  return (
    <>
      <Navbars />
      <Card className={styles.guideCard}>
        <Card.Body>
          다음에 기술된 문항들은 뒷부분 또는 중간이 빠져있습니다. 각 문장을
          읽으면서 맨 먼저 떠오르는 생각이나 느낌을 빈칸에 기록하여 문장이
          되도록 완성하여 주십시오. 시간 제한은 없으나 가능한 한 빨리 기록하여
          주십시오.
        </Card.Body>
      </Card>
      <Card className={styles.sentenceCard}>
        <Card.Body>
          {questions.length > 0 ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>{questions[currentIndex].content}</Form.Label>
                {questions[currentIndex].content.match(/_/g)?.length === 1 ? (
                  <Form.Control
                    type="text"
                    value={userResponses[0]}
                    onChange={(e) => handleInputChange(0, e.target.value)}
                    required
                  />
                ) : (
                  <>
                    <Form.Control
                      type="text"
                      value={userResponses[0]}
                      onChange={(e) => handleInputChange(0, e.target.value)}
                      required
                    />
                    <Form.Control
                      className={styles.secondInput}
                      type="text"
                      value={userResponses[1]}
                      onChange={(e) => handleInputChange(1, e.target.value)}
                      required
                    />
                  </>
                )}
              </Form.Group>
              <div className={styles.submitBtnBox}>
                <Button type="submit">제출하기</Button>
              </div>
            </Form>
          ) : (
            <p>문항이 없습니다.</p>
          )}
        </Card.Body>
      </Card>
      <Modal show={isModalVisible} backdrop="static" keyboard={false} centered>
        <Modal.Body className={styles.modalBody}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className={styles.loadingNotice}>
            답변을 서버로 전송 중입니다. 잠시만 기다려 주세요...
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Test;
