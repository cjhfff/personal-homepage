/* ============================================
   Supabase 客户端初始化
   ============================================
   配置步骤：
   1. 打开 https://supabase.com，创建项目
   2. 进入 Project Settings → API
   3. 复制 Project URL 替换下面的 SUPABASE_URL
   4. 复制 anon/public key 替换下面的 SUPABASE_ANON_KEY
   ============================================ */

const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';

// 使用 Supabase CDN 版本（在 HTML 中通过 <script> 标签引入）
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
