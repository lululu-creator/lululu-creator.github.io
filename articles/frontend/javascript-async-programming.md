# JavaScript中的异步编程详解

## 什么是异步编程？

在JavaScript中，异步编程是处理可能耗时较长操作的一种方式，避免阻塞主线程。Web应用中的许多操作都是异步的，比如：
- API请求获取数据
- 文件操作
- 定时器
- 用户输入

## 常用的异步处理方法

### 1. 回调函数

最早的异步处理方式，通过将函数作为参数传递来处理异步操作完成后的逻辑：

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "JavaScript异步编程" };
    callback(data);
  }, 1000);
}

fetchData(function(data) {
  console.log(data.name); // JavaScript异步编程
});