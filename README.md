# YiClinic 益诊所 - 渥太华中医针灸诊所网站

YiClinic 益诊所官方网站（www.yiclinic.ca）的完整版本。一个现代、美观、专业的中医针灸诊所网站，采用响应式设计，适配各种设备。

Yi医师毕业于北京中医药大学，持有中医学学士和硕士学位，是安大略省注册针灸师，专注于针灸和传统中医治疗。

## 功能特点

### 🎨 现代设计
- 采用现代化UI设计，配色优雅专业
- 流畅的动画效果和交互体验
- 完全响应式设计，支持桌面、平板和手机

### 📱 页面内容
- **首页横幅**：展示YiClinic和Yi医师的专业资质
- **关于Yi医师**：详细介绍Yi医师的教育背景和临床经验
  - 北京中医药大学学士及硕士学位（7年专业学习）
  - 北京中医医院皮肤科医师经历
  - 安大略省注册针灸师（2021年至今）
  - 提供中英文双语服务
- **服务项目**：详细列出各类中医治疗服务
  - 疼痛管理（颈椎、腰椎、关节炎等）
  - 内科调理（失眠、消化、过敏等）
  - **面部美容针灸**（Yi医师专业特长）
  - 体质调理（亚健康、免疫力提升）
  - 妇科保健（月经调理、产后恢复）
  - 传统中医疗法（拔罐、刮痧、艾灸、推拿按摩）
- **针灸疗效**：展示针灸的独特优势
- **联系预约**：提供联系方式和在线预约表单

### 💻 技术特性
- 纯HTML/CSS/JavaScript实现
- 无需后端即可运行
- 平滑滚动导航
- 表单验证
- 移动端友好的导航菜单
- 元素进入视口动画效果

## 快速开始

### 方法1：直接打开（推荐用于查看）
1. 下载所有文件到同一文件夹
2. 双击 `index.html` 文件
3. 网站将在默认浏览器中打开

### 方法2：使用本地服务器（推荐用于开发）
如果安装了Python，可以在项目目录运行：

```bash
# Python 3
python -m http.server 8000

# 或使用 Python 2
python -m SimpleHTTPServer 8000
```

然后在浏览器中访问 `http://localhost:8000`

### 方法3：使用VS Code Live Server
1. 安装 VS Code 的 Live Server 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

## 文件结构

```
YiClinic website/
│
├── index.html          # 主页面文件
├── styles.css          # 样式文件
├── script.js           # JavaScript交互文件
└── README.md          # 说明文档
```

## 自定义修改

### 更新诊所信息

网站已包含YiClinic的真实信息：

1. **诊所名称**：YiClinic 益诊所
2. **官方网站**：www.yiclinic.ca
3. **诊所地址**：Ottawa, Ontario, Canada
4. **医师信息**：Yi医师 - 北京中医药大学硕士，安大略省注册针灸师
5. **服务语言**：中文和英文 (English & Mandarin)

如需修改其他信息，可在 `index.html` 中搜索相应内容进行更新。

### 修改配色方案

在 `styles.css` 的开头有CSS变量定义：

```css
:root {
    --primary-color: #2c5f7f;      /* 主色调 */
    --secondary-color: #d4af37;    /* 辅助色 */
    --accent-color: #8ba888;       /* 强调色 */
    /* ... 其他颜色 */
}
```

修改这些颜色值即可改变整个网站的配色。

### 添加医师照片

1. 将照片文件放在网站文件夹中
2. 在 `index.html` 中找到"关于我们"部分
3. 替换 `.image-placeholder` 的SVG图标为：
   ```html
   <img src="your-photo.jpg" alt="医师照片">
   ```

### 添加诊所实景图片

可以在各个部分添加真实图片：
1. 准备好图片文件
2. 在需要的位置添加 `<img>` 标签
3. 调整 CSS 样式以适配布局

## 表单功能说明

当前表单是前端验证的演示版本，提交后会显示成功消息但不会真正发送数据。

### 如何接入真实的预约系统

#### 选项1：使用EmailJS（免费）
1. 注册 [EmailJS](https://www.emailjs.com/) 账号
2. 添加EmailJS库到 `index.html`
3. 修改 `script.js` 中的表单提交代码

#### 选项2：使用Google Forms
1. 创建Google表单
2. 将表单嵌入到网站中
3. 或使用Google Forms API

#### 选项3：搭建后端服务
1. 使用Node.js + Express
2. 使用PHP
3. 使用其他后端技术

## 浏览器兼容性

支持所有现代浏览器：
- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 性能优化建议

如果需要进一步优化：
1. 压缩CSS和JavaScript文件
2. 优化和压缩图片
3. 使用CDN托管字体文件
4. 启用浏览器缓存

## 部署到线上

### 免费托管选项

1. **GitHub Pages**（推荐）
   - 创建GitHub仓库
   - 上传所有文件
   - 在仓库设置中启用GitHub Pages

2. **Netlify**
   - 注册Netlify账号
   - 拖放文件夹到Netlify
   - 自动部署完成

3. **Vercel**
   - 注册Vercel账号
   - 导入项目
   - 一键部署

### 域名配置

本网站对应的域名：**www.yiclinic.ca**

域名已购买完成，可通过托管平台绑定到该域名。

## SEO优化建议

1. 添加更多meta标签（关键词、作者等）
2. 优化页面标题和描述
3. 添加结构化数据（Schema.org）
4. 创建sitemap.xml
5. 提交到Google Search Console

## 后续扩展建议

- 📝 添加博客或文章板块（健康知识分享）
- 🖼️ 添加患者评价和案例展示
- 🗓️ 集成在线预约日历系统
- 💬 添加在线咨询功能
- 🌐 添加多语言支持
- 📊 集成Google Analytics追踪访问数据

## 技术支持

如有问题或需要帮助，请联系网站开发者。

## 许可证

本项目供益诊所使用。

---

**诊所信息**：
- 诊所名称：YiClinic 益诊所
- 官方网站：www.yiclinic.ca
- 地点：Ottawa, Ontario, Canada
- 医师：Yi医师（北京中医药大学硕士，安大略省注册针灸师）
- 特色服务：面部美容针灸、针灸治疗、拔罐、刮痧、艾灸、推拿按摩

**制作时间**：2024年10月  
**最后更新**：2024年10月

祝YiClinic 益诊所运营顺利！🎋
