<div align="center">

# 🦉 Kuro Manga - كورو مانجا

**A Next-Generation, Ultra-Optimized Manga & Manhwa Reader built with pure Jetpack Compose.**

[![Kotlin](https://img.shields.io/badge/Kotlin-1.9+-blue.svg?logo=kotlin)](https://kotlinlang.org)
[![Jetpack Compose](https://img.shields.io/badge/Jetpack%20Compose-UI-success.svg?logo=android)](https://developer.android.com/jetpack/compose)
[![Architecture](https://img.shields.io/badge/Architecture-MVVM-orange.svg)]()
[![License](https://img.shields.io/badge/License-MIT-purple.svg)]()

<br>
<img src="https://via.placeholder.com/800x400?text=Kuro+Manga+Showcase+Image" alt="Kuro App Showcase" width="100%">
<br>

</div>

## 📌 عن التطبيق (About)
**Kuro** ليس مجرد قارئ مانجا تقليدي، بل هو "محرك قراءة" (Reading Engine) تم هندسته من الصفر لتقديم أقصى درجات الأداء على هواتف الأندرويد. يجمع التطبيق بين الواجهة الزجاجية الفاخرة (Liquid Glass UI)، والاستهلاك شبه المعدوم للذاكرة، مع نظام شبكات ذكي يوفر استهلاك البيانات ويتخطى حمايات السيرفرات تلقائياً.

---

## ✨ المميزات المعمارية والبصرية (Key Features)

### 🚀 1. محرك الشبكة الذكي (Adaptive Smart Proxy)
- **توفير البيانات (Data Saver):** دمج إنترسبتور ذكي يحول صيغ الصور الثقيلة (PNG/JPG) إلى `WebP` حياً، مع جودة ديناميكية تتكيف مع الشبكة (`85%` للـ WiFi و `60%` للبيانات الخلوية).
- **التخطي التلقائي (Smart Fallback):** نظام مقاوم للأعطال (Bulletproof)؛ إذا رفض سيرفر المانجا البروكسي (Error 403)، يقوم التطبيق بإغلاق الطلب والتحويل للرابط المباشر في أجزاء من الثانية دون أن يشعر المستخدم.

### 🧠 2. إدارة ذاكرة صارمة (Zero-OOM Architecture)
- الاعتماد على `Bitmap.Config.RGB_565` داخل مكتبة Coil لقص قنوات الشفافية غير المستخدمة في المانجا، مما يؤدي إلى **توفير 50% من استهلاك الرام (RAM)**. يمكنك تمرير فصول مانهوا طويلة جداً (100+ صفحة) بنعومة حريرية.

### 🎨 3. واجهة الزجاج السائل (Liquid Glass UI)
- تصميم Minimalist فاخر يعتمد على اللون الأسود النقي (Pure AMOLED Black) لتوفير البطارية.
- شريط تنقل سفلي عائم (Floating Bottom Navigation) بخلفية زجاجية شفافة، تنزلق تحته أغلفة المانجا بسلاسة مذهلة.

### 🎛️ 4. تجربة قراءة غامرة (Immersive Reading UX)
- **إيماءات متقدمة:** نظام ذكي يجمع بين التكبير (Pinch-to-Zoom) والتمرير بسلاسة دون تداخل في الإيماءات (Gesture Conflicts).
- **إخفاء القوائم (Immersive Mode):** بضغطة واحدة، تختفي جميع الواجهات لتترك الشاشة بأكملها للقصة.

### 💾 5. التخزين المحلي السريع (Local Persistence)
- نظام تفضيل (Bookmarking) مدمج وسريع، يحفظ حالة المانجات المفضلة محلياً لضمان تجربة مستخدم خالية من أي تأخير (Zero-Latency State).

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
