-- ============================================
-- 数据迁移脚本：将 data/articles.js 中的 9 篇文章导入 Supabase
-- 在 Supabase Dashboard → SQL Editor 中执行此脚本
-- ============================================

INSERT INTO articles (title, category, date, read_time, views, excerpt, tags, emoji, gradient, featured, content, published) VALUES

(
  '深入理解 JavaScript 异步编程',
  'frontend',
  '2025-01-15',
  '约 12 分钟',
  1200,
  '从回调函数到 Promise，再到 async/await，全面理解 JavaScript 异步编程的演进历程与最佳实践。',
  ARRAY['JavaScript', '异步编程', 'Promise', 'async/await'],
  '💻',
  'linear-gradient(135deg, #6c5ce7, #a29bfe)',
  true,
  '
      <h2 id="introduction">前言</h2>
      <p>JavaScript 是一门单线程语言，但在实际开发中，我们经常需要处理网络请求、文件读写、定时器等异步操作。理解异步编程的原理和各种实现方式，是每个 JavaScript 开发者必须掌握的核心技能。</p>

      <blockquote>
        <p>异步编程的本质是让程序在等待某个操作完成时，不阻塞主线程的执行。</p>
      </blockquote>

      <h2 id="callback">回调函数 (Callback)</h2>
      <p>回调函数是最早期的异步处理方式。将一个函数作为参数传递给异步操作，当操作完成时调用该函数。</p>

      <h2 id="promise">Promise</h2>
      <p>ES6 引入的 Promise 提供了更优雅的异步处理方式。Promise 代表一个异步操作的最终结果，它有三种状态：Pending、Fulfilled、Rejected。</p>

      <h2 id="async-await">Async/Await</h2>
      <p>ES2017 引入的 async/await 是基于 Promise 的语法糖，让异步代码看起来像同步代码一样直观。</p>

      <h2 id="summary">总结</h2>
      <p>JavaScript 异步编程经历了从回调函数到 Promise，再到 async/await 的演进。每一次进化都让异步代码更加简洁和可维护。</p>
  ',
  true
),

(
  '如何高效学习一门新技术',
  'learning',
  '2025-01-10',
  '约 8 分钟',
  890,
  '分享我在学习新技术时总结的方法论，包括费曼学习法、间隔重复等实用技巧。',
  ARRAY['学习方法', '费曼学习法', '效率提升'],
  '📚',
  'linear-gradient(135deg, #fd79a8, #e17055)',
  true,
  '
      <h2 id="why">为什么要讲学习方法</h2>
      <p>技术更新迭代非常快，作为开发者，我们需要不断学习新的技术和工具。但很多人在学习过程中效率低下，看了很多教程却记不住、用不上。其实，掌握正确的学习方法比学习本身更重要。</p>

      <blockquote>
        <p>学习如何学习，是你能掌握的最强大的技能。</p>
      </blockquote>

      <h2 id="feynman">费曼学习法</h2>
      <p>费曼学习法的核心思想是：如果你不能用简单的语言向别人解释一个概念，说明你还没有真正理解它。</p>

      <h2 id="spaced-repetition">间隔重复</h2>
      <p>人的遗忘曲线告诉我们，学过的东西如果不复习，很快就会忘记。间隔重复是一种科学的复习方法。</p>

      <h2 id="summary">总结</h2>
      <p>高效学习不是天赋，而是可以训练的技能。费曼学习法帮你深入理解，间隔重复帮你长期记忆，项目驱动帮你实践运用。</p>
  ',
  true
),

(
  '从零搭建个人博客网站',
  'frontend',
  '2025-01-05',
  '约 15 分钟',
  2100,
  '使用纯 HTML、CSS 和 JavaScript 打造一个现代化的个人博客，无需任何框架依赖。',
  ARRAY['HTML', 'CSS', 'JavaScript', '博客搭建'],
  '🚀',
  'linear-gradient(135deg, #00cec9, #0984e3)',
  true,
  '
      <h2 id="intro">为什么要搭建个人博客</h2>
      <p>拥有一个个人博客不仅可以记录学习过程，还能展示自己的技术能力。而且，从零搭建博客本身就是一个很好的练手项目。</p>

      <blockquote>
        <p>最好的学习方式就是动手做，搭建博客就是前端入门的最佳实践。</p>
      </blockquote>

      <h2 id="tech-stack">技术选型</h2>
      <p>本项目使用最基础的前端三件套：HTML5、CSS3、JavaScript，不使用任何框架，纯原生实现。</p>

      <h2 id="summary">总结</h2>
      <p>搭建个人博客是一个非常好的练手项目，它涵盖了前端开发的方方面面。</p>
  ',
  true
),

(
  'RESTful API 设计最佳实践',
  'backend',
  '2024-12-28',
  '约 10 分钟',
  670,
  '探讨如何设计简洁、一致且易于维护的 RESTful API，涵盖命名规范、错误处理等关键要素。',
  ARRAY['API', 'RESTful', '后端', '设计规范'],
  '🔧',
  'linear-gradient(135deg, #55efc4, #00b894)',
  false,
  '
      <h2 id="what-is-rest">什么是 RESTful API</h2>
      <p>REST（Representational State Transfer）是一种软件架构风格，RESTful API 是遵循 REST 原则设计的 Web API。</p>

      <h2 id="naming">URL 命名规范</h2>
      <p>好的 URL 设计是 RESTful API 的基础：使用名词而非动词，使用复数形式，用层级关系表示资源关联。</p>

      <h2 id="summary">总结</h2>
      <p>好的 API 设计能让前后端协作更高效，让代码更易维护。遵循 RESTful 规范，保持一致性和简洁性，是设计优秀 API 的关键。</p>
  ',
  true
),

