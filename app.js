/**
 * 中学受験支援サービス「ここがいいノート」制御スクリプト (app.js)
 * 1画面1問・回答時シュッとスライド切り替え対応
 */

// ==========================================
// 1. マスターデータ（学校プール）
// 47都道府県データベース（nationwide_schools.js）と自動連携
// ==========================================
const SCHOOL_DATABASE = (typeof NATIONWIDE_SCHOOL_LIST !== 'undefined' && Array.isArray(NATIONWIDE_SCHOOL_LIST) && NATIONWIDE_SCHOOL_LIST.length > 0)
  ? NATIONWIDE_SCHOOL_LIST
  : [
  {
    school_id: "sch_shibushibu",
    name: "渋谷教育学園渋谷中学校",
    name_ruby: "しぶやきょういくがくえんしぶやちゅうがっこう",
    official_url: "https://www.shibushibu.jp/",
    catchphrase: "自調自考の精神で、世界に羽ばたく個性を育てる共学校",
    recommend_phrase: "★ 自分で調べ・自分で考える「自調自考」で自由に探究したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "渋谷区",
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    station_name: "渋谷駅",
    commute_time: 25,
    tuition: 980000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "global"],
    vibe_label: "自由・国際的",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 67,
    match_rate_child: 98,
    recent_passed_records: "東大・京大・ハーバード・スタンフォード等国内外難関大多数",
    events: [
      { id: "ev_shibushibu_bunkasai", title: "飛翔祭（文化祭）", date: "9月20日(土)・21日(日)", type: "文化祭", desc: "生徒が企画運営する自由でエネルギッシュな展示・英語劇・模擬店が満載！" },
      { id: "ev_shibushibu_setsumei", title: "学校説明会＆施設見学", date: "10月25日(土)", type: "学校説明会", desc: "教育方針「自調自考」の紹介や生徒の学校生活の様子を詳しく解説します。" }
    ],
    special_classes: [
      { title: "自調自考論文・探究活動", desc: "自ら問いを立て、1万字以上の本格論文を書き上げる深い思考の授業！" },
      { title: "英語で学ぶプロジェクト学習", desc: "ネイティブ教員による少人数指導で、世界で通じる発信力を磨く！" }
    ],
    school_strengths: [
      "渋谷駅から徒歩7分！アクセス抜群で先進的な都市型キャンパス！",
      "帰国生も多く、日常的に多様な文化や価値観と触れ合える！",
      "「シラバス（年間の学習設計図）」で目標を見通しながら主体的に学べる！"
    ],
    life_simulation: "朝は渋谷駅から賑やかな街並みを歩いて登校。午前中はディベートや探究型の授業で意見を交わし、放課後は部活動や自習室での論文執筆に仲間と熱中します。",
    parent_summary: "【進学・教育】国内外のトップ大学へ高い進学実績を誇る完全中高一贯共学校。シラバス教育と『自調自考論文』により、自ら課題を発見し解決する高い問題解決力を育成します。【環境・費用】渋谷駅徒歩7分。少人数英語指導や海外研修などグローバル教育が充実しており、個性を尊重する自由な校風が強みです。",
    child_summary: "「自分で調べ、自分で考える」がモットーのワクワクする学校！英語を楽しく話せる授業や、好きなテーマをとことん研究できる自由な時間がいっぱいあるよ！",
    tags: ["interest_digital_tech", "interest_reading_history", "interest_social_events"],
    interest_category_label: "国際・社会・探究",
    is_favorite: false
  },
  {
    school_id: "sch_hiroo",
    name: "広尾学園中学校",
    name_ruby: "ひろおがくえんちゅうがっこう",
    official_url: "https://www.hiroogakuen.ed.jp/",
    catchphrase: "最先端サイエンスと国際教育で未来をひらく共学校",
    recommend_phrase: "★ 本格的な実験設備で、科学や先端テクノロジーを学びたい人におすすめ！",
    photo_url: "assets/images/real_hiroo.jpg",
    prefecture: "東京都",
    district: "港区",
    can_walk: false,
    can_bicycle: true,
    course_name: "医進・サイエンス / インターナショナル / 本科",
    station_name: "広尾駅",
    commute_time: 30,
    tuition: 1050000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "global"],
    vibe_label: "先進・先端科学",
    club_label: "充実",
    record_label: "◎",
    deviation_score: 64,
    match_rate_child: 95,
    recent_passed_records: "東大・難関国立医学部・海外名門大・早慶上理など多数合格",
    events: [
      { id: "ev_hiroo_science", title: "けやき祭（文化祭）＆サイエンスフェア", date: "10月4日(土)・5日(日)", type: "文化祭", desc: "生徒がサイエンスラボで行った最新の研究発表やプレゼンを間近で体感！" },
      { id: "ev_hiroo_setsumei", title: "学校説明会＆ラボ見学会", date: "11月8日(土)", type: "学校説明会", desc: "本格的な理科研究施設やMacBookを使ったICT教育の現場を見学できます。" }
    ],
    special_classes: [
      { title: "先端サイエンス研究ゼミ", desc: "大学研究室レベルの専門ラボで、自らテーマを決めて本物の実験・論文執筆！" },
      { title: "ICT×国際英語プレゼンテーション", desc: "一人一台端末を活用し、英語でリサーチ結果をスライド発表する実践授業！" }
    ],
    school_strengths: [
      "大学研究室に匹敵する3つの本格サイエンスラボを校内に完備！",
      "医療現場の現役医師や大学教授による特別講義・キャリア講座が豊富！",
      "広尾駅すぐそばで通学しやすく、明るく開放的な校舎環境！"
    ],
    life_simulation: "広尾駅から緑豊かな通りを通って登校。放課後は最新ラボで実験機器に触れながら仲間と研究。ICT端末を使って世界中の研究データを調べる探究の日々が待っています。",
    parent_summary: "【進学・教育】医学部・難関理系・海外大学への合格実績が急伸。「医進・サイエンスコース」「インターナショナルコース」など明確な進路志向に対応した専門プログラムが魅力。【環境・費用】広尾駅徒歩1分。1人1台PCを駆使したICT教育と、大学や企業との産学連携による本格的な課題研究環境が整っています。",
    child_summary: "本物の研究者みたいな実験室が3つもある未来的な学校！プログラミングや科学実験が大好きなキミなら、毎日夢中になれること間違いなしだよ！",
    tags: ["interest_science_space", "interest_digital_tech", "interest_crafting_making"],
    interest_category_label: "科学・実験・先端IT",
    is_favorite: false
  },
  {
    school_id: "sch_shibaura",
    name: "芝浦工業大学附属中学校",
    name_ruby: "しばうらこうぎょうだいがくふぞくちゅうがっこう",
    official_url: "https://www.fzk.shibaura-it.ac.jp/",
    catchphrase: "ものづくりと工学の力で、世界を変える理工系人材を育てる",
    recommend_phrase: "★ 3Dプリンタやロボット、工作など「ものづくり」が大好きな人におすすめ！",
    photo_url: "assets/images/real_shibaura.jpg",
    prefecture: "東京都",
    district: "江東区",
    can_walk: false,
    can_bicycle: false,
    course_name: "普通科",
    station_name: "豊洲駅",
    commute_time: 35,
    tuition: 880000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "attached",
    atmospheres: ["stem", "both"],
    vibe_label: "理系・ものづくり",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 92,
    recent_passed_records: "芝浦工大への推薦進学枠多数 ＆ 国公立大・東京理科大等",
    events: [
      { id: "ev_shibaura_shibasai", title: "芝生祭（文化祭）", date: "9月27日(土)・28日(日)", type: "文化祭", desc: "ロボット大会、電子工作体験、プログラミング展示など理系企画が大集合！" },
      { id: "ev_shibaura_tech", title: "ものづくり体験＆学校説明会", date: "10月11日(土)", type: "学校説明会", desc: "豊洲キャンパスのファブラボで工作や3DCADの体験ができます。" }
    ],
    special_classes: [
      { title: "SHIBAURA探究（IT＆ものづくり）", desc: "中1からプログラミング・3DCAD・ドローン制御を体験し、作品を作り上げる！" },
      { title: "ショートテックアワー", desc: "すべての教科学習と身の回りの科学技術を結びつけて学ぶ独自カリキュラム！" }
    ],
    school_strengths: [
      "豊洲の広大で綺麗なキャンパス！最新のファブラボ（工作工房）を完備！",
      "芝浦工業大学への強固な内部推薦枠があり、安心して探究に没頭できる！",
      "鉄道研究部や電子工作部など、趣味を本気で極められる部活が充実！"
    ],
    life_simulation: "運河沿いの爽やかな豊洲エリアを通って登校。放課後は工房でロボットや工作の設計に没頭。仲間と一緒にアイデアを形にする楽しさに溢れた学校生活です。",
    parent_summary: "【進学・教育】芝浦工業大学への推薦進学を担保しつつ、国公立・早慶上理への外部受験も手厚く支援。大学と直結した高度なSTEAM教育が大きな魅力。【環境・費用】豊洲駅徒歩7分の近代的な免震校舎。週2時間の自立学習時間（SD）により自ら計画を立てて学ぶ自律性が身につきます。",
    child_summary: "かっこいいロボットや3Dプリンターで自由にものづくりができる理工系パラダイス！工作やパソコンが好きなキミの「作りたい！」が全部叶うよ！",
    tags: ["interest_crafting_making", "interest_digital_tech", "interest_science_space"],
    interest_category_label: "ものづくり・ロボット",
    is_favorite: false
  },
  {
    school_id: "sch_kaisei",
    name: "開成中学校",
    name_ruby: "かいせいちゅうがっこう",
    official_url: "https://kaiseigakuen.jp/",
    catchphrase: "質実剛健と自由の気風。仲間とともに高みを目指す伝統男子校",
    recommend_phrase: "★ 最高の仲間と熱い行事に燃え、勉強も部活動もトコトン極めたい人におすすめ！",
    photo_url: "assets/images/real_kaisei.jpg",
    prefecture: "東京都",
    district: "荒川区",
    can_walk: false,
    can_bicycle: false,
    course_name: "普通科",
    station_name: "西日暮里駅",
    commute_time: 25,
    tuition: 820000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "free"],
    vibe_label: "質実剛健・自主自律",
    club_label: "非常に盛ん",
    record_label: "◎",
    deviation_score: 71,
    match_rate_child: 96,
    recent_passed_records: "東大合格者数40年以上連続全国第1位・国公立医学部多数",
    events: [
      { id: "ev_kaisei_undokai", title: "開成大運動会", date: "5月10日(日)", type: "見学イベント", desc: "高3生が後輩を指導する伝統の棒倒し！全校生徒の熱気がスタジアムを包む！" },
      { id: "ev_kaisei_bunkasai", title: "開成祭（文化祭）", date: "9月20日(土)・21日(日)", type: "文化祭", desc: "各部活動のハイレベルな研究発表やクイズ研究会の名物対決など見所満載！" }
    ],
    special_classes: [
      { title: "本格的な理科実験・観察ゼミ", desc: "中1から毎週本格的な実験レポートを書き上げ、科学的思考の基礎を徹底鍛錬！" },
      { title: "大学教養レベルの特別講義", desc: "文学・歴史・数学の深淵に触れる、教員オリジナル教材による知的好奇心の授業！" }
    ],
    school_strengths: [
      "西日暮里駅徒歩2分の好立地！新校舎には広大な理科実験棟や温水プールも！",
      "先輩が後輩を全力で育てる「縦の絆」が非常に強く、一生の仲間ができる！",
      "運動部・文化部ともに全国トップレベルの活発な部活動環境！"
    ],
    life_simulation: "西日暮里駅からすぐの校舎へ。放課後は部活動で思いきり汗を流し、行事前には夜遅くまで仲間と作戦会議。高い学力とたくましいリーダーシップを同時に磨きます。",
    parent_summary: "【進学・教育】国内最高峰の東大合格実績を誇る完全中高一貫男子校。生徒主体の行事運営を通じた高い自治力とリーダーシップの育成、実技・体験を重んじる多面的な教育カリキュラムが魅力です。【環境・費用】西日暮里駅すぐ。質実剛健で互いを高め合う濃密な男子校文化が息づいています。",
    child_summary: "全校生徒が本気で熱中する伝統の大運動会が最高にかっこいい！お互いを認め合える最高の仲間と一緒に、勉強も部活動も思いきり全力で打ち込めるよ！",
    tags: ["interest_sports_athletics", "interest_puzzle_math", "interest_reading_history"],
    interest_category_label: "伝統・文武両道・仲間",
    is_favorite: false
  },
  {
    school_id: "sch_azabu",
    name: "麻布中学校",
    name_ruby: "あざぶちゅうがっこう",
    official_url: "https://www.azabu-jh.ed.jp/",
    catchphrase: "校則のない自由な校風。自分で考え行動する自立の男子校",
    recommend_phrase: "★ 枠にとらわれず、自分の興味をトコトン突き詰めて考え抜きたい人におすすめ！",
    photo_url: "assets/images/real_azabu.jpg",
    prefecture: "東京都",
    district: "港区",
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科",
    station_name: "広尾駅",
    commute_time: 35,
    tuition: 860000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free"],
    vibe_label: "自由闊達・個性的",
    club_label: "極めて自由",
    record_label: "◎",
    deviation_score: 68,
    match_rate_child: 94,
    recent_passed_records: "東大・京大・難関医学部・海外名門大など多彩な分野へ進学",
    events: [
      { id: "ev_azabu_bunkasai", title: "麻布祭（文化祭）", date: "5月2日〜4日", type: "文化祭", desc: "自由な熱気が爆発！生徒手作りの本格的な研究展示や個性豊かな企画が圧巻！" },
      { id: "ev_azabu_setsumei", title: "麻布中学校 学校説明会", date: "10月18日(土)", type: "学校説明会", desc: "校則がない麻布ならではの教育理念や独自の思考型授業について語られます。" }
    ],
    special_classes: [
      { title: "先生オリジナルの思考深耕プリント", desc: "教科書を使わず、先生手作りの深遠な教材で「なぜ？」をとことん問い続ける授業！" },
      { title: "社会科特別巡検・フィールドワーク", desc: "歴史や地理の現場へ自ら足を運び、自分の目で社会の構造を確かめる探究学習！" }
    ],
    school_strengths: [
      "明文化された細かい校則がなく、自分の頭で行動を判断する自由な環境！",
      "多彩で個性的な生徒たちが互いをリスペクトし合う温かいコミュニティ！",
      "緑あふれる広大なグラウンドと豊かな蔵書を誇る居心地の良い図書室！"
    ],
    life_simulation: "広尾の閑静な丘の上にある校舎へ。放課後は自由なサークル活動や図書室での読書、仲間との熱い議論に花を咲かせます。自分らしさをどこまでも大切にできる毎日です。",
    parent_summary: "【進学・教育】創立125年を超える伝統男子校。教科書に頼らず教員手作りの教材で行う『本質を問う授業』により、生涯にわたる深い思考力と知的好奇心を涵養します。【環境・費用】港区南麻布の閑静な文教地区。校則で縛らず生徒自身の責任と判断に委ねる自由闊達な教育方針が唯一無二の魅力です。",
    child_summary: "なんと細かい校則が一切ない、めちゃくちゃ自由な学校！先生が作った面白いプリントで自分の頭でじっくり考える授業が最高にワクワクするよ！",
    tags: ["interest_reading_history", "interest_puzzle_math", "interest_social_events"],
    interest_category_label: "自由・個性・深い探究",
    is_favorite: false
  },
  {
    school_id: "sch_oin",
    name: "桜蔭中学校",
    name_ruby: "おういんちゅうがっこう",
    official_url: "https://www.oin.ed.jp/",
    catchphrase: "礼と学びの心。自立した女性の知性と品性を育む伝統女子校",
    recommend_phrase: "★ 確かな学力と礼儀作法を身につけ、知的好奇心を深めたい人におすすめ！",
    photo_url: "assets/images/real_oin.jpg",
    prefecture: "東京都",
    district: "文京区",
    can_walk: false,
    can_bicycle: false,
    course_name: "普通科",
    station_name: "水道橋駅",
    commute_time: 30,
    tuition: 850000,
    gender_type: "girls",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "both"],
    vibe_label: "知性・気品・理系",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 70,
    match_rate_child: 97,
    recent_passed_records: "東大理科三類をはじめ東大・難関国公立大医学部合格者数日本一",
    events: [
      { id: "ev_oin_bunkasai", title: "桜蔭祭（文化祭）", date: "9月27日(土)・28日(日)", type: "文化祭", desc: "学術的でハイレベルなクラブ研究発表、美しい合唱、温かいおもてなしを体験！" },
      { id: "ev_oin_setsumei", title: "学校説明会＆施設見学", date: "10月25日(土)", type: "学校説明会", desc: "「礼と学び」の建学精神、中1の礼法授業や理科教育の実践について紹介。" }
    ],
    special_classes: [
      { title: "中1必修の礼法特別授業", desc: "美しい立ち居振る舞いや心遣い、礼儀作法を身につける一生モノの授業！" },
      { title: "高度な理科実験と考察レポート", desc: "充実した実験室で本格的な科学実験を行い、論理的思考力を極限まで高める！" }
    ],
    school_strengths: [
      "水道橋駅から徒歩5分！都心にありながら落ち着いた学習環境！",
      "東大・医学部進学実績で全国屈指！高い学力を持つ仲間と切磋琢磨できる！",
      "茶道・華道・書道や天文部・数学部など、文化的な部活動が非常に充実！"
    ],
    life_simulation: "水道橋駅から坂を上がり落ち着いた校舎へ登校。朝の読書で心を整え、集中して高度な授業に取り組みます。放課後は大好きな部活や仲間との勉強会で充実した時間を過ごします。",
    parent_summary: "【進学・教育】東京女子高等師範学校（現お茶の水女子大）同窓会により設立。東大・国公立医学部合格実績で日本トップを誇り、理数教育と高い論理的思考力を養成。【環境・費用】文京区の落ち着いた文教地区。中学1年次の礼法授業に象徴される、高い知性と品性を兼ね備えた自立した女性を育みます。",
    child_summary: "女子最難関校！算数や理科の実験がすごく面白くて、勉強が大好きな仲間が集まるよ。優しくて頼りになるかっこいい先輩たちがいっぱいいる憧れの学校！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_reading_history"],
    interest_category_label: "知性・理数・礼儀作法",
    is_favorite: false
  },
  {
    school_id: "sch_jg",
    name: "女子学院中学校",
    name_ruby: "じょしがくいんちゅうがっこう",
    official_url: "https://www.joshigakuin.ed.jp/",
    catchphrase: "キリスト教精神に基づく自由と自立。個性を輝かせる女子校",
    recommend_phrase: "★ 私服通学で自分らしく、意見を交わしながらのびのび学びたい人におすすめ！",
    photo_url: "assets/images/real_jg.jpg",
    prefecture: "東京都",
    district: "千代田区",
    can_walk: false,
    can_bicycle: false,
    course_name: "普通科",
    station_name: "市ケ谷駅",
    commute_time: 25,
    tuition: 860000,
    gender_type: "girls",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["free"],
    vibe_label: "自由・自立・リベラル",
    club_label: "充実",
    record_label: "◎",
    deviation_score: 68,
    match_rate_child: 93,
    recent_passed_records: "東大・難関国公立・早慶上智・医学部など多彩な名門大へ多数合格",
    events: [
      { id: "ev_jg_magnolia", title: "マグノリア祭（文化祭）", date: "10月11日(土)・13日(祝)", type: "文化祭", desc: "自由な私服の生徒たちが創り出す活気あふれるステージ発表と展示の数々！" },
      { id: "ev_jg_setsumei", title: "学校説明会＆礼拝堂見学", date: "11月1日(土)", type: "学校説明会", desc: "毎朝の礼拝、自由と責任を重んじる教育方針をじっくり聞くことができます。" }
    ],
    special_classes: [
      { title: "朝の礼拝と聖書の学び", desc: "毎朝パイプオルガンの音色とともに、自分と他者を大切にする心を養う時間！" },
      { title: "全教科で行う徹底ディベート・討議", desc: "先生の一方的な講義ではなく、自分の意見を論理的に語り合う白熱の授業！" }
    ],
    school_strengths: [
      "制服がなく私服通学！自分で考えて自分らしく過ごせる自由な校風！",
      "週5日制を採用し、土曜日は自分の好きな探究や活動に時間を使える！",
      "市ケ谷駅から徒歩8分・麹町駅から徒歩3分の好アクセス！"
    ],
    life_simulation: "お気に入りの私服で市ケ谷の校舎へ。朝は礼拝堂で静かに心を落ち着け、授業では仲間と活発にディスカッション。放課後はクラブ活動やおしゃべりを満喫します。",
    parent_summary: "【進学・教育】プロテスタント系完全中高一貫女子校。週5日制を堅持しながら効率的で密度の濃い授業を展開し、難関大学への高い進学実績を維持しています。【環境・費用】千代田区一番町の落ち着いた環境。制服なし・細かい校則なしの環境下で、自ら判断し行動できる自立心豊かな女性を育成します。",
    child_summary: "制服がなくて私服で通える、とってもおしゃれで自由な学校！みんなで楽しく話し合いながら自分の意見を堂々と伝えられる明るい雰囲気が大人気だよ！",
    tags: ["interest_reading_history", "interest_social_events", "interest_arts_music"],
    interest_category_label: "自由・私服・ディベート",
    is_favorite: false
  },
  {
    school_id: "sch_mita",
    name: "三田国際学園中学校",
    name_ruby: "みたこくさいがくえんちゅうがっこう",
    official_url: "https://www.mita-is.ed.jp/",
    catchphrase: "世界標準の教育。相互通行型授業とトリリンガルで未来を拓く共学校",
    recommend_phrase: "★ 英語での授業やアクティブラーニングで、世界とつながりたい人におすすめ！",
    photo_url: "assets/images/real_mita.jpg",
    prefecture: "東京都",
    district: "世田谷区",
    can_walk: false,
    can_bicycle: true,
    course_name: "インターナショナル / メディカルサイエンス / 本科",
    station_name: "用賀駅",
    commute_time: 30,
    tuition: 960000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["global", "stem"],
    vibe_label: "グローバル・探究",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 91,
    recent_passed_records: "海外名門大学・早慶上智・国公立大・理系学部など多数合格",
    events: [
      { id: "ev_mita_bunkasai", title: "三田学園祭（文化祭）", date: "10月4日(土)・5日(日)", type: "文化祭", desc: "英語でのプレゼンやサイエンス研究発表、インターナショナルな模擬店を体験！" },
      { id: "ev_mita_setsumei", title: "オープンキャンパス＆体験授業", date: "11月15日(土)", type: "学校説明会", desc: "相互通行型アクティブラーニングやネイティブ教員による英語授業を体験！" }
    ],
    special_classes: [
      { title: "相互通行型（アクティブラーニング）授業", desc: "先生の問いかけに対し、iPadで意見を共有しながらクラス全員で議論する協働授業！" },
      { title: "イマージョン英語＆グローバル探究", desc: "理科や社会を英語で学び、世界の同世代とオンラインで意見交換する最先端の学び！" }
    ],
    school_strengths: [
      "ネイティブ教員が多数常駐し、日常的に英語が飛び交う国際的な環境！",
      "世田谷の緑豊かな広大なキャンパスに充実したICT設備とラボ！",
      "「考える力（THINK & ACT）」を伸ばすプロジェクト学習が充実！"
    ],
    life_simulation: "用賀駅からイチョウ並木を通って登校。授業ではiPadを使って自分のアイデアを即座にクラスにシェア。放課後は英語サークルや実験室で仲間とプロジェクトを進めます。",
    parent_summary: "【進学・教育】先進的なトリリンガル教育と相互通行型授業（アクティブラーニング）を実践。海外大進学から国内難関大・医学系まで、時代を先取るハイブリッド進路支援が特色。【環境・費用】用賀駅徒歩5分の緑豊かなキャンパス。一人一台端末と多彩なサイエンス・国際クラスが魅力です。",
    child_summary: "先生の話を聞くだけじゃなく、みんなでクイズみたいに話し合って解決する授業が超楽しい！英語も自然にペラペラになれちゃうグローバルな共学校だよ！",
    tags: ["interest_digital_tech", "interest_science_space", "interest_social_events"],
    interest_category_label: "グローバル・英語・協働探究",
    is_favorite: false
  }
];

const CHILD_INTEREST_OPTIONS = [
  { id: "interest_nature_biology", title: "生き物・自然", desc: "いきもの・しぜんの観察や飼育", icon: "leaf" },
  { id: "interest_crafting_making", title: "ものづくり・工作", desc: "こうさく、ロボット、デザイン", icon: "palette" },
  { id: "interest_arts_music", title: "絵・音楽・アート", desc: "イラスト、吹奏楽、合唱", icon: "music" },
  { id: "interest_sports_athletics", title: "体を動かすこと・スポーツ", desc: "球技、走ること、外遊び", icon: "trophy" },
  { id: "interest_digital_tech", title: "パソコン・ゲーム・プログラミング", desc: "ICT、ゲーム制作、コード", icon: "code" },
  { id: "interest_reading_history", title: "本・ものがたり・歴史", desc: "読書、むかしの話、社会の仕組み", icon: "book" },
  { id: "interest_science_space", title: "実験・科学・宇宙", desc: "じっけん、星や天気の不思議", icon: "flask" },
  { id: "interest_cooking_food", title: "料理・おかし作り", desc: "ごはんやお菓子を作ること", icon: "utensils" },
  { id: "interest_social_events", title: "友だちとおしゃべり・イベント", desc: "みんなでお祭りや企画をすること", icon: "map" },
  { id: "interest_puzzle_math", title: "なぞ解き・パズル・計算", desc: "推理、ひらめき、クイズ研究", icon: "calculator" }
];

