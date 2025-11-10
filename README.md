# Career Bot

## 프로젝트 소개

Career Bot은 진로문장완성검사 진단 웹 서비스입니다. 사용자가 제공된 검사 문항에 대해 답변을 제시했을 때 전문가의 해석이 생성되고 수검자의 진로 성숙도를 판별합니다.

## 기능

*   **검사 문항 진행:** 사용자에게 진로문장완성검사 문항을 제시되고 사용자는 답변을 작성합니다.
*   **전문가 해석 생성:** 검사 결과를 분석하고 사용자의 답변에 대한 진로 전문가의 답변을 생성합니다.
*   **진로 성숙도 판별:** 검사 결과를 분석하고 사용자의 진로 성숙도 점수를 제공합니다.

## 기술 스택

*   **Frontend:** React
*   **State Management:** Redux Toolkit
*   **Routing:** React Router
*   **Styling:** CSS Modules
*   **HTTP Client:** Axios

## 프로젝트 구조

```
career-bot-front/
├── public/              # 정적 파일 (index.html, favicon 등)
├── src/
│   ├── components/      # 공통 컴포넌트 (로그인, 네비게이션 바 등)
│   ├── css/             # CSS 모듈 스타일시트
│   ├── hooks/           # 커스텀 훅 (e.g., useAxios)
│   ├── images/          # 이미지 파일
│   ├── redux/           # Redux 상태 관리
│   │   ├── slices/      # Redux Toolkit 슬라이스
│   │   └── store/       # Redux 스토어 설정
│   ├── routes/          # 페이지 컴포넌트 (Home, Test, Result 등)
│   ├── App.js           # 메인 애플리케이션 컴포넌트
│   └── index.js         # 애플리케이션 진입점
├── .gitignore
├── package.json
└── README.md
```

## 시작하기

### 1. 프로젝트 클론

```bash
git clone https://github.com/your-username/career-bot-front.git
cd career-bot-front
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 프로젝트 실행

```bash
npm start
```

애플리케이션이 `http://localhost:3000` 에서 실행됩니다.
