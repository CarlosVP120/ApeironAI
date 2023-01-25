const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");

export default async (req, res) => {
  const links = [
    { url: "/", changefreq: "daily", priority: 0.3 },
    { url: "/features", changefreq: "daily", priority: 0.3 },
    { url: "/pricing", changefreq: "daily", priority: 0.3 },
    { url: "/contact", changefreq: "daily", priority: 0.3 },
    { url: "/about", changefreq: "daily", priority: 0.3 },
    { url: "/login", changefreq: "daily", priority: 0.3 },
    { url: "/register", changefreq: "daily", priority: 0.3 },
    { url: "/apeiron", changefreq: "daily", priority: 0.3 },
    { url: "/codex", changefreq: "daily", priority: 0.3 },
    { url: "/markex", changefreq: "daily", priority: 0.3 },
    { url: "/typex", changefreq: "daily", priority: 0.3 },
    { url: "/artix", changefreq: "daily", priority: 0.3 },
  ];

  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` });

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
};
