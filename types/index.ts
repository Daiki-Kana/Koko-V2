/**
 * 中学受験支援サービス「ここがいいノート」型定義
 */

// ==========================================
// 1. 保護者（親）の要望・譲れない条件
// ==========================================
export type SchoolType = 'coed' | 'boys' | 'girls' | 'attached' | 'prep'; // 共学, 男子, 女子, 大附属, 進学
export type SchoolVibePreference = 'liberal' | 'supportive' | 'traditional' | 'international'; // 自由放任, 面倒見, 伝統・規律, 国際

export interface ParentRequirements {
  nearestStation: string;        // 最寄駅名
  walkMinutes: number;           // 駅徒歩分数
  maxCommuteMinutes: number;     // 通学時間上限（必須・譲れない条件）
  commuteMethods: ('train' | 'bus' | 'walk' | 'bicycle')[]; // 通学方法
  maxTransfers: number;          // 乗り換え回数上限
  maxFirstYearTuition: number;   // 初年度学費上限（万円 / 必須・譲れない条件、0は上限なし）
  preferredVibe: SchoolVibePreference[]; // 希望校風
  schoolTypes: SchoolType[];     // 希望学校種別
}

// ==========================================
// 2. 子どもの興味・希望（キッズモード）
// ==========================================
export type InterestCategory =
  | 'math'       // 算数・数字
  | 'science'    // 理科・実験
  | 'art'        // アート・工作・デザイン
  | 'music'      // 音楽・演奏
  | 'sports'     // 体育・スポーツ
  | 'japanese'   // 国語・読書
  | 'social'     // 社会・歴史
  | 'programming'// プログラミング・パソコン
  | 'english'    // 英語・外国のことば
  | 'cooking';   // 料理・生活・家庭科

export interface InterestOption {
  id: InterestCategory;
  title: string;
  ruby: string;       // ふりがな
  description: string;
  iconName: string;   // Lucideアイコン名
}

export interface KidsPreferences {
  // A. 一番ワクワクすること（必須1問 + 自由記述必須）
  selectedInterest: InterestCategory | null;
  interestDetail: string; // どんなところが好きなのか（必須自由記述）

  // B. 学校生活で重視したいこと（3問 + 自由記述）
  atmosphere: 'nature' | 'modern' | 'traditional' | 'friendly' | '';
  atmosphereDetail: string; // 自由記述

  studyStyle: 'lecture' | 'discussion' | 'inquiry' | 'exercise' | '';
  studyStyleDetail: string; // 自由記述

  mentorRelationship: 'friendly' | 'polite' | 'supportive' | 'watching' | '';
  mentorRelationshipDetail: string; // 自由記述
}

// ==========================================
// 3. 学校情報＆公式HP引用・小学生向けAI翻訳
// ==========================================
export interface OfficialQuoteTranslation {
  topic: string;             // 例: 「教育理念」「理科教育」「クラブ活動」
  originalQuote: string;     // 公式HPからの実際の引用・抜粋
  kidTranslation: string;    // 小学生（10〜12歳）向けにかみ砕いたAI翻訳
  sourceUrlTitle: string;    // 引用元ページ名（例: 「公式サイト カリキュラム紹介」）
}

export interface School {
  id: string;
  name: string;
  nameRuby: string;          // ふりがな
  type: SchoolType;
  typeLabel: string;
  vibe: SchoolVibePreference;
  vibeLabel: string;
  deviationScore: number;    // 偏差値※学力水準の目安
  firstYearTuition: number;  // 初年度学費（万円）
  commuteMinutes: number;    // 想定通学時間（分）
  transfersCount: number;    // 乗り換え回数
  location: string;
  catchphrase: string;
  relatedInterests: InterestCategory[]; // 関連する興味カテゴリ
  features: string[];        // 小学生向け特徴タグ

  // 公式HP引用と翻訳
  officialQuotes: OfficialQuoteTranslation[];

  // 個別マッチング理由（子どもの回答に応じて動的生成可能）
  matchReasonBadge: string;
  concurrentExamTrend: string; // 併願傾向※一緒に受けられることの多い学校の傾向
}

// ==========================================
// 4. 学校見学振り返りシート（キッズモード）
// ==========================================
export type ImpressionLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface ImpressionOption {
  level: ImpressionLevel;
  label: string;
  ruby: string;
  emojiText: string;
  description: string;
}

export interface VisitHighlightItem {
  category: 'senpai' | 'club' | 'facilities' | 'teachers' | 'festival' | 'uniform' | 'other';
  label: string;
  ruby: string;
  checked: boolean;
  comment: string; // 具体的にどこ・誰を見てそう思ったかの自由記述
}

export interface VisitReview {
  id: string;
  schoolId: string;
  schoolName: string;
  visitDate: string;
  // ステップ1：直感的な印象（6段階）
  impression: ImpressionLevel | null;
  // ステップ2：どこが一番「おっ！」と気になったか
  highlights: VisitHighlightItem[];
  // ステップ3：全体の自由記述（親に伝えたいこと、メモ）
  overallComment: string;
}

// ==========================================
// 5. 親子共有＆ギャップ可視化（保護者モード）
// ==========================================
export interface ParentChildInsight {
  schoolId: string;
  schoolName: string;
  parentPriorityMatch: string[];   // 親の重視点と合致している点
  childPriorityMatch: string[];    // 子どもの重視点と合致している点
  priorityGap: string;             // 親子の重視点の違い・ギャップ
  sentimentChange: string;         // 見学前後の子どもの気持ちの変化
  dinnerTalkCard: {
    question: string;              // 今夜の食卓で聞いてみよう！質問例
    reason: string;                // なぜこの質問が良いかのアドバイス
  };
}
