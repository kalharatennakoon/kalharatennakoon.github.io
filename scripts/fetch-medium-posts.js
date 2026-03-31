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

function extractTags(content) {
  const tagRegex = /<category>([^<]+)<\/category>/g;
  const tags = [];
  let match;
  while ((match = tagRegex.exec(content)) !== null) {
    tags.push(match[1]);
  }
  return tags.slice(0, 3); // Return first 3 tags
}

function estimateReadTime(content) {
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200); // Average reading speed
  return `${minutes} min read`;
}

function extractExcerpt(content, maxLength = 200) {
  const text = content.replace(/<[^>]*>/g, '').trim();
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
    const posts = items.slice(0, 6).map(item => {
      const content = item['content:encoded'] ? item['content:encoded'][0] : item.description[0];
      const categories = item.category || [];
      
      return {
        title: item.title[0],
        excerpt: extractExcerpt(content),
        date: new Date(item.pubDate[0]).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        readTime: estimateReadTime(content),
        url: item.link[0],
        tags: categories.slice(0, 3),
        image: extractImage(content),
      };
    });

    // Ensure public directory exists
    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write to JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
    console.log(`✅ Successfully updated blog posts! Found ${posts.length} posts.`);
    
  } catch (error) {
    console.error('❌ Error fetching Medium posts:', error.message);
    process.exit(1);
  }
}

updateBlogPosts();
