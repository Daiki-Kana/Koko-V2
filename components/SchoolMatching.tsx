'use client';

import React from 'react';
import { School, ParentRequirements, KidsPreferences } from '../types';

interface SchoolMatchingProps {
  schools: School[];
  parentRequirements: ParentRequirements;
  kidsPreferences: KidsPreferences;
  onSelectSchoolForReview?: (schoolName: string) => void;
}

export const SchoolMatching: React.FC<SchoolMatchingProps> = ({
  schools,
  parentRequirements,
  kidsPreferences,
  onSelectSchoolForReview
}) => {
  // 1. 親の譲れない条件（AND条件）によるフィルタリング
  const filteredSchools = schools.filter((school) => {
    // 通学時間上限
    if (school.commuteMinutes > parentRequirements.maxCommuteMinutes) {
      return false;
    }
    // 初年度学費上限（0は上限なし）
    if (
      parentRequirements.maxFirstYearTuition > 0 &&
      school.firstYearTuition > parentRequirements.maxFirstYearTuition
    ) {
      return false;
    }
    // 乗り換え回数上限
    if (school.transfersCount > parentRequirements.maxTransfers) {
      return false;
    }
    // 学校種別のフィルタ（指定がある場合）
    if (
      parentRequirements.schoolTypes.length > 0 &&
      !parentRequirements.schoolTypes.includes(school.type)
    ) {
      return false;
    }
    return true;
  });

  // 2. 子どもの興味との合致度スコア計算＆ソート（上位3校）
  const rankedSchools = [...filteredSchools].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    if (kidsPreferences.selectedInterest) {
      if (a.relatedInterests.includes(kidsPreferences.selectedInterest)) scoreA += 5;
      if (b.relatedInterests.includes(kidsPreferences.selectedInterest)) scoreB += 5;
    }

    // 自由記述キーワードの簡易ヒット判定
    const detail = kidsPreferences.interestDetail || '';
    if (detail.includes('実験') || detail.includes('科学') || detail.includes('理科')) {
      if (a.relatedInterests.includes('science')) scoreA += 3;
      if (b.relatedInterests.includes('science')) scoreB += 3;
    }
    if (detail.includes('ロボット') || detail.includes('パソコン') || detail.includes('プログラミング')) {
      if (a.relatedInterests.includes('programming')) scoreA += 3;
      if (b.relatedInterests.includes('programming')) scoreB += 3;
    }
    if (detail.includes('本') || detail.includes('図書館') || detail.includes('読む')) {
      if (a.relatedInterests.includes('japanese')) scoreA += 3;
      if (b.relatedInterests.includes('japanese')) scoreB += 3;
    }
    if (detail.includes('生き物') || detail.includes('動物') || detail.includes('自然')) {
      if (a.relatedInterests.includes('nature' as any) || a.relatedInterests.includes('science')) scoreA += 3;
      if (b.relatedInterests.includes('nature' as any) || b.relatedInterests.includes('science')) scoreB += 3;
    }

    return scoreB - scoreA;
  });

  const topSchools = rankedSchools.slice(0, 3);

  return (
    <section aria-labelledby="matching-title" className="w-full max-w-4xl mx-auto pb-16">
      <div className="bg-[#FFFFFF] border-2 border-[#CBD5E0] p-6 md:p-8 rounded-lg mb-8">
        <span className="inline-block bg-[#EBF8FF] text-[#2B6CB0] text-xs md:text-sm font-bold px-3 py-1 rounded border border-[#BEE3F8] mb-2">
          【機能3】AIマッチング ＆ 小学生向け情報翻訳
        </span>
        <h2 id="matching-title" className="text-2xl md:text-3xl font-extrabold text-[#1A365D]">
          君にぴったりの学校候補（おすすめ上位3校）
        </h2>
        <p className="text-gray-600 text-sm md:text-base mt-2">
          おうちの人の「通学・学費の安心条件」をクリアした学校の中から、君の「好きなこと・興味」にぴったり合う場所を見つけました！
        </p>

        <div className="mt-4 p-3 bg-[#F7FAFC] border border-[#E2E8F0] rounded text-xs md:text-sm text-gray-700">
          <strong>条件チェック状況: </strong>
          通学{parentRequirements.maxCommuteMinutes}分以内 / 学費
          {parentRequirements.maxFirstYearTuition === 0
            ? '上限なし'
            : `${parentRequirements.maxFirstYearTuition}万円以下`}
          （該当: {filteredSchools.length}校）
        </div>
      </div>

      {topSchools.length === 0 ? (
        <div className="bg-[#FFFFFF] border-2 border-[#CBD5E0] p-8 rounded-lg text-center">
          <p className="text-lg font-bold text-gray-700">
            おうちの人の条件に合う学校が見つかりませんでした。
          </p>
          <p className="text-sm text-gray-500 mt-2">
            保護者モードで通学時間の上限や学費の上限を少し広げてみてください。
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {topSchools.map((school, index) => (
            <article
              key={school.id}
              className="bg-[#FFFFFF] border-2 border-[#2B6CB0] rounded-lg overflow-hidden shadow-sm"
            >
              {/* カード上部：学校名と順位バッジ */}
              <div className="bg-[#EBF8FF] border-b-2 border-[#2B6CB0] p-4 md:p-6 flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded bg-[#2B6CB0] text-[#FFFFFF] font-extrabold text-lg flex items-center justify-center mr-3">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#1A365D]">
                      <ruby>
                        {school.name}
                        <rt className="text-xs font-normal text-gray-500">{school.nameRuby}</rt>
                      </ruby>
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 font-bold mt-0.5">
                      {school.typeLabel} ｜ {school.location}（想定通学：{school.commuteMinutes}分）
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-500 block">偏差値※目安</span>
                  <span className="text-lg font-extrabold text-[#1A365D]">{school.deviationScore}</span>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {/* キャッチコピー */}
                <div className="text-lg font-bold text-[#2B6CB0]">
                  「{school.catchphrase}」
                </div>

                {/* 個別マッチング理由バッジ */}
                <div className="bg-[#FFF5F5] border-2 border-[#FEB2B2] p-4 rounded-lg">
                  <span className="inline-block bg-[#C53030] text-[#FFFFFF] text-xs font-bold px-2 py-0.5 rounded mb-1">
                    ぴったりマッチング理由
                  </span>
                  <p className="text-base font-bold text-[#742A2A]">
                    {school.matchReasonBadge}
                  </p>
                </div>

                {/* 公式HP情報の引用 ＆ 10〜12歳向けAI翻訳（並記表示） */}
                <div className="border-t-2 border-[#E2E8F0] pt-6">
                  <h4 className="text-lg font-extrabold text-[#1A365D] mb-4">
                    学校の公式HP紹介文 ＆ <ruby>小学生<rt>しょうがくせい</rt></ruby>むけ翻訳
                  </h4>

                  <div className="space-y-4">
                    {school.officialQuotes.map((quote, qIndex) => (
                      <div
                        key={qIndex}
                        className="border-2 border-[#CBD5E0] rounded-lg overflow-hidden"
                      >
                        {/* 引用元（原文） */}
                        <div className="bg-[#F7FAFC] border-b border-[#CBD5E0] p-4 text-xs md:text-sm text-gray-700">
                          <div className="font-bold text-gray-500 mb-1 flex justify-between">
                            <span>【公式HPからの引用文】{quote.topic}</span>
                            <span className="text-xs text-gray-400">{quote.sourceUrlTitle}</span>
                          </div>
                          <p className="italic leading-relaxed">
                            “{quote.originalQuote}”
                          </p>
                        </div>

                        {/* 10〜12歳向けAI翻訳 */}
                        <div className="bg-[#FFFFFF] p-4 border-l-4 border-[#2B6CB0]">
                          <span className="inline-block bg-[#2B6CB0] text-[#FFFFFF] text-xs font-bold px-2 py-0.5 rounded mb-2">
                            10〜12さい向けのかみ砕き翻訳
                          </span>
                          <p className="text-base md:text-lg font-bold text-[#1A365D] leading-relaxed">
                            {quote.kidTranslation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 見学後のアクション誘導 ＆ Googleマップ通学経路確認 */}
                <div className="pt-4 flex flex-wrap justify-end items-center gap-3">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((school.location ? `${school.location} ` : '') + school.name)}&travelmode=transit`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((school.location ? `${school.location} ` : '') + school.name)}&travelmode=transit`;
                      if (typeof window !== 'undefined' && (window as any).__TAURI__) {
                        e.preventDefault();
                        const tauri = (window as any).__TAURI__;
                        if (tauri?.opener?.openUrl) {
                          tauri.opener.openUrl(url).catch((err: any) => console.warn(err));
                          return;
                        }
                        if (tauri?.shell?.open) {
                          tauri.shell.open(url).catch((err: any) => console.warn(err));
                          return;
                        }
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="min-h-[36px] px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FFFFFF] text-[#2A9D8F] border-2 border-[#2A9D8F] hover:bg-[#E7F5F3] shadow-[1.5px_1.5px_0px_#1D3557] hover:shadow-[2px_2px_0px_#1D3557] transition-all inline-flex items-center gap-1.5 no-underline"
                    title={`現在地から${school.name}への公共交通機関ルートをGoogleマップで調べる`}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    <span>経路確認</span>
                  </a>

                  {onSelectSchoolForReview && (
                    <button
                      type="button"
                      onClick={() => onSelectSchoolForReview(school.name)}
                      className="min-h-[44px] px-5 py-2 rounded-lg text-sm md:text-base font-bold bg-[#F7FAFC] text-[#2B6CB0] border-2 border-[#2B6CB0] hover:bg-[#EBF8FF] transition-colors"
                    >
                      この学校の見学メモをかく
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
