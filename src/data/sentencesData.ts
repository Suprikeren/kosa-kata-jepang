import { SentenceItem, PracticeCategory } from '../types';

export const SENTENCE_PRACTICE_ITEMS: SentenceItem[] = [
  // ==========================================
  // 1. KATA DASAR (BASIC VOCABULARY)
  // ==========================================
  {
    id: 'kata-1',
    category: 'kata-dasar',
    levelTitle: 'Kata Dasar: Hewan & Makhluk',
    japanese: 'ねこ',
    romaji: 'neko',
    indonesian: 'Kucing',
    explanation: 'Kata benda dasar untuk kucing. Terdiri dari karakter "ne" (ね) dan "ko" (こ).',
    options: ['Kucing', 'Anjing', 'Burung', 'Ikan'],
    correctAnswer: 'Kucing',
    acceptedAnswers: ['neko', 'kucing', 'neko (kucing)', 'cat'],
    hint: 'Hewan berkaki empat yang suka mengeong (meong). Romaji: n_k_',
  },
  {
    id: 'kata-2',
    category: 'kata-dasar',
    levelTitle: 'Kata Dasar: Hewan & Makhluk',
    japanese: 'いぬ',
    romaji: 'inu',
    indonesian: 'Anjing',
    explanation: 'Kata benda dasar untuk anjing. Terdiri dari vokal "i" (い) dan "nu" (ぬ).',
    options: ['Anjing', 'Kucing', 'Kelinci', 'Kuda'],
    correctAnswer: 'Anjing',
    acceptedAnswers: ['inu', 'anjing', 'dog'],
    hint: 'Hewan setia penjaga rumah yang menggonggong. Romaji: i_u',
  },
  {
    id: 'kata-3',
    category: 'kata-dasar',
    levelTitle: 'Kata Dasar: Kebutuhan & Alam',
    japanese: 'みず',
    romaji: 'mizu',
    indonesian: 'Air',
    explanation: 'Kata benda untuk air mineral / air minum dingin. Berasal dari "mi" (み) dan dakuten "zu" (ず).',
    options: ['Air', 'Teh', 'Nasi', 'Susu'],
    correctAnswer: 'Air',
    acceptedAnswers: ['mizu', 'air', 'water'],
    hint: 'Cairan bening yang kita minum saat haus. Romaji: m__u',
  },
  {
    id: 'kata-4',
    category: 'kata-dasar',
    levelTitle: 'Kata Dasar: Makanan & Minuman',
    japanese: 'ごはん',
    romaji: 'gohan',
    indonesian: 'Nasi / Makanan',
    explanation: 'Dapat berarti nasi putih matang maupun sajian makanan secara umum.',
    options: ['Nasi / Makanan', 'Roti', 'Mie', 'Daging'],
    correctAnswer: 'Nasi / Makanan',
    acceptedAnswers: ['gohan', 'nasi', 'makanan', 'rice', 'meal'],
    hint: 'Makanan pokok orang Asia dan Jepang. Romaji: g_h_n',
  },
  {
    id: 'kata-5',
    category: 'kata-dasar',
    levelTitle: 'Kata Dasar: Alam & Tempat',
    japanese: 'やま',
    romaji: 'yama',
    indonesian: 'Gunung',
    explanation: 'Contohnya seperti Gunung Fuji (Fuji-san / Fuji-no-yama). "ya" (や) dan "ma" (ま).',
    options: ['Gunung', 'Laut', 'Sungai', 'Hutan'],
    correctAnswer: 'Gunung',
    acceptedAnswers: ['yama', 'gunung', 'mountain'],
    hint: 'Dataran tinggi menjulang tinggi seperti Fuji. Romaji: y__a',
  },
  {
    id: 'kata-6',
    category: 'kata-dasar',
    levelTitle: 'Kata Dasar: Alam & Tempat',
    japanese: 'うみ',
    romaji: 'umi',
    indonesian: 'Laut',
    explanation: 'Perairan luas samudra. Terdiri dari huruf "u" (う) dan "mi" (み).',
    options: ['Laut', 'Danau', 'Pantai', 'Pulau'],
    correctAnswer: 'Laut',
    acceptedAnswers: ['umi', 'laut', 'sea', 'ocean'],
    hint: 'Tempat berombak dengan air asin. Romaji: u_i',
  },
  {
    id: 'kata-7',
    category: 'kata-dasar',
    levelTitle: 'Kata Dasar: Tempat Tinggal',
    japanese: 'いえ',
    romaji: 'ie',
    indonesian: 'Rumah',
    explanation: 'Tempat tinggal keluarga. Terdiri dari dua vokal: "i" (い) dan "e" (え).',
    options: ['Rumah', 'Sekolah', 'Kantor', 'Toko'],
    correctAnswer: 'Rumah',
    acceptedAnswers: ['ie', 'rumah', 'house', 'home'],
    hint: 'Tempat kita pulang beristirahat bersama keluarga. Romaji: i_',
  },
  {
    id: 'kata-8',
    category: 'kata-dasar',
    levelTitle: 'Kata Dasar: Hubungan Sosial',
    japanese: 'ともだち',
    romaji: 'tomodachi',
    indonesian: 'Teman / Sahabat',
    explanation: 'Sahabat atau kawan akrab. "to" (と) + "mo" (も) + "da" (だ) + "chi" (ち).',
    options: ['Teman / Sahabat', 'Guru', 'Orang tua', 'Keluarga'],
    correctAnswer: 'Teman / Sahabat',
    acceptedAnswers: ['tomodachi', 'teman', 'sahabat', 'friend'],
    hint: 'Orang yang bermain atau belajar bersama kita. Romaji: t_m_d_chi',
  },
  {
    id: 'kata-9',
    category: 'kata-dasar',
    levelTitle: 'Kata Dasar: Bahasa & Komunikasi',
    japanese: 'にほんご',
    romaji: 'nihongo',
    indonesian: 'Bahasa Jepang',
    explanation: 'Nihon (Jepang) + go (akhiran bahasa). Bahasa yang sedang kamu pelajari sekarang!',
    options: ['Bahasa Jepang', 'Bahasa Inggris', 'Orang Jepang', 'Negara Jepang'],
    correctAnswer: 'Bahasa Jepang',
    acceptedAnswers: ['nihongo', 'bahasa jepang', 'japanese language'],
    hint: 'Bahasa dari negeri matahari terbit. Romaji: n_h_ng_',
  },
  {
    id: 'kata-10',
    category: 'kata-dasar',
    levelTitle: 'Kata Dasar: Ungkapan Salam',
    japanese: 'ありがとう',
    romaji: 'arigatou',
    indonesian: 'Terima kasih',
    explanation: 'Ungkapan rasa terima kasih dan apresiasi yang paling populer dalam bahasa Jepang.',
    options: ['Terima kasih', 'Selamat pagi', 'Sampai jumpa', 'Sama-sama'],
    correctAnswer: 'Terima kasih',
    acceptedAnswers: ['arigatou', 'arigato', 'terima kasih', 'thank you', 'thanks'],
    hint: 'Kata sopan saat diberi bantuan atau hadiah. Romaji: a_ig_t_u',
  },

  // ==========================================
  // 2. KALIMAT PENDEK (SHORT SENTENCES)
  // ==========================================
  {
    id: 'kal-pendek-1',
    category: 'kalimat-pendek',
    levelTitle: 'Kalimat Pendek: Pola Kalimat A wa B desu',
    japanese: 'これ は ねこ です。',
    romaji: 'Kore wa neko desu.',
    indonesian: 'Ini adalah kucing.',
    explanation: 'Pola dasar "Kore wa [Benda] desu". Partikel は (wa) sebagai penanda topik, です (desu) sebagai kopula penegas sopan.',
    options: [
      'Ini adalah kucing.',
      'Itu adalah anjing.',
      'Ini adalah air.',
      'Di sana ada kucing.',
    ],
    correctAnswer: 'Ini adalah kucing.',
    acceptedAnswers: ['ini adalah kucing', 'ini kucing', 'kore wa neko desu', 'this is a cat'],
    hint: 'Kore = Ini, Neko = Kucing. Isian romaji atau arti bahasa Indonesia diterima.',
  },
  {
    id: 'kal-pendek-2',
    category: 'kalimat-pendek',
    levelTitle: 'Kalimat Pendek: Perkenalan Diri',
    japanese: 'わたし は がくせい です。',
    romaji: 'Watashi wa gakusei desu.',
    indonesian: 'Saya adalah seorang pelajar/mahasiswa.',
    explanation: 'Watashi = saya, wa = partikel topik, gakusei = murid/mahasiswa, desu = adalah (sopan).',
    options: [
      'Saya adalah seorang pelajar/mahasiswa.',
      'Saya adalah seorang guru.',
      'Dia adalah seorang pelajar.',
      'Saya belajar bahasa Jepang.',
    ],
    correctAnswer: 'Saya adalah seorang pelajar/mahasiswa.',
    acceptedAnswers: [
      'saya adalah seorang pelajar',
      'saya adalah pelajar',
      'saya murid',
      'saya mahasiswa',
      'watashi wa gakusei desu',
    ],
    hint: 'Watashi = Saya, Gakusei = Pelajar / Murid.',
  },
  {
    id: 'kal-pendek-3',
    category: 'kalimat-pendek',
    levelTitle: 'Kalimat Pendek: Objek & Tindakan (Partikel を)',
    japanese: 'みず を のみます。',
    romaji: 'Mizu o nomimasu.',
    indonesian: 'Saya minum air.',
    explanation: 'Partikel を (o/wo) menandai objek penderita yang dikenai kata kerja のみます (nomimasu = minum).',
    options: [
      'Saya minum air.',
      'Saya membeli air.',
      'Ada banyak air.',
      'Saya minum teh.',
    ],
    correctAnswer: 'Saya minum air.',
    acceptedAnswers: ['saya minum air', 'minum air', 'mizu o nomimasu', 'mizu wo nomimasu', 'i drink water'],
    hint: 'Mizu = Air, Nomimasu = Minum (bentuk sopan -masu).',
  },
  {
    id: 'kal-pendek-4',
    category: 'kalimat-pendek',
    levelTitle: 'Kalimat Pendek: Makan Makanan (Partikel を)',
    japanese: 'ごはん を たべます。',
    romaji: 'Gohan o tabemasu.',
    indonesian: 'Saya makan nasi / makan.',
    explanation: 'Gohan = nasi/makanan, o = partikel objek, tabemasu = makan (kata kerja bentuk -masu).',
    options: [
      'Saya makan nasi / makan.',
      'Saya memasak nasi.',
      'Nasi ini enak.',
      'Saya minum susu.',
    ],
    correctAnswer: 'Saya makan nasi / makan.',
    acceptedAnswers: ['saya makan nasi', 'makan nasi', 'saya makan', 'gohan o tabemasu', 'gohan wo tabemasu'],
    hint: 'Gohan = Nasi, Tabemasu = Makan.',
  },
  {
    id: 'kal-pendek-5',
    category: 'kalimat-pendek',
    levelTitle: 'Kalimat Pendek: Tempat & Arah (Partikel に/へ)',
    japanese: 'にほん に いきます。',
    romaji: 'Nihon ni ikimasu.',
    indonesian: 'Saya pergi ke Jepang.',
    explanation: 'Nihon = Jepang, ni = partikel penunjuk tujuan lokasi (ke), ikimasu = pergi.',
    options: [
      'Saya pergi ke Jepang.',
      'Saya datang dari Jepang.',
      'Saya tinggal di Jepang.',
      'Saya menyukai Jepang.',
    ],
    correctAnswer: 'Saya pergi ke Jepang.',
    acceptedAnswers: ['saya pergi ke jepang', 'pergi ke jepang', 'nihon ni ikimasu', 'i go to japan'],
    hint: 'Nihon = Jepang, Ikimasu = Pergi.',
  },
  {
    id: 'kal-pendek-6',
    category: 'kalimat-pendek',
    levelTitle: 'Kalimat Pendek: Kalimat Tanya (Partikel か)',
    japanese: 'これ は なん です か。',
    romaji: 'Kore wa nan desu ka.',
    indonesian: 'Apakah ini? / Ini apa?',
    explanation: 'Partikel か (ka) di akhir kalimat berfungsi persis seperti tanda tanya (?) dalam percakapan sopan.',
    options: [
      'Apakah ini? / Ini apa?',
      'Siapakah kamu?',
      'Di manakah ini?',
      'Apakah kamu sehat?',
    ],
    correctAnswer: 'Apakah ini? / Ini apa?',
    acceptedAnswers: ['apakah ini', 'ini apa', 'ini apa?', 'apakah ini?', 'kore wa nan desu ka', 'what is this'],
    hint: 'Kore = Ini, Nan = Apa, Ka = Tanda tanya.',
  },
  {
    id: 'kal-pendek-7',
    category: 'kalimat-pendek',
    levelTitle: 'Kalimat Pendek: Permintaan Sopan (Kudasai)',
    japanese: 'みず を ください。',
    romaji: 'Mizu o kudasai.',
    indonesian: 'Tolong berikan saya air. / Minta air.',
    explanation: 'Ungkapan wajib saat memesan di restoran Jepang: [Benda] o kudasai = Tolong berikan [Benda].',
    options: [
      'Tolong berikan saya air. / Minta air.',
      'Saya tidak punya air.',
      'Air ini dingin.',
      'Tolong ambilkan teh.',
    ],
    correctAnswer: 'Tolong berikan saya air. / Minta air.',
    acceptedAnswers: ['tolong berikan saya air', 'minta air', 'tolong minta air', 'mizu o kudasai', 'water please'],
    hint: 'Mizu = Air, Kudasai = Tolong berikan / minta.',
  },
  {
    id: 'kal-pendek-8',
    category: 'kalimat-pendek',
    levelTitle: 'Kalimat Pendek: Kata Sifat (Desu)',
    japanese: 'にほんご は おもしろい です。',
    romaji: 'Nihongo wa omoshiroi desu.',
    indonesian: 'Bahasa Jepang itu menarik/menyenangkan.',
    explanation: 'Nihongo = Bahasa Jepang, wa = partikel topik, omoshiroi = menarik/seru/lucu, desu = penegas sopan.',
    options: [
      'Bahasa Jepang itu menarik/menyenangkan.',
      'Bahasa Jepang itu sangat sulit.',
      'Saya bisa berbicara bahasa Jepang.',
      'Bahasa Jepang itu mudah.',
    ],
    correctAnswer: 'Bahasa Jepang itu menarik/menyenangkan.',
    acceptedAnswers: [
      'bahasa jepang itu menarik',
      'bahasa jepang menarik',
      'bahasa jepang menyenangkan',
      'nihongo wa omoshiroi desu',
    ],
    hint: 'Nihongo = Bahasa Jepang, Omoshiroi = Menarik / seru.',
  },

  // ==========================================
  // 3. KALIMAT PANJANG & TATA BAHASA (LONG SENTENCES)
  // ==========================================
  {
    id: 'kal-panjang-1',
    category: 'kalimat-panjang',
    levelTitle: 'Kalimat Panjang: Waktu, Teman, Tempat & Aksi',
    japanese: 'きのう ともだち と いっしょ に レストラン で すし を たべました。',
    romaji: 'Kinou tomodachi to issho ni resutoran de sushi o tabemashita.',
    indonesian: 'Kemarin saya makan sushi di restoran bersama teman.',
    explanation: 'Struktur lengkap: Kinou (Kemarin) + tomodachi to issho ni (bersama teman) + resutoran de (partikel lokasi aksi) + sushi o tabemashita (bentuk lampau dari tabemasu).',
    options: [
      'Kemarin saya makan sushi di restoran bersama teman.',
      'Hari ini saya membeli sushi di pasar bersama ibu.',
      'Kemarin saya pergi ke restoran sushi sendirian.',
      'Besok saya akan makan sushi bersama teman di rumah.',
    ],
    correctAnswer: 'Kemarin saya makan sushi di restoran bersama teman.',
    acceptedAnswers: [
      'kemarin saya makan sushi di restoran bersama teman',
      'kemarin makan sushi di restoran bersama teman',
      'kinou tomodachi to issho ni resutoran de sushi o tabemashita',
    ],
    hint: 'Kinou = Kemarin, tomodachi to issho ni = bersama teman, resutoran de = di restoran, tabemashita = sudah makan (lampau).',
  },
  {
    id: 'kal-panjang-2',
    category: 'kalimat-panjang',
    levelTitle: 'Kalimat Panjang: Pertentangan Dua Klausa (Partikel が)',
    japanese: 'にほんご は すこし むずかしい です が、とても おもしろい です。',
    romaji: 'Nihongo wa sukoshi muzukashii desu ga, totemo omoshiroi desu.',
    indonesian: 'Bahasa Jepang sedikit sulit, tetapi sangat menarik.',
    explanation: 'Partikel が (ga) di tengah kalimat berfungsi sebagai kata sambung "tetapi / namun". Sukoshi = sedikit, Totemo = sangat.',
    options: [
      'Bahasa Jepang sedikit sulit, tetapi sangat menarik.',
      'Bahasa Jepang sangat mudah dan tidak membosankan.',
      'Bahasa Jepang tidak sulit karena sangat menarik.',
      'Bahasa Jepang sedikit menarik tetapi sulit dipahami.',
    ],
    correctAnswer: 'Bahasa Jepang sedikit sulit, tetapi sangat menarik.',
    acceptedAnswers: [
      'bahasa jepang sedikit sulit tetapi sangat menarik',
      'bahasa jepang agak sulit tapi sangat menarik',
      'nihongo wa sukoshi muzukashii desu ga totemo omoshiroi desu',
    ],
    hint: 'Sukoshi = sedikit, Muzukashii = sulit, ga = tetapi, Totemo = sangat, Omoshiroi = menarik.',
  },
  {
    id: 'kal-panjang-3',
    category: 'kalimat-panjang',
    levelTitle: 'Kalimat Panjang: Rutinitas Harian & Waktu Berurutan',
    japanese: 'まいあさ ろくじ に おきて、あさごはん を たべて から がっこう へ いきます。',
    romaji: 'Maiasa rokuji ni okite, asagohan o tabete kara gakkou e ikimasu.',
    indonesian: 'Setiap pagi saya bangun jam 6, lalu setelah sarapan saya pergi ke sekolah.',
    explanation: 'Menggunakan bentuk -te (okite) untuk menghubungkan urutan aksi, dan bentuk -te kara (tabete kara = setelah makan).',
    options: [
      'Setiap pagi saya bangun jam 6, lalu setelah sarapan saya pergi ke sekolah.',
      'Setiap pagi saya bangun jam 7 dan langsung pergi ke sekolah tanpa sarapan.',
      'Kemarin pagi saya bangun jam 6 dan pergi ke kantor bersama teman.',
      'Besok pagi saya akan bangun jam 6 untuk sarapan di sekolah.',
    ],
    correctAnswer: 'Setiap pagi saya bangun jam 6, lalu setelah sarapan saya pergi ke sekolah.',
    acceptedAnswers: [
      'setiap pagi saya bangun jam 6 lalu setelah sarapan saya pergi ke sekolah',
      'setiap pagi bangun jam 6 sarapan lalu pergi ke sekolah',
    ],
    hint: 'Maiasa = setiap pagi, rokuji = jam 6, asagohan = sarapan pagi, gakkou = sekolah.',
  },
  {
    id: 'kal-panjang-4',
    category: 'kalimat-panjang',
    levelTitle: 'Kalimat Panjang: Ajakan Sopan (Bentuk -masenka)',
    japanese: 'あした の どようび、いっしょ に えいが を み に いきませんか。',
    romaji: 'Ashita no doyoubi, issho ni eiga o mi ni ikimasen ka.',
    indonesian: 'Hari Sabtu besok, maukah pergi nonton film bersama-sama?',
    explanation: 'Bentuk -masen ka adalah cara mengajak orang lain secara sangat sopan dan ramah dalam budaya Jepang.',
    options: [
      'Hari Sabtu besok, maukah pergi nonton film bersama-sama?',
      'Hari Minggu kemarin saya menonton film sendirian di bioskop.',
      'Besok hari Sabtu saya ada janji menonton film dengan guru.',
      'Apakah kamu suka menonton film di bioskop setiap hari Sabtu?',
    ],
    correctAnswer: 'Hari Sabtu besok, maukah pergi nonton film bersama-sama?',
    acceptedAnswers: [
      'hari sabtu besok maukah pergi nonton film bersama',
      'maukah nonton film bersama sabtu besok',
      'ashita no doyoubi issho ni eiga o mi ni ikimasen ka',
    ],
    hint: 'Ashita no doyoubi = Hari Sabtu besok, eiga = film, ikimasen ka = maukah pergi bersama?',
  },

  // ==========================================
  // 4. CERITA & BACAAN INTERAKTIF (READING STORIES)
  // ==========================================
  {
    id: 'cerita-1',
    category: 'cerita',
    levelTitle: 'Cerita 1: Pagi Musim Semi (春の朝)',
    japanese: 'しろい ねこ は どこ に いました か。',
    romaji: 'Shiroi neko wa doko ni imashita ka?',
    indonesian: 'Di manakah kucing putih itu berada?',
    explanation: 'Berdasarkan teks bacaan, kucing putih sedang tidur nyenyak di bawah pohon sakura (さくら の き の した).',
    options: [
      'Di bawah pohon sakura (さくら の き の した)',
      'Di atas atap rumah (いえ の やね の うえ)',
      'Di dalam kamar tidur (へや の なか)',
      'Di dekat stasiun kereta (えき の ちかく)',
    ],
    correctAnswer: 'Di bawah pohon sakura (さくら の き の した)',
    acceptedAnswers: [
      'di bawah pohon sakura',
      'sakura no ki no shita',
      'bawah pohon sakura',
      'bawah sakura',
    ],
    hint: 'Lihat baris kedua bacaan: "...さくら の き の した で ねています" (tidur di bawah pohon sakura).',
    storyContext: {
      title: 'Cerita 1: Kucing Putih di Bawah Sakura (さくら の した の しろい ねこ)',
      japaneseText: `きょう は はる の あたたかい ひ です。
こうえん に きれい な さくら の はな が さいています。
さくら の き の した に、しろい ねこ が います。
ねこ は め を とじて、きもちよさそう に ねています。
わたし は しずか に「こんにちは」と いいました。`,
      romajiText: `Kyou wa haru no atatakai hi desu.
Kouen ni kirei na sakura no hana ga saite imasu.
Sakura no ki no shita ni, shiroi neko ga imasu.
Neko wa me o tojite, kimochiyosasou ni nete imasu.
Watashi wa shizuka ni "Konnichiwa" to iimashita.`,
      indonesianText: `Hari ini adalah hari yang hangat di musim semi.
Bunga sakura yang indah sedang mekar di taman.
Di bawah pohon sakura, ada seekor kucing putih.
Kucing itu memejamkan mata dan tertidur dengan nyaman.
Saya menyapa dengan pelan, "Konnichiwa".`,
    },
  },
  {
    id: 'cerita-2',
    category: 'cerita',
    levelTitle: 'Cerita 2: Kuliner di Kedai Ramen (ラーメンの店)',
    japanese: 'わたし は レストラン で なに を ちゅうもん しました か。',
    romaji: 'Watashi wa resutoran de nani o chuumon shimashita ka?',
    indonesian: 'Apa yang dipesan oleh tokoh "Saya" di kedai restoran?',
    explanation: 'Tokoh utama memesan ramen panas dan seporsi gyoza (あたたかい ラーメン と ぎょうざ).',
    options: [
      'Ramen panas dan gyoza (あたたかい ラーメン と ぎょうざ)',
      'Sushi dan teh hijau dingin (すし と つめたい おちゃ)',
      'Kari Jepang dan air mineral (カレー と みず)',
      'Nasi goreng dan sup miso (チャーハン と みそしる)',
    ],
    correctAnswer: 'Ramen panas dan gyoza (あたたかい ラーメン と ぎょうざ)',
    acceptedAnswers: [
      'ramen dan gyoza',
      'ramen panas dan gyoza',
      'ramen to gyouza',
      'ramen',
    ],
    hint: 'Perhatikan kalimat: "あたたかい ラーメン と ぎょうざ を ひとつ ずつ たのみました".',
    storyContext: {
      title: 'Cerita 2: Kedai Ramen di Tokyo (とうきょう の ラーメン や)',
      japaneseText: `わたし は とうきょう の えき の ちかく に ある ラーメン や に はいりました。
おみせ の なか は とても にぎやか です。
てんいん さん が「いらっしゃいませ！」と げんき に いいました。
わたし は あたたかい ラーメン と ぎょうざ を ひとつ ずつ たのみました。
スープ は とても おいしくて、からだ が あたたかくなりました。`,
      romajiText: `Watashi wa Toukyou no eki no chikaku ni aru raamen-ya ni hairimashita.
Omise no naka wa totemo nigiyaka desu.
Ten'in-san ga "Irasshaimase!" to genki ni iimashita.
Watashi wa atatakai raamen to gyouza o hitotsu zutsu tanomimashita.
Suupu wa totemo oishikute, karada ga atatakaku narimashita.`,
      indonesianText: `Saya masuk ke kedai ramen di dekat stasiun Tokyo.
Di dalam kedai suasananya sangat ramai dan hidup.
Pelayan toko menyambut dengan ceria, "Irasshaimase (Selamat datang)!"
Saya memesan masing-masing satu porsi ramen hangat dan gyoza.
Kuahnya sangat lezat, dan tubuh terasa menjadi hangat.`,
    },
  },
  {
    id: 'cerita-3',
    category: 'cerita',
    levelTitle: 'Cerita 3: Pertemuan Klien Jepang (ビジネスの出会い)',
    japanese: 'ミーティング の はじめ に、たなか さん は なに を わたしました か。',
    romaji: 'Miitingu no hajime ni, Tanaka-san wa nani o watashimashita ka?',
    indonesian: 'Pada awal pertemuan rapat, apa yang diberikan oleh Tanaka-san kepada kita?',
    explanation: 'Dalam etika bisnis Jepang, bertukar kartu nama (めいし / meishi) dengan kedua tangan adalah tradisi wajib di awal pertemuan.',
    options: [
      'Kartu nama bisnis dengan kedua belah tangan (りょうて で めいし)',
      'Hadiah souvenir berupa kue tradisional Jepang (おみやげ)',
      'Kontrak kerja sama proyek (けいやくしょ)',
      'Secangkir teh hijau hangat (おちゃ)',
    ],
    correctAnswer: 'Kartu nama bisnis dengan kedua belah tangan (りょうて で めいし)',
    acceptedAnswers: [
      'kartu nama',
      'meishi',
      'kartu nama bisnis',
      'meishi dengan kedua tangan',
    ],
    hint: 'Cari kata: "めいし (meishi)" yang diserahkan dengan kedua belah tangan (りょうて で).',
    storyContext: {
      title: 'Cerita 3: Pertemuan dengan Klien Jepang (にほん の クライアント)',
      japaneseText: `きょう、わたし は はじめて にほん の クライアント の たなか さん と あいました。
たなか さん は えがお で「はじめまして、たなか です。よろしく おねがいします」と いいました。
そして、りょうて で ていねい に めいし を わたして くれました。
わたし も「こちらこそ、よろしく おねがいします」と いいました。
プロジェクト の はなし は とても スムーズ に すすみました。`,
      romajiText: `Kyou, watashi wa hajimete Nihon no kuraianto no Tanaka-san to aimashita.
Tanaka-san wa egao de "Hajimemashite, Tanaka desu. Yoroshiku onegaishimasu" to iimashita.
Soshite, ryoute de teinei ni meishi o watashite kuremashita.
Watashi mo "Kochira koso, yoroshiku onegaishimasu" to iimashita.
Purojekuto no hanashi wa totemo sumuuzu ni susumimashita.`,
      indonesianText: `Hari ini, untuk pertama kalinya saya bertemu dengan klien Jepang bernama Bapak Tanaka.
Bapak Tanaka tersenyum dan berkata, "Hajimemashite (Senang berkenalan), saya Tanaka. Mohon kerja samanya."
Kemudian, ia menyerahkan kartu namanya dengan sopan menggunakan kedua belah tangan.
Saya pun membalas, "Kochira koso (Saya juga), mohon bimbingan dan kerja samanya."
Diskusi proyek berjalan dengan sangat lancar.`,
    },
  },
];
