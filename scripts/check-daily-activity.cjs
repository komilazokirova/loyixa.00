const https = require('https');

const GITHUB_USERNAME = 'komilazokirova';

function getEvents() {
  return new Promise((resolve, reject) => {
    const req = https.get(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
      headers: {
        'User-Agent': 'Daily-Activity-Checker',
        'Accept': 'application/vnd.github.v3+json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}

async function run() {
  try {
    console.log(`[${GITHUB_USERNAME}] uchun bugungi faollik tekshirilmoqda...`);
    const events = await getEvents();
    
    if (!Array.isArray(events)) {
      console.log('Kutilmagan API javobi:', events);
      process.exit(1);
    }

    // Toshkent vaqti bo'yicha hisoblash (UTC+5)
    const now = new Date();
    const tashkentOffsetMs = 5 * 60 * 60 * 1000;
    const tashkentNow = new Date(now.getTime() + tashkentOffsetMs);
    const todayStr = tashkentNow.toISOString().slice(0, 10);

    console.log('Bugungi sana (Toshkent vaqti):', todayStr);

    // Bugungi barcha PushEvent larni ajratib olish
    const todayPushes = events.filter(e => {
      if (e.type !== 'PushEvent' || !e.created_at) return false;
      const eventTashkent = new Date(new Date(e.created_at).getTime() + tashkentOffsetMs);
      return eventTashkent.toISOString().slice(0, 10) === todayStr;
    });

    console.log(`Bugun topilgan Push amallari soni: ${todayPushes.length}`);

    if (todayPushes.length > 0) {
      console.log('✅ Komila bugun allaqachon kod push qilgan! Avtomatik push shart emas.');
      process.exit(0);
    } else {
      console.log('⚡ Bugun hech qanday push qilinmagan. Avtomatik faollik yoziladi.');
      process.exit(10);
    }
  } catch (error) {
    console.error('Xatolik yuz berdi:', error.message);
    process.exit(1);
  }
}

run();
