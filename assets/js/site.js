(function () {
  var data = window.SiteData || {};

  function byId(id) {
    return document.getElementById(id);
  }

  function setCopyrightYear() {
    var node = byId("copyright-year");
    if (!node) return;
    node.textContent = String(new Date().getFullYear());
  }

  function setLastModified() {
    var node = byId("last-modified");
    if (!node) return;
    var d = new Date(document.lastModified);
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    node.textContent = y + "-" + m + "-" + day;
  }

  function isClickableUrl(url) {
    if (typeof url !== "string") return false;
    var normalized = url.trim();
    return normalized !== "" && normalized !== "#";
  }

  function createLinkOrText(text, href) {
    if (isClickableUrl(href)) {
      var a = document.createElement("a");
      a.href = href.trim();
      a.textContent = text;
      return a;
    }

    var span = document.createElement("span");
    span.textContent = text;
    return span;
  }

  function createInlineMarkdownFragment(text) {
    var fragment = document.createDocumentFragment();
    var source = String(text || "");
    var pattern = /(\[[^\]]+\]\([^\s)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|<u>[\s\S]*?<\/u>)/gi;
    var lastIndex = 0;
    var match;

    function appendFormatted(parent, value) {
      parent.appendChild(createInlineMarkdownFragment(value));
    }

    while ((match = pattern.exec(source)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(source.slice(lastIndex, match.index)));
      }

      var token = match[0];
      if (token.slice(0, 2) === "**" && token.slice(-2) === "**") {
        var strong = document.createElement("strong");
        appendFormatted(strong, token.slice(2, -2));
        fragment.appendChild(strong);
      } else if (token.charAt(0) === "*" && token.slice(-1) === "*") {
        var em = document.createElement("em");
        appendFormatted(em, token.slice(1, -1));
        fragment.appendChild(em);
      } else if (token.slice(0, 3).toLowerCase() === "<u>" && token.slice(-4).toLowerCase() === "</u>") {
        var underline = document.createElement("u");
        appendFormatted(underline, token.slice(3, -4));
        fragment.appendChild(underline);
      } else {
        var linkMatch = token.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
        if (linkMatch && isClickableUrl(linkMatch[2])) {
          var link = document.createElement("a");
          link.href = linkMatch[2].trim();
          appendFormatted(link, linkMatch[1]);
          fragment.appendChild(link);
        } else {
          fragment.appendChild(document.createTextNode(token));
        }
      }

      lastIndex = pattern.lastIndex;
    }

    if (lastIndex < source.length) {
      fragment.appendChild(document.createTextNode(source.slice(lastIndex)));
    }

    return fragment;
  }

  function createFormattedLinkOrText(text, href) {
    var node = isClickableUrl(href) ? document.createElement("a") : document.createElement("span");
    if (node.tagName === "A") node.href = href.trim();
    node.appendChild(createInlineMarkdownFragment(text));
    return node;
  }

  function toListItemWithLink(itemText, href) {
    var li = document.createElement("li");
    li.appendChild(createFormattedLinkOrText(itemText, href));
    return li;
  }

  function renderHighlights() {
    var root = byId("research-highlights");
    if (!root || !Array.isArray(data.highlights)) return;

    data.highlights.forEach(function (h) {
      root.appendChild(toListItemWithLink(h.text, h.url));
    });
  }

  function renderResearchInterests() {
    var root = byId("research-interests");
    if (!root || !Array.isArray(data.researchInterests)) return;

    data.researchInterests.forEach(function (item) {
      var li = document.createElement("li");
      li.appendChild(createInlineMarkdownFragment(item.text));
      root.appendChild(li);
    });
  }

  function renderNews(containerId) {
    var root = byId(containerId);
    if (!root || !data.news) return;

    Object.keys(data.news)
      .sort(function (a, b) {
        return Number(b) - Number(a);
      })
      .forEach(function (year) {
        var wrapper = document.createElement("article");
        wrapper.className = "news-year";

        var title = document.createElement("h3");
        title.textContent = year;
        wrapper.appendChild(title);

        var ul = document.createElement("ul");
        data.news[year].forEach(function (n) {
          var li = document.createElement("li");
          li.appendChild(createFormattedLinkOrText(n.text, n.url));
          ul.appendChild(li);
        });

        wrapper.appendChild(ul);
        root.appendChild(wrapper);
      });
  }

  function renderPeople() {
    var root = byId("people-groups");
    if (!root || !data.people) return;

    var order = [
      ["faculty", "Faculty"],
      ["phd", "PhD Students"],
      ["alumni", "Alumni"]
    ];

    order.forEach(function (entry) {
      var key = entry[0];
      var title = entry[1];
      var list = data.people[key];
      if (!Array.isArray(list) || list.length === 0) return;

      var section = document.createElement("section");
      section.className = "people-group";

      var h2 = document.createElement("h2");
      h2.textContent = title;
      section.appendChild(h2);

      var ul = document.createElement("ul");
      ul.className = "people-list";
      list.forEach(function (person) {
        var li = document.createElement("li");
        li.className = "person-card";

        if (person.photo) {
          var img = document.createElement("img");
          img.src = person.photo;
          img.alt = person.name;
          img.className = "person-photo";
          li.appendChild(img);
        }

        var info = document.createElement("div");
        info.className = "person-info";
        info.appendChild(createLinkOrText(person.name, person.url));
        if (person.role) {
          var span = document.createElement("span");
          span.className = "person-role";
          span.textContent = person.role;
          info.appendChild(span);
        }
        li.appendChild(info);
        ul.appendChild(li);
      });

      section.appendChild(ul);
      root.appendChild(section);
    });
  }

  function renderPublications() {
    var root = byId("publications-by-year");
    if (!root || !data.publications) return;

    Object.keys(data.publications)
      .sort(function (a, b) {
        return Number(b) - Number(a);
      })
      .forEach(function (year) {
        var wrapper = document.createElement("article");
        wrapper.className = "news-year";

        var title = document.createElement("h3");
        title.textContent = year;
        wrapper.appendChild(title);

        var ul = document.createElement("ul");
        ul.className = "pub-list";
        data.publications[year].forEach(function (paper) {
          var li = document.createElement("li");
          li.className = "pub-item";

          // Title
          var titleEl = document.createElement("div");
          titleEl.className = "pub-title";
          titleEl.textContent = paper.title;
          li.appendChild(titleEl);

          // Authors
          if (Array.isArray(paper.authors) && paper.authors.length > 0) {
            var authorsEl = document.createElement("div");
            authorsEl.className = "pub-authors";
            paper.authors.forEach(function (author, idx) {
              if (idx > 0) {
                authorsEl.appendChild(document.createTextNode(", "));
              }
              if (author === paper.firstAuthor) {
                var u = document.createElement("u");
                u.textContent = author;
                authorsEl.appendChild(u);
              } else {
                authorsEl.appendChild(document.createTextNode(author));
              }
            });
            li.appendChild(authorsEl);
          }

          // Venue
          if (paper.venue) {
            var venueEl = document.createElement("div");
            venueEl.className = "pub-venue";
            venueEl.textContent = paper.venue;
            li.appendChild(venueEl);
          }

          // Action buttons
          var actions = document.createElement("div");
          actions.className = "pub-actions";
          [
            { key: "url",    icon: "🔗", label: "Link"   },
            { key: "pdf",    icon: "📄", label: "PDF"    },
            { key: "slides", icon: "📊", label: "Slides" },
            { key: "code",   icon: "💻", label: "Code"   }
          ].forEach(function (btn) {
            if (!paper[btn.key]) return;
            var a = document.createElement("a");
            a.href = paper[btn.key];
            a.className = "pub-btn";
            a.target = "_blank";
            a.rel = "noopener";
            a.textContent = btn.icon + " " + btn.label;
            actions.appendChild(a);
          });
          if (actions.childElementCount > 0) li.appendChild(actions);

          ul.appendChild(li);
        });

        wrapper.appendChild(ul);
        root.appendChild(wrapper);
      });
  }

  function normalizePath(path) {
    return String(path || "").replace(/\\/g, "/");
  }

  function resolveRelativePath(baseDir, rawPath) {
    var rel = normalizePath(rawPath).trim();
    if (
      rel === "" ||
      rel.startsWith("#") ||
      rel.startsWith("/") ||
      /^(?:[a-z]+:)?\/\//i.test(rel) ||
      rel.startsWith("data:") ||
      rel.startsWith("mailto:")
    ) {
      return rel;
    }

    var base = normalizePath(baseDir || ".");
    var prefix = "";
    if (base.startsWith("./")) {
      prefix = "./";
      base = base.slice(2);
    }

    var stack = base.split("/").filter(Boolean);
    rel.split("/").forEach(function (part) {
      if (!part || part === ".") return;
      if (part === "..") {
        if (stack.length > 0) stack.pop();
        return;
      }
      stack.push(part);
    });

    return prefix + stack.join("/");
  }

  function rewriteMarkdownRelativeUrls(markdown, articlePath) {
    var normalizedPath = normalizePath(articlePath || "");
    var slashIndex = normalizedPath.lastIndexOf("/");
    var baseDir = slashIndex >= 0 ? normalizedPath.slice(0, slashIndex) : ".";

    var output = String(markdown || "");

    output = output.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function (_, alt, url) {
      var cleanUrl = String(url).trim().replace(/^<|>$/g, "");
      return "![" + alt + "](" + resolveRelativePath(baseDir, cleanUrl) + ")";
    });

    output = output.replace(/(<img\b[^>]*\bsrc=["'])([^"']+)(["'][^>]*>)/gi, function (_, head, src, tail) {
      return head + resolveRelativePath(baseDir, src) + tail;
    });

    output = output.replace(/(<a\b[^>]*\bhref=["'])([^"']+)(["'][^>]*>)/gi, function (_, head, href, tail) {
      return head + resolveRelativePath(baseDir, href) + tail;
    });

    return output;
  }

  function renderSingleArticle(container, article, index) {
    var card = document.createElement("article");
    card.className = "article-entry";

    var articleUrl = article.htmlPath || article.path || "#";

    var title = document.createElement("h2");
    var indexLabel = document.createElement("span");
    indexLabel.className = "article-index";
    indexLabel.textContent = String(index + 1) + ". ";
    title.appendChild(indexLabel);

    var titleLink = document.createElement("a");
    titleLink.href = articleUrl;
    titleLink.textContent = article.title || "Untitled Article";
    title.appendChild(titleLink);
    card.appendChild(title);

    var meta = document.createElement("p");
    meta.className = "article-meta";
    meta.textContent = article.summary || "";
    card.appendChild(meta);

    var rawLink = document.createElement("a");
    rawLink.className = "article-raw-link";
    rawLink.href = articleUrl;
    rawLink.textContent = "Read article";
    card.appendChild(rawLink);

    container.appendChild(card);
  }

  function formatArticleGroupTitle(key) {
    var label = String(key || "").trim();
    if (!label) return "Articles";
    return label
      .replace(/[._-]+/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\b\w/g, function (ch) {
        return ch.toUpperCase();
      });
  }

  function renderArticleGroup(container, groupName, articles) {
    if (!Array.isArray(articles) || articles.length === 0) return;

    var section = document.createElement("section");
    section.className = "article-group";

    var title = document.createElement("h2");
    title.textContent = formatArticleGroupTitle(groupName);
    section.appendChild(title);

    articles.forEach(function (article, index) {
      renderSingleArticle(section, article, index);
    });

    container.appendChild(section);
  }

  function renderArticles() {
    var root = byId("articles-container");
    if (!root) return;

    if (!data.articles) {
      root.textContent = "No articles available yet.";
      return;
    }

    if (Array.isArray(data.articles)) {
      if (data.articles.length === 0) {
        root.textContent = "No articles available yet.";
        return;
      }

      data.articles.forEach(function (article, index) {
        renderSingleArticle(root, article, index);
      });
      return;
    }

    var groupNames = Object.keys(data.articles);
    if (groupNames.length === 0) {
      root.textContent = "No articles available yet.";
      return;
    }

    groupNames.forEach(function (groupName) {
      renderArticleGroup(root, groupName, data.articles[groupName]);
    });
  }

  function runByPage() {
    var page = document.body.getAttribute("data-page");

    if (page === "home") {
      renderResearchInterests();
      renderHighlights();
      renderNews("news-by-year");
    }

    if (page === "people") {
      renderPeople();
    }

    if (page === "publications") {
      renderPublications();
    }

    if (page === "articles") {
      renderArticles();
    }
  }

  setCopyrightYear();
  setLastModified();
  runByPage();
})();
