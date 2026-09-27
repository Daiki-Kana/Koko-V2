import { School } from '../types';

export const MOCK_SCHOOLS: School[] = [
  {
    id: 'school-1',
    name: '芝浦工大附属中学校',
    nameRuby: 'しばうらこうだいふぞくちゅうがっこう',
    type: 'attached',
    typeLabel: '大学附属校（共学）',
    vibe: 'liberal',
    vibeLabel: 'ものづくり重視・先進教育',
    deviationScore: 56,
    firstYearTuition: 125, // 125万円
    commuteMinutes: 48,
    transfersCount: 1,
    location: '東京都江東区豊洲',
    catchphrase: '本物のラボと3Dプリンターで、自分のアイデアを形にできる学校',
    relatedInterests: ['science', 'programming', 'math', 'art'],
    features: ['最先端のものづくりラボ', '一人一台PC', '大学研究室との連携', '広々とした芝生エリア'],
    officialQuotes: [
      {
        topic: '教育理念・探究学習',
        sourceUrlTitle: '公式サイト「STEAM教育・ものづくり教育」より',
        originalQuote: '「創造性の育成」を掲げ、中学校段階から工学的な思考力とプログラミングを活用した実践的な課題解決型学習（PBL）を展開しています。',
        kidTranslation: '頭で覚えるだけでなく、ロボットを組み立てたりゲームを作ったりして、「自分で考えて形にする力」をたっぷり鍛える授業があるよ！'
      },
      {
        topic: '施設と部活動',
        sourceUrlTitle: '公式サイト「施設紹介・クラブ活動」より',
        originalQuote: '工作機械やレーザーカッターを備えたファブラボを完備。電子技術研究部やロボット部は各種全国大会でも優れた成績を収めています。',
        kidTranslation: 'プロが使うようなすごい工作マシンがいつでも使えるよ！放課後は、自分で作ったロボットを動かして全国大会を目指す先輩たちがいっぱい！'
      }
    ],
    matchReasonBadge: '君の「理科・実験」「プログラミング」への興味と、大学レベルの本格ラボがぴったり！',
    concurrentExamTrend: '都市大等々力、芝、高輪などの理系・共学校との併願が多い傾向です。'
  },
  {
    id: 'school-2',
    name: '武蔵野の森自然学園中学校',
    nameRuby: 'むさしのもりしぜんがくえんちゅうがっこう',
    type: 'coed',
    typeLabel: '共学校（進学校）',
    vibe: 'liberal',
    vibeLabel: 'のびのび自然探究・自主自立',
    deviationScore: 52,
    firstYearTuition: 98, // 98万円
    commuteMinutes: 35,
    transfersCount: 0,
    location: '東京都三鷹市',
    catchphrase: '広大な森とビオトープ。生き物や自然にとことん触れ合える学校',
    relatedInterests: ['science', 'art', 'sports', 'cooking'],
    features: ['本物の里山と小川', '天文台ドーム', '生徒手作りの文化祭', 'グラウンド2面'],
    officialQuotes: [
      {
        topic: '体験学習と理科教育',
        sourceUrlTitle: '公式サイト「校外学習・フィールドワーク紹介」より',
        originalQuote: '豊かな自然環境を生かしたフィールドワークを重視し、土壌・生物の生態観察や天体観測を通して、生命への畏敬と科学的探究心を育みます。',
        kidTranslation: '机の上で教科書を読むだけじゃなく、実際に小川に入って生き物を探したり、夜の望遠鏡で星を観察するワクワク授業がたくさんあるよ！'
      },
      {
        topic: '学校生活と校風',
        sourceUrlTitle: '公式サイト「学校生活と自主活動」より',
        originalQuote: '細かな規則で縛ることなく、生徒一人ひとりの主体的な判断を尊重し、穏やかでアットホームなコミュニティを形成しています。',
        kidTranslation: '厳しいルールで細かく注意されるのではなく、「自分で考えてやってみよう」を応援してくれる、とても優しくて落ち着いた雰囲気だよ。'
      }
    ],
    matchReasonBadge: '君の「自然・生き物」「のびのび過ごしたい」気持ちと、里山キャンパスがぴったり！',
    concurrentExamTrend: '成蹊、中央大学附属、多摩大聖ヶ丘など、自然豊かでアットホームな学校との併願が人気です。'
  },
  {
    id: 'school-3',
    name: '聖徳学園未来創造中学校',
    nameRuby: 'せいとくがくえんみらいそうぞうちゅうがっこう',
    type: 'coed',
    typeLabel: '共学校（進学校）',
    vibe: 'supportive',
    vibeLabel: '一人ひとりを丁寧に伸ばす・面倒見',
    deviationScore: 54,
    firstYearTuition: 110, // 110万円
    commuteMinutes: 40,
    transfersCount: 1,
    location: '東京都武蔵野市',
    catchphrase: '「わからない」をそのままにしない。先生と先輩が温かく寄り添う学校',
    relatedInterests: ['math', 'japanese', 'english', 'art'],
    features: ['放課後学習カフェ', '個別サポート体制', '選べる体験講座', '明るい図書スペース'],
    officialQuotes: [
      {
        topic: '学習指導体制',
        sourceUrlTitle: '公式サイト「学習サポートシステム」より',
        originalQuote: '放課後の自習室にはチューターや専任教員が常駐し、つまずきを即座に解消する個別最適化されたフォロー体制を整えています。',
        kidTranslation: '宿題や勉強で「ここがわからないな」と思ったとき、優しい先生やお兄さん・お姉さんがすぐ隣でていねいに教えてくれる安心の場所があるよ！'
      },
      {
        topic: '表現力・英語教育',
        sourceUrlTitle: '公式サイト「グローバル探究コース」より',
        originalQuote: '少人数制のネイティブスピーカーによる授業とプレゼンテーション教育を通じて、自分の考えを自信を持って発信する力を育みます。',
        kidTranslation: '外国人の先生と楽しくおしゃべりしながら、自分の好きなことや調べたことをみんなの前で堂々と発表できるようになるよ！'
      }
    ],
    matchReasonBadge: '君の「じっくり勉強したい」「先生に質問しやすい環境」への希望とぴったり！',
    concurrentExamTrend: '淑徳、穎明館、帝京大学中学校など、きめ細やかな学習指導に定評のある学校と併願されます。'
  },
  {
    id: 'school-4',
    name: '開知アカデミー中学校',
    nameRuby: 'かいちあかでみーちゅうがっこう',
    type: 'coed',
    typeLabel: '共学校（進学校）',
    vibe: 'international',
    vibeLabel: '探究調べ学習・国際規律',
    deviationScore: 60,
    firstYearTuition: 130, // 130万円
    commuteMinutes: 55,
    transfersCount: 2,
    location: '東京都千代田区',
    catchphrase: '知的好奇心を刺激する巨大図書館と、世界とつながる探究学習',
    relatedInterests: ['social', 'english', 'japanese', 'programming'],
    features: ['3万冊の蔵書を持つ図書館', '海外オンライン交流', 'ディベート大会', '駅徒歩3分'],
    officialQuotes: [
      {
        topic: '探究学習カリキュラム',
        sourceUrlTitle: '公式サイト「独自カリキュラム：知の冒険」より',
        originalQuote: '生徒自身が問いを設定し、文献調査やフィールドワークを経て論文を執筆する探究活動を中1から体系的に実施しています。',
        kidTranslation: '自分が「面白い！」と思ったテーマ（歴史の謎や世界の不思議など）をとことん調べて、自分だけの特別な研究レポートを作る授業があるよ！'
      },
      {
        topic: '図書館と読書環境',
        sourceUrlTitle: '公式サイト「メディアセンター紹介」より',
        originalQuote: '開放的な吹き抜け構造のラーニングコモンズには、専門書から児童文学、電子書籍まで揃い、知的好奇心のハブとして機能しています。',
        kidTranslation: 'まるで大きな秘密基地のようなピカピカの図書館！静かに本を読めるソファーや、仲間と作戦会議ができるスペースもあるよ。'
      }
    ],
    matchReasonBadge: '君の「本・歴史・世界の不思議」への好奇心と、知の秘密基地のような環境がぴったり！',
    concurrentExamTrend: '三田国際、広尾学園、東京都市大付属など、先進的な国際・探究系学校との併願が見られます。'
  }
];
