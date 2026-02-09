/* ============================================
   Supabase 客户端初始化
   ============================================
   配置步骤：
   1. 打开 https://supabase.com，创建项目
   2. 进入 Project Settings → API
   3. 复制 Project URL 替换下面的 SUPABASE_URL
   4. 复制 anon/public key 替换下面的 SUPABASE_ANON_KEY
   ============================================ */

const SUPABASE_URL = 'https://cdqkvxkmmiblmzqoltvq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcWt2eGttbWlibG16cW9sdHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MTAxNzgsImV4cCI6MjA4NjE4NjE3OH0.cieKO_Ic-JuRtShp6ZiJJchCRwghJDw5lbbtRI8Tt4I';

// 使用 Supabase CDN 版本（在 HTML 中通过 <script> 标签引入）
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);