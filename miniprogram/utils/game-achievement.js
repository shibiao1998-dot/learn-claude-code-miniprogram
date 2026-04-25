// utils/game-achievement.js
var gameSave = require('./game-save');

// --- Achievement Definitions ---
var ACHIEVEMENTS = [
  // Exploration
  { id: 'first_login', category: 'explore', icon: '>', name: { zh: '首次登录', en: 'First Login', ja: '初回ログイン' }, desc: { zh: '首次进入终端', en: 'Enter the terminal for the first time', ja: '初めてターミナルに入る' } },
  { id: 'core_clear', category: 'explore', icon: '>', name: { zh: '核心通关', en: 'Core Clear', ja: 'コアクリア' }, desc: { zh: '通关 CORE/ 区域', en: 'Clear CORE/ region', ja: 'CORE/リージョンをクリア' } },
  { id: 'tools_clear', category: 'explore', icon: '>', name: { zh: '工具通关', en: 'Tools Clear', ja: 'ツールクリア' }, desc: { zh: '通关 TOOLS/ 区域', en: 'Clear TOOLS/ region', ja: 'TOOLS/リージョンをクリア' } },
  { id: 'runtime_clear', category: 'explore', icon: '>', name: { zh: '运行时通关', en: 'Runtime Clear', ja: 'ランタイムクリア' }, desc: { zh: '通关 RUNTIME/ 区域', en: 'Clear RUNTIME/ region', ja: 'RUNTIME/リージョンをクリア' } },
  { id: 'network_clear', category: 'explore', icon: '>', name: { zh: '网络通关', en: 'Network Clear', ja: 'ネットワーククリア' }, desc: { zh: '通关 NETWORK/ 区域', en: 'Clear NETWORK/ region', ja: 'NETWORK/リージョンをクリア' } },
  { id: 'practice_clear', category: 'explore', icon: '>', name: { zh: '实战通关', en: 'Practice Clear', ja: 'プラクティスクリア' }, desc: { zh: '通关 PRACTICE/ 区域', en: 'Clear PRACTICE/ region', ja: 'PRACTICE/リージョンをクリア' } },
  { id: 'all_clear', category: 'explore', icon: '>', name: { zh: '全部通关', en: 'All Clear', ja: '全クリア' }, desc: { zh: '通关全部 5 个区域', en: 'Clear all 5 regions', ja: '全5リージョンをクリア' } },

  // Collection
  { id: 'cards_10', category: 'collect', icon: '$', name: { zh: '初级收集者', en: 'Novice Collector', ja: '初級コレクター' }, desc: { zh: '收集 10 张卡牌', en: 'Collect 10 cards', ja: 'カードを10枚集める' } },
  { id: 'cards_50', category: 'collect', icon: '$', name: { zh: '中级收集者', en: 'Collector', ja: '中級コレクター' }, desc: { zh: '收集 50 张卡牌', en: 'Collect 50 cards', ja: 'カードを50枚集める' } },
  { id: 'cards_100', category: 'collect', icon: '$', name: { zh: '高级收集者', en: 'Senior Collector', ja: '上級コレクター' }, desc: { zh: '收集 100 张卡牌', en: 'Collect 100 cards', ja: 'カードを100枚集める' } },
  { id: 'cards_300', category: 'collect', icon: '$', name: { zh: '大师收集者', en: 'Master Collector', ja: 'マスターコレクター' }, desc: { zh: '收集 300 张卡牌', en: 'Collect 300 cards', ja: 'カードを300枚集める' } },
  { id: 'full_set_core', category: 'collect', icon: '$', name: { zh: 'CORE 全收集', en: 'Full CORE Set', ja: 'COREフルセット' }, desc: { zh: '集齐 CORE/ 全部卡牌', en: 'Collect all CORE/ cards', ja: 'CORE/の全カードを集める' } },

  // Mastery
  { id: 'perfect_stage', category: 'mastery', icon: '#', name: { zh: '完美通关', en: 'Perfect Stage', ja: 'パーフェクトステージ' }, desc: { zh: '任意关卡 ⭐3 通关', en: 'Clear any stage with 3 stars', ja: '任意のステージを⭐3でクリア' } },
  { id: 'no_miss_10', category: 'mastery', icon: '#', name: { zh: '连续正确', en: 'No Miss', ja: 'ノーミス' }, desc: { zh: '累计连续 10 题不出错', en: '10 correct answers in a row', ja: '10問連続正解' } },
  { id: 'level_dev', category: 'mastery', icon: '#', name: { zh: '开发者', en: 'Developer', ja: 'デベロッパー' }, desc: { zh: '达到 dev 等级', en: 'Reach dev level', ja: 'devレベルに到達' } },
  { id: 'level_root', category: 'mastery', icon: '#', name: { zh: '超级管理员', en: 'Root Access', ja: 'ルートアクセス' }, desc: { zh: '达到 root 等级', en: 'Reach root level', ja: 'rootレベルに到達' } },

  // Persistence
  { id: 'streak_7', category: 'persist', icon: '!', name: { zh: '一周坚持', en: 'Week Streak', ja: '1週間連続' }, desc: { zh: '连续学习 7 天', en: '7-day learning streak', ja: '7日間連続学習' } },
  { id: 'streak_30', category: 'persist', icon: '!', name: { zh: '月度坚持', en: 'Month Streak', ja: '1ヶ月連続' }, desc: { zh: '连续学习 30 天', en: '30-day learning streak', ja: '30日間連続学習' } },
  { id: 'streak_100', category: 'persist', icon: '!', name: { zh: '百日坚持', en: 'Century Streak', ja: '100日連続' }, desc: { zh: '连续学习 100 天', en: '100-day learning streak', ja: '100日間連続学習' } },
  { id: 'daily_master', category: 'persist', icon: '!', name: { zh: '每日达人', en: 'Daily Master', ja: 'デイリーマスター' }, desc: { zh: '完成 30 次每日挑战', en: 'Complete 30 daily challenges', ja: 'デイリーチャレンジを30回完了' } }
];

