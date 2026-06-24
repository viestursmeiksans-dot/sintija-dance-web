// Eleventy config — input src/, output _site/ (what Cloudflare Pages serves).
// Tailwind is via CDN (no CSS build step). Assets are passthrough-copied verbatim.
module.exports = function (eleventyConfig) {
  // src/static/* -> site root: images/ at /images/, favicon.svg + favicon-180.png at /.
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  // NOTE: src/assets/_original/ holds full-resolution source photos (~160MB) that the page
  // does NOT reference. We intentionally do NOT passthrough-copy src/assets so those heavy
  // originals never ship. Re-enable `addPassthroughCopy({ "src/assets": "assets" })` only if
  // a page starts referencing /assets/* files.

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
