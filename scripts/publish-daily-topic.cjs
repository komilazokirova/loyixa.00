const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const TOPICS_FILE = path.join(ROOT_DIR, 'data', 'topics.json');
const ACTIVITY_FILE = path.join(ROOT_DIR, 'ACTIVITY.md');

function run() {
  if (!fs.existsSync(TOPICS_FILE)) {
    console.error('topics.json topilmadi!');
    process.exit(1);
  }

  const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, 'utf-8'));

  // Qaysi mavzular allaqachon yaratilganligini tekshirish
  let selectedTopic = null;

  for (const topic of topics) {
    const targetPath = path.join(ROOT_DIR, topic.folder, topic.filename);
    if (!fs.existsSync(targetPath)) {
      selectedTopic = topic;
      break;
    }
  }

  // Agar hamma mavzular tugagan bo'lsa, tsiklni yangidan boshqa sanali qo'shimcha bilan davom ettirish
  if (!selectedTopic) {
    const idx = Math.floor(Math.random() * topics.length);
    const base = topics[idx];
    const timestamp = Date.now().toString().slice(-4);
    selectedTopic = {
      ...base,
      filename: `extra-\${timestamp}-\${base.filename}`,
      commitMessage: `feat(davomi): \${base.title} bo'yicha qo'shimcha amaliyot va kengaytma`
    };
  }

  // Faylni yaratish
  const targetDir = path.join(ROOT_DIR, selectedTopic.folder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const fullFilePath = path.join(targetDir, selectedTopic.filename);
  fs.writeFileSync(fullFilePath, selectedTopic.content, 'utf-8');
  console.log(`✅ Yangi fayl yaratildi: \${selectedTopic.folder}/\${selectedTopic.filename}`);

  // ACTIVITY.md jurnalini yangilash
  const now = new Date();
  const tashkentOffsetMs = 5 * 60 * 60 * 1000;
  const tashkentNow = new Date(now.getTime() + tashkentOffsetMs);
  const dateStr = tashkentNow.toISOString().slice(0, 10);
  const timeStr = tashkentNow.toISOString().slice(11, 16);

  if (!fs.existsSync(ACTIVITY_FILE)) {
    fs.writeFileSync(ACTIVITY_FILE, '# 📈 Kunlik Faollik Jurnali\\n\\n| Sana | Vaqt | Turi | Mavzu | Fayl |\\n| :--- | :--- | :--- | :--- | :--- |\\n', 'utf-8');
  }

  const typeName = selectedTopic.type === 'practical' ? '💻 Amaliy Kod' : '📚 Konspekt';
  const logLine = `| \${dateStr} | \${timeStr} | \${typeName} | \${selectedTopic.title} | [\${selectedTopic.filename}](\${selectedTopic.folder}/\${selectedTopic.filename}) |\\n`;
  fs.appendFileSync(ACTIVITY_FILE, logLine, 'utf-8');

  // GitHub Actions output parametrini o'rnatish
  const commitMsg = selectedTopic.commitMessage;
  console.log(`COMMIT_MSG: \${commitMsg}`);

  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `commit_msg=\${commitMsg}\\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `topic_title=\${selectedTopic.title}\\n`);
  }
}

run();
