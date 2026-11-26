# Loon Studio — UI Design Guide

Phiên bản 1.0 · Ngày 25/11/2026 · Website: `new-loon-studio`

Tài liệu này chuẩn hoá giao diện homepage hiện tại để thiết kế, viết nội dung và phát triển thêm các trang có cùng ngôn ngữ. Đây là quy chuẩn UI của website, không phải một bộ nhận diện thương hiệu đã được phê duyệt đầy đủ cho mọi kênh.

## 1. Phạm vi và nguồn tham chiếu

Nguồn nền là trang Loon Lab đã đưa vào repository: bố cục nền trắng, typography Inter, CTA xanh, thẻ hình ảnh trừu tượng, nội dung theo khối và tab phương pháp. Các số đo nền được đọc từ computed styles của bản trước khi chỉnh sửa ở viewport desktop khoảng 1266px.

| Thành phần | Ghi nhận từ UI trước đây | Quy chuẩn sau chuẩn hoá |
| --- | --- | --- |
| Primary CTA | Xanh `#146EF5`, chữ trắng, radius 10px | Giữ màu và ngôn ngữ shadow; cao ít nhất 44px |
| H1 | Inter 58px / 1.1, weight 500, tracking -1.6px | Tối đa 58px, co về 36px trên màn hình nhỏ |
| H2 | Inter 32px / 1.2, weight 400, tracking -0.6px | 28–32px / 1.2, tracking -0.02em |
| H3 | Inter 20px / 1.2, weight 400 | 20px / 1.35; tiêu đề component mới dùng weight 500 |
| Body | Một số đoạn 14px, weight 300, line-height ngắn | Body chính 16px / 1.6, weight 400 |
| Màu mô tả | `#595959` và một số đoạn gray | Thống nhất `#595959` |
| Khoảng cách section | 64px desktop, 48px nhỏ | Giữ hệ cũ; section mới 80 / 64 / 48px |
| Điều hướng | Nhiều URL `#` | Tất cả đến section, dialog hoặc nội dung thật |
| Nội dung | Tab lặp, bài chưa có nội dung, chưa có footer | Tab riêng, studio notes, explorations, FAQ, demo brief, footer |

Các giá trị ở cột sau là quyết định chuẩn hoá được triển khai, không phải tất cả đều là số đo nguyên bản.

## 2. Định hướng thiết kế

- **Rõ ràng trước:** heading nói đúng nhiệm vụ của section; mỗi section có một thông điệp chính.
- **Human perspective, digital craft:** hình ảnh có tính thử nghiệm; nội dung và thao tác phải cụ thể, dễ hiểu.
- **Khoảng trắng tạo nhịp:** chia nội dung bằng spacing, không dùng quá nhiều đường viền và khung.
- **Xanh là màu hành động:** dành xanh đậm cho CTA, trạng thái focus, link và nhấn mạnh vừa đủ.
- **Chuyển động có mục đích:** hover và animation hỗ trợ nhận biết thao tác, không che thông tin hoặc làm chậm hoàn thành việc.
- **Không thêm bằng chứng giả:** không tự tạo logo khách hàng, kết quả kinh doanh, testimonial, số năm kinh nghiệm hay cam kết thời gian.

## 3. Design tokens

Token triển khai nằm trong `styles/site.css`. Prefix chung là `--studio-`.

### 3.1. Màu sắc

| Token | Giá trị | Vai trò |
| --- | --- | --- |
| `--studio-blue` | `#146EF5` | Primary button, link, focus và điểm nhấn |
| `--studio-blue-hover` | `#0B55C7` | Hover primary |
| `--studio-text` | `#171717` | Nội dung, tiêu đề, tương tác chính |
| `--studio-muted` | `#595959` | Đoạn mô tả và nhãn thứ cấp |
| `--studio-line` | `#E6E8ED` | Divider, viền nhẹ |
| `--studio-surface` | `#F5F6F8` | Nền phụ, close button |
| `--studio-soft-blue` | `#EFF5FF` | Hover hoặc bề mặt nhấn nhẹ |
| Background | `#FFFFFF` | Nền trang và dialog |
| Secondary button | `#F1F1F1` | CTA phụ |
| Field border | `#D4D8E1` | Viền input/select/textarea |
| Contact border | `#DCE7FA` | Viền khối contact |

