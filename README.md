# 📖 Kuro Reader v2 | The Ultimate Manga & Novel Engine

<div align="center">
  <img src="https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android"/>
  <img src="https://img.shields.io/badge/UI-Jetpack_Compose-4285F4?style=for-the-badge&logo=jetpackcompose&logoColor=white" alt="Jetpack Compose"/>
  <img src="https://img.shields.io/badge/Architecture-MVVM-FF9900?style=for-the-badge" alt="MVVM"/>
  <img src="https://img.shields.io/badge/Status-Production_Ready-blue?style=for-the-badge" alt="Production Ready"/>
</div>

---

## 🌟 رحلة التطبيق (The Evolution: v1 to v2)
بدأ **Kuro Reader** كقارئ مانجا طموح (v1)، وتطور عبر اختبارات قاسية وتحديثات معمارية عميقة ليصبح في نسخته الثانية (v2) **محرك قراءة شامل**. تم دمج محرك الروايات المتقدم، نظام تخطي الحمايات (Cloudflare Bypass)، وتصميم "الزجاج السائل" (Liquid Glass) مع الميزات الأساسية القوية مثل المكتبة السرية والتحميلات، لتقديم تجربة قراءة تضاهي أضخم التطبيقات العالمية.

---

## ✨ ترسانة الميزات الشاملة (The Complete Arsenal)

### 🔐 1. الخصوصية والتتبع الذكي (Privacy & Tracking)
* **المكتبة السرية (Secret Vault):** نظام قفل مدمج يسمح بإخفاء أعمال معينة (مانجا/روايات) في مكتبة مشفرة لا تظهر في الواجهة الرئيسية.
* **الخريطة الحرارية للقراءة (Reading Heatmap):** تتبع إحصائيات القراءة اليومية (على مدار 365 يوماً) وعرضها بشكل بصري احترافي لتحفيز المستخدم على الاستمرار.
* **تتبع التقدم الدقيق (Smart Progress):** التطبيق يتذكر حرفياً أين توقفت! (آخر فصل تمت قراءته، نسبة التقدم، وتاريخ القراءة) لضمان استئناف سلس.
* **السجل الذكي (History):** واجهة مخصصة تعرض آخر الأعمال التي تفاعلت معها للعودة إليها بضغطة زر.

### 🖼️ 2. محرك المانجا والأوفلاين (Advanced Manga & Offline Engine)
* **التحميل المسبق للصور (Smart Pre-fetching):** تحميل الصفحات القادمة في الخلفية أثناء القراءة لمنع التقطيع أو الانتظار.
* **تنظيف الذاكرة الآمن (Memory Purging):** نظام ذكي يفرغ الذاكرة المؤقتة (Cache) بشكل دوري لحماية التطبيق من الانهيار (OOM) في الفصول الطويلة.
* **مدير التحميلات (Download Manager):** إمكانية تحميل الفصول كاملة للقراءة بدون إنترنت، مع مؤشرات تحميل حية (Progress Indicators) لكل فصل.
* **شبكة عرض احترافية (Fixed 4-Grid):** أبعاد مدروسة (0.68f Aspect Ratio) لعرض الأغلفة.

### 📖 3. محرك الروايات المتطور (The Novel Engine) - *ميزة حصرية لـ v2*
* **قراءة غامرة (Immersive Edge-to-Edge):** اختفاء تلقائي لشريط البطارية وأزرار النظام أثناء القراءة.
* **تنسيق عربي هندسي (RTL Typography):** ضبط دقيق ومثالي للنصوص العربية، يشمل المحاذاة الكاملة، وتصحيح علامات الترقيم.
* **6 ثيمات قراءة مخصصة:** (ليلي، شاشة OLED، ورق قديم، ورق أبيض، حماية العين، ورمادي داكن).
* **لوحة تحكم القراءة (Reader Control Panel):** قائمة سفلية لتعديل (حجم الخط، ارتفاع الأسطر، والمسافات البادئة للفقرات) لحظياً.

### 🎨 4. ثورة التصميم والواجهات (Liquid Glass & Cinematic UI)
* **واجهة الزجاج السائل (Liquid Glass):** شريط تنقل سفلي شفاف يعتمد على الأيقونات فقط لتوفير أقصى مساحة بصرية.
* **الانتقالات السينمائية (Shared Element Transitions):** طيران سلس لأغلفة المانجا من شاشات الاستكشاف والمكتبة إلى شاشة التفاصيل.
* **تأثيرات النبض والتحميل (Shimmer & Spring Animations):** شبكة Shimmer احترافية للتحميل، وتأثير "النبض" (120Hz) عند التفاعل مع العناصر.
* **الوسوم الذكية (Premium Badges):** عرض التقييم (⭐)، والمفضلات (❤️ بتنسيق 1.2K)، وحالة العمل بأسلوب فاخر.

### 🕵️‍♂️ 5. كاسر الحماية والسحب الذكي (Stealth Scraper & Bypasser)
* **محرك التخطي الهجين (Cloudflare Bypasser):** استخدام متصفح خفي (WebView) مع إعادة محاولة ذكية (Retry Logic) لتخطي حماية المواقع الصارمة واستخراج ملفات الارتباط (Cookies).
* **التوليد الديناميكي للفصول (Dynamic Chapter Generation):** خوارزمية ذكية تتنبأ بروابط الفصول في حال فشل السحب المباشر من الموقع.
* **سحب البيانات الميتة (Meta-Data Extraction):** استخراج بيانات (التقييم، النوع، تاريخ التحديث) بدقة فائقة من كلاسات الـ HTML المعقدة ووسوم `og:title`.

### ⚡ 6. المزامنة والإشعارات (Background Sync) - *قيد التفعيل للإنتاج*
* **مزامنة خلفية صامتة (WorkManager):** فحص سيرفرات المواقع كل 12 ساعة في الخلفية للبحث عن تحديثات للمفضلات.
* **إشعارات فورية (Push Notifications):** تنبيهات أنيقة فور صدور فصول جديدة.
* **بحث فوري في الفصول:** حقل بحث سريع داخل شاشة التفاصيل (Real-time Filtering) للقفز مباشرة إلى أي فصل.

### 💾 7. الجاهزية للإنتاج (Production Ready)
* **حفظ محلي فائق (Room Database):** حفظ الفصول والبيانات في قاعدة البيانات باستخدام تقنية الـ JSON Arrays (Zero DB Migration Trick).
* **الكود الآمن (ProGuard & R8):** كود مضغوط، مشفر، ومحمي بقواعد استثناء صارمة.
* **جاهزية الترجمة (Localization Ready):** كود نظيف خالٍ من النصوص الثابتة ومربوط بملفات `strings.xml`.

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
> **"Kuro Reader: بُرمِج بشغف، ليُقرأ بمتعة."** 👑
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
