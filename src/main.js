/**
 * 信宇清潔有限公司 - 官網核心 JavaScript 邏輯
 * 
 * 包含：
 * 1. 行動端選單切換
 * 2. 導覽列滾動視覺效果
 * 3. 滾動淡入 Reveal 動畫 (Intersection Observer)
 * 4. 表單提交與多管道聯絡引導 (LINE / Email / Google表單)
 */

// ==========================================
// 1. 設定與變數定義
// ==========================================

// Google 表單預設預留網址，使用者建置後可於此替換
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdg2VDgiLiqSzWG7tTDTYc_4zYAJOFTR5yqc2R8JOWi2RdLnw/viewform?usp=header";

// 網頁加載完成後執行
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initNavbarScroll();
  initRevealAnimation();
  initFormHandler();
  initGoogleFormLink();
});

// ==========================================
// 2. 行動端選單功能
// ==========================================
function initMobileMenu() {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (!menuButton || !mobileMenu) return;

  // 切換選單顯示狀態
  menuButton.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    if (isHidden) {
      mobileMenu.classList.remove("hidden");
      // 切換為關閉 (X) 的 SVG 圖案
      menuIcon.setAttribute("d", "M6 18L18 6M6 6l12 12");
    } else {
      mobileMenu.classList.add("hidden");
      // 切換回漢堡排 (三) 的 SVG 圖案
      menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
    }
  });

  // 點擊任何連結後，自動關閉下拉選單
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
    });
  });
}

// ==========================================
// 3. 導覽列滾動狀態視覺
// ==========================================
function initNavbarScroll() {
  const header = document.getElementById("main-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      // 滾動後：加強毛玻璃模糊度與陰影
      header.classList.add("shadow-md", "bg-white/95");
      header.classList.remove("bg-white/80");
    } else {
      // 置頂時：恢復輕微毛玻璃透明感
      header.classList.remove("shadow-md", "bg-white/95");
      header.classList.add("bg-white/80");
    }
  });
}

// ==========================================
// 4. 滾動進入視區 Reveal 動畫
// ==========================================
function initRevealAnimation() {
  const reveals = document.querySelectorAll(".reveal");
  
  if (reveals.length === 0) return;

  const observerOptions = {
    root: null, // 使用瀏覽器視窗作為根
    threshold: 0.15, // 當 15% 的元素進入視窗時觸發
    rootMargin: "0px 0px -50px 0px" // 底部預留邊距，讓動畫觸發時機更自然
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // 動畫只播放一次，播放後解除監聽
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });
}

// ==========================================
// 5. 預約表單提交與引導邏輯
// ==========================================
function initFormHandler() {
  const form = document.getElementById("appointment-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // 阻擋預設送出行為

    // 獲取表單數值
    const name = document.getElementById("form-name").value.trim();
    const phone = document.getElementById("form-phone").value.trim();
    const lineId = document.getElementById("form-line").value.trim() || "未提供";
    const email = document.getElementById("form-email").value.trim() || "未提供";
    const address = document.getElementById("form-address").value.trim();
    const service = document.getElementById("form-service").value;
    const time = document.getElementById("form-time").value;
    const message = document.getElementById("form-message").value.trim() || "無";

    // 格式化要傳送的文字內容
    const textMessage = `【信宇清潔 - 預約估價諮詢】\n` +
                        `客戶姓名：${name}\n` +
                        `聯絡電話：${phone}\n` +
                        `LINE ID：${lineId}\n` +
                        `電子信箱：${email}\n` +
                        `施作地址：${address}\n` +
                        `清潔項目：${service}\n` +
                        `方便聯絡時間：${time}\n` +
                        `備註說明：${message}`;

    // 建立客製化的彈窗 Modal
    showCustomModal(name, textMessage);
  });
}

