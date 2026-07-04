# 📖 Kuro Reader v2 | The Ultimate Manga & Novel Engine

<div align="center">
  <img src="https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android"/>
  <img src="https://img.shields.io/badge/UI-Jetpack_Compose-4285F4?style=for-the-badge&logo=jetpackcompose&logoColor=white" alt="Jetpack Compose"/>
  <img src="https://img.shields.io/badge/Architecture-MVVM-FF9900?style=for-the-badge" alt="MVVM"/>
  <img src="https://img.shields.io/badge/Status-Production_Ready-blue?style=for-the-badge" alt="Production Ready"/>
</div>

---

## 🌟 رؤية المشروع (The Vision)
**Kuro Reader v2** ليس مجرد تحديث، بل هو إعادة بناء كاملة (From Scratch) لمحرك قراءة متطور يدمج بين عوالم المانجا والروايات في تطبيق واحد. تم تصميم التطبيق بعقلية هندسية صارمة ليتجاوز حمايات المواقع، يقدم أداءً لا يضاهى، ويأسر عين المستخدم بلغة تصميم "الزجاج السائل" (Liquid Glass) والانتقالات السينمائية.

---

## ✨ المميزات الشاملة (The Complete Feature Set)

### 🎨 1. ثورة التصميم والواجهات (Liquid Glass & Cinematic UI)
* **واجهة الزجاج السائل (Liquid Glass):** شريط تنقل سفلي (Bottom Bar) شفاف وفاخر، يعتمد على الأيقونات فقط (Icon-Only) بدون نصوص، لتوفير أقصى مساحة بصرية.
* **الانتقالات السينمائية (Shared Element Transitions):** طيران سلس لأغلفة المانجا من شاشة الاستكشاف (Discover) إلى شاشة التفاصيل (Detail Screen) بدون أي تقطيع.
* **تأثيرات النبض والتحميل (Shimmer & Spring Animations):** استبدال مؤشرات التحميل المملة بشبكة Shimmer احترافية، مع تأثير "النبض" (120Hz Spring Animation) عند الضغط على أي عمل.
* **الوسوم الذكية (Premium Badges):** تصميم أوسمة تفصيلية لعرض (التقييم ⭐، عدد الإعجابات ❤️ بتنسيق 1.2K، وحالة العمل) بأسلوب تطبيقات الفئة العليا.
* **نوافذ المعاينة (Hover Previews):** دعم متقدم لأقلام (Stylus) وفئران التحكم (Mouse)، حيث تظهر نافذة زجاجية عائمة (Popup) تحتوي على قصة العمل وتقييمه بمجرد تمرير المؤشر على الغلاف.

### 📖 2. محرك الروايات المتطور (The Novel Engine)
* **قراءة غامرة (Immersive Edge-to-Edge):** اختفاء تلقائي لشريط البطارية وأزرار النظام أثناء القراءة للتركيز التام، مع ظهورها بسلاسة عند لمس الشاشة.
* **تنسيق عربي هندسي (RTL Typography):** ضبط دقيق ومثالي للنصوص العربية، يشمل المحاذاة الكاملة (Justify/Right)، وتصحيح أماكن علامات الترقيم.
* **6 ثيمات قراءة مخصصة:** (ليلي، شاشة OLED، ورق قديم، ورق أبيض، حماية العين، ورمادي داكن) لتناسب جميع الأذواق وظروف الإضاءة.
* **لوحة تحكم القراءة (Reader Control Panel):** قائمة سفلية تتيح للمستخدم تعديل (حجم الخط، ارتفاع الأسطر Line Height، والمسافات البادئة للفقرات Indentation) بشكل لحظي.

### 🖼️ 3. محرك المانجا وإدارة الصور (The Manga Engine)
* **شبكة عرض احترافية (Fixed 4-Grid):** أبعاد مدروسة (0.68f Aspect Ratio) لعرض الأغلفة بشكل موحد وأنيق.
* **إدارة الذاكرة (Coil Integration):** تحميل الصور، معالجتها، وحفظها في الذاكرة المؤقتة (Caching) لضمان تمرير سلس (Smooth Scrolling) في الفصول الطويلة.

### 🕵️‍♂️ 4. نظام السحب وتخطي الحماية (Stealth Scraper & Bypasser)
* **كاسر الحماية (Cloudflare Bypasser):** استخدام متصفح خفي (WebView) مدعوم بنظام إعادة محاولة ذكي (Retry Logic) لتخطي تحديات JS وحماية سيرفرات المواقع (مثل Azora).
* **سحب البيانات الميتة (Meta-Data Extraction):** القضاء على أخطاء تغير الكلاسات في المواقع عبر سحب الأسماء الصافية للروايات والمانجا من وسوم `og:title`.
* **فلترة النصوص الذكية:** تنظيف فصول الروايات من الأسطر الفارغة والإعلانات المدمجة لتوفير نص نقي للقارئ.

### ⚡ 5. المزامنة الذكية والإشعارات (Background Power)
* **مزامنة خلفية صامتة (WorkManager):** فحص سيرفرات المواقع كل 12 ساعة في الخلفية للبحث عن التحديثات لأعمالك المفضلة.
* **إشعارات فورية (Push Notifications):** تنبيهات أنيقة فور صدور فصول جديدة لتبقيك دائماً في قلب الحدث.
* **بحث فوري في الفصول:** حقل بحث سريع داخل شاشة التفاصيل (Real-time Filtering) للقفز مباشرة إلى أي فصل دون الحاجة للتمرير.

