const axios = require('axios');
const cheerio = require('cheerio');

// Fetch URL metadata (title) - BONUS FEATURE
exports.fetchURLMetadata = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);

    // Try multiple meta tags for title
    let title = 
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="twitter:title"]').attr('content') ||
      $('title').text() ||
      url;

    return {
      title: title.trim(),
      success: true
    };
  } catch (error) {
    console.error('Error fetching URL metadata:', error.message);
    return {
      title: url,
      success: false
    };
  }
};