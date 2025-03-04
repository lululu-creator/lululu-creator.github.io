# JavaScript中的闭包

## 闭包的概念与特性

闭包是JavaScript中一个强大的特性，它通过函数实现，具有以下特点：

- 避免变量全局污染
- 数据私有化，保护内部状态
- 允许外部访问内部私有数据
- **最关键特点**：使变量能够驻留在内存中而不被垃圾回收

## 闭包示例与解析

### 1. 普通函数的行为

普通函数在执行完毕后会释放其内部变量的内存。

```javascript
<script>
    let a = 10;
    // 定义一个函数，使a自增并且打印a
    function fn(){
        a++;
        console.log(a);
    }
    fn(); // 输出: 11
    fn(); // 输出: 12
    fn(); // 输出: 13
</script>
```

这种方式中，`a`是全局变量，每次函数调用后都会改变其值。这种实现方式存在以下问题：

- 全局变量可能被其他代码意外修改
- 容易发生变量命名冲突

例如，当代码中其他地方重新定义了变量`a`：

```javascript
<script>
    let a = 10;
    // 中间的其他代码...
    let a = 100; // 重新定义a（在严格模式下会报错）
    // 中间的其他代码...
    
    function fn(){
        a++;
        console.log(a);
    }
    fn(); // 输出: 101
    fn(); // 输出: 102
    fn(); // 输出: 103
</script>
```

函数行为会因全局变量的改变而产生意外结果。

### 2. 闭包的实现方式

闭包通过函数嵌套和返回内部函数实现：

```javascript
<script>
    function fn(){
        let a = 10; // 私有变量，被内部函数引用
        return () => {
            a++;
            console.log(a);
        }
    }
    
    let f = fn(); // 获取内部函数，此时a已被定义但不会被回收
    f(); // 输出: 11
    f(); // 输出: 12
    f(); // 输出: 13
</script>
```

![闭包执行过程示意图1](/articles/frontend/close1.png)
![闭包执行过程示意图2](/articles/frontend/close2.png)

### 闭包的优势

1. **数据封装与隐私保护**：变量 `a` 无法从外部直接访问或修改
2. **状态保持**：变量 `a` 在多次函数调用之间保持状态
3. **避免全局命名空间污染**：即使外部定义了同名变量，也不会影响闭包内的变量

### 注意事项

**重要警告**：闭包的最大优点也是它的最大缺点 - 如果使用不当，可能导致内存泄漏。当不再需要闭包时，应确保解除对它的引用（例如：`f = null`），以便垃圾回收器能够回收其占用的内存。

## 实际应用场景
```javascript
<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
    <script>
        var lis=document.getElementsByTagName('li');
        for(var i=0;i<lis.length;i++){
            lis[i].onclick=function(){
                alert(i);
            }
        }//这样的话无论点击哪一个li，最终都会alert`4`
    </script>
</body>
```
### 解决方法：
* 使用let代替var
* 或者**使用闭包**
```javascript
<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
    <script>
        var lis=document.getElementsByTagName('li');
        for(var i=0;i<lis.length;i++){
            (function(i){
                lis[i].onclick=function(){
                    alert(i);
                }
            })(i)
        }
    </script>
</body>
```
通过合理使用闭包，可以编写出更加模块化、可维护的JavaScript代码。