Độ tương phản tính trên nền trắng: `#171717` khoảng **17.93:1**; `#595959` khoảng **7.00:1**; `#146EF5` với trắng khoảng **4.59:1**. Đây là kiểm tra cặp màu đặc, không thay thế việc kiểm tra toàn bộ trang hoặc các trạng thái opacity.

Không dùng màu muted ở opacity thấp cho nội dung cần đọc. Nếu CTA có hình nền, cần kiểm tra lại tương phản tại vị trí thật.

### 3.2. Typography

Font chính: **Inter**, fallback `Arial, sans-serif`. **JetBrains Mono** chỉ dùng cho nhãn trình tự của process. Các font được phục vụ từ website; không tải Google Fonts lúc người dùng mở trang.

| Vai trò | Kích thước / line-height | Weight | Tracking |
| --- | --- | --- | --- |
| Hero H1 | `clamp(2.25rem, 4.6vw, 3.625rem)` / 1.1 | 500 | -0.028em |
| H1 ≤767px | 2.5rem / 1.1 | 500 | -0.028em |
| H1 ≤420px | 2.25rem / 1.1 | 500 | -0.028em |
| Section H2 | `clamp(1.75rem, 2.6vw, 2rem)` / 1.2 | 400 | -0.02em |
| Component H3 | 1.25rem / 1.35 | 400–500 | -0.02em |
| Contact heading | `clamp(2rem, 3.5vw, 3rem)` / 1.12 | 400 | -0.03em |
| Body | 1rem / 1.6 | 400 | normal |
| Card title | 1rem / 1.5 | 500 | normal |
| Label, nav, button | 0.875rem / 1.4–1.5 | 400–500 | normal |
| Metadata và lưu ý thứ cấp | 0.8125rem / 1.5–1.6 | 400 | normal |

Root font-size là 16px. Dùng `rem` cho nội dung bổ sung, tránh kiểu thu nhỏ toàn trang theo viewport. Không hạ body xuống dưới 16px để ép vừa màn hình.

Đoạn văn dài nên ở khoảng 55–75 ký tự mỗi dòng. Hero description tối đa khoảng 680–760px; nội dung dialog tối đa theo container 760px.

### 3.3. Spacing, radius và shadow

Scale ưu tiên: **4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px**.

| Mục | Giá trị |
| --- | --- |
| Max-width trang | 1440px |
| Gutter section mới | 24px desktop; 20px mobile |
| Card grid gap | 24px desktop; 20px tablet; 32px khi xếp dọc |
| Heading → nội dung | 24–32px |
| Nội dung liên quan trong card | 12–16px |
| Label → input | 8px |
| Section mới | 80px trên/dưới; 64px tablet; 48px mobile |
| Section cũ | Wrapper 64px desktop; 48px mobile |
| Button/input radius | 10px |
| Image radius | 10–12px |
| Dialog radius | 20px |
| Contact radius | 24px desktop; 20px mobile |
| Badge/tag/tab radius | 10px; không dùng pill |

Primary shadow:

```css
box-shadow:
  inset 0 1px 1px #ffffff33,
  inset 0 6px 12px #ffffff1f,
  0 1px 2px #08080833,
  0 4px 4px #08080814;
```

Shadow diễn tả CTA có độ nổi nhẹ. Không dùng shadow này cho mọi card; đa số nội dung nằm trực tiếp trên nền trắng.

## 4. Layout và responsive

### Desktop

- Hero ở giữa, một H1 rõ, hai CTA và một hình lớn ở dưới.
- Section service, explorations, insights dùng grid ba cột.
- Process dùng tab hình/mô tả, sau đó là ba bước theo trình tự.
- Contact dùng hai cột: nội dung trái, form phải, gap 80px.
- Footer gồm khối thương hiệu và ba nhóm điều hướng.

### Breakpoints triển khai

| Mốc | Hành vi |
| --- | --- |
| >991px | Grid ba cột, contact hai cột rộng, footer bốn cột |
| ≤991px | Section mới 64px; contact padding/gap 40px; brand footer chiếm một hàng |
| ≤767px | Cards một cột; process xếp dọc; contact một cột; dialog giảm padding |
| ≤420px | Form một cột hoàn toàn; CTA trong confirmation xếp dọc |

