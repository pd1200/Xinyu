# 📋 信宇清潔有限公司官網 ─ 系統建置與技術運維指南

本文件詳細記錄「信宇清潔有限公司」官方網站與品牌信箱的完整技術架構、各階段配置參數、曾遇到的技術卡點與對應解決方案。此文件保存在專案根目錄，供日後技術維護、移交或詢問時使用。

---

## 1. 專案基本資訊 (Project Metadata)

*   **官方網站網域**：`xinyuclean.com.tw` / `www.xinyuclean.com.tw`
*   **客戶管理信箱**：`a0920800806@gmail.com` (羅主任 ─ 用於註冊 Gandi 與 Cloudflare 帳戶)
*   **公司統一編號**：`93698761`
*   **開通品牌信箱**：`service@xinyuclean.com.tw` (轉寄至 `a0920800806@gmail.com`)
*   **技術維護 GitHub 帳號**：`pd1200` (專案倉庫：`pd1200/Xinyu`)

---

## 2. 系統架構與角色分工 (System Architecture)

本專案採用現代化的靜態網站託管與 DNS 郵件分離架構：

```
[ 本地開發端 ] ➔ Git Push ➔ [ GitHub 私有倉庫 (pd1200/Xinyu) ]
                                   ↓ (WebHook 自動同步)
[ Cloudflare (a0920800806@gmail.com 帳戶) ] ➔ 讀取 GitHub 代碼並全自動打包編譯 (Pages)
                                   ↓ (管理 DNS 解析與 SSL 安全加密)
[ 訪客瀏覽器 ] ➔ 存取官網 xinyuclean.com.tw
                                   ↑ (網域所有權與郵件伺服器託管)
[ Gandi 網域平台 ] ➔ 提供 service@ 實體信箱 ➔ 轉寄至 ➔ [ 客戶 Gmail (a0920800806@gmail.com) ]
```

---

## 3. 部署與編譯環境變數設定 (Cloudflare Pages)

### 📌 Node.js 版本問題
*   **問題**：Cloudflare Pages 的 Linux 容器預設 Node.js 版本過舊，在編譯全新的 Tailwind CSS v4 時會因為不支援而報錯中斷。
*   **解決方法**：必須在 Cloudflare Pages 後台專案的 `Settings ➔ Environment variables` 中，手動新增以下環境變數：
    *   **變數名稱**：`NODE_VERSION`
    *   **值**：`20` (或更高)

### 📌 跨平台依賴鎖定檔問題
*   **問題**：在 Windows 開發環境產生的 `package-lock.json`，在 Cloudflare 的 Linux 容器中執行 `npm ci` 時，會因為缺漏平台特有套件（如 `@emnapi/core` 與 `@emnapi/runtime`）而崩費。
*   **解決方法**：在本地端強制將這兩個套件寫入 package.json 與鎖定檔中（使用 `npm install --save-exact @emnapi/core@1.11.2 @emnapi/runtime@1.11.2`），然後 push 至 GitHub 解決。

---

## 4. Vite 路徑設定與字型修正 (Vite Base Path)

*   **問題**：綁定自訂獨立域名後，開啟網頁會失去所有樣式，退回預設 HTML 超大字體。這是因為 `vite.config.js` 的 `base` 路徑先前為配合 GitHub Pages 被設定為 `'/Xinyu/'`，導致網頁在載入 CSS/JS 檔案時發生 404 錯誤。
*   **解決方法**：在 `vite.config.js` 中將 `base` 修正為根目錄 **`'/'`**：
    ```javascript
    export default defineConfig({
      plugins: [tailwindcss()],
      base: '/', // 確保在獨立網域下，CSS 與 JS 靜態資源從根目錄正確加載
    })
    ```

---

## 5. DNS 與信箱安全驗證設定 (Cloudflare DNS Records)

因為網域解析權已在 Cloudflare，為了解鎖並正式啟用 Gandi 信箱的登入與收發功能，必須在 **Cloudflare DNS 管理頁面** 手動新增以下 **4 條紀錄**：

| 類型 (Type) | 名稱 (Name) | 目標/內容 (Target/Content) | 代理狀態 (Proxy status) | 說明 |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `gm1._domainkey` | `gm1.gandimail.net` | ⚠️ **DNS only (灰色雲)** | DKIM 安全驗證金鑰 1 |
| **CNAME** | `gm2._domainkey` | `gm2.gandimail.net` | ⚠️ **DNS only (灰色雲)** | DKIM 安全驗證金鑰 2 |
| **CNAME** | `gm3._domainkey` | `gm3.gandimail.net` | ⚠️ **DNS only (灰色雲)** | DKIM 安全驗證金鑰 3 |
| **TXT** | `mailsa` | `156550d419120e073d5e0aa99b9b1ec6d1af5db077be1373cf64ece4518a8872` | ─ | Gandi 信箱所有權驗證 |

*注意：所有 CNAME 驗證紀錄的 Proxy status 必須保持為 **DNS only** (關閉代理)，否則驗證會失效。*

---

## 6. 郵件轉寄設定 (Email Forwarding Rules)

### 📌 實體信箱轉寄設定 (目前運作中)
目前已在 **Roundcube Webmail** 設定好篩選規則，運作邏輯為「收信後保留伺服器備份，並同步寄送複本至 Gmail」：
1.  進入 Roundcube 的 `設定 ➔ 篩選 (Filters)`。
2.  建立篩選器，設定「範圍」為 **`所有郵件`**。
3.  設定「動作」為 **`寄送郵件複本至`** ➔ **`a0920800806@gmail.com`**。
4.  *注意：手動登入 Roundcube 時，請務必手動鍵入完整帳號 `service@xinyuclean.com.tw` 與密碼，避免使用複製貼上以防夾帶隱形字元。*

---

## 7. 未來優化與維護手冊 (Maintenance & Scaling)

### ❓ 如何切換為「100% 永久免費」的虛擬轉寄？
如果您未來不需要使用 `service@xinyuclean.com.tw` 發信，只想「收信並轉寄」，為免去第二年起實體信箱的月租費（約 $4.99/月），可在明年到期前（2027年6月）執行此切換：
1.  **刪除實體信箱**：登入 Gandi 後台 ➔ 點選 `service@xinyuclean.com.tw` ➔ 拉到最下方點選 `Delete my mailbox`。
2.  **建立免費轉寄**：前往 Gandi 後台 `Forwarding settings` ➔ 點選 `Create` ➔ 來源填入 `service@xinyuclean.com.tw`，目的地填入 `a0920800806@gmail.com`（點選新增） ➔ 點選建立。
3.  *此時 Cloudflare DNS 的 4 條驗證紀錄完全不需要修改，Gandi 會無縫完成轉發，且未來 5 年完全免費！*
