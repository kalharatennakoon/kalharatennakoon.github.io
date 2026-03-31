import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import xml2js from 'xml2js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEDIUM_RSS_URL = 'https://medium.com/feed/@kalharatennakoon';
const OUTPUT_FILE = path.join(__dirname, '../public/blog-posts.json');

function fetchRSS(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractExcerpt(content, maxLength = 200) {
  const text = content
    .replace(/<[^>]*>/g, '')          // strip HTML tags
    .replace(/Continue reading on .+?»/gi, '') // remove RSS "Continue reading" trailer
    .replace(/&[a-z#0-9]+;/gi, (e) => { // decode common HTML entities
      const entities = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x2019;': '\u2019', '&#x2018;': '\u2018', '&nbsp;': ' ' };
      return entities[e] ?? e;
    })
    .trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

function extractImage(content) {
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

async function updateBlogPosts() {
  try {
    console.log('Fetching Medium RSS feed...');
    const rssData = await fetchRSS(MEDIUM_RSS_URL);

    console.log('Parsing RSS feed...');
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(rssData);

    const items = result.rss.channel[0].item || [];

    console.log(`Processing ${Math.min(items.length, 6)} posts...`);
    const posts = items.slice(0, 6).map((item) => {
      const content = item['content:encoded'] ? item['content:encoded'][0] : item.description[0];
      const categories = item.category || [];

      return {
        title: item.title[0],
        excerpt: extractExcerpt(content),
        date: new Date(item.pubDate[0]).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        url: item.link[0],
        tags: categories.slice(0, 3),
        image: extractImage(content),
      };
    });

    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
    console.log(`✅ Successfully updated blog posts! Found ${posts.length} posts.`);

  } catch (error) {
    console.error('❌ Error fetching Medium posts:', error.message);
    process.exit(1);
  }
}

updateBlogPosts();