// 彈出精美自訂確認視窗，提供 LINE 或 Email 直送功能
function showCustomModal(clientName, messageContent) {
  // 如果已存在 modal 則先移除
  const existingModal = document.getElementById("custom-success-modal");
  if (existingModal) existingModal.remove();

  // 建立 Modal HTML 結構
  const modalHTML = `
    <div id="custom-success-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- 背景遮罩 -->
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"></div>
      
      <!-- 內容面板 -->
      <div class="relative bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-100 transform scale-95 opacity-0 transition-all duration-300 ease-out z-10">
        <!-- 成功打勾圖標 -->
        <div class="w-16 h-16 rounded-full bg-emerald-50 text-brand-primary flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h4 class="text-2xl font-bold text-center text-slate-900 mb-2">預約資料已格式化完成！</h4>
        <p class="text-slate-600 text-sm text-center mb-6 leading-relaxed">
          親愛的 ${clientName}，感謝您的預約。我們已為您將預約資料整理完畢！請選擇下方最適合您的方式發送給我們，我們將由羅主任即刻為您免費估價。
        </p>
        
        <div class="space-y-3">
          <!-- 管道一：一鍵傳送 LINE 給羅主任 -->
          <a href="https://line.me/ti/p/~lili5551212" target="_blank" rel="noopener noreferrer" 
             class="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-200">
            <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 10.3c0-5.7-5.4-10.3-12-10.3S0 4.6 0 10.3c0 5.1 4.3 9.3 10 10.2.4.1.9.3.9.7 0 .4-.1 1-.3 1.5l-.2.9c-.1.3-.4 1.1.8.6 1.1-.5 6.1-3.6 8.3-6.1 2.9-2.3 4.5-4.9 4.5-7.8zm-15.5 3.3c-.3 0-.5-.2-.5-.5v-4.3c0-.3.2-.5.5-.5h2.3c.3 0 .5.2.5.5s-.2.5-.5.5h-1.8v1.4h1.8c.3 0 .5.2.5.5s-.2.5-.5.5h-1.8v1.4h1.8c.3 0 .5.2.5.5s-.2.5-.5.5h-2.3zm4.5-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4.3c0-.3.2-.5.5-.5s.5.2.5.5v4.3zm6.2 0c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-3.1l-1.6 3.4c-.1.2-.3.3-.5.3s-.4-.1-.5-.3l-1.6-3.4v3.1c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4.3c0-.3.2-.5.5-.5.3 0 .5.1.6.3l1.9 4.1 1.9-4.1c.1-.2.3-.3.6-.3.3 0 .5.2.5.5v4.3zm3.1-2.9h-1.8v1.4h1.8c.3 0 .5.2.5.5s-.2.5-.5.5h-1.8v1.4h1.8c.3 0 .5.2.5.5s-.2.5-.5.5h-2.3c-.3 0-.5-.2-.5-.5v-4.3c0-.3.2-.5.5-.5h2.3c.3 0 .5.2.5.5s-.2.5-.5.5z"/>
            </svg>
            <span>加入羅主任 LINE 並傳送資料</span>
          </a>
          
          <!-- 管道二：寄送 Email 信箱 -->
          <a href="mailto:service@xinyuclean.com.tw?subject=${encodeURIComponent('信宇清潔 - 預約現場估價')}&body=${encodeURIComponent(messageContent)}"
             class="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>透過 Email 電子郵件傳送</span>
          </a>
        </div>
        
        <!-- 點擊 LINE 按鈕後會提示複製的文本內容 -->
        <div class="mt-6 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl">
          <span class="text-xs text-brand-muted font-bold block mb-1">【小叮嚀】您可以先複製下方已為您填妥的內容，並在加入 LINE 後直接貼上：</span>
          <textarea readonly class="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 h-28 focus:outline-none select-all font-mono">${messageContent}</textarea>
        </div>
        
        <button id="close-modal-btn" class="mt-6 w-full text-slate-500 hover:text-slate-700 text-sm font-semibold transition-colors">
          關閉本視窗
        </button>
      </div>
    </div>
  `;

  // 插入到 DOM 中
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // 延遲一點點讓動畫執行
  const modalContainer = document.getElementById("custom-success-modal");
  const modalContent = modalContainer.querySelector(".relative");
  
  setTimeout(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 10);

  // 關閉邏輯
  const closeModal = () => {
    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
      modalContainer.remove();
    }, 300);
  };

  document.getElementById("close-modal-btn").addEventListener("click", closeModal);
  modalContainer.querySelector(".absolute").addEventListener("click", closeModal);
}

// ==========================================
// 6. 設定 Google 表單按鈕連結 (防呆優化版)
// ==========================================
function initGoogleFormLink() {
  const googleBtn = document.getElementById("google-form-btn");
  if (!googleBtn) return;
  
  // 檢查是否仍為預設的範例無效連結
  if (GOOGLE_FORM_URL.includes("1FAIpQLSfD_uL-W0yQ4aW5X3T1e9Z-8VlFm5FfJ3N-P1c3P1c3P1c3PQ")) {
    // 隱藏按鈕避免客戶點擊出錯，此時 flex-1 的「送出預約諮詢」會自動撐滿寬度，版面依然美觀
    googleBtn.style.display = "none";
  } else {
    googleBtn.setAttribute("href", GOOGLE_FORM_URL);
    googleBtn.style.display = "flex";
  }
}
