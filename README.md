## 仿造jira项目
### 技术栈

- react/react-hook
- typescript
- emotion/styled
- emotion/react

codesandBox.io/s/keen-wave-tlz9s?file=/src/App.js
codesandBox.io/s/upbeat-wood-bum3j?file=/src/index.js
<!-- useState传入函数的意义是，惰性初始化state，用useState保存函数，不能直接传入函数 -->
codesandBox.io/s/blissful-water-230u4?file=/src/App.js

useMemo和useCallback都是为了依赖存在的，也就是非基本类型。
非基本类型需要做依赖的话，就需要useMemo或者useCallBack
写自定义hook的时候，可以使用useCallBack

const f = () => d; const d = 1
这时候不会报错
const f = () => d; d(); const d = 1
这时候就会报错了

useState适合定义单个的状态
useReducer适合定义多个互相影响的状态