/**
 * 全国47都道府県 中学校データベース ＆ 詳細通学ルート計算エンジン
 * (nationwide_schools.js)
 */

// 都道府県の通学圏グループ定義（日常通学可能な地理的クラスター）
const COMMUTE_REGIONS = {
  kanto: ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"],
  kansai: ["大阪府", "兵庫県", "京都府", "奈良県", "滋賀県", "和歌山県"],
  tokai: ["愛知県", "岐阜県", "三重県", "静岡県"],
  kyushu: ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県"],
  okinawa: ["沖縄県"],
  hokkaido: ["北海道"],
  tohoku: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
  chugoku: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
  shikoku: ["徳島県", "香川県", "愛媛県", "高知県"],
  hokuriku: ["富山県", "石川県", "福井県"],
  koushinetsu: ["新潟県", "山梨県", "長野県"]
};

// 47都道府県 全国代表校データベース
const NATIONWIDE_SCHOOL_LIST = [
  // ==================== 北海道・東北 ====================
  {
    school_id: "sch_hokurei",
    name: "北嶺中学校",
    name_ruby: "ほくれいちゅうがっこう",
    official_url: "https://www.kibou.ac.jp/hokurei/",
    catchphrase: "めざすなら高い嶺。大自然のなかで高い知性とたくましい心を育む名門男子校",
    recommend_phrase: "★ 北の大地で医学部・最難関大を目指し、勉強も自然体験も思いきり打ち込みたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "北海道",
    district: "札幌市清田区",
    station_name: "福住駅",
    access_info: {
      primary_line: "地下鉄東豊線",
      hub_station: "さっぽろ駅",
      walk_minutes: 0,
      bus_minutes: 15,
      school_bus: true,
      school_bus_note: "地下鉄福住駅・南郷18丁目駅・JR新札幌駅より学校専用直通スクールバス運行（約15分）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科（全寮制・通学制併設）",
    commute_time: 35,
    tuition: 890000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "stem"],
    vibe_label: "文武両道・理数探究",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 64,
    match_rate_child: 95,
    recent_passed_records: "東大・京大・国公立大医学部現役合格率全国トップクラス",
    events: [
      { id: "ev_hoku_open", title: "オープンキャンパス＆青雲寮見学", date: "9月20日(土)", type: "学校説明会", desc: "広大な清田キャンパスと全国から集まる仲間が暮らす青雲寮を見学できます。" }
    ],
    special_classes: [
      { title: "北嶺G（グローバル）プロジェクト", desc: "大自然の中でのフィールドワークや先端医療機関との連携ゼミ！" }
    ],
    school_strengths: [
      "東大・国公立医学部への抜群の合格実績と徹底した個別学習フォロー！",
      "札幌市内各ターミナル駅から直通スクールバスで快適通学！",
      "全天候型屋内グラウンドや温水プールなど国内屈指のスポーツ・教育設備！"
    ],
    life_simulation: "福住駅からの専用スクールバスで爽やかな緑の丘へ登校。午後は高度な理数・英語の授業に取り組み、放課後は部活や自習室で仲間と高め合います。",
    parent_summary: "【進学・教育】全国屈指の国公立医学部・東大合格率を誇る中高一貫男子校。少人数によるきめ細かな習熟度別指導と自学自習習慣の確立が強みです。【環境・費用】札幌市清田区。各線主要駅から専用直通スクールバスを運行し、安全で快適な通学環境が整っています。",
    child_summary: "広いグラウンドと大きな自然に囲まれたかっこいい学校！スキーやキャンプなどの大自然体験と、理科の本格的な実験が毎日楽しめるよ！",
    tags: ["interest_science_space", "interest_nature_biology", "interest_puzzle_math"],
    interest_category_label: "自然・科学・医学探究",
    is_favorite: false
  },
  {
    school_id: "sch_aomori_yamada",
    name: "青森山田中学校",
    name_ruby: "あおもりやまだちゅうがっこう",
    official_url: "https://www.aomoriyamada-jhs.jp/",
    catchphrase: "スポーツと学業の融合。確かな基礎学力と強い精神力を育む共学校",
    recommend_phrase: "★ 全国レベルのスポーツや活動に励みながら、大学進学もしっかり目指したい人におすすめ！",
    photo_url: "assets/images/real_shibaura.jpg",
    prefecture: "青森県",
    district: "青森市",
    station_name: "青森駅",
    access_info: {
      primary_line: "青い森鉄道・JR奥羽本線",
      hub_station: "新青森駅",
      walk_minutes: 0,
      bus_minutes: 15,
      school_bus: true,
      school_bus_note: "青森駅・新青森駅・市内各エリアより無料スクールバス直通運行（約15分）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "特進コース / スポーツコース",
    commute_time: 25,
    tuition: 680000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "support"],
    vibe_label: "文武両道・手厚い",
    club_label: "全国レベル",
    record_label: "◎",
    deviation_score: 52,
    match_rate_child: 90,
    recent_passed_records: "国公立大学・難関私立大・プロスポーツ界へ多数輩出",
    events: [
      { id: "ev_aomori_open", title: "学校見学会＆部活動体験", date: "10月11日(土)", type: "学校説明会", desc: "最新の学習施設と全国屈指のスポーツ練習設備を体験できます。" }
    ],
    special_classes: [
      { title: "放課後個別ステップアップ講座", desc: "習熟度に合わせて弱点を完全克服する少人数指導！" }
    ],
    school_strengths: [
      "スクールバス完備で青森市内全域から安全・快適に通学可能！",
      "勉強と部活動を両立できるタイムスケジュールと手厚い補習体制！",
      "充実したICT環境で一人ひとりの理解度に合わせた個別最適学習！"
    ],
    life_simulation: "専用バスで元気いっぱいに登校。朝の集中学習からスタートし、放課後は大好きな部活や補習に全力投球。仲間と励まし合いながら成長できる毎日です。",
    parent_summary: "【進学・教育】文武両道を掲げ、特進コースでは手厚い補習と個別指導で国公立大・私立大進学を強力にサポート。【環境・費用】青森市内各駅から充実のスクールバス網を運行。面倒見の良さと明るい校風が魅力です。",
    child_summary: "スポーツも勉強も思いきり頑張れる元気な学校！スクールバスで通えて、仲間と一緒にいろんなことに挑戦できるよ！",
    tags: ["interest_sports_athletics", "interest_social_events"],
    interest_category_label: "スポーツ・文武両道",
    is_favorite: false
  },
  {
    school_id: "sch_sendai_nika",
    name: "宮城県仙台二華中学校",
    name_ruby: "みやぎけんせんだいにかちゅうがっこう",
    official_url: "https://nika.myswan.ed.jp/",
    catchphrase: "高い志と知性を育み、未来のグローバルリーダーを育成する公立中高一貫校",
    recommend_phrase: "★ 仙台駅からアクセス抜群！抑えられた学費でハイレベルな探究学習をしたい人におすすめ！",
    photo_url: "assets/images/real_hiroo.jpg",
    prefecture: "宮城県",
    district: "仙台市若林区",
    station_name: "仙台駅",
    access_info: {
      primary_line: "JR東北本線・仙台市地下鉄東西線",
      hub_station: "仙台駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR仙台駅東口より徒歩10分、地下鉄連坊駅より徒歩7分の抜群の立地"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中高一貫コース",
    commute_time: 20,
    tuition: 220000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["global", "stem"],
    vibe_label: "公立一貫・先進探究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 66,
    match_rate_child: 96,
    recent_passed_records: "東大・東北大をはじめとする難関国公立大学へ多数合格",
    events: [
      { id: "ev_nika_setsu", title: "二華中 学校説明会", date: "9月13日(土)", type: "学校説明会", desc: "公立中高一貫教育の魅力や探究型カリキュラムを詳しく解説します。" }
    ],
    special_classes: [
      { title: "グローバル・アカデミック探究", desc: "地域の課題や国際問題をテーマに、自ら仮説を立て英語でプレゼンテーション！" }
    ],
    school_strengths: [
      "仙台駅東口から徒歩10分の好アクセスで県内各地から無理なく通学！",
      "公立中高一貫校ならではの充実した教育と抑えられた学費負担！",
      "東北大学との高大連携による高度なサイエンス・リサーチプログラム！"
    ],
    life_simulation: "仙台駅から友人と歩いて校舎へ。午前は思考力を鍛える探究的な授業、放課後は図書室での調べ学習やクラブ活動に励みます。",
    parent_summary: "【進学・教育】県内屈指の公立中高一貫共学校。東北大・東大をはじめとする難関国公立大へ抜群の合格実績。公立のため授業料が抑えられ経済的負担が少ない点も魅力。【環境・費用】仙台駅徒歩10分。6年間を見通した体系的なカリキュラムで高い論理的思考力を育てます。",
    child_summary: "仙台駅から歩いてすぐのピカピカな学校！みんなで調べたり発表したりする授業がたくさんあって、面白いアイデアをどんどん形にできるよ！",
    tags: ["interest_reading_history", "interest_science_space", "interest_puzzle_math"],
    interest_category_label: "公立一貫・探究・国際",
    is_favorite: false
  },

  // ==================== 関東（東京・神奈川・埼玉・千葉・北関東） ====================
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
    station_name: "渋谷駅",
    access_info: {
      primary_line: "JR山手線・東急東横線・東京メトロ半蔵門線",
      hub_station: "渋谷駅",
      walk_minutes: 7,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "各線渋谷駅より徒歩7分、原宿駅・明治神宮前駅より徒歩8分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
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
      { id: "ev_shibushibu_bunkasai", title: "飛翔祭（文化祭）", date: "9月20日(土)・21日(日)", type: "文化祭", desc: "生徒が企画運営する自由でエネルギッシュな展示・英語劇・模擬店が満載！" }
    ],
    special_classes: [
      { title: "自調自考論文・探究活動", desc: "自ら問いを立て、1万字以上の本格論文を書き上げる深い思考の授業！" }
    ],
    school_strengths: [
      "渋谷駅から徒歩7分！アクセス抜群で先進的な都市型キャンパス！",
      "帰国生も多く、日常的に多様な文化や価値観と触れ合える！",
      "「シラバス（年間の学習設計図）」で目標を見通しながら主体的に学べる！"
    ],
    life_simulation: "朝は渋谷駅から賑やかな街並みを歩いて登校。午前中はディベートや探究型の授業で意見を交わし、放課後は部活動や自習室での論文執筆に仲間と熱中します。",
    parent_summary: "【進学・教育】国内外のトップ大学へ高い進学実績を誇る完全中高一貫共学校。シラバス教育と『自調自考論文』により、自ら課題を発見し解決する高い問題解決力を育成します。【環境・費用】渋谷駅徒歩7分。少人数英語指導や海外研修などグローバル教育が充実しています。",
    child_summary: "「自分で調べ、自分で考える」がモットーのワクワクする学校！英語を楽しく話せる授業や、好きなテーマをとことん研究できる自由な時間がいっぱいあるよ！",
    tags: ["interest_digital_tech", "interest_reading_history", "interest_social_events"],
    interest_category_label: "国際・社会・探究",
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
    station_name: "西日暮里駅",
    access_info: {
      primary_line: "JR山手線・京浜東北線・東京メトロ千代田線",
      hub_station: "西日暮里駅",
      walk_minutes: 2,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR・千代田線西日暮里駅より徒歩2分の直結好立地"
    },
    can_walk: false,
    can_bicycle: false,
    course_name: "普通科",
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
      { id: "ev_kaisei_undokai", title: "開成大運動会", date: "5月10日(日)", type: "見学イベント", desc: "伝統の棒倒し！全校生徒の熱気がスタジアムを包む名物行事！" }
    ],
    special_classes: [
      { title: "本格的な理科実験・観察ゼミ", desc: "中1から毎週本格的な実験レポートを書き上げ、科学的思考の基礎を徹底鍛錬！" }
    ],
    school_strengths: [
      "西日暮里駅徒歩2分の好立地！新校舎には広大な理科実験棟や温水プールも完備！",
      "先輩が後輩を全力で育てる「縦の絆」が非常に強く、一生の仲間ができる！",
      "運動部・文化部ともに全国トップレベルの活発な部活動環境！"
    ],
    life_simulation: "西日暮里駅からすぐの校舎へ。放課後は部活動で思いきり汗を流し、行事前には夜遅くまで仲間と作戦会議。高い学力とたくましいリーダーシップを同時に磨きます。",
    parent_summary: "【進学・教育】国内最高峰の東大合格実績を誇る完全中高一貫男子校。生徒主体の行事運営を通じた高い自治力とリーダーシップの育成、実技・体験を重んじる多面的な教育カリキュラムが魅力です。【環境・費用】西日暮里駅徒歩2分。質実剛健で互いを高め合う濃密な男子校文化が息づいています。",
    child_summary: "全校生徒が本気で熱中する伝統の大運動会が最高にかっこいい！お互いを認め合える最高の仲間と一緒に、勉強も部活動も思いきり全力で打ち込めるよ！",
    tags: ["interest_sports_athletics", "interest_puzzle_math", "interest_reading_history"],
    interest_category_label: "伝統・文武両道・仲間",
    is_favorite: false
  },
  {
    school_id: "sch_oin",
    name: "桜蔭中学校",
    name_ruby: "おういんちゅうがっこう",
    official_url: "https://www.oin.ed.jp/",
    catchphrase: "礼と学びの心。自立した女性の知性と品性を育む最高峰女子校",
    recommend_phrase: "★ 確かな学力と礼儀作法を身につけ、理数や知的好奇心を深めたい人におすすめ！",
    photo_url: "assets/images/real_oin.jpg",
    prefecture: "東京都",
    district: "文京区",
    station_name: "水道橋駅",
    access_info: {
      primary_line: "JR中央・総武線・都営三田線",
      hub_station: "水道橋駅",
      walk_minutes: 5,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR水道橋駅東口より徒歩5分、春日駅・後楽園駅より徒歩10分"
    },
    can_walk: false,
    can_bicycle: false,
    course_name: "普通科",
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
      { id: "ev_oin_bunkasai", title: "桜蔭祭（文化祭）", date: "9月27日(土)・28日(日)", type: "文化祭", desc: "学術的でハイレベルなクラブ研究発表、美しい合唱、温かいおもてなしを体験！" }
    ],
    special_classes: [
      { title: "中1必修の礼法特別授業", desc: "美しい立ち居振る舞いや心遣い、礼儀作法を身につける一生モノの授業！" }
    ],
    school_strengths: [
      "水道橋駅から徒歩5分！都心にありながら落ち着いた文教地区の学習環境！",
      "東大・医学部進学実績で全国屈指！高い志を持つ仲間と切磋琢磨できる！",
      "数学部や天文部、茶道・華道など知性と情操を育む部活動が充実！"
    ],
    life_simulation: "水道橋駅から坂を上がり落ち着いた校舎へ登校。朝の読書で心を整え、高度な授業に集中。放課後は大好きな部活や仲間との勉強会で充実した時間を過ごします。",
    parent_summary: "【進学・教育】東大・国公立医学部合格実績で日本トップを誇り、理数教育と高い論理的思考力を養成。【環境・費用】文京区の落ち着いた文教地区。中学1年次の礼法授業に象徴される、高い知性と品性を兼ね備えた自立した女性を育みます。",
    child_summary: "女子最難関校！算数や理科の実験がすごく面白くて、勉強が大好きな仲間が集まるよ。優しくて頼りになるかっこいい先輩たちがいっぱいいる憧れの学校！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_reading_history"],
    interest_category_label: "知性・理数・礼儀作法",
    is_favorite: false
  },
  {
    school_id: "sch_seiko",
    name: "聖光学院中学校",
    name_ruby: "せいこうがくいんちゅうがっこう",
    official_url: "https://www.seiko.ac.jp/",
    catchphrase: "紳士たれ。手厚い面倒見と最難関大進学実績を誇るカトリック男子校",
    recommend_phrase: "★ 充実したICT設備と手厚い先生方のサポートで、安心して力を伸ばしたい人におすすめ！",
    photo_url: "assets/images/real_hiroo.jpg",
    prefecture: "神奈川県",
    district: "横浜市中区",
    station_name: "山手駅",
    access_info: {
      primary_line: "JR根岸線（京浜東北線直通）",
      hub_station: "横浜駅",
      walk_minutes: 8,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR根岸線山手駅より徒歩8分（横浜駅より電車10分）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 30,
    tuition: 890000,
    gender_type: "boys",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "手厚い・進学校・紳士",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 70,
    match_rate_child: 96,
    recent_passed_records: "東大現役合格率全国第1位レベル・国公立医学部多数合格",
    events: [
      { id: "ev_seiko_fes", title: "聖光祭（文化祭）", date: "4月26日(土)・27日(日)", type: "文化祭", desc: "生徒主体の洗練された展示、食品企画、バンド演奏で熱気あふれる2日間！" }
    ],
    special_classes: [
      { title: "聖光塾（教養探究プログラム）", desc: "学問・芸術・ボランティアなど、教科の枠を超えて知的好奇心を刺激する放課後講座！" }
    ],
    school_strengths: [
      "東大現役合格率で日本トップクラス！塾いらずと言われる極めて手厚い校内指導！",
      "全館Wi-Fi完備、最新カフェテリアや広大な人工芝グラウンドを備えた美しい校舎！",
      "カトリックの愛の精神に基づき、他者への思いやりを持った豊かな人間性を育成！"
    ],
    life_simulation: "山手駅から緑豊かな住宅街を歩いて登校。朝の祈りで心を静め、ICTを駆使した密度の濃い授業を受講。放課後は放課後講座や部活動で仲間と充実の時間を過ごします。",
    parent_summary: "【進学・教育】東大現役合格実績で全国トップを争うカトリック系男子校。学校完結型の手厚い進学指導体制が確立されており、塾に通わずとも高い学力を養成します。【環境・費用】横浜市中区の閑静な丘の上。山手駅徒歩8分。生徒に寄り添う面倒見の良さと温かい校風が保護者から絶大な信頼を集めています。",
    child_summary: "校舎がホテルみたいにピカピカで、カフェテリアのご飯もすごく美味しい！勉強のサポートがしっかりしていて、部活も行事もみんなで本気で楽しめる大人気校！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_sports_athletics"],
    interest_category_label: "手厚い・進学・カトリック",
    is_favorite: false
  },
  {
    school_id: "sch_shibumaku",
    name: "渋谷教育学園幕張中学校",
    name_ruby: "しぶやきょういくがくえんまくはりちゅうがっこう",
    official_url: "https://www.shibumaku.jp/",
    catchphrase: "自調自考の精神。千葉から世界へ羽ばたく名門共学校",
    recommend_phrase: "★ 広いキャンパスで、ハイレベルな英語・探究学習と自由な校風を満喫したい人におすすめ！",
    photo_url: "assets/images/real_mita.jpg",
    prefecture: "千葉県",
    district: "千葉市美浜区",
    station_name: "海浜幕張駅",
    access_info: {
      primary_line: "JR京葉線・総武線",
      hub_station: "海浜幕張駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR京葉線海浜幕張駅より徒歩10分、JR総武線幕張駅より徒歩16分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 35,
    tuition: 950000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "global"],
    vibe_label: "自由・国際的・探究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 69,
    match_rate_child: 97,
    recent_passed_records: "東大合格者数千葉県第1位・海外名門大・国公立医学部多数",
    events: [
      { id: "ev_shibumaku_bunkasai", title: "槐祭（文化祭）", date: "9月13日(土)・14日(日)", type: "文化祭", desc: "自由な発想で創り上げる圧巻の研究発表や英語劇、模擬店が目白押し！" }
    ],
    special_classes: [
      { title: "自調自考の倫理ゼミ", desc: "正解のない現代の問いに対し、仲間と徹底的に議論して自分の意見を確立する授業！" }
    ],
    school_strengths: [
      "海浜幕張の広大で開放的なキャンパス！温水プールや広大な人工芝グラウンド完備！",
      "帰国生が全校生徒の約1割を占め、日常会話でも自然に英語が飛び交う環境！",
      "海外トップ大学への直接進学サポートも極めて充実！"
    ],
    life_simulation: "海浜幕張駅から爽やかな海風を感じて登校。広々とした教室でディスカッションを重ね、放課後は部活やネイティブ教員とのディベートに熱中します。",
    parent_summary: "【進学・教育】千葉県トップの東大・難関大合格実績を誇る完全中高一貫共学校。自ら調べ自ら考える『自調自考』を理念とし、国内外の大学へ進学する高い知性を育成します。【環境・費用】JR海浜幕張駅徒歩10分。都内・千葉・埼玉・神奈川からの広域通学者が多数在籍しています。",
    child_summary: "海が近くて広くてかっこいいキャンパス！英語が上手な友達も多くて、自由な雰囲気の中で自分の大好きな研究にどこまでも没頭できるよ！",
    tags: ["interest_reading_history", "interest_digital_tech", "interest_social_events"],
    interest_category_label: "自調自考・国際・自由",
    is_favorite: false
  },
  {
    school_id: "sch_sakaehigashi",
    name: "栄東中学校",
    name_ruby: "さかえひがしちゅうがっこう",
    official_url: "https://www.sakaehigashi.ed.jp/",
    catchphrase: "今日学べ。アクティブラーニングと手厚い進学指導で夢を叶える共学校",
    recommend_phrase: "★ 駅から徒歩8分！活気ある授業と放課後の手厚い学習サポートで学力を伸ばしたい人におすすめ！",
    photo_url: "assets/images/real_shibaura.jpg",
    prefecture: "埼玉県",
    district: "さいたま市見沼区",
    station_name: "東大宮駅",
    access_info: {
      primary_line: "JR宇都宮線（上野東京ライン・湘南新宿ライン直通）",
      hub_station: "大宮駅",
      walk_minutes: 8,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR東大宮駅西口より徒歩8分（大宮駅から電車6分）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "東大クラス / 難関大クラス",
    commute_time: 30,
    tuition: 860000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "手厚い補習・共学校",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 65,
    match_rate_child: 94,
    recent_passed_records: "東大・難関国公立大・医学部・早慶上理へ多数合格",
    events: [
      { id: "ev_sakae_fes", title: "栄東祭（文化祭）", date: "6月7日(土)・8日(日)", type: "文化祭", desc: "科学部やクイズ研究会の体験コーナー、中学生による研究発表が盛りだくさん！" }
    ],
    special_classes: [
      { title: "AL（アクティブ・ラーニング）課題研究", desc: "4人1組で問いを追求し、プレゼンテーション能力を飛躍的に高める授業！" }
    ],
    school_strengths: [
      "東大宮駅徒歩8分の好アクセス！上野東京ライン・湘南新宿ラインで東京・神奈川からも直通！",
      "「東大クラス」を設置し、生徒一人ひとりの学力を限界まで引き上げるきめ細かなフォロー！",
      "理科実験室が多数整備され、実体験を重視したサイエンス教育が充実！"
    ],
    life_simulation: "東大宮駅から平坦な通学路を歩いて登校。放課後は充実した自習室や教員への質問ブースで疑問をその日のうちに解消し、着実に実力を蓄えます。",
    parent_summary: "【進学・教育】高い大学合格実績と丁寧な進路指導で急成長を遂げた埼玉の名門共学校。アクティブラーニングの手法を取り入れ、自発的な学習意欲を引き出します。【環境・費用】東大宮駅徒歩8分。夜遅くまで利用できる自習館など、手厚い教育環境が整っています。",
    child_summary: "駅からも近くて通いやすい！クイズ研究会や理科の実験がすごく盛んで、先生たちも優しく教えてくれるから毎日楽しく学べるよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_social_events"],
    interest_category_label: "手厚い・探究・共学",
    is_favorite: false
  },

  // ==================== 東海・北陸 ====================
  {
    school_id: "sch_tokai",
    name: "東海中学校",
    name_ruby: "とうかいちゅうがっこう",
    official_url: "https://www.tokai-jh.ed.jp/",
    catchphrase: "勤倹誠実の精神。圧倒的な自由と医学部合格日本一を誇る伝統男子校",
    recommend_phrase: "★ 名古屋の中心部で、圧倒的な自由と個性あふれる最高の仲間に出会いたい人におすすめ！",
    photo_url: "assets/images/real_kaisei.jpg",
    prefecture: "愛知県",
    district: "名古屋市東区",
    station_name: "車道駅",
    access_info: {
      primary_line: "地下鉄桜通線・JR中央本線",
      hub_station: "名古屋駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "地下鉄桜通線車道駅徒歩10分、JR・地下鉄千種駅徒歩15分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 760000,
    gender_type: "boys",
    category: "private",
    religion: "buddhist",
    university_path: "prep",
    atmospheres: ["free", "stem"],
    vibe_label: "自由・医学部実績・男子校",
    club_label: "極めて盛ん",
    record_label: "◎",
    deviation_score: 66,
    match_rate_child: 96,
    recent_passed_records: "国公立大学医学部医学科合格者数17年連続日本第1位",
    events: [
      { id: "ev_tokai_kinen", title: "東海記念祭（文化祭）", date: "9月27日(土)・28日(日)", type: "文化祭", desc: "自由な男子校の活気が大爆発！クラス演劇や本格的な学術研究展示が名物！" }
    ],
    special_classes: [
      { title: "サタデープログラム（市民公開講座）", desc: "各界の著名人や研究者を招き、生徒が企画・運営する年間最大の知の祭典！" }
    ],
    school_strengths: [
      "医学部医学科合格者数で全国ダントツの日本一！医師を目指す仲間が集結！",
      "細かい校則がなく、生徒の自主性と個性を最大限に尊重する大らかな校風！",
      "名古屋駅から地下鉄で直通アクセス抜群の文教エリア！"
    ],
    life_simulation: "車道駅から落ち着いた街並みを通って登校。放課後は自由な部活やサークル、自習室での学びに仲間と没頭。互いの個性を認め合う最高の青春を過ごします。",
    parent_summary: "【進学・教育】創立130年を超える浄土宗系の伝統男子校。国公立医学部合格実績で17年連続日本一を誇り、高い知性と自主自律の精神を養います。【環境・費用】名古屋市東区。仏教情操教育に基づく生命尊重の倫理観と、校則に縛られない自由闊達な教育方針が最大の特色です。",
    child_summary: "自由で面白い友達がたくさん集まる学校！お医者さんや科学者になりたい夢を持った仲間と一緒に、部活も文化祭も勉強も全力で楽しめるよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_reading_history"],
    interest_category_label: "医学部実績・自由・伝統",
    is_favorite: false
  },
  {
    school_id: "sch_nanzan_girls",
    name: "南山中学校女子部",
    name_ruby: "なんざんちゅうがっこうじょしぶ",
    official_url: "https://www.nanzan-girls.ed.jp/",
    catchphrase: "高い知性と愛の心。自立した女性の未来を拓く東海地区最高峰女子校",
    recommend_phrase: "★ 駅から徒歩3分！カトリックの温かい精神の中で、高い学力と自立心を育みたい人におすすめ！",
    photo_url: "assets/images/real_oin.jpg",
    prefecture: "愛知県",
    district: "名古屋市昭和区",
    station_name: "いりなか駅",
    access_info: {
      primary_line: "地下鉄鶴舞線",
      hub_station: "伏見駅",
      walk_minutes: 3,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "地下鉄鶴舞線いりなか駅2番出口より徒歩3分の抜群の立地"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 790000,
    gender_type: "girls",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["manners", "global"],
    vibe_label: "気品・知性・カトリック",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 65,
    match_rate_child: 95,
    recent_passed_records: "東大・名大・国公立医学部・早慶上智・南山大推薦枠など多数",
    events: [
      { id: "ev_nanzan_fes", title: "南山女子部 文化祭", date: "9月20日(土)・21日(日)", type: "文化祭", desc: "学術研究、英語劇、器楽演奏など品格と知性が溢れる発表の数々！" }
    ],
    special_classes: [
      { title: "キリスト教倫理と人間論", desc: "他者のために生きる真のリーダーシップと思いやりの心を育てる授業！" }
    ],
    school_strengths: [
      "いりなか駅徒歩3分！雨の日も安心で安全な閑静な文教エリア！",
      "東海地区の女子校でトップの難関大学・医学部進学実績！",
      "英語教育に強く、多国籍なシスターや教員との交流が日常的！"
    ],
    life_simulation: "いりなか駅から木漏れ日の並木を通ってすぐ校舎へ。朝は祈りで静かに心を整え、密度の高い授業に集中。放課後はクラブや勉強会で仲間と励まし合います。",
    parent_summary: "【進学・教育】カトリック神言会を設立母体とする東海屈指の名門完全中高一貫女子校。名大・東大・国公立大医学部へ多数の進学者を輩出。【環境・費用】いりなか駅徒歩3分。高い品性と自立心を育む落ち着いた教育環境が保護者から絶大な信頼を得ています。",
    child_summary: "駅から近くてとってもきれいな学校！英語が楽しく学べて、優しくてかっこいい先輩たちがたくさんいる憧れの女子校だよ！",
    tags: ["interest_reading_history", "interest_arts_music", "interest_social_events"],
    interest_category_label: "気品・カトリック・知性",
    is_favorite: false
  },

  // ==================== 近畿（大阪・兵庫・京都・奈良） ====================
  {
    school_id: "sch_nada",
    name: "灘中学校",
    name_ruby: "なだちゅうがっこう",
    official_url: "http://www.nada.ac.jp/",
    catchphrase: "精力善用・自他共栄。日本屈指の知性と自由を誇る最高峰男子校",
    recommend_phrase: "★ 枠にとらわれず、好きな学問や探究をとことん極めたい知的好奇心旺盛な人におすすめ！",
    photo_url: "assets/images/real_kaisei.jpg",
    prefecture: "兵庫県",
    district: "神戸市東灘区",
    station_name: "住吉駅",
    access_info: {
      primary_line: "JR神戸線・阪神本線",
      hub_station: "三ノ宮駅 / 大阪駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR住吉駅より徒歩10分、阪神魚崎駅より徒歩10分（大阪・三ノ宮から直通快速利用可）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 780000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "stem"],
    vibe_label: "最高峰・自由・理数",
    club_label: "自由",
    record_label: "◎",
    deviation_score: 72,
    match_rate_child: 99,
    recent_passed_records: "東大理三・京大医・東大京大合格率全国ダントツ日本一",
    events: [
      { id: "ev_nada_bunkasai", title: "灘校文化祭", date: "5月2日(土)・3日(日)", type: "文化祭", desc: "数学研究部や物理研究部、パソコン研究会の驚異的なレベルの研究発表が圧巻！" }
    ],
    special_classes: [
      { title: "担任団による6年間完全一貫カリキュラム", desc: "教科書を飛び越え、教員の専門知識を注ぎ込む本質的な思考の授業！" }
    ],
    school_strengths: [
      "日本最高峰の進学実績！全国から集まる卓越した才能と切磋琢磨できる！",
      "校則で生徒を縛らない、完全な自由と自律の精神！",
      "JR・阪神の2路線が使え、神戸・大阪・西宮・京都からもアクセス良好！"
    ],
    life_simulation: "住吉駅から閑静な住宅街を歩いて登校。授業ではハイレベルな疑問が飛び交い、放課後はクラブ活動や数学オリンピックの難問に仲間と熱中します。",
    parent_summary: "【進学・教育】日本屈指の東大・京大・国公立医学部合格実績を誇る完全中高一貫男子校。嘉納治五郎の教え『精力善用・自他共栄』を是とし、担任団持ち上がり制による自由で深遠な学びを展開。【環境・費用】神戸市東灘区。JR・阪神両駅から徒歩10分。生徒の自律的な探究心を重んじます。",
    child_summary: "日本一の知性が集まるワクワクする学校！数学や科学、ロボットなど、好きなことをどこまでもトコトン極められる自由な空気があるよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_digital_tech"],
    interest_category_label: "最高峰・理数・自由",
    is_favorite: false
  },
  {
    school_id: "sch_osaka_seiko",
    name: "大阪星光学院中学校",
    name_ruby: "おおさかせいこうがくいんちゅうがっこう",
    official_url: "https://www.osakaseiko.ac.jp/",
    catchphrase: "愛と規律の教育。夕陽丘の丘で高い知性と人間性を磨くカトリック男子校",
    recommend_phrase: "★ 駅から徒歩2分！天王寺・難波からのアクセス抜群で、手厚く難関大を目指したい人におすすめ！",
    photo_url: "assets/images/real_hiroo.jpg",
    prefecture: "大阪府",
    district: "大阪市天王寺区",
    station_name: "四天王寺前夕陽ヶ丘駅",
    access_info: {
      primary_line: "Osaka Metro谷町線・JR環状線",
      hub_station: "天王寺駅 / 梅田駅",
      walk_minutes: 2,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "地下鉄谷町線四天王寺前夕陽ヶ丘駅より徒歩2分、天王寺駅・難波駅からも至近"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 20,
    tuition: 840000,
    gender_type: "boys",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "手厚い・カトリック・駅近",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 68,
    match_rate_child: 95,
    recent_passed_records: "東大・京大・阪大・国公立大医学部へ抜群の合格実績",
    events: [
      { id: "ev_seiko_bunkasai", title: "星光祭（文化祭）", date: "11月3日(祝)", type: "文化祭", desc: "学術展示やステージ発表、カトリックの温かなバザーなど活気ある催しが満載！" }
    ],
    special_classes: [
      { title: "黒姫合宿・野尻湖合宿（校外特別学習）", desc: "大自然の中で教員と寝食を共にし、自立心と生涯の友情を育む伝統行事！" }
    ],
    school_strengths: [
      "四天王寺前夕陽ヶ丘駅徒歩2分！大阪・天王寺・梅田・難波から抜群のアクセス！",
      "手厚い学習指導体制で京大・阪大・国公立医学部への現役合格率が極めて高い！",
      "長野県の合宿施設を活用した体験学習でたくましい精神力を鍛錬！"
    ],
    life_simulation: "夕陽ヶ丘駅からすぐ校舎へ。静かな環境で集中して授業を受け、放課後はグラウンドでのクラブ活動や補習に参加。規律正しく充実した男子校ライフを送ります。",
    parent_summary: "【進学・教育】サレジオ修道会を設立母体とする大阪男子最難関の一角。京大・東大・国公立医学部への高い進学実績を維持。【環境・費用】天王寺区夕陽丘の歴史ある文教地区。駅徒歩2分。合宿教育に代表される面倒見の良さと徳育が保護者から高く評価されています。",
    child_summary: "駅から歩いてたったの2分！黒姫の山や湖でのサマーキャンプがすごく楽しくて、勉強もしっかり教えてくれる頼もしい学校だよ！",
    tags: ["interest_nature_biology", "interest_puzzle_math", "interest_sports_athletics"],
    interest_category_label: "駅近・手厚い・自然合宿",
    is_favorite: false
  },
  {
    school_id: "sch_raku_nan",
    name: "洛南高等学校附属中学校",
    name_ruby: "らくなんこうとうがっこうふぞくちゅうがっこう",
    official_url: "https://www.rakunan-h.ed.jp/",
    catchphrase: "自ら学び自ら律する。東寺の境内に息づく関西屈指の共学進学校",
    recommend_phrase: "★ 京都駅から徒歩圏！規律ある環境で学力を徹底的に鍛え上げ、難関大を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "京都府",
    district: "京都市南区",
    station_name: "京都駅",
    access_info: {
      primary_line: "JR各線・近鉄京都線・地下鉄烏丸線",
      hub_station: "京都駅",
      walk_minutes: 13,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR京都駅八条口より徒歩13分、近鉄東寺駅より徒歩5分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "空パラダイム / 海パラダイム",
    commute_time: 25,
    tuition: 820000,
    gender_type: "coed",
    category: "private",
    religion: "buddhist",
    university_path: "prep",
    atmospheres: ["both", "support"],
    vibe_label: "厳格・文武両道・京大実績",
    club_label: "全国レベル",
    record_label: "◎",
    deviation_score: 70,
    match_rate_child: 96,
    recent_passed_records: "京大合格者数全国第1位・東大・国公立医学部多数合格",
    events: [
      { id: "ev_raku_fes", title: "洛南祭（文化祭＆体育祭）", date: "9月19日(金)〜21日(日)", type: "文化祭", desc: "東寺の境内を借景にした圧巻の集団行動やクラス劇、展示発表！" }
    ],
    special_classes: [
      { title: "東寺毎月21日御影供参拝", desc: "弘法大師の教えに触れ、感謝と自省の心を育む伝統の情操時間！" }
    ],
    school_strengths: [
      "京大合格者数日本一を誇る圧倒的な進学実績！",
      "京都駅八条口徒歩圏、近鉄東寺駅徒歩5分で関西一円から直通通学！",
      "体操・バスケ・陸上など全国制覇を果たすハイレベルなクラブ活動！"
    ],
    life_simulation: "京都駅から東寺の五重塔を眺めながら登校。静かな集中空間で密度の濃い授業を受け、放課後は全国レベルのクラブや自習に汗を流します。",
    parent_summary: "【進学・教育】真言宗東寺派の教育機関を母体とし、京大合格実績で全国トップを争う名門中高一貫共学校。徹底した反復演習と厳しい規律指導により確固たる学力を確立。【環境・費用】京都駅徒歩圏。生活指導と学業指導が一体となった盤石の指導体制が強みです。",
    child_summary: "東寺の五重塔がすぐ目の前にある歴史ある学校！京大に日本一合格していて、勉強もスポーツも本気でやりきるかっこいい先輩たちがいっぱい！",
    tags: ["interest_reading_history", "interest_puzzle_math", "interest_sports_athletics"],
    interest_category_label: "伝統・京大実績・文武両道",
    is_favorite: false
  },
  {
    school_id: "sch_todaiji",
    name: "東大寺学園中学校",
    name_ruby: "とうだいじがくえんちゅうがっこう",
    official_url: "https://www.tdj.ac.jp/",
    catchphrase: "東大寺の森のなか。自由闊達と高い知性を育む伝統男子校",
    recommend_phrase: "★ 緑豊かな自然に囲まれ、自由で縛られない環境でのびのび学びたい人におすすめ！",
    photo_url: "assets/images/real_azabu.jpg",
    prefecture: "奈良県",
    district: "奈良市",
    station_name: "高の原駅",
    access_info: {
      primary_line: "近鉄京都線",
      hub_station: "大和西大寺駅 / 京都駅",
      walk_minutes: 20,
      bus_minutes: 5,
      school_bus: false,
      school_bus_note: "近鉄京都線高の原駅より奈良交通直通路線バス5分、または徒歩20分"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 30,
    tuition: 790000,
    gender_type: "boys",
    category: "private",
    religion: "buddhist",
    university_path: "prep",
    atmospheres: ["free"],
    vibe_label: "自由・自然・東大京大実績",
    club_label: "自由",
    record_label: "◎",
    deviation_score: 70,
    match_rate_child: 96,
    recent_passed_records: "東大・京大・国公立医学部合格率全国屈指",
    events: [
      { id: "ev_tdj_fes", title: "菁々祭（文化祭）", date: "9月6日(土)・7日(日)", type: "文化祭", desc: "自由な男子校の活気が爆発！巨大ゲートや本格的な学術研究展示が見所！" }
    ],
    special_classes: [
      { title: "東大寺境内フィールドワーク", desc: "国宝や世界遺産の歴史の深みを、僧侶でもある教員から直接学ぶ贅沢な探究！" }
    ],
    school_strengths: [
      "東大・京大・医学部への抜群の現役進学率！",
      "校則で生徒を縛らない、大らかで自由闊達な教育文化！",
      "奈良の豊かな緑に囲まれた広大なキャンパスと静かな学習環境！"
    ],
    life_simulation: "高の原駅からスクールエリアを通って登校。放課後は自由なサークル活動や図書室での読書、仲間との議論を時間を忘れて楽しみます。",
    parent_summary: "【進学・教育】東大寺が創設した完全中高一貫男子校。東大・京大・国公立医学部へ毎年抜群の合格者数を送り出す関西最高峰の一角。【環境・費用】奈良市北部の緑豊かな文教地区。自主自律を尊重し、細かい制約を設けずに生徒自身の知的好奇心を大きく伸ばします。",
    child_summary: "自然がいっぱいの広い学校！校則がほとんどなくてすごく自由！面白い研究をしている友達や先生と一緒に、毎日思いきり好きなことに没頭できるよ！",
    tags: ["interest_nature_biology", "interest_puzzle_math", "interest_reading_history"],
    interest_category_label: "自由・自然・東大京大",
    is_favorite: false
  },

  // ==================== 中国・四国 ====================
  {
    school_id: "sch_hiroshima_gakuin",
    name: "広島学院中学校",
    name_ruby: "ひろしまがくいんちゅうがっこう",
    official_url: "https://www.hiroshimagakuin.ed.jp/",
    catchphrase: "他者のために、他者とともに。高い知性と奉仕の精神を育むイエズス会男子校",
    recommend_phrase: "★ 広島市街を見下ろす丘の上で、手厚い学習指導と豊かな人間性を育みたい人におすすめ！",
    photo_url: "assets/images/real_kaisei.jpg",
    prefecture: "広島県",
    district: "広島市西区",
    station_name: "西広島駅",
    access_info: {
      primary_line: "JR山陽本線・広電宮島線",
      hub_station: "広島駅",
      walk_minutes: 15,
      bus_minutes: 10,
      school_bus: false,
      school_bus_note: "JR西広島駅・広電西広島駅より広電バス「学院前」下車、または高須駅徒歩15分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 740000,
    gender_type: "boys",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "イエズス会・手厚い・医学部実績",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 65,
    match_rate_child: 94,
    recent_passed_records: "東大・京大・広大医学部をはじめとする難関国公立大学多数合格",
    events: [
      { id: "ev_gakuin_fes", title: "翠陵祭（文化祭）", date: "10月4日(土)・5日(日)", type: "文化祭", desc: "学術展示や演劇、伝統のクラブ発表など生徒の活気が溢れる名物祭！" }
    ],
    special_classes: [
      { title: "マグラブ（総合探究・奉仕活動）", desc: "社会の課題に目を向け、他者のために自分ができる行動を実践する探究学習！" }
    ],
    school_strengths: [
      "中国地方トップクラスの東大・京大・国公立医学部合格実績！",
      "栄光学園・六甲学院・上智大学と同じイエズス会教育の強固なグローバルネットワーク！",
      "自然あふれる翠陵の丘にある静かで集中できる学習環境！"
    ],
    life_simulation: "西広島駅から丘を登って清々しい空気の校舎へ。放課後は充実した自習スペースやグラウンドで仲間と励まし合い、知性とたくましさを育みます。",
    parent_summary: "【進学・教育】イエズス会修道会設立の完全中高一貫男子校。中国地方最高峰の進学実績を誇り、特に医学部・難関国公立大への現役合格率が高い。【環境・費用】広島市西区の閑静な丘の上。徹底した基礎学力の養成と人間教育が両立しています。",
    child_summary: "見晴らしのいい丘の上にあるかっこいい学校！勉強もしっかり教えてもらえて、部活や行事も仲間と熱中できる最高の男子校だよ！",
    tags: ["interest_reading_history", "interest_science_space", "interest_social_events"],
    interest_category_label: "伝統・医学部実績・男子校",
    is_favorite: false
  },
  {
    school_id: "sch_aiko",
    name: "愛光中学校",
    name_ruby: "あいこうちゅうがっこう",
    official_url: "https://www.aiko.ed.jp/",
    catchphrase: "世界的教養人を育てる。四国最高峰の進学実績を誇るカトリック共学校",
    recommend_phrase: "★ 松山市内からアクセス良好！全国から集まるハイレベルな仲間と切磋琢磨したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "愛媛県",
    district: "松山市",
    station_name: "松山駅",
    access_info: {
      primary_line: "JR予讃線・伊予鉄道",
      hub_station: "松山駅",
      walk_minutes: 0,
      bus_minutes: 15,
      school_bus: true,
      school_bus_note: "JR松山駅・伊予鉄松山市駅より直通スクールバス運行（約15分）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科（寮生・通学生併設）",
    commute_time: 25,
    tuition: 820000,
    gender_type: "coed",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["both", "global"],
    vibe_label: "四国最高峰・全国区・カトリック",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 66,
    match_rate_child: 95,
    recent_passed_records: "東大・京大・国公立大学医学部現役合格率四国第1位",
    events: [
      { id: "ev_aiko_fes", title: "愛光祭（文化祭）", date: "9月14日(日)", type: "文化祭", desc: "寮生と通学生が一体となって創り出すエネルギッシュな展示と模擬店！" }
    ],
    special_classes: [
      { title: "スペイン・ドミニコ会発祥の倫理探究", desc: "愛と光の理念に基づき、真理を探究するグローバル思考の特別講義！" }
    ],
    school_strengths: [
      "東大・京大・国公立医学部合格実績で四国ダントツの日本屈指の名門進学校！",
      "松山駅から専用直通スクールバス運行で通学も安心・快適！",
      "全国から集まる志の高い仲間と生活・学習を共にできる豊かな環境！"
    ],
    life_simulation: "松山駅からの専用バスで爽やかな校舎へ登校。密度の高い授業に取り組み、放課後は図書館や自習室で仲間と勉強。週末は部活動にも熱中します。",
    parent_summary: "【進学・教育】カトリック・ドミニコ会創設の完全中高一貫共学校。四国No.1の大学進学実績を誇り、東大・国公立医学部へ多数合格。【環境・費用】松山市衣山。直通スクールバスを運行。寮制教育のノウハウを活かしたきめ細かな自立指導が強みです。",
    child_summary: "四国で一番頭がいいと言われるすごい学校！全国からいろんな友達が集まっていて、理科の実験室や図書室も大きくてワクワクするよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_social_events"],
    interest_category_label: "四国最高峰・全国区・寮",
    is_favorite: false
  },

  // ==================== 九州・沖縄 ====================
  {
    school_id: "sch_kurume_fusetsu",
    name: "久留米大学附設中学校",
    name_ruby: "くるめだいがくふせつちゅうがっこう",
    official_url: "https://www.kurume-u.ac.jp/site/fusetsu/",
    catchphrase: "豊かな人間性と高い学力。九州最高峰の知性を育む共学校",
    recommend_phrase: "★ 九州全域から集まるトップクラスの仲間とともに、東大・医学部を目指したい人におすすめ！",
    photo_url: "assets/images/real_hiroo.jpg",
    prefecture: "福岡県",
    district: "久留米市",
    station_name: "西鉄久留米駅",
    access_info: {
      primary_line: "西鉄天神大牟田線・JR鹿児島本線",
      hub_station: "西鉄福岡（天神）駅 / 博多駅",
      walk_minutes: 0,
      bus_minutes: 15,
      school_bus: true,
      school_bus_note: "西鉄久留米駅・JR久留米駅より直通西鉄通学バス運行（約15分）、福岡天神・博多からも直通快速で通学圏"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 35,
    tuition: 780000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "free"],
    vibe_label: "九州最高峰・共学・医学部実績",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 70,
    match_rate_child: 97,
    recent_passed_records: "東大現役合格者数多数・九大医学部合格者数日本一",
    events: [
      { id: "ev_fusetsu_fes", title: "附設祭（文化祭）", date: "9月27日(土)・28日(日)", type: "文化祭", desc: "学術展示からバンド、演劇まで生徒が自主自律で運営する熱気あふれる2日間！" }
    ],
    special_classes: [
      { title: "大学レベルの知的好奇心ゼミ", desc: "教科書を超えた学問の真髄に触れる、教員オリジナル教材による探究授業！" }
    ],
    school_strengths: [
      "東大・九大医学部への合格実績で九州No.1！",
      "福岡市内（天神・博多）からも西鉄電車・JRの快速で無理なく通学可能！",
      "男女共学の明るく自由闊達な雰囲気の中で、互いをリスペクトし合える環境！"
    ],
    life_simulation: "西鉄久留米駅からの通学バスで校舎へ。朝から集中して高度な授業を受け、放課後は仲間とディスカッションしたり部活でリフレッシュ。充実した青春の日々です。",
    parent_summary: "【進学・教育】九州を代表する最高峰の共学中高一貫校。東大および国公立大医学部への現役合格率が極めて高く、自立した学習姿勢を育成します。【環境・費用】福岡市内からも多くの生徒が通学。細かい校則で縛らず、生徒の自主性を重んじる自由闊達な校風です。",
    child_summary: "九州でトップクラスの共学校！勉強がすごくできるのに、みんな明るくて面白い！部活動も文化祭も本気で楽しめる最高の環境だよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_social_events"],
    interest_category_label: "九州最高峰・共学・医進",
    is_favorite: false
  },
  {
    school_id: "sch_lasalle",
    name: "ラ・サール中学校",
    name_ruby: "らさーるちゅうがっこう",
    official_url: "https://www.lasalle.ed.jp/",
    catchphrase: "信仰・希望・愛。義務を果たす自律心と全国屈指の学力を誇るカトリック男子校",
    recommend_phrase: "★ 規律正しく整った環境で、全国から集まる仲間と一生モノの絆を結びたい人におすすめ！",
    photo_url: "assets/images/real_kaisei.jpg",
    prefecture: "鹿児島県",
    district: "鹿児島市",
    station_name: "谷山駅",
    access_info: {
      primary_line: "JR指宿枕崎線・鹿児島市電",
      hub_station: "鹿児島中央駅",
      walk_minutes: 8,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "市電谷山電停より徒歩8分、JR谷山駅より徒歩15分（鹿児島中央駅からJR約12分）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（全寮制・通学制併設）",
    commute_time: 25,
    tuition: 820000,
    gender_type: "boys",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["both", "support"],
    vibe_label: "名門・文武両道・寮生活",
    club_label: "非常に盛ん",
    record_label: "◎",
    deviation_score: 68,
    match_rate_child: 96,
    recent_passed_records: "東大・京大・国公立大医学部合格実績全国トップクラス",
    events: [
      { id: "ev_lasalle_fes", title: "ラ・サール学園祭", date: "9月20日(土)・21日(日)", type: "文化祭", desc: "寮生と通学生が力を合わせた熱気あふれる展示・ステージ発表！" }
    ],
    special_classes: [
      { title: "夜間自習指導・チューターゼミ", desc: "教員とOBが一体となって一人ひとりの質問に徹底的に答える学習指導！" }
    ],
    school_strengths: [
      "東大・国公立医学部合格実績で全国に名を轟かせる伝統の名門男子校！",
      "鹿児島中央駅から電車で約12分、谷山駅から徒歩圏内の好立地！",
      "「兄弟愛」で結ばれた強固な同窓生ネットワークが生涯の財産になる！"
    ],
    life_simulation: "谷山駅から松林の風を感じて登校。密度の高い授業と放課後の部活動、夜は自習室で徹底的に学習。仲間と寝食を共にし、自立心を大きく育みます。",
    parent_summary: "【進学・教育】ラ・サール修道会設立の完全中高一貫男子校。東大・国公立医学部への圧倒的な進学実績。規則正しい生活習慣と自律の精神を確立させます。【環境・費用】鹿児島市小松原。鹿児島中央駅からJRで直通。全国から志の高い生徒が集まります。",
    child_summary: "全国的に有名なすごい男子校！運動も勉強もみんな一生懸命で、先生たちも熱心。一生付き合える最高の親友ができる学校だよ！",
    tags: ["interest_sports_athletics", "interest_puzzle_math", "interest_social_events"],
    interest_category_label: "名門男子・寮・全国区",
    is_favorite: false
  },
  {
    school_id: "sch_showa_yakka",
    name: "昭和薬科大学附属中学校",
    name_ruby: "しょうわやっかだいがくふぞくちゅうがっこう",
    official_url: "https://www.showayakka-jh.ed.jp/",
    catchphrase: "高い知性と豊かな人間性。沖縄県内トップの大学進学実績を誇る共学校",
    recommend_phrase: "★ スクールバス完備！沖縄で国公立大・医学部を目指して手厚く学びたい人におすすめ！",
    photo_url: "assets/images/real_shibaura.jpg",
    prefecture: "沖縄県",
    district: "浦添市",
    station_name: "てだこ浦西駅",
    access_info: {
      primary_line: "ゆいレール（沖縄都市モノレール）",
      hub_station: "県庁前駅 / 那覇空港駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: true,
      school_bus_note: "ゆいレールてだこ浦西駅・那覇市内各所より学校専用スクールバス直通運行（約10〜15分）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 690000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "support"],
    vibe_label: "沖縄最高峰・理系・手厚い",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 62,
    match_rate_child: 94,
    recent_passed_records: "東大・京大・琉球大医学部をはじめとする難関国公立大学へ県内最多合格",
    events: [
      { id: "ev_showa_fes", title: "薬附祭（文化祭）", date: "10月18日(土)・19日(日)", type: "文化祭", desc: "科学実験展示、英語プレゼンテーション、活気あふれる舞台発表！" }
    ],
    special_classes: [
      { title: "メディカル＆サイエンス探究ゼミ", desc: "医師や薬学研究者による特別講義と本格的な理科実験カリキュラム！" }
    ],
    school_strengths: [
      "沖縄県内でNo.1の国公立大医学部・難関大合格実績！",
      "ゆいレールてだこ浦西駅や那覇市内各方面から充実の直通スクールバス運行！",
      "緑豊かな浦添の高台にある、開放的で静かな学習環境！"
    ],
    life_simulation: "専用スクールバスで浦添の丘の上にあるキャンパスへ登校。放課後は自習室や質問コーナーで疑問を解決し、部活動にも積極的に取り組みます。",
    parent_summary: "【進学・教育】沖縄県内トップの進学校として名高い完全中高一貫共学校。琉球大学医学部をはじめとする全国の医学部・難関国公立大へ抜群の合格実績。【環境・費用】浦添市。モノレール駅等からスクールバスを運行し、安全な通学路を確保しています。",
    child_summary: "沖縄でいちばん頭がいいと言われる憧れの学校！理科の実験室が充実していて、お医者さんや科学者を目指す仲間と一緒に楽しく勉強できるよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_crafting_making"],
    interest_category_label: "沖縄最高峰・理数・医進",
    is_favorite: false
  },

  // ==================== 47都道府県追加代表校 ====================
// ==================== 東北追加 ====================
  {
    school_id: "sch_iwate_fuzoku",
    name: "岩手大学教育学部附属中学校",
    name_ruby: "いわてだいがくきょういくがくぶふぞくちゅうがっこう",
    official_url: "https://www.edu.iwate-u.ac.jp/fuchu/",
    catchphrase: "自ら学び深く探究する、自主自立の精神を育む岩手県の名門国立中",
    recommend_phrase: "★ 高い知的好奇心と自由闊達な仲間とともに、深い探究学習に打ち込みたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "岩手県",
    district: "盛岡市上田",
    station_name: "盛岡駅",
    access_info: {
      primary_line: "JR東北本線・IGRいわて銀河鉄道",
      hub_station: "盛岡駅",
      walk_minutes: 5,
      bus_minutes: 10,
      school_bus: false,
      school_bus_note: "盛岡駅東口より岩手県交通バス「岩手大学前」下車徒歩2分"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 220000,
    gender_type: "coed",
    category: "national",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "stem"],
    vibe_label: "自主探究・自由",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 92,
    recent_passed_records: "盛岡第一高校など県内最難関高校・難関大へ圧倒的な進学実績",
    events: [
      { id: "ev_iwate_setsumei", title: "学校説明会＆施設見学", date: "9月27日(土)", type: "学校説明会", desc: "大学キャンパスに隣接した緑豊かな教育環境と探究授業を公開します。" }
    ],
    special_classes: [
      { title: "大学連携サイエンス探究", desc: "岩手大学の教授・研究室と連携したハイレベルな実験・フィールドワーク！" }
    ],
    school_strengths: ["岩手県トップクラスの学習意欲の高い仲間が集う学習環境！", "国立大学連携による先端的な教育プログラム！"],
    life_simulation: "盛岡駅から自転車や路線バスで登校。大学キャンパス隣接の開放的な環境で主体的な課題研究に取り組みます。",
    parent_summary: "【進学・教育】岩手県内トップの教育水準を誇る国立中。盛岡第一高校などトップ高への合格者を多数輩出。【環境・費用】国立のため授業料無償（諸経費のみ）。",
    child_summary: "みんなで調べたり実験したりする授業がとっても面白い！岩手で一番勉強や部活に熱中できる学校だよ！",
    tags: ["interest_science_space", "interest_digital_tech", "interest_reading_history"],
    interest_category_label: "岩手最高峰・国立探究",
    is_favorite: false
  },
  {
    school_id: "sch_akita_minami",
    name: "秋田県立秋田南高等学校中等部",
    name_ruby: "あきたけんりつあきたみなみこうとうがっこうちゅうとうぶ",
    official_url: "https://akitaminami-h.wixsite.com/akitaminami",
    catchphrase: "グローバルリーダーの育成！豊かな教養と発信力を磨く公立中高一貫校",
    recommend_phrase: "★ 英語や国際交流に興味があり、秋田から世界へ羽ばたきたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "秋田県",
    district: "秋田市南通",
    station_name: "羽後牛島駅",
    access_info: {
      primary_line: "JR羽越本線・奥羽本線",
      hub_station: "秋田駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "秋田駅より路線バス約12分、羽後牛島駅より徒歩10分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科中高一貫",
    commute_time: 25,
    tuition: 180000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["global", "both"],
    vibe_label: "グローバル・文武両道",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 59,
    match_rate_child: 93,
    recent_passed_records: "東大・東北大・国際教養大（AIU）をはじめとする難関国公立大学多数合格",
    events: [
      { id: "ev_akita_open", title: "中等部オープンスクール", date: "10月4日(土)", type: "体験授業", desc: "英語アクティブラーニングや中高合同の部活動体験を実施します。" }
    ],
    special_classes: [
      { title: "グローバルイングリッシュ・ワークショップ", desc: "ネイティブ教員や留学生と英語で白熱したディスカッションを行う体験授業！" }
    ],
    school_strengths: ["秋田県の公立中高一貫トップ校としての手厚い指導！", "国際教養大学（AIU）との連携教育！"],
    life_simulation: "秋田駅周辺や羽後牛島駅から自転車で登校。放課後は充実した文化系・運動系の部活動で仲間と切磋琢磨します。",
    parent_summary: "【進学・教育】秋田県初の県立中高一貫校。高い英語発信力と難関国公立大学進学実績が強み。【費用】公立校のため学費負担が極めて少ないのが魅力です。",
    child_summary: "英語をたくさん話せるようになったり、みんなの前で堂々と発表できるようになるかっこいい学校だよ！",
    tags: ["interest_social_events", "interest_digital_tech", "interest_reading_history"],
    interest_category_label: "秋田・公立一貫・国際教養",
    is_favorite: false
  },
  {
    school_id: "sch_toohhoku_sakura",
    name: "山形県立東桜学館中学校",
    name_ruby: "やまがたけんりつとうおうがっかんちゅうがっこう",
    official_url: "https://www.touohgakkan-jhh.ed.jp/",
    catchphrase: "未来を拓く高い志！理数教育と人間力を培う山形の県立中高一貫校",
    recommend_phrase: "★ 充実した実験設備とICTで、科学技術や社会課題の解決に挑みたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "山形県",
    district: "東根市中央南",
    station_name: "さくらんぼ東根駅",
    access_info: {
      primary_line: "山形新幹線・JR奥羽本線",
      hub_station: "山形駅",
      walk_minutes: 12,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "さくらんぼ東根駅東口より徒歩12分、自転車通学多数"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科中高一貫",
    commute_time: 30,
    tuition: 180000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "both"],
    vibe_label: "理数探究・文武両道",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 91,
    recent_passed_records: "東大・東北大・山形大学医学部など難関大へ現役合格多数",
    events: [
      { id: "ev_sakura_bunkasai", title: "東桜祭（文化祭）", date: "9月13日(土)", type: "文化祭", desc: "科学部・ロボコン展示や生徒主体のステージ発表が盛り上がります。" }
    ],
    special_classes: [
      { title: "東桜探究（理数サイエンスプログラム）", desc: "地元企業や大学と連携したフィールドワーク＆科学実験！" }
    ],
    school_strengths: ["文部科学省スーパーサイエンスハイスクール（SSH）指定校！", "最新の実験室・ICT講義室完備の近代キャンパス！"],
    life_simulation: "さくらんぼ東根駅から自転車で登校。広大なグラウンドと近代的な校舎で思いっきり学びと部活に打ち込みます。",
    parent_summary: "【進学・教育】山形県内唯一の県立中等一貫校。SSH指定による先端理数教育と高い進学実績が強み。【費用】公立校。",
    child_summary: "新しくてピカピカの実験室やパソコン室がたくさん！理科の実験やロボット作りが大好きな子に最高だよ！",
    tags: ["interest_science_space", "interest_digital_tech", "interest_crafting_making"],
    interest_category_label: "山形・公立一貫・理数SSH",
    is_favorite: false
  },
  {
    school_id: "sch_fukushima_seikei",
    name: "福島成蹊中学校",
    name_ruby: "ふくしませいけいちゅうがっこう",
    official_url: "https://www.f-seikei.ed.jp/",
    catchphrase: "桃李もの言わざれども下自ずから蹊を成す。手厚い個別指導と高い進学力の中高一貫校",
    recommend_phrase: "★ 先生方の手厚いサポートを受けながら、難関大学や医学部を本気で目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "福島県",
    district: "福島市腰浜町",
    station_name: "福島駅",
    access_info: {
      primary_line: "JR東北本線・山形新幹線・阿武隈急行",
      hub_station: "福島駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: true,
      school_bus_note: "JR福島駅東口より専用スクールバスおよび福島交通バス直通約10分運行"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "一貫コース（中高一貫）",
    commute_time: 25,
    tuition: 680000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "手厚い補習・難関進学",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 90,
    recent_passed_records: "東大・東北大・福島県立医科大医学部など国公立大多数合格",
    events: [
      { id: "ev_seikei_taiken", title: "プレテスト＆体験オープンスクール", date: "10月18日(土)", type: "体験授業", desc: "入試体験と先輩たちの学校生活紹介、実験教室を実施します。" }
    ],
    special_classes: [
      { title: "放課後ステップアップ個別ゼミ", desc: "放課後の自習室で専任教員がマンツーマンで疑問に答える徹底演習！" }
    ],
    school_strengths: ["一人ひとりの進度に応じた手厚い学習サポート！", "駅からの直通スクールバス運行で通学も安心！"],
    life_simulation: "福島駅から専用スクールバスで校門前まで直行。放課後は自習館で集中して課題や質問学習を行います。",
    parent_summary: "【進学・教育】福島県トップクラスの私立中高一貫進学校。塾いらずの手厚い学習支援と医学部・難関大実績。【通学】福島駅直通バス完備。",
    child_summary: "先生がいつも優しく勉強を教えてくれるから安心！みんなで楽しく教え合いながら学べるあったかい学校だよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_digital_tech"],
    interest_category_label: "福島・私立共学・手厚い医進",
    is_favorite: false
  },

  // ==================== 関東追加 ====================
  {
    school_id: "sch_meikei",
    name: "茗溪学園中学校",
    name_ruby: "めいけいがくえんちゅうがっこう",
    official_url: "https://www.meikei.ac.jp/",
    catchphrase: "国際バカロレア（IB）認定校！豊かな自然と世界標準の探究教育を実践する自由闊達な名門",
    recommend_phrase: "★ 荒川沖駅・つくば駅から直通スクールバスでアクセス抜群！世界基準の探究学習やラグビーなど課外活動に熱中したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "茨城県",
    district: "つくば市稲荷前",
    station_name: "荒川沖駅",
    access_info: {
      primary_line: "JR常磐線・つくばエクスプレス",
      hub_station: "荒川沖駅・ひたちのうしく駅・つくば駅",
      walk_minutes: 0,
      bus_minutes: 12,
      school_bus: true,
      school_bus_note: "JR荒川沖駅西口より学校専用直通スクールバス約12分（ひたちのうしく駅・つくば駅からも直通運行、自転車通学可）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "MG／IB（国際バカロレア）コース",
    commute_time: 15,
    tuition: 920000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["global", "stem", "free"],
    vibe_label: "国際IB・自由闊達",
    club_label: "盛ん（全国レベル）",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 96,
    recent_passed_records: "東大・筑波大・国公立大・早慶上智・海外有名大学へ多数進学",
    events: [
      { id: "ev_meikei_open", title: "茗溪学園 オープンキャンパス", date: "9月20日(土)", type: "体験授業", desc: "IB探究ワークショップや広大な自然キャンパスでの実験・部活体験ができます！" }
    ],
    special_classes: [
      { title: "個人課題研究（茗溪メソッド）", desc: "中学3年間にわたり自分の大好きなテーマをとことん追究して論文を執筆！" }
    ],
    school_strengths: [
      "荒川沖駅西口から専用スクールバス直通約12分の抜群の通学アクセス！",
      "国際バカロレア認定校としての高度な思考力・英語プレゼン教育！",
      "広大な緑に囲まれた恵まれたキャンパスで自主自律の精神を育成！"
    ],
    life_simulation: "荒川沖駅から直通バスで緑豊かな校舎へ。午前はグループディスカッション中心の授業、午後は広大なグラウンドで部活や個人研究に没頭します。",
    parent_summary: "【進学・教育】筑波研究学園都市の地の利を活かした先進教育。国際バカロレア（IB）認定校で海外大や難関大への高い進路実績。【環境・通学】荒川沖駅から直通スクールバス運行で通学安心。自由で伸びやかな校風が特徴です。",
    child_summary: "荒川沖駅から専用バスですぐ！大自然に囲まれた広いキャンパスで、自分の好きな研究や部活に夢中になれるワクワクがいっぱいの学校だよ！",
    tags: ["interest_science_space", "interest_digital_tech", "interest_sports_athletics", "interest_social_events"],
    interest_category_label: "国際IB・探究・自由闊達",
    is_favorite: false
  },
  {
    school_id: "sch_tsuchiura_nichidai",
    name: "土浦日本大学中等教育学校",
    name_ruby: "つちうらにほんだいがくちゅうとうきょういくがっこう",
    official_url: "https://www.tng.ac.jp/sec-sch/",
    catchphrase: "日本大学の充実した連携と高い進学指導。手厚いサポートで夢を育てる完全中高一貫校",
    recommend_phrase: "★ 土浦駅・荒川沖駅からスクールバスで直通！日大への進学権を確保しながら国公立大・難関大を目指したい人におすすめ！",
    photo_url: "assets/images/real_hiroo.jpg",
    prefecture: "茨城県",
    district: "土浦市小松ヶ丘町",
    station_name: "土浦駅",
    access_info: {
      primary_line: "JR常磐線",
      hub_station: "土浦駅・荒川沖駅・つくば駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: true,
      school_bus_note: "JR土浦駅東口・西口より学校直通バス約10分、荒川沖駅・つくば駅方面からもスクールバス運行（自転車通学可能）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "前期・後期中高一貫課程",
    commute_time: 15,
    tuition: 840000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "attached",
    atmospheres: ["both", "support"],
    vibe_label: "日大連携・文武両道",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 55,
    match_rate_child: 95,
    recent_passed_records: "日本大学各学部（医・歯・理工等）への特別推薦枠＋国公立大・早慶上理多数合格",
    events: [
      { id: "ev_tnichidai_setsu", title: "土浦日大中等 学校説明会・見学会", date: "10月4日(土)", type: "学校説明会", desc: "最新のICT学習施設や日大連携プログラムの魅力を詳しく紹介します。" }
    ],
    special_classes: [
      { title: "グローバルスタディ・ICT講座", desc: "1人1台タブレットを活用した少人数アクティブラーニングと英会話！" }
    ],
    school_strengths: [
      "土浦市内・荒川沖駅から直通アクセス＆充実のスクールバス網！",
      "日本大学への内部推薦権を保持したまま国公立大学への挑戦が可能！",
      "放課後の手厚い習熟度別補習体制で塾いらずの手厚い学習環境！"
    ],
    life_simulation: "土浦駅や荒川沖駅からバスまたは自転車で元気に登校。放課後は最新の自習室で勉強したり、部活動で仲間と切磋琢磨します。",
    parent_summary: "【進学・教育】日本大学の附属連携メリットを最大限に活かしつつ、難関国公立大学への手厚い進学指導体制を完備。【環境・通学】土浦市内立地で荒川沖駅からも至近。安全な通学環境と面倒見の良い指導が好評です。",
    child_summary: "土浦駅や荒川沖駅からバスや自転車ですぐ！勉強も部活も両方思いっきり楽しめて、先生がいつでも優しく教えてくれるよ！",
    tags: ["interest_science_space", "interest_sports_athletics", "interest_reading_history"],
    interest_category_label: "日大附属連携・手厚い指導・文武両道",
    is_favorite: false
  },
  {
    school_id: "sch_edotoride",
    name: "江戸川学園取手中学校",
    name_ruby: "えどがわがくえんとりでちゅうがっこう",
    official_url: "https://www.e-t.ed.jp/",
    catchphrase: "心豊かなリーダーを育てる規律ある進学校。医科・東大・難関大コース編成",
    recommend_phrase: "★ 医学部や最難関大を目指し、充実した理科実験室や規律ある環境で学びたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "茨城県",
    district: "取手市西",
    station_name: "取手駅",
    access_info: {
      primary_line: "JR常磐線・関東鉄道常総線",
      hub_station: "取手駅・柏駅",
      walk_minutes: 0,
      bus_minutes: 8,
      school_bus: true,
      school_bus_note: "JR取手駅西口より学校直通スクールバス約8分運行（TX守谷駅からも直通バス有）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "医科／東大／難関大ジュニアコース",
    commute_time: 30,
    tuition: 890000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "manners"],
    vibe_label: "医科進学・情操規律",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 62,
    match_rate_child: 94,
    recent_passed_records: "国公立大医学部・東大・京大・早慶上智など毎年多数の合格実績",
    events: [
      { id: "ev_edo_bunkasai", title: "紫峰祭（文化祭）", date: "9月27日(土)・28日(日)", type: "文化祭", desc: "医科コースの研究発表やロボット展示、迫力ある演劇など見どころ満載！" }
    ],
    special_classes: [
      { title: "医科ジュニア探究講座", desc: "大学病院の現役医師による特別講義や医療倫理ディスカッション！" }
    ],
    school_strengths: ["茨城県内屈指の医学部・難関大合格実績！", "充実のスクールバス網（取手駅・守谷駅発着）！"],
    life_simulation: "取手駅や守谷駅からスクールバスで緑豊かな広大なキャンパスへ。放課後は自習スペースや部活動で充実した時間を過ごします。",
    parent_summary: "【進学・教育】コース制教育により中学生から目的意識高く学べる私立中。道徳教育と医学部・難関大実績の両立。【通学】複数駅からスクールバス運行。",
    child_summary: "お医者さんや科学者になりたい夢を本気で応援してくれる！先生も優しくて実験がたくさんできるよ！",
    tags: ["interest_science_space", "interest_digital_tech", "interest_reading_history"],
    interest_category_label: "茨城名門・医科コース・進学",
    is_favorite: false
  },
  {
    school_id: "sch_sano_nichidai",
    name: "佐野日本大学中等教育学校",
    name_ruby: "さのにほんだいがくちゅうとうきょういくがっこう",
    official_url: "https://ss.sano-nichidai.jp/",
    catchphrase: "6カ年一貫教育でグローバルリーダーを育成！日大連携と難関国立進学を両立",
    recommend_phrase: "★ 日本大学への進学権を確保しながら、難関国立大学や海外大学にも挑戦したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "栃木県",
    district: "佐野市石塚町",
    station_name: "佐野駅",
    access_info: {
      primary_line: "東武佐野線・JR両毛線",
      hub_station: "佐野駅・小山駅・足利駅",
      walk_minutes: 0,
      bus_minutes: 15,
      school_bus: true,
      school_bus_note: "佐野駅・小山駅・足利駅・太田駅・館林駅等各方面から充実の広域直通スクールバス運行"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "前期課程（中高一貫）",
    commute_time: 35,
    tuition: 820000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "attached",
    atmospheres: ["both", "global"],
    vibe_label: "大学連携・文武両道",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 55,
    match_rate_child: 89,
    recent_passed_records: "日本大学各学部（医学部含む）への推薦枠＋国公立大・早慶上理多数合格",
    events: [
      { id: "ev_sano_open", title: "オープンスクール＆部活体験", date: "10月11日(土)", type: "体験授業", desc: "広大な人工芝グラウンドや全天候型スポーツ施設、ICT授業を体験できます。" }
    ],
    special_classes: [
      { title: "日大連携アカデミックプログラム", desc: "日本大学理工学部・歯学部等との共同セミナーや先端研究体験！" }
    ],
    school_strengths: ["広大なキャンパスに全国トップレベルのスポーツ・文化施設完備！", "北関東各県を網羅する安心安全なスクールバス網！"],
    life_simulation: "自宅近くの発着所から直通スクールバスで楽々登校。放課後は最新設備の中で部活動や自習に取り組みます。",
    parent_summary: "【進学・教育】日本大学の附属校としての安心感と難関大進学指導のハイブリッド。【通学】栃木・群馬・埼玉・茨城各方面からスクールバス運行。",
    child_summary: "広い人工芝のグラウンドや体育館がすごい！勉強も部活もどっちも全力で楽しみたい人にぴったりだよ！",
    tags: ["interest_sports_athletics", "interest_digital_tech", "interest_social_events"],
    interest_category_label: "栃木名門・大学連携・総合力",
    is_favorite: false
  },
  {
    school_id: "sch_gunma_fuzoku",
    name: "群馬大学共同教育学部附属中学校",
    name_ruby: "ぐんまだいがくきょうどうきょういくがくぶふぞくちゅうがっこう",
    official_url: "https://jhs.edu.gunma-u.ac.jp/",
    catchphrase: "自由と責任を重んじ、高い知性と豊かな情操を育む群馬県の名門国立中学校",
    recommend_phrase: "★ 伝統ある自主的な校風の中で、仲間と議論し高め合う深い学びをしたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "群馬県",
    district: "前橋市上沖町",
    station_name: "中央前橋駅",
    access_info: {
      primary_line: "上毛電気鉄道・JR両毛線",
      hub_station: "前橋駅・高崎駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "中央前橋駅より徒歩10分、JR前橋駅より自転車約15分または路線バス"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 240000,
    gender_type: "coed",
    category: "national",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "stem"],
    vibe_label: "自由闊達・自主研究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 59,
    match_rate_child: 92,
    recent_passed_records: "前橋高校・高崎高校・前橋女子高・高崎女子高など県内最上位校へ毎年多数進学",
    events: [
      { id: "ev_gunma_setsumei", title: "学校説明会＆公開授業", date: "10月25日(土)", type: "学校説明会", desc: "大学研究校ならではの質の高い授業参観と教育方針を詳しく説明します。" }
    ],
    special_classes: [
      { title: "探究リサーチゼミ", desc: "自らテーマを設定して1年間調査研究を行う本格的な探究活動！" }
    ],
    school_strengths: ["群馬県内トップレベルの学力層が集う切磋琢磨の環境！", "国立大学附属ならではの自由で先進的なカリキュラム！"],
    life_simulation: "前橋駅や中央前橋駅から自転車でイチョウ並木を通って登校。生徒会活動や合唱祭など生徒主体で熱狂的に取り組みます。",
    parent_summary: "【進学・教育】群馬県最難関の国立中学校。前橋高・高崎高をはじめとするトップ高校への登竜門。【費用】国立のため低負担。",
    child_summary: "自分でやりたいことをトコトン調べられる授業がすごく面白い！友達もみんな優しくて面白い人ばかりだよ！",
    tags: ["interest_reading_history", "interest_science_space", "interest_puzzle_math"],
    interest_category_label: "群馬最高峰・国立附属",
    is_favorite: false
  },

  // ==================== 甲信越・北陸追加 ====================
  {
    school_id: "sch_niigata_meikun",
    name: "新潟明訓中学校",
    name_ruby: "にいがためいくんちゅうがっこう",
    official_url: "https://www.niigata-meikun.ed.jp/",
    catchphrase: "信義と剛健。亀田の広大な新キャンパスで確かな学力と豊かな心を育てる私立中",
    recommend_phrase: "★ 素晴らしい自然環境と充実した設備で、勉強も部活動も高いレベルで両立したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "新潟県",
    district: "新潟市江南区亀田向陽",
    station_name: "亀田駅",
    access_info: {
      primary_line: "JR信越本線",
      hub_station: "新潟駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: true,
      school_bus_note: "JR新潟駅南口および亀田駅より学校直通バス多数運行（朝夕ピーク時5分間隔）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫コース",
    commute_time: 25,
    tuition: 690000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "support"],
    vibe_label: "文武両道・手厚い指導",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 57,
    match_rate_child: 91,
    recent_passed_records: "東大・東北大・新潟大学医学部など難関国公立大学へ高い合格実績",
    events: [
      { id: "ev_meikun_fes", title: "明訓祭（文化祭）", date: "9月6日(土)・7日(日)", type: "文化祭", desc: "広大なアリーナでのブラスバンド演奏やクラス展示、部活動公開が人気です。" }
    ],
    special_classes: [
      { title: "明訓メソッド探究ワーク", desc: "問題解決力とプレゼン力を高める少人数制アクティブラーニング授業！" }
    ],
    school_strengths: ["広大な敷地に充実した体育館・室内練習場・自習ブースを完備！", "新潟駅直結の直通バスで通学利便性抜群！"],
    life_simulation: "新潟駅から直通バスで緑豊かな亀田キャンパスへ。放課後は全国レベルの部活動や放課後個別指導に励みます。",
    parent_summary: "【進学・教育】新潟県を代表する伝統名門私立校。中高一貫による先取り学習と医学部・国公立大実績。【通学】新潟駅南口から直通バス完備。",
    child_summary: "とにかく校舎が広くてきれい！野球場も体育館も本格的で、部活も勉強も思いっきり打ち込めるよ！",
    tags: ["interest_sports_athletics", "interest_science_space", "interest_digital_tech"],
    interest_category_label: "新潟名門・文武両道・共学",
    is_favorite: false
  },
  {
    school_id: "sch_katayama_gakuen",
    name: "片山学園中学校",
    name_ruby: "かたやまがくえんちゅうがっこう",
    official_url: "https://www.katayamagakuen.jp/",
    catchphrase: "立志の学び舎。立山連峰を望む大自然の中で東大・国公立医学部をめざす",
    recommend_phrase: "★ 全寮制またはスクールバス通学で、手厚い徹底指導と豊かな人間力を身につけたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "富山県",
    district: "富山市東石坂町",
    station_name: "富山駅",
    access_info: {
      primary_line: "北陸新幹線・あいの風とやま鉄道・高山本線",
      hub_station: "富山駅",
      walk_minutes: 0,
      bus_minutes: 25,
      school_bus: true,
      school_bus_note: "JR富山駅・高岡駅・新高岡駅・魚津駅など富山県内全域より専用スクールバス運行（全寮制併設）"
    },
    can_walk: false,
    can_bicycle: false,
    course_name: "普通科（全寮制・通学制）",
    commute_time: 30,
    tuition: 840000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "東大医進・全寮制選択可",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 92,
    recent_passed_records: "東大・京大・富山大学医学部など国公立大・医学部へ驚異の現役進学率",
    events: [
      { id: "ev_katayama_open", title: "オープンキャンパス＆寮見学", date: "10月18日(土)", type: "学校説明会", desc: "快適な男子寮・女子寮の見学と個別進学相談、理科実験教室を実施！" }
    ],
    special_classes: [
      { title: "夜間学習サポーティング（寮・通学生共通）", desc: "夜間まで教員が常駐し、一人ひとりの疑問をその日のうちに完全解消！" }
    ],
    school_strengths: ["富山県内随一の東大・医学部進学実績を誇る完全中高一貫校！", "全国から生徒が集う安心安全な学生寮とスクールバス完備！"],
    life_simulation: "専用スクールバスまたは寮の食堂で朝食をとって登校。立山連峰を望む絶景の中で夜遅くまで手厚い指導を受けられます。",
    parent_summary: "【進学・教育】富山県唯一の私立中高一貫校。驚異的な医学部・東大合格実績。通学バスと学生寮を完備し学習に完全専念できる環境です。",
    child_summary: "立山連峰が見える大自然の学校！寮に入って全国の友達と暮らすこともできるし、バスで通うこともできるよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_social_events"],
    interest_category_label: "富山最高峰・全寮制併設・医進",
    is_favorite: false
  },
  {
    school_id: "sch_seiryo_junior",
    name: "星稜中学校",
    name_ruby: "せいりょうちゅうがっこう",
    official_url: "https://www.seiryo-hs.jp/jh/",
    catchphrase: "誠実にして社会に役立つ人間の育成。高い進学力と全国レベルの部活動",
    recommend_phrase: "★ 難関大学を目指す手厚い学習指導と、多彩で熱気あふれる部活動を両立させたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "石川県",
    district: "金沢市小坂町",
    station_name: "東金沢駅",
    access_info: {
      primary_line: "IRいしかわ鉄道",
      hub_station: "金沢駅",
      walk_minutes: 15,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "東金沢駅より徒歩15分（自転車5分）、金沢駅より北鉄バス直通あり"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中高一貫理数・進学コース",
    commute_time: 25,
    tuition: 680000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "support"],
    vibe_label: "文武両道・手厚い進学",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 90,
    recent_passed_records: "金沢大学医学部・難関国公立大学・難関私立大学へ多数合格",
    events: [
      { id: "ev_seiryo_open", title: "星稜中オープンスクール", date: "9月20日(土)", type: "体験授業", desc: "ICTを使った体験授業や部活動見学会、校内ツアーを実施します。" }
    ],
    special_classes: [
      { title: "星稜サイエンス＆キャリアゼミ", desc: "地元医療機関や企業で活躍する卒業生を招いた実践的なキャリア探究！" }
    ],
    school_strengths: ["全国に名を馳せる圧倒的なスポーツ・文化活動の実績！", "放課後補習や質問コーナーなどきめ細やかな学習指導体制！"],
    life_simulation: "東金沢駅や金沢市内から自転車や路線バスで登校。活気ある校舎で友達と切磋琢磨しながら放課後学習や部活に励みます。",
    parent_summary: "【進学・教育】石川県有数の伝統校。中高一貫の先取りカリキュラムと金沢大・医学部実績。【環境】文武両道のエネルギッシュな校風。",
    child_summary: "部活が全国レベルですごく活気がある！先輩たちも優しくて、勉強もスポーツも思いっきり頑張れる学校だよ！",
    tags: ["interest_sports_athletics", "interest_social_events", "interest_digital_tech"],
    interest_category_label: "石川名門・文武両道・活発",
    is_favorite: false
  },
  {
    school_id: "sch_fukui_fuzoku",
    name: "福井大学教育学部附属中学校",
    name_ruby: "ふくいだいがくきょういくがくぶふぞくちゅうがっこう",
    official_url: "https://www.f-edu.u-fukui.ac.jp/~fuzoku-j/",
    catchphrase: "自主・自律・協働。確かな知性と豊かな情操を育む福井県の最高峰国立中",
    recommend_phrase: "★ 質の高い探究的な授業で仲間と深く議論し、高い学力を身につけたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "福井県",
    district: "福井市二の宮",
    station_name: "福井駅",
    access_info: {
      primary_line: "ハピラインふくい・えちぜん鉄道",
      hub_station: "福井駅",
      walk_minutes: 0,
      bus_minutes: 12,
      school_bus: false,
      school_bus_note: "JR福井駅西口より京福バス「二の宮」下車徒歩3分、自転車通学多数"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 230000,
    gender_type: "coed",
    category: "national",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "stem"],
    vibe_label: "自主協働・探究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 92,
    recent_passed_records: "藤島高校をはじめとする県内最難関高校・難関大へ毎年抜群の進学実績",
    events: [
      { id: "ev_fukui_setsumei", title: "附属中等説明会＆授業公開", date: "10月25日(土)", type: "学校説明会", desc: "大学研究機関ならではの深い探究授業と生徒の自律的な学校生活を公開。" }
    ],
    special_classes: [
      { title: "大学連携課題研究プロジェクト", desc: "福井大学の先端研究施設を活用したサイエンスワークショップ！" }
    ],
    school_strengths: ["藤島高校への圧倒的な進学実績を誇る県内トップクラスの学習環境！", "生徒一人ひとりの主体的な発信力を育てる研究授業！"],
    life_simulation: "福井駅周辺から自転車で登校。緑に囲まれた静かなキャンパスで課題研究やディスカッションに熱中します。",
    parent_summary: "【進学・教育】福井県トップ校・藤島高校への登竜門として抜群の実績。【費用】国立のため授業料無償。",
    child_summary: "みんなで意見を出し合って問題を解決する授業が超面白い！藤島高校や難関大学を目指す仲間がたくさんいるよ！",
    tags: ["interest_reading_history", "interest_science_space", "interest_digital_tech"],
    interest_category_label: "福井最高峰・国立探究",
    is_favorite: false
  },
  {
    school_id: "sch_sundai_kofu",
    name: "駿台甲府中学校",
    name_ruby: "すんだいこうふちゅうがっこう",
    official_url: "https://www.sundai-kofu.ed.jp/",
    catchphrase: "駿台予備学校グループの圧倒的指導力！一人ひとりの夢を叶える山梨屈指の進学校",
    recommend_phrase: "★ 駿台グループならではの手厚い学習システムで、最難関大学・医学部を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "山梨県",
    district: "甲府市塩部",
    station_name: "甲府駅",
    access_info: {
      primary_line: "JR中央本線・身延線",
      hub_station: "甲府駅",
      walk_minutes: 0,
      bus_minutes: 8,
      school_bus: true,
      school_bus_note: "JR甲府駅北口より専用スクールバス約8分運行、自転車通学も可能"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫普通科",
    commute_time: 25,
    tuition: 740000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "駿台連携・医科進学",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 57,
    match_rate_child: 91,
    recent_passed_records: "東大・京大・山梨大学医学部など難関大・医学部に高い現役合格率",
    events: [
      { id: "ev_sundai_taiken", title: "駿台甲府オープンキャンパス", date: "10月11日(土)", type: "体験授業", desc: "駿台のノウハウを凝縮した知的好奇心を刺激する特別体験授業を実施！" }
    ],
    special_classes: [
      { title: "駿台アカデミックサプリ＆個別演習", desc: "駿台予備学校の最新データベースと直結した個別最適化学習指導！" }
    ],
    school_strengths: ["駿台グループの豊富な大学入試データと指導ノウハウ！", "甲府駅北口からの直通スクールバス運行で通学便利！"],
    life_simulation: "甲府駅からスクールバスで塩部キャンパスへ。放課後は自習室で専任チューターに質問しながら学習を深めます。",
    parent_summary: "【進学・教育】駿台予備学校系列の中高一貫校。山梨大学医学部をはじめ難関大への指導力は県内トップクラス。【通学】甲府駅スクールバス運行。",
    child_summary: "勉強のコツを先生が分かりやすく教えてくれるから、ぐんぐん問題が解けるようになって楽しい学校だよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_digital_tech"],
    interest_category_label: "山梨名門・駿台連携・医学部",
    is_favorite: false
  },
  {
    school_id: "sch_suwa_seiryo",
    name: "長野県諏訪清陵高等学校附属中学校",
    name_ruby: "ながのけんすわせいりょうこうとうがっこうふぞくちゅうがっこう",
    official_url: "https://fuzoku.suwaseiryo.ed.jp/",
    catchphrase: "自治の精神と高き知性。120余年の歴史と伝統を受け継ぐ長野の県立中高一貫校",
    recommend_phrase: "★ 伝統ある自主的な校風の中で、幅広い教養と探究心を高めたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "長野県",
    district: "諏訪市清水",
    station_name: "上諏訪駅",
    access_info: {
      primary_line: "JR中央本線",
      hub_station: "上諏訪駅・茅野駅・岡谷駅",
      walk_minutes: 15,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR上諏訪駅より徒歩約15分（または市内路線バス約5分）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中高一貫普通科",
    commute_time: 30,
    tuition: 190000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "both"],
    vibe_label: "自治自立・伝統進学",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 59,
    match_rate_child: 93,
    recent_passed_records: "東大・京大・東北大・信州大医学部をはじめとする難関国公立大へ多数合格",
    events: [
      { id: "ev_seiryo_setsumei", title: "附属中学校説明会＆見学会", date: "10月4日(土)", type: "学校説明会", desc: "諏訪湖を望む伝統あるキャンパスと探究的な学習の様子を紹介します。" }
    ],
    special_classes: [
      { title: "清陵探究イノベーション", desc: "信州の大自然や諏訪の精密機械産業と連携した本格的な探究プロジェクト！" }
    ],
    school_strengths: ["長野県内公立中高一貫校トップクラスの大学進学実績！", "生徒自治を重んじる自由闊達でエネルギッシュな校風！"],
    life_simulation: "上諏訪駅から諏訪湖の風を感じながら登校。放課後は生徒会活動や伝統の部活動で思いきり青春を謳歌します。",
    parent_summary: "【進学・教育】長野県を代表する公立中高一貫校。高い進学実績と自由自立の教育方針が共存。【費用】公立校。",
    child_summary: "自由で元気いっぱいな先輩がたくさん！自分たちの力でいろんなイベントを作っていくワクワクする学校だよ！",
    tags: ["interest_reading_history", "interest_science_space", "interest_sports_athletics"],
    interest_category_label: "長野名門・公立一貫・自治伝統",
    is_favorite: false
  },

  // ==================== 東海追加 ====================
  {
    school_id: "sch_uguisudani",
    name: "鶯谷中学校",
    name_ruby: "うぐいすだにちゅうがっこう",
    official_url: "https://uguisudani.ed.jp/",
    catchphrase: "自調自律。駅近の快適な学習環境で難関国公立大学現役合格をめざす",
    recommend_phrase: "★ 駅から徒歩圏内の安心通学と、一人ひとりに寄り添ったきめ細かい指導を重視したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "岐阜県",
    district: "岐阜市竜田町",
    station_name: "岐阜駅",
    access_info: {
      primary_line: "JR東海道本線・高山本線・名鉄名古屋本線",
      hub_station: "岐阜駅・名鉄岐阜駅",
      walk_minutes: 8,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR岐阜駅・名鉄岐阜駅より徒歩約8分（駅近・通学安心）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "英進コース（中高一貫）",
    commute_time: 20,
    tuition: 690000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "駅近・手厚い指導",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 90,
    recent_passed_records: "東大・名大・岐阜大学医学部など難関国公立大学へ多数合格",
    events: [
      { id: "ev_uguisu_open", title: "オープンスクール＆入試体験", date: "9月20日(土)", type: "体験授業", desc: "駅近キャンパスの見学と最新ICTを活用した体験授業を実施します。" }
    ],
    special_classes: [
      { title: "放課後個別ステップ演習", desc: "自習室と直結した個別添削指導で苦手科目を完全克服！" }
    ],
    school_strengths: ["JR岐阜駅・名鉄岐阜駅から徒歩8分の抜群の交通アクセス！", "少人数制ならではの丁寧で手厚い進路指導！"],
    life_simulation: "岐阜駅から駅前通りを通って徒歩8分で登校。雨の日も楽々通学でき、放課後は自習室で質問学習に集中できます。",
    parent_summary: "【進学・教育】岐阜県トップ私立共学校。名古屋大学や医学部など国公立大進学に実績。【通学】岐阜駅徒歩8分の安心立地。",
    child_summary: "駅から歩いてすぐだから通いやすい！先生がとっても親身で、勉強の分からないところをすぐ教えてくれるよ！",
    tags: ["interest_science_space", "interest_digital_tech", "interest_puzzle_math"],
    interest_category_label: "岐阜名門・駅近・手厚い指導",
    is_favorite: false
  },
  {
    school_id: "sch_shizuoka_seiko",
    name: "静岡聖光学院中学校",
    name_ruby: "しずおかせいこうがくいんちゅうがっこう",
    official_url: "https://www.s-seiko.ed.jp/",
    catchphrase: "世界を舞台に活躍するリーダーへ。豊かな自然と最先端ICTが融合する男子進学校",
    recommend_phrase: "★ 豊かな自然に抱かれた広大なキャンパスで、勉強もラグビー等の部活動も思いきりやり抜きたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "静岡県",
    district: "静岡市駿河区小鹿",
    station_name: "東静岡駅",
    access_info: {
      primary_line: "JR東海道本線・東海道新幹線",
      hub_station: "静岡駅・東静岡駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: true,
      school_bus_note: "JR東静岡駅南口および静岡駅より学校直通専用スクールバス運行（約10分）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫普通科",
    commute_time: 25,
    tuition: 820000,
    gender_type: "boys",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["both", "global"],
    vibe_label: "文武両道・キリスト教愛徳",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 57,
    match_rate_child: 91,
    recent_passed_records: "東大・名大・東北大・慶應・早稲田など難関大へ高い現役進学率",
    events: [
      { id: "ev_s_seiko_fes", title: "聖光祭（文化祭）", date: "10月4日(土)・5日(日)", type: "文化祭", desc: "男子校ならではの迫力あるステージ企画や科学実験、展示が満載！" }
    ],
    special_classes: [
      { title: "アウトドア・リーダーシッププログラム", desc: "自然の中でのチームビルディングや問題解決型ワークショップ！" }
    ],
    school_strengths: ["全国大会常連のラグビー部をはじめとする文武両道の伝統！", "キリスト教精神に基づく手厚い人間教育と国際教育！"],
    life_simulation: "東静岡駅から専用スクールバスで緑あふれる小鹿キャンパスへ。放課後はグラウンドや実験室で仲間と熱中します。",
    parent_summary: "【進学・教育】静岡県屈指のカトリック男子進学校。男子の成長特性に応じたメリハリある指導で難関大進学。【通学】東静岡駅からスクールバス運行。",
    child_summary: "男子校だから気兼ねなく何でも本音で話せる最高の仲間ができる！スポーツもゲームも勉強も全力投球できる学校だよ！",
    tags: ["interest_sports_athletics", "interest_science_space", "interest_social_events"],
    interest_category_label: "静岡名門・男子校・文武両道",
    is_favorite: false
  },
  {
    school_id: "sch_takada_mie",
    name: "高田中学校",
    name_ruby: "たかだちゅうがっこう",
    official_url: "https://www.mie-takada-hj.ed.jp/",
    catchphrase: "真宗高田派の仏教精神。三重県随一の進学実績を誇る伝統の名門中高一貫校",
    recommend_phrase: "★ 伝統ある落ち着いた環境で、高い志を持つ仲間とともに東大や医学部を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "三重県",
    district: "津市一身田町",
    station_name: "一身田駅",
    access_info: {
      primary_line: "JR紀勢本線・近鉄名古屋線",
      hub_station: "津駅・高田本山駅",
      walk_minutes: 5,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR一身田駅より徒歩5分、近鉄高田本山駅より徒歩20分（自転車可）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "6年制編入コース",
    commute_time: 25,
    tuition: 690000,
    gender_type: "coed",
    category: "private",
    religion: "buddhist",
    university_path: "prep",
    atmospheres: ["manners", "stem"],
    vibe_label: "三重最高峰・仏教情操",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 63,
    match_rate_child: 95,
    recent_passed_records: "東大・京大・名大・三重大学医学部など医学部・最難関大合格実績県内圧倒的No.1",
    events: [
      { id: "ev_takada_open", title: "高田中オープンスクール", date: "9月27日(土)", type: "学校説明会", desc: "国宝専修寺に隣接する歴史あるキャンパスとハイレベルな授業を公開。" }
    ],
    special_classes: [
      { title: "仏教情操と先端サイエンスゼミ", desc: "豊かな命の尊さを学びながら、高度な理数・医学探究を行う特別授業！" }
    ],
    school_strengths: ["三重県内で圧倒的な医学部・東大・京大現役合格者数！", "一身田駅徒歩5分の通いやすい立地！"],
    life_simulation: "一身田駅から徒歩5分で歴史ある校門へ。厳かな仏教行事と最先端の受験指導が調和した環境で学びます。",
    parent_summary: "【進学・教育】三重県トップの学力を誇る名門校。国公立大医学部合格実績は全国的にも高水準。【通学】JR一身田駅徒歩5分。",
    child_summary: "三重県でいちばん勉強ができるすごい学校！みんな目標に向かって一生懸命で、互いに尊敬し合える仲間ができるよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_reading_history"],
    interest_category_label: "三重最高峰・医学部・仏教",
    is_favorite: false
  },

  // ==================== 近畿追加 ====================
  {
    school_id: "sch_omi_brother",
    name: "近江兄弟社中学校",
    name_ruby: "おうみきょうだいしゃちゅうがっこう",
    official_url: "https://www.vories.ac.jp/jh/",
    catchphrase: "ヴォーリズの精神息づく近江八幡。愛と奉仕の心でグローバルに生きる人を育む",
    recommend_phrase: "★ 美しい洋風建築と英語教育の中で、のびのびと個性を伸ばしたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "滋賀県",
    district: "近江八幡市市井町",
    station_name: "近江八幡駅",
    access_info: {
      primary_line: "JR琵琶湖線・近江鉄道",
      hub_station: "近江八幡駅・草津駅",
      walk_minutes: 0,
      bus_minutes: 8,
      school_bus: true,
      school_bus_note: "JR近江八幡駅北口より直通スクールバス運行（約8分）、自転車通学可"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫グローバルコース",
    commute_time: 25,
    tuition: 720000,
    gender_type: "coed",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["global", "free"],
    vibe_label: "キリスト教愛徳・国際英語",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 54,
    match_rate_child: 89,
    recent_passed_records: "京都大・大阪大・同志社・立命館・海外大学など多数進学",
    events: [
      { id: "ev_vories_open", title: "ヴォーリズ・キャンパスフェスタ", date: "10月11日(土)", type: "文化祭", desc: "異国情緒ある登録有形文化財の校舎見学と英語スピーチ発表会！" }
    ],
    special_classes: [
      { title: "ヴォーリズ平和・国際探究", desc: "国際NGOや海外姉妹校とオンラインで結び、貧困や環境問題を議論する授業！" }
    ],
    school_strengths: ["メンター・ヴォーリズの精神に基づく心温まる人間教育！", "ネイティブ教員常駐による自然な英語習得環境！"],
    life_simulation: "近江八幡駅からスクールバスや自転車で登校。赤レンガと緑の美しいキャンパスでパイプオルガンの音色とともに1日が始まります。",
    parent_summary: "【進学・教育】キリスト教精神に基づく温かな校風。手厚い英語教育と関関同立・国公立大進学実績。【通学】近江八幡駅バス運行。",
    child_summary: "絵本に出てくるようなおしゃれな校舎が自慢！英語劇やボランティアなど、優しい心と広い視野が身につくよ！",
    tags: ["interest_arts_music", "interest_social_events", "interest_digital_tech"],
    interest_category_label: "滋賀名門・キリスト教・国際",
    is_favorite: false
  },
  {
    school_id: "sch_chiben_wakayama",
    name: "智辯学園和歌山中学校",
    name_ruby: "ちべんがくえんわかやまちゅうがっこう",
    official_url: "https://www.chiben.ac.jp/wakayama/",
    catchphrase: "愛のある徹底指導。東大・京大・国公立大医学部へ全国トップクラスの進学実績",
    recommend_phrase: "★ 難関大学や医学部合格に向けて、徹底的に学習に打ち込みたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "和歌山県",
    district: "和歌山市冬野",
    station_name: "紀三井寺駅",
    access_info: {
      primary_line: "JR紀勢本線（きのくに線）",
      hub_station: "和歌山駅・泉佐野駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: true,
      school_bus_note: "JR和歌山駅・南海和歌山市駅・大阪泉州方面より専用スクールバス運行（多数便）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫選抜コース",
    commute_time: 30,
    tuition: 820000,
    gender_type: "coed",
    category: "private",
    religion: "buddhist",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "和歌山最高峰・徹底医進",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 66,
    match_rate_child: 96,
    recent_passed_records: "東大・京大・国公立大学医学部現役合格率全国屈指の実績",
    events: [
      { id: "ev_chiben_setsumei", title: "入試説明会＆校内見学", date: "10月18日(土)", type: "学校説明会", desc: "驚異的な大学合格実績を生み出す学習指導法と学校生活を紹介します。" }
    ],
    special_classes: [
      { title: "東大・京大・国公立医特進ゼミ", desc: "ハイレベルな演習問題を通じて論理的思考力を極限まで高める特講！" }
    ],
    school_strengths: ["全国屈指の難関大・医学部合格実績を誇る名門校！", "和歌山県内・大阪南部からの充実した直通スクールバス！"],
    life_simulation: "自宅近くの発着所から直通スクールバスで登校。放課後は自習室で仲間とハイレベルな問題に挑戦します。",
    parent_summary: "【進学・教育】和歌山県のみならず近畿を代表する超進学校。東大・京大・国公立医へ抜群の実績。【通学】大阪・和歌山広域スクールバス運行。",
    child_summary: "全国でも有名なトップクラスの進学校！勉強も甲子園を応援する野球部もみんなで一丸になって燃える学校だよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_sports_athletics"],
    interest_category_label: "和歌山最高峰・全国区医進・名門",
    is_favorite: false
  },

  // ==================== 中国・四国追加 ====================
  {
    school_id: "sch_yurihama",
    name: "湯梨浜学園中学校",
    name_ruby: "ゆりはまがくえんちゅうがっこう",
    official_url: "https://www.yurihamagakuen.ac.jp/",
    catchphrase: "東郷湖畔の豊かな自然。少人数徹底指導で難関大学現役合格を育む中高一貫校",
    recommend_phrase: "★ 美しい湖のほとりで、少人数のきめ細やかな個別指導を受けながら学びたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "鳥取県",
    district: "東伯郡湯梨浜町田後",
    station_name: "倉吉駅",
    access_info: {
      primary_line: "JR山陰本線",
      hub_station: "鳥取駅・倉吉駅・米子駅",
      walk_minutes: 0,
      bus_minutes: 15,
      school_bus: true,
      school_bus_note: "鳥取駅・倉吉駅・米子駅方面より専用スクールバス運行（全寮制完備）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫コース",
    commute_time: 25,
    tuition: 680000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "free"],
    vibe_label: "少人数個別・全寮制併設",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 55,
    match_rate_child: 89,
    recent_passed_records: "鳥取大学医学部・難関国公立大学へ手厚い指導で多数合格",
    events: [
      { id: "ev_yurihama_open", title: "オープンスクール＆湖畔見学", date: "10月25日(土)", type: "学校説明会", desc: "湖を望む静かな教室での体験授業と学生寮の見学会を実施します。" }
    ],
    special_classes: [
      { title: "湖畔の環境サイエンスワークショップ", desc: "東郷湖の自然環境や水生生物を調査・分析する少人数フィールドワーク！" }
    ],
    school_strengths: ["1クラス20名前後の徹底した少人数・個別指導体制！", "鳥取・倉吉・米子をカバーするスクールバス運行！"],
    life_simulation: "スクールバスで東郷湖を望む校舎へ登校。放課後は先生が個別ブースで付きっきりで勉強の質問に答えてくれます。",
    parent_summary: "【進学・教育】鳥取県中部の私立中高一貫校。少人数指導による鳥取大医学部・国公立大進学実績。【通学】県内各方面スクールバス有。",
    child_summary: "湖が見えるすごく綺麗なキャンパス！生徒数が少なくて先生との距離が近いから、どんなことでも相談できるよ！",
    tags: ["interest_nature_biology", "interest_science_space", "interest_puzzle_math"],
    interest_category_label: "鳥取・少人数個別・自然探究",
    is_favorite: false
  },
  {
    school_id: "sch_kaisei_shimane",
    name: "開星中学校",
    name_ruby: "かいせいちゅうがっこう",
    official_url: "https://www.kaisei.matsue.shimane.jp/",
    catchphrase: "夢現（ゆめをかたちに）。手厚いICT教育と文武両道で島根から世界へ",
    recommend_phrase: "★ 一人一台端末を活用した先進的な探究授業と、活気あふれる部活動を両立したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "島根県",
    district: "松江市西持田町",
    station_name: "松江駅",
    access_info: {
      primary_line: "JR山陰本線",
      hub_station: "松江駅",
      walk_minutes: 0,
      bus_minutes: 12,
      school_bus: true,
      school_bus_note: "JR松江駅および出雲・米子方面より直通スクールバス運行（約12分）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫コース",
    commute_time: 25,
    tuition: 660000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "stem"],
    vibe_label: "文武両道・ICT先進",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 54,
    match_rate_child: 88,
    recent_passed_records: "島根大学医学部・難関国公立大学・関関同立等多数進学",
    events: [
      { id: "ev_kaisei_open", title: "開星中オープンスクール", date: "9月20日(土)", type: "体験授業", desc: "iPadを活用したプログラミング授業やドローン体験、部活動体験！" }
    ],
    special_classes: [
      { title: "ICTフロンティア探究", desc: "プログラミングや動画制作を活用した課題解決型プレゼンテーション！" }
    ],
    school_strengths: ["文科省認定の先進的ICT教育とプログラミング指導！", "野球部や柔道部など全国大会出場の強豪部活動！"],
    life_simulation: "松江駅からスクールバスで登校。教室ではタブレットを使ってインタラクティブに学び、放課後は部活に打ち込みます。",
    parent_summary: "【進学・教育】島根県松江市の私立中高一貫校。ICT探究と島根大をはじめとする国公立大進学実績。【通学】スクールバス完備。",
    child_summary: "タブレットを使った面白い授業がいっぱい！スポーツも盛んで、毎日ワクワクしながら学校に通えるよ！",
    tags: ["interest_digital_tech", "interest_sports_athletics", "interest_social_events"],
    interest_category_label: "島根名門・ICT探究・文武両道",
    is_favorite: false
  },
  {
    school_id: "sch_okayama_hakuryo",
    name: "岡山白陵中学校",
    name_ruby: "おかやまはくりょうちゅうがっこう",
    official_url: "https://www.okahaku.ed.jp/",
    catchphrase: "教養と愛真。高い知性と強靭な精神を鍛え上げる岡山最高峰の進学校",
    recommend_phrase: "★ 東大・京大や国公立大医学部を目指し、ハイレベルな授業と寮生活で実力を伸ばしたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "岡山県",
    district: "赤磐市門前",
    station_name: "熊山駅",
    access_info: {
      primary_line: "JR山陽本線",
      hub_station: "岡山駅・相生駅",
      walk_minutes: 0,
      bus_minutes: 5,
      school_bus: true,
      school_bus_note: "JR熊山駅よりスクールバス直通約5分（または徒歩約20分、全寮制完備）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫普通科",
    commute_time: 30,
    tuition: 850000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "岡山最高峰・徹底医進",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 65,
    match_rate_child: 96,
    recent_passed_records: "東大・京大・岡山大学医学部をはじめ全国の医学部へ毎年抜群の合格者数",
    events: [
      { id: "ev_okahaku_open", title: "入試説明会＆寮見学会", date: "10月25日(土)", type: "学校説明会", desc: "全国区の進学実績を支える緻密な学習計画と快適な学生寮を公開。" }
    ],
    special_classes: [
      { title: "白陵スーパーアカデミック演習", desc: "高度な論述問題に立ち向かう深い思考力と記述力を養う演習！" }
    ],
    school_strengths: ["岡山県トップの東大・京大・国公立大医学部合格実績！", "自学自習の習慣が確実に身につく伝統の教育システムと寮設備！"],
    life_simulation: "岡山駅から山陽本線で熊山駅へ向かい、スクールバスで登校。放課後は自習室で仲間とハイレベルな課題を解き進めます。",
    parent_summary: "【進学・教育】岡山県屈指の超進学校。医学部・難関国立大への圧倒的な強さを誇る。【通学・生活】熊山駅バス運行、遠隔地生向けの寮完備。",
    child_summary: "全国から医学部や東大を目指すトップクラスの仲間が集まる学校！先生方の授業がハイレベルで知的好奇心が刺激されるよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_digital_tech"],
    interest_category_label: "岡山最高峰・全国区医進・名門",
    is_favorite: false
  },
  {
    school_id: "sch_keishin_yamaguchi",
    name: "慶進中学校",
    name_ruby: "けいしんちゅうがっこう",
    official_url: "https://www.keishin.ed.jp/",
    catchphrase: "自ら学び、自ら考え、自ら創る。山口県屈指の進路実績を誇る中高一貫校",
    recommend_phrase: "★ 先生方のきめ細やかなサポートのもと、難関大学や山口大学医学部を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "山口県",
    district: "宇部市東琴芝",
    station_name: "宇部新川駅",
    access_info: {
      primary_line: "JR宇部線",
      hub_station: "新山口駅・宇部駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: true,
      school_bus_note: "琴芝駅より徒歩5分、宇部新川駅・新山口駅・小野田方面よりスクールバス運行"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中高一貫アドバンスコース",
    commute_time: 25,
    tuition: 690000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "手厚い指導・医進選抜",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 90,
    recent_passed_records: "山口大学医学部・東大・九大・国公立大学へ多数現役合格",
    events: [
      { id: "ev_keishin_open", title: "オープンスクール＆理科実験", date: "9月27日(土)", type: "体験授業", desc: "最新の理科実験棟での楽しい体験授業と学校生活説明会を実施！" }
    ],
    special_classes: [
      { title: "アドバンス・メディカルゼミ", desc: "医学部・医療系志望者に向けた小論文対策や医療現場ディスカッション！" }
    ],
    school_strengths: ["山口大学医学部をはじめとする医療系・難関大への抜群の指導力！", "主要駅から学校直通の通学スクールバス運行！"],
    life_simulation: "新山口駅や宇部市内からスクールバスで登校。放課後は個別学習ブースで先生に質問しながら課題を解決します。",
    parent_summary: "【進学・教育】山口県有数の私立中高一貫校。山口大医学部をはじめ国公立大進学に強み。【通学】新山口駅などからスクールバス運行。",
    child_summary: "先生がすごく親身でアットホーム！実験設備が充実していて、理科や数学がどんどん得意になる学校だよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_digital_tech"],
    interest_category_label: "山口名門・医進・手厚い指導",
    is_favorite: false
  },
  {
    school_id: "sch_tokushima_bunri",
    name: "徳島文理中学校",
    name_ruby: "とくしまぶんりちゅうがっこう",
    official_url: "https://www.bunri.ed.jp/",
    catchphrase: "自立協同。徳島県内屈指の医学部・難関国公立大学進学実績を誇る名門私立",
    recommend_phrase: "★ 徳島大学医学部や難関大学進学を目指し、高い学力と教養を培いたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "徳島県",
    district: "徳島市山城町",
    station_name: "徳島駅",
    access_info: {
      primary_line: "JR高徳線・牟岐線・徳島線",
      hub_station: "徳島駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: true,
      school_bus_note: "JR徳島駅より路線バス・スクールバス約10分、阿波富田駅より徒歩約15分"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科中高一貫",
    commute_time: 25,
    tuition: 740000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "support"],
    vibe_label: "徳島最高峰・医学部実績",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 61,
    match_rate_child: 93,
    recent_passed_records: "徳島大学医学部をはじめとする国公立大医学部・東大・京大へ圧倒的な合格者数",
    events: [
      { id: "ev_bunri_setsumei", title: "入試説明会＆体験授業", date: "10月11日(土)", type: "体験授業", desc: "文理中ならではの高度で楽しい数学・英語の体験授業を実施！" }
    ],
    special_classes: [
      { title: "サイエンス・メディカル研究会", desc: "大学教授の指導のもとで遺伝子や物理現象を探究するハイレベルゼミ！" }
    ],
    school_strengths: ["徳島県内で圧倒的な国公立大医学部合格実績！", "文理大学キャンパス隣接の充実した研究・学習環境！"],
    life_simulation: "徳島駅からバスや自転車で登校。緑あふれる文理大学隣接キャンパスで高い志を持つ仲間と机を並べます。",
    parent_summary: "【進学・教育】徳島県内私立トップの進学校。徳島大医学部など医学系進学実績は全国レベル。【通学】徳島駅より直通バス運行。",
    child_summary: "徳島でお医者さんになりたい子がみんな憧れる学校！勉強熱心な友達がいっぱいで、自然とやる気が出るよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_digital_tech"],
    interest_category_label: "徳島最高峰・医学部・進学校",
    is_favorite: false
  },
  {
    school_id: "sch_otemae_marugame",
    name: "大手前丸亀中学校",
    name_ruby: "おおてまえまるがめちゅうがっこう",
    official_url: "https://www.otemae.ed.jp/",
    catchphrase: "自ら学び、自ら問い、自ら未来を創る。香川県屈指の進学校",
    recommend_phrase: "★ 駅から徒歩すぐの安心通学で、一人ひとりを伸ばす手厚い進学指導を受けたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "香川県",
    district: "丸亀市大手町",
    station_name: "丸亀駅",
    access_info: {
      primary_line: "JR予讃線",
      hub_station: "丸亀駅・坂出駅・高松駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR丸亀駅南口より徒歩約10分（丸亀城の美しいお堀のそば）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中高一貫コース",
    commute_time: 20,
    tuition: 710000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "手厚い指導・医進難関",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 92,
    recent_passed_records: "東大・京大・香川大学医学部・難関国立大学へ多数合格",
    events: [
      { id: "ev_otemae_open", title: "オープンスクール＆入試プレテスト", date: "10月18日(土)", type: "体験授業", desc: "丸亀城を望む落ち着いた校舎での体験授業と入試ワンポイントアドバイス！" }
    ],
    special_classes: [
      { title: "探究型アクティブラーニングゼミ", desc: "丸亀の地域課題や先端サイエンスをテーマにした協働プレゼンテーション！" }
    ],
    school_strengths: ["JR丸亀駅から徒歩10分の通いやすい安心の立地！", "香川大学医学部をはじめとする難関大への高い現役進学率！"],
    life_simulation: "丸亀駅から丸亀城のお堀端を通って爽快に登校。放課後は完全個別化された自習ブースで集中学習に取り組みます。",
    parent_summary: "【進学・教育】香川県有数の伝統私立進学校。医学部・難関国公立大進学に実績。【通学】JR丸亀駅徒歩10分の好立地。",
    child_summary: "丸亀城のすぐ隣にあって景色がすごくいい！先生が一人ひとりの質問に最後まで付き合ってくれる温かい学校だよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_reading_history"],
    interest_category_label: "香川名門・駅近・医学部",
    is_favorite: false
  },
  {
    school_id: "sch_tosa_kochi",
    name: "土佐中学校",
    name_ruby: "とさちゅうがっこう",
    official_url: "https://www.tosa.ed.jp/",
    catchphrase: "報恩感謝。高知県トップの進学実績を誇る自由闊達で質実剛健な名門中高一貫校",
    recommend_phrase: "★ 高知県で最も高い進学力を持ち、全国から集まる仲間と部活動も勉強も思いきりやり抜きたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "高知県",
    district: "高知市塩屋崎町",
    station_name: "旭駅",
    access_info: {
      primary_line: "とさでん交通・JR土讃線",
      hub_station: "高知駅・はりまや橋",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: false,
      school_bus_note: "はりまや橋・高知駅より土佐電鉄バス「土佐高校前」直通下車すぐ、自転車通学多数"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科中高一貫",
    commute_time: 25,
    tuition: 680000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "both"],
    vibe_label: "高知最高峰・質実剛健",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 62,
    match_rate_child: 94,
    recent_passed_records: "東大・京大・高知大学医学部をはじめとする全国の医学部へ圧倒的な合格実績",
    events: [
      { id: "ev_tosa_bunkasai", title: "土佐中高文化祭", date: "9月20日(土)・21日(日)", type: "文化祭", desc: "生徒主体のエネルギッシュな模擬店や研究発表、音楽会が開催されます。" }
    ],
    special_classes: [
      { title: "報恩感謝キャリア探究講座", desc: "政財界や医療の第一線で活躍する卒業生による白熱のキャリア講義！" }
    ],
    school_strengths: ["高知県内で他の追随を許さない圧倒的な難関大学・医学部進学実績！", "伝統の「報恩感謝」の精神に基づく熱い友情と結束力！"],
    life_simulation: "高知市内各方面から自転車や路面電車・バスで登校。放課後は伝統の部活動や図書室での自習に情熱を注ぎます。",
    parent_summary: "【進学・教育】高知県No.1の歴史と実績を誇る名門校。東大・医学部合格実績は四国屈指。【校風】自主自立と文武両道。",
    child_summary: "高知でいちばん憧れられているかっこいい学校！みんな明るくて元気いっぱいで、一生モノの親友ができるよ！",
    tags: ["interest_sports_athletics", "interest_science_space", "interest_social_events"],
    interest_category_label: "高知最高峰・文武両道・医進名門",
    is_favorite: false
  },

  // ==================== 九州追加 ====================
  {
    school_id: "sch_waseda_saga",
    name: "早稲田佐賀中学校",
    name_ruby: "わせださがちゅうがっこう",
    official_url: "https://www.wasedasaga.jp/",
    catchphrase: "唐津城を望む学び舎から早稲田へ、そして世界へ。早稲田大学系属校",
    recommend_phrase: "★ 早稲田大学への進学推薦枠（約50％）を持ちながら、東大・医学部にも挑戦したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "佐賀県",
    district: "唐津市東城内",
    station_name: "唐津駅",
    access_info: {
      primary_line: "JR筑肥線（地下鉄空港線直通）・JR唐津線",
      hub_station: "福岡空港・博多駅・天神駅・佐賀駅",
      walk_minutes: 15,
      bus_minutes: 0,
      school_bus: true,
      school_bus_note: "福岡市（博多・天神）から直通電車約1時間、佐賀駅方面からスクールバス運行（全寮制完備）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科中高一貫（通学・寮制）",
    commute_time: 35,
    tuition: 920000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "attached",
    atmospheres: ["free", "global"],
    vibe_label: "早稲田系属・進取の精神",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 61,
    match_rate_child: 93,
    recent_passed_records: "早稲田大学各学部へ約50％進学＋東大・京大・国公立医学部多数合格",
    events: [
      { id: "ev_waseda_open", title: "早稲田佐賀オープンキャンパス＆寮見学", date: "10月11日(土)", type: "学校説明会", desc: "唐津城に隣接する歴史的景観のキャンパスと最新の学生寮八太郎館を見学！" }
    ],
    special_classes: [
      { title: "早稲田大学連携グローバル講義", desc: "早稲田大学の専任教授陣による最先端の学術ゼミや出張講義！" }
    ],
    school_strengths: ["早稲田大学への高い推薦進学率と九州・全国からの多彩な生徒層！", "唐津城の麓、海と歴史に囲まれた絶好の教育環境と安心の寮！"],
    life_simulation: "福岡（博多・天神）から電車直通または唐津の寮から登校。唐津城の美しい景色を望みながら高い志で学びます。",
    parent_summary: "【進学・教育】早稲田大学系属校。早稲田大推薦枠を保持しつつ国公立大・医学部も受験可能。【環境】通学制と全寮制を併設。",
    child_summary: "唐津城のすぐそばにある憧れの早稲田！早稲田大学に行けるチャンスがあって、全国から面白い仲間が集まってくるよ！",
    tags: ["interest_reading_history", "interest_social_events", "interest_digital_tech"],
    interest_category_label: "早稲田系属・九州・大学附属",
    is_favorite: false
  },
  {
    school_id: "sch_seiun_nagasaki",
    name: "青雲中学校",
    name_ruby: "せいうんちゅうがっこう",
    official_url: "https://www.seiun-jh.ed.jp/",
    catchphrase: "青雲の志を胸に。九州・全国から集う仲間と医学部・東大を目指す名門進学校",
    recommend_phrase: "★ 伝統の徹底した学習指導と規則正しい寮生活で、医師や先端研究者を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "長崎県",
    district: "西彼杵郡時津町左底郷",
    station_name: "長崎駅",
    access_info: {
      primary_line: "西九州新幹線・JR長崎本線",
      hub_station: "長崎駅・浦上駅・諫早駅",
      walk_minutes: 0,
      bus_minutes: 30,
      school_bus: true,
      school_bus_note: "JR長崎駅・浦上駅・諫早駅より学校直通専用スクールバス運行（全寮制完備）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫普通科",
    commute_time: 35,
    tuition: 820000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "長崎最高峰・医学部実績",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 64,
    match_rate_child: 95,
    recent_passed_records: "東大・京大・長崎大学医学部をはじめ全国の医学部へ毎年屈指の合格実績",
    events: [
      { id: "ev_seiun_open", title: "入試説明会＆青雲寮見学会", date: "10月25日(土)", type: "学校説明会", desc: "徹底した学習指導のノウハウと全国から集まる仲間が暮らす寮を公開。" }
    ],
    special_classes: [
      { title: "青雲医進ゼミナール", desc: "長崎大学医学部教授やOB医師を招いたメディカルワークショップ！" }
    ],
    school_strengths: ["全国に轟く圧倒的な国公立大学医学部合格実績！", "自学自習を確立する専任教員常駐の学習寮完備！"],
    life_simulation: "長崎駅などからスクールバスで大村湾を望む時津キャンパスへ。放課後は自習室で仲間とハイレベルな問題に挑みます。",
    parent_summary: "【進学・教育】長崎県No.1の進学校。医学部合格実績は全国屈指。【通学・生活】長崎駅から直通スクールバス運行、全寮制完備。",
    child_summary: "お医者さんや学者を目指す熱い仲間がいっぱい！先生たちも全力で応援してくれて、ぐんぐん実力がつく学校だよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_digital_tech"],
    interest_category_label: "長崎最高峰・全国区医進・名門",
    is_favorite: false
  },
  {
    school_id: "sch_marist_kumamoto",
    name: "熊本マリスト学園中学校",
    name_ruby: "くまもとまりすとがくえんちゅうがっこう",
    official_url: "https://www.marist.ed.jp/",
    catchphrase: "信・望・愛。国際性と確かな学力を育むカトリックミッションスクール",
    recommend_phrase: "★ 温かな人間教育と手厚い個別指導のもと、熊本大学医学部や難関大を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "熊本県",
    district: "熊本市東区健軍",
    station_name: "健軍町電停",
    access_info: {
      primary_line: "熊本市電・JR豊肥本線",
      hub_station: "熊本駅・水前寺駅",
      walk_minutes: 8,
      bus_minutes: 0,
      school_bus: true,
      school_bus_note: "市電「健軍町」より徒歩8分、熊本駅・光の森・松橋方面よりスクールバス運行"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中高一貫普通科",
    commute_time: 25,
    tuition: 710000,
    gender_type: "coed",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["manners", "support"],
    vibe_label: "カトリック愛徳・手厚い進学",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 90,
    recent_passed_records: "熊本大学医学部・難関国公立大学・早慶上智・カトリック系大学多数進学",
    events: [
      { id: "ev_marist_open", title: "マリスト祭（バザー・文化祭）", date: "10月4日(土)", type: "文化祭", desc: "国際色豊かな展示やチャリティバザー、生徒による研究発表会！" }
    ],
    special_classes: [
      { title: "グローバル・マリスト・イングリッシュ", desc: "ネイティブ教員による少人数イマージョン英語ワークショップ！" }
    ],
    school_strengths: ["世界80カ国に広がるマリスト修道会ネットワーク！", "熊本市内および近郊を幅広く結ぶ安心のスクールバス運行！"],
    life_simulation: "熊本市内から市電やスクールバスで登校。静かな祈りから1日が始まり、放課後は自習スペースで丁寧に質問学習を行います。",
    parent_summary: "【進学・教育】カトリック精神に基づく品格と高い知性を育む名門校。熊本大医学部や国公立大進学実績。【通学】市電徒歩8分、バス有。",
    child_summary: "先生も先輩もすごく優しくてアットホーム！英語が楽しく身について、海外の文化にもたくさん触れられるよ！",
    tags: ["interest_arts_music", "interest_social_events", "interest_science_space"],
    interest_category_label: "熊本名門・カトリック・国際",
    is_favorite: false
  },
  {
    school_id: "sch_iwata_oita",
    name: "岩田中学校",
    name_ruby: "いわたちゅうがっこう",
    official_url: "https://www.iwata.ed.jp/",
    catchphrase: "自ら考え行動する自立の精神。大分県随一の進学指導とAPU立命館連携",
    recommend_phrase: "★ 難関大学や医学部を目指す「医学進学コース」や立命館アジア太平洋大学（APU）連携に興味がある人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "大分県",
    district: "大分市岩田町",
    station_name: "大分駅",
    access_info: {
      primary_line: "JR日豊本線・久大本線・豊肥本線",
      hub_station: "大分駅・牧駅",
      walk_minutes: 0,
      bus_minutes: 8,
      school_bus: true,
      school_bus_note: "JR大分駅府内中央口および別府・わさだ方面より専用スクールバス運行（牧駅徒歩12分）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "医科・難関大コース／APU・IBコース",
    commute_time: 25,
    tuition: 730000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "global"],
    vibe_label: "医進特化・APU国際連携",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 59,
    match_rate_child: 92,
    recent_passed_records: "東大・京大・大分大学医学部など医学部・難関国立大へ多数合格",
    events: [
      { id: "ev_iwata_open", title: "岩田中オープンキャンパス", date: "9月27日(土)", type: "体験授業", desc: "医学進学ゼミの体験授業やAPU留学生との英語アクティビティ！" }
    ],
    special_classes: [
      { title: "メディカルサイエンス特講", desc: "大分大学医学部と連携した解剖学や先端医療技術に関する特別講義！" }
    ],
    school_strengths: ["大分県内で圧倒的な医学部現役進学実績を誇る伝統！", "大分駅・別府方面からの通学用スクールバス完備！"],
    life_simulation: "大分駅からスクールバスで岩田キャンパスへ。放課後は自習館でチューターや教員の手厚い個別指導を受けます。",
    parent_summary: "【進学・教育】大分県内トップの私立進学校。医学部特化クラスとAPU連携国際クラスを設置。【通学】大分駅等からスクールバス運行。",
    child_summary: "お医者さんを目指す仲間がたくさんいて刺激になる！世界中から集まるお兄さんお姉さんと英語で話せるのも楽しいよ！",
    tags: ["interest_science_space", "interest_digital_tech", "interest_puzzle_math"],
    interest_category_label: "大分最高峰・医学部・国際連携",
    is_favorite: false
  },
  {
    school_id: "sch_miyazaki_daiichi",
    name: "宮崎第一中学校",
    name_ruby: "みやざきだいいちちゅうがっこう",
    official_url: "https://miyaichi.ed.jp/",
    catchphrase: "高い志と豊かな人間性。一人ひとりの夢を現実に変える宮崎屈指の進学校",
    recommend_phrase: "★ 先生方の手厚い個別補習と熱心な進路指導で、宮崎大学医学部や難関大学を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "宮崎県",
    district: "宮崎市郡司分",
    station_name: "南宮崎駅",
    access_info: {
      primary_line: "JR日豊本線・日南線・宮崎空港線",
      hub_station: "宮崎駅・南宮崎駅",
      walk_minutes: 0,
      bus_minutes: 15,
      school_bus: true,
      school_bus_note: "宮崎駅・南宮崎駅・都城・日南・西都など宮崎県内各方面より広域スクールバス多数運行"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫特別選抜コース",
    commute_time: 30,
    tuition: 670000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "手厚い指導・医進選抜",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 90,
    recent_passed_records: "宮崎大学医学部をはじめとする国公立大医学部・九州大・難関大へ多数合格",
    events: [
      { id: "ev_m_daiichi_open", title: "オープンスクール＆理科実験室ツアー", date: "10月18日(土)", type: "体験授業", desc: "広大なキャンパスとICT授業体験、楽しいサイエンス実験教室を実施！" }
    ],
    special_classes: [
      { title: "ドクターズ・キャリアワークショップ", desc: "現役医師として活躍する卒業生によるメディカルガイダンスと小論文指導！" }
    ],
    school_strengths: ["宮崎県内全域をカバーする網羅的なスクールバス運行！", "夜間学習支援や個別質問対応など徹底した補習体制！"],
    life_simulation: "自宅近くの停留所からスクールバスで広大なキャンパスへ。放課後は自習室で質問しながら課題を確実に終わらせます。",
    parent_summary: "【進学・教育】宮崎県有数の私立中高一貫進学校。医学部・難関国立大進学に実績。【通学】県内広域スクールバス完備。",
    child_summary: "バスで家の近くまで迎えに来てくれるから安心！先生が本当に親身で、勉強の楽しさを教えてくれる学校だよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_sports_athletics"],
    interest_category_label: "宮崎名門・医進・広域通学バス",
    is_favorite: false
  }
];

// ==========================================
// 住所・最寄り駅から47都道府県を高精度に特定する判定エンジン
// ==========================================
function detectPrefectureFromAddressAndStation(userAddress, userStation) {
  const text = `${userAddress || ""} ${userStation || ""}`.trim();
  if (!text) return "東京都";

  const allPrefs = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
    "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
    "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
    "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
  ];
  for (const pref of allPrefs) {
    if (text.includes(pref)) return pref;
  }

  // 市区町村名・主要駅名からの高精度都道府県特定辞書
  const cityStationMap = [
    // 茨城県（土浦・荒川沖・つくば・取手・水戸など）
    { pattern: /土浦|荒川沖|つくば|水戸|取手|牛久|守谷|ひたちなか|日立|石岡|かすみがうら|古河|神栖|龍ケ崎|常総|坂東|結城|那珂|常陸太田|笠間|下妻/, pref: "茨城県" },
    // 栃木県
    { pattern: /宇都宮|佐野|小山|足利|栃木市|那須|日光|鹿沼|真岡|大田原|さくら市|矢板/, pref: "栃木県" },
    // 群馬県
    { pattern: /前橋|高崎|太田|伊勢崎|桐生|渋川|館林|藤岡|富岡|安中|沼田/, pref: "群馬県" },
    // 埼玉県
    { pattern: /さいたま|大宮|浦和|与野|川口|所沢|川越|越谷|草加|春日部|熊谷|上尾|新座|久喜|狭山|深谷|戸田|朝霞|志木|和光|富士見|ふじみ野|坂戸|東松山|八潮|三郷|吉川/, pref: "埼玉県" },
    // 千葉県
    { pattern: /千葉市|船橋|市川|松戸|柏|市原|八千代|流山|佐倉|習志野|浦安|野田|木更津|成田|我孫子|鎌ケ谷|君津|幕張|新浦安|舞浜|津田沼|西船橋|海浜幕張|南流山/, pref: "千葉県" },
    // 神奈川県
    { pattern: /横浜|川崎|相模原|横須賀|藤沢|平塚|茅ヶ崎|厚木|大和|小田原|鎌倉|秦野|座間|海老名|伊勢原|逗子|綾瀬|武蔵小杉|新横浜|戸塚|上大岡|たまプラーザ|日吉|溝の口|あざみ野/, pref: "神奈川県" },
    // 東京都
    { pattern: /千代田|中央区|港区|新宿|文京|台東|墨田|江東|品川|目黒|大田区|世田谷|渋谷|中野|杉並|豊島|北区|荒川|板橋|練馬|足立|葛飾|江戸川|八王子|町田|府中|調布|西東京|武蔵野|三鷹|立川|吉祥寺|国分寺|国立|小金井|小平|日野|多摩/, pref: "東京都" },
    // 静岡県
    { pattern: /静岡市|浜松|富士市|沼津|磐田|焼津|藤枝|富士宮|掛川|三島|島田|御殿場|袋井|熱海|伊東/, pref: "静岡県" },
    // 愛知県
    { pattern: /名古屋|一宮|豊田|岡崎|豊橋|春日井|安城|豊川|西尾|刈谷|小牧|稲沢|瀬戸|半田|東海市|江南|日進|あま市|みよし|栄|名駅|金山|千種/, pref: "愛知県" },
    // 岐阜県
    { pattern: /岐阜市|大垣|各務原|多治見|可児|高山|関市|中津川|羽島|瑞浪|恵那/, pref: "岐阜県" },
    // 三重県
    { pattern: /四日市|津市|鈴鹿|松阪|桑名|伊勢|伊賀|名張|亀山|一身田/, pref: "三重県" },
    // 大阪府
    { pattern: /大阪市|堺|東大阪|枚方|豊中|高槻|吹田|茨木|八尾|寝屋川|岸和田|和泉|守口|門真|箕面|大東|松原|富田林|羽曳野|梅田|難波|天王寺|京橋|新大阪|千里/, pref: "大阪府" },
    // 兵庫県
    { pattern: /神戸|姫路|西宮|尼崎|明石|加古川|宝塚|伊丹|川西|三田|高砂|芦屋|豊岡|三木|三ノ宮|甲子園|西宮北口|岡本|御影|六甲/, pref: "兵庫県" },
    // 京都府
    { pattern: /京都市|宇治|亀岡|舞鶴|城陽|長岡京|福知山|八幡市|京田辺|木津川|烏丸|河原町|祇園|嵐山|桂/, pref: "京都府" },
    // 奈良県
    { pattern: /奈良市|橿原|生駒|大和郡山|香芝|大和高田|天理|桜井|葛城/, pref: "奈良県" },
    // 滋賀県
    { pattern: /大津|草津|長浜|東近江|彦根|甲賀|近江八幡|守山|栗東|野洲|高島/, pref: "滋賀県" },
    // 和歌山県
    { pattern: /和歌山市|田辺|橋本|紀の川|岩出|海南|紀三井寺/, pref: "和歌山県" },
    // 宮城県
    { pattern: /仙台|石巻|大崎|登米|栗原|気仙沼|名取|多賀城|塩竈|富谷|岩沼/, pref: "宮城県" },
    // 福島県
    { pattern: /いわき|郡山|福島市|会津若松|須賀川|白河|伊達|本宮/, pref: "福島県" },
    // 山形県
    { pattern: /山形市|鶴岡|酒田|米沢|天童|東根|さくらんぼ東根|寒河江|新庄/, pref: "山形県" },
    // 岩手県
    { pattern: /盛岡|一関|奥州|花巻|北上|宮古|大船渡|釜石/, pref: "岩手県" },
    // 青森県
    { pattern: /青森市|八戸|弘前|十和田|むつ|五所川原|三沢/, pref: "青森県" },
    // 秋田県
    { pattern: /秋田市|横手|大仙|由利本荘|大館|能代|湯沢|羽後牛島/, pref: "秋田県" },
    // 新潟県
    { pattern: /新潟市|長岡|上越|三条|新発田|柏崎|燕市|村上|佐渡/, pref: "新潟県" },
    // 富山県
    { pattern: /富山市|高岡|射水|南砺|氷見|砺波|魚津|黒部/, pref: "富山県" },
    // 石川県
    { pattern: /金沢|白山|小松|加賀|七尾|野々市|かほく|東金沢/, pref: "石川県" },
    // 福井県
    { pattern: /福井市|坂井|越前|敦賀|鯖江|大野|小浜/, pref: "福井県" },
    // 山梨県
    { pattern: /甲府|甲斐|南アルプス|笛吹|富士吉田|北杜|山梨市|都留/, pref: "山梨県" },
    // 長野県
    { pattern: /長野市|松本|上田|飯田|佐久|安曇野|伊那|塩尻|諏訪|上諏訪|茅野|岡谷/, pref: "長野県" },
    // 広島県
    { pattern: /広島市|福山|呉市|東広島|尾道|廿日市|三原|三次|府中市/, pref: "広島県" },
    // 岡山県
    { pattern: /岡山市|倉敷|津山|総社|玉野|笠岡|真庭|赤磐|熊山/, pref: "岡山県" },
    // 山口県
    { pattern: /下関|山口市|宇部|周南|岩国|防府|山陽小野田|下松|光市|新山口|宇部新川/, pref: "山口県" },
    // 鳥取県
    { pattern: /鳥取市|米子|倉吉|境港|湯梨浜/, pref: "鳥取県" },
    // 島根県
    { pattern: /松江|出雲|浜田|益田|安来|雲南/, pref: "島根県" },
    // 徳島県
    { pattern: /徳島市|阿南|鳴門|吉野川|小松島|阿波市/, pref: "徳島県" },
    // 香川県
    { pattern: /高松|丸亀|三豊|観音寺|坂出|さぬき市|東かがわ/, pref: "香川県" },
    // 愛媛県
    { pattern: /松山市|今治|新居浜|西条|四国中央|宇和島|大洲/, pref: "愛媛県" },
    // 高知県
    { pattern: /高知市|南国|香南|四万十|土佐市|須崎|旭駅/, pref: "高知県" },
    // 福岡県
    { pattern: /福岡市|北九州|久留米|飯塚|大牟田|春日|糸島|筑紫野|宗像|太宰府|博多|天神|小倉|行橋|八女/, pref: "福岡県" },
    // 佐賀県
    { pattern: /佐賀市|唐津|鳥栖|伊万里|武雄|小城市|嬉野/, pref: "佐賀県" },
    // 長崎県
    { pattern: /長崎市|佐世保|諫早|大村|南島原|島原|時津/, pref: "長崎県" },
    // 熊本県
    { pattern: /熊本市|八代|天草|玉名|宇城|山鹿|合志|菊池|水前寺|健軍/, pref: "熊本県" },
    // 大分県
    { pattern: /大分市|別府|中津|日田|佐伯|宇佐|臼杵/, pref: "大分県" },
    // 宮崎県
    { pattern: /宮崎市|都城|延岡|日南|小林|日向|西都|南宮崎/, pref: "宮崎県" },
    // 鹿児島県
    { pattern: /鹿児島市|霧島|鹿屋|薩摩川内|姶良|出水|指宿|中央駅/, pref: "鹿児島県" },
    // 沖縄県
    { pattern: /那覇|沖縄市|うるま|浦添|宜野湾|名護|糸満|豊見城|南城|石垣|宮古島/, pref: "沖縄県" }
  ];

  for (const item of cityStationMap) {
    if (item.pattern.test(text)) {
      return item.pref;
    }
  }

  return "東京都";
}

// ==========================================
// 具体的通学ルート・交通手段・所要時間計算エンジン
// ==========================================
function calculateDetailedCommuteRoute(userAddress, userStation, school, allowedTransports) {
  const userAddr = (userAddress || "").trim();
  const uStation = (userStation || "").trim().replace(/駅$/, "");
  const sStation = (school.station_name || "").replace(/駅$/, "");
  const schoolPref = school.prefecture || "東京都";
  const schoolDistrict = school.district || "";
  const access = school.access_info || {};

  // 1. ユーザーの都道府県を特定（住所・駅名の両方から高精度判定）
  const userPref = detectPrefectureFromAddressAndStation(userAddr, uStation);
  const isSamePref = userPref === schoolPref;

  // 通学圏判定（同一通学クラスター内か）
  let isSameRegion = isSamePref;
  if (!isSameRegion) {
    for (const regionKey in COMMUTE_REGIONS) {
      const prefs = COMMUTE_REGIONS[regionKey];
      if (prefs.includes(userPref) && prefs.includes(schoolPref)) {
        isSameRegion = true;
        break;
      }
    }
  }

  // 通学手段の許可状況
  const transports = Array.isArray(allowedTransports) ? allowedTransports : ["train", "bicycle", "walk"];
  const allowTrain = transports.includes("train");
  const allowBus = transports.includes("bus") || transports.includes("school_bus");
  const allowBicycle = transports.includes("bicycle");
  const allowWalk = transports.includes("walk");

  // 市区町村の近接判定
  const isSameDistrict = userAddr.includes(schoolDistrict) || (schoolDistrict && userAddr.includes(schoolDistrict.replace(/[市区町村]$/, "")));

  // A. 徒歩通学のみ希望の場合
  if (allowWalk && !allowTrain && !allowBicycle) {
    if (isSameDistrict && school.can_walk) {
      const walkTime = Math.min(Math.max(access.walk_minutes || 12, 10), 18);
      return {
        total_minutes: walkTime,
        route_summary: `【徒歩通学】ご自宅（${userAddr}）より校門まで平坦な通学路を徒歩約${walkTime}分（徒歩圏内・安心通学）`,
        is_walk_bicycle: true,
        method_type: "walk",
        is_commutable: true
      };
    } else {
      return {
        total_minutes: 999,
        route_summary: `【徒歩圏外】ご自宅から徒歩で通学できる距離を超えています（公共交通機関または自転車のご利用が必要です）`,
        is_walk_bicycle: false,
        method_type: "unreachable",
        is_commutable: false
      };
    }
  }

  // B. 自転車通学（または徒歩＋自転車のみ）希望の場合
  if (!allowTrain && (allowBicycle || allowWalk)) {
    if (isSameDistrict || (isSamePref && school.can_bicycle)) {
      const bikeTime = isSameDistrict ? 14 : 22;
      return {
        total_minutes: bikeTime,
        route_summary: `【自転車通学】ご自宅（${userAddr}）より安全な自転車レーン経由で約${bikeTime}分（校内生徒用駐輪場完備・雨天時は路線バス併用可）`,
        is_walk_bicycle: true,
        method_type: "bicycle",
        is_commutable: true
      };
    } else {
      return {
        total_minutes: 999,
        route_summary: `【自転車通学圏外】ご自宅から自転車で安全に通学できる距離（約30分以内）を超えています`,
        is_walk_bicycle: false,
        method_type: "unreachable",
        is_commutable: false
      };
    }
  }

  // C. 遠隔地（通学圏外の別地方）
  if (!isSameRegion) {
    return {
      total_minutes: 240,
      route_summary: `【遠隔地・新幹線／全寮制】ご自宅（${userPref}）から片道所要時間約4時間以上（※日常の通学可能圏外・新幹線または寮生活対象）`,
      is_walk_bicycle: false,
      method_type: "remote",
      is_commutable: false
    };
  }

  // D. 公共交通機関（電車・路線バス・スクールバス）による具体的ルート計算
  const walkMin = access.walk_minutes || 7;
  const primaryLine = access.primary_line || "主要鉄道路線";

  // 1) スクールバス運行校の場合（最寄り駅・発着拠点駅からの直通または電車＋バス）
  if (access.school_bus) {
    const isDirectBusStation = (uStation && (uStation === sStation || (access.hub_station && access.hub_station.includes(uStation))));
    const busMin = access.bus_minutes || 12;

    if (isDirectBusStation) {
      const total = busMin + 2;
      return {
        total_minutes: total,
        route_summary: `【専用スクールバス直通】ご自宅最寄り「${uStation}駅」より学校専用直通スクールバスで約${busMin}分（乗換不要・校内直着で雨天も安心）※${access.school_bus_note || 'スクールバス運行'}`,
        is_walk_bicycle: false,
        method_type: "school_bus",
        is_commutable: true
      };
    } else {
      let trainMin = isSamePref ? 12 : 25;
      if (isSameDistrict) trainMin = 6;
      const total = trainMin + busMin;
      return {
        total_minutes: total,
        route_summary: `【電車＋スクールバス直通】「${uStation || '自宅最寄駅'}駅」より ${primaryLine} 等で約${trainMin}分 →「${sStation}駅」下車、学校専用スクールバス直通 約${busMin}分（合計所要時間：約${total}分）※${access.school_bus_note || 'スクールバス運行'}`,
        is_walk_bicycle: false,
        method_type: "school_bus",
        is_commutable: true
      };
    }
  }

  // 2) 最寄り駅が同一（直近・徒歩圏）の場合
  if (uStation && (uStation === sStation || sStation.includes(uStation) || uStation.includes(sStation))) {
    const total = walkMin + 2;
    return {
      total_minutes: total,
      route_summary: `【駅近・徒歩】ご自宅最寄り「${uStation}駅」から学校最寄り「${sStation}駅」まで直通、駅から校門まで徒歩約${walkMin}分（合計所要時間：約${total}分）`,
      is_walk_bicycle: false,
      method_type: "train",
      is_commutable: true
    };
  }

  // 3) 同一都道府県内の電車移動
  if (isSamePref) {
    let trainMin = 18;
    if (isSameDistrict) trainMin = 10;
    const total = trainMin + walkMin;
    return {
      total_minutes: total,
      route_summary: `【電車直通＋徒歩】ご自宅最寄り「${uStation || '自宅最寄駅'}駅」より ${primaryLine} 等で約${trainMin}分 →「${sStation}駅」下車 徒歩約${walkMin}分（合計所要時間：約${total}分）`,
      is_walk_bicycle: false,
      method_type: "train",
      is_commutable: true
    };
  }

  // 4) 地域間・都道府県間のリアルな鉄道移動時間計算
  // 茨城県からの各地域への所要時間
  let crossTrainMin = 50;
  let hubStation = access.hub_station || "主要乗換駅";
  let transferNote = "JR線等乗換";

  if (userPref === "茨城県") {
    // 茨城県（土浦・荒川沖・水戸・つくば等）から他県への所要時間
    if (schoolPref === "東京都") {
      // 城北・常磐線直通（日暮里・西日暮里・北千住等）
      if (sStation.includes("日暮里") || sStation.includes("千住") || schoolDistrict.includes("荒川区") || schoolDistrict.includes("足立区")) {
        crossTrainMin = 50;
        hubStation = "日暮里駅";
        transferNote = "常磐線快速直通";
      } else if (schoolDistrict.includes("千代田区") || schoolDistrict.includes("文京区") || sStation.includes("水道橋") || sStation.includes("御茶ノ水") || sStation.includes("東京")) {
        // 都心部（文京区・千代田区など）
        crossTrainMin = 68;
        hubStation = "上野・秋葉原駅";
        transferNote = "JR常磐線＋JR山手線・地下鉄線";
      } else {
        // 城西・城南（渋谷区・新宿区・世田谷区・港区など：片道80〜95分）
        crossTrainMin = 82;
        hubStation = "上野・日暮里駅";
        transferNote = "JR常磐線＋山手線または東京メトロ線";
      }
    } else if (schoolPref === "千葉県") {
      // 東葛（柏・松戸・我孫子・流山）
      if (sStation.includes("柏") || sStation.includes("松戸") || sStation.includes("我孫子") || schoolDistrict.includes("柏") || schoolDistrict.includes("松戸")) {
        crossTrainMin = 25;
        hubStation = "柏駅";
        transferNote = "JR常磐線快速直通";
      } else {
        // 千葉市・幕張・船橋など
        crossTrainMin = 70;
        hubStation = "新松戸・西船橋駅";
        transferNote = "JR常磐線＋武蔵野線または総武線";
      }
    } else if (schoolPref === "埼玉県") {
      crossTrainMin = 75;
      hubStation = "南流山・大宮駅";
      transferNote = "JR常磐線＋武蔵野線・JR線";
    } else if (schoolPref === "神奈川県") {
      crossTrainMin = 95;
      hubStation = "上野・東京・横浜駅";
      transferNote = "上野東京ライン直通＋JR根岸線・私鉄線";
    } else if (schoolPref === "栃木県" || schoolPref === "群馬県") {
      crossTrainMin = 75;
      hubStation = "小山・友部駅";
      transferNote = "水戸線・両毛線";
    }
  } else if (userPref === "神奈川県") {
    if (schoolPref === "東京都") {
      crossTrainMin = schoolDistrict.includes("世田谷") || schoolDistrict.includes("渋谷") || schoolDistrict.includes("品川") ? 25 : 45;
      hubStation = "品川・渋谷駅";
    } else if (schoolPref === "埼玉県" || schoolPref === "千葉県") {
      crossTrainMin = 70;
      hubStation = "東京・新宿駅";
    } else if (schoolPref === "茨城県") {
      crossTrainMin = 100;
      hubStation = "東京・上野駅";
    }
  } else if (userPref === "埼玉県") {
    if (schoolPref === "東京都") {
      crossTrainMin = schoolDistrict.includes("豊島") || schoolDistrict.includes("北区") ? 25 : 45;
      hubStation = "池袋・上野駅";
    } else if (schoolPref === "千葉県" || schoolPref === "神奈川県") {
      crossTrainMin = 65;
      hubStation = "武蔵浦和・赤羽駅";
    } else if (schoolPref === "茨城県") {
      crossTrainMin = 75;
      hubStation = "南流山・柏駅";
    }
  } else if (userPref === "千葉県") {
    if (schoolPref === "東京都") {
      crossTrainMin = 40;
      hubStation = "錦糸町・東京駅";
    } else if (schoolPref === "茨城県") {
      crossTrainMin = 45;
      hubStation = "柏・松戸駅";
    } else if (schoolPref === "神奈川県") {
      crossTrainMin = 75;
      hubStation = "東京駅";
    }
  }

  const totalCross = crossTrainMin + walkMin;

  return {
    total_minutes: totalCross,
    route_summary: `【電車乗換＋徒歩】ご自宅最寄り「${uStation || '自宅最寄駅'}駅」より ${transferNote}で約${crossTrainMin}分（${hubStation}経由）→「${sStation}駅」下車 徒歩約${walkMin}分（合計所要時間：約${totalCross}分）`,
    is_walk_bicycle: false,
    method_type: "train",
    is_commutable: totalCross <= 90
  };
}