Webflow runtime và stylesheet gốc vẫn điều khiển breakpoint menu/tab của phần cũ. Không tự sửa breakpoint của runtime chỉ để đồng nhất tên mốc; hãy kiểm tra hành vi thực tế ở 390, 768, 1024 và 1440px.

Không đặt chiều cao cố định cho khối văn bản. Text dài phải wrap; grid dùng `minmax(0, 1fr)`; input có `min-width:0`. Ở màn hình nhỏ, giữ nội dung trong viewport và không giấu phần lỗi bằng `overflow-x:hidden` trên toàn trang.

## 5. Kiến trúc homepage

| Section / ID | Nhiệm vụ | Tương tác chính |
| --- | --- | --- |
| `#top` | Giới thiệu lời hứa của studio | Start a project → contact; Explore solutions → solutions |
| `#solutions` | Ba nhóm năng lực | See more mở dialog chi tiết |
| `#work` | Cho thấy ngôn ngữ hình ảnh | Card mở dialog exploration |
| `#principles` | Quan điểm về thiết kế và kinh doanh | Nội dung biên tập |
| `#approach` | Ba nguyên tắc tiếp cận | Explore more → process |
| `#process` | Strategy, performance, scalability và trình tự làm việc | Webflow tabs + ba bước |
| `#insights` | Kiến thức hữu ích | Ba studio notes mở được |
| `#about` | Kết nối tư duy con người và công cụ | Our point of view → principles |
| `#faq` | Giảm câu hỏi trước khi bắt đầu | Native details/summary |
| `#contact` | Thu thập brief trong luồng demo | Validate → demo confirmation → copy/download |
| Footer | Điều hướng và thông tin phụ | Studio, solutions, resources, privacy, back to top |

Mỗi section có heading dùng để đặt accessible name. Trang có một `main`, một H1 và footer ở ngoài `main`. Skip link đi tới `#main-content`.

## 6. Component contracts

### 6.1. Header và dropdown

Giữ wordmark ở trái, nhóm link ở giữa/trái và một CTA nổi bật ở phải. Menu desktop và hamburger tiếp tục dùng Webflow runtime. Các link phải trỏ tới ID thật hoặc dialog thật, không sử dụng `href="#"` làm hành vi hoàn chỉnh.

Các nhãn đã chuẩn hoá: All solutions, Brand design, Motion graphics, Web design, Web development, Strategy & measurement; Explorations, Our approach, Insights, Project resources và Contact. `Career` được đổi thành `Collaborate` vì website chưa có danh sách vị trí tuyển dụng được xác nhận.

### 6.2. Button và text link

- Primary: nền xanh, chữ trắng, cao 44px, padding ngang 16px, radius 10px.
- Secondary: nền `#F1F1F1`, chữ đậm, không shadow nặng.
- Link trong đoạn văn: xanh, underline, offset 4px.
- Không dựa vào icon để giải thích action. CTA điều hướng phụ sử dụng chevron theo ảnh tham chiếu do chủ website cung cấp.
- Hover primary tối hơn và dịch lên tối đa 1px; keyboard focus có outline 3px.
- Dùng `<a>` để điều hướng, `<button>` để thao tác. Submit là `type="submit"`; copy/download/close là `type="button"`.

### 6.3. Service card và disclosure

Giữ hình tỷ lệ 4:3, tiêu đề 20px, mô tả ngắn 16px và CTA See more toàn chiều rộng. Nội dung dài nằm trong native dialog, không bung vào card. Các card đóng luôn có CTA cùng baseline.

Ba nhóm: Brand solutions; Web solutions; Motion & animation. Không đưa giá hoặc thời gian cố định khi chưa có thông tin kinh doanh được xác nhận.

### 6.4. Exploration và insight card

Exploration dùng ảnh 4:3 ở desktop, 16:10 khi xếp dọc; `object-fit:cover`. Chỉ zoom ảnh nhẹ khi hover, không làm dịch bố cục.

Exploration được ghi rõ **self-initiated / independent studio exploration**, không trình bày như client case study. Thẻ motion hiện là **still study**, không giả thành video có thể phát.

Insight có tiêu đề, category, metadata và nội dung biên tập thật trong dialog. Không dùng ngày xuất bản giả hoặc nhãn thời gian đọc quá chính xác; hiện dùng “Studio note · 3 min read” như ước lượng.