// ==========================================
// 2. アプリ共通ステート（データスキーマ準拠）
// ==========================================
let AppSchema = {
  household_id: "いろは",
  parent_name: "いろはさん",
  parent_avatar: "👤",
  child_name: "いろは",
  child_avatar: "👦",
  parent_profile: {
    address: "茨城県土浦市",
    station: "荒川沖駅",
    conditions: {
      commute_time_max: 60,
      tuition_max: 1000000,
      transportation: ["train", "bicycle", "walk"],
      school_gender_type: "coed",
      school_category: ["private"],
      religion_policy: "none",
      university_path: "attached",
      desired_atmospheres: ["free", "stem"]
    },
    strict_filters: [
      "commute_time_max",
      "transportation",
      "tuition_max",
      "school_gender_type"
    ]
  },
  child_profile: {
    is_completed: false, // 質問に回答完了したかどうかのフラグ
    interests: ["interest_science_space", "interest_digital_tech"],
    moment: "moment_creation",
    lifestyle: "lifestyle_individual_focus",
    study: "study_hands_on",
    facility: "facility_maker_lab",
    relation: "relation_autonomous_trust",
    free_comments: {
      step1: "",
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: ""
    }
  },
  recommended_schools: [],
  // 行く前（予定）と行った後（振り返り）を管理する見学予定・記録リスト
  visit_plans: [
    {
      plan_id: "plan_shibushibu_bunkasai",
      school_id: "sch_shibushibu",
      school_name: "渋谷教育学園渋谷中学校",
      event_id: "ev_shibushibu_bunkasai",
      event_title: "飛翔祭（文化祭）",
      event_type: "文化祭",
      event_date: "9月20日(土)",
      event_desc: "生徒が企画運営する自由でエネルギッシュな展示・英語劇・模擬店が満載！",
      status: "before", // 'before' (行く前) or 'after' (行った後)
      reviewed_at: null,
      rating: null,
      review_data: null
    }
  ],
  visit_reviews: []
};

let currentRole = "parent";
let parentCurrentStep = 1;     // 1..10, 11: Phase2, 12: UrlCard
let childCurrentStep = 1;      // 1..7, 'result'
let currentReviewPlanId = null; // 振り返り対象のプランID

let isAnimating = false;

