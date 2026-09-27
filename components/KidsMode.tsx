'use client';

import React from 'react';
import {
  Calculator,
  FlaskConical,
  Palette,
  Music,
  Trophy,
  BookOpen,
  Compass,
  Laptop,
  Globe,
  Utensils,
  Smile,
  CheckCircle2,
  HelpCircle,
  AlertCircle,
  Frown,
  Meh
} from 'lucide-react';
import {
  InterestCategory,
  KidsPreferences,
  VisitReview,
  ImpressionLevel
} from '../types';

interface KidsModeProps {
  preferences: KidsPreferences;
  onUpdatePreferences: (updated: Partial<KidsPreferences>) => void;
  visitReviews: VisitReview[];
  onAddVisitReview: (review: VisitReview) => void;
  onCompleteStep1: () => void;
}

// 10種類の興味・関心選択肢データ（総ルビ対応）
const INTEREST_OPTIONS: {
  id: InterestCategory;
  title: string;
  ruby: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}[] = [
  {
    id: 'math',
    title: '算数・数字',
    ruby: 'さんすう・すうじ',
    desc: '計算やパズル、図形あてなど',
    icon: Calculator
  },
  {
    id: 'science',
    title: '理科・実験',
    ruby: 'りか・じっけん',
    desc: '生き物の観察や化学実験、天気の観察など',
    icon: FlaskConical
  },
  {
    id: 'art',
    title: 'アート・工作・デザイン',
    ruby: 'あーと・こうさく・でざいん',
    desc: '絵を描く、ものづくりなど',
    icon: Palette
  },
  {
    id: 'music',
    title: '音楽・演奏',
    ruby: 'おんがく・えんそう',
    desc: '歌を歌う、楽器を演奏するなど',
    icon: Music
  },
  {
    id: 'sports',
    title: '体育・スポーツ',
    ruby: 'たいいく・すぽーつ',
    desc: '走る、ボール遊び、体を動かすこと',
    icon: Trophy
  },
  {
    id: 'japanese',
    title: '国語・読書',
    ruby: 'こくご・どくしょ',
    desc: '本やマンガを読む、物語を書くなど',
    icon: BookOpen
  },
  {
    id: 'social',
    title: '社会・歴史',
    ruby: 'しゃかい・れきし',
    desc: '昔の人の話や地図、街の探検など',
    icon: Compass
  },
  {
    id: 'programming',
    title: 'プログラミング・パソコン',
    ruby: 'ぷろぐらみんぐ・ぱそこん',
    desc: 'ゲームづくりやタイピングなど',
    icon: Laptop
  },
  {
    id: 'english',
    title: '英語・外国のことば',
    ruby: 'えいご・がいこくのことば',
    desc: '外国の文化や英会話など',
    icon: Globe
  },
  {
    id: 'cooking',
    title: '料理・生活・家庭科',
    ruby: 'りょうり・せいかつ・かていか',
    desc: 'お菓子づくりや裁縫など',
    icon: Utensils
  }
];

