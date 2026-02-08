// URL validation helper
exports.isValidURL = (url) => {
  const urlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  return urlPattern.test(url);
};

// Tag sanitization
exports.sanitizeTags = (tags) => {
  if (!Array.isArray(tags)) return [];
  return tags.map(tag => tag.trim().toLowerCase()).filter(tag => tag.length > 0);
};