### 6.5. Tabs

Dùng `.w-tabs`, `.w-tab-menu`, `.w-tab-pane` gốc. Không viết controller thứ hai cạnh tranh với Webflow. Giữ `data-w-tab` để runtime sinh ARIA đúng.

Nội dung không lặp:

- Strategic: audience, positioning, project brief.
- Performance: hierarchy, usability, accessibility, measurement.
- Scalability: reusable components, content patterns, handoff.

### 6.6. Dialog

Native `<dialog>` có `aria-labelledby`, close button 44px và backdrop. Nội dung không vượt quá 86dvh, cuộn bên trong khi cần. Escape đóng theo hành vi native. Khi đóng, trả focus về trigger. Link CTA trong dialog đóng dialog rồi đi đến contact.

Dialog được mở qua link hash có thật, cập nhật history và hỗ trợ Back. Người dùng mở URL có hash bài viết có thể thấy đúng dialog. Không đưa HTML nhập bởi người dùng vào dialog; dữ liệu form dùng `textContent` hoặc giá trị textarea.

### 6.7. FAQ

Dùng native `<details>/<summary>`. Cho phép nhiều câu trả lời cùng mở. Heading câu hỏi có tối thiểu 44px thao tác; body 16px / 1.7. Nội dung trả lời cụ thể, không thêm cam kết chưa xác nhận.

### 6.8. Form và trạng thái

Label nằm trên field, không chỉ dùng placeholder. Field cao ít nhất 48px; textarea tối thiểu 125px. Select dùng chevron inset, không để sát mép. Validation dùng HTML constraints và bổ sung kiểm tra chuỗi chỉ có khoảng trắng.

| Field | Quy tắc |
| --- | --- |
| Name | Required; tối đa 100 ký tự; không chỉ khoảng trắng |
| Email | Required; `type=email`; tối đa 254 ký tự |
| Company | Optional; tối đa 150 ký tự |
| Service | Required; lựa chọn rõ ràng, có Not sure yet |
| Timeline | Optional; mặc định Flexible |
| Description | Required; 20–3000 ký tự; không chỉ khoảng trắng |

Luồng hiện tại là **demo do chủ website yêu cầu**:

1. Nhập thông tin; submit sai giữ người dùng tại field có lỗi.
2. Submit hợp lệ hiển thị “Demo brief created”.
3. Xác nhận nói rõ **nothing has been sent**.
4. Người dùng tự chọn Download brief hoặc Copy brief.
5. Thay đổi dữ liệu sau xác nhận sẽ ẩn brief cũ để tránh tải nội dung lỗi thời.

Không dùng từ “sent successfully”, “we will contact you” hoặc loading giả khi chưa có backend. Không gửi email, fetch API, lưu localStorage hoặc analytics trong luồng demo. Nếu clipboard không được cấp quyền, mở textarea để người dùng copy thủ công.

### 6.9. Footer

Footer có wordmark dạng chữ, mô tả ngắn, ba nhóm link và hàng legal. Tên thương hiệu, copyright và privacy phải rõ. Privacy của demo mô tả đúng hành vi thật, không tự tạo điều khoản pháp lý tổng quát cho doanh nghiệp.

## 7. Motion và accessibility

- Hover button: khoảng 200ms; hình card: 400–600ms, easing nhẹ.
- Không animate chiều rộng/chiều cao trang hoặc tạo layout shift khi ảnh tải. Hero và ảnh card được khai báo kích thước để giữ chỗ.
- Điều hướng anchor của phần gốc do Webflow điều khiển; không bật thêm `html { scroll-behavior: smooth }` để tránh hai cơ chế cuộn cạnh tranh. Dialog và form dùng `scrollIntoView` có kiểm tra reduced motion.
- Ảnh hero tải eager và `fetchpriority=high`; ảnh bên dưới lazy-load.
- Tôn trọng `prefers-reduced-motion`: bỏ smooth scroll, giảm animation/transition, không zoom ảnh.
- Focus outline: 3px xanh, offset 4px; không xoá outline mà không có thay thế.
- Không dùng hover làm cách duy nhất để mở nội dung.
- Tất cả field có label; trạng thái dùng `role=status`/`aria-live=polite`.
- Icon SVG trang trí có `aria-hidden=true`, `focusable=false`.
- Ảnh có ý nghĩa phải có alt; ảnh thuần trang trí giữ alt rỗng.
- Kiểm tra Tab/Shift+Tab, Enter/Space, Escape, dropdown và tab sau mỗi thay đổi runtime.