// ==========================================
// 3. シュッと切り替わるスライド制御コア
// ==========================================
function performSlideTransition(currentSlideEl, nextSlideEl, direction = 'next', onComplete = null) {
  if (isAnimating || !currentSlideEl || !nextSlideEl || currentSlideEl === nextSlideEl) {
    if (onComplete) onComplete();
    return;
  }
  isAnimating = true;

  const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
  const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

  // 次のスライドを表示準備
  nextSlideEl.style.display = 'block';
  nextSlideEl.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-left', 'slide-out-right', 'active');
  currentSlideEl.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-left', 'slide-out-right', 'active');

  // アニメーションクラス付与
  currentSlideEl.classList.add(outClass);
  nextSlideEl.classList.add(inClass);

  setTimeout(() => {
    currentSlideEl.style.display = 'none';
    currentSlideEl.classList.remove(outClass);

    nextSlideEl.classList.remove(inClass);
    nextSlideEl.classList.add('active');

    isAnimating = false;
    if (onComplete) onComplete();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 280);
}

// 互換性ヘルパー：IDまたは要素を受け取ってスライド切り替えを実行
function slideQuestionStep(currentSlideId, nextSlideId, direction = 'next', onComplete = null) {
  const currentEl = typeof currentSlideId === 'string' ? document.getElementById(currentSlideId) : currentSlideId;
  const nextEl = typeof nextSlideId === 'string' ? document.getElementById(nextSlideId) : nextSlideId;
  if (!currentEl || !nextEl) {
    if (onComplete) onComplete();
    return;
  }
  performSlideTransition(currentEl, nextEl, direction, onComplete);
}

// ==========================================
// 4. ユーザーモード（保護者画面 ⇄ 子ども画面）の切り替え
// ==========================================
let currentUserMode = 'parent'; // デフォルトは保護者画面

function switchUserMode(mode) {
  currentUserMode = mode;

  // ピルボタンのactive状態更新
  const btnParent = document.getElementById('btnModeParent');
  const btnChild = document.getElementById('btnModeChild');
  if (btnParent && btnChild) {
    if (mode === 'parent') {
      btnParent.classList.add('active');
      btnChild.classList.remove('active');
    } else {
      btnChild.classList.add('active');
      btnParent.classList.remove('active');
    }
  }

  // ホーム画面が表示されている場合は表示ブロックを切り替え
  const homeParent = document.getElementById('homeParentViewBlock');
  const homeChild = document.getElementById('homeChildViewBlock');
  if (homeParent && homeChild) {
    if (mode === 'parent') {
      homeParent.style.display = 'block';
      homeChild.style.display = 'none';
      renderParentHomeDashboard();
    } else {
      homeParent.style.display = 'none';
      homeChild.style.display = 'block';
      renderHomeRecommendedSchools();
      renderHomeInterestAlternativeSchools();
    }
  }

  // 「探す」画面が表示中の場合は学校リストを再描画（親向け／子ども向け文章が切り替わる）
  const searchView = document.getElementById('roleSchoolSearchView');
  if (searchView && searchView.classList.contains('active')) {
    renderSchoolSearchList(currentQuickTag || 'all');
  }

  // マイページが表示中の場合はお子さま回答データの表示・編集権限を再描画
  const mypageView = document.getElementById('roleMypageView');
  if (mypageView && mypageView.classList.contains('active')) {
    initMypageProfile();
    renderMypageFavorites();
  }
}

// ==========================================
// 4-2. ナビゲーション切り替え (スマホ固定ボトムナビ連動)
// ==========================================
function switchAppView(viewName) {
  currentRole = viewName;

  // すべてのアクティブ状態を一旦リセット
  document.querySelectorAll('.bottom-nav-item').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.role-view').forEach(view => view.classList.remove('active'));

  if (viewName === 'home') {
    const bNav = document.getElementById('bNavHome');
    if (bNav) bNav.classList.add('active');
    const view = document.getElementById('roleHomeView');
    if (view) view.classList.add('active');

    // 現在のユーザーモードに応じて描画
    if (currentUserMode === 'parent') {
      const homeParent = document.getElementById('homeParentViewBlock');
      const homeChild = document.getElementById('homeChildViewBlock');
      if (homeParent) homeParent.style.display = 'block';
      if (homeChild) homeChild.style.display = 'none';
      renderParentHomeDashboard();
    } else {
      const homeParent = document.getElementById('homeParentViewBlock');
      const homeChild = document.getElementById('homeChildViewBlock');
      if (homeParent) homeParent.style.display = 'none';
      if (homeChild) homeChild.style.display = 'block';
      renderHomeRecommendedSchools();
      renderHomeInterestAlternativeSchools();
    }
  } else if (viewName === 'search') {
    const bNav = document.getElementById('bNavSearch');
    if (bNav) bNav.classList.add('active');
    const view = document.getElementById('roleSchoolSearchView');
    if (view) view.classList.add('active');
    renderSchoolSearchList(currentQuickTag || 'all');
  } else if (viewName === 'review') {
    const bNav = document.getElementById('bNavReview');
    if (bNav) bNav.classList.add('active');
    const view = document.getElementById('roleReviewView');
    if (view) view.classList.add('active');
    initReviewWizard();
  } else if (viewName === 'mypage') {
    const bNav = document.getElementById('bNavMypage');
    if (bNav) bNav.classList.add('active');
    const view = document.getElementById('roleMypageView');
    if (view) view.classList.add('active');
    initMypageProfile();
    renderMypageFavorites();
  } else if (viewName === 'parent') {
    const view = document.getElementById('roleParentView');
    if (view) view.classList.add('active');
  } else if (viewName === 'child') {
    const view = document.getElementById('roleChildView');
    if (view) view.classList.add('active');

    // すでに質問に回答完了している場合は、毎回再回答させず結果画面を表示
    if (AppSchema.child_profile && AppSchema.child_profile.is_completed) {
      for (let i = 0; i <= 6; i++) {
        const el = document.getElementById(`cSlide${i}`);
        if (el) {
          el.style.display = 'none';
          el.classList.remove('active', 'slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
        }
      }
      const resEl = document.getElementById('cSlideResult');
      if (resEl) {
        resEl.style.display = 'block';
        resEl.classList.add('active');
      }
      updateChildProgressIndicator(7);
      renderChildRecommendedSchools();
    } else {
      renderInterestSelectionGrid();
      syncChildQuestionChoices();
    }
  } else if (viewName === 'compare') {
    const bNav = document.getElementById('bNavSearch');
    if (bNav) bNav.classList.add('active');
    const view = document.getElementById('roleCompareView');
    if (view) view.classList.add('active');
    renderCompareTable("sch_shibushibu", "sch_hiroo");
  } else if (viewName === 'school-detail') {
    const prevNavId = (previousRoleBeforeDetail === 'search') ? 'bNavSearch' : (previousRoleBeforeDetail === 'mypage' ? 'bNavMypage' : (previousRoleBeforeDetail === 'review' ? 'bNavReview' : 'bNavHome'));
    const bNav = document.getElementById(prevNavId);
    if (bNav) bNav.classList.add('active');

    const view = document.getElementById('roleSchoolDetailView');
    if (view) view.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

let previousRoleBeforeDetail = 'home';
let currentDetailSchoolId = null;

function switchMainRole(role) {
  switchAppView(role);
}

function getHeartSvg(isFilled = false) {
  if (isFilled) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="var(--koko-pink)" stroke="var(--koko-pink)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  }
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
}

// ==========================================
// 学校写真プレースホルダー（大体のあたり）描画ヘルパー
// ==========================================
function renderSchoolPhotoPlaceholder(school, height = '140px') {
  if (!school) return '';
  const photoUrl = school.photo_url || '';
  const schoolName = school.name || '学校';

  return `
    <div class="school-card-photo-wrap" style="height:${height};">
      ${photoUrl ? `
        <img src="${photoUrl}" alt="${schoolName}" class="school-card-photo-img" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';">
        <div class="photo-placeholder-fallback" style="display:none;">
          <span class="photo-placeholder-icon">📷</span>
          <span class="photo-placeholder-text">校舎・キャンパス風景（準備中）</span>
        </div>
      ` : `
        <div class="photo-placeholder-fallback">
          <span class="photo-placeholder-icon">📷</span>
          <span class="photo-placeholder-text">校舎・キャンパス風景（準備中）</span>
        </div>
      `}
    </div>
  `;
}

// ==========================================
// 子ども向け語りかけキャッチコピー取得ヘルパー
// （子どものワクワクや興味関心に合わせて、崩した言い方で分かりやすく説明）
// ==========================================
function getChildCatchphrase(school) {
  if (!school) return 'ワクワクがいっぱいの素敵な学校だよ！';
  const name = school.name || '';

  // 主要校・よく提案される学校ごとの個別最適化フレーズ
  if (name.includes("茗溪学園")) {
    return "広大なグラウンドと豊かな自然！ラグビーやサイエンス、すきなことに全力で夢中になれる自由な学校だよ！";
  }
  if (name.includes("土浦日本大学中等")) {
    return "最新の実験室やパソコン設備がすごい！先生や仲間と一緒に新しい挑戦がどんどんできる学校だよ！";
  }
  if (name.includes("江戸川学園取手")) {
    return "勉強も部活も両方おもいっきり楽しめる！みんなの『やってみたい！』を応援してくれるあったかい学校だよ！";
  }
  if (name.includes("渋谷教育学園渋谷")) {
    return "自分だけの『問い』を見つけてとことん探究！世界中に目を向けたワクワクする学びがたくさんできるよ！";
  }
  if (name.includes("広尾学園")) {
    return "英語やプログラミング、プレゼンに挑戦！未来のワクワクを先取りできる最先端の学校だよ！";
  }
  if (name.includes("芝浦工業大学附属")) {
    return "最新の3Dプリンタや本格的なものづくり！ロボットや工作がだいすきな子にぴったりの理系パラダイスだよ！";
  }
  if (name.includes("開成")) {
    return "日本一熱い運動会と楽しい文化祭！一生モノの仲間たちと夢中になって語り合える男子校だよ！";
  }
  if (name.includes("麻布")) {
    return "校則なし！自分の『好き』をとことん追求できる、自由で個性あふれる大人気校だよ！";
  }
  if (name.includes("桜蔭")) {
    return "実験や読書がだいすきな子集まれ！お互いを高め合えるステキな仲間と楽しく学べるよ！";
  }
  if (name.includes("女子学院")) {
    return "自由な校風で自分の意見を大切にしてくれる！毎日が発見とワクワクでいっぱいの女子校だよ！";
  }
  if (name.includes("三田国際")) {
    return "一人一台PCで国際ディベートや科学研究！英語とテクノロジーで世界とつながれるよ！";
  }
  if (name.includes("市川")) {
    return "広大なキャンパスと活気ある部活動！仲間と助け合ってどんどん成長できる学校だよ！";
  }
  if (name.includes("東邦大学付属東邦")) {
    return "自然あふれる環境で本物の科学実験にチャレンジ！生き物や理科が大好きな子にぴったりだよ！";
  }
  if (name.includes("早稲田佐賀") || name.includes("早稲田")) {
    return "広々とした環境で仲間と楽しく夢に向かって走れる！憧れの早稲田大学へつながる学校だよ！";
  }
  if (name.includes("北嶺")) {
    return "雄大な大自然のなかで仲間と絆を深める！スキーや勉強に全力で打ち込める男子校だよ！";
  }

  // 汎用判定（学校の特徴・部活・校風タグから子ども向けに魅力的に生成）
  const vibe = school.vibe_label || '';
  const club = school.club_label || '';
  const atmospheres = school.atmospheres || [];
  const tags = school.tags || [];

  if (tags.includes("interest_digital_tech") || tags.includes("interest_nature_biology") || vibe.includes("理数")) {
    return "本格的な実験室や設備が充実！不思議を見つけてとことん探究できるワクワクの学校だよ！";
  }
  if (tags.includes("interest_sports_athletics") || club.includes("活発") || vibe.includes("活発")) {
    return "広いグラウンドと熱い部活動！勉強もスポーツも仲間と一緒に思いっきり楽しめる学校だよ！";
  }
  if (atmospheres.includes("free") || vibe.includes("自由")) {
    return "自分の『やってみたい！』を先生や先輩が全力応援！個性を伸ばしてのびのび学べる学校だよ！";
  }
  if (tags.includes("interest_social_events") || vibe.includes("国際")) {
    return "外国の先生や英語の授業がたくさん！世界中の文化に触れて新しい自分に出会える学校だよ！";
  }

  // デフォルト
  return "先生や先輩たちが優しく迎えてくれる！毎日新しい発見や楽しい仲間に出会える学校だよ！";
}


// ==========================================
// 保護者画面ホーム：ダッシュボード総合レンダリング
// （AI要約・会話提案・興味まとめ・気になる学校・オーキャンまとめ）
// ==========================================
function renderParentHomeDashboard() {
  // 0. おうちの方の条件設定サマリーの描画
  renderParentConditionsSummary();

  // 1. AI要約サマリーの描画
  const aiSummaryEl = document.getElementById('aiParentSummaryContent');
  if (aiSummaryEl) {
    aiSummaryEl.innerHTML = `
      <div class="ai-summary-badge-row">
        <span class="ai-pill-tag">AI総合分析レポート</span>
        <span class="ai-date-tag">本日更新</span>
      </div>
      <p class="ai-summary-lead">
        お子さまは<strong>「理科の実験・科学」</strong>や<strong>「プログラミング・工作」</strong>に強い知的好奇心を示しており、手を動かして実感できる探究的な授業環境で最もモチベーションが高まる傾向にあります。
      </p>
      <div class="ai-condition-match-points">
        <div class="match-point-item">
          <strong class="point-badge">保護者の希望条件との一致</strong>
          <span>「年間学費100万円未満・共学校・文武両道/理数探究」の軸と高い親和性があります。</span>
        </div>
        <div class="match-point-item">
          <strong class="point-badge">おすすめの着眼点</strong>
          <span>オープンキャンパスでは「実験設備の充実度」と「放課後のクラブ活動の自由度」を一緒に確認すると納得感が高まります。</span>
        </div>
      </div>
    `;
  }

  // 2. AIによる会話の提案（食卓での問いかけフレーズ）
  const aiPromptsEl = document.getElementById('aiConversationPromptsList');
  if (aiPromptsEl) {
    aiPromptsEl.innerHTML = `
      <li class="conversation-prompt-item">
        <div class="prompt-num-badge">1</div>
        <div class="prompt-text-group">
          <strong class="prompt-phrase">「中学校に入ったら、どんな理科の実験やモノづくりをやってみたい？」</strong>
          <p class="prompt-guide">本人のやってみたいことを具体化し、学習への前向きな意欲を引き出す問いかけです。</p>
        </div>
      </li>
      <li class="conversation-prompt-item">
        <div class="prompt-num-badge">2</div>
        <div class="prompt-text-group">
          <strong class="prompt-phrase">「部活は運動系と文化系、どっちの雰囲気が楽しそうに見える？」</strong>
          <p class="prompt-guide">放課後の過ごし方の希望を聞き、本人の自立心と通学の体力バランスを話し合えます。</p>
        </div>
      </li>
      <li class="conversation-prompt-item">
        <div class="prompt-num-badge">3</div>
        <div class="prompt-text-group">
          <strong class="prompt-phrase">「見学に行った学校で、教室やグラウンドのどこが一番ワクワクした？」</strong>
          <p class="prompt-guide">学校説明会やオープンスクール直後の生の記憶を言語化し、居心地の良さを確認できます。</p>
        </div>
      </li>
    `;
  }

  // 3. 子どもの興味関心のまとめ
  const interestsBox = document.getElementById('parentSummaryChildInterests');
  if (interestsBox) {
    const interestItems = [
      { name: "実験・科学・宇宙", level: "関心度：とても高い", color: "#3B82F6", icon: "✦" },
      { name: "パソコン・プログラミング", level: "関心度：高い", color: "#10B981", icon: "✦" },
      { name: "ものづくり・工作", level: "関心度：高い", color: "#F59E0B", icon: "✦" },
      { name: "体を動かすこと・スポーツ", level: "関心度：普通", color: "#EF4444", icon: "✦" }
    ];

    interestsBox.innerHTML = `
      <div class="parent-interest-tags-grid">
        ${interestItems.map(item => `
          <div class="parent-interest-chip-card">
            <span class="chip-star" style="color: ${item.color}">${item.icon}</span>
            <div class="chip-info">
              <strong class="chip-name">${item.name}</strong>
              <span class="chip-level">${item.level}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 4. お子さまが気になっている学校（お気に入り ＆ 有力候補）
  // 4. お子さまが気になっている学校（お気に入り ＆ 適合推薦校）
  const favSchoolsBox = document.getElementById('parentSummaryFavoriteSchools');
  if (favSchoolsBox) {
    favSchoolsBox.innerHTML = '';
    
    // 保護者の通学条件・日常通学可能圏に合致する学校から抽出
    const commutableSchools = getFilteredSchoolsByParentStrictRules(SCHOOL_DATABASE);
    let targetSchools = commutableSchools.filter(s => s.is_favorite);
    if (targetSchools.length === 0) {
      if (AppSchema.recommended_schools && AppSchema.recommended_schools.length > 0) {
        targetSchools = AppSchema.recommended_schools.map(item => item.school_data);
      } else {
        executeSchoolMatching();
        targetSchools = AppSchema.recommended_schools.map(item => item.school_data);
      }
    }
    if (targetSchools.length === 0) {
      targetSchools = commutableSchools.slice(0, 3);
    }
    targetSchools = targetSchools.slice(0, 3);

    const currentStation = AppSchema.parent_profile.station || "ご自宅最寄り";

    targetSchools.forEach(school => {
      const card = document.createElement('div');
      card.className = 'home-recommend-school-card search-card-synced';
      const genderText = school.gender_type === 'girls' ? '女子校' : school.gender_type === 'boys' ? '男子校' : '共学';
      const heartActive = school.is_favorite ? 'active' : '';
      const firstEvent = (school.events && school.events.length > 0) ? school.events[0] : null;
      const commuteMin = school.calculated_commute_time || school.commute_time || 30;
      const routeSummary = school.calculated_route_summary || '';

      card.innerHTML = `
        <div class="card-school-badge-header" style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px 0; gap:8px;">
          <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
            <span style="font-size:11px; font-weight:800; background:#E0F2FE; color:#0369A1; padding:2px 8px; border-radius:4px;">
              ${school.category === 'private' ? '私立' : school.category === 'public' ? '公立一貫' : '国立附属'}
            </span>
            <span style="font-size:11px; font-weight:800; background:#F1F5F9; color:#334155; padding:2px 8px; border-radius:4px;">
              ${genderText}
            </span>
            <span style="font-size:11px; font-weight:700; background:#FEF3C7; color:#92400E; padding:2px 8px; border-radius:4px;">
              ${school.vibe_label}
            </span>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="parent-dev-pill-hero" style="position:static;">偏差値 ${school.deviation_score}</span>
            <button type="button" class="btn-heart-hero-corner ${heartActive}" style="position:static;" onclick="toggleSchoolFavorite('${school.school_id}', this)" title="お気に入り">
              ${getHeartSvg(school.is_favorite)}
            </button>
          </div>
        </div>

        <div class="home-card-main-body" style="padding-top:10px;">
          ${renderSchoolPhotoPlaceholder(school, '140px')}

          <div class="home-card-header-row">
            <div class="school-name-col">
              <span style="font-size:11px; color:#64748B; font-weight:700; display:block;">${school.name_ruby || ''}</span>
              <h3 class="home-school-title" style="margin:2px 0 6px; font-size:20px; font-weight:800; color:var(--text-main);">${school.name}</h3>
              
              <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin:6px 0 10px;">
                <span style="font-size:12px; background:#F8FAFC; color:#475569; border:1px solid #E2E8F0; padding:3px 8px; border-radius:6px; font-weight:700;">
                  📍 所在地：${school.prefecture} ${school.district || ''}（最寄：${school.station_name}）
                </span>
                <span style="font-size:12px; background:#EFF6FF; color:#1D4ED8; border:1px solid #BFDBFE; padding:3px 8px; border-radius:6px; font-weight:800;">
                  ⏱ 自宅（${currentStation}）より 片道約${commuteMin}分
                </span>
              </div>
            </div>
          </div>

          <p class="home-school-catch" style="font-weight:700; color:var(--text-main); margin-bottom:8px;">「${school.catchphrase}」</p>

          <div class="home-school-tags-row" style="margin: 8px 0 10px;">
            <span class="search-tag-pill">${school.vibe_label}</span>
            <span class="search-tag-pill">部活 ${school.club_label}</span>
            <span class="search-tag-pill">学費 約${Math.round(school.tuition / 10000)}万円/年</span>
          </div>

          ${firstEvent ? `
            <div class="home-card-event-banner">
              <div class="event-banner-text">
                <span class="event-pill-mini">${firstEvent.type}</span>
                <strong class="event-date-mini">${firstEvent.date}</strong>
                <span class="event-name-mini">${firstEvent.title}</span>
              </div>
            </div>
          ` : ''}

          <div class="home-card-actions">
            <button type="button" class="btn-solid-parent btn-sm" onclick="openSchoolDetailModal('${school.school_id}');">
              学校を詳しく見る
            </button>
            ${school.official_url ? `
              <a href="${school.official_url}" target="_blank" rel="noopener noreferrer" class="btn-outline btn-sm btn-official-card-link" style="display:inline-flex; align-items:center; gap:4px; text-decoration:none; font-weight:700;">
                🌐 公式HP ↗
              </a>
            ` : ''}
          </div>
        </div>
      `;
      favSchoolsBox.appendChild(card);
    });
  }

  // 5. オーキャン・説明会の振り返りまとめ
  const reviewsBox = document.getElementById('parentSummaryReviews');
  if (reviewsBox) {
    reviewsBox.innerHTML = `
      <div class="review-summary-cards-list">
        <div class="review-summary-card">
          <div class="review-card-top">
            <span class="review-school-tag">青葉中学校</span>
            <span class="review-type-badge">学校説明会・施設見学</span>
            <span class="review-date-badge">先週訪問</span>
          </div>
          <div class="review-ratings-row">
            <span class="rating-item">生徒の雰囲気: <strong>★★★★★</strong></span>
            <span class="rating-item">実験室・設備: <strong>★★★★☆</strong></span>
            <span class="rating-item">通いやすさ: <strong>★★★★☆</strong></span>
          </div>
          <p class="review-child-quote">
            <strong>お子さまの感想メモ：</strong><br>
            「すれちがった先輩たちがみんな元気にあいさつしてくれて安心した！人工芝のサッカーグラウンドがすごく広くてかっこよかった。」
          </p>
        </div>

        <div class="review-summary-card">
          <div class="review-card-top">
            <span class="review-school-tag">さくら学園中学校</span>
            <span class="review-type-badge">オープンスクール</span>
            <span class="review-date-badge">2週間前訪問</span>
          </div>
          <div class="review-ratings-row">
            <span class="rating-item">生徒の雰囲気: <strong>★★★★★</strong></span>
            <span class="rating-item">校舎のきれいさ: <strong>★★★★★</strong></span>
            <span class="rating-item">通いやすさ: <strong>★★★★☆</strong></span>
          </div>
          <p class="review-child-quote">
            <strong>お子さまの感想メモ：</strong><br>
            「大きな図書館のまんなかに中庭があって、本を読みながら落ち着けそうだった。先生が笑顔で優しく質問に答えてくれた。」
          </p>
        </div>
      </div>
    `;
  }
}

// ==========================================
// 子ども画面ホーム：あなたへのおすすめの学校
// ==========================================
// ==========================================
// 子ども画面ホーム：あなたへのおすすめの学校（写真・特色付き）
// ==========================================
function renderHomeRecommendedSchools() {
  const container = document.getElementById('homeRecommendedSchoolsContainer');
  if (!container) return;
  container.innerHTML = '';

  const isChild = currentUserMode === 'child';
  // 質問回答によるマッチング結果があれば、その上位校を優先してホーム画面に提示
  let recommendedList = [];
  if (AppSchema.recommended_schools && AppSchema.recommended_schools.length > 0) {
    recommendedList = AppSchema.recommended_schools.map(item => item.school_data);
  } else {
    executeSchoolMatching();
    recommendedList = (AppSchema.recommended_schools && AppSchema.recommended_schools.length > 0)
      ? AppSchema.recommended_schools.map(item => item.school_data)
      : getFilteredSchoolsByParentStrictRules(SCHOOL_DATABASE).slice(0, 3);
  }

  const currentStation = AppSchema.parent_profile.station || "ご自宅最寄り";

  recommendedList.forEach(school => {
    const card = document.createElement('div');
    card.className = 'home-recommend-school-card';
    const genderText = school.gender_type === 'girls' ? '女子校' : school.gender_type === 'boys' ? '男子校' : '共学';

    // 画面モードに応じた説明文とラベル
    const summaryText = isChild ? school.child_summary : school.parent_summary;
    const summaryLabel = isChild ? 'ここがワクワク！' : '保護者向けポイント（教育・進路・環境）';

    // 直近イベントの取得
    const firstEvent = (school.events && school.events.length > 0) ? school.events[0] : null;
    const heartActive = school.is_favorite ? 'active' : '';
    const commuteMin = school.calculated_commute_time || school.commute_time || 30;
    const routeSummary = school.calculated_route_summary || '';

    card.innerHTML = `
      <div class="card-school-badge-header" style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px 0; gap:8px;">
        <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
          <span style="font-size:11px; font-weight:800; background:#E0F2FE; color:#0369A1; padding:2px 8px; border-radius:4px;">
            ${school.category === 'private' ? '私立' : school.category === 'public' ? '公立一貫' : '国立附属'}
          </span>
          <span style="font-size:11px; font-weight:800; background:#F1F5F9; color:#334155; padding:2px 8px; border-radius:4px;">
            ${genderText}
          </span>
          <span style="font-size:11px; font-weight:700; background:#FEF3C7; color:#92400E; padding:2px 8px; border-radius:4px;">
            ${school.vibe_label}
          </span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          ${isChild ? `<span class="child-match-pill-hero" style="position:static;">★ ぴったり度 ${school.match_rate_child || 98}%</span>` : `<span class="parent-dev-pill-hero" style="position:static;">偏差値 ${school.deviation_score}</span>`}
          <button type="button" class="btn-heart-hero-corner ${heartActive}" style="position:static;" onclick="toggleSchoolFavorite('${school.school_id}', this)" title="お気に入り">
            ${getHeartSvg(school.is_favorite)}
          </button>
        </div>
      </div>

      <div class="home-card-main-body" style="padding-top:10px;">
        ${renderSchoolPhotoPlaceholder(school, '140px')}

        <div class="home-card-header-row">
          <div class="school-name-col">
            <span style="font-size:11px; color:#64748B; font-weight:700; display:block;">${school.name_ruby || ''}</span>
            <h3 class="home-school-title" style="margin:2px 0 6px; font-size:20px; font-weight:800; color:var(--text-main);">${school.name}</h3>
            
            <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin:6px 0 10px;">
              <span style="font-size:12px; background:#F8FAFC; color:#475569; border:1px solid #E2E8F0; padding:3px 8px; border-radius:6px; font-weight:700;">
                📍 所在地：${school.prefecture} ${school.district || ''}（最寄：${school.station_name}）
              </span>
              <span style="font-size:12px; background:#EFF6FF; color:#1D4ED8; border:1px solid #BFDBFE; padding:3px 8px; border-radius:6px; font-weight:800;">
                ⏱ 自宅（${currentStation}）より 片道約${commuteMin}分
              </span>
            </div>
          </div>
        </div>

        ${isChild ? `
          <div class="child-catchphrase-banner">
            「${getChildCatchphrase(school)}」
          </div>
          <div class="home-school-mode-summary-box child-theme">
            <span class="summary-badge-mini">★ ここがワクワク！</span>
            <p class="summary-text-mini">${school.child_summary}</p>
          </div>
        ` : `
          <p class="home-school-catch" style="font-weight:700; color:var(--text-main); margin-bottom:8px;">「${school.catchphrase}」</p>
        `}

        <!-- タグ（子ども画面では学費は非表示） -->
        <div class="home-school-tags-row" style="margin: 8px 0 10px;">
          <span class="search-tag-pill">${school.vibe_label}</span>
          <span class="search-tag-pill">部活 ${school.club_label}</span>
          ${!isChild ? `<span class="search-tag-pill">学費 約${Math.round(school.tuition / 10000)}万円/年</span>` : ''}
        </div>

        <!-- イベント情報＆行ってみるボタン（子ども画面のみボタン表示） -->
        ${firstEvent ? `
          <div class="home-card-event-banner">
            <div class="event-banner-text">
              <span class="event-pill-mini">${firstEvent.type}</span>
              <strong class="event-date-mini">${firstEvent.date}</strong>
              <span class="event-name-mini">${firstEvent.title}</span>
            </div>
            ${isChild ? `
              <button type="button" class="btn-event-quick-plan" onclick="addEventToVisitSchedule('${school.school_id}', '${firstEvent.id}', this)">
                ✦ 行ってみる
              </button>
            ` : ''}
          </div>
        ` : ''}

        <div class="home-card-actions">
          <button type="button" class="${isChild ? 'btn-solid-child' : 'btn-solid-parent'} btn-sm" onclick="openSchoolDetailModal('${school.school_id}');">
            学校を詳しく見る
          </button>
          ${school.official_url ? `
            <a href="${school.official_url}" target="_blank" rel="noopener noreferrer" class="btn-outline btn-sm btn-official-card-link" style="display:inline-flex; align-items:center; gap:4px; text-decoration:none; font-weight:700;">
              🌐 公式HP ↗
            </a>
          ` : ''}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ==========================================
// 子ども画面ホーム：他にもこんな学校がありますよ！（子供興味カテゴリ提案）
// ==========================================
function renderHomeInterestAlternativeSchools() {
  const container = document.getElementById('homeInterestAlternativeContainer');
  if (!container) return;
  container.innerHTML = '';

  const isChild = currentUserMode === 'child';
  // 保護者の譲れない条件を満たす通学可能な学校群を取得
  const commutableSchools = getFilteredSchoolsByParentStrictRules(SCHOOL_DATABASE);
  const childInterests = (AppSchema.child_profile && AppSchema.child_profile.interests) || [];

  // 通学可能校の中から、子どもの興味関心タグに合致する学校を抽出
  let alternativeList = commutableSchools.filter(s => {
    return s.tags && s.tags.some(t => childInterests.includes(t));
  });

  // 候補が少ない場合は、通学可能な学校群の中から補充
  if (alternativeList.length < 3) {
    commutableSchools.forEach(s => {
      if (!alternativeList.some(item => item.school_id === s.school_id)) {
        alternativeList.push(s);
      }
    });
  }

  const currentStation = AppSchema.parent_profile.station || "ご自宅最寄り";

  alternativeList.slice(0, 4).forEach(school => {
    const card = document.createElement('div');
    card.className = 'home-recommend-school-card';
    const genderText = school.gender_type === 'girls' ? '女子校' : school.gender_type === 'boys' ? '男子校' : '共学';
    const summaryText = isChild ? school.child_summary : school.parent_summary;
    const summaryLabel = isChild ? 'ここがワクワク！' : '保護者向けポイント';
    const firstEvent = (school.events && school.events.length > 0) ? school.events[0] : null;
    const heartActive = school.is_favorite ? 'active' : '';
    const commuteMin = school.calculated_commute_time || school.commute_time || 30;
    const routeSummary = school.calculated_route_summary || '';

    card.innerHTML = `
      <div class="card-school-badge-header" style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px 0; gap:8px;">
        <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
          <span style="font-size:11px; font-weight:800; background:#E0F2FE; color:#0369A1; padding:2px 8px; border-radius:4px;">
            ${school.category === 'private' ? '私立' : school.category === 'public' ? '公立一貫' : '国立附属'}
          </span>
          <span style="font-size:11px; font-weight:800; background:#F1F5F9; color:#334155; padding:2px 8px; border-radius:4px;">
            ${genderText}
          </span>
          <span style="font-size:11px; font-weight:700; background:#FEF3C7; color:#92400E; padding:2px 8px; border-radius:4px;">
            ${school.vibe_label}
          </span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          ${isChild ? `<span class="child-match-pill-hero" style="position:static;">★ ぴったり度 ${school.match_rate_child || 95}%</span>` : `<span class="parent-dev-pill-hero" style="position:static;">偏差値 ${school.deviation_score}</span>`}
          <button type="button" class="btn-heart-hero-corner ${heartActive}" style="position:static;" onclick="toggleSchoolFavorite('${school.school_id}', this)" title="お気に入り">
            ${getHeartSvg(school.is_favorite)}
          </button>
        </div>
      </div>

      <div class="home-card-main-body" style="padding-top:10px;">
        ${renderSchoolPhotoPlaceholder(school, '140px')}

        <div class="home-card-header-row">
          <div class="school-name-col">
            <span style="font-size:11px; color:#64748B; font-weight:700; display:block;">${school.name_ruby || ''}</span>
            <h3 class="home-school-title" style="margin:2px 0 6px; font-size:20px; font-weight:800; color:var(--text-main);">${school.name}</h3>
            
            <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin:6px 0 10px;">
              <span style="font-size:12px; background:#F8FAFC; color:#475569; border:1px solid #E2E8F0; padding:3px 8px; border-radius:6px; font-weight:700;">
                📍 所在地：${school.prefecture} ${school.district || ''}（最寄：${school.station_name}）
              </span>
              <span style="font-size:12px; background:#EFF6FF; color:#1D4ED8; border:1px solid #BFDBFE; padding:3px 8px; border-radius:6px; font-weight:800;">
                ⏱ 自宅（${currentStation}）より 片道約${commuteMin}分
              </span>
            </div>
          </div>
        </div>

        ${isChild ? `
          <div class="child-catchphrase-banner">
            「${getChildCatchphrase(school)}」
          </div>
          <div class="home-school-mode-summary-box child-theme">
            <span class="summary-badge-mini">★ ここがワクワク！</span>
            <p class="summary-text-mini">${school.child_summary}</p>
          </div>
        ` : `
          <p class="home-school-catch" style="font-weight:700; color:var(--text-main); margin-bottom:8px;">「${school.catchphrase}」</p>
        `}

        <div class="home-school-tags-row" style="margin: 8px 0 10px;">
          <span class="search-tag-pill">部活 ${school.club_label}</span>
          <span class="search-tag-pill">合格実績 ${school.record_label}</span>
          ${!isChild ? `<span class="search-tag-pill">学費 約${Math.round(school.tuition / 10000)}万円/年</span>` : ''}
        </div>

        ${firstEvent ? `
          <div class="home-card-event-banner">
            <div class="event-banner-text">
              <span class="event-pill-mini">${firstEvent.type}</span>
              <strong class="event-date-mini">${firstEvent.date}</strong>
              <span class="event-name-mini">${firstEvent.title}</span>
            </div>
            ${isChild ? `
              <button type="button" class="btn-event-quick-plan" onclick="addEventToVisitSchedule('${school.school_id}', '${firstEvent.id}', this)">
                ✦ 行ってみる
              </button>
            ` : ''}
          </div>
        ` : ''}

        <div class="home-card-actions">
          <button type="button" class="btn-solid-child btn-sm" onclick="openSchoolDetailModal('${school.school_id}');">
            学校を詳しく見る
          </button>
          ${school.official_url ? `
            <a href="${school.official_url}" target="_blank" rel="noopener noreferrer" class="btn-outline btn-sm btn-official-card-link" style="display:inline-flex; align-items:center; gap:4px; text-decoration:none; font-weight:700;">
              🌐 公式HP ↗
            </a>
          ` : ''}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ==========================================
// 探す画面：単語検索 ＆ 一言レコメンド付き一覧 ＆ いいねフィルター
// ==========================================
let currentKeywordSearch = '';
let currentQuickTag = 'all';
let isFavoriteFilterActive = false;

function handleKeywordSearch(keyword) {
  currentKeywordSearch = (keyword || '').trim().toLowerCase();
  const clearBtn = document.getElementById('btnClearKeyword');
  if (clearBtn) {
    clearBtn.style.display = currentKeywordSearch.length > 0 ? 'inline-block' : 'none';
  }
  renderSchoolSearchList();
}

function clearKeywordSearch() {
  const input = document.getElementById('schoolSearchKeywordInput');
  if (input) input.value = '';
  handleKeywordSearch('');
}

function filterByQuickTag(tag, btnEl) {
  isFavoriteFilterActive = false;
  currentQuickTag = tag;
  document.querySelectorAll('.quick-tag-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderSchoolSearchList();
}

function filterByFavorite(btnEl) {
  isFavoriteFilterActive = true;
  currentQuickTag = 'favorite';
  document.querySelectorAll('.quick-tag-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderSchoolSearchList();
}

function renderSchoolSearchList(filterType = 'all') {
  const container = document.getElementById('schoolSearchListCards');
  if (!container) return;
  container.innerHTML = '';

  const isChild = currentUserMode === 'child';
  // ★重要：日常通学圏外（北海道・青森等の遠隔地）および保護者の「絶対に譲れない条件（通学時間上限等）」を満たさない学校を完全除外
  let list = getFilteredSchoolsByParentStrictRules(SCHOOL_DATABASE);

  // いいねフィルター
  if (isFavoriteFilterActive || currentQuickTag === 'favorite') {
    list = list.filter(s => s.is_favorite);
  }

  // 単語検索フィルター
  if (currentKeywordSearch) {
    list = list.filter(s => {
      const targetStr = `${s.name} ${s.name_ruby} ${s.catchphrase} ${s.recommend_phrase} ${s.prefecture} ${s.station_name} ${s.vibe_label} ${s.child_summary} ${s.tags.join(' ')}`.toLowerCase();
      return targetStr.includes(currentKeywordSearch);
    });
  }

  // クイックタグフィルター（いいね以外）
  if (currentQuickTag && currentQuickTag !== 'all' && currentQuickTag !== 'favorite') {
    list = list.filter(s => {
      const targetStr = `${s.vibe_label} ${s.catchphrase} ${s.recommend_phrase} ${s.interest_category_label} ${s.child_summary}`.toLowerCase();
      return targetStr.includes(currentQuickTag.toLowerCase());
    });
  }

  // 通学条件ガイド情報の取得
  const pCond = AppSchema.parent_profile.conditions || {};
  const commuteLimit = pCond.commute_time_max || 60;
  const userAddr = AppSchema.parent_profile.address || "ご自宅";
  const userStn = AppSchema.parent_profile.station ? `（${AppSchema.parent_profile.station}駅）` : '';

  // 件数表示の更新
  const countTextEl = document.getElementById('searchResultCountText');
  if (countTextEl) {
    countTextEl.textContent = `表示中: ${list.length}校（通学圏内）`;
  }

  // 条件による絞り込みを知らせる安心バナーの挿入
  const filterNotice = document.createElement('div');
  filterNotice.className = 'search-commute-filter-notice';
  filterNotice.style.cssText = "margin-bottom: 16px; padding: 10px 14px; background: #F0FDF4; border: 2px solid #86EFAC; border-radius: 10px; font-size: 13px; color: #166534; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;";
  filterNotice.innerHTML = `
    <div>
      <strong style="color: #15803D;">🛡 保護者の通学条件を適用中：</strong>
      <span>${userAddr}${userStn} から片道【${commuteLimit}分以内】に通学可能な学校のみを表示しています。</span>
    </div>
    <span style="font-size: 11px; background: #DCFCE7; padding: 2px 8px; border-radius: 12px; font-weight: 700;">日常通学可能校のみ厳選</span>
  `;
  container.appendChild(filterNotice);

  if (list.length === 0) {
    const emptyBox = document.createElement('div');
    if (isFavoriteFilterActive || currentQuickTag === 'favorite') {
      emptyBox.innerHTML = `
        <div class="search-empty-box">
          <p class="empty-title">まだ「いいね」した学校がありません</p>
          <p class="empty-desc">気になった学校のハートボタン（♥）を押すと、ここにお気に入りの学校がまとまります！</p>
          <button type="button" class="btn-solid-child btn-sm" onclick="filterByQuickTag('all', document.querySelector('.quick-tag-chip'))">
            通学可能な学校を見る
          </button>
        </div>
      `;
    } else {
      emptyBox.innerHTML = `
        <div class="search-empty-box">
          <p class="empty-title">条件に合う通学可能な学校が見つかりませんでした</p>
          <p class="empty-desc">保護者画面の通学時間上限（現在：${commuteLimit}分）を少し広げるか、検索キーワードを変更してみてください。</p>
          <button type="button" class="btn-outline btn-sm" onclick="clearKeywordSearch(); filterByQuickTag('all', document.querySelector('.quick-tag-chip'))">
            検索条件をリセット
          </button>
        </div>
      `;
    }
    container.appendChild(emptyBox);
    return;
  }

  const currentStation = AppSchema.parent_profile.station || "ご自宅最寄り";

  list.forEach(school => {
    const card = document.createElement('div');
    card.className = 'home-recommend-school-card search-card-synced';

    const genderText = school.gender_type === 'girls' ? '女子校' : school.gender_type === 'boys' ? '男子校' : '共学';
    const heartActive = school.is_favorite ? 'active' : '';
    const summaryText = isChild ? school.child_summary : school.parent_summary;
    const summaryLabel = isChild ? 'ここがワクワク！' : '保護者向けポイント（教育・進路・環境）';
    const firstEvent = (school.events && school.events.length > 0) ? school.events[0] : null;
    const commuteMin = school.calculated_commute_time || school.commute_time || 30;
    const routeSummary = school.calculated_route_summary || '';

    card.innerHTML = `
      <div class="card-school-badge-header" style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px 0; gap:8px;">
        <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
          <span style="font-size:11px; font-weight:800; background:#E0F2FE; color:#0369A1; padding:2px 8px; border-radius:4px;">
            ${school.category === 'private' ? '私立' : school.category === 'public' ? '公立一貫' : '国立附属'}
          </span>
          <span style="font-size:11px; font-weight:800; background:#F1F5F9; color:#334155; padding:2px 8px; border-radius:4px;">
            ${genderText}
          </span>
          <span style="font-size:11px; font-weight:700; background:#FEF3C7; color:#92400E; padding:2px 8px; border-radius:4px;">
            ${school.vibe_label}
          </span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          ${isChild ? `<span class="child-match-pill-hero" style="position:static;">★ ぴったり度 ${school.match_rate_child || 95}%</span>` : `<span class="parent-dev-pill-hero" style="position:static;">偏差値 ${school.deviation_score}</span>`}
          <button type="button" class="btn-heart-hero-corner ${heartActive}" style="position:static;" onclick="toggleSchoolFavorite('${school.school_id}', this)" title="お気に入り">
            ${getHeartSvg(school.is_favorite)}
          </button>
        </div>
      </div>

      <div class="home-card-main-body" style="padding-top:10px;">
        ${renderSchoolPhotoPlaceholder(school, '140px')}

        <div class="home-card-header-row">
          <div class="school-name-col">
            <span style="font-size:11px; color:#64748B; font-weight:700; display:block;">${school.name_ruby || ''}</span>
            <h3 class="home-school-title" style="margin:2px 0 6px; font-size:20px; font-weight:800; color:var(--text-main);">${school.name}</h3>
            
            <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin:6px 0 10px;">
              <span style="font-size:12px; background:#F8FAFC; color:#475569; border:1px solid #E2E8F0; padding:3px 8px; border-radius:6px; font-weight:700;">
                📍 所在地：${school.prefecture} ${school.district || ''}（最寄：${school.station_name}）
              </span>
              <span style="font-size:12px; background:#EFF6FF; color:#1D4ED8; border:1px solid #BFDBFE; padding:3px 8px; border-radius:6px; font-weight:800;">
                ⏱ 自宅（${currentStation}）より 片道約${commuteMin}分
              </span>
            </div>
          </div>
        </div>

        ${isChild ? `
          <div class="child-catchphrase-banner">
            「${getChildCatchphrase(school)}」
          </div>
          <div class="home-school-mode-summary-box child-theme">
            <span class="summary-badge-mini">★ ここがワクワク！</span>
            <p class="summary-text-mini">${school.child_summary}</p>
          </div>
        ` : `
          <p class="home-school-catch" style="font-weight:700; color:var(--text-main); margin-bottom:8px;">「${school.catchphrase}」</p>
        `}

        <div class="home-school-tags-row" style="margin: 8px 0 10px;">
          <span class="search-tag-pill">${school.vibe_label}</span>
          <span class="search-tag-pill">部活 ${school.club_label}</span>
          ${!isChild ? `<span class="search-tag-pill">学費 約${Math.round(school.tuition / 10000)}万円/年</span>` : ''}
        </div>

        ${firstEvent ? `
          <div class="home-card-event-banner">
            <div class="event-banner-text">
              <span class="event-pill-mini">${firstEvent.type}</span>
              <strong class="event-date-mini">${firstEvent.date}</strong>
              <span class="event-name-mini">${firstEvent.title}</span>
            </div>
            ${isChild ? `
              <button type="button" class="btn-event-quick-plan" onclick="addEventToVisitSchedule('${school.school_id}', '${firstEvent.id}', this)">
                ✦ 行ってみる
              </button>
            ` : ''}
          </div>
        ` : ''}

        <div class="home-card-actions">
          <button type="button" class="${isChild ? 'btn-solid-child' : 'btn-solid-parent'} btn-sm" onclick="openSchoolDetailModal('${school.school_id}');">
            学校を詳しく見る
          </button>
          ${school.official_url ? `
            <a href="${school.official_url}" target="_blank" rel="noopener noreferrer" class="btn-outline btn-sm btn-official-card-link" style="display:inline-flex; align-items:center; gap:4px; text-decoration:none; font-weight:700;">
              🌐 公式HP ↗
            </a>
          ` : ''}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterSchoolList(filterType, btnEl) {
  document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderSchoolSearchList(filterType);
}

function toggleSchoolFavorite(schoolId, btnEl) {
  const school = SCHOOL_DATABASE.find(s => s.school_id === schoolId);
  if (school) {
    school.is_favorite = !school.is_favorite;
    btnEl.innerHTML = getHeartSvg(school.is_favorite);
    if (school.is_favorite) {
      btnEl.classList.add('active');
    } else {
      btnEl.classList.remove('active');
    }
    // いいねフィルター表示中なら即時更新
    if (isFavoriteFilterActive) {
      renderSchoolSearchList();
    }
    renderMypageFavorites();
  }
}

// ==========================================
// マイページ：いいねした学校一覧の描画
// ==========================================
function renderMypageFavorites() {
  const container = document.getElementById('mypageFavoriteSchoolsList');
  if (!container) return;
  container.innerHTML = '';

  const isChild = currentUserMode === 'child';
  const favList = SCHOOL_DATABASE.filter(s => s.is_favorite);

  if (favList.length === 0) {
    container.innerHTML = `
      <div class="mypage-fav-empty-box">
        <p class="fav-empty-title">まだ「いいね」した学校がありません</p>
        <p class="fav-empty-desc">気になる学校のハートボタン（<span style="color: var(--koko-pink); font-size: 15px;">♥</span>）を押すと、ここに保存されます。</p>
        <button type="button" class="btn-outline btn-sm" onclick="switchAppView('search')">
          学校を探しにいく
        </button>
      </div>
    `;
    return;
  }

  favList.forEach(school => {
    const item = document.createElement('div');
    item.className = 'mypage-fav-item-card';
    const genderText = school.gender_type === 'girls' ? '女子校' : school.gender_type === 'boys' ? '男子校' : '共学';
    const currentStation = (AppSchema.parent_profile && AppSchema.parent_profile.station) ? AppSchema.parent_profile.station : 'ご自宅最寄駅';
    const commuteMin = school.calculated_commute_time || school.commute_time || 30;

    item.innerHTML = `
      <div class="mypage-fav-item-badge" style="width:48px; height:48px; border-radius:12px; background:#EFF6FF; border:2px solid #BFDBFE; display:flex; align-items:center; justify-content:center; font-size:24px; flex-shrink:0;">
        🏫
      </div>
      <div class="mypage-fav-item-main">
        <h4 class="mypage-fav-item-name">${school.name}</h4>
        <p class="mypage-fav-item-meta">📍 ${school.prefecture}（${school.station_name}） ・ ${genderText} ・ ⏱ 自宅より約${commuteMin}分</p>
        ${isChild ? `<span class="child-match-pill-mini">★ マッチ度 ${school.match_rate_child || 95}%</span>` : `<span class="parent-meta-pill-mini">偏差値 ${school.deviation_score} ・ 学費 約${Math.round(school.tuition / 10000)}万円</span>`}
      </div>
      <div class="mypage-fav-item-actions">
        <button type="button" class="${isChild ? 'btn-solid-child' : 'btn-solid-parent'} btn-sm" onclick="openSchoolDetailModal('${school.school_id}')">
          学校を詳しく見る
        </button>
        ${school.official_url ? `
          <a href="${school.official_url}" target="_blank" rel="noopener noreferrer" class="btn-outline btn-sm btn-official-card-link" style="display:inline-flex; align-items:center; gap:4px; text-decoration:none; font-weight:700;">
            🌐 公式HP ↗
          </a>
        ` : ''}
        <button type="button" class="btn-compare-mypage btn-sm" onclick="goToCompareFromMypage('${school.school_id}')">
          ⚖️ 他校と比較する
        </button>
      </div>
    `;
    container.appendChild(item);
  });
}

// ==========================================
// 学校詳細画面（独立した専用画面：背景に他画面を表示しない）
// ==========================================
function openSchoolDetailModal(schoolId) {
  const school = SCHOOL_DATABASE.find(s => s.school_id === schoolId);
  if (!school) return;

  // 直前の画面を記憶（戻るボタンで使用）
  if (currentRole !== 'school-detail') {
    previousRoleBeforeDetail = currentRole || 'home';
  }
  currentDetailSchoolId = schoolId;

  const contentContainer = document.getElementById('schoolDetailScreenContent');
  if (!contentContainer) return;

  const isChild = currentUserMode === 'child';
  const heartActive = school.is_favorite ? 'active' : '';
  const genderText = school.gender_type === 'girls' ? '女子校' : school.gender_type === 'boys' ? '男子校' : '共学';
  const events = school.events || [];
  const currentStation = (AppSchema.parent_profile && AppSchema.parent_profile.station) ? AppSchema.parent_profile.station : 'ご自宅最寄駅';
  const commuteMin = school.calculated_commute_time || school.commute_time || 30;

  // 上部固定ヘッダーのお気に入りボタン状態を同期
  const btnTopFav = document.getElementById('btnDetailFavTop');
  if (btnTopFav) {
    if (school.is_favorite) {
      btnTopFav.classList.add('active');
    } else {
      btnTopFav.classList.remove('active');
    }
  }

  contentContainer.innerHTML = `
    <!-- 学校写真プレースホルダー（大体のあたり） -->
    ${renderSchoolPhotoPlaceholder(school, '200px')}

    <!-- 学校ヘッダー情報カード -->
    <div class="card-surface" style="margin-top: 14px; padding: 18px 20px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
        <div style="flex:1;">
          <span style="font-size:12px; color:#64748B; font-weight:700; display:block;">${school.name_ruby || ''}</span>
          <h1 style="margin: 4px 0 10px; font-size:24px; font-weight:800; color:var(--text-main); line-height:1.3;">${school.name}</h1>
          
          <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin: 8px 0 12px;">
            <span style="font-size:12px; background:#EFF6FF; color:#1D4ED8; border:1px solid #BFDBFE; padding:4px 10px; border-radius:8px; font-weight:800;">
              ⏱ 自宅（${currentStation}）より 片道約${commuteMin}分
            </span>
            <span style="font-size:12px; background:#F8FAFC; color:#334155; border:1px solid #CBD5E1; padding:4px 10px; border-radius:8px; font-weight:700;">
              📍 所在地：${school.prefecture} ${school.district || ''}（最寄：${school.station_name}駅）
            </span>
            <span style="font-size:12px; background:#FEF3C7; color:#B45309; border:1px solid #FDE68A; padding:4px 10px; border-radius:8px; font-weight:700;">
              ${genderText}
            </span>
            <span style="font-size:12px; background:#F1F5F9; color:#475569; border:1px solid #E2E8F0; padding:4px 10px; border-radius:8px; font-weight:700;">
              ${school.category === 'private' ? '私立' : school.category === 'public' ? '公立一貫' : '国立附属'}
            </span>
          </div>
        </div>

        <button type="button" class="btn-modal-favorite ${heartActive}" onclick="toggleDetailFavFromTop(this)" style="flex-shrink:0;">
          ${getHeartSvg(school.is_favorite)}
          <span class="btn-fav-txt">${school.is_favorite ? 'いいね中' : 'いいね'}</span>
        </button>
      </div>

      ${school.official_url ? `
        <div style="margin-top: 8px; padding-top: 10px; border-top: 1px dashed #E2E8F0;">
          <a href="${school.official_url}" target="_blank" rel="noopener noreferrer" class="btn-official-detail-link" style="display:inline-flex; align-items:center; gap:6px; background:#EEF4FF; color:var(--koko-blue-main); border:2px solid var(--koko-blue-main); border-radius:20px; padding:8px 16px; font-size:13px; font-weight:800; text-decoration:none; box-shadow:2px 2px 0px var(--koko-blue-main);">
            🌐 公式ホームページを見る（外部サイト） ↗
          </a>
        </div>
      ` : ''}
    </div>

    <!-- コンテンツボディ各セクション -->
    <div class="modal-school-sections-container" style="margin-top: 16px;">
      
      <!-- 1. 見学・イベント情報（オープンキャンパス・説明会・文化祭） -->
      <section class="modal-section-card events-section">
        <div class="modal-section-title-wrap">
          <span class="section-star">✦</span>
          <h3 class="modal-section-title">開催予定のイベント・見学情報</h3>
        </div>
        <p class="section-sub-tip">「行ってみる」を押すと、見学記録の「行く前」に自動でメモされます！</p>
        <div class="modal-events-list">
          ${events.map(ev => `
            <div class="modal-event-item-card">
              <div class="m-event-top-row">
                <span class="m-event-type-badge">${ev.type}</span>
                <strong class="m-event-date">${ev.date}</strong>
              </div>
              <h4 class="m-event-title">${ev.title}</h4>
              ${isChild ? `
                <div class="m-event-action-bar">
                  <button type="button" class="btn-solid-child btn-sm btn-plan-event" onclick="addEventToVisitSchedule('${school.school_id}', '${ev.id}', this)">
                    ✦ 行ってみる（予約メモ）
                  </button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 2. こんな授業が特徴！（キミの知的好奇心を刺激） -->
      <section class="modal-section-card special-class-section">
        <div class="modal-section-title-wrap">
          <span class="section-star">✦</span>
          <h3 class="modal-section-title">こんな授業が特徴！ワクワクする体験</h3>
        </div>
        <div class="special-classes-grid">
          ${(school.special_classes || []).map((cls, idx) => `
            <div class="special-class-card">
              <div class="class-num-badge">特色授業 ${idx + 1}</div>
              <h4 class="class-title">${cls.title}</h4>
              <p class="class-desc">${cls.desc}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 3. 学校の強み・自慢ポイント -->
      <section class="modal-section-card strengths-section">
        <div class="modal-section-title-wrap">
          <span class="section-star">✦</span>
          <h3 class="modal-section-title">この学校の強み・自慢ポイント</h3>
        </div>
        <ul class="school-strengths-list">
          ${(school.school_strengths || []).map(st => `
            <li class="strength-item">
              <span class="strength-check-icon">✦</span>
              <span class="strength-text">${st}</span>
            </li>
          `).join('')}
        </ul>
      </section>

      <!-- 4. キミが通うイメージ（通学シミュレーション ＆ 具体的なルート案内） -->
      <section class="modal-section-card simulation-section">
        <div class="modal-section-title-wrap">
          <span class="section-star">✦</span>
          <h3 class="modal-section-title">通学アクセス ＆ 通う1日のイメージ</h3>
        </div>
        ${school.calculated_route_summary ? `
          <div style="margin-bottom: 14px; padding: 12px 14px; background: #EFF6FF; border: 2px solid #93C5FD; border-radius: 8px;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
              <strong style="color: #1E40AF; font-size: 13px;">🚉 具体的な通学ルート・交通手段（${AppSchema.parent_profile.station || 'ご自宅最寄駅'}より）</strong>
            </div>
            <p style="margin:0; font-size:13px; color:#1E3A8A; line-height:1.5;">${school.calculated_route_summary}</p>
          </div>
        ` : ''}
        <div class="simulation-text-box">
          <p class="simulation-desc">${school.life_simulation || ''}</p>
        </div>
      </section>

      <!-- 5. モードに応じた総合解説 -->
      <section class="modal-section-card summary-commentary-section">
        <div class="modal-section-title-wrap">
          <span class="section-star">✦</span>
          <h3 class="modal-section-title">${isChild ? '学校からのメッセージ' : '保護者向け総合レポート（教育・進路・費用）'}</h3>
        </div>
        <div class="modal-summary-box ${isChild ? 'child-theme' : 'parent-theme'}">
          <p class="modal-summary-p">${isChild ? school.child_summary : school.parent_summary}</p>
          ${!isChild ? `
            <div class="parent-extra-data-row" style="margin-top: 12px; padding-top: 10px; border-top: 1px dashed #CBD5E1; display:flex; gap:16px; font-size:13px; flex-wrap:wrap;">
              <span>偏差値: <strong>${school.deviation_score}</strong></span>
              <span>年間学費: <strong>約${Math.round(school.tuition / 10000)}万円</strong></span>
              <span>合格実績: <strong>${school.recent_passed_records}</strong></span>
            </div>
          ` : ''}
        </div>
      </section>

    </div>

    <!-- 画面下部の一覧に戻るボタン -->
    <div style="margin-top: 28px; text-align: center;">
      <button type="button" class="btn-solid-parent full-width" onclick="goBackFromSchoolDetail()" style="display:flex; align-items:center; justify-content:center; gap:8px; font-size:15px; padding:14px;">
        <span>← 一覧にもどる</span>
      </button>
    </div>
  `;

  // 画面全体を「学校詳細専用画面」に切り替え（他画面は全て非表示になるため背景に何も映らない）
  switchAppView('school-detail');
}

// エイリアス
const openSchoolDetailScreen = openSchoolDetailModal;

function goBackFromSchoolDetail() {
  switchAppView(previousRoleBeforeDetail || 'home');
}

function closeSchoolDetailModal() {
  goBackFromSchoolDetail();
}

function toggleDetailFavFromTop(btnEl) {
  if (!currentDetailSchoolId) return;
  const school = SCHOOL_DATABASE.find(s => s.school_id === currentDetailSchoolId);
  if (!school) return;

  school.is_favorite = !school.is_favorite;

  // 上部ボタンの表示更新
  const btnTopFav = document.getElementById('btnDetailFavTop');
  if (btnTopFav) {
    if (school.is_favorite) {
      btnTopFav.classList.add('active');
    } else {
      btnTopFav.classList.remove('active');
    }
  }

  // 画面内のいいねボタンも更新
  document.querySelectorAll('.btn-modal-favorite').forEach(b => {
    b.innerHTML = `${getHeartSvg(school.is_favorite)} <span class="btn-fav-txt">${school.is_favorite ? 'いいね中' : 'いいね'}</span>`;
    if (school.is_favorite) b.classList.add('active');
    else b.classList.remove('active');
  });

  // 他画面のリストも同期更新
  renderSchoolSearchList();
  renderMypageFavorites();
  if (currentUserMode === 'parent') renderParentHomeDashboard();
  else renderHomeRecommendedSchools();
}

function toggleModalFavorite(schoolId, btnEl) {
  const school = SCHOOL_DATABASE.find(s => s.school_id === schoolId);
  if (school) {
    school.is_favorite = !school.is_favorite;
    btnEl.innerHTML = `${getHeartSvg(school.is_favorite)} <span class="btn-fav-txt">${school.is_favorite ? 'いいね中' : 'いいね'}</span>`;
    if (school.is_favorite) {
      btnEl.classList.add('active');
    } else {
      btnEl.classList.remove('active');
    }
    // 背景画面の各リストも同期
    renderSchoolSearchList();
    renderMypageFavorites();
    if (currentUserMode === 'parent') renderParentHomeDashboard();
    else renderHomeRecommendedSchools();
  }
}

// マイページからの比較画面遷移
let lastViewBeforeCompare = 'mypage';

function goToCompareFromMypage(schoolId) {
  lastViewBeforeCompare = 'mypage';
  const school = SCHOOL_DATABASE.find(s => s.school_id === schoolId);
  if (!school) return;

  // いいね一覧から比較相手を探す（自身以外でいいねされているもの、なければデフォルト他校）
  const otherFav = SCHOOL_DATABASE.find(s => s.is_favorite && s.school_id !== schoolId);
  let otherId = otherFav ? otherFav.school_id : (schoolId === 'sch_shibushibu' ? 'sch_hiroo' : 'sch_shibushibu');

  renderCompareTable(schoolId, otherId);
  switchAppView('compare');
}

function returnFromCompareView() {
  switchAppView(lastViewBeforeCompare || 'mypage');
}

// 比較テーブル描画
function renderCompareTable(id1 = "sch_shibushibu", id2 = "sch_hiroo") {
  const s1 = SCHOOL_DATABASE.find(s => s.school_id === id1) || SCHOOL_DATABASE[1];
  const s2 = SCHOOL_DATABASE.find(s => s.school_id === id2) || SCHOOL_DATABASE[0];

  const name1El = document.getElementById('cmpSchoolName1');
  const name2El = document.getElementById('cmpSchoolName2');
  if (name1El) name1El.textContent = s1.name;
  if (name2El) name2El.textContent = s2.name;

  const isChild = currentUserMode === 'child';
  const devRowHeader = document.querySelector('.koko-compare-table tr:nth-child(2) th');
  const tuiRowHeader = document.querySelector('.koko-compare-table tr:nth-child(3) th');

  const dev1 = document.getElementById('cmpDev1');
  const dev2 = document.getElementById('cmpDev2');
  if (dev1) dev1.textContent = isChild ? `★ ${s1.match_rate_child || 95}%` : s1.deviation_score;
  if (dev2) dev2.textContent = isChild ? `★ ${s2.match_rate_child || 98}%` : s2.deviation_score;
  if (devRowHeader) devRowHeader.textContent = isChild ? "ぴったり度" : "偏差値";

  const tui1 = document.getElementById('cmpTuition1');
  const tui2 = document.getElementById('cmpTuition2');
  if (tui1) tui1.textContent = isChild ? "自然豊か・施設充実" : `約${Math.round(s1.tuition / 10000)}万円`;
  if (tui2) tui2.textContent = isChild ? "自然豊か・施設充実" : `約${Math.round(s2.tuition / 10000)}万円`;
  if (tuiRowHeader) tuiRowHeader.textContent = isChild ? "施設・特色" : "年間学費";

  const time1 = document.getElementById('cmpTime1');
  const time2 = document.getElementById('cmpTime2');
  if (time1) time1.textContent = `約${s1.commute_time}分`;
  if (time2) time2.textContent = `約${s2.commute_time}分`;

  const vibe1 = document.getElementById('cmpVibe1');
  const vibe2 = document.getElementById('cmpVibe2');
  if (vibe1) vibe1.textContent = s1.vibe_label || "のびのび";
  if (vibe2) vibe2.textContent = s2.vibe_label || "しっかり";

  const club1 = document.getElementById('cmpClub1');
  const club2 = document.getElementById('cmpClub2');
  if (club1) club1.textContent = s1.club_label || "充実";
  if (club2) club2.textContent = s2.club_label || "盛ん";

  const rec1 = document.getElementById('cmpRecord1');
  const rec2 = document.getElementById('cmpRecord2');
  if (rec1) rec1.textContent = s1.record_label || "◎";
  if (rec2) rec2.textContent = s2.record_label || "◎";
}

function openCompareDetailModal() {
  switchAppView('parent');
  switchParentSubTab('dashboard');
}

function syncChildQuestionChoices() {
  const profile = AppSchema.child_profile;
  const map = {
    '#cSlide2': profile.moment,
    '#cSlide3': profile.lifestyle,
    '#cSlide4': profile.study,
    '#cSlide5': profile.facility,
    '#cSlide6': profile.relation
  };
  Object.entries(map).forEach(([slideSelector, tag]) => {
    const slide = document.querySelector(slideSelector);
    if (!slide) return;
    slide.querySelectorAll('.moment-choice-btn').forEach(btn => {
      if (btn.getAttribute('data-tag') === tag) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  });

  if (profile.free_comments) {
    const el1 = document.getElementById('childFreeComment_step1');
    const eq1 = document.getElementById('childFreeComment_q1');
    const eq2 = document.getElementById('childFreeComment_q2');
    const eq3 = document.getElementById('childFreeComment_q3');
    const eq4 = document.getElementById('childFreeComment_q4');
    const eq5 = document.getElementById('childFreeComment_q5');
    if (el1 && !el1.value) el1.value = profile.free_comments.step1 || '';
    if (eq1 && !eq1.value) eq1.value = profile.free_comments.q1 || '';
    if (eq2 && !eq2.value) eq2.value = profile.free_comments.q2 || '';
    if (eq3 && !eq3.value) eq3.value = profile.free_comments.q3 || '';
    if (eq4 && !eq4.value) eq4.value = profile.free_comments.q4 || '';
    if (eq5 && !eq5.value) eq5.value = profile.free_comments.q5 || '';
  }
}

function switchParentSubTab(tab) {
  document.querySelectorAll('.p-sub-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.p-sub-view').forEach(view => view.classList.remove('active'));

  if (tab === 'input') {
    const btn = document.getElementById('btnParentTabInput');
    if (btn) btn.classList.add('active');
    const view = document.getElementById('parentSubInputView');
    if (view) view.classList.add('active');
  } else if (tab === 'dashboard') {
    const btn = document.getElementById('btnParentTabDashboard');
    if (btn) btn.classList.add('active');
    const view = document.getElementById('parentSubDashboardView');
    if (view) view.classList.add('active');
    renderParentDashboard();
  }
}

// ==========================================
// 5. 【保護者モード】1問1画面 シュッとスライド進行（全10問）
// ==========================================
const PARENT_SLIDE_TITLES = [
  "保護者様のお名前",
  "ご自宅の住所と最寄り駅",
  "通学時間の上限",
  "許容する通学手段",
  "年間学費の上限",
  "希望する学校形態",
  "希望する学校種別",
  "宗教教育のご希望",
  "希望する進学傾向",
  "求める校風・教育方針",
  "絶対に譲れない条件の選定",
  "子供用URL発行完了"
];

function updateParentProgressIndicator(step) {
  parentCurrentStep = step;
  const indicatorText = document.getElementById('parentProgressStepText');
  const subTitleText = document.getElementById('parentProgressSubTitle');
  const fillBar = document.getElementById('parentProgressBarFill');

  if (step <= 10) {
    if (indicatorText) indicatorText.textContent = `質問 ${step} / 10`;
    if (subTitleText) subTitleText.textContent = PARENT_SLIDE_TITLES[step - 1];
    if (fillBar) fillBar.style.width = `${(step / 10) * 100}%`;
  } else if (step === 11) {
    if (indicatorText) indicatorText.textContent = "フェーズ 2 / 2";
    if (subTitleText) subTitleText.textContent = "絶対に譲れない条件の確定";
    if (fillBar) fillBar.style.width = "100%";
  } else {
    if (indicatorText) indicatorText.textContent = "完了";
    if (subTitleText) subTitleText.textContent = "URL発行完了";
    if (fillBar) fillBar.style.width = "100%";
  }
}

function nextParentSlide(targetStep) {
  // 質問1：保護者のお名前保存（世帯IDとは完全分離）
  if (parentCurrentStep === 1) {
    const nameInput = document.getElementById('pInputParentName');
    const rawVal = nameInput ? nameInput.value.trim() : "";
    if (rawVal === "いろは") {
      AppSchema.parent_name = "いろはさん";
    } else if (rawVal) {
      AppSchema.parent_name = rawVal.endsWith("さん") ? rawVal : `${rawVal}さん`;
    }
    renderMypageProfileHeader();
  }

function handleAddressStationInput() {
  const addrInput = document.getElementById('pInputAddress');
  const stnInput = document.getElementById('pInputStation');
  if (addrInput && addrInput.value !== undefined) {
    AppSchema.parent_profile.address = addrInput.value.trim();
  }
  if (stnInput && stnInput.value !== undefined) {
    AppSchema.parent_profile.station = stnInput.value.trim();
  }
  saveAppStateToLocalStorage();
}

  // 質問2：住所（市区町村）＆ 最寄り駅保存
  if (parentCurrentStep === 2) {
    const addrInput = document.getElementById('pInputAddress');
    const stnInput = document.getElementById('pInputStation');
    if (addrInput && addrInput.value.trim()) {
      AppSchema.parent_profile.address = addrInput.value.trim();
    }
    if (stnInput && stnInput.value.trim()) {
      AppSchema.parent_profile.station = stnInput.value.trim();
    }
    saveAppStateToLocalStorage();
  }

  const currentEl = getParentSlideEl(parentCurrentStep);
  const nextEl = getParentSlideEl(targetStep);

  performSlideTransition(currentEl, nextEl, 'next', () => {
    updateParentProgressIndicator(targetStep);
  });
}

function prevParentSlide(targetStep) {
  const currentEl = getParentSlideEl(parentCurrentStep);
  const prevEl = getParentSlideEl(targetStep);

  performSlideTransition(currentEl, prevEl, 'prev', () => {
    updateParentProgressIndicator(targetStep);
  });
}

function getParentSlideEl(step) {
  if (step >= 1 && step <= 10) return document.getElementById(`pSlide${step}`);
  if (step === 11) return document.getElementById('pSlidePhase2');
  if (step === 12) return document.getElementById('pSlideUrlToken');
  return null;
}

function updateCommuteSlider(val) {
  const intVal = parseInt(val, 10);
  AppSchema.parent_profile.conditions.commute_time_max = intVal;
  AppSchema.parent_profile.commute_time = intVal;
  const displayEl = document.getElementById('valCommuteDisplay');
  if (displayEl) displayEl.textContent = `${val}分`;
  saveAppStateToLocalStorage();
}

// 通学手段チェックボックスの連動
function handleTransportCheckboxChange(checkboxEl) {
  const labelEl = checkboxEl.closest('.big-tile-checkbox');
  if (checkboxEl.checked) {
    if (labelEl) labelEl.classList.add('active');
  } else {
    if (labelEl) labelEl.classList.remove('active');
  }
  const transChecks = document.querySelectorAll('input[name="transport"]:checked');
  AppSchema.parent_profile.conditions.transportation = Array.from(transChecks).map(c => c.value);
}

// 学校種別チェックボックスの連動
function handleCategoryCheckboxChange(checkboxEl) {
  const labelEl = checkboxEl.closest('.big-tile-checkbox');
  if (checkboxEl.checked) {
    if (labelEl) labelEl.classList.add('active');
  } else {
    if (labelEl) labelEl.classList.remove('active');
  }
  const catChecks = document.querySelectorAll('input[name="category"]:checked');
  AppSchema.parent_profile.conditions.school_category = Array.from(catChecks).map(c => c.value);
}

// 単一選択チェックボックス共通ハンドラー（学費、学校形態、宗教、進学傾向）
function handleSingleCheckboxSelect(type, value, inputEl) {
  const container = inputEl.closest('.big-tiles-group');
  if (container) {
    container.querySelectorAll('.big-tile-checkbox').forEach(lbl => {
      lbl.classList.remove('active');
      const inp = lbl.querySelector('input');
      if (inp) inp.checked = false;
    });
  }
  inputEl.checked = true;
  const parentLabel = inputEl.closest('.big-tile-checkbox');
  if (parentLabel) parentLabel.classList.add('active');

  const cond = AppSchema.parent_profile.conditions;
  if (type === 'tuition') {
    cond.tuition_max = Number(value) * 10000;
    AppSchema.parent_profile.tuition_cap = Number(value);
  } else if (type === 'gender') {
    cond.school_gender_type = value;
    AppSchema.parent_profile.gender_type = value;
  } else if (type === 'religion') {
    cond.religion_policy = value;
    AppSchema.parent_profile.religious_pref = value;
  } else if (type === 'univpath') {
    cond.university_path = value;
    AppSchema.parent_profile.university_path = value;
  }
}

// 互換性ラッパー
function selectTuitionWithoutAdvance(amount, btnEl) {
  handleSingleCheckboxSelect('tuition', amount, btnEl.querySelector('input') || btnEl);
}
function selectGenderWithoutAdvance(gender, btnEl) {
  handleSingleCheckboxSelect('gender', gender, btnEl.querySelector('input') || btnEl);
}
function selectReligionWithoutAdvance(religion, btnEl) {
  handleSingleCheckboxSelect('religion', religion, btnEl.querySelector('input') || btnEl);
}
function selectUnivPathWithoutAdvance(path, btnEl) {
  handleSingleCheckboxSelect('univpath', path, btnEl.querySelector('input') || btnEl);
}

// 質問10：校風選択チェックボタンの連動（最大3つまで選択可能）
function toggleVibeCheckbox(checkboxEl, vibeKey) {
  const currentVibes = AppSchema.parent_profile.conditions.desired_atmospheres;
  const labelEl = checkboxEl.closest('.big-tile-checkbox');

  if (checkboxEl.checked) {
    if (currentVibes.length >= 3) {
      alert("校風は最大3つまで選択可能です。");
      checkboxEl.checked = false;
      if (labelEl) labelEl.classList.remove('active');
      return;
    }
    if (!currentVibes.includes(vibeKey)) currentVibes.push(vibeKey);
    if (labelEl) labelEl.classList.add('active');
  } else {
    const index = currentVibes.indexOf(vibeKey);
    if (index >= 0) currentVibes.splice(index, 1);
    if (labelEl) labelEl.classList.remove('active');
  }

  const noticeEl = document.getElementById('vibeCountNotice');
  if (noticeEl) {
    noticeEl.textContent = `選択中: ${currentVibes.length} / 3`;
  }
}

// 質問10からフェーズ2（ハードフィルター選定）へシュッと進む
function goToParentPhase2Slide() {
  const transChecks = document.querySelectorAll('input[name="transport"]:checked');
  AppSchema.parent_profile.conditions.transportation = Array.from(transChecks).map(c => c.value);

  const catChecks = document.querySelectorAll('input[name="category"]:checked');
  AppSchema.parent_profile.conditions.school_category = Array.from(catChecks).map(c => c.value);

  renderStrictFilterSelectionCards();

  const currentEl = getParentSlideEl(10);
  const nextEl = getParentSlideEl(11);
  performSlideTransition(currentEl, nextEl, 'next', () => {
    updateParentProgressIndicator(11);
  });
}

function renderStrictFilterSelectionCards() {
  const container = document.getElementById('strictFilterCardsList');
  if (!container) return;
  container.innerHTML = '';

  const cond = AppSchema.parent_profile.conditions || {};
  const userAddr = AppSchema.parent_profile.address || "ご自宅";
  const userStation = AppSchema.parent_profile.station || "";
  const locationLabel = userStation ? `${userAddr}（最寄り: ${userStation}駅）` : userAddr;

  const transList = cond.transportation || ['train', 'bicycle', 'walk'];
  const catList = cond.school_category || ['private'];

  const filterCandidates = [
    {
      key: "commute_time_max",
      title: "通学時間の上限（厳守）",
      detail: `ドア・トゥ・ドアで【片道 ${cond.commute_time_max || 60}分以内】であること（※これを超える学校は完全除外）`
    },
    {
      key: "transportation",
      title: "通学手段・通学範囲（自転車・徒歩含む）",
      detail: `自宅（${locationLabel}）からの希望通学手段【${transList.map(t => t === 'bicycle' ? '自転車通学' : t === 'walk' ? '徒歩通学' : t === 'train' ? '電車利用' : t === 'bus' ? '路線バス' : 'スクールバス').join('、')}】に合致すること`
    },
    {
      key: "tuition_max",
      title: "年間学費の上限",
      detail: (!cond.tuition_max || cond.tuition_max === 0) ? "こだわらない（学費の上限なし）" : `年間学費が【${cond.tuition_max / 10000}万円未満】であること`
    },
    {
      key: "school_gender_type",
      title: "学校形態",
      detail: cond.school_gender_type === 'any' ? "こだわらない（共学・男子校・女子校問わず）" : `【${cond.school_gender_type === 'coed' ? '共学校のみ' : cond.school_gender_type === 'boys' ? '男子校のみ' : '女子校のみ'}】であること`
    },
    {
      key: "school_category",
      title: "学校種別",
      detail: `【${catList.map(c => c === 'private' ? '私立' : c === 'public' ? '公立一貫' : '国立附属').join('、')}】であること`
    },
    {
      key: "religion_policy",
      title: "宗教教育",
      detail: cond.religion_policy === 'any' ? "こだわらない（宗教教育の有無問わず）" : `宗教方針が【${cond.religion_policy === 'none' ? '無宗教' : cond.religion_policy === 'christian' ? 'キリスト教系' : '仏教系'}】であること`
    },
    {
      key: "university_path",
      title: "希望進学傾向",
      detail: cond.university_path === 'any' ? "こだわらない（大学附属・進学校問わず）" : `【${cond.university_path === 'attached' ? '大学附属系' : '進学校系'}】であること`
    }
  ];

  filterCandidates.forEach(cand => {
    const isSelected = (AppSchema.parent_profile.strict_filters || []).includes(cand.key);
    const card = document.createElement('label');
    card.className = `strict-card-item ${isSelected ? 'selected' : ''}`;

    card.innerHTML = `
      <input type="checkbox" value="${cand.key}" ${isSelected ? 'checked' : ''} onchange="toggleStrictFilter('${cand.key}', this)">
      <div class="strict-card-content">
        <h4>${cand.title}</h4>
        <p>${cand.detail}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function toggleStrictFilter(key, checkboxEl) {
  const list = AppSchema.parent_profile.strict_filters;
  const idx = list.indexOf(key);
  if (checkboxEl.checked) {
    if (idx < 0) list.push(key);
    checkboxEl.closest('.strict-card-item').classList.add('selected');
  } else {
    if (idx >= 0) list.splice(idx, 1);
    checkboxEl.closest('.strict-card-item').classList.remove('selected');
  }
  saveAppStateToLocalStorage();
}

function saveAndGenerateChildUrl() {
  if (AppSchema.parent_profile.strict_filters.length === 0) {
    alert("絶対に譲れない条件（足切り条件）を少なくとも1つ選択してください。");
    return;
  }

  saveAppStateToLocalStorage();
  executeSchoolMatching();
  renderQrCode();

  const currentEl = getParentSlideEl(11);
  const nextEl = getParentSlideEl(12);
  performSlideTransition(currentEl, nextEl, 'next', () => {
    updateParentProgressIndicator(12);
  });
}

function renderQrCode() {
  const qrBox = document.getElementById('qrCodeContainer');
  if (!qrBox) return;
  qrBox.innerHTML = `
    <svg width="124" height="124" viewBox="0 0 124 124" fill="#0F172A">
      <rect x="0" y="0" width="36" height="36" fill="none" stroke="#0F172A" stroke-width="6"/>
      <rect x="10" y="10" width="16" height="16" fill="#0F172A"/>
      <rect x="88" y="0" width="36" height="36" fill="none" stroke="#0F172A" stroke-width="6"/>
      <rect x="98" y="10" width="16" height="16" fill="#0F172A"/>
      <rect x="0" y="88" width="36" height="36" fill="none" stroke="#0F172A" stroke-width="6"/>
      <rect x="10" y="98" width="16" height="16" fill="#0F172A"/>
      <rect x="44" y="8" width="10" height="10"/>
      <rect x="64" y="8" width="14" height="10"/>
      <rect x="44" y="26" width="12" height="12"/>
      <rect x="68" y="26" width="10" height="12"/>
      <rect x="8" y="44" width="12" height="12"/>
      <rect x="28" y="44" width="10" height="10"/>
      <rect x="48" y="48" width="28" height="28" fill="#1E3A8A"/>
      <rect x="86" y="46" width="12" height="10"/>
      <rect x="106" y="46" width="10" height="12"/>
      <rect x="8" y="66" width="14" height="12"/>
      <rect x="86" y="66" width="12" height="14"/>
      <rect x="106" y="66" width="10" height="12"/>
      <rect x="44" y="88" width="12" height="12"/>
      <rect x="66" y="88" width="10" height="10"/>
      <rect x="86" y="88" width="28" height="28" fill="#0F172A"/>
    </svg>
  `;
}

function copyChildUrl() {
  const urlInput = document.getElementById('inputGeneratedUrl');
  if (urlInput) {
    urlInput.select();
    navigator.clipboard.writeText(urlInput.value).then(() => {
      document.getElementById('copyNoticeMsg').textContent = "専用URLをクリップボードにコピーしました！";
      setTimeout(() => {
        const msg = document.getElementById('copyNoticeMsg');
        if (msg) msg.textContent = "";
      }, 3000);
    });
  }
}

function simulateChildLogin() {
  switchMainRole('child');
}

// ==========================================
// 6. 【子供モード】1問1画面 シュッとスライド進行（全7問）
// ==========================================
const CHILD_SLIDE_TITLES = [
  "ニックネームをおしえてね",
  "すきなことを見つけよう",
  "一番楽しい瞬間",
  "放課後や休み時間の過ごし方",
  "ワクワクする授業スタイル",
  "学校にあったらうれしい場所",
  "先生や先輩との関係",
  "あなたにぴったりの中学校 TOP 3"
];

function updateChildProgressIndicator(step) {
  childCurrentStep = step;
  const stepText = document.getElementById('childProgressStepText');
  const subTitle = document.getElementById('childProgressSubTitle');
  const fillBar = document.getElementById('childProgressBarFill');

  if (!stepText || !subTitle || !fillBar) return;

  if (step === 0) {
    stepText.textContent = "Koko* へようこそ";
    subTitle.textContent = "あなたの好きを見つけよう";
    fillBar.style.width = "10%";
  } else if (step <= 7) {
    stepText.textContent = `いま ${step}問目 / 全部で 7問`;
    subTitle.textContent = CHILD_SLIDE_TITLES[step - 1];
    fillBar.style.width = `${(step / 7) * 100}%`;
  } else {
    stepText.textContent = "完了！";
    subTitle.textContent = CHILD_SLIDE_TITLES[7];
    fillBar.style.width = "100%";
  }
}

function getChildSlideEl(step) {
  if (step === 0) return document.getElementById('cSlide0');
  if (step >= 1 && step <= 7) return document.getElementById(`cSlide${step}`);
  if (step === 8 || step === 'result') return document.getElementById('cSlideResult');
  return null;
}

function nextChildSlide(targetStep) {
  // 質問1：ニックネーム保存（世帯IDとは完全分離）
  if (childCurrentStep === 1) {
    const nickInput = document.getElementById('cInputNickname');
    const nickVal = nickInput ? nickInput.value.trim() : "";
    if (nickVal === "いろは") {
      AppSchema.child_name = "いろは";
    } else if (nickVal) {
      AppSchema.child_name = nickVal;
    }
    renderMypageProfileHeader();
  }

  // 質問2：すきなこと選択チェック
  if (childCurrentStep === 2) {
    if (AppSchema.child_profile.interests.length === 0) {
      alert("すきなことを少なくとも1つ選んでね！");
      return;
    }
  }

  // 自由記述の一時保存
  saveChildFreeComments();

  const currentEl = getChildSlideEl(childCurrentStep);
  const nextEl = getChildSlideEl(targetStep);

  performSlideTransition(currentEl, nextEl, 'next', () => {
    updateChildProgressIndicator(targetStep);
  });
}

function prevChildSlide(targetStep) {
  saveChildFreeComments();

  const currentEl = getChildSlideEl(childCurrentStep);
  const prevEl = getChildSlideEl(targetStep);

  performSlideTransition(currentEl, prevEl, 'prev', () => {
    updateChildProgressIndicator(targetStep);
  });
}

function renderInterestSelectionGrid() {
  const container = document.getElementById('childInterestsGrid');
  if (!container) return;
  container.innerHTML = '';

  const selectedList = AppSchema.child_profile.interests;

  CHILD_INTEREST_OPTIONS.forEach(opt => {
    const isSelected = selectedList.includes(opt.id);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `interest-item-card ${isSelected ? 'selected' : ''}`;
    card.onclick = () => toggleChildInterest(opt.id);

    card.innerHTML = `
      <div class="interest-icon-box">
        ${getSolidIconSvg(opt.icon)}
      </div>
      <div class="interest-label-box">
        <strong>${opt.title}</strong>
        <span>${opt.desc}</span>
      </div>
    `;
    container.appendChild(card);
  });

  const counterEl = document.getElementById('interestSelectCounter');
  if (counterEl) {
    counterEl.textContent = `えらんだ数: ${selectedList.length} / 3`;
  }
}

function toggleChildInterest(id) {
  const list = AppSchema.child_profile.interests;
  const index = list.indexOf(id);

  if (index >= 0) {
    list.splice(index, 1);
  } else {
    if (list.length >= 3) {
      alert("すきなことは最大3つまで選べます。");
      return;
    }
    list.push(id);
  }
  renderInterestSelectionGrid();
}

// 質問選択肢（Q1〜Q5）タップで内部タグを保存（※自動で進まず「次へ進む」ボタンで進む）
function selectQuestionChoice(category, tag, btnEl) {
  AppSchema.child_profile[category] = tag;

  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.moment-choice-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }

  saveChildFreeComments();
  saveAppStateToLocalStorage();
}

// 互換性のため残す
function selectQuestionChoiceAndAdvance(category, tag, nextTarget, btnEl) {
  selectQuestionChoice(category, tag, btnEl);
}

function saveChildFreeComments() {
  const s1 = document.getElementById('childFreeComment_step1')?.value.trim() || '';
  const q1 = document.getElementById('childFreeComment_q1')?.value.trim() || '';
  const q2 = document.getElementById('childFreeComment_q2')?.value.trim() || '';
  const q3 = document.getElementById('childFreeComment_q3')?.value.trim() || '';
  const q4 = document.getElementById('childFreeComment_q4')?.value.trim() || '';
  const q5 = document.getElementById('childFreeComment_q5')?.value.trim() || '';

  AppSchema.child_profile.free_comments = {
    step1: s1,
    q1: q1,
    q2: q2,
    q3: q3,
    q4: q4,
    q5: q5
  };
}

function finishChildQuestionsAndSlideToResult() {
  saveChildFreeComments();

  // 回答完了フラグを立ててマイページ・localStorageに保存
  AppSchema.child_profile.is_completed = true;
  saveAppStateToLocalStorage();

  executeSchoolMatching();
  renderChildRecommendedSchools();
  renderMypageChildProfile();

  const currentEl = getChildSlideEl(childCurrentStep);
  const nextEl = getChildSlideEl('result');
  performSlideTransition(currentEl, nextEl, 'next', () => {
    updateChildProgressIndicator(8);
  });
}

// マイページまたは結果画面から回答を編集する
function startChildQuestionEdit() {
  if (currentUserMode === 'parent') {
    alert("お子さまの回答データは、保護者画面からは変更できません。\nお子さまの自主性を尊重するため、画面上部の切り替えボタンで「子ども画面」にしてから編集を行ってください。");
    return;
  }
  switchAppView('child');

  // スライドの表示リセット（スライド1へ）
  for (let i = 0; i <= 7; i++) {
    const el = document.getElementById(`cSlide${i}`);
    if (el) {
      el.style.display = 'none';
      el.classList.remove('active', 'slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
    }
  }
  const resEl = document.getElementById('cSlideResult');
  if (resEl) {
    resEl.style.display = 'none';
    resEl.classList.remove('active');
  }

  const slide1 = document.getElementById('cSlide1');
  if (slide1) {
    slide1.style.display = 'block';
    slide1.classList.add('active');
  }
  childCurrentStep = 1;
  updateChildProgressIndicator(1);
  if (document.getElementById('cInputNickname')) {
    document.getElementById('cInputNickname').value = AppSchema.child_name || "いろは";
  }
  renderInterestSelectionGrid();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 保護者マイページから条件設定（全10問）を最初から編集する
function startParentConditionEdit() {
  switchAppView('parent');

  // サブビュー切り替え（入力ウィザードを表示）
  switchParentSubTab('input');

  // 全スライドを非表示・リセット
  for (let i = 1; i <= 10; i++) {
    const el = document.getElementById(`pSlide${i}`);
    if (el) {
      el.style.display = 'none';
      el.classList.remove('active', 'slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
    }
  }
  const p2 = document.getElementById('pSlidePhase2');
  if (p2) { p2.style.display = 'none'; p2.classList.remove('active'); }
  const urlCard = document.getElementById('pSlideUrlToken');
  if (urlCard) { urlCard.style.display = 'none'; urlCard.classList.remove('active'); }

  // 質問1を表示
  const slide1 = document.getElementById('pSlide1');
  if (slide1) {
    slide1.style.display = 'block';
    slide1.classList.add('active');
  }
  parentCurrentStep = 1;
  updateParentProgressIndicator(1);

  // 既存の入力値・選択状態を全問復元
  const prof = AppSchema.parent_profile || {};

  // 設問1: 保護者お名前
  if (document.getElementById('pInputParentName')) {
    document.getElementById('pInputParentName').value = AppSchema.parent_name || "いろはさん";
  }

  // 設問2: 住所・最寄り駅
  if (document.getElementById('pInputAddress')) {
    document.getElementById('pInputAddress').value = prof.address || "茨城県土浦市";
  }
  if (document.getElementById('pInputStation')) {
    document.getElementById('pInputStation').value = prof.station || "荒川沖駅";
  }

  // 設問3: 通学時間上限
  const commuteTime = prof.commute_time || 60;
  const commuteSlider = document.getElementById('pInputCommute');
  const commuteDisplay = document.getElementById('valCommuteDisplay');
  if (commuteSlider) commuteSlider.value = commuteTime;
  if (commuteDisplay) commuteDisplay.textContent = `${commuteTime}分`;

  // 設問4: 許容通学手段
  const transports = prof.transport_methods || ['train', 'bicycle', 'walk'];
  document.querySelectorAll('#groupTransport input[type="checkbox"]').forEach(chk => {
    const isChecked = transports.includes(chk.value);
    chk.checked = isChecked;
    const parentLabel = chk.closest('.big-tile-checkbox');
    if (parentLabel) {
      if (isChecked) parentLabel.classList.add('active');
      else parentLabel.classList.remove('active');
    }
  });

  // 設問5: 学費上限（チェックボックス）
  const tuitionCap = prof.tuition_cap !== undefined ? prof.tuition_cap : (prof.conditions?.tuition_max ? prof.conditions.tuition_max / 10000 : 100);
  document.querySelectorAll('#groupTuition input[type="checkbox"]').forEach(chk => {
    const isChecked = Number(chk.value) === Number(tuitionCap);
    chk.checked = isChecked;
    const parentLabel = chk.closest('.big-tile-checkbox');
    if (parentLabel) {
      if (isChecked) parentLabel.classList.add('active');
      else parentLabel.classList.remove('active');
    }
  });

  // 設問6: 学校形態（チェックボックス）
  const genderType = prof.gender_type || prof.conditions?.school_gender_type || 'coed';
  document.querySelectorAll('#groupGender input[type="checkbox"]').forEach(chk => {
    const isChecked = chk.value === genderType;
    chk.checked = isChecked;
    const parentLabel = chk.closest('.big-tile-checkbox');
    if (parentLabel) {
      if (isChecked) parentLabel.classList.add('active');
      else parentLabel.classList.remove('active');
    }
  });

  // 設問7: 学校種別
  const categories = prof.school_categories || prof.conditions?.school_category || ['private'];
  document.querySelectorAll('#groupCategory input[type="checkbox"]').forEach(chk => {
    const isChecked = categories.includes(chk.value);
    chk.checked = isChecked;
    const parentLabel = chk.closest('.big-tile-checkbox');
    if (parentLabel) {
      if (isChecked) parentLabel.classList.add('active');
      else parentLabel.classList.remove('active');
    }
  });

  // 設問8: 宗教教育（チェックボックス）
  const religion = prof.religious_pref || prof.conditions?.religion_policy || 'none';
  document.querySelectorAll('#groupReligion input[type="checkbox"]').forEach(chk => {
    const isChecked = chk.value === religion;
    chk.checked = isChecked;
    const parentLabel = chk.closest('.big-tile-checkbox');
    if (parentLabel) {
      if (isChecked) parentLabel.classList.add('active');
      else parentLabel.classList.remove('active');
    }
  });

  // 設問9: 進学傾向（チェックボックス）
  const univPath = prof.university_path || prof.conditions?.university_path || 'attached';
  document.querySelectorAll('#groupUnivPath input[type="checkbox"]').forEach(chk => {
    const isChecked = chk.value === univPath;
    chk.checked = isChecked;
    const parentLabel = chk.closest('.big-tile-checkbox');
    if (parentLabel) {
      if (isChecked) parentLabel.classList.add('active');
      else parentLabel.classList.remove('active');
    }
  });

  // 設問10: 求める校風
  const vibes = prof.atmosphere_keywords || ['free', 'stem'];
  document.querySelectorAll('#groupAtmosphere input[type="checkbox"]').forEach(chk => {
    const isChecked = vibes.includes(chk.value);
    chk.checked = isChecked;
    const parentLabel = chk.closest('.big-tile-checkbox');
    if (parentLabel) {
      if (isChecked) parentLabel.classList.add('active');
      else parentLabel.classList.remove('active');
    }
  });
  const vibeNotice = document.getElementById('vibeCountNotice');
  if (vibeNotice) {
    vibeNotice.textContent = `選択中: ${vibes.length} / 3`;
  }

  // フェーズ2（絶対に譲れない条件）のカード群を再構築
  renderStrictFilterSelectionCards();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 保護者の譲れない条件・通学圏による厳格フィルター共通関数
// 日常通学不可能な遠隔地（別地方の新幹線・寮校）や上限超過校を100%除外
// ==========================================
function getFilteredSchoolsByParentStrictRules(baseSchoolList = SCHOOL_DATABASE) {
  const parentCond = AppSchema.parent_profile.conditions || {};
  const strictKeys = AppSchema.parent_profile.strict_filters || [];

  const addrInputEl = document.getElementById('pInputAddress');
  const stnInputEl = document.getElementById('pInputStation');
  if (addrInputEl && addrInputEl.value && addrInputEl.value.trim()) {
    AppSchema.parent_profile.address = addrInputEl.value.trim();
  }
  if (stnInputEl && stnInputEl.value && stnInputEl.value.trim()) {
    AppSchema.parent_profile.station = stnInputEl.value.trim();
  }

  const userAddr = (AppSchema.parent_profile.address || "").trim();
  const userStation = (AppSchema.parent_profile.station || "").trim();
  const allowedTransports = parentCond.transportation || ['train', 'bicycle', 'walk', 'school_bus', 'bus'];

  // 全学校に対して最新の通学時間・ルート・通学圏可否を動的算出
  baseSchoolList.forEach(school => {
    if (typeof calculateDetailedCommuteRoute === 'function') {
      const routeInfo = calculateDetailedCommuteRoute(userAddr, userStation, school, allowedTransports);
      school.calculated_commute_time = routeInfo.total_minutes;
      school.calculated_route_summary = routeInfo.route_summary;
      school.is_commutable = routeInfo.is_commutable;
    } else {
      school.calculated_commute_time = school.commute_time || 30;
      school.calculated_route_summary = `${school.prefecture} ${school.station_name}駅 最寄り`;
      school.is_commutable = true;
    }
  });

  const commuteLimit = parentCond.commute_time_max || 60;
  const isStrictCommute = strictKeys.includes("commute_time_max") || strictKeys.includes("commute_time");
  const isStrictTuition = strictKeys.includes("tuition_max") || strictKeys.includes("tuition");
  const isStrictGender = strictKeys.includes("school_gender_type") || strictKeys.includes("gender_type");
  const isStrictTrans = strictKeys.includes("transportation");
  const isStrictCategory = strictKeys.includes("school_category");
  const isStrictReligion = strictKeys.includes("religion_policy") || strictKeys.includes("religion");
  const isStrictUniv = strictKeys.includes("university_path") || strictKeys.includes("univ_path");

  return baseSchoolList.filter(school => {
    // 1. 日常通学不可能（北海道・青森・九州・関西などの遠隔地）は100%完全に除外
    if (school.is_commutable === false) {
      return false;
    }

    // 2. 通学時間が片道90分を超える非現実的な学校はフェーズ2問わず日常通学不可として除外
    if (school.calculated_commute_time > 90) {
      return false;
    }

    // 3. 譲れない条件に通学時間上限がある場合、上限を1分でも超える学校は完全除外
    if (isStrictCommute) {
      if (school.calculated_commute_time > commuteLimit) {
        return false;
      }
    }

    // 3. 通学手段（徒歩・自転車限定）
    if (isStrictTrans) {
      const hasTrain = allowedTransports.includes("train");
      const hasWalk = allowedTransports.includes("walk");
      const hasBicycle = allowedTransports.includes("bicycle");
      if (hasWalk && !hasTrain && !hasBicycle) {
        if (!school.can_walk || school.calculated_commute_time > 20) return false;
      } else if (!hasTrain && (hasBicycle || hasWalk)) {
        if (!school.can_bicycle && !school.can_walk) return false;
        if (school.calculated_commute_time > 30) return false;
      }
    }

    // 4. 学費上限
    if (isStrictTuition && parentCond.tuition_max > 0) {
      if (school.tuition > parentCond.tuition_max) return false;
    }

    // 5. 学校形態
    if (isStrictGender && parentCond.school_gender_type && parentCond.school_gender_type !== "any") {
      if (school.gender_type !== parentCond.school_gender_type) return false;
    }

    // 6. 学校種別
    if (isStrictCategory && parentCond.school_category && parentCond.school_category.length > 0) {
      if (!parentCond.school_category.includes(school.category)) return false;
    }

    // 7. 宗教方針
    if (isStrictReligion && parentCond.religion_policy && parentCond.religion_policy !== "any") {
      if (school.religion !== parentCond.religion_policy) return false;
    }

    // 8. 進学傾向
    if (isStrictUniv && parentCond.university_path && parentCond.university_path !== "any") {
      if (school.university_path !== parentCond.university_path) return false;
    }

    return true;
  });
}

// ==========================================
// 7. 機能3：学校マッチング＆上位3校表示（全国47都道府県・通学時間厳格除外・詳細ルート計算）
// ==========================================
function executeSchoolMatching() {
  const parentCond = AppSchema.parent_profile.conditions || {};
  const strictKeys = AppSchema.parent_profile.strict_filters || [];
  const childProfile = AppSchema.child_profile || {};

  const userAddr = (AppSchema.parent_profile.address || "東京都").trim();
  const userStation = (AppSchema.parent_profile.station || "").trim();

  // 1. 足切り処理：保護者の絶対に譲れない条件＆通学可能圏に合致する学校のみを抽出
  let survivedSchools = getFilteredSchoolsByParentStrictRules(SCHOOL_DATABASE);

  // もし条件が厳格すぎて0校になった場合でも、絶対に遠隔地（北海道や青森等）は復活させない
  if (survivedSchools.length === 0) {
    survivedSchools = SCHOOL_DATABASE.filter(school => {
      // 日常の通学可能圏内（is_commutable === true）であること
      if (school.is_commutable === false) return false;
      // 性別形態の不一致は除外
      if (parentCond.school_gender_type && parentCond.school_gender_type !== "any" && school.gender_type !== parentCond.school_gender_type) {
        return false;
      }
      return true;
    });

    // 通学時間の短い順にソートして最も近い学校を優先
    survivedSchools.sort((a, b) => (a.calculated_commute_time || 99) - (b.calculated_commute_time || 99));
  }

  // 2. スコアリング（基礎適合率65点＋同一都道府県地元優先＋通学時間快適度＋興味ジャンル＋生活環境＋自由記述）
  const scored = survivedSchools.map(school => {
    let score = 65; // 基礎点

    // ⓪ 同一都道府県ボーナス（ご家庭の地元校を最優先：+10点）
    const isSamePref = userAddr.includes(school.prefecture) || (school.prefecture && userAddr.startsWith(school.prefecture.slice(0, 2)));
    if (isSamePref) {
      score += 10;
    }

    // ① 通学時間の快適度ボーナス（近いほど高得点：最大8点）
    if (school.calculated_commute_time <= 25) {
      score += 8;
    } else if (school.calculated_commute_time <= 40) {
      score += 5;
    } else if (school.calculated_commute_time <= 55) {
      score += 2;
    }

    // ② 子どもの興味ジャンルの合致（最大15点：1ジャンル5点×最大3）
    const childInterests = childProfile.interests || [];
    const schoolTags = school.tags || [];
    const matchedInterests = childInterests.filter(int => schoolTags.includes(int));
    score += Math.min(matchedInterests.length * 5, 15);

    // ③ 学校生活・環境の合致（各2点 × 5問 ＝ 最大10点）
    if (school.moment_tags && school.moment_tags.includes(childProfile.moment)) score += 2;
    if (school.lifestyle_tags && school.lifestyle_tags.includes(childProfile.lifestyle)) score += 2;
    if (school.study_tags && school.study_tags.includes(childProfile.study)) score += 2;
    if (school.facility_tags && school.facility_tags.includes(childProfile.facility)) score += 2;
    if (school.relation_tags && school.relation_tags.includes(childProfile.relation)) score += 2;

    // ④ 保護者の希望校風（最大5点）
    const desiredVibes = parentCond.desired_atmospheres || [];
    const schoolAtmospheres = school.atmospheres || [];
    const vibeMatches = desiredVibes.filter(v => schoolAtmospheres.includes(v));
    score += Math.min(vibeMatches.length * 3, 5);

    // ⑤ 自由記述キーワードブースト（最大5点）
    const allFreeComments = Object.values(childProfile.free_comments || {}).join(" ");
    if (allFreeComments) {
      const keywords = ["実験", "ロボット", "本", "英語", "自由", "サイエンス", "宇宙", "工作", "図書", "パソコン", "先生", "発表", "グラウンド", "運動会"];
      keywords.forEach(kw => {
        if (allFreeComments.includes(kw) && ((school.child_summary && school.child_summary.includes(kw)) || (school.catchphrase && school.catchphrase.includes(kw)))) {
          score += 2;
        }
      });
    }

    const finalScore = Math.min(Math.max(score, 75), 98);

    return {
      school_id: school.school_id,
      match_score: finalScore,
      school_data: school,
      child_summary: school.child_summary
    };
  });

  // スコア順、同点の場合は通学時間が短い順にソート
  scored.sort((a, b) => {
    if (b.match_score !== a.match_score) {
      return b.match_score - a.match_score;
    }
    return (a.school_data.calculated_commute_time || 99) - (b.school_data.calculated_commute_time || 99);
  });

  // 上位3校のぴったり度をホーム画面と完全に揃うよう98%, 95%, 92%基準で調整
  if (scored.length > 0) scored[0].match_score = Math.max(scored[0].match_score, 98);
  if (scored.length > 1) scored[1].match_score = Math.min(scored[0].match_score - 3, Math.max(scored[1].match_score, 95));
  if (scored.length > 2) scored[2].match_score = Math.min(scored[1].match_score - 3, Math.max(scored[2].match_score, 92));

  // ★重要：算出した「ぴったり度」を各学校の「マッチ度（match_rate_child）」に完全同期
  scored.forEach(item => {
    item.school_data.match_rate_child = item.match_score;
  });

  AppSchema.recommended_schools = scored.slice(0, 3);
}

// その子に合っているポイントをどどんと表示するバナー
function renderChildMatchingFitBanner() {
  const container = document.getElementById('childMatchingFitBanner');
  if (!container) return;

  const prof = AppSchema.child_profile || {};
  const interests = prof.interests || [];

  let typeTitle = "好奇心と創造力を形にする！アクティブ探究タイプ";
  let point1Title = "本格的な設備が充実！";
  let point1Desc = "3Dプリンタや実験室など、じぶんの手を動かして没頭できる環境";
  let point2Title = "個性を尊重するのびのび校風！";
  let point2Desc = "「やってみたい！」という自由な発想を先生や先輩たちが全力で応援してくれる雰囲気";
  let point3Title = "探究型のワクワクする授業！";
  let point3Desc = "教科書を覚えるだけでなく、実験や体験、みんなで意見を出し合う探究学習が充実";

  if (interests.includes("interest_sports_athletics")) {
    typeTitle = "全力で挑戦して仲間と成長する！文武両道アクティブタイプ";
    point1Title = "広大なグラウンド＆充実設備！";
    point1Desc = "思いっきり身体を動かして部活やスポーツに打ち込める恵まれた施設環境";
  } else if (interests.includes("interest_nature_biology")) {
    typeTitle = "身近な不思議をとことん探る！自然・サイエンス探究タイプ";
    point1Title = "自然豊かでフィールドワークが盛ん！";
    point1Desc = "キャンパス内の豊かな自然や実験室で、生き物や科学のふしぎを体感できる環境";
  } else if (interests.includes("interest_arts_music")) {
    typeTitle = "自分らしさを作品で表現する！アート・クリエイティブタイプ";
    point1Title = "創作に没頭できるアトリエ＆ホール！";
    point1Desc = "美術室や音楽室、発表ホールなど感性を磨いて作品づくりに没頭できる場所";
  }

  container.innerHTML = `
    <div class="matching-fit-hero-card">
      <div class="fit-hero-top-badge">✦ あなたのぴったり診断結果 ✦</div>
      <h3 class="fit-hero-title">「${typeTitle}」</h3>
      <p class="fit-hero-subtitle">
        あなたが教えてくれた「すきなこと」や「ワクワクする瞬間」から、ぴったりの中学校の特徴が見つかりました！
      </p>
      
      <div class="fit-points-list">
        <div class="fit-point-row">
          <div class="fit-point-badge">ぴったり ①</div>
          <div class="fit-point-content">
            <h4 class="fit-point-heading">${point1Title}</h4>
            <p class="fit-point-detail">${point1Desc}</p>
          </div>
        </div>
        <div class="fit-point-row">
          <div class="fit-point-badge">ぴったり ②</div>
          <div class="fit-point-content">
            <h4 class="fit-point-heading">${point2Title}</h4>
            <p class="fit-point-detail">${point2Desc}</p>
          </div>
        </div>
        <div class="fit-point-row">
          <div class="fit-point-badge">ぴったり ③</div>
          <div class="fit-point-content">
            <h4 class="fit-point-heading">${point3Title}</h4>
            <p class="fit-point-detail">${point3Desc}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderChildRecommendedSchools() {
  renderChildMatchingFitBanner();

  const container = document.getElementById('childRecommendedList');
  if (!container) return;
  container.innerHTML = '';

  if (AppSchema.recommended_schools.length === 0) {
    container.innerHTML = `
      <div style="padding:36px; text-align:center; background:#fff; border:2px dashed #E2E8F0; border-radius:24px;">
        <div style="margin-bottom:12px;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <p style="font-size:18px; font-weight:800; color:var(--text-main);">おうちの人の条件に合う学校が見つかりませんでした。</p>
        <p style="font-size:14px; color:var(--text-muted); margin-top:8px;">保護者の方に通学時間や学費の上限を少し広げてもらってください。</p>
      </div>
    `;
    return;
  }

  const rankBadges = [
    { label: "おすすめ第 1 位", bg: "var(--koko-blue-main)", glow: "0 4px 12px rgba(74, 144, 226, 0.3)" },
    { label: "おすすめ第 2 位", bg: "var(--koko-green)", glow: "0 4px 12px rgba(112, 193, 179, 0.3)" },
    { label: "おすすめ第 3 位", bg: "var(--koko-pink)", glow: "0 4px 12px rgba(255, 143, 163, 0.3)" }
  ];

  const currentStation = AppSchema.parent_profile.station || "ご自宅最寄り";

  AppSchema.recommended_schools.forEach((item, index) => {
    const s = item.school_data;
    const rankInfo = rankBadges[index] || rankBadges[2];
    const card = document.createElement('article');
    card.className = 'rec-school-card';
    const commuteMin = s.calculated_commute_time || s.commute_time || 30;
    const routeSummary = s.calculated_route_summary || '';
    const genderText = s.gender_type === 'girls' ? '女子校' : s.gender_type === 'boys' ? '男子校' : '共学';

    card.innerHTML = `
      <div class="card-school-badge-header" style="display:flex; align-items:center; justify-content:space-between; padding:16px 20px 0; gap:8px;">
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
          <span class="rec-school-rank-label" style="background:${rankInfo.bg}; box-shadow:${rankInfo.glow}; position:static; display:inline-block;">
            ${rankInfo.label}
          </span>
          <span style="font-size:11px; font-weight:800; background:#E0F2FE; color:#0369A1; padding:3px 8px; border-radius:4px;">
            ${s.category === 'private' ? '私立' : s.category === 'public' ? '公立一貫' : '国立附属'}
          </span>
          <span style="font-size:11px; font-weight:800; background:#F1F5F9; color:#334155; padding:3px 8px; border-radius:4px;">
            ${genderText}
          </span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="rec-school-score-label" style="position:static; display:inline-block;">ぴったり度: ${item.match_score}%</span>
          <button type="button" class="btn-heart-favorite ${s.is_favorite ? 'active' : ''}" onclick="toggleSchoolFavorite('${s.school_id}', this); this.classList.toggle('active');" title="お気に入り">
            ${getHeartSvg(s.is_favorite)}
          </button>
        </div>
      </div>

      <div class="rec-school-body" style="padding-top:12px;">
        ${renderSchoolPhotoPlaceholder(s, '150px')}

        <div class="rec-school-header-row">
          <div>
            <span style="font-size:11px; color:#64748B; font-weight:700; display:block;">${s.name_ruby || ''}</span>
            <h3 class="rec-school-name" style="margin:2px 0 6px; font-size:22px; font-weight:800;">${s.name}</h3>
            
            <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin:6px 0 10px;">
              <span style="font-size:12px; background:#F8FAFC; color:#475569; border:1px solid #E2E8F0; padding:3px 8px; border-radius:6px; font-weight:700;">
                📍 所在地：${s.prefecture} ${s.district || ''}（最寄：${s.station_name}）
              </span>
              <span style="font-size:12px; background:#EFF6FF; color:#1D4ED8; border:1px solid #BFDBFE; padding:3px 8px; border-radius:6px; font-weight:800;">
                ⏱ 自宅（${currentStation}）より 片道約${commuteMin}分
              </span>
            </div>
          </div>
        </div>
        
        <div class="child-catchphrase-banner">
          「${getChildCatchphrase(s)}」
        </div>

        <!-- 一目でわかるおすすめポイント（ここがワクワク！） -->
        <div class="rec-school-recommend-box">
          <span class="rec-badge-point">★ ここがワクワク！</span>
          <p class="rec-point-text">${s.recommend_phrase}</p>
        </div>

        <div class="rec-school-desc-100" style="margin: 8px 0 12px; font-size: 15px; line-height: 1.65; color: #1E293B;">
          ${item.child_summary}
        </div>

        <div class="rec-school-actions-row">
          <button type="button" class="btn-solid-child" onclick="openSchoolDetailModal('${s.school_id}')">
            ✦ 授業や学校生活を詳しく見る
          </button>
          ${s.official_url ? `
            <a href="${s.official_url}" target="_blank" rel="noopener noreferrer" class="btn-outline-child" style="display:inline-flex; align-items:center; gap:4px; text-decoration:none; font-weight:700;">
              🌐 公式HP ↗
            </a>
          ` : ''}
          <button type="button" class="btn-outline-child" onclick="goToVisitReviewForSchool('${s.school_id}')">
            見学メモを書く
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function goToVisitReviewForSchool(schoolId) {
  switchMainRole('review');
  if (schoolId) {
    const select = document.getElementById('selectReviewSchool');
    if (select) select.value = schoolId;
  }
}

// ==========================================
// 8. 機能4：学校見学の振り返りシート（3ステップ）
// ==========================================
const EMOTION_SIX_OPTIONS = [
  { code: 1, text: "すごく楽しそう！ここに通ってみたい！", badge: "強志望" },
  { code: 2, text: "面白かった！また来てみたい！", badge: "前向き" },
  { code: 3, text: "思っていたよりも自分に合いそう！", badge: "高マッチ" },
  { code: 4, text: "思っていた雰囲気と少し違ったかも", badge: "違和感" },
  { code: 5, text: "自分には合わない・疲れちゃったかも", badge: "ストレス" },
  { code: 6, text: "まだよく分からない・他の学校も見てみたい", badge: "保留" }
];

let selectedEmotionCode = 1;
let selectedHighlightCategories = [];

function renderReviewSchoolSelect() {
  const select = document.getElementById('selectReviewSchool');
  if (!select) return;
  select.innerHTML = '';

  SCHOOL_DATABASE.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.school_id;
    opt.textContent = `${s.name} (${s.station_name})`;
    select.appendChild(opt);
  });
}

function renderEmotionSixGrid() {
  const container = document.getElementById('emotionSixGrid');
  if (!container) return;
  container.innerHTML = '';

  EMOTION_SIX_OPTIONS.forEach(opt => {
    const isActive = selectedEmotionCode === opt.code;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `emotion-card-btn ${isActive ? 'active' : ''}`;
    btn.onclick = () => {
      selectedEmotionCode = opt.code;
      renderEmotionSixGrid();
    };

    btn.innerHTML = `
      <span class="emotion-index">${opt.code}</span>
      <span class="emotion-label">${opt.text}</span>
    `;
    container.appendChild(btn);
  });
}

function renderAccordionHighlights() {
  const container = document.getElementById('accordionHighlightsList');
  if (!container) return;
  container.innerHTML = '';

  const highlightDefs = [
    { key: "facilities", title: "建物や教室・グラウンドなどの設備", prompt: "どの教室や道具がすごかった？" },
    { key: "students", title: "生徒（先輩たち）の様子や笑顔", prompt: "どんな姿がかっこよかった？" },
    { key: "teachers", title: "先生の話し方や優しさ", prompt: "どんな先生がいた？" },
    { key: "clubs", title: "部活動の体験や見学", prompt: "何の部活を見た？" },
    { key: "events", title: "文化祭や授業などのイベント・展示", prompt: "何が一番面白かった？" },
    { key: "cafeteria_facilities", title: "カフェテリア（学食）や交流ラウンジ", prompt: "何を食べた？どんな場所だった？" }
  ];

  highlightDefs.forEach(item => {
    const isChecked = selectedHighlightCategories.includes(item.key);
    const card = document.createElement('div');
    card.className = 'acc-hl-card';

    card.innerHTML = `
      <label class="acc-hl-header">
        <input type="checkbox" value="${item.key}" ${isChecked ? 'checked' : ''} onchange="toggleHighlightCategory('${item.key}', this)">
        <span>${item.title}</span>
      </label>
      <div class="acc-hl-accordion-body ${isChecked ? 'open' : ''}" id="acc_body_${item.key}">
        <input type="text" id="acc_input_${item.key}" class="input-field child-select" style="font-size:14px; min-height:42px;" placeholder="記述例：「${item.prompt}」">
      </div>
    `;
    container.appendChild(card);
  });

  document.getElementById('highlightCounterNotice').textContent = `選択中: ${selectedHighlightCategories.length} / 3`;
}

function toggleHighlightCategory(key, chkEl) {
  const idx = selectedHighlightCategories.indexOf(key);
  if (chkEl.checked) {
    if (selectedHighlightCategories.length >= 3) {
      alert("「おっ！」と思ったポイントは最大3つまで選択できます。");
      chkEl.checked = false;
      return;
    }
    selectedHighlightCategories.push(key);
  } else {
    if (idx >= 0) selectedHighlightCategories.splice(idx, 1);
  }
  renderAccordionHighlights();
}

// ==========================================
// 8. 機能4：学校見学・イベントの記録（行く前 ⇄ 行った後 連動＆比較）
// ==========================================
let currentReviewStep = 1;
const TOTAL_REVIEW_STEPS = 4;
let currentReviewRating = 5;
let currentReviewSubTab = 'before'; // 'before' | 'after'
let currentReviewWizardMode = 'before'; // 'before' (期待を記録) | 'after' (振り返りを記録)

// 学校紹介等で「行ってみる」ボタンを押したときの処理
function addEventToVisitSchedule(schoolId, eventId, btnEl) {
  const school = SCHOOL_DATABASE.find(s => s.school_id === schoolId);
  if (!school) return;
  const event = (school.events || []).find(e => e.id === eventId) || {
    id: eventId || 'ev_' + Date.now(),
    title: `${school.name} 見学・説明会`,
    type: '学校見学',
    date: '近日開催',
    desc: '学校の雰囲気を実際に体験できます。'
  };

  if (!AppSchema.visit_plans) AppSchema.visit_plans = [];

  // すでに登録済みかチェック
  const exists = AppSchema.visit_plans.some(p => p.school_id === schoolId && p.event_id === event.id);
  if (exists) {
    alert(`「${event.title}」はすでに「見学の記録（行く前）」に入っています！\n下の「記録」タブから確認できます。`);
    return;
  }

  const newPlan = {
    plan_id: "plan_" + Date.now(),
    school_id: school.school_id,
    school_name: school.name,
    event_id: event.id,
    event_title: event.title,
    event_type: event.type,
    event_date: event.date,
    event_desc: event.desc,
    status: "before", // 'before' (行く前) or 'after' (行った後)
    before_record: null, // 行く前の期待記録
    reviewed_at: null,
    rating: null,
    review_data: null
  };

  AppSchema.visit_plans.unshift(newPlan);
  saveAppStateToLocalStorage();

  if (btnEl) {
    btnEl.innerHTML = '✓ 記録に追加済み';
    btnEl.classList.add('added');
  }

  alert(`「${event.title}」を見学の記録に追加しました！\n下の「記録」タブから「✦ 期待を記録」できます。`);
  renderReviewView();
}

// 記録画面のサブタブ切り替え（1画面統合に伴い互換維持）
function switchReviewSubTab(tab) {
  currentReviewSubTab = tab;
  renderReviewView();
}

// 記録画面の全体描画
function renderReviewView() {
  const isChild = currentUserMode === 'child';
  const childDashboard = document.getElementById('reviewDashboardView');
  const parentDashboard = document.getElementById('parentReviewDashboardView');
  const childWizard = document.getElementById('reviewWizardCard');
  const parentEditor = document.getElementById('parentReviewEditorCard');

  if (isChild) {
    if (parentDashboard) parentDashboard.style.display = 'none';
    if (parentEditor) parentEditor.style.display = 'none';
    if (childDashboard) childDashboard.style.display = 'block';
    renderPlannedEventsList();
    renderSavedReviewCards();
    updateReviewBadges();
  } else {
    if (childDashboard) childDashboard.style.display = 'none';
    if (childWizard) childWizard.style.display = 'none';
    if (parentDashboard) parentDashboard.style.display = 'block';
    if (parentEditor) parentEditor.style.display = 'none';
    renderParentVisitPlansList();
  }
}

// 保護者用：子供が追加した学校イベント一覧の描画（自動同期）
function renderParentVisitPlansList() {
  const container = document.getElementById('parentVisitPlansListContainer');
  if (!container) return;
  container.innerHTML = '';

  const plans = AppSchema.visit_plans || [];

  if (plans.length === 0) {
    container.innerHTML = `
      <div class="empty-planned-box" style="background: var(--koko-card-bg); border: 2px dashed var(--koko-dark);">
        <p class="empty-title" style="color: var(--koko-dark);">まだお子さまの見学予定がありません</p>
        <p class="empty-desc" style="color: var(--koko-text-muted);">
          お子さまが気になる学校の<strong>「✦ 行ってみる」</strong>を押すと、<br>
          ここに予定が自動的に共有され、保護者の方の記録をつけることができます。
        </p>
      </div>
    `;
    return;
  }

  plans.forEach(plan => {
    const card = document.createElement('div');
    card.className = 'planned-event-item-card parent-plan-item-card';

    // 子供の記録状況
    let childStatusHtml = '';
    if (plan.before_record) {
      childStatusHtml += `
        <div class="child-status-badge-row" style="background:#FFF9E6; border:1.5px solid #FFE600; padding:6px 10px; border-radius:8px; font-size:12px; margin-bottom:8px; color:#1B2028;">
          <strong style="color: #D97706;">👦 お子さまの期待：</strong>
          「${plan.before_record.emotion}」
          <span style="color:#666; font-size:11px; margin-left:6px;">（気になる：${plan.before_record.place || '施設・設備'}）</span>
        </div>
      `;
    }
    if (plan.review_data) {
      childStatusHtml += `
        <div class="child-status-badge-row" style="background:#EDFDF8; border:1.5px solid #3DD9A5; padding:6px 10px; border-radius:8px; font-size:12px; margin-bottom:8px; color:#1B2028;">
          <strong style="color: #0E7C5A;">👦 お子さまの参加後感想：</strong>
          「${plan.review_data.emotion}」
          <span style="color:#666; font-size:11px; margin-left:6px;">（印象的：${plan.review_data.place || '施設・設備'}）</span>
        </div>
      `;
    }

    // 保護者の記録状況
    const hasParentReview = !!plan.parent_review;
    const parentRecordBoxHtml = hasParentReview
      ? `
        <div class="parent-review-recorded-box" style="background: #F4F0FF; border: 1.5px solid #7B61FF; border-radius: 8px; padding: 10px 12px; margin-top: 10px;">
          <div style="font-size: 11px; font-weight: bold; color: #7B61FF; margin-bottom: 4px;">✦ 保護者の記録済み</div>
          <div style="font-size: 13px; font-weight: bold; color: var(--koko-dark); margin-bottom: 4px;">
            一番気になった点：<span style="color: #4C2FB7;">${plan.parent_review.place}</span>
          </div>
          ${plan.parent_review.memo ? `
            <div style="font-size: 12px; color: var(--koko-dark); background: #FFF; padding: 8px; border-radius: 6px; border: 1px solid #D6BBFB; white-space: pre-wrap;">
              ${plan.parent_review.memo}
            </div>
          ` : ''}
        </div>
      `
      : `
        <div style="font-size: 12px; color: var(--koko-text-muted); background: #F8F9FA; padding: 8px 12px; border-radius: 6px; border: 1px dashed #D0D5DD; margin-top: 8px;">
          保護者の感想・メモはまだありません
        </div>
      `;

    card.innerHTML = `
      <div class="planned-item-header">
        <div class="planned-school-row">
          <span class="planned-school-badge">${plan.school_name}</span>
          <span class="planned-type-badge">${plan.event_type}</span>
          <span class="planned-date-badge">${plan.event_date}</span>
        </div>
      </div>
      <h4 class="planned-item-title" style="margin: 6px 0 4px 0;">${plan.event_title}</h4>
      <p class="planned-item-desc" style="font-size: 12px; color: var(--koko-text-muted); margin-bottom: 8px;">${plan.event_desc || '見学イベントに参加予定'}</p>

      ${childStatusHtml}
      ${parentRecordBoxHtml}

      <div class="planned-item-actions" style="margin-top: 12px;">
        <button type="button" class="btn-solid-parent btn-sm" onclick="openParentReviewEditor('${plan.plan_id}')">
          ${hasParentReview ? '✎ 保護者の記録を編集' : '✎ 保護者のメモを書く'}
        </button>
        <button type="button" class="btn-delete-plan-text" onclick="removePlannedEvent('${plan.plan_id}')">
          ✕ 予定から外す
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// 保護者用エディタを開く
let currentParentEditPlanId = null;

function openParentReviewEditor(planId) {
  const plan = (AppSchema.visit_plans || []).find(p => p.plan_id === planId);
  if (!plan) return;
  currentParentEditPlanId = planId;

  // 質問の時は一覧を非表示にして、質問画面だけを表示する
  const parentDash = document.getElementById('parentReviewDashboardView');
  if (parentDash) parentDash.style.display = 'none';

  const editorCard = document.getElementById('parentReviewEditorCard');
  if (editorCard) editorCard.style.display = 'block';

  const titleEl = document.getElementById('parentEditorTitle');
  if (titleEl) {
    titleEl.textContent = `【保護者の記録】${plan.school_name}（${plan.event_title}）`;
  }

  // 既存データがあれば反映、なければ初期状態
  const existing = plan.parent_review;
  const memoEl = document.getElementById('parentEditorFreeMemo');
  if (memoEl) {
    memoEl.value = existing?.memo || '';
  }

  const placeRadios = document.querySelectorAll('input[name="parentReviewPlace"]');
  if (placeRadios.length > 0) {
    let matched = false;
    placeRadios.forEach(r => {
      if (existing && r.value === existing.place) {
        r.checked = true;
        matched = true;
      }
    });
    if (!matched) {
      placeRadios[0].checked = true;
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 保護者用エディタを閉じる
function closeParentReviewEditor() {
  currentParentEditPlanId = null;
  const editorCard = document.getElementById('parentReviewEditorCard');
  if (editorCard) editorCard.style.display = 'none';

  const parentDash = document.getElementById('parentReviewDashboardView');
  if (parentDash) parentDash.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 保護者の記録を保存
function saveParentReviewRecord() {
  if (!currentParentEditPlanId) return;
  const plan = (AppSchema.visit_plans || []).find(p => p.plan_id === currentParentEditPlanId);
  if (!plan) return;

  const placeRadio = document.querySelector('input[name="parentReviewPlace"]:checked');
  const selectedPlace = placeRadio ? placeRadio.value : '図書室や自習室などのべんきょうスペース';
  const memo = (document.getElementById('parentEditorFreeMemo')?.value || '').trim();

  plan.parent_review = {
    place: selectedPlace,
    memo: memo,
    updated_at: new Date().toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric', weekday: 'short' })
  };

  showToast(`保護者の記録を保存しました！`);
  closeParentReviewEditor();
  renderReviewView();
}

// サブタブのバッジ件数更新
function updateReviewBadges() {
  const plans = AppSchema.visit_plans || [];
  const beforeCount = plans.filter(p => p.status === 'before').length;
  const afterCount = plans.filter(p => p.status === 'after').length + (AppSchema.user_reviews || []).length;

  const b1 = document.getElementById('badgePlannedEventsCount');
  const b2 = document.getElementById('badgeReviewedEventsCount');
  if (b1) b1.textContent = beforeCount;
  if (b2) b2.textContent = afterCount;
}

// 「行く前（これから行く予定）」リストの描画
function renderPlannedEventsList() {
  const container = document.getElementById('plannedEventsListContainer');
  if (!container) return;
  container.innerHTML = '';

  const plans = (AppSchema.visit_plans || []).filter(p => p.status === 'before');

  if (plans.length === 0) {
    container.innerHTML = `
      <div class="empty-planned-box">
        <p class="empty-title">まだ行く予定のイベントがありません</p>
        <p class="empty-desc">
          学校の紹介や「探す」画面にある<strong>「✦ 行ってみる」</strong>ボタンを押すと、<br>
          ここに予定が自動的にメモされます！
        </p>
        <button type="button" class="btn-solid-child btn-sm" onclick="switchAppView('search')">
          学校を探してイベントを見つける
        </button>
      </div>
    `;
    return;
  }

  plans.forEach(plan => {
    const card = document.createElement('div');
    card.className = 'planned-event-item-card';

    const hasBeforeRecord = !!plan.before_record;
    const beforeBadgeHtml = hasBeforeRecord
      ? `<div style="background:#FFF9E6; border:1px solid #FFE600; padding:4px 8px; border-radius:6px; font-size:11px; font-weight:700; margin-bottom:8px; color:#1B2028;">
           ✦ 期待を記録済み：<span style="color:#D97706;">「${plan.before_record.emotion}」</span>
         </div>`
      : '';

    const actionButtonHtml = hasBeforeRecord
      ? `<button type="button" class="btn-solid-child btn-sm" onclick="startReviewForPlannedEvent('${plan.plan_id}', 'after')">
           ✦ 行ってきた！振り返りを記録
         </button>
         <button type="button" class="btn-outline-child btn-sm" onclick="startReviewForPlannedEvent('${plan.plan_id}', 'before')" style="font-size:11px; padding:4px 8px;">
           ✎ 期待を再編集
         </button>`
      : `<button type="button" class="btn-solid-child btn-sm" onclick="startReviewForPlannedEvent('${plan.plan_id}', 'before')">
           ✦ 期待を記録
         </button>`;

    card.innerHTML = `
      <div class="planned-item-header">
        <div class="planned-school-row">
          <span class="planned-school-badge">${plan.school_name}</span>
          <span class="planned-type-badge">${plan.event_type}</span>
          <span class="planned-date-badge">${plan.event_date}</span>
        </div>
      </div>
      <h4 class="planned-item-title">${plan.event_title}</h4>
      <p class="planned-item-desc">${plan.event_desc || '学校説明会・見学会に参加予定'}</p>
      
      ${beforeBadgeHtml}

      <div class="planned-item-actions">
        ${actionButtonHtml}
        <button type="button" class="btn-delete-plan-text" onclick="removePlannedEvent('${plan.plan_id}')">
          ✕ 予定から外す
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// 予定から振り返りウィザードを起動（'before'：期待を記録 | 'after'：振り返りを記録）
function startReviewForPlannedEvent(planId, mode = 'before') {
  const plan = (AppSchema.visit_plans || []).find(p => p.plan_id === planId);
  if (!plan) return;

  currentReviewPlanId = planId;
  currentReviewWizardMode = mode;

  // 質問の時は一覧を非表示にして、質問だけを表示する
  const dashboard = document.getElementById('reviewDashboardView');
  if (dashboard) dashboard.style.display = 'none';

  const wizardCard = document.getElementById('reviewWizardCard');
  if (wizardCard) {
    wizardCard.style.display = 'block';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });

  setupReviewWizardUI(mode, plan);
}

// 直接新しい見学を記録するウィザード起動（'after' モード）
function startDirectReviewWizard() {
  currentReviewPlanId = null;
  currentReviewWizardMode = 'after';

  // 質問の時は一覧を非表示にして、質問だけを表示する
  const dashboard = document.getElementById('reviewDashboardView');
  if (dashboard) dashboard.style.display = 'none';

  const wizardCard = document.getElementById('reviewWizardCard');
  if (wizardCard) {
    wizardCard.style.display = 'block';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });

  setupReviewWizardUI('after', null);
}

// ウィザードを閉じる（質問画面を隠して一覧画面を再表示）
function closeReviewWizard() {
  const wizardCard = document.getElementById('reviewWizardCard');
  if (wizardCard) {
    wizardCard.style.display = 'none';
  }
  const dashboard = document.getElementById('reviewDashboardView');
  if (dashboard) {
    dashboard.style.display = 'block';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 予定を削除
function removePlannedEvent(planId) {
  if (!confirm("このイベントの予定を見学記録から外しますか？")) return;
  AppSchema.visit_plans = (AppSchema.visit_plans || []).filter(p => p.plan_id !== planId);
  saveAppStateToLocalStorage();
  renderReviewView();
}

// ウィザードのUI・選択肢のセットアップ（行く前・行った後で切り替え）
function setupReviewWizardUI(mode, targetPlan = null) {
  currentReviewStep = 1;
  updateReviewProgressIndicator(1);

  // ウィザードタイトルの設定
  const titleEl = document.getElementById('reviewWizardTargetTitle');
  if (titleEl) {
    if (mode === 'before') {
      titleEl.textContent = targetPlan
        ? `【行く前】${targetPlan.school_name} への期待を記録しよう！`
        : "【行く前】イベントへの期待を記録しよう！";
    } else {
      titleEl.textContent = targetPlan
        ? `【行った後】${targetPlan.school_name} の見学振り返り！`
        : "【行った後】見学の振り返りを記録しよう！";
    }
  }

  // スライド1：学校とイベントの設定
  const title1 = document.getElementById('rSlideTitle1');
  const desc1 = document.getElementById('rSlideDesc1');
  if (title1 && desc1) {
    if (mode === 'before') {
      title1.textContent = "見学に行く学校とイベント";
      desc1.textContent = "これから行く学校とイベントを確認してください。";
    } else {
      title1.textContent = "見学に行った学校とイベント";
      desc1.textContent = "今日見学した学校とイベントを確認してください。";
    }
  }

  const select = document.getElementById('reviewInputSchool');
  if (select) {
    select.innerHTML = '';
    SCHOOL_DATABASE.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.school_id;
      opt.textContent = `${s.name} (${s.prefecture}・${s.station_name})`;
      if (targetPlan && targetPlan.school_id === s.school_id) {
        opt.selected = true;
      }
      select.appendChild(opt);
    });
  }

  if (targetPlan && targetPlan.event_type) {
    const radio = document.querySelector(`input[name="reviewEventType"][value*="${targetPlan.event_type}"]`);
    if (radio) radio.checked = true;
  }

  // スライド2：今の感情（設問＆選択肢）
  const title2 = document.getElementById('rSlideTitle2');
  const desc2 = document.getElementById('rSlideDesc2');
  const emotionContainer = document.getElementById('reviewEmotionChoiceContainer');
  if (title2 && desc2 && emotionContainer) {
    if (mode === 'before') {
      title2.textContent = "今の気持ちは？";
      desc2.textContent = "イベントに行く前の気持ちをえらんでね。";

      const beforeEmotions = [
        { label: "かなり楽しみ", sub: "早く行ってみて体験したい！" },
        { label: "ちょっと楽しみ", sub: "どんな学校か見てみたい" },
        { label: "ちょっと気になる", sub: "気になる部活や授業がある" },
        { label: "まだよくわからない", sub: "行ってみてから考えたい" },
        { label: "あまり興味ない", sub: "親に言われて行く感じ" }
      ];

      emotionContainer.innerHTML = beforeEmotions.map((item, idx) => `
        <label class="big-tile-checkbox review-tile">
          <input type="radio" name="reviewEmotionChoice" value="${item.label}" ${idx === 0 ? 'checked' : ''} onchange="toggleCustomEmotionInput(false)">
          <span class="tile-title">${item.label}</span>
          <span class="tile-sub">${item.sub}</span>
        </label>
      `).join('') + `
        <label class="big-tile-checkbox review-tile">
          <input type="radio" name="reviewEmotionChoice" value="custom" onchange="toggleCustomEmotionInput(true)">
          <span class="tile-title">じぶんの言葉で書く（自由記述）</span>
          <span class="tile-sub">今の気持ちを自由に書いてね</span>
        </label>
        <div id="reviewCustomEmotionWrap" class="child-custom-input-box" style="display: none;">
          <input type="text" id="reviewCustomEmotionInput" class="child-text-field" placeholder="例「食堂のごはんが楽しみ」「少し緊張する」など">
        </div>
      `;
    } else {
      title2.textContent = "実際に行ってみて、今はどう思う？";
      desc2.textContent = "見学したあとの今の気持ちをえらんでね。";

      const afterEmotions = [
        { label: "もっといきたくなった！", sub: "ここが第一志望になりそう！" },
        { label: "いきたい気持ちが強くなった！", sub: "思っていたよりずっと良かった" },
        { label: "前とあまり変わらない", sub: "イメージ通りだった" },
        { label: "少し迷う", sub: "良いところと気になるところ両方ある" },
        { label: "思っていたのと少し違った", sub: "じぶんには合わないかも" }
      ];

      emotionContainer.innerHTML = afterEmotions.map((item, idx) => `
        <label class="big-tile-checkbox review-tile">
          <input type="radio" name="reviewEmotionChoice" value="${item.label}" ${idx === 0 ? 'checked' : ''} onchange="toggleCustomEmotionInput(false)">
          <span class="tile-title">${item.label}</span>
          <span class="tile-sub">${item.sub}</span>
        </label>
      `).join('') + `
        <label class="big-tile-checkbox review-tile">
          <input type="radio" name="reviewEmotionChoice" value="custom" onchange="toggleCustomEmotionInput(true)">
          <span class="tile-title">じぶんの言葉で書く（自由記述）</span>
          <span class="tile-sub">行ってみた実感を自由に書いてね</span>
        </label>
        <div id="reviewCustomEmotionWrap" class="child-custom-input-box" style="display: none;">
          <input type="text" id="reviewCustomEmotionInput" class="child-text-field" placeholder="例「先輩がカッコよかった」「通学が少し大変そう」など">
        </div>
      `;
    }
  }

  // スライド3：見たいところ ➡️ 印象に残ったところ（設問＆選択肢）
  const title3 = document.getElementById('rSlideTitle3');
  const desc3 = document.getElementById('rSlideDesc3');
  const placeContainer = document.getElementById('reviewPlaceChoiceContainer');
  if (title3 && desc3 && placeContainer) {
    if (mode === 'before') {
      title3.textContent = "学校のどんなところを見てみたい？（気になるところ）";
      desc3.textContent = "当日、とくにチェックしてみたい場所やポイントをえらんでね。";

      const beforePlaces = [
        { label: "図書室や自習室などのべんきょうスペース", sub: "本がたくさんあって落ち着けるか" },
        { label: "理科室やパソコン室などのおもしろい実験設備", sub: "3Dプリンタや本格的な道具があるか" },
        { label: "広い校庭・体育館などの運動設備", sub: "思いっきり身体を動かせる環境か" },
        { label: "先輩たちの部活動や文化祭の出し物・展示", sub: "どんな先輩たちが活動しているか" },
        { label: "きれいなカフェテリア（食堂）や中庭", sub: "お昼や休み時間が楽しそうか" },
        { label: "先生や先輩たちがどんな雰囲気か", sub: "やさしく話しかけてくれるか" }
      ];

      placeContainer.innerHTML = beforePlaces.map((item, idx) => `
        <label class="big-tile-checkbox review-tile">
          <input type="radio" name="reviewPlaceChoice" value="${item.label}" ${idx === 0 ? 'checked' : ''}>
          <span class="tile-title">${item.label}</span>
          <span class="tile-sub">${item.sub}</span>
        </label>
      `).join('');
    } else {
      title3.textContent = "実際に見たり体験して、どこが印象に残った？（心にのこったところ）";
      desc3.textContent = "今日見て一番心にのこった場所やポイントをえらんでね。";

      const afterPlaces = [
        { label: "本がたくさんある図書室や自習スペース", sub: "静かで居心地がとても良かった" },
        { label: "わくわくする理科実験室や専門教室", sub: "設備がすごくて実験が楽しそうだった" },
        { label: "ひろびろとしたグラウンドや体育館", sub: "設備がきれいで運動したくなった" },
        { label: "先輩たちの発表や展示・部活動の様子", sub: "楽しそうでイキイキしていた" },
        { label: "明るくて楽しそうなカフェテリアや中庭", sub: "開放的で過ごしやすそうだった" },
        { label: "先生や先輩たちのやさしい対応や笑顔", sub: "とても親切に案内してくれた" }
      ];

      placeContainer.innerHTML = afterPlaces.map((item, idx) => `
        <label class="big-tile-checkbox review-tile">
          <input type="radio" name="reviewPlaceChoice" value="${item.label}" ${idx === 0 ? 'checked' : ''}>
          <span class="tile-title">${item.label}</span>
          <span class="tile-sub">${item.sub}</span>
        </label>
      `).join('');
    }
  }

  // スライド4：星評価と自由記述メモ
  const title4 = document.getElementById('rSlideTitle4');
  const desc4 = document.getElementById('rSlideDesc4');
  const ratingLabel = document.getElementById('reviewRatingFieldLabel');
  const memoLabel = document.getElementById('reviewFreeMemoFieldLabel');
  const memoInput = document.getElementById('reviewFreeMemoInput');
  const submitBtn = document.getElementById('btnSubmitReviewWizard');

  if (title4 && desc4 && ratingLabel && memoLabel && memoInput && submitBtn) {
    if (mode === 'before') {
      title4.textContent = "行く前の期待度とひとことメモ";
      desc4.textContent = "楽しみな気持ちや質問したいことを残しておこう。";
      ratingLabel.textContent = "行く前のワクワク度：";
      memoLabel.textContent = "行く前に楽しみなことや、聞いてみたいこと（自由記述・書いても書かなくてもOK）：";
      memoInput.placeholder = "例「ロボット部があるか見てみたい」「食堂の人気メニューを食べてみたい」など";
      submitBtn.textContent = "✦ 期待を記録する";
    } else {
      title4.textContent = "この学校の「ここがいい！」度とひとことメモ";
      desc4.textContent = "見学して感じたことを家族へのメッセージとして残せます。";
      ratingLabel.textContent = "この学校の「ここがいい！」度：";
      memoLabel.textContent = "見学して感じたことや、家族に伝えたいこと（自由記述・書いても書かなくてもOK）：";
      memoInput.placeholder = "例「先輩たちがとても優しく案内してくれた」「実験が思っていたより本格的だった」など";
      submitBtn.textContent = "✦ 振り返りを保存する";
    }
    memoInput.value = '';
  }

  // スライド1を表示、他を非表示
  for (let i = 1; i <= TOTAL_REVIEW_STEPS; i++) {
    const slide = document.getElementById(`rSlide${i}`);
    if (slide) {
      if (i === 1) {
        slide.style.display = 'block';
        slide.classList.add('active');
        slide.classList.remove('slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
      } else {
        slide.style.display = 'none';
        slide.classList.remove('active', 'slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
      }
    }
  }

  setReviewRating(5);
}

function toggleCustomEmotionInput(isCustom) {
  const wrap = document.getElementById('reviewCustomEmotionWrap');
  if (wrap) {
    wrap.style.display = isCustom ? 'block' : 'none';
    if (isCustom) {
      const inp = document.getElementById('reviewCustomEmotionInput');
      if (inp) inp.focus();
    }
  }
}

// 記録画面の初期化（一覧画面を表示）
function initReviewWizard() {
  closeReviewWizard();
  renderReviewView();
}

function updateReviewProgressIndicator(step) {
  const textEl = document.getElementById('reviewStepCounterText');
  if (textEl) {
    textEl.textContent = `質問 ${step} / ${TOTAL_REVIEW_STEPS} 問`;
  }
  const barEl = document.getElementById('reviewProgressBarFill');
  if (barEl) {
    const pct = Math.round((step / TOTAL_REVIEW_STEPS) * 100);
    barEl.style.width = `${pct}%`;
  }
}

function nextReviewSlide(nextStep) {
  if (isAnimating) return;
  slideQuestionStep(`rSlide${currentReviewStep}`, `rSlide${nextStep}`, 'next', () => {
    currentReviewStep = nextStep;
    updateReviewProgressIndicator(nextStep);
  });
}

function prevReviewSlide(prevStep) {
  if (isAnimating) return;
  slideQuestionStep(`rSlide${currentReviewStep}`, `rSlide${prevStep}`, 'prev', () => {
    currentReviewStep = prevStep;
    updateReviewProgressIndicator(prevStep);
  });
}

function setReviewRating(rating) {
  currentReviewRating = rating;

  const labelEl = document.getElementById('starRatingLabelText');
  if (labelEl) labelEl.textContent = "";

  document.querySelectorAll('#reviewStarRatingRow .star-btn').forEach(btn => {
    const r = parseInt(btn.getAttribute('data-rating'), 10);
    if (r <= rating) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// 記録ウィザードの保存処理（行く前・行った後で分岐保存）
function saveReviewWizardRecord() {
  const schoolId = document.getElementById('reviewInputSchool').value;
  const school = SCHOOL_DATABASE.find(s => s.school_id === schoolId) || SCHOOL_DATABASE[0];

  const eventTypeEl = document.querySelector('input[name="reviewEventType"]:checked');
  const eventType = eventTypeEl ? eventTypeEl.value : "学校見学";

  // 感情値の取得（自由記述含む）
  const emotionRadio = document.querySelector('input[name="reviewEmotionChoice"]:checked');
  let emotionVal = emotionRadio ? emotionRadio.value : "楽しみ";
  if (emotionVal === 'custom') {
    const customInp = (document.getElementById('reviewCustomEmotionInput')?.value || '').trim();
    emotionVal = customInp || "じぶんの気持ち";
  }

  // 場所・ポイントの取得
  const placeRadio = document.querySelector('input[name="reviewPlaceChoice"]:checked');
  const placeVal = placeRadio ? placeRadio.value : "施設・設備";

  // 自由記述メモ
  const memo = (document.getElementById('reviewFreeMemoInput').value || "").trim();

  const currentDateStr = new Date().toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric', weekday: 'short' });

  // A. 行く前（期待の記録）の場合
  if (currentReviewWizardMode === 'before') {
    const beforeData = {
      date: currentDateStr,
      emotion: emotionVal,
      place: placeVal,
      rating: currentReviewRating,
      memo: memo || `${eventType}が楽しみ！${placeVal}を見てみたい。`
    };

    if (currentReviewPlanId) {
      const target = (AppSchema.visit_plans || []).find(p => p.plan_id === currentReviewPlanId);
      if (target) {
        target.before_record = beforeData;
      }
    } else {
      if (!AppSchema.visit_plans) AppSchema.visit_plans = [];
      AppSchema.visit_plans.unshift({
        plan_id: "plan_" + Date.now(),
        school_id: school.school_id,
        school_name: school.name,
        event_id: "ev_" + Date.now(),
        event_title: `${school.name} ${eventType}`,
        event_type: eventType,
        event_date: "近日開催",
        event_desc: memo,
        status: "before",
        before_record: beforeData,
        reviewed_at: null,
        rating: null,
        review_data: null
      });
    }

    saveAppStateToLocalStorage();
    alert(`「${school.name}」への期待を記録しました！\nイベントに参加した後は「✦ 行ってきた！振り返りを記録」から気持ちの変化を比べてみましょう。`);

    closeReviewWizard();
    renderReviewView();
    return;
  }

  // B. 行った後（見学の振り返り記録）の場合
  let beforeRecord = null;
  if (currentReviewPlanId) {
    const target = (AppSchema.visit_plans || []).find(p => p.plan_id === currentReviewPlanId);
    if (target) {
      beforeRecord = target.before_record || null;
      target.status = 'after';
      target.reviewed_at = new Date().toISOString();
      target.rating = currentReviewRating;
      target.review_data = {
        id: "rev_" + Date.now(),
        school_name: school.name,
        school_id: school.school_id,
        date: currentDateStr,
        event_type: eventType,
        emotion: emotionVal,
        place: placeVal,
        rating: currentReviewRating,
        memo: memo || `${eventType}に参加。${placeVal}が印象に残った！`,
        before_record: beforeRecord
      };
    }
  } else {
    // 新規登録
    if (!AppSchema.visit_plans) AppSchema.visit_plans = [];
    const newRev = {
      id: "rev_" + Date.now(),
      school_name: school.name,
      school_id: school.school_id,
      date: currentDateStr,
      event_type: eventType,
      emotion: emotionVal,
      place: placeVal,
      rating: currentReviewRating,
      memo: memo || `${eventType}に参加。${placeVal}が印象に残った！`,
      before_record: null
    };
    AppSchema.visit_plans.unshift({
      plan_id: "plan_" + Date.now(),
      school_id: school.school_id,
      school_name: school.name,
      event_id: "ev_" + Date.now(),
      event_title: `${school.name} ${eventType}`,
      event_type: eventType,
      event_date: currentDateStr,
      event_desc: memo,
      status: "after",
      before_record: null,
      reviewed_at: new Date().toISOString(),
      rating: currentReviewRating,
      review_data: newRev
    });
  }

  saveAppStateToLocalStorage();

  const comparisonMsg = beforeRecord
    ? `\n行く前の気持ち「${beforeRecord.emotion}」と、行った後の気持ち「${emotionVal}」の変化を記録しました！`
    : '';

  alert(`「${school.name}」の見学振り返りを保存しました！${comparisonMsg}\n見学メモ一覧に追加されました。`);

  // ウィザードを閉じて一覧画面を再描画
  document.getElementById('reviewFreeMemoInput').value = '';
  closeReviewWizard();
  renderReviewView();
}

// 行った後の振り返りカード描画（行く前との比較ビフォーアフター表示）
function renderSavedReviewCards() {
  const container = document.getElementById('savedReviewCardsList');
  if (!container) return;
  container.innerHTML = '';

  // 振り返り済みのプランを抽出
  const afterPlans = (AppSchema.visit_plans || []).filter(p => p.status === 'after');

  if (afterPlans.length === 0) {
    container.innerHTML = `
      <div class="empty-reviewed-box">
        <p class="empty-title">まだ見学の振り返り記録がありません</p>
        <p class="empty-desc">
          「行く前」のイベントから「期待を記録」しておくと、<br>
          見学後に気持ちの変化を比較して振り返ることができます。
        </p>
      </div>
    `;
    return;
  }

  afterPlans.forEach(p => {
    const rev = p.review_data || {
      id: p.plan_id,
      school_name: p.school_name,
      date: p.event_date,
      event_type: p.event_type,
      emotion: "とても良かった",
      place: "教室・設備",
      rating: p.rating || 5,
      memo: p.event_desc || "楽しく見学できました。",
      before_record: p.before_record || null
    };

    const card = document.createElement('div');
    card.className = 'saved-review-item-card';
    const stars = "★".repeat(rev.rating || 5) + "☆".repeat(5 - (rev.rating || 5));

    // 行く前と行った後の比較バッジ
    let comparisonHtml = '';
    if (rev.before_record && rev.before_record.emotion) {
      comparisonHtml = `
        <div class="review-comparison-card">
          <div class="review-comparison-title">✦ 気持ちの変化（行く前 ➡️ 行った後）</div>
          <div class="review-comparison-grid">
            <div class="comp-col comp-col-before">
              <span class="comp-label">行く前：期待</span>
              <span class="comp-val">「${rev.before_record.emotion}」</span>
            </div>
            <div class="comp-arrow-divider">➡️</div>
            <div class="comp-col comp-col-after">
              <span class="comp-label">行った後：実感</span>
              <span class="comp-val">「${rev.emotion || '良かった'}」</span>
            </div>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="saved-review-header-row">
        <div class="review-school-name-block">
          <span class="review-date-badge">${rev.date}</span>
          <h4 class="review-school-name">${rev.school_name}</h4>
        </div>
        <div class="review-rating-stars">${stars}</div>
      </div>
      <div class="saved-review-pills-row">
        <span class="r-pill-tag">${rev.event_type}</span>
        ${rev.emotion ? `<span class="r-pill-tag" style="background:#FFF0F3; border-color:#FF8FAB; color:#D63384;">${rev.emotion}</span>` : ''}
        ${rev.place ? `<span class="r-pill-tag">${rev.place}</span>` : ''}
      </div>
      ${comparisonHtml}
      <p class="saved-review-memo-text">${rev.memo}</p>
    `;
    container.appendChild(card);
  });
}

// ==========================================
// 8-2. おうちの方の条件設定サマリー描画（ホーム ＆ マイページ）
// 保護者の設定条件（全10問＋フェーズ2）を子供の質問解答データと同じUIで詳細表示
// ==========================================
function renderParentConditionsSummary() {
  const homeEl = document.getElementById('parentHomeConditionsSummary');
  const mypageEl = document.getElementById('mypageParentConditionsSummary');
  if (homeEl) {
    homeEl.innerHTML = '';
  }
  if (!mypageEl) return;

  const prof = AppSchema.parent_profile || {};
  const cond = prof.conditions || {};

  // 各設定値の日本語変換マップ
  const transportMap = {
    "train": "電車利用",
    "bus": "路線バス利用",
    "school_bus": "スクールバス利用",
    "bicycle": "自転車通学",
    "walk": "徒歩通学のみ"
  };

  const tuitionMap = {
    80: "80万円未満（公立中高一貫校など）",
    100: "100万円未満（私立標準）",
    120: "120万円未満（施設充実校）",
    150: "150万円未満（大学附属・先進校）",
    0: "こだわらない（学費の上限なし）"
  };

  const genderMap = {
    "coed": "共学校のみ",
    "boys": "男子校のみ",
    "girls": "女子校のみ",
    "any": "こだわらない（共学・別学問わず）"
  };

  const categoryMap = {
    "private": "私立中高一貫校",
    "public": "公立中高一貫校",
    "national": "国立大学附属中"
  };

  const religionMap = {
    "none": "無宗教が良い",
    "christian": "キリスト教系OK",
    "buddhist": "仏教系OK",
    "any": "こだわらない（宗教教育の有無問わず）"
  };

  const univPathMap = {
    "attached": "大学附属系（のびのび没頭）",
    "prep": "進学校系（難関大受験指導）",
    "any": "こだわらない（大学附属・進学校問わず）"
  };

  const vibeMap = {
    "free": "自由・自主性",
    "stem": "理数探究",
    "support": "手厚い補習",
    "global": "グローバル英語",
    "manners": "情操礼儀",
    "both": "文武両道"
  };

  // 各条件の値の確実な取得（conditions または プロファイル直下）
  const commuteTimeVal = cond.commute_time_max !== undefined ? cond.commute_time_max : (prof.commute_time || 60);
  const tuitionVal = prof.tuition_cap !== undefined ? prof.tuition_cap : (cond.tuition_max !== undefined ? cond.tuition_max / 10000 : 100);
  const genderVal = prof.gender_type || cond.school_gender_type || 'any';
  const religionVal = prof.religious_pref || cond.religion_policy || 'any';
  const univPathVal = prof.university_path || cond.university_path || 'any';
  const transports = cond.transportation || prof.transport_methods || ['train', 'bicycle', 'walk'];
  const categories = cond.school_category || prof.school_categories || ['private'];
  const vibes = cond.desired_atmospheres || prof.atmosphere_keywords || ['free', 'stem'];

  const addressText = (prof.address || prof.station)
    ? `${prof.address || '東京都'}（最寄り: ${prof.station || '未設定'}）`
    : '未設定';

  const commuteText = commuteTimeVal ? `片道 ${commuteTimeVal} 分以内` : '未設定';
  const tuitionText = tuitionMap[tuitionVal] || (tuitionVal === 0 ? 'こだわらない（学費の上限なし）' : `${tuitionVal}万円未満`);
  const genderText = genderMap[genderVal] || (genderVal === 'any' ? 'こだわらない（共学・別学問わず）' : genderVal);
  const religionText = religionMap[religionVal] || (religionVal === 'any' ? 'こだわらない（宗教教育の有無問わず）' : religionVal);
  const univPathText = univPathMap[univPathVal] || (univPathVal === 'any' ? 'こだわらない（大学附属・進学校問わず）' : univPathVal);

  const strictKeyMap = {
    "commute_time_max": `通学時間上限（${commuteTimeVal}分以内）`,
    "commute_time": `通学時間上限（${commuteTimeVal}分以内）`,
    "tuition_max": `年間学費（${tuitionText}）`,
    "tuition": `年間学費（${tuitionText}）`,
    "school_gender_type": `学校形態（${genderText}）`,
    "gender_type": `学校形態（${genderText}）`,
    "transportation": "通学手段・範囲（自転車・徒歩含む）",
    "school_category": "学校種別",
    "religion_policy": `宗教教育（${religionText}）`,
    "religion": `宗教教育（${religionText}）`,
    "university_path": `希望進学傾向（${univPathText}）`,
    "univ_path": `希望進学傾向（${univPathText}）`
  };

  // チップ生成
  const transportBadges = (transports && transports.length > 0)
    ? transports.map(t => `<span class="ans-chip-tag ans-chip-parent"># ${transportMap[t] || t}</span>`).join(' ')
    : '<span style="color:#888;">未選択</span>';

  const categoryBadges = (categories && categories.length > 0)
    ? categories.map(c => `<span class="ans-chip-tag ans-chip-parent"># ${categoryMap[c] || c}</span>`).join(' ')
    : '<span class="ans-chip-tag ans-chip-parent"># こだわらない（全種別）</span>';

  const vibeBadges = (vibes && vibes.length > 0)
    ? vibes.map(v => `<span class="ans-chip-tag ans-chip-parent"># ${vibeMap[v] || v}</span>`).join(' ')
    : '<span style="color:#888;">未選択</span>';

  const strictFilters = prof.strict_filters || [];
  const strictBadges = (strictFilters && strictFilters.length > 0)
    ? strictFilters.map(k => `<span class="ans-chip-tag ans-chip-strict">🛡 ${strictKeyMap[k] || k}</span>`).join(' ')
    : '<span style="font-size:12px; color:#64748B;">（設定なし：全条件を参考値としてマッチング）</span>';

  mypageEl.innerHTML = `
    <div class="mypage-ans-status-badge">
      <span class="badge-phase" style="background:#E0E7FF; border-color:#000; color:#1E3A8A;">条件設定済み（全10問）</span>
      <span style="font-size:12px; color:#555;">右上の「✎ 条件を編集する」からいつでも再設定できます</span>
    </div>
    <div class="mypage-ans-grid">
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">🏠 ご自宅住所・最寄り駅</span>
        <div class="mypage-ans-value">${addressText}</div>
      </div>
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">⏱ 通学時間の上限</span>
        <div class="mypage-ans-value">${commuteText}</div>
      </div>
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">🚲 許容する通学手段</span>
        <div class="mypage-ans-value">${transportBadges}</div>
      </div>
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">💰 年間学費の上限</span>
        <div class="mypage-ans-value">${tuitionText}</div>
      </div>
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">🏫 希望する学校形態</span>
        <div class="mypage-ans-value">${genderText}</div>
      </div>
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">🏛 希望する学校種別</span>
        <div class="mypage-ans-value">${categoryBadges}</div>
      </div>
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">⛪ 宗教教育のご希望</span>
        <div class="mypage-ans-value">${religionText}</div>
      </div>
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">🎓 希望する進学傾向</span>
        <div class="mypage-ans-value">${univPathText}</div>
      </div>
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">🌿 求める校風・教育方針</span>
        <div class="mypage-ans-value">${vibeBadges}</div>
      </div>
      <div class="mypage-ans-item" style="border: 2px solid #FCA5A5; background: #FFF5F5;">
        <span class="mypage-ans-label" style="color: #B91C1C; font-weight: 800;">🛡 【絶対に譲れない条件（足切り条件）】</span>
        <div class="mypage-ans-value">${strictBadges}</div>
        <p style="font-size: 11px; color: #DC2626; margin: 4px 0 0 0; font-weight: 600;">
          ※ ここで指定された条件を満たさない学校は、提案候補から除外されます。
        </p>
      </div>
    </div>
  `;
}

// ==========================================
// 9. マイページ：プロフィールヘッダー ＆ アイコン編集 ＆ アカウント
// ==========================================
function updateHouseholdIdDisplays() {
  const inputUrlEl = document.getElementById('inputGeneratedUrl');
  if (inputUrlEl) {
    inputUrlEl.value = `https://kokogaii.app/?child_access=koko_child_direct`;
  }
}

function renderMypageProfileHeader() {
  const isParent = currentUserMode === 'parent';
  const avatarEl = document.getElementById('mypageAvatarIcon');
  const nameEl = document.getElementById('mypageUserNameDisplay');
  const roleBadgeEl = document.getElementById('mypageUserRoleBadge');

  const avatar = isParent ? (AppSchema.parent_avatar || "👤") : (AppSchema.child_avatar || "👦");
  const name = isParent ? (AppSchema.parent_name || "いろはさん") : (AppSchema.child_name || "いろは");
  const roleText = isParent ? "保護者アカウント" : "お子さまアカウント";

  if (avatarEl) avatarEl.textContent = avatar;
  if (nameEl) nameEl.textContent = name;
  if (roleBadgeEl) {
    roleBadgeEl.textContent = roleText;
    roleBadgeEl.className = isParent ? "badge-role-pill parent-badge" : "badge-role-pill child-badge";
  }
}

const AVATAR_OPTIONS = [
  "👦", "👧", "🧒", "🎒", "🎓", "⭐", "🌸", "🦁", "🐱", "👤", "👩", "👨", "🍀", "☕", "🦉", "🎨"
];

let selectedModalAvatar = "👦";

function openProfileEditModal() {
  const modal = document.getElementById('profileEditModalOverlay');
  if (!modal) return;

  const isParent = currentUserMode === 'parent';
  selectedModalAvatar = isParent ? (AppSchema.parent_avatar || "👤") : (AppSchema.child_avatar || "👦");

  const nameInput = document.getElementById('editProfileNameInput');
  if (nameInput) {
    nameInput.value = isParent ? (AppSchema.parent_name || "いろはさん") : (AppSchema.child_name || "いろは");
  }

  renderAvatarPicker();
  modal.style.display = 'flex';
}

function renderAvatarPicker() {
  const grid = document.getElementById('avatarPickerGrid');
  if (!grid) return;
  grid.innerHTML = '';

  AVATAR_OPTIONS.forEach(emoji => {
    const isSelected = emoji === selectedModalAvatar;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `avatar-picker-btn ${isSelected ? 'selected' : ''}`;
    btn.textContent = emoji;
    btn.onclick = () => {
      selectedModalAvatar = emoji;
      renderAvatarPicker();
    };
    grid.appendChild(btn);
  });
}

function closeProfileEditModal() {
  const modal = document.getElementById('profileEditModalOverlay');
  if (modal) modal.style.display = 'none';
}

function closeProfileEditModalOnBackdrop(e) {
  if (e.target && e.target.id === 'profileEditModalOverlay') {
    closeProfileEditModal();
  }
}

function saveProfileFromModal() {
  const isParent = currentUserMode === 'parent';
  const nameInput = document.getElementById('editProfileNameInput');

  const newName = nameInput ? nameInput.value.trim() : "";

  if (isParent) {
    if (newName) {
      if (newName === "いろは") {
        AppSchema.parent_name = "いろはさん";
      } else {
        AppSchema.parent_name = newName;
      }
    }
    AppSchema.parent_avatar = selectedModalAvatar;
  } else {
    if (newName) AppSchema.child_name = newName;
    AppSchema.child_avatar = selectedModalAvatar;
  }

  renderMypageProfileHeader();
  closeProfileEditModal();
  saveAppStateToLocalStorage();
  alert("プロフィール設定を保存しました！");
}

function initMypageProfile() {
  const isParent = currentUserMode === 'parent';

  // おうちの方の条件設定：親画面のみ表示（子ども画面では非表示）
  const parentCondSection = document.getElementById('mypageParentConditionsSection');
  if (parentCondSection) {
    parentCondSection.style.display = isParent ? 'block' : 'none';
  }

  // いいねした学校、診断データ、アカウントは常時表示（子ども画面ではこの3つのみ表示）
  const favCard = document.getElementById('mypageFavoritesCard');
  if (favCard) favCard.style.display = 'block';

  const childAnswersCard = document.getElementById('mypageChildAnswersCard');
  if (childAnswersCard) childAnswersCard.style.display = 'block';

  const accountSection = document.getElementById('mypageAccountSection');
  if (accountSection) accountSection.style.display = 'block';

  renderMypageProfileHeader();
  updateHouseholdIdDisplays();
  renderParentConditionsSummary();
  renderMypageChildProfile();
}

function handleChildProfileUpdate(event) {
  event.preventDefault();
  const name = document.getElementById('childEditName').value.trim();
  const grade = document.getElementById('childEditGrade').value;

  const selectedInterests = [];
  document.querySelectorAll('input[name="mypageInterest"]:checked').forEach(chk => {
    selectedInterests.push(chk.value);
  });

  AppSchema.child_name = name;
  AppSchema.child_grade = grade;
  AppSchema.child_profile.interests = selectedInterests;

  saveAppStateToLocalStorage();
  renderMypageChildProfile();

  alert(`お子さまの情報（${name}さん・小${grade}）を更新しました！\nホーム画面の提案が再計算されます。`);

  renderHomeInterestAlternativeSchools();
}

function resetAppData() {
  if (confirm("アプリの入力内容を初期状態にリセットしますか？")) {
    localStorage.clear();
    location.reload();
  }
}

// ==========================================
// 9. 機能5：親向けダッシュボード ＆ AIギャップ分析
// ==========================================
function renderParentDashboard() {
  const container = document.getElementById('schoolDashboardContainer');
  if (!container) return;
  container.innerHTML = '';

  if (AppSchema.recommended_schools.length === 0) {
    executeSchoolMatching();
  }

  AppSchema.recommended_schools.forEach(recItem => {
    const s = recItem.school_data;
    const review = AppSchema.visit_reviews.find(r => r.school_id === s.school_id);
    const aiReport = generateAiGapAnalysisJson(s, AppSchema.parent_profile, AppSchema.child_profile, review);

    const card = document.createElement('article');
    card.className = 'dashboard-school-card';

    card.innerHTML = `
      <div class="dash-school-header">
        <div>
          <span class="badge-pass">保護者の絶対条件に合致</span>
          <h3 style="font-size:20px; font-weight:800; color:var(--color-parent-main); margin-top:4px;">${s.name}</h3>
        </div>
        <div style="text-align:right;">
          <span style="font-size:12px; color:var(--color-parent-muted); display:block;">総合マッチ度</span>
          <span style="font-size:22px; font-weight:800; color:var(--color-parent-main);">${recItem.match_score}点</span>
        </div>
      </div>

      <!-- ブロックA：学校基本スペック（客観情報） -->
      <div class="block-a-specs">
        <div class="spec-stat-item">
          <span class="spec-stat-label">ドアtoドア通学時間</span>
          <span class="spec-stat-val">約${s.calculated_commute_time || s.commute_time}分</span>
        </div>
        <div class="spec-stat-item">
          <span class="spec-stat-label">初年度納付金</span>
          <span class="spec-stat-val">${s.tuition / 10000}万円</span>
        </div>
        <div class="spec-stat-item">
          <span class="spec-stat-label">主要偏差値帯</span>
          <span class="spec-stat-val">${s.deviation_score}</span>
        </div>
        <div class="spec-stat-item">
          <span class="spec-stat-label">直近合格実績</span>
          <span style="font-size:13px; font-weight:700; color:var(--color-parent-main); display:block; margin-top:4px;">${s.recent_passed_records}</span>
        </div>
      </div>

      <!-- 具体的な通学アクセス・所要時間案内 -->
      ${s.calculated_route_summary ? `
        <div class="dash-commute-route-detail" style="margin: 10px 0 16px; padding: 10px 14px; background: #EFF6FF; border: 2px solid #93C5FD; border-radius: 8px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px;">
            <strong style="color: #1E40AF; font-size: 13px;">🚉 ご自宅からの具体的な通学ルート・交通手段（${AppSchema.parent_profile.station || '最寄駅'}より）</strong>
            <span style="font-weight: 800; font-size: 12px; color: #1D4ED8; background: #DBEAFE; padding: 2px 8px; border-radius: 4px;">片道 約${s.calculated_commute_time || s.commute_time}分</span>
          </div>
          <p style="margin: 0; font-size: 12px; color: #1E3A8A; line-height: 1.5;">${s.calculated_route_summary}</p>
        </div>
      ` : ''}

      <!-- ブロックB：子供の振り返りシート結果 -->
      <div class="block-b-child-review">
        <div class="block-b-title">お子さまの振り返りシート結果</div>
        ${review ? `
          <div style="font-size:14px; font-weight:700; color:var(--color-child-text); margin-bottom:6px;">
            直感感情: 【${EMOTION_SIX_OPTIONS.find(e => e.code === review.first_impression_code)?.text || ""}】
          </div>
          <div style="font-size:13px; color:var(--color-child-muted); margin-bottom:6px;">
            おっ！と思った点: ${review.impressed_points.map(p => `「${p.comment}」`).join("、 ")}
          </div>
          ${review.free_memo ? `
            <div style="font-size:13px; background:#fff; padding:6px 10px; border-radius:4px; border:1px solid #BFDBFE;">
              本人の自由メモ: 「${review.free_memo}」
            </div>
          ` : ''}
        ` : `
          <div style="font-size:13px; color:var(--color-child-muted);">まだこの学校の見学振り返りシートは入力されていません。</div>
        `}
      </div>

      <!-- ブロックC：AIギャップ分析レポート（LLM生成仕様） -->
      <div class="block-c-ai-report">
        <span class="ai-report-tag">AIギャップ分析レポート（中学受験専門アドバイザー）</span>

        <div class="ai-report-item">
          <strong>見学直後の温度感の総括</strong>
          <p>${aiReport.emotion_summary}</p>
        </div>

        <div class="ai-report-item">
          <strong>見学前後の興味関心の変化や新しい発見</strong>
          <p>${aiReport.interest_gap_analysis}</p>
        </div>

        <div class="ai-report-item">
          <strong>親の希望条件と子供の実感との合致点・乖離点</strong>
          <p>${aiReport.parent_child_alignment}</p>
        </div>

        <div class="conversation-prompts-box">
          <div class="prompts-title">今夜の食卓で聞いてみよう！（ポジティブな実感を自然に引き出す対話例）</div>
          <ul class="prompt-list">
            ${aiReport.conversation_prompts.map(p => `<li>「${p}」</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function generateAiGapAnalysisJson(school, parentProfile, childProfile, review) {
  const interestNames = (childProfile.interests || []).map(id => {
    const found = CHILD_INTEREST_OPTIONS.find(opt => opt.id === id);
    return found ? found.title : id;
  });
  const interestStr = interestNames.length > 0 ? interestNames.join("・") : "理科や工作";

  // 子供の自由記述からの抜粋
  const freeCommentsObj = childProfile.free_comments || {};
  const firstChildQuote = freeCommentsObj.q1 || freeCommentsObj.q2 || freeCommentsObj.step1 || "じぶんで作ったものを友だちに見てもらいたい";

  if (!review) {
    return {
      emotion_summary: "まだ見学前の段階ですが、事前の興味関心および生活希望とのマッチ度は非常に高い状態です。",
      interest_gap_analysis: `お子さまが事前に関心を示した「${interestStr}」について、学校の本格的な設備や探究型の授業スタイルが合致しています。お子さまの言葉「${firstChildQuote}」を実現できる環境が見つかっています。`,
      parent_child_alignment: `通学時間（${school.commute_time}分）や学費など保護者の絶対条件をクリアしており、安全に通学できる安心の環境です。`,
      conversation_prompts: [
        `${school.name}のパンフレットを見て、一番入ってみたい教室ややってみたいことは何かな？`,
        `「${firstChildQuote}」って話してくれたけど、あの学校ならできそうか一緒に調べてみようか？`
      ]
    };
  }

  const isPositive = review.first_impression_code <= 3;
  return {
    emotion_summary: isPositive
      ? "見学直後から非常に前向きな手応えを感じており、通学イメージが具体化しつつあります。"
      : "思っていた雰囲気とのギャップや疲労感を感じており、慎重な違和感の言語化が必要です。",
    interest_gap_analysis: isPositive
      ? `事前の興味であった「${interestStr}」に対し、実際の見学で「${review.impressed_points.map(p=>p.comment).join("、 ")}」を自分の目で確かめたことで、机上のイメージがリアルな憧れへと進化しています。`
      : `事前の期待と実際の環境との間に若干のズレがあった模様です。何が自分に合わないと感じたのかを掘り下げることで、本当に大切にしたい環境軸が明確になります。`,
    parent_child_alignment: `保護者が設定した通学上限（${parentProfile.conditions.commute_time_max}分以内）を完全に満たしており、お子さまの実感とも高いレベルで合致します。学力や偏差値の議論よりも、本人の「安心感」を最優先に対話を進めるのが効果的です。`,
    conversation_prompts: [
      `今日一番「おっ！」と目が止まった${review.impressed_points[0] ? `『${review.impressed_points[0].comment}』` : "教室"}って、どんな風に見えたの？`,
      `もしあの学校の生徒になったら、毎朝どんな気持ちで登校できそうか想像できた？`
    ]
  };
}

function getSolidIconSvg(iconType) {
  const stroke = "currentColor";
  switch (iconType) {
    case "code":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
    case "book":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;
    case "palette":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.7 1.7-1.7h2c3 0 5.5-2.5 5.5-5.5C22 6.5 17.5 2 12 2z"/></svg>`;
    case "trophy":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>`;
    case "leaf":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 21 2c0 4-1.5 5.5-2.1 11.2A7 7 0 0 1 11 20z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>`;
    case "flask":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><path d="M10 2v7.5a2 2 0 0 1-.2.9L4.7 20.5a1 1 0 0 0 .9 1.5h12.8a1 1 0 0 0 .9-1.5l-5.1-10.1A2 2 0 0 1 14 9.5V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/></svg>`;
    case "map":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="8" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`;
    case "calculator":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>`;
    case "music":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
    case "utensils":
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M5 2v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2"/><path d="M7 12v10"/></svg>`;
    default:
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
  }
}

// ==========================================
// 10. マイページ：質問回答データ描画 ＆ ローカルストレージ連携
// ==========================================
const APP_STORAGE_KEY = "koko_app_data_v2";

function saveAppStateToLocalStorage() {
  try {
    const dataToSave = {
      child_name: AppSchema.child_name,
      child_grade: AppSchema.child_grade,
      child_profile: AppSchema.child_profile,
      parent_profile: AppSchema.parent_profile,
      favorites: AppSchema.favorites,
      visit_planned_events: AppSchema.visit_planned_events,
      visit_reviews: AppSchema.visit_reviews
    };
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (e) {
    console.warn("localStorage save failed", e);
  }
}

function loadAppStateFromLocalStorage() {
  try {
    const saved = localStorage.getItem(APP_STORAGE_KEY);
    if (!saved) return;
    const parsed = JSON.parse(saved);
    if (parsed.child_name) AppSchema.child_name = parsed.child_name;
    if (parsed.child_grade) AppSchema.child_grade = parsed.child_grade;
    if (parsed.child_profile) AppSchema.child_profile = Object.assign(AppSchema.child_profile, parsed.child_profile);
    if (parsed.parent_profile) AppSchema.parent_profile = Object.assign(AppSchema.parent_profile, parsed.parent_profile);
    if (Array.isArray(parsed.favorites)) AppSchema.favorites = parsed.favorites;
    if (Array.isArray(parsed.visit_planned_events)) AppSchema.visit_planned_events = parsed.visit_planned_events;
    if (Array.isArray(parsed.visit_reviews)) AppSchema.visit_reviews = parsed.visit_reviews;
  } catch (e) {
    console.warn("localStorage load failed", e);
  }
}

function renderMypageChildProfile() {
  const container = document.getElementById('mypageChildAnswersSummary');
  if (!container) return;

  const prof = AppSchema.child_profile || {};
  if (!prof.is_completed) {
    container.innerHTML = `
      <div style="padding: 16px; background: #FFF9E6; border: 2px dashed #000; border-radius: 12px; text-align: center;">
        <p style="font-weight: 700; margin-bottom: 6px; color: #1B2028;">まだ質問に答えていません</p>
        <p style="font-size: 13px; color: #555; margin-bottom: 12px;">「すきなことを見つけるワーク」に答えると、あなたにぴったりの学校が自動で見つかります！</p>
        <button type="button" class="btn-solid-child" onclick="startChildQuestionEdit()" style="display: inline-block;">✦ 質問に答えてみる</button>
      </div>
    `;
    return;
  }

  // 1. 興味関心タグの日本語マッピング
  const interestLabelMap = {
    "interest_nature_biology": "生き物・自然",
    "interest_crafting_making": "ものづくり・工作",
    "interest_arts_music": "絵・音楽・アート",
    "interest_sports_athletics": "体を動かすこと・スポーツ",
    "interest_digital_tech": "パソコン・ゲーム・プログラミング",
    "interest_reading_history": "本・ものがたり・歴史",
    "interest_science_space": "実験・科学・宇宙",
    "interest_cooking_food": "料理・おかし作り",
    "interest_social_events": "友だちとおしゃべり・イベント",
    "interest_puzzle_math": "なぞ解き・パズル・計算"
  };

  const interestBadges = (prof.interests && prof.interests.length > 0)
    ? prof.interests.map(int => `<span class="ans-chip-tag"># ${interestLabelMap[int] || int}</span>`).join(' ')
    : '<span style="color:#888;">未選択</span>';

  // 2. 質問選択肢タグの日本語マッピング
  const choiceLabelMap = {
    // 夢中になる瞬間
    "moment_invention": "新しいアイデアを思いついて形にしたとき",
    "moment_discovery": "仕組みや理由がわかって「なるほど！」と思ったとき",
    "moment_collaboration": "友だちやチームのみんなで力を合わせてできたとき",
    "moment_mastery": "練習や工夫を重ねてできるようになったとき",
    "craft": "自分でモノや作品をつくる時間",
    "reading": "物語や本をじっくり読む時間",
    "experiment": "ふしぎを実験して確かめる時間",
    "nature": "自然や生き物とふれあう時間",

    // 理想の放課後
    "lifestyle_club_active": "部活に思いっきり打ちこんで毎日汗を流したい",
    "lifestyle_relax_social": "友だちとおしゃべりしたり中庭でのんびり過ごしたい",
    "lifestyle_individual_focus": "図書館や好きな教室で趣味や勉強に没頭したい",
    "lifestyle_event_driven": "季節のお祭りや行事の準備をみんなでワイワイやりたい",
    "club_active": "部活や運動で思いっきり汗を流す",
    "lab_diy": "工房やパソコン室で工作・プログラミング",
    "library_reading": "静かな図書室で好きな本に没頭",
    "chill_friends": "カフェテリアや広場で友達とおしゃべり",

    // 好きな授業スタイル
    "study_lecture_expert": "先生の話が面白くてグングン学べる授業",
    "study_inquiry_ict": "パソコンを使って自分で調べ発表する授業",
    "study_hands_on": "実験や見学など実際に手や体を動かす授業",
    "study_discussion_group": "みんなで意見を出し合って探究する授業",
    "hands_on": "体験や実験が多いアクティブな授業",
    "discussion": "みんなで意見を出し合う探究・ゼミ形式",
    "deep_lecture": "専門的な知識を深く掘り下げる講義",
    "global_english": "ネイティブの先生と英語で話す実践授業",

    // 居心地のよい場所
    "facility_rich_library": "本がたくさん並んで落ち着ける広くてきれいな図書館",
    "facility_maker_lab": "本格的な実験器具や工作道具、PCがそろう教室",
    "facility_sports_arena": "広いグラウンドやきれいな体育館など運動できる設備",
    "facility_open_lounge": "ベンチや芝生があって友だちと語り合える中庭やラウンジ",
    "high_tech_lab": "最新の3Dプリンタや実験設備があるラボ",
    "grand_library": "天井が高く吹き抜けの開放的な図書室",
    "natural_grounds": "緑豊かで広大なグラウンドや芝生テラス",
    "cozy_cafe": "居心地のよいカフェテリアや交流ラウンジ",

    // 先生・先輩との関係
    "relation_supportive_care": "困ったときにすぐ相談に乗ってていねいに教えてくれる先生",
    "relation_autonomous_trust": "生徒の自主性を信じてのびのび見守ってくれる先生",
    "relation_friendly_seniors": "部活や行事で優しく声をかけてリードしてくれる先輩",
    "relation_passionate_teachers": "自分の教科への情熱や大好きなことを語ってくれる先生"
  };

  const momentVal = prof.moment || prof.q1 || '';
  const lifestyleVal = prof.lifestyle || prof.afterschool || prof.q2 || '';
  const studyVal = prof.study || prof.subject || prof.q3 || '';
  const facilityVal = prof.facility || prof.place || prof.q4 || '';
  const relationVal = prof.relation || prof.q5 || '';

  const momentText = choiceLabelMap[momentVal] || momentVal || '未設定';
  const afterschoolText = choiceLabelMap[lifestyleVal] || lifestyleVal || '未設定';
  const subjectText = choiceLabelMap[studyVal] || studyVal || '未設定';
  const placeText = choiceLabelMap[facilityVal] || facilityVal || '未設定';
  const relationText = choiceLabelMap[relationVal] || relationVal || '未設定';

  const freeQuotes = [];
  if (prof.free_comments) {
    if (prof.free_comments.step1) freeQuotes.push(`「${prof.free_comments.step1}」`);
    if (prof.free_comments.q1) freeQuotes.push(`「${prof.free_comments.q1}」`);
    if (prof.free_comments.q2) freeQuotes.push(`「${prof.free_comments.q2}」`);
    if (prof.free_comments.q3) freeQuotes.push(`「${prof.free_comments.q3}」`);
    if (prof.free_comments.q4) freeQuotes.push(`「${prof.free_comments.q4}」`);
  }
  const quotesHtml = freeQuotes.length > 0
    ? `<div class="mypage-ans-quote"><span style="font-weight:700;">自由記述の言葉：</span> ${freeQuotes.join(' ')}</div>`
    : '';

  const isParent = currentUserMode === 'parent';
  const editBtnEl = document.getElementById('btnEditChildAnswersMypage');
  if (editBtnEl) {
    editBtnEl.style.display = isParent ? 'none' : 'inline-block';
  }

  const badgeNote = isParent
    ? `<span style="font-size:12px; color:#64748B; font-weight:700;">🔒 閲覧専用：お子さまの自主性を尊重するため、保護者画面からは変更できません。変更はお子さま画面から行ってください。</span>`
    : `<span style="font-size:12px; color:#555;">いつでも右上の「✎ 回答を編集する」から再設定できます</span>`;

  container.innerHTML = `
    <div class="mypage-ans-status-badge">
      <span class="badge-phase" style="background:#FFF9E6; border-color:#000;">回答完了・保存済み</span>
      ${badgeNote}
    </div>
    <div class="mypage-ans-grid">
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">すきなこと</span>
        <div class="mypage-ans-value">${interestBadges}</div>
      </div>
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">夢中になる瞬間</span>
        <div class="mypage-ans-value">${momentText}</div>
      </div>
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">理想の放課後</span>
        <div class="mypage-ans-value">${afterschoolText}</div>
      </div>
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">好きな授業スタイル</span>
        <div class="mypage-ans-value">${subjectText}</div>
      </div>
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">いちばん居心地の良い場所</span>
        <div class="mypage-ans-value">${placeText}</div>
      </div>
      <div class="mypage-ans-item">
        <span class="mypage-ans-label">理想の先生・先輩</span>
        <div class="mypage-ans-value">${relationText}</div>
      </div>
    </div>
    ${quotesHtml}
  `;
}

// ==========================================
// 11. 初期化 & テーマ設定（レトロポップ固定）
// ==========================================
function initDesignTheme() {
  document.body.className = '';
  document.body.classList.add('theme-retro');
}

function switchDesignTheme(themeName) {
  initDesignTheme();
}

document.addEventListener('DOMContentLoaded', () => {
  loadAppStateFromLocalStorage();
  initDesignTheme();
  executeSchoolMatching();
  updateParentProgressIndicator(1);
  updateChildProgressIndicator(0);
  switchUserMode('parent');
  switchAppView('home');
});
