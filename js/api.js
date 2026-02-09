/* ============================================
   API 封装 - 所有 Supabase 数据库操作
   ============================================ */

const CATEGORY_MAP = {
  frontend: '前端开发',
  backend: '后端技术',
  learning: '学习方法',
  life: '生活随笔'
};

// 将数据库文章记录转换为前端使用的格式
function normalizeArticle(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    categoryName: CATEGORY_MAP[row.category] || row.category,
    date: row.date,
    readTime: row.read_time || '约 5 分钟',
    views: formatViews(row.views || 0),
    viewsRaw: row.views || 0,
    excerpt: row.excerpt || '',
    tags: row.tags || [],
    emoji: row.emoji || '📝',
    gradient: row.gradient || 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
    featured: row.featured || false,
    content: row.content || '',
    published: row.published !== false
  };
}

function formatViews(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

// ========== 文章 ==========

const ArticlesAPI = {
  // 获取所有已发布文章（公开访问）
  async getPublished() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false });
    if (error) throw error;
    return data.map(normalizeArticle);
  },

  // 获取所有文章（管理员）
  async getAll() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('date', { ascending: false });
    if (error) throw error;
    return data.map(normalizeArticle);
  },

  // 获取单篇文章
  async getById(id) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return normalizeArticle(data);
  },

  // 创建文章
  async create(article) {
    const { data, error } = await supabase
      .from('articles')
      .insert([toDbRow(article)])
      .select()
      .single();
    if (error) throw error;
    return normalizeArticle(data);
  },

  // 更新文章
  async update(id, article) {
    const { data, error } = await supabase
      .from('articles')
      .update(toDbRow(article))
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return normalizeArticle(data);
  },

  // 删除文章
  async delete(id) {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // 增加浏览量（通过 RPC 函数，无需登录）
  async incrementViews(id) {
    const { error } = await supabase.rpc('increment_views', { article_id: id });
    if (error) console.warn('浏览量更新失败:', error.message);
  }
};

// 将前端格式转换为数据库行格式
function toDbRow(article) {
  const row = {
    title: article.title,
    category: article.category,
    date: article.date,
    read_time: article.readTime,
    excerpt: article.excerpt,
    tags: article.tags,
    emoji: article.emoji,
    gradient: article.gradient,
    featured: article.featured,
    content: article.content,
    published: article.published !== false
  };
  // 仅在有值时传入 views
  if (typeof article.viewsRaw === 'number') {
    row.views = article.viewsRaw;
  }
  return row;
}

// ========== 评论 ==========

const CommentsAPI = {
  // 获取某篇文章的已审核评论（公开访问）
  async getApproved(articleId) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('article_id', articleId)
      .eq('approved', true)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  },

  // 获取所有评论（管理员）
  async getAll() {
    const { data, error } = await supabase
      .from('comments')
      .select('*, articles(title)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // 提交评论（公开）
  async submit(articleId, authorName, authorEmail, content) {
    const { error } = await supabase
      .from('comments')
      .insert([{
        article_id: articleId,
        author_name: authorName,
        author_email: authorEmail,
        content: content,
        approved: false
      }]);
    if (error) throw error;
  },

  // 审核通过评论（管理员）
  async approve(id) {
    const { error } = await supabase
      .from('comments')
      .update({ approved: true })
      .eq('id', id);
    if (error) throw error;
  },

  // 删除评论（管理员）
  async delete(id) {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// ========== 联系留言 ==========

const ContactAPI = {
  // 提交联系表单（公开）
  async submit(name, email, subject, message) {
    const { error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, subject, message }]);
    if (error) throw error;
  },

  // 获取所有留言（管理员）
  async getAll() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // 标记已读（管理员）
  async markRead(id) {
    const { error } = await supabase
      .from('contact_messages')
      .update({ read: true })
      .eq('id', id);
    if (error) throw error;
  }
};

// ========== 认证 ==========

const AuthAPI = {
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }
};