Đây là các tiêu chí triển khai; không được diễn đạt rằng trang đã được chứng nhận WCAG chỉ dựa trên việc có chúng.

## 8. Nội dung và giọng điệu

Website tiếp tục dùng tiếng Anh; tài liệu vận hành này dùng tiếng Việt. Ngôn ngữ ngắn gọn, có chủ ngữ và động từ cụ thể. Dùng sentence case cho heading, CTA và nhãn.

Ưu tiên “Start a project”, “Explore solutions”, “Create a project brief”. Tránh câu chữ mơ hồ như “Unlock infinite potential”, số liệu không có nguồn hoặc tuyên bố mọi dự án đều tăng chuyển đổi.

Một card nên có title, một câu mô tả và đúng một hành động chính. Thông tin mở rộng nằm trong disclosure hoặc dialog có cấu trúc. Không nhét toàn bộ service list vào hero.

Để xuất bản case study khách hàng trong tương lai, cần nội dung được xác nhận: tên dự án, quyền dùng hình ảnh, vai trò studio, phạm vi, kết quả có nguồn và ngày thực hiện.

## 9. Cấu trúc code và nguồn sự thật

```text
index.html                  # Homepage canonical
loon-lab.html               # Alias, đồng bộ với homepage
styles/site.css             # Tokens và layer chuẩn hoá/bổ sung
scripts/site.js             # Dialog, hash/history, form demo, copy/download
cdn.prod.website-files.com/ # CSS/runtime/ảnh/font gốc
assets/fonts/               # Font phụ và stylesheet local
vercel.json                 # Static routing
README.md                   # Preview/deploy/giới hạn
```

Không sửa minified vendor files để chỉnh UI. Đặt override có phạm vi trong `styles/site.css`; logic mới ở `scripts/site.js`. Giữ các Webflow `data-wf-page`, `data-wf-site`, class và ID mà interaction cần.

Badge “Made in Webflow” được tắt bằng việc bỏ metadata `data-wf-domain`/`data-wf-status` dùng để sinh badge, có CSS guard và xoá stale badge khi khởi tạo. Không xoá license headers hoặc tuyên bố các thư viện bên thứ ba là code độc quyền.

Không thêm package manager hoặc build system chỉ để phục vụ trang tĩnh này. Nếu hai bản HTML được sửa, cần đồng bộ để `/` và `/loon-lab` không khác nội dung.

## 10. Checklist nghiệm thu

- [ ] Một H1; section và heading có cấu trúc rõ.
- [ ] Không còn link placeholder `href="#"`; hash nào cũng có target.
- [ ] Không thấy badge Webflow sau reload và chờ runtime khởi tạo.
- [ ] Header dropdown mở/đóng; mobile menu đóng sau điều hướng.
- [ ] Ba tab có nội dung khác nhau và selected state đúng.
- [ ] Service details và FAQ dùng được bằng bàn phím.
- [ ] Exploration và insight mở nội dung, đóng bằng close/Escape/Back, trả focus.
- [ ] Form chặn email sai, field thiếu, mô tả ngắn và chỉ khoảng trắng.
- [ ] Form hợp lệ cho xác nhận demo, không giả vờ đã gửi thật.
- [ ] Download/copy tạo brief đúng; sửa input không giữ brief cũ.
- [ ] Không có request gửi form, backend hoặc analytics mới.
- [ ] Không tràn ngang ở 390px; kiểm tra thêm tablet/desktop và zoom 200%.
- [ ] Font/ảnh/CSS/JS local không bị 404; console không có lỗi phát sinh.
- [ ] Reduced motion được tôn trọng; focus visible và kích thước target đạt quy chuẩn.
- [ ] Cả `/` và `/loon-lab` hiển thị cùng phiên bản.

## 11. Chuyển từ demo sang form thật

Đây là công việc riêng sau khi có địa chỉ nhận và dịch vụ gửi form:

