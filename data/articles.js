/**
 * ============================================
 *   博客文章数据文件
 * ============================================
 *
 * 【小白使用指南】
 *
 * 要添加新文章，只需要在下面的 BLOG_ARTICLES 数组里
 * 复制一个文章对象（花括号 {...} 包裹的部分），
 * 然后修改里面的内容就行了。
 *
 * 每个字段的含义：
 *   id           → 文章编号，每篇文章必须不同（1, 2, 3...递增即可）
 *   title        → 文章标题
 *   category     → 分类标识（只能填：frontend / backend / learning / life）
 *   categoryName → 分类显示名（如：前端开发、后端技术、学习方法、生活随笔）
 *   date         → 发布日期，格式：YYYY-MM-DD
 *   readTime     → 预计阅读时间
 *   views        → 阅读量（纯展示用，可以随便填）
 *   excerpt      → 文章摘要（显示在卡片上的简短描述）
 *   tags         → 文章标签（用英文逗号分隔，放在方括号 [] 里）
 *   emoji        → 卡片上显示的图标（一个 emoji 表情）
 *   gradient     → 卡片背景渐变色（可以从下面的预设里选一个）
 *   featured     → 是否在首页"精选文章"展示（true = 是，false = 否，首页最多展示 3 篇）
 *   content      → 文章正文（使用 HTML 格式，详见下方说明）
 *
 * 【渐变色预设，可直接复制使用】
 *   紫色：  "linear-gradient(135deg, #6c5ce7, #a29bfe)"
 *   粉红：  "linear-gradient(135deg, #fd79a8, #e17055)"
 *   青蓝：  "linear-gradient(135deg, #00cec9, #0984e3)"
 *   绿色：  "linear-gradient(135deg, #55efc4, #00b894)"
 *   橙黄：  "linear-gradient(135deg, #e17055, #fdcb6e)"
 *   深紫：  "linear-gradient(135deg, #a29bfe, #6c5ce7)"
 *   蓝色：  "linear-gradient(135deg, #0984e3, #74b9ff)"
 *   金橙：  "linear-gradient(135deg, #fdcb6e, #e17055)"
 *   翠绿：  "linear-gradient(135deg, #00b894, #00cec9)"
 *
 * 【文章正文 content 的写法】
 *   正文使用 HTML 标签，常用的有：
 *   <h2 id="xxx">标题</h2>           → 二级标题（会自动生成目录）
 *   <h3 id="xxx">小标题</h3>         → 三级标题（也会出现在目录里）
 *   <p>段落文字</p>                   → 普通段落
 *   <strong>加粗文字</strong>          → 加粗
 *   <code>行内代码</code>             → 行内代码
 *   <blockquote><p>引用</p></blockquote> → 引用块
 *   <ul><li>列表项</li></ul>          → 无序列表
 *   <ol><li>列表项</li></ol>          → 有序列表
 *   <pre><code>代码块</code></pre>    → 代码块
 *
 *   注意：content 的内容用反引号 ` 包裹（就是键盘左上角 ~ 下面那个键），
 *   这样可以换行写，更清晰。
 *
 * ============================================
 */

