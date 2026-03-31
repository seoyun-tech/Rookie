# CLAUDE.md — 루키즈 (Rookids) 키즈 OTT 서비스

## 프로젝트 개요

**프로젝트명:** 루키즈 (Rookids) — 만 13세 미만 아이들을 위한 OTT 서비스
**기간:** 2026.03.24(화) ~ 2026.04.03(금) | 주말 제외 총 9일
**주요 타겟:** 키즈 (만 4–7세) / 주니어 (만 8–12세)
**AI 캐릭터:** AI 가이드 '루' — 친절하고 활기차게 맞춤 콘텐츠 추천

---

## 팀 구성 & 숙련도

- 팀 구성 : 3명
- 코딩 숙련도: **초급**
- **디자인 역량 80% / 코딩 역량 20%**
- 코드 구현은 **Gemini CLI / Claude CLI 바이브 코딩**으로 수행

---

## 기술 스택

### 기획 & 디자인
- Google Stitch (자연어 UI 아이데이션)
- Figma (디자인 시스템)

### 프론트엔드
- React 19
- Tailwind CSS v4
- React Router v7
- react-player
- Axios
- FontAwesome
- tailwind-merge

### 백엔드 & AI
- Python FastAPI
- HuggingFace Qwen2.5-72B-Instruct
- TMDB API
- 생성형 AI 비디오

### 인프라 & 도구
- Gemini CLI (Git + 바이브 코딩)
- Claude CLI (바이브 코딩)
- Render (배포)
- 모노레포 구조: `frontend/` + `backend/`

---

## 수행 프로세스 (총 9일)

| 단계 | 기간 | 내용 |
|------|------|------|
| 기획 | 2일 | 서비스 방향성 및 요구사항 정의 |
| 디자인 | 3일 | UI/UX 디자인 및 디자인 시스템 구축 |
| 구현 | 3일 | 프론트엔드 및 백엔드 개발 (Gemini CLI / Claude CLI 활용) |
| 검토 + 배포 | 1일 | 최종 테스트 및 Render 배포 |

---

## 핵심 워크플로우
```
Stitch 자연어 UI 생성
    ↓
Figma 내보내기 + 다듬기
    ↓
Gemini CLI / Claude CLI로 React 코드 생성
    ↓
Render 배포
```

---

## 배포 구조
```
monorepo/
├── frontend/   # React 19 + Tailwind CSS v4
└── backend/    # Python FastAPI + AI
```

배포 플랫폼: **Render**

---

## 바이브 코딩 가이드라인

> Gemini CLI 또는 Claude CLI에 자연어로 지시하고,
> 생성된 코드를 반드시 검토한 뒤 커밋하는 흐름을 유지하세요.

- 컴포넌트 단위로 작업 요청할 것
- Tailwind 클래스는 `tailwind-merge`로 충돌 방지
- API 호출은 Axios + TMDB API 기준으로 통일
- FastAPI 엔드포인트 변경 시 프론트/백 동시 확인
- 코드 생성 후 반드시 동작 확인 후 다음 단계로 진행

---

## 규칙

1. **한국어로만 응답** (영어 응답 금지)
2. **식별자는 짧게** 작성
3. **단계별로 작업 수행** (한 번에 하나씩)