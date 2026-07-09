window.SiteData = {
  site: {
    name: "NNS-Chiplet",
    org: "Tsinghua University / Department of Computer Science and Technology",
    email: "zhang-y22@mails.tsinghua.edu.cn"
  },
  // structured data for index page, including research interests, highlights, and news
  // { text: "text", url: "url" }, supports simple markdown style: **bold**, *italic*, <u>underline</u>, [label](url)
  researchInterests: [
    {
      text: "**Interconnect Architectures for Chiplet Systems** - Topology, and underlying physical modeling/optimization"
    },
    {
      text: "**Traffic Management for Chiplet Systems** - Routing, congestion detection/mitigation, traffic scheduling, etc."
    },
    {
      text: "**Buffer Management for Distributed Switching Chips** - Sharing and management of spatial discrete buffer resources."
    },
    {
      text: "**Simulation, Modeling, and Benchmarking for Chiplet Systems** - Perspectives and tools for evaluating chiplet-based system design and optimization."
    },
    {
      text: "**Wafer-scale Integration and 3D-Integration** - Possible evolutionary directions for future chips."
    }
  ],
  highlights: [
    {
      text: "We're continously archiving our knowledge and insights on chiplet systems, refer to the **Articles** section for more details!",
      url: "articles.html"
    },
    {
      text: "The open source of a *Chiplet-specific Simulation Platform* based on BookSim2.0 is on the way!",
      url: "#"
    },
    {
      text: "Several works are in progress or submitted for review, covering nearly all aspects of our listed research interests. Stay tuned!",
      url: "#"
    },
  ],
  news: {
    "2026": [
      {
        text: "[July 2026] Our paper about **NoC Congestion Management** accepted to **MICRO 2026**.",
      },
      {
        text: "[March 2026] Our paper about **On-Chip Buffer Management** accepted to **DAC 2026**.",
      }
    ]
  },
  // customizable-structured data for people, publications, and articles
  people: {
    faculty: [
      {
        name: "Fengyuan Ren",
        role: "Professor, Leader of NNS group and NNS-Chiplet team",
        url: "https://www.cs.tsinghua.edu.cn/csen/info/1309/4350.htm",
        photo: "./assets/images/Prof_Ren.jpg"
      }
    ],
    phd: [
      {
        name: "Yang Zhang",
        role: "PhD Student(2022-)",
        url: "https://zhang12574.github.io/",
        photo: "./assets/images/Yang_Zhang.jpg"
      },
      {
        name: "Xu Wang",
        role: "PhD Student(2023-)",
        url: "https://wg-xu.github.io/",
        photo: "./assets/images/Xu_Wang.jpg"
      }
    ],
    alumni: [
    ]
  },
  publications: {
    "2026": [
      {
        title: "Hermes: Architecting Congestion Management for Large-Scale NoCs",
        authors: ["Yang Zhang", "Xu Wang", "Lei Xu", "Fengyuan Ren"],
        venue: "MICRO 2026",
        url: "",
        pdf: "",
        slides: "",
        code: ""
      },
      {
        title: "CrediX: A Credit-driven Distributed Buffer Management for Large-scale Switching Chips",
        authors: ["Xu Wang", "Yang Zhang", "Danfeng Shan", "Fengyuan Ren"],
        venue: "DAC 2026",
        url: "",
        pdf: "",
        slides: "",
        code: ""
      },
      {
        title: "Q-StaR: A Quasi-Static Routing Scheme for NoCs",
        authors: ["Yang Zhang", "Xu Wang", "Fengyuan Ren"],
        venue: "Arxiv",
        url: "https://arxiv.org/abs/2603.10637",
        pdf: "",
        slides: "",
        code: ""
      }
    ],
  },
  articles: {
    "chiplet": [
      {
        title: "Chiplet: Scaling Beyond Monolithic Chips",
        htmlPath: "./Articles/why-chiplets-emerged.html",
        summary: "Why AI-era demand outpaces monolithic scaling, and how chiplet extend system-level growth."
      },
      {
        title: "Chiplet Technology and Interconnection",
        htmlPath: "./Articles/chiplet-and-interconnection.html",
        summary: "A concise overview of chiplet technology, covering definitions, system overview, and interconnect technologies."
      },
    ],
  }
};
