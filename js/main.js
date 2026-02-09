/* ============================================
   Personal Blog - Global JavaScript
   ============================================ */

(function () {
  'use strict';

  // ========== Article Rendering (数据驱动，从 Supabase 加载) ==========
  const ArticleRenderer = {
    _articles: null,

    /**
     * 生成一张文章卡片的 HTML
     */
    createCardHTML(article) {
      return `
        <a href="article.html?id=${article.id}" class="card" data-category="${article.category}">
          <div class="card__image" style="background: ${article.gradient};">
            <div class="card__image-placeholder">${article.emoji}</div>
          </div>
          <div class="card__body">
            <p class="card__category">${article.categoryName}</p>
            <h3 class="card__title">${article.title}</h3>
            <p class="card__excerpt">${article.excerpt}</p>
            <div class="card__meta">
              <span class="card__meta-item">&#128197; ${article.date}</span>
              <span class="card__meta-item">&#128065; ${article.views}</span>
            </div>
          </div>
        </a>
      `;
    },

    /**
     * 渲染博客列表页（blog.html）
     */
    async renderBlogGrid() {
      const grid = document.getElementById('blog-grid');
      if (!grid) return;

      try {
        const articles = await ArticlesAPI.getPublished();
        this._articles = articles;
        grid.innerHTML = articles.map(article => this.createCardHTML(article)).join('');
        // 重新初始化过滤功能（文章卡片是异步生成的）
        BlogFilter.rebind();
      } catch (e) {
        console.error('加载文章列表失败:', e);
      }
    },

    /**
     * 渲染首页精选文章（index.html）
     */
    async renderFeaturedGrid() {
      const grid = document.getElementById('featured-grid');
      if (!grid) return;

      try {
        const articles = await ArticlesAPI.getPublished();
        const featured = articles.filter(a => a.featured).slice(0, 3);
        grid.innerHTML = featured.map(article => this.createCardHTML(article)).join('');
      } catch (e) {
        console.error('加载精选文章失败:', e);
      }
    },

    /**
     * 渲染文章详情页（article.html）
     */
    async renderArticlePage() {
      const titleEl = document.getElementById('article-title');
      if (!titleEl) return;

      // 从 URL 参数获取文章 ID
      const params = new URLSearchParams(window.location.search);
      const id = parseInt(params.get('id'));

      if (!id) {
        // 没有 id 参数，跳转到第一篇
        try {
          const articles = await ArticlesAPI.getPublished();
          if (articles[0]) window.location.href = `article.html?id=${articles[0].id}`;
        } catch (e) { /* ignore */ }
        return;
      }

      try {
        const article = await ArticlesAPI.getById(id);

        // 增加浏览量
        ArticlesAPI.incrementViews(id);

        // 更新页面标题
        document.title = `${article.title} - 个人博客`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', article.excerpt);

        // 填充文章头部
        const categoryEl = document.getElementById('article-category');
        const metaEl = document.getElementById('article-meta');
        const tagsEl = document.getElementById('article-tags');
        const contentEl = document.getElementById('article-content');

        if (categoryEl) categoryEl.textContent = article.categoryName;
        if (titleEl) titleEl.textContent = article.title;

        if (metaEl) {
          metaEl.innerHTML = `
            <span class="article__meta-item">&#128197; ${article.date}</span>
            <span class="article__meta-item">&#128338; ${article.readTime}</span>
            <span class="article__meta-item">&#128065; ${article.views} 阅读</span>
          `;
        }

        if (tagsEl && article.tags) {
          tagsEl.innerHTML = article.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        }

        if (contentEl) {
          contentEl.innerHTML = article.content;
        }

        // 生成上一篇/下一篇导航
        await this.renderArticleNav(article);

        // 重新初始化目录（内容是异步填充的）
        TOC.init();
      } catch (e) {
        console.error('加载文章失败:', e);
      }
    },

    /**
     * 生成文章的上一篇/下一篇导航
     */
    async renderArticleNav(article) {
      const navEl = document.getElementById('article-nav');
      if (!navEl) return;

      try {
        const articles = await ArticlesAPI.getPublished();
        const index = articles.findIndex(a => a.id === article.id);
        const prev = index > 0 ? articles[index - 1] : null;
        const next = index < articles.length - 1 ? articles[index + 1] : null;

        let html = '';

        if (prev) {
          html += `
            <a href="article.html?id=${prev.id}" class="article-nav__item">
              <p class="article-nav__label">&larr; 上一篇</p>
              <p class="article-nav__title">${prev.title}</p>
            </a>
          `;
        } else {
          html += '<div class="article-nav__item" style="visibility:hidden;"></div>';
        }

        if (next) {
          html += `
            <a href="article.html?id=${next.id}" class="article-nav__item article-nav__item--next">
              <p class="article-nav__label">下一篇 &rarr;</p>
              <p class="article-nav__title">${next.title}</p>
            </a>
          `;
        } else {
          html += '<div class="article-nav__item article-nav__item--next" style="visibility:hidden;"></div>';
        }

        navEl.innerHTML = html;
      } catch (e) {
        console.error('加载导航失败:', e);
      }
    },

    /**
     * 初始化：根据当前页面自动判断渲染什么
     */
    init() {
      this.renderBlogGrid();
      this.renderFeaturedGrid();
      this.renderArticlePage();
    }
  };

  // ========== Theme Toggle ==========
  const ThemeManager = {
    init() {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = saved || (prefersDark ? 'dark' : 'light');
      this.set(theme);

      document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', () => this.toggle());
      });
    },

    set(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      this.updateIcons(theme);
    },

    toggle() {
      const current = document.documentElement.getAttribute('data-theme');
      this.set(current === 'dark' ? 'light' : 'dark');
    },

    updateIcons(theme) {
      document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      });
    }
  };

  // ========== Navigation ==========
  const Navigation = {
    init() {
      this.nav = document.querySelector('.nav');
      this.hamburger = document.querySelector('.nav__hamburger');
      this.mobileMenu = document.querySelector('.mobile-menu');

      if (this.nav) {
        window.addEventListener('scroll', () => this.onScroll());
        this.onScroll();
      }

      if (this.hamburger) {
        this.hamburger.addEventListener('click', () => this.toggleMobile());
      }

      // Close mobile menu on link click
      if (this.mobileMenu) {
        this.mobileMenu.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => this.closeMobile());
        });
      }

      // Set active nav link
      this.setActiveLink();
    },

    onScroll() {
      if (window.scrollY > 50) {
        this.nav.classList.add('nav--scrolled');
      } else {
        this.nav.classList.remove('nav--scrolled');
      }
    },

    toggleMobile() {
      this.hamburger.classList.toggle('active');
      this.mobileMenu.classList.toggle('active');
      document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
    },

    closeMobile() {
      if (this.hamburger) this.hamburger.classList.remove('active');
      if (this.mobileMenu) this.mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    },

    setActiveLink() {
      const path = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('.nav__link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === path || (path === '' && href === 'index.html')) {
          link.classList.add('nav__link--active');
        }
      });
    }
  };

  // ========== Back to Top ==========
  const BackToTop = {
    init() {
      this.btn = document.querySelector('.back-to-top');
      if (!this.btn) return;

      window.addEventListener('scroll', () => {
        this.btn.classList.toggle('visible', window.scrollY > 400);
      });

      this.btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  // ========== Scroll Reveal Animations ==========
  const ScrollReveal = {
    init() {
      const elements = document.querySelectorAll('.reveal, .stagger-children');
      if (!elements.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      elements.forEach(el => observer.observe(el));
    }
  };

  // ========== Typing Effect ==========
  const TypingEffect = {
    init() {
      const el = document.querySelector('.hero__typing-text');
      if (!el) return;

      const strings = JSON.parse(el.getAttribute('data-strings') || '[]');
      if (!strings.length) return;

      this.el = el;
      this.strings = strings;
      this.stringIndex = 0;
      this.charIndex = 0;
      this.isDeleting = false;
      this.tick();
    },

    tick() {
      const current = this.strings[this.stringIndex];
      if (this.isDeleting) {
        this.charIndex--;
      } else {
        this.charIndex++;
      }

      this.el.textContent = current.substring(0, this.charIndex);

      let delay = this.isDeleting ? 40 : 80;

      if (!this.isDeleting && this.charIndex === current.length) {
        delay = 2000;
        this.isDeleting = true;
      } else if (this.isDeleting && this.charIndex === 0) {
        this.isDeleting = false;
        this.stringIndex = (this.stringIndex + 1) % this.strings.length;
        delay = 500;
      }

      setTimeout(() => this.tick(), delay);
    }
  };

  // ========== Particle Background ==========
  const ParticleCanvas = {
    init() {
      const canvas = document.querySelector('.hero__canvas');
      if (!canvas) return;

      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.mouse = { x: null, y: null };
      this.particleCount = window.innerWidth < 768 ? 40 : 80;

      this.resize();
      this.createParticles();
      this.animate();

      window.addEventListener('resize', () => this.resize());
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });
    },

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },

    createParticles() {
      this.particles = [];
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    },

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const color = isDark ? '162, 155, 254' : '108, 92, 231';

      this.particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;

        // Draw particle
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        this.ctx.fill();

        // Draw connections
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = `rgba(${color}, ${0.1 * (1 - dist / 150)})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        }

        // Mouse interaction
        if (this.mouse.x !== null) {
          const dx = p.x - this.mouse.x;
          const dy = p.y - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(this.mouse.x, this.mouse.y);
            this.ctx.strokeStyle = `rgba(${color}, ${0.2 * (1 - dist / 120)})`;
            this.ctx.lineWidth = 0.8;
            this.ctx.stroke();
          }
        }
      });

      requestAnimationFrame(() => this.animate());
    }
  };

  // ========== Skill Bars Animation ==========
  const SkillBars = {
    init() {
      const bars = document.querySelectorAll('.skill-bar__fill');
      if (!bars.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const fill = entry.target;
            fill.style.width = fill.getAttribute('data-width');
            observer.unobserve(fill);
          }
        });
      }, { threshold: 0.5 });

      bars.forEach(bar => observer.observe(bar));
    }
  };

  // ========== Blog Filter & Search ==========
  const BlogFilter = {
    // 文章卡片异步生成后重新绑定过滤
    rebind() {
      this.cards = document.querySelectorAll('.blog-grid .card');
    },

    init() {
      this.cards = document.querySelectorAll('.blog-grid .card');
      this.filterTags = document.querySelectorAll('.filter-tag');
      this.searchInput = document.querySelector('.search-box__input');

      if (!this.filterTags.length && !this.searchInput) return;

      this.filterTags.forEach(tag => {
        tag.addEventListener('click', () => this.filterBy(tag));
      });

      if (this.searchInput) {
        this.searchInput.addEventListener('input', (e) => this.search(e.target.value));
      }
    },

    filterBy(activeTag) {
      this.filterTags.forEach(t => t.classList.remove('filter-tag--active'));
      activeTag.classList.add('filter-tag--active');

      const category = activeTag.getAttribute('data-category');

      // 重新获取卡片（因为卡片是动态生成的）
      this.cards = document.querySelectorAll('.blog-grid .card');

      this.cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = '';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    },

    search(query) {
      const q = query.toLowerCase().trim();
      // 重新获取卡片（因为卡片是动态生成的）
      this.cards = document.querySelectorAll('.blog-grid .card');
      this.cards.forEach(card => {
        const title = card.querySelector('.card__title')?.textContent.toLowerCase() || '';
        const excerpt = card.querySelector('.card__excerpt')?.textContent.toLowerCase() || '';
        const match = !q || title.includes(q) || excerpt.includes(q);
        card.style.display = match ? '' : 'none';
        card.style.opacity = match ? '1' : '0';
      });
    }
  };

  // ========== Table of Contents (Article page) ==========
  const TOC = {
    init() {
      const tocList = document.querySelector('.toc__list');
      const headings = document.querySelectorAll('.prose h2, .prose h3');
      if (!tocList || !headings.length) return;

      // 清空已有目录，避免重复
      tocList.innerHTML = '';

      this.links = [];

      headings.forEach((heading, i) => {
        const id = heading.id || `heading-${i}`;
        heading.id = id;

        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        link.className = `toc__link${heading.tagName === 'H3' ? ' toc__link--h3' : ''}`;
        link.addEventListener('click', (e) => {
          e.preventDefault();
          heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        tocList.appendChild(link);
        this.links.push({ link, heading });
      });

      window.addEventListener('scroll', () => this.highlight());
    },

    highlight() {
      let current = null;
      this.links.forEach(({ link, heading }) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          current = link;
        }
        link.classList.remove('toc__link--active');
      });
      if (current) current.classList.add('toc__link--active');
    }
  };

  // ========== Page Loader ==========
  const PageLoader = {
    init() {
      const loader = document.querySelector('.page-loader');
      if (!loader) return;

      window.addEventListener('load', () => {
        setTimeout(() => {
          loader.classList.add('hidden');
          setTimeout(() => loader.remove(), 500);
        }, 400);
      });
    }
  };

  // ========== Smooth Anchor Links ==========
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }
  };

  // ========== Initialize Everything ==========
  document.addEventListener('DOMContentLoaded', () => {
    // 先渲染文章内容（数据驱动）
    ArticleRenderer.init();

    // 再初始化其他功能
    PageLoader.init();
    ThemeManager.init();
    Navigation.init();
    BackToTop.init();
    ScrollReveal.init();
    TypingEffect.init();
    ParticleCanvas.init();
    SkillBars.init();
    BlogFilter.init();
    TOC.init();
    SmoothScroll.init();
  });

})();