// --- Region stage counts ---
var REGION_STAGES = {
  core: ['stage_s01','stage_s02','stage_s03','stage_s04','stage_s05','stage_s06'],
  tools: ['stage_s07','stage_s08','stage_s09','stage_s10','stage_s11'],
  runtime: ['stage_s12','stage_s13','stage_s14'],
  network: ['stage_s15','stage_s16','stage_s17','stage_s18','stage_s19'],
  practice: ['stage_bp01','stage_bp02','stage_bp03','stage_bp04','stage_bp05','stage_bp06','stage_bp07']
};

// --- Check & Unlock ---
function checkAndUnlock() {
  var data = gameSave.load();
  var newlyUnlocked = [];

  ACHIEVEMENTS.forEach(function(ach) {
    if (data.achievements.indexOf(ach.id) !== -1) return;

    var unlocked = _checkCondition(ach.id, data);
    if (unlocked) {
      newlyUnlocked.push(ach);
    }
  });

  if (newlyUnlocked.length > 0) {
    gameSave.update(function(d) {
      newlyUnlocked.forEach(function(ach) {
        if (d.achievements.indexOf(ach.id) === -1) {
          d.achievements.push(ach.id);
        }
      });
    });
  }

  return newlyUnlocked;
}

function _isRegionCleared(regionStageIds, stages) {
  var cleared = 0;
  regionStageIds.forEach(function(sId) {
    if (stages[sId] && stages[sId].stars > 0) cleared++;
  });
  return cleared >= Math.ceil(regionStageIds.length * 0.7);
}

function _checkCondition(achId, data) {
  var cardCount = Object.keys(data.cards).length;
  var stages = data.stages;

  switch (achId) {
    case 'first_login': return true;
    case 'core_clear': return _isRegionCleared(REGION_STAGES.core, stages);
    case 'tools_clear': return _isRegionCleared(REGION_STAGES.tools, stages);
    case 'runtime_clear': return _isRegionCleared(REGION_STAGES.runtime, stages);
    case 'network_clear': return _isRegionCleared(REGION_STAGES.network, stages);
    case 'practice_clear': return _isRegionCleared(REGION_STAGES.practice, stages);
    case 'all_clear':
      return _isRegionCleared(REGION_STAGES.core, stages) &&
             _isRegionCleared(REGION_STAGES.tools, stages) &&
             _isRegionCleared(REGION_STAGES.runtime, stages) &&
             _isRegionCleared(REGION_STAGES.network, stages) &&
             _isRegionCleared(REGION_STAGES.practice, stages);

    case 'cards_10': return cardCount >= 10;
    case 'cards_50': return cardCount >= 50;
    case 'cards_100': return cardCount >= 100;
    case 'cards_300': return cardCount >= 300;
    case 'full_set_core':
      var coreCards = 0;
      Object.keys(data.cards).forEach(function(cId) {
        if (cId.indexOf('card_s01_') === 0 || cId.indexOf('card_s02_') === 0 ||
            cId.indexOf('card_s03_') === 0 || cId.indexOf('card_s04_') === 0 ||
            cId.indexOf('card_s05_') === 0 || cId.indexOf('card_s06_') === 0) {
          coreCards++;
        }
      });
      return coreCards >= 138;

    case 'perfect_stage':
      var stageKeys = Object.keys(stages);
      for (var i = 0; i < stageKeys.length; i++) {
        if (stages[stageKeys[i]].stars === 3) return true;
      }
      return false;
    case 'no_miss_10': return false;
    case 'level_dev': return data.level >= 5;
    case 'level_root': return data.level >= 10;

    case 'streak_7': return data.streak.best >= 7;
    case 'streak_30': return data.streak.best >= 30;
    case 'streak_100': return data.streak.best >= 100;
    case 'daily_master': return false;

    default: return false;
  }
}

// --- Query ---
function getAllAchievements() {
  var data = gameSave.load();
  return ACHIEVEMENTS.map(function(ach) {
    return {
      id: ach.id,
      category: ach.category,
      icon: ach.icon,
      name: ach.name,
      desc: ach.desc,
      unlocked: data.achievements.indexOf(ach.id) !== -1
    };
  });
}

function getAchievementStats() {
  var data = gameSave.load();
  return {
    total: ACHIEVEMENTS.length,
    unlocked: data.achievements.length,
    ratio: ACHIEVEMENTS.length > 0 ? data.achievements.length / ACHIEVEMENTS.length : 0
  };
}

module.exports = {
  ACHIEVEMENTS: ACHIEVEMENTS,
  checkAndUnlock: checkAndUnlock,
  getAllAchievements: getAllAchievements,
  getAchievementStats: getAchievementStats
};