### 💾 6. الأداء، الأوفلاين، والإنتاج (Production Ready)
* **حفظ محلي فائق (Room Database):** دعم كامل للقراءة بدون إنترنت عبر حفظ الفصول (صوراً ونصوصاً) في قاعدة البيانات باستخدام تقنية الـ JSON Arrays (Zero DB Migration Trick).
* **الكود الآمن (ProGuard & R8):** كود مضغوط، مشفر، ومحمي بقواعد استثناء (Keep Rules) صارمة تضمن عدم تعطل التطبيق في بيئة الإنتاج.
* **جاهزية الترجمة (Localization Ready):** تنظيف كامل للكود من النصوص الثابتة (Hardcoded Strings) وربطها بملفات `strings.xml`.
* **اختصار النصوص (Copywriting Polish):** نصوص واجهة مستخدم قصيرة، معبرة، ومريحة للعين.

---

## 🛠️ البنية التقنية (Tech Stack)
* **UI/UX:** Jetpack Compose, Material 3, Accompanist (System UI), Shared Element Transitions.
* **Architecture:** MVVM, Clean Architecture, Single Source of Truth.
* **Async & State:** Kotlin Coroutines, StateFlow / SharedFlow.
* **Networking & Scraping:** Jsoup, WebView (Headless Bypass).
* **Storage:** Room Database (SQLite), Datastore.
* **Background Tasks:** WorkManager.
* **Image Loading:** Coil.

---
> **"تمت هندسة هذا التطبيق ليس فقط ليعمل، بل ليبهر."** 👑

### 💾 5. الأداء وقواعد البيانات (Performance & Offline Support)
* **Room Database:** حفظ الفصول (صور ونصوص JSON) محلياً لسرعة الوصول والقراءة بدون إنترنت.
* **بحث فوري:** ميزة البحث السريع برقم الفصل للقفز مباشرة في الأعمال الطويلة (Real-time Filtering).
* **ProGuard / R8 Ready:** كود مضغوط ومحمي بالكامل بفضل قواعد استثناء دقيقة، لضمان استقرار التطبيق وسرعته كنسخة إنتاجية (Production-Ready).
* **Localization Ready:** كود نظيف خالٍ من النصوص الثابتة (Hardcoded Strings)، جاهز للترجمة لأي لغة.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)
* **الواجهة:** Jetpack Compose, Material 3, Accompanist (System UI).
* **الهندسة:** MVVM (Model-View-ViewModel), Clean Architecture Principles.
* **إدارة البيانات:** Room Database, Kotlin Flow / StateFlow, Coroutines.
* **الشبكات والسحب:** Jsoup (HTML Parsing), Coil (Image Loading & Caching).
* **المهام الخلفية:** WorkManager.

---

## 🚀 البناء والتثبيت (Build & Install)
1. قم باستنساخ المشروع (Clone).
2. تأكد من استخدام أحدث إصدار من **Android Studio**.
3. التطبيق يدعم الـ `minifyEnabled true`. إذا واجهت مشكلة في الـ Build النهائي، تأكد من مراجعة قواعد `proguard-rules.pro`.
4. اضغط `Run` واستمتع بتجربة القراءة الأفضل على الإطلاق!

---
*صُنع بشغف، ليُقدم تجربة قراءة لا تُضاهى.* ☕💻

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

تم بناء التطبيق باستخدام أحدث معايير تطوير الأندرويد (Modern Android Development):

* **Language:** [Kotlin](https://kotlinlang.org/) (100%)
* **UI Toolkit:** [Jetpack Compose](https://developer.android.com/jetpack/compose)
* **Architecture:** MVVM (Model-View-ViewModel) + Clean Architecture principles
* **Networking:** [OkHttp3](https://square.github.io/okhttp/) (Custom Interceptors)
* **Image Loading:** [Coil](https://coil-kt.github.io/coil/) (Optimized with custom OkHttpClient)
* **Web Scraping:** [Jsoup](https://jsoup.org/)
* **Asynchronous:** Kotlin Coroutines & StateFlow

---

## 📸 لقطات الشاشة (Screenshots)

<div align="center">
  <img src="https://via.placeholder.com/250x500?text=Discover" width="24%">
  <img src="https://via.placeholder.com/250x500?text=Manga+Details" width="24%">
  <img src="https://via.placeholder.com/250x500?text=Immersive+Reader" width="24%">
  <img src="https://via.placeholder.com/250x500?text=Liquid+Glass+Nav" width="24%">
</div>

---

## 🤝 المساهمة (Contributing)
المشروع مفتوح لأي تحسينات! سواء كانت إصلاحات برمجية (Bug fixes)، أو تحسينات في واجهة المستخدم (UI improvements)، لا تتردد في فتح `Pull Request` أو الإبلاغ عن مشكلة في قسم الـ `Issues`.

## 📜 الترخيص (License)
هذا المشروع مرخص بموجب [MIT License](LICENSE).