export const KidsMode: React.FC<KidsModeProps> = ({
  preferences,
  onUpdatePreferences,
  visitReviews,
  onAddVisitReview,
  onCompleteStep1
}) => {
  const [activeTab, setActiveTab] = React.useState<'interests' | 'schoolLife' | 'visitReview'>('interests');

  // 見学振り返り用ローカルステート
  const [reviewSchoolName, setReviewSchoolName] = React.useState('');
  const [selectedImpression, setSelectedImpression] = React.useState<ImpressionLevel | null>(null);
  const [reviewHighlightCategories, setReviewHighlightCategories] = React.useState<{ [key: string]: boolean }>({});
  const [highlightComments, setHighlightComments] = React.useState<{ [key: string]: string }>({});
  const [overallReviewComment, setOverallReviewComment] = React.useState('');

  const handleInterestSelect = (id: InterestCategory) => {
    onUpdatePreferences({ selectedInterest: id });
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdatePreferences({ interestDetail: e.target.value });
  };

  const isStep1Valid = !!preferences.selectedInterest && preferences.interestDetail.trim().length > 0;

  // 見学レビューの保存処理
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewSchoolName.trim() || !selectedImpression) {
      alert('がっこうのなまえと、きもちのアイコンをえらんでね！');
      return;
    }

    const highlights = [
      { category: 'senpai' as const, label: '先輩の雰囲気', ruby: 'せんぱいのふんいき', checked: !!reviewHighlightCategories['senpai'], comment: highlightComments['senpai'] || '' },
      { category: 'club' as const, label: 'クラブ実演', ruby: 'くらぶじつえん', checked: !!reviewHighlightCategories['club'], comment: highlightComments['club'] || '' },
      { category: 'facilities' as const, label: '校舎・設備', ruby: 'こうしゃ・せつび', checked: !!reviewHighlightCategories['facilities'], comment: highlightComments['facilities'] || '' },
      { category: 'teachers' as const, label: '先生の優しさ', ruby: 'せんせいのやさしさ', checked: !!reviewHighlightCategories['teachers'], comment: highlightComments['teachers'] || '' },
      { category: 'festival' as const, label: 'イベント盛り上がり', ruby: 'いべんともりあがり', checked: !!reviewHighlightCategories['festival'], comment: highlightComments['festival'] || '' },
      { category: 'uniform' as const, label: '制服', ruby: 'せいふく', checked: !!reviewHighlightCategories['uniform'], comment: highlightComments['uniform'] || '' },
      { category: 'other' as const, label: 'その他', ruby: 'そのた', checked: !!reviewHighlightCategories['other'], comment: highlightComments['other'] || '' }
    ];

    const newReview: VisitReview = {
      id: 'rev_' + Date.now(),
      schoolId: 'manual_' + Date.now(),
      schoolName: reviewSchoolName,
      visitDate: new Date().toLocaleDateString('ja-JP'),
      impression: selectedImpression,
      highlights: highlights,
      overallComment: overallReviewComment
    };

    onAddVisitReview(newReview);
    setReviewSchoolName('');
    setSelectedImpression(null);
    setReviewHighlightCategories({});
    setHighlightComments({});
    setOverallReviewComment('');
    alert('みまもりノートにきろくしたよ！おうちのひとにもとどきます。');
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-16">
      {/* キッズモード内サブナビゲーション */}
      <div className="flex border-b-2 border-[#CBD5E0] bg-[#FFFFFF] mb-8 sticky top-16 z-10">
        <button
          type="button"
          onClick={() => setActiveTab('interests')}
          className={`flex-1 py-4 text-center font-bold text-lg min-h-[48px] border-b-4 transition-colors ${
            activeTab === 'interests'
              ? 'border-[#2B6CB0] text-[#2B6CB0] bg-[#F7FAFC]'
              : 'border-transparent text-gray-600 hover:text-[#2B6CB0]'
          }`}
        >
          <ruby>第<rt>だい</rt>1<rt></rt>歩<rt>ぽ</rt></ruby>：
          <ruby>好<rt>す</rt></ruby>きなこと
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('schoolLife')}
          className={`flex-1 py-4 text-center font-bold text-lg min-h-[48px] border-b-4 transition-colors ${
            activeTab === 'schoolLife'
              ? 'border-[#2B6CB0] text-[#2B6CB0] bg-[#F7FAFC]'
              : 'border-transparent text-gray-600 hover:text-[#2B6CB0]'
          }`}
        >
          <ruby>第<rt>だい</rt>2<rt></rt>歩<rt>ぽ</rt></ruby>：
          <ruby>学校<rt>がっこう</rt></ruby>でのすごし<ruby>方<rt>かた</rt></ruby>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('visitReview')}
          className={`flex-1 py-4 text-center font-bold text-lg min-h-[48px] border-b-4 transition-colors ${
            activeTab === 'visitReview'
              ? 'border-[#2B6CB0] text-[#2B6CB0] bg-[#F7FAFC]'
              : 'border-transparent text-gray-600 hover:text-[#2B6CB0]'
          }`}
        >
          <ruby>行<rt>い</rt></ruby>ってきたよシート
        </button>
      </div>

      {/* ========================================================
          A. 一番ワクワクすること（機能2：ステップ1）
          ======================================================== */}
      {activeTab === 'interests' && (
        <section aria-labelledby="interest-title" className="bg-[#FFFFFF] border-2 border-[#E2E8F0] p-6 md:p-8 rounded-lg">
          <div className="mb-6">
            <span className="inline-block bg-[#EBF8FF] text-[#2B6CB0] text-sm font-bold px-3 py-1 rounded border border-[#BEE3F8] mb-2">
              きみの<ruby>好<rt>す</rt></ruby>きをみつけよう
            </span>
            <h2 id="interest-title" className="text-2xl md:text-3xl font-extrabold text-[#1A365D] tracking-wide">
              一番ワクワクすること・好きなことはどれ？
            </h2>
            <p className="text-gray-600 text-base md:text-lg mt-2">
              どれか1つをえらんで、したの<ruby>自由<rt>じゆう</rt></ruby>に<ruby>書<rt>か</rt></ruby>くところに、きみのことばでおしえてね！
            </p>
          </div>

          {/* 10種類の選択肢カード（ソリッド単色・グラデーションなし・アイコン配置） */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {INTEREST_OPTIONS.map((item) => {
              const IconComp = item.icon;
              const isSelected = preferences.selectedInterest === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleInterestSelect(item.id)}
                  className={`flex items-start text-left p-4 rounded-lg border-2 min-h-[72px] transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#2B6CB0] bg-[#EBF8FF] ring-2 ring-[#2B6CB0]'
                      : 'border-[#CBD5E0] bg-[#FFFFFF] hover:border-[#2B6CB0] hover:bg-[#F7FAFC]'
                  }`}
                >
                  <div
                    className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded border mr-4 ${
                      isSelected
                        ? 'bg-[#2B6CB0] text-[#FFFFFF] border-[#2B6CB0]'
                        : 'bg-[#F7FAFC] text-[#2B6CB0] border-[#CBD5E0]'
                    }`}
                  >
                    <IconComp size={26} />
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-bold text-[#1A365D] leading-tight mb-1">
                      <ruby>
                        {item.title}
                        <rt className="text-xs font-normal text-gray-500">{item.ruby}</rt>
                      </ruby>
                    </div>
                    <div className="text-sm text-gray-600 leading-snug">{item.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 必須：自由記述欄 */}
          <div className="border-t-2 border-[#E2E8F0] pt-6 mb-6">
            <label htmlFor="interest-detail-input" className="block text-lg font-extrabold text-[#1A365D] mb-2">
              どんなところが好きなのか教えてね！
              <span className="ml-2 inline-block bg-[#C53030] text-[#FFFFFF] text-xs font-bold px-2 py-0.5 rounded">
                ぜったい<ruby>書<rt>か</rt></ruby>いてね
              </span>
            </label>
            <p className="text-sm text-gray-600 mb-2">
              （例：<ruby>顕微鏡<rt>けんびきょう</rt></ruby>でプランクトンをじっくり<ruby>見<rt>み</rt></ruby>るのが<ruby>好<rt>す</rt></ruby>き、自分でダンボールの仕掛けを作るのが楽しい）
            </p>
            <textarea
              id="interest-detail-input"
              value={preferences.interestDetail}
              onChange={handleDetailChange}
              rows={4}
              placeholder="ここにきみのすきなことをじゆうにかいてね！"
              className="w-full text-base md:text-lg p-4 border-2 border-[#CBD5E0] rounded-lg focus:border-[#2B6CB0] focus:outline-none bg-[#FFFFFF] text-gray-800"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              disabled={!isStep1Valid}
              onClick={() => {
                onCompleteStep1();
                setActiveTab('schoolLife');
              }}
              className={`min-h-[48px] px-8 py-3 rounded-lg text-lg font-extrabold border-2 transition-colors ${
                isStep1Valid
                  ? 'bg-[#2B6CB0] text-[#FFFFFF] border-[#2B6CB0] hover:bg-[#1A365D]'
                  : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
              }`}
            >
              つぎの<ruby>質問<rt>しつもん</rt></ruby>へすすむ
            </button>
          </div>
        </section>
      )}

      {/* ========================================================
          B. 学校生活で重視したいこと（3問＋自由記述）
          ======================================================== */}
      {activeTab === 'schoolLife' && (
        <section aria-labelledby="school-life-title" className="bg-[#FFFFFF] border-2 border-[#E2E8F0] p-6 md:p-8 rounded-lg">
          <div className="mb-6">
            <span className="inline-block bg-[#EBF8FF] text-[#2B6CB0] text-sm font-bold px-3 py-1 rounded border border-[#BEE3F8] mb-2">
              きみにとって<ruby>過<rt>す</rt></ruby>ごしやすい<ruby>場所<rt>ばしょ</rt></ruby>
            </span>
            <h2 id="school-life-title" className="text-2xl md:text-3xl font-extrabold text-[#1A365D]">
              学校生活で大切にしたいこと
            </h2>
            <p className="text-gray-600 text-base mt-1">
              毎日の学校生活をイメージして、ピンとくるものを選んでみてね。
            </p>
          </div>

          <div className="space-y-8">
            {/* 質問1：学校の雰囲気 */}
            <div className="p-4 border-2 border-[#E2E8F0] rounded-lg bg-[#F7FAFC]">
              <h3 className="text-lg font-bold text-[#1A365D] mb-3">
                1. どんな学校の雰囲気が好き？
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {[
                  { id: 'nature', label: '広くてのびのび自然豊か' },
                  { id: 'modern', label: '最新のパソコンや実験室が充実' },
                  { id: 'traditional', label: '歴史や伝統があって落ち着いている' },
                  { id: 'friendly', label: 'アットホームでみんな仲良し' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onUpdatePreferences({ atmosphere: item.id as any })}
                    className={`min-h-[48px] p-3 rounded border text-left font-bold text-sm md:text-base ${
                      preferences.atmosphere === item.id
                        ? 'border-[#2B6CB0] bg-[#EBF8FF] text-[#2B6CB0]'
                        : 'border-[#CBD5E0] bg-[#FFFFFF] text-gray-700 hover:border-[#2B6CB0]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="もっと詳しくあれば書いてね（例：図書室が広くて静かなところ）"
                value={preferences.atmosphereDetail}
                onChange={(e) => onUpdatePreferences({ atmosphereDetail: e.target.value })}
                className="w-full p-3 border border-[#CBD5E0] rounded bg-[#FFFFFF] text-sm md:text-base focus:border-[#2B6CB0] focus:outline-none"
              />
            </div>

            {/* 質問2：授業や勉強スタイル */}
            <div className="p-4 border-2 border-[#E2E8F0] rounded-lg bg-[#F7FAFC]">
              <h3 className="text-lg font-bold text-[#1A365D] mb-3">
                2. 授業や勉強のスタイルはどっちが合いそう？
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {[
                  { id: 'lecture', label: '先生の話をじっくり聞いて理解する' },
                  { id: 'discussion', label: 'グループで話し合ったり発表したりする' },
                  { id: 'inquiry', label: '自分でテーマを決めて調べ学習・研究をする' },
                  { id: 'exercise', label: '問題をたくさん解いて力をつける' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onUpdatePreferences({ studyStyle: item.id as any })}
                    className={`min-h-[48px] p-3 rounded border text-left font-bold text-sm md:text-base ${
                      preferences.studyStyle === item.id
                        ? 'border-[#2B6CB0] bg-[#EBF8FF] text-[#2B6CB0]'
                        : 'border-[#CBD5E0] bg-[#FFFFFF] text-gray-700 hover:border-[#2B6CB0]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="もっと詳しくあれば書いてね（例：自分で工作しながら学びたい）"
                value={preferences.studyStyleDetail}
                onChange={(e) => onUpdatePreferences({ studyStyleDetail: e.target.value })}
                className="w-full p-3 border border-[#CBD5E0] rounded bg-[#FFFFFF] text-sm md:text-base focus:border-[#2B6CB0] focus:outline-none"
              />
            </div>

            {/* 質問3：先輩や先生との関係性 */}
            <div className="p-4 border-2 border-[#E2E8F0] rounded-lg bg-[#F7FAFC]">
              <h3 className="text-lg font-bold text-[#1A365D] mb-3">
                3. 先輩や先生との関係性はどんな感じがいい？
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {[
                  { id: 'friendly', label: 'フレンドリーで気軽に何でも話せる' },
                  { id: 'polite', label: '礼儀正しく、お互いを尊重して落ち着いている' },
                  { id: 'supportive', label: '困ったときに手厚くしっかり助けてくれる' },
                  { id: 'watching', label: '自分のペースを大切に、そっと見守ってくれる' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onUpdatePreferences({ mentorRelationship: item.id as any })}
                    className={`min-h-[48px] p-3 rounded border text-left font-bold text-sm md:text-base ${
                      preferences.mentorRelationship === item.id
                        ? 'border-[#2B6CB0] bg-[#EBF8FF] text-[#2B6CB0]'
                        : 'border-[#CBD5E0] bg-[#FFFFFF] text-gray-700 hover:border-[#2B6CB0]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="もっと詳しくあれば書いてね（例：先生が質問に優しく答えてくれるところ）"
                value={preferences.mentorRelationshipDetail}
                onChange={(e) => onUpdatePreferences({ mentorRelationshipDetail: e.target.value })}
                className="w-full p-3 border border-[#CBD5E0] rounded bg-[#FFFFFF] text-sm md:text-base focus:border-[#2B6CB0] focus:outline-none"
              />
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          機能4：学校見学の振り返りシート（直感・おっ！・自由記述）
          ======================================================== */}
      {activeTab === 'visitReview' && (
        <section aria-labelledby="review-title" className="bg-[#FFFFFF] border-2 border-[#E2E8F0] p-6 md:p-8 rounded-lg">
          <div className="mb-6">
            <span className="inline-block bg-[#EBF8FF] text-[#2B6CB0] text-sm font-bold px-3 py-1 rounded border border-[#BEE3F8] mb-2">
              きおくが新しいうちにメモしよう！
            </span>
            <h2 id="review-title" className="text-2xl md:text-3xl font-extrabold text-[#1A365D]">
              学校見学の振り返りシート
            </h2>
            <p className="text-gray-600 text-base mt-1">
              文化祭や見学に行ってきたときの気持ちを、直感のままメモしてね。
            </p>
          </div>

          <form onSubmit={handleSaveReview} className="space-y-8">
            {/* 学校名入力 */}
            <div>
              <label htmlFor="school-name-review" className="block text-base font-bold text-[#1A365D] mb-2">
                行った学校のなまえ
              </label>
              <input
                id="school-name-review"
                type="text"
                value={reviewSchoolName}
                onChange={(e) => setReviewSchoolName(e.target.value)}
                placeholder="例：芝浦工大附属中学校"
                required
                className="w-full p-3 border-2 border-[#CBD5E0] rounded-lg text-lg focus:border-[#2B6CB0] focus:outline-none bg-[#FFFFFF]"
              />
            </div>

            {/* ステップ1：直感的な印象（6択アイコン） */}
            <div>
              <label className="block text-base font-bold text-[#1A365D] mb-2">
                ステップ1：行ってみての直感的な気持ちは？（1つえらんでね）
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { level: 1 as ImpressionLevel, label: 'めちゃくちゃ楽しかった！通いたい！', icon: Smile, color: 'text-green-700' },
                  { level: 2 as ImpressionLevel, label: 'いいなと思うところが結構あった', icon: CheckCircle2, color: 'text-blue-700' },
                  { level: 3 as ImpressionLevel, label: '普通かな・まだよくわからない', icon: Meh, color: 'text-gray-600' },
                  { level: 4 as ImpressionLevel, label: '思っていた雰囲気とちょっと違った', icon: HelpCircle, color: 'text-yellow-700' },
                  { level: 5 as ImpressionLevel, label: '自分には少し合わない気がした', icon: Frown, color: 'text-orange-700' },
                  { level: 6 as ImpressionLevel, label: '疲れてしまってよく見られなかった', icon: AlertCircle, color: 'text-purple-700' }
                ].map((item) => {
                  const IconComp = item.icon;
                  const isSelected = selectedImpression === item.level;
                  return (
                    <button
                      key={item.level}
                      type="button"
                      onClick={() => setSelectedImpression(item.level)}
                      className={`min-h-[56px] p-3 rounded-lg border-2 text-left flex items-center transition-all ${
                        isSelected
                          ? 'border-[#2B6CB0] bg-[#EBF8FF] ring-2 ring-[#2B6CB0]'
                          : 'border-[#CBD5E0] bg-[#FFFFFF] hover:border-[#2B6CB0]'
                      }`}
                    >
                      <div className={`mr-3 ${item.color}`}>
                        <IconComp size={24} />
                      </div>
                      <span className="text-sm font-bold text-gray-800 leading-tight">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ステップ2：どこが一番「おっ！」と気になったか */}
            <div>
              <label className="block text-base font-bold text-[#1A365D] mb-1">
                ステップ2：どこが一番「おっ！」と気になった？（あてはまるものにチェック＆メモ）
              </label>
              <p className="text-sm text-gray-500 mb-3">
                具体的にどこ・だれを見てそう思ったか教えてね！
              </p>
              <div className="space-y-3">
                {[
                  { id: 'senpai', label: '先輩の雰囲気' },
                  { id: 'club', label: 'クラブ・部活動の実演や展示' },
                  { id: 'facilities', label: '校舎・実験室・図書室などの設備' },
                  { id: 'teachers', label: '先生の話しやすさや優しさ' },
                  { id: 'festival', label: 'イベントの盛り上がり' },
                  { id: 'uniform', label: '制服や先輩の着こなし' },
                  { id: 'other', label: 'その他' }
                ].map((item) => {
                  const isChecked = !!reviewHighlightCategories[item.id];
                  return (
                    <div key={item.id} className="p-3 border border-[#CBD5E0] rounded bg-[#F7FAFC]">
                      <label className="flex items-center font-bold text-gray-800 cursor-pointer min-h-[36px]">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            setReviewHighlightCategories({
                              ...reviewHighlightCategories,
                              [item.id]: e.target.checked
                            });
                          }}
                          className="w-5 h-5 text-[#2B6CB0] rounded border-gray-300 mr-3"
                        />
                        <span>{item.label}</span>
                      </label>
                      {isChecked && (
                        <div className="mt-2 pl-8">
                          <input
                            type="text"
                            placeholder="具体的にどんなところだった？（例：鉄道部のジオラマが細かくてすごかった）"
                            value={highlightComments[item.id] || ''}
                            onChange={(e) => {
                              setHighlightComments({
                                ...highlightComments,
                                [item.id]: e.target.value
                              });
                            }}
                            className="w-full p-2 border border-[#CBD5E0] rounded bg-[#FFFFFF] text-sm focus:border-[#2B6CB0] focus:outline-none"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ステップ3：全体の任意自由記述欄 */}
            <div>
              <label htmlFor="overall-comment" className="block text-base font-bold text-[#1A365D] mb-1">
                ステップ3：おうちの人に伝えたいこと・メモ（自由にかいてね）
              </label>
              <textarea
                id="overall-comment"
                rows={3}
                value={overallReviewComment}
                onChange={(e) => setOverallReviewComment(e.target.value)}
                placeholder="例：学食のカレーがおいしそうだった！通うのに少し電車が混みそうだった。"
                className="w-full p-3 border-2 border-[#CBD5E0] rounded-lg text-base focus:border-[#2B6CB0] focus:outline-none bg-[#FFFFFF]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="min-h-[48px] px-8 py-3 rounded-lg text-lg font-extrabold bg-[#2B6CB0] text-[#FFFFFF] border-2 border-[#2B6CB0] hover:bg-[#1A365D] transition-colors"
              >
                見学のきろくを保存する
              </button>
            </div>
          </form>

          {/* 保存済みレビュー一覧 */}
          {visitReviews.length > 0 && (
            <div className="mt-12 pt-8 border-t-2 border-[#E2E8F0]">
              <h3 className="text-xl font-bold text-[#1A365D] mb-4">
                これまでに書いた見学のきろく
              </h3>
              <div className="space-y-4">
                {visitReviews.map((rev) => (
                  <div key={rev.id} className="p-4 border-2 border-[#CBD5E0] rounded-lg bg-[#F7FAFC]">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-extrabold text-[#1A365D]">{rev.schoolName}</h4>
                      <span className="text-xs text-gray-500">{rev.visitDate}</span>
                    </div>
                    {rev.overallComment && (
                      <p className="text-sm text-gray-700 bg-[#FFFFFF] p-3 rounded border border-[#E2E8F0] mt-2">
                        {rev.overallComment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
