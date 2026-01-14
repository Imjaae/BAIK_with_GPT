# project_convention.md

본 문서는 BAIK 프론트엔드 프로젝트의 **핵심 개발 규칙**을 정의한다.  
AI(Codex)와 사람이 **동일한 기준으로 코드 생성·수정·리뷰**를 수행하기 위한 최소 규칙 집합이다.

기술 스택은 **Vue 3 + TypeScript + Pinia**를 사용한다.

---

## 0. 기본 설계 철학

- 코드의 목적은 **의도를 숨기지 않는 것**이다.
- 추측이 필요한 코드 작성은 허용하지 않는다.
- 전역 상태는 반드시 Store로 관리한다.
- 컴포넌트는 많이 만들지 말고 **재사용 가능하게** 만든다.

---

## 1. 전역 상태 관리 원칙

### 1.1 전역 상태는 Store로만 관리한다

다음에 해당하는 데이터는 반드시 Store에서 관리한다.

- 화면 간 공유 상태
- 선택된 항목
- 팝업 열림 여부
- 서버에서 받은 목록 / 상세 데이터

컴포넌트 내부에서 전역 상태를 직접 생성하는 것은 금지한다.

---

## 2. 디렉토리 구조 규칙

src/
├─ api/ # API 호출 전용
├─ stores/ # Pinia Store
├─ pages/ # 라우트 단위 화면
<< pages views 중 하나 정하기
├─ components/ # 재사용 컴포넌트
│ └─ popup/ # 공통 팝업
<< popup이 아니라 modal # 공통 모달로 수정
├─ assets/
└─ utils/
<< services 추가

yaml
코드 복사

### 역할 정의
- pages : “화면”
<< views vs pages 정하기
- components : “조각”
<< components : "화면 내 재사용되는 요소들"
- stores : “상태 + 비즈니스 흐름”
- api : “서버 통신만 담당”
<< assets : "css, img 파일들 보관"
<< utils : "파일처리, 페이지네이션 등 범용 함수"
<< services : "화면영역에서 전달받은 파라미터로 api함수 호출, utils 함수호출 등을 하고 반환값을 스토어에 반영하는 역할"
---

<< ### 전체 흐름
<< 화면 > services > 지역함수,utils함수 > api 호출 > 백엔드 > 반환받은 값 store에 반영 > store의 반영된 값을 감지해서 화면에서 리렌더링

## 3. Vue 컴포넌트 작성 규칙

### 3.1 `<script setup>` 방식만 사용한다

```vue
<script setup lang="ts">
</script>
옵션 API 사용은 금지한다.

3.2 <style scoped> 기본 사용
vue
코드 복사
<style scoped>
.bus_item { }
</style>
class는 kebab-case 사용

전역 스타일은 최소화한다

4. 변수 네이밍 규칙
4.1 전역 반응형 변수 접두사 g_
컴포넌트 내부의 반응형 변수(ref, computed)는 g_ 접두사를 붙인다.

샘플코드
const g_bus_list = ref([]);
const g_selected_bus_key = ref<number | null>(null);
const g_bus_store = useBusStore();
g_는 “이 값은 컴포넌트 전체 흐름에 영향을 준다”는 의미이다.

4.2 추상적인 이름 사용 금지
다음과 같은 이름은 사용하지 않는다.

❌ payload
❌ data
❌ result
❌ response

의미가 드러나는 이름을 사용한다.

⭕ bus_key
⭕ bus_key_list
⭕ station_detail

5. 함수 명명 규칙
5.1 이벤트 함수
유형	규칙	예시
버튼 클릭	onBtn + 대상 + 동사	onBtnBusAdd
일반 클릭	onClick + 대상	onClickBusRow
제출	onSubmit	onSubmitBusForm

샘플코드
function onBtnBusAdd() {}
function onClickBusRow(bus_key: number) {}

5.2 API 호출 함수
api 폴더에서만 정의한다

req + 동사 + 대상 형식을 사용한다
<< req vs api

샘플코드
reqBusList()
reqBusDetail(bus_key)
reqDeleteBus(bus_key)

6. Store 관리 규칙 (중요)
6.1 서버 데이터와 화면 데이터를 분리한다

샘플코드
// 서버 원본 데이터
const server_bus_list = ref<BusDto[]>([]);
<< const g_SS_bus_list = ref<SSBus[]>([]);
// 화면 표시용 데이터
const bus_list = ref<ViewBus[]>([]);
<< const g_view_bus_list = ref<Bus[]>([]);

6.2 데이터 변환은 Store 내부에서만 수행한다

샘플코드
function editBusList() {
  bus_list.value = server_bus_list.value.map(bus => ({
    bus_key: bus.bus_key,
    bus_name: bus.bus_name,
    is_selected: false,
  }));
}
화면 컴포넌트에서 map / filter 사용을 금지한다.

6.3 Store Action 흐름

샘플코드
async function fetchBusList() {
  server_bus_list.value = await reqBusList();
  editBusList();
}
항상 다음 흐름을 따른다.

API 호출 → server 데이터 저장 → edit 함수 → 화면 데이터 반영

<< 156~163
샘플코드
service함수
async function setSSBusList() {
  SS_bus_list = await apiGetBusList();
  stoSetBusList(SS_bus_list);
}

store함수
async 


7. API 사용 규칙
7.1 API 응답을 가공하지 않는다
ts
코드 복사
// 금지
return response.data.list.map(...);

// 허용
return response.data;
7.2 반환 데이터 구조는 명확하게 작성한다
ts
코드 복사
export interface BusListResponse {
  bus_key_list: number[];
  bus_list: BusDto[];
}
8. 컴포넌트 분리 규칙
8.1 재사용 가능한 컴포넌트 우선
팝업은 공통 컴포넌트로 작성한다

옵션(props)으로 동작을 제어한다

❌ BusDeletePop.vue
❌ BusConfirmPop.vue

⭕ CommonConfirmPop.vue

9. Props & Emit 규칙
Props
camelCase 사용

ts
코드 복사
defineProps<{
  busKey: number;
  visible: boolean;
}>();
Emit
on + PascalCase

ts
코드 복사
const emit = defineEmits(['onConfirm', 'onCancel']);
템플릿에서는 kebab-case 사용

vue
코드 복사
<CommonConfirmPop @on-confirm="onConfirmDelete" />
10. 샘플 코드
vue
코드 복사
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useBusStore } from '@/stores/busStore';

const g_bus_store = useBusStore();
const g_selected_bus_key = ref<number | null>(null);

function onClickBusRow(bus_key: number) {
  g_selected_bus_key.value = bus_key;
}

onMounted(() => {
  g_bus_store.fetchBusList();
});
</script>

<style scoped>
.bus_row {
  cursor: pointer;
}
</style>
11. Codex 사용 기준
모든 프론트엔드 코드는 본 문서를 최상위 규칙으로 따른다.

네이밍, Store 구조, 컴포넌트 분리는 이 문서를 기준으로 한다.

