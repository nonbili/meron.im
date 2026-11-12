import { Locale, defaultLocale } from './i18n';
export type BlogIndexStrings = { title: string; description: string; readPost: string; allPosts: string };
export const BLOG_INDEX_STRINGS: Record<Locale, BlogIndexStrings> = {
  en: {
    title: "Blog",
    description: "Release notes, deep dives, and updates from building a calmer, local-first email client.",
    readPost: "Read post",
    allPosts: "All posts",
  },
  zh_Hans: {
    title: "博客",
    description: "关于构建更安静、本地优先的邮件客户端的发布公告、深度解析与最新动态。",
    readPost: "阅读全文",
    allPosts: "全部文章",
  },
  zh_Hant: {
    title: "部落格",
    description: "關於打造更平靜、本機優先的郵件客戶端的發布公告、深度解析與最新進展。",
    readPost: "閱讀全文",
    allPosts: "全部文章",
  },
  ja: {
    title: "ブログ",
    description: "より穏やかなローカルファーストメールクライアント「Meron」の開発記、リリース案内、最新情報をお届けします。",
    readPost: "記事を読む",
    allPosts: "すべての記事",
  },
  ko: {
    title: "블로그",
    description: "더 차분한 로컬 우선 이메일 클라이언트를 만드는 과정의 출시 소식, 심층 분석, 최신 업데이트입니다.",
    readPost: "글 읽기",
    allPosts: "모든 글",
  },
  de: {
    title: "Blog",
    description: "Veröffentlichungshinweise, Einblicke und Updates zur Entwicklung eines ruhigeren, lokal orientierten E-Mail-Clients.",
    readPost: "Beitrag lesen",
    allPosts: "Alle Beiträge",
  },
  fr: {
    title: "Blog",
    description: "Notes de version, analyses détaillées et actualités autour de la création d'un client e-mail plus serein et axé sur le local.",
    readPost: "Lire l'article",
    allPosts: "Tous les articles",
  },
  es: {
    title: "Blog",
    description: "Notas de lanzamiento, análisis a fondo y actualizaciones sobre el desarrollo de un cliente de correo más sereno y local-first.",
    readPost: "Leer artículo",
    allPosts: "Todos los artículos",
  },
  it: {
    title: "Blog",
    description: "Note di rilascio, approfondimenti e aggiornamenti sullo sviluppo di un client e-mail più sereno e local-first.",
    readPost: "Leggi l'articolo",
    allPosts: "Tutti gli articoli",
  },
  pt: {
    title: "Blog",
    description: "Notas de lançamento, análises aprofundadas e novidades sobre o desenvolvimento de um cliente de e-mail mais tranquilo e local-first.",
    readPost: "Ler artigo",
    allPosts: "Todos os artigos",
  },
  pt_BR: {
    title: "Blog",
    description: "Notas de lançamento, análises detalhadas e atualizações sobre a criação de um cliente de e-mail mais tranquilo e local-first.",
    readPost: "Ler artigo",
    allPosts: "Todos os artigos",
  },
  ar: {
    title: "المدونة",
    description: "إعلانات الإصدارات، والتحليلات العميقة، وآخر التحديثات حول بناء عميل بريد إلكتروني هادئ ومحلي أولاً.",
    readPost: "قراءة المقال",
    allPosts: "كل المقالات",
  },
  pl: {
    title: "Blog",
    description: "Informacje o wydaniach, szczegółowe analizy i aktualności z tworzenia spokojniejszego, lokalnego klienta poczty e-mail.",
    readPost: "Przeczytaj wpis",
    allPosts: "Wszystkie wpisy",
  },
  ru: {
    title: "Блог",
    description: "Примечания к выпускам, подробные разборы и новости о создании более спокойного почтового клиента с упором на локальное хранение.",
    readPost: "Читать запись",
    allPosts: "Все записи",
  },
  sv: {
    title: "Blogg",
    description: "Versionsnyheter, fördjupningar och uppdateringar från bygget av en lugnare, lokal-först e-postklient.",
    readPost: "Läs inlägget",
    allPosts: "Alla inlägg",
  },
  tr: {
    title: "Blog",
    description: "Daha sakin ve yerel öncelikli bir e-posta istemcisi oluşturma sürecinden sürüm notları, derinlemesine incelemeler ve güncellemeler.",
    readPost: "Yazıyı oku",
    allPosts: "Tüm yazılar",
  },
  vi: {
    title: "Blog",
    description: "Thông báo phát hành, phân tích chuyên sâu và cập nhật từ quá trình xây dựng ứng dụng email bình yên, ưu tiên lưu trữ cục bộ.",
    readPost: "Đọc bài viết",
    allPosts: "Tất cả bài viết",
  },
  el: {
    title: "Ιστολόγιο",
    description: "Σημειώσεις έκδοσης, αναλύσεις και ενημερώσεις από την ανάπτυξη ενός πιο ήρεμου, local-first προγράμματος-πελάτη ηλεκτρονικού ταχυδρομείου.",
    readPost: "Ανάγνωση άρθρου",
    allPosts: "Όλα τα άρθρα",
  },
  et: {
    title: "Blogi",
    description: "Versiooniuuendused, süvaanalüüsid ja värsked uudised rahulikuma ning kohalikule andmesalvestusele suunatud e-posti kliendi arendusest.",
    readPost: "Loe postitust",
    allPosts: "Kõik postitused",
  },
  lv: {
    title: "Emuārs",
    description: "Laidienu piezīmes, padziļināti pārskati un jaunumi par mierīgāka, lokāli orientēta e-pasta klienta izstrādi.",
    readPost: "Lasīt rakstu",
    allPosts: "Visi raksti",
  },
  id: {
    title: "Blog",
    description: "Catatan rilis, ulasan mendalam, dan kabar terbaru dari pembuatan klien email yang lebih tenang dan mengutamakan lokal.",
    readPost: "Baca artikel",
    allPosts: "Semua artikel",
  },
  nl: {
    title: "Blog",
    description: "Releasenotes, diepgaande artikelen en updates over het bouwen van een rustigere, lokaal-eerst e-mailclient.",
    readPost: "Lees bericht",
    allPosts: "Alle berichten",
  },
  uk: {
    title: "Блог",
    description: "Примітки до випусків, детальні огляди та новини розробки спокійнішого поштового клієнта з локальним збереженням.",
    readPost: "Читати допис",
    allPosts: "Усі дописи",
  },
};


export function formatBlogDate(date: string, locale: Locale = defaultLocale): string {
  const intlLocale =
    locale === "zh_Hans"
      ? "zh-CN"
      : locale === "zh_Hant"
      ? "zh-TW"
      : locale === "pt_BR"
      ? "pt-BR"
      : locale;

  try {
    return new Intl.DateTimeFormat(intlLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));
  } catch {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));
  }
}


export function getBlogIndexStrings(locale: Locale = defaultLocale) { return BLOG_INDEX_STRINGS[locale] || BLOG_INDEX_STRINGS[defaultLocale]; }
