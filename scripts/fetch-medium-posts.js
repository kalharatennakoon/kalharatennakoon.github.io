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

// Fetch a page with redirect following and a 10s timeout
function fetchPage(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        return fetchPage(redirectUrl, redirectCount + 1).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Request timeout')); });
    req.on('error', reject);
  });
}

// Scrape reading time directly from the article page HTML
async function scrapeReadTime(url) {
  try {
    const html = await fetchPage(url);
    const match = html.match(/(\d+)\s+min\s+read/i);
    if (match) return `${match[1]} min read`;
  } catch (err) {
    console.warn(`  ⚠ Could not scrape read time from ${url}: ${err.message}`);
  }
  return null;
}

function estimateReadTime(content) {
  // Fallback: Medium uses ~265 wpm
  const text = content.replace(/<[^>]*>/g, '').trim();
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 265);
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

    console.log(`Processing ${Math.min(items.length, 6)} posts...`);
    const posts = await Promise.all(
      items.slice(0, 6).map(async (item) => {
        const url = item.link[0];
        const content = item['content:encoded'] ? item['content:encoded'][0] : item.description[0];
        const categories = item.category || [];

        console.log(`  Fetching read time for: ${item.title[0].substring(0, 60)}...`);

        // Priority: 1) scraped from article page, 2) RSS field, 3) word-count estimate
        const scraped = await scrapeReadTime(url);
        const rssTime = item['medium:estimatedReadingTime']
          ? `${item['medium:estimatedReadingTime'][0]} min read`
          : null;
        const readTime = scraped || rssTime || estimateReadTime(content);

        console.log(`    → ${readTime}${scraped ? ' (from page)' : rssTime ? ' (from RSS)' : ' (estimated)'}`);

        return {
          title: item.title[0],
          excerpt: extractExcerpt(content),
          date: new Date(item.pubDate[0]).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          readTime,
          url,
          tags: categories.slice(0, 3),
          image: extractImage(content),
        };
      })
    );

    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
    console.log(`\n✅ Successfully updated blog posts! Found ${posts.length} posts.`);

  } catch (error) {
    console.error('❌ Error fetching Medium posts:', error.message);
    process.exit(1);
  }
}

updateBlogPosts();
