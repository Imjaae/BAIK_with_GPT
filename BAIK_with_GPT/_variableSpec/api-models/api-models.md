# API 모델 정의 안내

본 문서는 BAIK 서비스의 API 모델 구조에 대한 안내 문서이다.  
실제 API 요청/응답 구조의 기준은 `_variableSpec/api-models` 폴더 내의 **Python 파일(.py)** 이다.

이 문서는 모델의 역할과 사용 기준을 설명하며,  
각 모델의 상세 필드 정의는 개별 `.py` 파일을 직접 참고한다.

---

## 기본 원칙

- `_variableSpec/api-models` 폴더의 `.py` 파일이 **API 스펙의 단일 기준(Source of Truth)** 이다.
- 이 폴더의 Python 파일들은 **실행 목적이 아닌 구조 정의 목적**으로 사용된다.
- 프론트엔드 화면 개발 시, API 응답 데이터 구조는 이 모델 정의를 그대로 따른다.
- 필드 추가, 삭제, 타입 추측은 허용하지 않는다.

---

## 모델 파일 구성

### 버스 관련 모델
- `bus_model.py`  
  버스 기본 정보 모델
- `busarrival_model.py`  
  정류장 기준 실시간 도착 버스 정보 모델
- `busgroup_model.py`  
  버스 그룹 / 묶음 정보 모델
- `busstop_model.py`  
  버스 정류장 정보 모델

### 경로 / 구간 관련 모델
- `gugan_model.py`  
  경로 내 이동 구간 정보 모델

### 전철 관련 모델
- `subway_model.py`  
  전철역 및 전철 도착 정보 모델

### 목적지 / 주변 정보 모델
- `shop_model.py`  
  식당, 카페, 은행, 병원 등 장소(상점) 정보 모델

### 도로 교통 정보 모델
- `roadinfo_model.py`  
  실시간 도로교통 정보(혼잡, 사고, 지연 등) 모델

### 안양시 소식 / 페이지 관련 모델
- `ssnews_model.py`  
  안양시 소식 데이터 모델
- `sspage_model.py`  
  페이지 단위 데이터 모델
- `sspagelog_model.py`  
  페이지 조회 및 로그 정보 모델

---

## 화면과 API 모델의 관계

- 각 화면에서 사용하는 API 모델은 `screen-list.md`의 화면 설명을 기준으로 판단한다.
- 화면 구현 시 필요한 데이터 구조는:
  1. `screen-list.md`에서 화면의 목적을 확인하고
  2. 해당 목적에 맞는 모델 `.py` 파일을 참고하여
  3. 프론트엔드 코드에 반영한다.

---

## Codex 사용 기준

- Codex는 API 응답 구조를 추측하지 않는다.
- 반드시 `_variableSpec/api-models` 폴더의 Python 모델을 참고하여 구현한다.
- 동일한 의미의 데이터라도 모델에 정의되지 않은 필드는 생성하지 않는다.
