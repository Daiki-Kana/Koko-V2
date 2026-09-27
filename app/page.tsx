'use client';

import React, { useState } from 'react';
import {
  ParentRequirements,
  KidsPreferences,
  VisitReview
} from '../types';
import { MOCK_SCHOOLS } from '../data/mockSchools';
import { KidsMode } from '../components/KidsMode';
import { ParentMode } from '../components/ParentMode';
import { SchoolMatching } from '../components/SchoolMatching';

export default function Home() {
  // モード切替: 'kids' (子ども) | 'parent' (保護者) | 'matching' (学校マッチング)
  const [currentMode, setCurrentMode] = useState<'kids' | 'parent' | 'matching'>('kids');

  // 【機能1】親の譲れない条件ステート
  const [parentRequirements, setParentRequirements] = useState<ParentRequirements>({
    nearestStation: '吉祥寺駅',
    walkMinutes: 8,
    maxCommuteMinutes: 60,
    commuteMethods: ['train', 'walk'],
    maxTransfers: 1,
    maxFirstYearTuition: 130, // 130万円
    preferredVibe: ['liberal', 'supportive'],
    schoolTypes: ['coed', 'attached', 'prep']
  });

  // 【機能2】子どもの興味関心ステート
  const [kidsPreferences, setKidsPreferences] = useState<KidsPreferences>({
    selectedInterest: 'science',
    interestDetail: '顕微鏡でミジンコや葉っぱの細胞をじっくり観察するのが好き！',
    atmosphere: 'nature',
    atmosphereDetail: '緑や小川があって、自然の生き物と触れ合えるところ',
    studyStyle: 'inquiry',
    studyStyleDetail: '自分でテーマを決めて、とことん調べてみたい',
    mentorRelationship: 'supportive',
    mentorRelationshipDetail: '困ったときに先生が優しくヒントをくれるところ'
  });

  // 【機能4】見学振り返りシート一覧ステート
  const [visitReviews, setVisitReviews] = useState<VisitReview[]>([
    {
      id: 'init-1',
      schoolId: 'school-1',
      schoolName: '芝浦工大附属中学校',
      visitDate: '2026/09/20',
      impression: 1,
      highlights: [
        {
          category: 'facilities',
          label: '校舎・設備',
          ruby: 'こうしゃ・せつび',
          checked: true,
          comment: 'ものづくりラボに本物のレーザーカッターがあってワクワクした！'
        },
        {
          category: 'club',
          label: 'クラブ実演',
          ruby: 'くらぶじつえん',
          checked: true,
          comment: 'ロボット部の先輩が親切に動かし方を教えてくれた'
        }
      ],
      overallComment: '広くてきれいだった。自分でロボットを作るクラブに入ってみたい！'
    }
  ]);

  const handleUpdateParentRequirements = (updated: Partial<ParentRequirements>) => {
    setParentRequirements((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdateKidsPreferences = (updated: Partial<KidsPreferences>) => {
    setKidsPreferences((prev) => ({ ...prev, ...updated }));
  };

  const handleAddVisitReview = (review: VisitReview) => {
    setVisitReviews((prev) => [review, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-gray-900 font-sans">
      {/* ========================================================
          ヘッダー＆モード切替トグル（グラデーションなし・単色ソリッド）
          ======================================================== */}
      <header className="bg-[#FFFFFF] border-b-2 border-[#CBD5E0] sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-[#1A365D] tracking-tight">
              ここがいいノート
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              子どもが主役の中学受験・学校選びサポート
            </p>
          </div>

          {/* モード切替トグル（タップ領域48px以上） */}
          <div className="flex border-2 border-[#CBD5E0] rounded-lg overflow-hidden bg-[#FFFFFF] p-1 gap-1">
            <button
              type="button"
              onClick={() => setCurrentMode('kids')}
              className={`min-h-[48px] px-4 md:px-5 py-2 rounded font-extrabold text-sm md:text-base transition-colors ${
                currentMode === 'kids'
                  ? 'bg-[#2B6CB0] text-[#FFFFFF]'
                  : 'text-gray-700 hover:bg-[#F7FAFC]'
              }`}
            >
              キッズモード
            </button>
            <button
              type="button"
              onClick={() => setCurrentMode('matching')}
              className={`min-h-[48px] px-4 md:px-5 py-2 rounded font-extrabold text-sm md:text-base transition-colors ${
                currentMode === 'matching'
                  ? 'bg-[#1A365D] text-[#FFFFFF]'
                  : 'text-gray-700 hover:bg-[#F7FAFC]'
              }`}
            >
              学校マッチング
            </button>
            <button
              type="button"
              onClick={() => setCurrentMode('parent')}
              className={`min-h-[48px] px-4 md:px-5 py-2 rounded font-extrabold text-sm md:text-base transition-colors ${
                currentMode === 'parent'
                  ? 'bg-[#1A365D] text-[#FFFFFF]'
                  : 'text-gray-700 hover:bg-[#F7FAFC]'
              }`}
            >
              保護者モード
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          メインコンテンツ領域
          ======================================================== */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {currentMode === 'kids' && (
          <KidsMode
            preferences={kidsPreferences}
            onUpdatePreferences={handleUpdateKidsPreferences}
            visitReviews={visitReviews}
            onAddVisitReview={handleAddVisitReview}
            onCompleteStep1={() => setCurrentMode('matching')}
          />
        )}

        {currentMode === 'matching' && (
          <SchoolMatching
            schools={MOCK_SCHOOLS}
            parentRequirements={parentRequirements}
            kidsPreferences={kidsPreferences}
            onSelectSchoolForReview={(schoolName) => {
              setCurrentMode('kids');
            }}
          />
        )}

        {currentMode === 'parent' && (
          <ParentMode
            requirements={parentRequirements}
            onUpdateRequirements={handleUpdateParentRequirements}
            kidsPreferences={kidsPreferences}
            visitReviews={visitReviews}
            recommendedSchools={MOCK_SCHOOLS}
          />
        )}
      </main>

      {/* フッター */}
      <footer className="border-t-2 border-[#CBD5E0] bg-[#FFFFFF] py-6 text-center text-xs text-gray-500">
        <p className="font-bold text-gray-700 mb-1">ここがいいノート - 中学受験支援MVP</p>
        <p>※単色フラットデザイン（グラデーション一切不使用）</p>
      </footer>
    </div>
  );
}