1. Chọn endpoint/server function hoặc nhà cung cấp; không hardcode secret trong HTML/JS.
2. Xác định trường cần lưu và nội dung thông báo privacy thực tế.
3. Validate lại phía server, giới hạn độ dài, chống spam và rate limit.
4. Bổ sung pending, success, failure và retry dựa trên phản hồi thật.
5. Giữ nội dung người dùng khi lỗi; chỉ nói đã gửi sau khi server xác nhận.
6. Bỏ nhãn demo và cập nhật FAQ/Privacy/README cùng lúc.

Không kích hoạt một hệ thống thu thập dữ liệu thật chỉ bằng việc đổi chữ trên CTA.

## 12. Layout contract cho section “How we do”

Section `#process` gồm hai hàng độc lập: khối `.tabs-3` phía trên, danh sách `.studio-process` phía dưới. Container `.loonlab-tab-container` dùng `display:block`; không để hai khối này trở thành hai flex item nằm ngang.

- Thanh tab căn giữa, có thể wrap và dùng `position:static` để luôn ở trên nội dung tab, không trôi xuống khi cuộn hoặc chụp toàn section.
- Tab content desktop dùng grid hai cột: hình tối đa 286px, nội dung tối đa 412px, gap 48px.
- Ảnh `.image-250` dùng `width:100%; height:auto; object-fit:contain`; tỷ lệ gốc 776:804. HTML width/height chỉ giữ chỗ, không được tạo chiều cao render cố định khi ảnh thu nhỏ.
- Dưới 768px: nội dung tab một cột, ảnh tối đa 264px và căn giữa.
- Timeline luôn nằm dưới toàn bộ nội dung tab, không được nằm cạnh thanh tab hoặc bên phải ảnh.
- CSS cho phần này được scope bằng `#process` để không ảnh hưởng các card hoặc tab khác.

Khi thay đổi, kiểm tra cả Strategic, Performance và Scalability. Đo bounding box phải cho thấy `timeline.top >= tabs.bottom`; tỷ lệ ảnh render phải gần `776 / 804`, không xuất hiện tràn ngang ở desktop và mobile.

## 13. Hình dạng control: không dùng pill

Button, tab, badge/tag và nút đóng dialog dùng hình chữ nhật bo góc **10px** (`--studio-radius`), thống nhất với CTA của giao diện gốc. Không dùng radius 50%, 100px hoặc 9999px cho các control này, kể cả ở hover, selected và mobile. Badge/tag vẫn là nhãn thông tin, không được giả thành nút bấm. Nút đóng dialog giữ target 44×44px nhưng bo góc nhẹ, không tròn.

Sau khi sửa, kiểm tra computed `border-radius` của primary, secondary, tab selected/unselected, tag và close button. Tất cả phải là 10px; không thay đổi logic tương tác chỉ để đổi hình dạng.

## 14. Button contract theo ảnh tham chiếu gốc

Quy tắc này thay thế các mô tả button trước đó nếu có khác biệt.

| Thuộc tính | Quy chuẩn |
| --- | --- |
| Chiều cao | 44px cho primary, secondary, summary dịch vụ và tab |
| Bo góc | 10px, không pill |
| Chữ | Inter 14px, weight 500, line-height 20px |
| Padding ngang | 16px; nội dung luôn căn giữa hai trục |
| Khoảng cách icon | 8px |
| Primary | Xanh `#146EF5`, chữ trắng, shadow gốc |
| Secondary | Xám `#F1F1F1`, chữ `#333333`, không shadow |
| Chevron secondary | Khung 20×20px, giữ tỷ lệ và đặt bên phải nhãn |
| Card action | See more + chevron, rộng toàn bộ thẻ, các nút cùng hàng có cùng baseline |

Hero và CTA trong nội dung dùng chiều rộng theo nhãn; chỉ CTA card và các action ở màn hình hẹp khi cần mới full-width. Nút See more mở native dialog chi tiết dịch vụ; chevron bên phải nhãn giữ hướng điều hướng. Không thay bằng link chữ và dấu cộng trải hết hàng. Không dùng dịch chuyển `translateY` khi hover để tránh baseline button thay đổi.

Kiểm tra cả primary, secondary, Explore/See more, tab, submit, download/copy và nút đóng dialog. Nút đóng là icon-only 44×44px, bo 10px, không thêm chevron. Badge/tag là nhãn thông tin, không kế thừa chiều cao button.

