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

  function toListItemWithLink(itemText, href) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = href || "#";
    a.textContent = itemText;
    li.appendChild(a);
    return li;
  }

  function renderProjectList(id, list) {
    var root = byId(id);
    if (!root || !Array.isArray(list)) return;

    list.forEach(function (p) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = p.url || "#";
      a.textContent = p.title;
      li.appendChild(a);

      if (p.summary) {
        li.appendChild(document.createTextNode(" - " + p.summary));
      }

      root.appendChild(li);
    });
  }

  function renderHighlights() {
    var root = byId("research-highlights");
    if (!root || !Array.isArray(data.highlights)) return;

    data.highlights.forEach(function (h) {
      root.appendChild(toListItemWithLink(h.title, h.url));
    });
  }

  function renderResearchInterests() {
    var root = byId("research-interests");
    if (!root || !Array.isArray(data.researchInterests)) return;

    data.researchInterests.forEach(function (item) {
      var li = document.createElement("li");
      var strong = document.createElement("strong");
      strong.textContent = item.title;
      li.appendChild(strong);

      if (item.summary) {
        li.appendChild(document.createTextNode(" - " + item.summary));
      }

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
          li.textContent = n.date + ": " + n.text;
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
      list.forEach(function (person) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = person.url || "#";
        a.textContent = person.name;
        li.appendChild(a);
        if (person.role) {
          li.appendChild(document.createTextNode(" - " + person.role));
        }
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
        data.publications[year].forEach(function (paper) {
          var li = document.createElement("li");
          var a = document.createElement("a");
          a.href = paper.url || "#";
          a.textContent = paper.title;
          li.appendChild(a);
          if (paper.venue) {
            li.appendChild(document.createTextNode(" (" + paper.venue + ")"));
          }
          ul.appendChild(li);
        });

        wrapper.appendChild(ul);
        root.appendChild(wrapper);
      });
  }

  function renderFunding() {
    var root = byId("funding-list");
    if (!root || !Array.isArray(data.funding)) return;

    data.funding.forEach(function (f) {
      root.appendChild(toListItemWithLink(f.name, f.url));
    });
  }

  function renderOutreach() {
    var root = byId("outreach-list");
    if (!root || !Array.isArray(data.outreach)) return;

    data.outreach.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.url || "#";
      a.textContent = item.title;
      li.appendChild(a);
      if (item.summary) {
        li.appendChild(document.createTextNode(" - " + item.summary));
      }
      root.appendChild(li);
    });
  }

  function runByPage() {
    var page = document.body.getAttribute("data-page");

    if (page === "home") {
      renderResearchInterests();
      renderProjectList("current-projects", data.projects && data.projects.current);
      renderProjectList("past-projects", data.projects && data.projects.past);
      renderHighlights();
      renderNews("news-by-year");
    }

    if (page === "projects") {
      renderProjectList("all-current-projects", data.projects && data.projects.current);
      renderProjectList("all-past-projects", data.projects && data.projects.past);
    }

    if (page === "people") {
      renderPeople();
    }

    if (page === "publications") {
      renderPublications();
    }

    if (page === "funding") {
      renderFunding();
    }

    if (page === "outreach") {
      renderOutreach();
    }
  }

  setCopyrightYear();
  runByPage();
})();