(
  'CSS Grid 与 Flexbox 实战指南',
  'frontend',
  '2024-12-20',
  '约 10 分钟',
  1500,
  '通过真实案例对比 CSS Grid 和 Flexbox 的使用场景，掌握现代 CSS 布局的核心技巧。',
  ARRAY['CSS', 'Grid', 'Flexbox', '布局'],
  '🎨',
  'linear-gradient(135deg, #e17055, #fdcb6e)',
  false,
  '
      <h2 id="intro">前言</h2>
      <p>CSS Grid 和 Flexbox 是现代 CSS 布局的两大利器。它们各有擅长的场景，理解它们的区别和适用范围，能让你的布局代码更简洁高效。</p>

      <h2 id="comparison">如何选择</h2>
      <ul>
        <li><strong>一维布局</strong>（一行或一列）→ 用 Flexbox</li>
        <li><strong>二维布局</strong>（行和列同时控制）→ 用 Grid</li>
      </ul>

      <h2 id="summary">总结</h2>
      <p>Flexbox 和 Grid 并不是互相替代的关系，而是互补的。掌握它们各自的优势，在合适的场景使用合适的工具，才是最佳实践。</p>
  ',
  true
),

(
  '我的 2024 年度总结',
  'life',
  '2024-12-31',
  '约 6 分钟',
  3200,
  '回顾过去一年的成长与收获，展望新一年的目标与计划。技术、生活、阅读，一切都在变好。',
  ARRAY['年度总结', '成长', '生活'],
  '✍',
  'linear-gradient(135deg, #a29bfe, #6c5ce7)',
  false,
  '
      <h2 id="intro">写在前面</h2>
      <p>2024 年即将结束，是时候做一个回顾了。这一年经历了很多，有收获也有遗憾，但总体来说，一切都在向好的方向发展。</p>

      <h2 id="tech">技术成长</h2>
      <p>今年在技术方面的收获颇丰：系统学习了 JavaScript 高级特性、完成了 3 个完整项目、开始接触后端开发。</p>

      <h2 id="summary">最后</h2>
      <p>感谢 2024 年的自己，没有放弃学习和成长。新年快乐！</p>
  ',
  true
),

(
  '数据库索引原理与优化',
  'backend',
  '2024-12-15',
  '约 11 分钟',
  540,
  '深入理解 B+ 树索引的工作原理，学习如何通过合理建立索引来优化数据库查询性能。',
  ARRAY['数据库', '索引', 'MySQL', '性能优化'],
  '🗃',
  'linear-gradient(135deg, #0984e3, #74b9ff)',
  false,
  '
      <h2 id="what-is-index">什么是索引</h2>
      <p>数据库索引就像一本书的目录。有了目录，你可以快速找到需要的内容，而不必从头到尾翻阅整本书。</p>

      <blockquote>
        <p>索引是一种以空间换时间的策略，用额外的存储空间来加速查询。</p>
      </blockquote>

      <h2 id="best-practice">索引优化建议</h2>
      <p>在 WHERE、JOIN、ORDER BY 中频繁使用的列建立索引，遵循最左前缀原则，定期使用 EXPLAIN 分析查询计划。</p>

      <h2 id="summary">总结</h2>
      <p>合理使用索引是数据库性能优化的关键手段。理解索引的原理，能帮助你做出更好的设计决策。</p>
  ',
  true
),

(
  '程序员的知识管理体系',
  'learning',
  '2024-12-10',
  '约 9 分钟',
  780,
  '如何搭建个人知识管理系统，从信息收集、整理、内化到输出，形成完整的学习闭环。',
  ARRAY['知识管理', '笔记', '效率', '学习'],
  '💡',
  'linear-gradient(135deg, #fdcb6e, #e17055)',
  false,
  '
      <h2 id="problem">信息过载的困境</h2>
      <p>作为程序员，我们每天面对海量的技术信息。如何从这些信息中提取有价值的知识，并将其内化为自己的能力，是一个重要的课题。</p>

      <h2 id="output">输出分享</h2>
      <p>输出是检验学习效果的最好方式：写技术博客、做技术分享、回答社区问题、参与开源项目。</p>

      <h2 id="summary">总结</h2>
      <p>知识管理不是一次性的事情，而是一个持续的过程。建立起收集→整理→内化→输出的闭环，你的学习效率和知识积累都会稳步提升。</p>
  ',
  true
),

(
  'Web 性能优化实战',
  'frontend',
  '2024-12-05',
  '约 13 分钟',
  1800,
  '从加载性能到运行时性能，全方位优化 Web 应用，让你的网站快如闪电。',
  ARRAY['性能优化', 'Web', '前端', '加载速度'],
  '⚡',
  'linear-gradient(135deg, #00b894, #00cec9)',
  false,
  '
      <h2 id="why">为什么性能很重要</h2>
      <p>研究表明，页面加载时间每增加 1 秒，用户流失率就会增加 7%。</p>

      <blockquote>
        <p>性能就是用户体验，慢就是最大的 Bug。</p>
      </blockquote>

      <h2 id="loading">加载性能优化</h2>
      <p>图片压缩、代码压缩、懒加载、CDN 加速等都是常用的加载性能优化手段。</p>

      <h2 id="summary">总结</h2>
      <p>性能优化是一个持续的过程，从加载性能、运行时性能、缓存策略多个维度入手，配合性能检测工具，持续改进。</p>
  ',
  true
);