## 15. Layout contract: Human vision / animation

Section `#about` dùng hai cột **45% nội dung / 55% animation** trên desktop, sau khi trừ gap co giãn 32–64px. Cả hai cột phải dùng `minmax(0, …)` và `min-width:0` để kích thước tối thiểu của asset không ép cột nội dung co lại.

Nội dung theo thứ tự heading → mô tả → CTA, căn trái thống nhất; khối copy tối đa 520px trên desktop. Không đặt đoạn mô tả căn giữa phía dưới CTA. Hai cột căn giữa theo chiều dọc.

Asset giữ nguyên bốn hàng và tám dot mỗi hàng. Mỗi hàng là grid tám cột bằng nhau; kích thước dot phụ thuộc chiều rộng container, `aspect-ratio:1`, không dùng `6vw` cho chiều rộng/chiều cao tại section này. Không ghi đè transform do animation runtime điều khiển. Container asset tối đa 740px, có padding để blur không đè lên nội dung. Đây là hình trang trí, được đặt `aria-hidden=true`.

Ở ≤991px chuyển thành một cột, nội dung trước và animation sau; không đảo asset lên trên. Mobile giảm gap/padding nhưng vẫn giữ các dot tròn và không tràn ngang. Kiểm tra ở 1440px, 1024px và 390px: tỷ lệ cột desktop, thứ tự nội dung, asset không chồng chữ, tỷ lệ dot 1:1 trước transform và CTA không bị ép hẹp.

## 16. Service cards: nội dung ngắn, chi tiết tách riêng

Không dùng accordion mở nội dung dài bên trong một card của grid ba cột. Cách này làm tăng chiều cao hàng, đẩy CTA ở các card khác xuống và phá nhịp đọc.

Card có đúng bốn phần: ảnh 4:3 → tiêu đề → mô tả một câu ngắn → See more. Hình có cùng tỷ lệ; tên dịch vụ 20px/1.3, mô tả 16px/1.6; gap 20px desktop, 16px mobile. Mô tả không bị cắt bằng line-clamp; desktop giữ tối thiểu hai dòng để các CTA ổn định, mobile để chiều cao tự nhiên.

See more là link có accessible name riêng theo dịch vụ và `data-dialog`; khi mở, bố cục card phía sau không thay đổi kích thước. Dialog gồm heading, giới thiệu ngắn, hai nhóm Typical deliverables / A good starting point và một CTA. Desktop dialog dùng hai cột nội dung; mobile một cột. Close/Escape trả focus về đúng card. CTA trong dialog đóng popup, đi tới contact và chọn sẵn dịch vụ tương ứng, nhưng không gửi form.

Kiểm tra hồi quy: cả ba CTA cùng baseline ở desktop; mở/đóng từng dialog không đổi bounding box của card; nội dung popup không tràn mobile; service prefill đúng và vẫn chỉ là form demo.

## 17. Header mega-menu interaction surfaces

Every link in Solutions and Our lab uses a full-width interaction row with 12px vertical / 16px horizontal padding (12px on mobile), a 10px corner radius, and a minimum height of 64px. Keep icons at 24px with a 12px gap to the text. Use an 8px gap between rows. Hover and keyboard focus share the soft blue #EFF5FF surface and blue #146EF5 title/icon; descriptions retain their muted colour. Keyboard focus also has a 2px blue outline, offset 2px. Animate only background and colour over 180ms; padding, dimensions and position must stay stable. Apply to both mega menus, never just the text wrapper. The last column has no trailing divider.

## 18. Contact banner

Use four fields only: name, email, service and project message. Remove company and timeline. Keep the explicit local demo confirmation and brief copy/download flow. The banner uses the site's 10px radius, 48px desktop padding, two balanced columns and a compact white form surface. Inputs/selects have a 44px minimum height; use 14px labels and 16px body copy. Stack the columns below 992px and the name/email pair on narrow mobile screens. The form submit button spans the form width.