const BLOG_ARTICLES = [
  // ==================== 文章 1 ====================
  {
    id: 1,
    title: "深入理解 JavaScript 异步编程",
    category: "frontend",
    categoryName: "前端开发",
    date: "2025-01-15",
    readTime: "约 12 分钟",
    views: "1.2k",
    excerpt: "从回调函数到 Promise，再到 async/await，全面理解 JavaScript 异步编程的演进历程与最佳实践。",
    tags: ["JavaScript", "异步编程", "Promise", "async/await"],
    emoji: "💻",
    gradient: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
    featured: true,
    content: `
      <h2 id="introduction">前言</h2>
      <p>JavaScript 是一门单线程语言，但在实际开发中，我们经常需要处理网络请求、文件读写、定时器等异步操作。理解异步编程的原理和各种实现方式，是每个 JavaScript 开发者必须掌握的核心技能。</p>

      <blockquote>
        <p>异步编程的本质是让程序在等待某个操作完成时，不阻塞主线程的执行。</p>
      </blockquote>

      <h2 id="callback">回调函数 (Callback)</h2>
      <p>回调函数是最早期的异步处理方式。将一个函数作为参数传递给异步操作，当操作完成时调用该函数。</p>

      <pre><code><span class="token-comment">// 回调函数示例</span>
<span class="token-keyword">function</span> <span class="token-function">fetchData</span>(url, callback) {
  <span class="token-keyword">const</span> xhr = <span class="token-keyword">new</span> XMLHttpRequest();
  xhr.open(<span class="token-string">'GET'</span>, url);
  xhr.onload = <span class="token-keyword">function</span>() {
    <span class="token-keyword">if</span> (xhr.status === <span class="token-number">200</span>) {
      callback(<span class="token-keyword">null</span>, JSON.parse(xhr.responseText));
    } <span class="token-keyword">else</span> {
      callback(<span class="token-keyword">new</span> Error(<span class="token-string">'请求失败'</span>));
    }
  };
  xhr.send();
}</code></pre>

      <p>然而，当多个异步操作需要按顺序执行时，就会产生<strong>回调地狱 (Callback Hell)</strong> 的问题：</p>

      <pre><code><span class="token-comment">// 回调地狱</span>
<span class="token-function">getUser</span>(userId, <span class="token-keyword">function</span>(user) {
  <span class="token-function">getOrders</span>(user.id, <span class="token-keyword">function</span>(orders) {
    <span class="token-function">getOrderDetail</span>(orders[<span class="token-number">0</span>].id, <span class="token-keyword">function</span>(detail) {
      console.log(detail);
      <span class="token-comment">// 嵌套越来越深...</span>
    });
  });
});</code></pre>

      <h2 id="promise">Promise</h2>
      <p>ES6 引入的 Promise 提供了更优雅的异步处理方式。Promise 代表一个异步操作的最终结果，它有三种状态：</p>

      <ul>
        <li><strong>Pending (等待中)</strong> - 初始状态</li>
        <li><strong>Fulfilled (已完成)</strong> - 操作成功完成</li>
        <li><strong>Rejected (已拒绝)</strong> - 操作失败</li>
      </ul>

      <pre><code><span class="token-comment">// Promise 链式调用</span>
<span class="token-function">fetch</span>(<span class="token-string">'/api/user'</span>)
  .then(response => response.json())
  .then(user => <span class="token-function">fetch</span>(<span class="token-string">\`/api/orders/\${user.id}\`</span>))
  .then(response => response.json())
  .then(orders => {
    console.log(orders);
  })
  .<span class="token-keyword">catch</span>(error => {
    console.error(<span class="token-string">'出错了：'</span>, error);
  });</code></pre>

      <h3 id="promise-methods">Promise 常用方法</h3>
      <p>Promise 提供了多个实用的静态方法来处理多个异步操作：</p>

      <pre><code><span class="token-comment">// Promise.all - 所有都完成</span>
<span class="token-keyword">const</span> results = <span class="token-keyword">await</span> Promise.all([
  <span class="token-function">fetch</span>(<span class="token-string">'/api/users'</span>),
  <span class="token-function">fetch</span>(<span class="token-string">'/api/posts'</span>),
  <span class="token-function">fetch</span>(<span class="token-string">'/api/comments'</span>)
]);

<span class="token-comment">// Promise.race - 最先完成的</span>
<span class="token-keyword">const</span> fastest = <span class="token-keyword">await</span> Promise.race([
  <span class="token-function">fetch</span>(<span class="token-string">'/api/server1'</span>),
  <span class="token-function">fetch</span>(<span class="token-string">'/api/server2'</span>)
]);</code></pre>

      <h2 id="async-await">Async/Await</h2>
      <p>ES2017 引入的 <code>async/await</code> 是基于 Promise 的语法糖，让异步代码看起来像同步代码一样直观：</p>

      <pre><code><span class="token-keyword">async function</span> <span class="token-function">getUserOrders</span>(userId) {
  <span class="token-keyword">try</span> {
    <span class="token-keyword">const</span> userRes = <span class="token-keyword">await</span> <span class="token-function">fetch</span>(<span class="token-string">\`/api/user/\${userId}\`</span>);
    <span class="token-keyword">const</span> user = <span class="token-keyword">await</span> userRes.json();

    <span class="token-keyword">const</span> ordersRes = <span class="token-keyword">await</span> <span class="token-function">fetch</span>(<span class="token-string">\`/api/orders/\${user.id}\`</span>);
    <span class="token-keyword">const</span> orders = <span class="token-keyword">await</span> ordersRes.json();

    <span class="token-keyword">return</span> orders;
  } <span class="token-keyword">catch</span> (error) {
    console.error(<span class="token-string">'获取订单失败：'</span>, error);
    <span class="token-keyword">throw</span> error;
  }
}</code></pre>

      <h2 id="event-loop">事件循环 (Event Loop)</h2>
      <p>理解事件循环是掌握 JavaScript 异步编程的关键。事件循环机制让 JavaScript 能在单线程环境下处理异步操作。</p>

      <p>执行顺序：</p>
      <ol>
        <li>执行同步代码（宏任务）</li>
        <li>执行所有微任务（Promise.then, MutationObserver）</li>
        <li>渲染页面（如果需要）</li>
        <li>执行下一个宏任务（setTimeout, setInterval）</li>
      </ol>

      <pre><code>console.log(<span class="token-string">'1'</span>); <span class="token-comment">// 同步</span>

setTimeout(() => {
  console.log(<span class="token-string">'2'</span>); <span class="token-comment">// 宏任务</span>
}, <span class="token-number">0</span>);

Promise.resolve().then(() => {
  console.log(<span class="token-string">'3'</span>); <span class="token-comment">// 微任务</span>
});

console.log(<span class="token-string">'4'</span>); <span class="token-comment">// 同步</span>

<span class="token-comment">// 输出顺序: 1, 4, 3, 2</span></code></pre>

      <h2 id="best-practices">最佳实践</h2>
      <p>在实际开发中，以下是一些异步编程的最佳实践：</p>

      <ul>
        <li>优先使用 <code>async/await</code>，代码更易读</li>
        <li>始终使用 <code>try/catch</code> 处理错误</li>
        <li>善用 <code>Promise.all()</code> 并发执行独立的异步操作</li>
        <li>避免在循环中使用 <code>await</code>，考虑使用 <code>Promise.all()</code></li>
        <li>使用 <code>AbortController</code> 取消不必要的请求</li>
      </ul>

      <h2 id="summary">总结</h2>
      <p>JavaScript 异步编程经历了从回调函数到 Promise，再到 async/await 的演进。每一次进化都让异步代码更加简洁和可维护。理解事件循环的工作原理，能够帮助我们写出更高效、更可靠的异步代码。</p>
      <p>希望这篇文章能帮助你更深入地理解 JavaScript 异步编程。如果你有任何问题或想法，欢迎留言交流。</p>
    `
  },

  // ==================== 文章 2 ====================
  {
    id: 2,
    title: "如何高效学习一门新技术",
    category: "learning",
    categoryName: "学习方法",
    date: "2025-01-10",
    readTime: "约 8 分钟",
    views: "890",
    excerpt: "分享我在学习新技术时总结的方法论，包括费曼学习法、间隔重复等实用技巧。",
    tags: ["学习方法", "费曼学习法", "效率提升"],
    emoji: "📚",
    gradient: "linear-gradient(135deg, #fd79a8, #e17055)",
    featured: true,
    content: `
      <h2 id="why">为什么要讲学习方法</h2>
      <p>技术更新迭代非常快，作为开发者，我们需要不断学习新的技术和工具。但很多人在学习过程中效率低下，看了很多教程却记不住、用不上。其实，掌握正确的学习方法比学习本身更重要。</p>

      <blockquote>
        <p>学习如何学习，是你能掌握的最强大的技能。</p>
      </blockquote>

      <h2 id="feynman">费曼学习法</h2>
      <p>费曼学习法的核心思想是：如果你不能用简单的语言向别人解释一个概念，说明你还没有真正理解它。</p>

      <h3 id="feynman-steps">四个步骤</h3>
      <ol>
        <li><strong>选择一个概念</strong> — 明确你要学习的主题</li>
        <li><strong>教给别人</strong> — 用最简单的语言解释它，就像在教一个完全不懂的人</li>
        <li><strong>找到盲区</strong> — 在解释过程中，你会发现自己理解不清的地方</li>
        <li><strong>回顾简化</strong> — 重新学习那些模糊的部分，然后再次尝试用简单语言解释</li>
      </ol>

      <h2 id="spaced-repetition">间隔重复</h2>
      <p>人的遗忘曲线告诉我们，学过的东西如果不复习，很快就会忘记。间隔重复是一种科学的复习方法：</p>

      <ul>
        <li>学完后 <strong>1 天</strong>内复习第一次</li>
        <li><strong>3 天</strong>后复习第二次</li>
        <li><strong>1 周</strong>后复习第三次</li>
        <li><strong>2 周</strong>后复习第四次</li>
        <li><strong>1 个月</strong>后复习第五次</li>
      </ul>

      <h2 id="practice">以项目为驱动</h2>
      <p>纯粹看文档和教程的效果是有限的。最有效的学习方式是<strong>带着目标去做项目</strong>：</p>

      <ul>
        <li>想学 React？做一个 Todo 应用，然后升级为完整的项目管理工具</li>
        <li>想学 Node.js？做一个简单的 API 服务器，然后加上数据库</li>
        <li>想学 CSS？做一个个人网站，挑战各种布局效果</li>
      </ul>

      <p>通过做项目，你会遇到真实的问题，解决问题的过程就是最好的学习。</p>

      <h2 id="note-taking">做好笔记</h2>
      <p>好记性不如烂笔头，做笔记是巩固学习成果的重要方式：</p>

      <ul>
        <li>用自己的话总结，而不是直接复制粘贴</li>
        <li>画思维导图，梳理知识体系</li>
        <li>写博客分享，教是最好的学</li>
        <li>建立自己的代码片段库</li>
      </ul>

      <h2 id="summary">总结</h2>
      <p>高效学习不是天赋，而是可以训练的技能。费曼学习法帮你深入理解，间隔重复帮你长期记忆，项目驱动帮你实践运用。把这三者结合起来，你的学习效率会大幅提升。</p>
      <p>最重要的是保持好奇心和持续学习的热情。技术在变，但学习的能力永远不会过时。</p>
    `
  },

  // ==================== 文章 3 ====================
  {
    id: 3,
    title: "从零搭建个人博客网站",
    category: "frontend",
    categoryName: "前端开发",
    date: "2025-01-05",
    readTime: "约 15 分钟",
    views: "2.1k",
    excerpt: "使用纯 HTML、CSS 和 JavaScript 打造一个现代化的个人博客，无需任何框架依赖。",
    tags: ["HTML", "CSS", "JavaScript", "博客搭建"],
    emoji: "🚀",
    gradient: "linear-gradient(135deg, #00cec9, #0984e3)",
    featured: true,
    content: `
      <h2 id="intro">为什么要搭建个人博客</h2>
      <p>拥有一个个人博客不仅可以记录学习过程，还能展示自己的技术能力。而且，从零搭建博客本身就是一个很好的练手项目。</p>

      <blockquote>
        <p>最好的学习方式就是动手做，搭建博客就是前端入门的最佳实践。</p>
      </blockquote>

      <h2 id="tech-stack">技术选型</h2>
      <p>本项目使用最基础的前端三件套：</p>
      <ul>
        <li><strong>HTML5</strong> — 页面结构与语义化标签</li>
        <li><strong>CSS3</strong> — 样式、动画、响应式布局</li>
        <li><strong>JavaScript</strong> — 交互逻辑与动态效果</li>
      </ul>
      <p>不使用任何框架，纯原生实现，这样可以更深入地理解底层原理。</p>

      <h2 id="structure">项目结构</h2>
      <pre><code>个人博客/
├── index.html          # 首页
├── blog.html           # 博客列表页
├── article.html        # 文章详情页
├── projects.html       # 项目展示页
├── about.html          # 关于页面
├── css/
│   └── style.css       # 全局样式
├── js/
│   └── main.js         # 全局脚本
└── data/
    └── articles.js     # 文章数据</code></pre>

      <h2 id="responsive">响应式设计</h2>
      <p>使用 CSS 媒体查询实现响应式布局，确保在手机、平板和电脑上都有良好的阅读体验：</p>
      <ul>
        <li>移动端优先的设计思路</li>
        <li>使用 Flexbox 和 Grid 布局</li>
        <li>断点设置：480px、768px、1024px</li>
      </ul>

      <h2 id="dark-mode">暗黑模式</h2>
      <p>通过 CSS 自定义属性（CSS Variables）实现主题切换，用 localStorage 保存用户的主题偏好：</p>
      <pre><code><span class="token-comment">/* CSS 自定义属性 */</span>
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a1a2e;
}

[data-theme="dark"] {
  --bg-primary: #0a0a1a;
  --text-primary: #e8e8e8;
}</code></pre>

      <h2 id="summary">总结</h2>
      <p>搭建个人博客是一个非常好的练手项目，它涵盖了前端开发的方方面面。从页面布局到交互效果，从响应式设计到性能优化，每一步都是宝贵的学习经历。</p>
      <p>如果你还没有自己的博客，不妨现在就开始动手吧！</p>
    `
  },

  // ==================== 文章 4 ====================
  {
    id: 4,
    title: "RESTful API 设计最佳实践",
    category: "backend",
    categoryName: "后端技术",
    date: "2024-12-28",
    readTime: "约 10 分钟",
    views: "670",
    excerpt: "探讨如何设计简洁、一致且易于维护的 RESTful API，涵盖命名规范、错误处理等关键要素。",
    tags: ["API", "RESTful", "后端", "设计规范"],
    emoji: "🔧",
    gradient: "linear-gradient(135deg, #55efc4, #00b894)",
    featured: false,
    content: `
      <h2 id="what-is-rest">什么是 RESTful API</h2>
      <p>REST（Representational State Transfer）是一种软件架构风格，RESTful API 是遵循 REST 原则设计的 Web API。它使用标准的 HTTP 方法来对资源进行操作。</p>

      <h2 id="naming">URL 命名规范</h2>
      <p>好的 URL 设计是 RESTful API 的基础：</p>
      <ul>
        <li>使用<strong>名词</strong>而非动词：<code>/users</code> 而非 <code>/getUsers</code></li>
        <li>使用<strong>复数</strong>形式：<code>/articles</code> 而非 <code>/article</code></li>
        <li>使用<strong>小写字母</strong>和<strong>连字符</strong>：<code>/user-profiles</code></li>
        <li>用层级关系表示资源关联：<code>/users/123/orders</code></li>
      </ul>

      <h2 id="http-methods">HTTP 方法</h2>
      <p>正确使用 HTTP 方法是 RESTful 的核心：</p>
      <ul>
        <li><strong>GET</strong> — 获取资源（不应有副作用）</li>
        <li><strong>POST</strong> — 创建新资源</li>
        <li><strong>PUT</strong> — 完整更新资源</li>
        <li><strong>PATCH</strong> — 部分更新资源</li>
        <li><strong>DELETE</strong> — 删除资源</li>
      </ul>

      <h2 id="status-codes">状态码</h2>
      <p>返回合适的 HTTP 状态码：</p>
      <ul>
        <li><strong>200</strong> — 成功</li>
        <li><strong>201</strong> — 创建成功</li>
        <li><strong>400</strong> — 请求参数有误</li>
        <li><strong>401</strong> — 未认证</li>
        <li><strong>403</strong> — 无权限</li>
        <li><strong>404</strong> — 资源不存在</li>
        <li><strong>500</strong> — 服务器内部错误</li>
      </ul>

      <h2 id="error-handling">错误处理</h2>
      <p>统一的错误响应格式能让前端更方便地处理异常情况：</p>
      <pre><code>{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "邮箱格式不正确",
    "details": [
      { "field": "email", "message": "请输入有效的邮箱地址" }
    ]
  }
}</code></pre>

      <h2 id="summary">总结</h2>
      <p>好的 API 设计能让前后端协作更高效，让代码更易维护。遵循 RESTful 规范，保持一致性和简洁性，是设计优秀 API 的关键。</p>
    `
  },

  // ==================== 文章 5 ====================
  {
    id: 5,
    title: "CSS Grid 与 Flexbox 实战指南",
    category: "frontend",
    categoryName: "前端开发",
    date: "2024-12-20",
    readTime: "约 10 分钟",
    views: "1.5k",
    excerpt: "通过真实案例对比 CSS Grid 和 Flexbox 的使用场景，掌握现代 CSS 布局的核心技巧。",
    tags: ["CSS", "Grid", "Flexbox", "布局"],
    emoji: "🎨",
    gradient: "linear-gradient(135deg, #e17055, #fdcb6e)",
    featured: false,
    content: `
      <h2 id="intro">前言</h2>
      <p>CSS Grid 和 Flexbox 是现代 CSS 布局的两大利器。它们各有擅长的场景，理解它们的区别和适用范围，能让你的布局代码更简洁高效。</p>

      <h2 id="flexbox">Flexbox 基础</h2>
      <p>Flexbox 是一维布局模型，适合处理<strong>一行或一列</strong>中元素的排列：</p>
      <pre><code><span class="token-comment">/* Flexbox 居中 */</span>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}</code></pre>
      <p>Flexbox 最擅长的场景：</p>
      <ul>
        <li>导航栏布局</li>
        <li>居中对齐</li>
        <li>等分空间</li>
        <li>一行内的元素排列</li>
      </ul>

      <h2 id="grid">CSS Grid 基础</h2>
      <p>CSS Grid 是二维布局模型，可以同时控制<strong>行和列</strong>：</p>
      <pre><code><span class="token-comment">/* Grid 网格布局 */</span>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}</code></pre>
      <p>Grid 最擅长的场景：</p>
      <ul>
        <li>整体页面布局</li>
        <li>卡片网格</li>
        <li>复杂的不规则布局</li>
        <li>需要同时控制行列的场景</li>
      </ul>

      <h2 id="comparison">如何选择</h2>
      <p>简单记忆：</p>
      <ul>
        <li><strong>一维布局</strong>（一行或一列）→ 用 Flexbox</li>
        <li><strong>二维布局</strong>（行和列同时控制）→ 用 Grid</li>
        <li>两者可以<strong>混合使用</strong>，Grid 做大布局，Flexbox 做内部排列</li>
      </ul>

      <h2 id="summary">总结</h2>
      <p>Flexbox 和 Grid 并不是互相替代的关系，而是互补的。掌握它们各自的优势，在合适的场景使用合适的工具，才是最佳实践。</p>
    `
  },

  // ==================== 文章 6 ====================
  {
    id: 6,
    title: "我的 2024 年度总结",
    category: "life",
    categoryName: "生活随笔",
    date: "2024-12-31",
    readTime: "约 6 分钟",
    views: "3.2k",
    excerpt: "回顾过去一年的成长与收获，展望新一年的目标与计划。技术、生活、阅读，一切都在变好。",
    tags: ["年度总结", "成长", "生活"],
    emoji: "✍",
    gradient: "linear-gradient(135deg, #a29bfe, #6c5ce7)",
    featured: false,
    content: `
      <h2 id="intro">写在前面</h2>
      <p>2024 年即将结束，是时候做一个回顾了。这一年经历了很多，有收获也有遗憾，但总体来说，一切都在向好的方向发展。</p>

      <h2 id="tech">技术成长</h2>
      <p>今年在技术方面的收获颇丰：</p>
      <ul>
        <li>系统学习了 JavaScript 高级特性和设计模式</li>
        <li>完成了 3 个完整的个人项目</li>
        <li>开始接触后端开发，学习了 Node.js 和数据库</li>
        <li>搭建了自己的个人博客，开始写技术文章</li>
      </ul>

      <h2 id="reading">阅读</h2>
      <p>今年读了不少好书：</p>
      <ul>
        <li>《JavaScript 高级程序设计》— 前端必读经典</li>
        <li>《代码整洁之道》— 改变了我写代码的习惯</li>
        <li>《深入理解计算机系统》— 虽然很难，但收获巨大</li>
        <li>《认知觉醒》— 关于学习方法的好书</li>
      </ul>

      <h2 id="life">生活</h2>
      <p>除了技术，生活中也有很多美好的事情：</p>
      <ul>
        <li>养成了每天运动的习惯</li>
        <li>学会了做几道拿手菜</li>
        <li>去了几个想去的地方旅行</li>
      </ul>

      <h2 id="plan">2025 展望</h2>
      <p>新的一年，我给自己定了几个小目标：</p>
      <ol>
        <li>深入学习 React/Vue 框架</li>
        <li>每月至少写 2 篇技术博客</li>
        <li>参与开源项目贡献</li>
        <li>保持健康的生活方式</li>
      </ol>

      <h2 id="summary">最后</h2>
      <p>感谢 2024 年的自己，没有放弃学习和成长。也期待 2025 年的自己，能够更加努力，成为更好的开发者。</p>
      <p>新年快乐！</p>
    `
  },

  // ==================== 文章 7 ====================
  {
    id: 7,
    title: "数据库索引原理与优化",
    category: "backend",
    categoryName: "后端技术",
    date: "2024-12-15",
    readTime: "约 11 分钟",
    views: "540",
    excerpt: "深入理解 B+ 树索引的工作原理，学习如何通过合理建立索引来优化数据库查询性能。",
    tags: ["数据库", "索引", "MySQL", "性能优化"],
    emoji: "🗃",
    gradient: "linear-gradient(135deg, #0984e3, #74b9ff)",
    featured: false,
    content: `
      <h2 id="what-is-index">什么是索引</h2>
      <p>数据库索引就像一本书的目录。有了目录，你可以快速找到需要的内容，而不必从头到尾翻阅整本书。同样，有了索引，数据库可以快速定位到需要的数据行。</p>

      <blockquote>
        <p>索引是一种以空间换时间的策略，用额外的存储空间来加速查询。</p>
      </blockquote>

      <h2 id="btree">B+ 树索引</h2>
      <p>大多数数据库（如 MySQL 的 InnoDB 引擎）使用 B+ 树作为索引的数据结构。B+ 树的特点：</p>
      <ul>
        <li>所有数据都存储在<strong>叶子节点</strong></li>
        <li>叶子节点之间通过<strong>链表</strong>连接，方便范围查询</li>
        <li>树的高度很低（通常 3-4 层），查询效率高</li>
      </ul>

      <h2 id="types">索引类型</h2>
      <ul>
        <li><strong>主键索引</strong> — 唯一标识每一行数据</li>
        <li><strong>唯一索引</strong> — 保证列值唯一</li>
        <li><strong>普通索引</strong> — 最基本的索引类型</li>
        <li><strong>联合索引</strong> — 多个列组成的索引</li>
        <li><strong>全文索引</strong> — 用于全文搜索</li>
      </ul>

      <h2 id="best-practice">索引优化建议</h2>
      <ol>
        <li>在 <strong>WHERE、JOIN、ORDER BY</strong> 中频繁使用的列建立索引</li>
        <li>遵循<strong>最左前缀原则</strong>使用联合索引</li>
        <li>避免在索引列上使用函数或计算</li>
        <li>不要建立过多索引，会影响写入性能</li>
        <li>定期使用 <code>EXPLAIN</code> 分析查询计划</li>
      </ol>

      <h2 id="summary">总结</h2>
      <p>合理使用索引是数据库性能优化的关键手段。理解索引的原理，能帮助你做出更好的设计决策，让数据库查询又快又稳。</p>
    `
  },

  // ==================== 文章 8 ====================
  {
    id: 8,
    title: "程序员的知识管理体系",
    category: "learning",
    categoryName: "学习方法",
    date: "2024-12-10",
    readTime: "约 9 分钟",
    views: "780",
    excerpt: "如何搭建个人知识管理系统，从信息收集、整理、内化到输出，形成完整的学习闭环。",
    tags: ["知识管理", "笔记", "效率", "学习"],
    emoji: "💡",
    gradient: "linear-gradient(135deg, #fdcb6e, #e17055)",
    featured: false,
    content: `
      <h2 id="problem">信息过载的困境</h2>
      <p>作为程序员，我们每天面对海量的技术信息：博客文章、技术文档、视频教程、开源项目……如何从这些信息中提取有价值的知识，并将其内化为自己的能力，是一个重要的课题。</p>

      <h2 id="collect">信息收集</h2>
      <p>有选择地收集信息，而不是来者不拒：</p>
      <ul>
        <li>关注几个高质量的技术博客和公众号</li>
        <li>使用 RSS 订阅感兴趣的内容源</li>
        <li>建立稍后阅读列表，集中时间批量处理</li>
        <li>学会判断信息的价值，果断放弃低质量内容</li>
      </ul>

      <h2 id="organize">整理归类</h2>
      <p>收集到的信息需要及时整理：</p>
      <ul>
        <li>建立分类体系（如：前端、后端、算法、工具等）</li>
        <li>使用标签系统做交叉引用</li>
        <li>推荐工具：Notion、Obsidian、语雀</li>
      </ul>

      <h2 id="internalize">内化吸收</h2>
      <p>这是最关键的一步，把信息变成自己的知识：</p>
      <ul>
        <li>用自己的话<strong>重新表述</strong></li>
        <li>与已有知识建立<strong>关联</strong></li>
        <li>通过<strong>实践</strong>验证理解是否正确</li>
        <li>定期<strong>复习</strong>，加深记忆</li>
      </ul>

      <h2 id="output">输出分享</h2>
      <p>输出是检验学习效果的最好方式：</p>
      <ul>
        <li>写技术博客</li>
        <li>做技术分享/演讲</li>
        <li>回答社区问题</li>
        <li>参与开源项目</li>
      </ul>

      <h2 id="summary">总结</h2>
      <p>知识管理不是一次性的事情，而是一个持续的过程。建立起收集→整理→内化→输出的闭环，你的学习效率和知识积累都会稳步提升。</p>
    `
  },

  // ==================== 文章 9 ====================
  {
    id: 9,
    title: "Web 性能优化实战",
    category: "frontend",
    categoryName: "前端开发",
    date: "2024-12-05",
    readTime: "约 13 分钟",
    views: "1.8k",
    excerpt: "从加载性能到运行时性能，全方位优化 Web 应用，让你的网站快如闪电。",
    tags: ["性能优化", "Web", "前端", "加载速度"],
    emoji: "⚡",
    gradient: "linear-gradient(135deg, #00b894, #00cec9)",
    featured: false,
    content: `
      <h2 id="why">为什么性能很重要</h2>
      <p>研究表明，页面加载时间每增加 1 秒，用户流失率就会增加 7%。一个快速的网站不仅能提升用户体验，还直接影响搜索引擎排名和转化率。</p>

      <blockquote>
        <p>性能就是用户体验，慢就是最大的 Bug。</p>
      </blockquote>

      <h2 id="loading">加载性能优化</h2>
      <h3 id="resource-optimization">资源优化</h3>
      <ul>
        <li><strong>图片压缩</strong> — 使用 WebP 格式，适当降低质量</li>
        <li><strong>代码压缩</strong> — 压缩 HTML、CSS、JavaScript</li>
        <li><strong>懒加载</strong> — 图片和非关键资源延迟加载</li>
        <li><strong>CDN 加速</strong> — 静态资源使用 CDN 分发</li>
      </ul>

      <h3 id="critical-path">关键渲染路径</h3>
      <ul>
        <li>CSS 放在 <code>&lt;head&gt;</code> 中，尽快加载</li>
        <li>JavaScript 放在 <code>&lt;body&gt;</code> 底部，或使用 <code>defer</code> 属性</li>
        <li>内联关键 CSS，减少首屏渲染时间</li>
      </ul>

      <h2 id="runtime">运行时性能</h2>
      <ul>
        <li>减少 DOM 操作，使用文档片段（DocumentFragment）</li>
        <li>使用 <code>requestAnimationFrame</code> 做动画</li>
        <li>避免强制同步布局（Layout Thrashing）</li>
        <li>使用事件委托减少事件监听器</li>
      </ul>

      <h2 id="caching">缓存策略</h2>
      <ul>
        <li><strong>浏览器缓存</strong> — 设置合适的 Cache-Control</li>
        <li><strong>Service Worker</strong> — 离线缓存和资源预加载</li>
        <li><strong>localStorage</strong> — 缓存不常变化的数据</li>
      </ul>

      <h2 id="tools">性能检测工具</h2>
      <ul>
        <li><strong>Chrome DevTools</strong> — Performance 面板</li>
        <li><strong>Lighthouse</strong> — 综合性能评分</li>
        <li><strong>WebPageTest</strong> — 在线性能测试</li>
      </ul>

      <h2 id="summary">总结</h2>
      <p>性能优化是一个持续的过程，不是一次就能完成的。从加载性能、运行时性能、缓存策略多个维度入手，配合性能检测工具，持续改进，你的网站性能一定会越来越好。</p>
    `
  }

  // ==================== 添加新文章 ====================
  // 想添加新文章？复制上面任意一个文章对象，粘贴在这里，
  // 修改 id（递增）和各个字段的内容就行了！
  // 记得在前一个文章的 } 后面加一个英文逗号 ,
];
