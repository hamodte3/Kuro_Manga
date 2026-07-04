# 📖 Kuro Reader v2 | القارئ الشامل

<div align="center">
  <img src="https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android"/>
  <img src="https://img.shields.io/badge/UI-Jetpack_Compose-4285F4?style=for-the-badge&logo=jetpackcompose&logoColor=white" alt="Jetpack Compose"/>
  <img src="https://img.shields.io/badge/Language-Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white" alt="Kotlin"/>
  <img src="https://img.shields.io/badge/Architecture-MVVM-FF9900?style=for-the-badge" alt="MVVM Architecture"/>
</div>

---

## 🌟 نبذة عن التطبيق (Overview)
**Kuro Reader** ليس مجرد تطبيق قراءة تقليدي، بل هو **محرك هندسي متكامل** مصمم لتقديم تجربة قراءة خالية من القيود للمانجا، المانهوا، والروايات. تم بناء التطبيق بلغة التصميم الحديثة **(Liquid Glass / Minimalist)**، مع التركيز التام على الأداء الصاروخي، راحة العين، وتخطي أعتى حمايات المواقع (مثل Cloudflare) بصمت تام. 

---

## ✨ المميزات الحصرية (Key Features)

### 🎨 1. تصميم "الزجاج السائل" والانتقالات السينمائية (Liquid Glass UI & UX)
* **واجهة خالية من المشتتات:** شريط تنقل سفلي يعتمد على الأيقونات الأنيقة فقط، مع خلفيات زجاجية شفافة.
* **Shared Element Transitions:** انتقال سلس وسينمائي لأغلفة المانجا من شاشة الاستكشاف (Discover) إلى شاشة التفاصيل، مما يعطي إحساساً بالفخامة وسرعة الاستجابة.
* **Shimmer Loading:** تأثيرات تحميل احترافية بدلاً من مؤشرات التحميل المزعجة.

### 📖 2. محرك قراءة الروايات المتطور (Advanced Novel Engine)
* **6 ثيمات مصممة هندسياً:** (ليلي، شاشة OLED، ورق قديم، ورق أبيض، حماية العين، ورمادي داكن) لتناسب جميع ظروف الإضاءة.
* **قراءة غامرة (Immersive Edge-to-Edge):** اختفاء تلقائي لشريط البطارية وأزرار النظام أثناء القراءة للتركيز التام على النص.
* **تنسيق عربي مثالي (RTL Typography):** ضبط دقيق لعلامات الترقيم والمحاذاة، مع لوحة تحكم سفلية لتخصيص (حجم الخط، ارتفاع السطر، والمسافة البادئة للفقرات) لحظياً.

### ⚡ 3. كاسر الحماية والسحب الذكي (Smart Scraper & Bypasser)
* **نظام التخطي الهجين:** استخدام محرك متصفح خفي لتخطي حمايات المواقع (Cloudflare / JS Challenges) وسحب البيانات الصافية بسرعة فائقة باستخدام `Jsoup`.
* **تنظيف النصوص المتقدم:** فلترة ذكية لفقرات الروايات لإزالة الإعلانات، النصوص المزعجة، والمسافات البيضاء العشوائية.

### 🔔 4. المزامنة الذكية والإشعارات (Background Sync)
* بفضل مكتبة `WorkManager`، يعمل التطبيق بصمت كل 12 ساعة للتحقق من المفضلات.
* **إشعارات فورية (Push Notifications):** إرسال إشعار أنيق فور صدور فصل جديد لأي عمل تمت إضافته للمفضلة.

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
