# GitHub Pages 主页框架（参考 CORGI 架构）

这个模板按以下信息架构组织：

- 首页：Welcome + Current Projects + Research Highlights + News + Past Projects
- 子页：People / Projects / Publications / Funding / Outreach
- 全站内容由一个数据文件驱动：`assets/js/data.js`

## 文件结构

- `index.html`：首页聚合页
- `people.html`：成员页
- `projects.html`：项目页
- `publications.html`：论文页
- `funding.html`：资助页
- `outreach.html`：科普与社区页
- `assets/css/style.css`：全站样式
- `assets/js/data.js`：可编辑数据源
- `assets/js/site.js`：渲染逻辑

## 如何替换成你的内容

1. 修改 `assets/js/data.js` 里的站点信息、成员、项目、论文、新闻。
2. 把 `#` 链接替换为真实链接。
3. 若要替换站点名和邮箱，也在同一个文件改。

## 部署到 GitHub Pages

1. 新建仓库（例如 `your-lab.github.io` 或普通仓库）。
2. 将当前目录所有文件推送到仓库默认分支。
3. 在仓库 Settings > Pages：
   - Source 选 Deploy from a branch
   - Branch 选 main（或你的默认分支）
   - Folder 选 / (root)
4. 保存后等待 1-3 分钟，访问生成的网址。

## 可选增强

- 新增成员详情页：在根目录新增 `people/xxx.html`，然后把 `data.js` 中成员 URL 指向该页面。
- 新增项目详情页：在根目录新增 `projects/xxx.html`。
- 若你后续需要，我可以再给你补一个自动化生成脚本（从 JSON/CSV 生成页面数据）。
