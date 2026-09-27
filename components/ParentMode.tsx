'use client';

import React from 'react';
import {
  ParentRequirements,
  KidsPreferences,
  VisitReview,
  School,
  SchoolType,
  SchoolVibePreference
} from '../types';

interface ParentModeProps {
  requirements: ParentRequirements;
  onUpdateRequirements: (updated: Partial<ParentRequirements>) => void;
  kidsPreferences: KidsPreferences;
  visitReviews: VisitReview[];
  recommendedSchools: School[];
}

export const ParentMode: React.FC<ParentModeProps> = ({
  requirements,
  onUpdateRequirements,
  kidsPreferences,
  visitReviews,
  recommendedSchools
}) => {
  const [activeTab, setActiveTab] = React.useState<'conditions' | 'insights'>('conditions');

  // 通学方法のチェック切り替え
  const handleCommuteMethodToggle = (method: 'train' | 'bus' | 'walk' | 'bicycle') => {
    const exists = requirements.commuteMethods.includes(method);
    const updated = exists
      ? requirements.commuteMethods.filter((m) => m !== method)
      : [...requirements.commuteMethods, method];
    onUpdateRequirements({ commuteMethods: updated });
  };

  // 学校種別の切り替え
  const handleSchoolTypeToggle = (type: SchoolType) => {
    const exists = requirements.schoolTypes.includes(type);
    const updated = exists
      ? requirements.schoolTypes.filter((t) => t !== type)
      : [...requirements.schoolTypes, type];
    onUpdateRequirements({ schoolTypes: updated });
  };

  // 校風の切り替え
  const handleVibeToggle = (vibe: SchoolVibePreference) => {
    const exists = requirements.preferredVibe.includes(vibe);
    const updated = exists
      ? requirements.preferredVibe.filter((v) => v !== vibe)
      : [...requirements.preferredVibe, vibe];
    onUpdateRequirements({ preferredVibe: updated });
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-16">
      {/* 親モード内サブタブ */}
      <div className="flex border-b-2 border-[#CBD5E0] bg-[#FFFFFF] mb-8 sticky top-16 z-10">
        <button
          type="button"
          onClick={() => setActiveTab('conditions')}
          className={`flex-1 py-4 text-center font-bold text-base md:text-lg min-h-[48px] border-b-4 transition-colors ${
            activeTab === 'conditions'
              ? 'border-[#1A365D] text-[#1A365D] bg-[#F7FAFC]'
              : 'border-transparent text-gray-600 hover:text-[#1A365D]'
          }`}
        >
          【機能1】親の譲れない条件設定
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('insights')}
          className={`flex-1 py-4 text-center font-bold text-base md:text-lg min-h-[48px] border-b-4 transition-colors ${
            activeTab === 'insights'
              ? 'border-[#1A365D] text-[#1A365D] bg-[#F7FAFC]'
              : 'border-transparent text-gray-600 hover:text-[#1A365D]'
          }`}
        >
          【機能5】親子の共有＆ギャップ可視化
        </button>
      </div>

      {/* ========================================================
          【機能1】親の要望・譲れない条件設定
          ======================================================== */}
      {activeTab === 'conditions' && (
        <section aria-labelledby="parent-req-title" className="bg-[#FFFFFF] border-2 border-[#E2E8F0] p-6 md:p-8 rounded-lg">
          <div className="mb-6">
            <span className="inline-block bg-[#E2E8F0] text-[#1A365D] text-xs font-bold px-3 py-1 rounded border border-[#CBD5E0] mb-2">
              保護者設定
            </span>
            <h2 id="parent-req-title" className="text-2xl font-extrabold text-[#1A365D]">
              ご家庭の希望・譲れない条件
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              毎日の健康や家計に関わる「譲れない境界条件」を設定してください。この条件を満たす学校のみが候補としてマッチングされます。
            </p>
          </div>

          <div className="space-y-6">
            {/* 最寄り駅＆徒歩分数 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-[#E2E8F0] rounded bg-[#F7FAFC]">
              <div>
                <label htmlFor="nearest-station" className="block text-sm font-bold text-[#1A365D] mb-1">
                  自宅の最寄り駅名
                </label>
                <input
                  id="nearest-station"
                  type="text"
                  placeholder="例：吉祥寺駅、中野駅"
                  value={requirements.nearestStation}
                  onChange={(e) => onUpdateRequirements({ nearestStation: e.target.value })}
                  className="w-full p-2.5 border border-[#CBD5E0] rounded bg-[#FFFFFF] text-sm focus:border-[#1A365D] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="walk-minutes" className="block text-sm font-bold text-[#1A365D] mb-1">
                  最寄り駅までの徒歩分数
                </label>
                <input
                  id="walk-minutes"
                  type="number"
                  min={0}
                  max={60}
                  value={requirements.walkMinutes}
                  onChange={(e) => onUpdateRequirements({ walkMinutes: parseInt(e.target.value, 10) || 0 })}
                  className="w-full p-2.5 border border-[#CBD5E0] rounded bg-[#FFFFFF] text-sm focus:border-[#1A365D] focus:outline-none"
                />
              </div>
            </div>

            {/* 通学時間の上限（必須条件） */}
            <div className="p-4 border-2 border-[#1A365D] rounded bg-[#FFFFFF]">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="commute-range" className="text-base font-extrabold text-[#1A365D]">
                  通学時間の上限（ドア・トゥ・ドア）
                  <span className="ml-2 inline-block bg-[#C53030] text-[#FFFFFF] text-xs font-bold px-2 py-0.5 rounded">
                    必須・譲れない条件
                  </span>
                </label>
                <span className="text-xl font-extrabold text-[#1A365D]">
                  {requirements.maxCommuteMinutes}分 以内
                </span>
              </div>
              <input
                id="commute-range"
                type="range"
                min={30}
                max={90}
                step={5}
                value={requirements.maxCommuteMinutes}
                onChange={(e) => onUpdateRequirements({ maxCommuteMinutes: parseInt(e.target.value, 10) })}
                className="w-full accent-[#1A365D] cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>30分（近距離重視）</span>
                <span>60分（一般的上限）</span>
                <span>90分（遠距離許容）</span>
              </div>
            </div>

            {/* 初年度学費の上限（必須条件） */}
            <div className="p-4 border-2 border-[#1A365D] rounded bg-[#FFFFFF]">
              <div className="flex justify-between items-center mb-2">
                <label className="text-base font-extrabold text-[#1A365D]">
                  初年度学費の上限（年間費用目安）
                  <span className="ml-2 inline-block bg-[#C53030] text-[#FFFFFF] text-xs font-bold px-2 py-0.5 rounded">
                    必須・譲れない条件
                  </span>
                </label>
                <span className="text-xl font-extrabold text-[#1A365D]">
                  {requirements.maxFirstYearTuition === 0
                    ? '上限なし'
                    : `${requirements.maxFirstYearTuition}万円 以下`}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: '100万円/年 以下', value: 100 },
                  { label: '120万円/年 以下', value: 120 },
                  { label: '140万円/年 以下', value: 140 },
                  { label: '上限なし', value: 0 }
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => onUpdateRequirements({ maxFirstYearTuition: item.value })}
                    className={`py-2 px-3 border rounded text-sm font-bold min-h-[44px] ${
                      requirements.maxFirstYearTuition === item.value
                        ? 'border-[#1A365D] bg-[#1A365D] text-[#FFFFFF]'
                        : 'border-[#CBD5E0] bg-[#FFFFFF] text-gray-700 hover:border-[#1A365D]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 通学方法＆乗り換え回数 */}
            <div className="p-4 border border-[#E2E8F0] rounded bg-[#F7FAFC]">
              <label className="block text-sm font-bold text-[#1A365D] mb-2">
                通学方法の選択（複数選択可）
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { id: 'train' as const, label: '電車' },
                  { id: 'bus' as const, label: 'スクールバス・路線バス' },
                  { id: 'walk' as const, label: '徒歩' },
                  { id: 'bicycle' as const, label: '自転車' }
                ].map((item) => {
                  const isChecked = requirements.commuteMethods.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleCommuteMethodToggle(item.id)}
                      className={`px-4 py-2 rounded border text-sm font-bold min-h-[44px] ${
                        isChecked
                          ? 'border-[#1A365D] bg-[#1A365D] text-[#FFFFFF]'
                          : 'border-[#CBD5E0] bg-[#FFFFFF] text-gray-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div>
                <label htmlFor="max-transfers" className="block text-sm font-bold text-[#1A365D] mb-1">
                  電車の乗り換え回数上限: {requirements.maxTransfers}回 まで
                </label>
                <select
                  id="max-transfers"
                  value={requirements.maxTransfers}
                  onChange={(e) => onUpdateRequirements({ maxTransfers: parseInt(e.target.value, 10) })}
                  className="w-full sm:w-48 p-2 border border-[#CBD5E0] rounded bg-[#FFFFFF] text-sm focus:border-[#1A365D] focus:outline-none"
                >
                  <option value={0}>乗り換えなし（直通）</option>
                  <option value={1}>1回まで</option>
                  <option value={2}>2回まで</option>
                  <option value={3}>3回まで</option>
                </select>
              </div>
            </div>

            {/* 学校種別＆希望校風 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[#E2E8F0] rounded bg-[#F7FAFC]">
                <label className="block text-sm font-bold text-[#1A365D] mb-2">
                  希望する学校種別
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'coed' as SchoolType, label: '共学校' },
                    { id: 'boys' as SchoolType, label: '男子校' },
                    { id: 'girls' as SchoolType, label: '女子校' },
                    { id: 'attached' as SchoolType, label: '大学附属校' },
                    { id: 'prep' as SchoolType, label: '進学校' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSchoolTypeToggle(item.id)}
                      className={`p-2 border rounded text-xs md:text-sm font-bold min-h-[44px] ${
                        requirements.schoolTypes.includes(item.id)
                          ? 'border-[#1A365D] bg-[#1A365D] text-[#FFFFFF]'
                          : 'border-[#CBD5E0] bg-[#FFFFFF] text-gray-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border border-[#E2E8F0] rounded bg-[#F7FAFC]">
                <label className="block text-sm font-bold text-[#1A365D] mb-2">
                  希望する校風
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'liberal' as SchoolVibePreference, label: '自由放任・自主自立' },
                    { id: 'supportive' as SchoolVibePreference, label: '手厚い面倒見' },
                    { id: 'traditional' as SchoolVibePreference, label: '伝統・規律重視' },
                    { id: 'international' as SchoolVibePreference, label: '国際教育・先進探究' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleVibeToggle(item.id)}
                      className={`p-2 border rounded text-xs md:text-sm font-bold min-h-[44px] ${
                        requirements.preferredVibe.includes(item.id)
                          ? 'border-[#1A365D] bg-[#1A365D] text-[#FFFFFF]'
                          : 'border-[#CBD5E0] bg-[#FFFFFF] text-gray-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          【機能5】親との共有＆ギャップ可視化
          ======================================================== */}
      {activeTab === 'insights' && (
        <section aria-labelledby="insights-title" className="space-y-8">
          <div className="bg-[#FFFFFF] border-2 border-[#E2E8F0] p-6 rounded-lg">
            <span className="inline-block bg-[#E2E8F0] text-[#1A365D] text-xs font-bold px-3 py-1 rounded border border-[#CBD5E0] mb-2">
              分析＆サポート
            </span>
            <h2 id="insights-title" className="text-2xl font-extrabold text-[#1A365D]">
              親子の重視点ギャップ可視化 ＆ 対話サポート
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              親御さんが重視する現実的条件（通学・学力・環境）と、お子さまの純粋な「ワクワク・直感」を並べて可視化します。
            </p>
          </div>

          {/* 子どもの最新の言葉サマリー */}
          <div className="bg-[#EBF8FF] border-2 border-[#2B6CB0] p-6 rounded-lg">
            <h3 className="text-lg font-extrabold text-[#2B6CB0] mb-3">
              お子さまの最新の興味・重視したいこと
            </h3>
            <div className="space-y-2 text-sm md:text-base text-gray-800">
              <div>
                <strong className="text-[#1A365D]">一番好きなこと: </strong>
                {kidsPreferences.selectedInterest ? (
                  <span className="font-bold underline ml-1">{kidsPreferences.selectedInterest}</span>
                ) : (
                  <span className="text-gray-500">まだ回答がありません</span>
                )}
              </div>
              {kidsPreferences.interestDetail && (
                <div className="bg-[#FFFFFF] p-3 rounded border border-[#BEE3F8]">
                  <strong className="text-xs text-gray-500 block mb-1">本人の自由記述:</strong>
                  「{kidsPreferences.interestDetail}」
                </div>
              )}
            </div>
          </div>

          {/* 学校サマリー＆ギャップ分析 */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#1A365D]">
              候補校サマリーと親子の視点ギャップ分析
            </h3>

            {recommendedSchools.map((school) => {
              const matchingReview = visitReviews.find((r) => r.schoolName === school.name);
              return (
                <div key={school.id} className="bg-[#FFFFFF] border-2 border-[#CBD5E0] rounded-lg p-6">
                  {/* 学校名と基本数値サマリー */}
                  <div className="flex flex-wrap justify-between items-baseline border-b border-[#E2E8F0] pb-3 mb-4">
                    <h4 className="text-xl font-extrabold text-[#1A365D]">{school.name}</h4>
                    <span className="text-xs font-bold text-gray-600">{school.typeLabel}・{school.location}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-6">
                    <div className="p-2 border border-[#E2E8F0] rounded bg-[#F7FAFC]">
                      <span className="text-xs text-gray-500 block">偏差値※目安</span>
                      <span className="text-lg font-bold text-[#1A365D]">{school.deviationScore}</span>
                    </div>
                    <div className="p-2 border border-[#E2E8F0] rounded bg-[#F7FAFC]">
                      <span className="text-xs text-gray-500 block">初年度学費</span>
                      <span className="text-lg font-bold text-[#1A365D]">{school.firstYearTuition}万円</span>
                    </div>
                    <div className="p-2 border border-[#E2E8F0] rounded bg-[#F7FAFC]">
                      <span className="text-xs text-gray-500 block">想定通学時間</span>
                      <span className="text-lg font-bold text-[#1A365D]">{school.commuteMinutes}分</span>
                    </div>
                    <div className="p-2 border border-[#E2E8F0] rounded bg-[#F7FAFC]">
                      <span className="text-xs text-gray-500 block">乗り換え</span>
                      <span className="text-lg font-bold text-[#1A365D]">{school.transfersCount}回</span>
                    </div>
                  </div>

                  {/* 併願傾向の表示 */}
                  <div className="mb-4 text-xs md:text-sm text-gray-700 bg-[#F7FAFC] p-3 rounded border border-[#E2E8F0]">
                    <strong className="text-[#1A365D]">一般的な併願傾向※：</strong>
                    {school.concurrentExamTrend}
                  </div>

                  {/* AIインサイト・親子の視点対比 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 border border-[#CBD5E0] rounded bg-[#F7FAFC]">
                      <strong className="text-sm font-bold text-[#1A365D] block mb-2">
                        保護者側の視点（条件合致）
                      </strong>
                      <ul className="text-xs md:text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>通学時間上限（{requirements.maxCommuteMinutes}分）を満たす（{school.commuteMinutes}分）</li>
                        <li>学費予算内（{school.firstYearTuition}万円）</li>
                        <li>{school.vibeLabel}</li>
                      </ul>
                    </div>

                    <div className="p-4 border border-[#2B6CB0] rounded bg-[#EBF8FF]">
                      <strong className="text-sm font-bold text-[#2B6CB0] block mb-2">
                        お子さま側の視点（ワクワク合致）
                      </strong>
                      <p className="text-xs md:text-sm text-gray-800">
                        {school.matchReasonBadge}
                      </p>
                      {matchingReview && (
                        <div className="mt-2 text-xs bg-[#FFFFFF] p-2 rounded border border-[#BEE3F8]">
                          見学直後の感想：「{matchingReview.overallComment || '印象良好'}」
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 「今夜の食卓で聞いてみよう！」対話カード */}
                  <div className="p-4 border-2 border-[#1A365D] rounded bg-[#FFFFFF]">
                    <div className="flex items-center text-sm font-extrabold text-[#1A365D] mb-2">
                      <span className="bg-[#1A365D] text-[#FFFFFF] text-xs px-2 py-0.5 rounded mr-2">
                        対話カード
                      </span>
                      今夜の食卓で聞いてみよう！
                    </div>
                    <p className="text-base font-bold text-[#1A365D] mb-2">
                      「{school.name}の『{school.features[0]}』って、実際に見てどう感じた？」
                    </p>
                    <p className="text-xs text-gray-600">
                      ※アドバイス：偏差値や通学の負担を親側から先に言わず、まずお子さまが何に目を輝かせたか、具体的に語らせてあげてください。
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
