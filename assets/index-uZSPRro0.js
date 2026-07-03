(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://docs.google.com/forms/d/e/1FAIpQLSdg2VDgiLiqSzWG7tTDTYc_4zYAJOFTR5yqc2R8JOWi2RdLnw/viewform?usp=header`;document.addEventListener(`DOMContentLoaded`,()=>{t(),n(),r(),i(),o()});function t(){let e=document.getElementById(`mobile-menu-button`),t=document.getElementById(`mobile-menu`),n=document.getElementById(`menu-icon`),r=document.querySelectorAll(`.mobile-nav-link`);!e||!t||(e.addEventListener(`click`,()=>{t.classList.contains(`hidden`)?(t.classList.remove(`hidden`),n.setAttribute(`d`,`M6 18L18 6M6 6l12 12`)):(t.classList.add(`hidden`),n.setAttribute(`d`,`M4 6h16M4 12h16M4 18h16`))}),r.forEach(e=>{e.addEventListener(`click`,()=>{t.classList.add(`hidden`),n.setAttribute(`d`,`M4 6h16M4 12h16M4 18h16`)})}))}function n(){let e=document.getElementById(`main-header`);e&&window.addEventListener(`scroll`,()=>{window.scrollY>50?(e.classList.add(`shadow-md`,`bg-white/95`),e.classList.remove(`bg-white/80`)):(e.classList.remove(`shadow-md`,`bg-white/95`),e.classList.add(`bg-white/80`))})}function r(){let e=document.querySelectorAll(`.reveal`);if(e.length===0)return;let t=new IntersectionObserver((e,t)=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`active`),t.unobserve(e.target))})},{root:null,threshold:.15,rootMargin:`0px 0px -50px 0px`});e.forEach(e=>{t.observe(e)})}function i(){let e=document.getElementById(`appointment-form`);e&&e.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`form-name`).value.trim();a(t,`【信宇清潔 - 預約估價諮詢】\n客戶姓名：${t}\n聯絡電話：${document.getElementById(`form-phone`).value.trim()}\nLINE ID：${document.getElementById(`form-line`).value.trim()||`未提供`}\n電子信箱：${document.getElementById(`form-email`).value.trim()||`未提供`}\n施作地址：${document.getElementById(`form-address`).value.trim()}\n清潔項目：${document.getElementById(`form-service`).value}\n方便聯絡時間：${document.getElementById(`form-time`).value}\n備註說明：${document.getElementById(`form-message`).value.trim()||`無`}`)})}function a(e,t){let n=document.getElementById(`custom-success-modal`);n&&n.remove();let r=`
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
          親愛的 ${e}，感謝您的預約。我們已為您將預約資料整理完畢！請選擇下方最適合您的方式發送給我們，我們將由羅主任即刻為您免費估價。
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
          <a href="mailto:a0920800806@gmail.com?subject=%E4%BF%A1%E5%AE%87%E6%B8%85%E6%BD%94%20-%20%E9%A0%90%E7%B4%84%E7%8F%BE%E5%A0%B4%E4%BC%B0%E5%83%B9&body=${encodeURIComponent(t)}"
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
          <textarea readonly class="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 h-28 focus:outline-none select-all font-mono">${t}</textarea>
        </div>
        
        <button id="close-modal-btn" class="mt-6 w-full text-slate-500 hover:text-slate-700 text-sm font-semibold transition-colors">
          關閉本視窗
        </button>
      </div>
    </div>
  `;document.body.insertAdjacentHTML(`beforeend`,r);let i=document.getElementById(`custom-success-modal`),a=i.querySelector(`.relative`);setTimeout(()=>{a.classList.remove(`scale-95`,`opacity-0`),a.classList.add(`scale-100`,`opacity-100`)},10);let o=()=>{a.classList.remove(`scale-100`,`opacity-100`),a.classList.add(`scale-95`,`opacity-0`),setTimeout(()=>{i.remove()},300)};document.getElementById(`close-modal-btn`).addEventListener(`click`,o),i.querySelector(`.absolute`).addEventListener(`click`,o)}function o(){let t=document.getElementById(`google-form-btn`);t&&(e.includes(`1FAIpQLSfD_uL-W0yQ4aW5X3T1e9Z-8VlFm5FfJ3N-P1c3P1c3P1c3PQ`)?t.style.display=`none`:(t.setAttribute(`href`,e),t.style.display=`flex`))}