The decorative background follows an ordered-dither reference: saturated violet #633BFA square pixels on pale cyan #BFE7FB. Use a 7px grid, smoothly varying square pixels and a 4×4 Bayer matrix to vary density along a diagonal transition. Dense violet at the top dissolves into cyan below. Animate the density boundary with layered waves (up to 23% banner height) over approximately 6–9 seconds. Smooth pixel coverage continuously rather than toggling cells abruptly. Mouse movement creates a local density bulge and concentric ripple, following the cursor with 110ms smoothing and fading out on pointer leave. Touch input does not capture scrolling. Canvas stays behind content, ignores pointer events and is hidden from assistive technology. Keep readable white surfaces behind copy and form. Render at capped device pixel ratio 2, animate with requestAnimationFrame at the display refresh rate, pause outside the viewport and render a static frame for reduced motion. Resize without altering the banner layout.

### Randomized wave motion
Each page load seeds a fresh wave pattern. Smoothly interpolated random values modulate wave height, frequency, phase and vertical drift, with a stronger 20–27% primary wave and a 12% secondary wave. Keep randomness continuous over time; never regenerate per-frame noise. Preserve pointer ripples, reduced-motion handling and offscreen pausing.

## 19. CTA halftone cloud background

Supersedes the violet square dither background: use round brand-blue #146EF5 dots on white, on a 10px grid with radii up to 4.5px. A continuously evolving layered wave field forms organic clusters and negative spaces. Dense cores use lighter blue to echo the reference’s soft glow. Retain smooth cursor influence, offscreen/background-tab pausing and static reduced-motion rendering. Copy and form retain readable white surfaces.

CTA halftone update: use pastel blue #E6F0FF as both CSS fallback and canvas background; border #C9DDFB. The Scalability iframe SVG fits its viewport at width/height 100%, with document overflow hidden so no scrollbar track appears.

## 20. Service feature artwork

Use the coordinated generated gradient artworks in assets/services: Brand has interlocking identity forms, Web layered responsive interface planes, Motion a flowing ribbon. All share #146EF5 electric blue, ice blue, cyan and restrained periwinkle with soft gradient lighting. Keep the existing 4:3 image frame, cover sizing and 10px corners. Images contain no text; copy remains live HTML. Optimized JPEG assets are 1200px wide and approximately 100KB each.

## 21. Inside the lab abstract feature artwork

The lab uses three nonfigurative gradient studies in assets/lab: diffuse colour fields for Brand direction, refracted light planes for Digital interfaces, and flowing optical currents for Motion language. Keep brand blue/cyan/periwinkle with fine grain; avoid literal devices, logos and recognizable product forms. The matching study dialogs use the same image as their cards. Preserve existing frame ratio, radius, live text and links. Optimized images are 1200px wide JPEGs.

## 22. Expanded abstract palette for Solutions and Explore more

These two sections now use nonfigurative artwork from assets/editorial-v2. Keep blue #146EF5 as the anchor while varying pastel accents: Brand lavender/rose, Web mint/cyan, Motion periwinkle/peach; AI orchid/pink, Workflow turquoise/mint/lavender, Simplicity peach/ice lavender. Keep fine grain, soft optical gradients and controlled contrast. Avoid literal screens or sculptural product objects. Preserve all live copy, card layouts and interactions. Inside the lab retains its separate artwork family.

## 23. Shared pixel-fluid hero and CTA

Replace the hero collage image and previous CTA halftone renderer with the user-supplied pixel-fluid solver, adapted in scripts/pixel-fluid.js. Each canvas owns its solver state and measures its host. Keep the source lavender/blue/cyan/mint palette and #E3EDFC background. Hero preserves the original 4858:2763 visual ratio and 10px corners. CTA canvas stays behind text/form without pointer interception; mouse coordinates are collected on the banner parent. Touch scrolling remains native. ResizeObserver rebuilds the grid; IntersectionObserver and document visibility pause animation; reduced-motion users receive a static seeded frame. No external libraries or network calls are required.

### CTA calm mode
CTA fluid uses 6 ambient emitters, 8 seeds, slower fluid velocity and 35% palette/time drift speed. Background opacity is 35%, falling to 15% while the form is focused; animation pauses during focus within the banner. Pointer splats are disabled for CTA. Text and form panels are opaque white. Hero settings remain unchanged.

CTA balanced-mode adjustment: 12 emitters, 18 seeded pools, fluid speed 0.45, time drift at 80% of hero. Background opacity 70% at rest and 40% during form focus. Keep opaque white copy/form panels and focus pausing. Supersedes the earlier calm-mode values.
