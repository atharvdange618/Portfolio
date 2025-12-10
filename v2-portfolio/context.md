# Portfolio V2 - TUI (Terminal User Interface) Design Specification

**Last Updated**: December 10, 2025  
**Developer**: Atharv Dange  
**Coding Journey Start**: January 2021

---

## 🎯 Core Concept

**"SSH into Atharv's Server"** - A terminal-based portfolio that makes visitors feel like they've connected to a development server. Designed to impress fellow developers while remaining accessible to non-technical visitors.

### Philosophy

- **Progressive Complexity**: Easy for everyone, powerful for developers
- **Authenticity**: Real backend developer aesthetic
- **Trust**: Live metrics and real data, not hardcoded stats
- **Interactivity**: Engaging and fun, not just pretty

---

## 🎨 Design Approach: Progressive Complexity

### Level 1: Visual Terminal (Non-technical friendly)

- Beautiful terminal aesthetic with smooth animations
- Click-based navigation - no typing required
- Visual command menu always visible (sidebar or bottom bar)
- Colorful, readable output with icons and sections
- Auto-typing animations showing commands being "executed"

### Level 2: Power User Mode (For developers)

- Actual command input (toggle with `Ctrl+K` or "Developer Mode" button)
- Real commands: `ls`, `cat projects.json`, `systemctl status reiatsu`, `top`, `git log`
- Tab completion and command history
- Easter eggs for common Linux commands

---

## 🖥️ Key Screens/Sections

### 1. Login Screen (MOTD - Message of the Day)

```
┌──────────────────────────────────────────────────┐
│  Welcome to atharvdange.dev                      │
│  Last login: Tue Dec 10 2025 from 203.x.x.x     │
│                                                   │
│  [Portfolio Server v2.0]                         │
│  System Uptime: 99.98%                           │
│  Active Projects: 6 running                      │
│                                                   │
│  Type 'help' or click commands below ↓          │
└──────────────────────────────────────────────────┘

$ █
```

**Features**:

- Animated SSH connection sequence
- Real visitor IP (or approximate location)
- Dynamic uptime counter
- Smooth fade-in entrance

---

### 2. Navigation System

**Option A: Hybrid Menu Bar**

```
┌─ Commands ────────────────────────────────────────┐
│ [about] [projects] [skills] [experience] [contact]│
│ [ls -la] [ps aux] [git log] [help] [clear]       │
└────────────────────────────────────────────────────┘
```

**Option B: File System Structure** (Recommended)

```
$ ls -la
drwxr-xr-x  atharv  staff    about.md
drwxr-xr-x  atharv  staff    projects/
drwxr-xr-x  atharv  staff    experience/
drwxr-xr-x  atharv  staff    skills.json
-rwxr-xr-x  atharv  staff    contact.sh
drwxr-xr-x  atharv  staff    .github/

$ cat about.md  (auto-executes on click)
```

**Implementation**:

- Both visual clicks AND typed commands work
- Persistent command history
- Visual feedback on hover
- Current directory indicator

---

### 3. About Section

```
$ cat about.md

# Atharv Dange

## Backend Engineer & Framework Author

Full-stack engineer with nearly 2 years of professional experience
specializing in backend architecture and framework development.

- 📍 Location: India
- 🚀 Started Coding: January 2021
- 💼 Role: Software Engineer & Framework Author
- ⚡ Notable: Creator of Reiatsu Framework
- 🎯 Focus: Production-grade backend systems

[GitHub: @atharvdange618]  [LinkedIn: /atharvdange]

---
Type 'systemctl status' to view active projects
Type 'git log' to view my journey
```

---

### 4. Projects as Running Services

```
$ systemctl status --all

● reiatsu.service - Web Framework
  Active: active (running) for 847 days
  ├─ NPM Downloads: 2,847 this week ⬆
  ├─ GitHub Stars: 45 ⭐
  ├─ Test Coverage: 94% ✓
  └─ Status: Production Ready 🟢

  [View Details] [Architecture] [GitHub] [NPM]

● telemetry.service - Analytics Platform
  Active: active (running) for 423 days
  ├─ Uptime: 99.8% 🟢
  ├─ Active Users: 127 users
  ├─ Response Time: 43ms avg
  └─ Status: Production 🟢

  [View Details] [Live Demo] [GitHub]

● archive.service - Digital Sanctuary
  Active: active (running) for 234 days
  ├─ Platform: Web + iOS + Android
  ├─ Tech: Hono, Bun, MongoDB, Expo
  └─ Status: Production 🟢

  [View Details] [GitHub]

● minty.service - Bookmark Manager
  Active: active (running) for 156 days
  └─ Status: Production 🟢

● recon.service - Face Recognition System
  Active: development
  └─ Status: In Development 🟡

● xml-sitemap-generator.service - SEO Tool
  Active: active (running)
  ├─ NPM Package: Published
  └─ Status: Stable 🟢

$ systemctl show reiatsu
# Shows full details with architecture diagram
```

**Interactive Features**:

- Click service names to expand details
- Live API data for metrics
- Status indicators (🟢🟡🔴)
- Architecture diagrams on detail view
- Link to GitHub, live demos, NPM

---

### 5. Real-time Monitoring Dashboard

```
$ htop

  System Monitor - atharvdange.dev

  CPU Usage  [||||||||··········] 45%  Backend Services
  Memory     [||||||············] 32%  Node.js Processes
  Network    [||||··············] 18%  Active Connections

  PID   NAME           CPU%   MEM    UPTIME     STATUS
  1001  reiatsu        12.3   256M   847 days   ✓ Running
  1002  telemetry      8.7    512M   423 days   ✓ Running
  1003  archive        6.2    384M   234 days   ✓ Running
  1004  minty          3.1    128M   156 days   ✓ Running
  1005  xml-sitemap    2.4    64M    89 days    ✓ Running
  1006  portfolio-v2   5.8    192M   0 days     ✓ Running

  Total Processes: 6 active | Load: 0.45, 0.52, 0.48
```

**Features**:

- Animated bars
- Real-time updates
- Sortable columns
- Click to view process details

---

### 6. Experience Timeline (Git Log Style)

```
$ git log --oneline --graph --all

* a7f3c21 (HEAD -> main) 📍 Senior Software Engineer @ Current Company
|           Dec 2024 - Present | Building scalable backend systems
|
* 94bc8e2 🚀 Released Reiatsu Framework v2.0
|           Oct 2024 | Zero-dependency TypeScript web framework
|
* 8f3b2a1 💼 Software Engineer @ Tech Company
|           Jun 2023 - Nov 2024 | Full-stack development
|
* 6d2a91f 📊 Built Telemetry Analytics Platform
|           Aug 2024 | Privacy-first analytics with real-time dashboards
|
* 5c1e4d3 📱 Launched ArcHive Mobile Apps
|           May 2024 | Cross-platform iOS & Android
|
* 3f8b4a0 💻 Full Stack Developer @ Previous Company
|           Jan 2023 - May 2023 | Web & mobile applications
|
* 2a9c7e1 🎓 Computer Engineering Graduate
|           2018 - 2022 | Bachelor's Degree
|
* 1a2c3d4 🌱 First Commit - Started Coding Journey
|           Jan 2021 | Hello, World!

$ git show a7f3c21
# Shows expanded details of that experience
```

**Features**:

- Beautiful ASCII graph
- Emoji icons for visual appeal
- Click commits to expand
- Timeline spans from Jan 2021 to present
- Achievements as "commits"

---

### 7. Skills as Package Manager

```
$ npm list --depth=0

portfolio@2.0.0 /home/atharv/skills
├── typescript@expert ⭐⭐⭐⭐⭐
├── nodejs@advanced ⭐⭐⭐⭐
├── postgresql@advanced ⭐⭐⭐⭐
├── mongodb@advanced ⭐⭐⭐⭐
├── redis@intermediate ⭐⭐⭐
├── docker@advanced ⭐⭐⭐⭐
├── kubernetes@intermediate ⭐⭐⭐
├── react@advanced ⭐⭐⭐⭐
├── nextjs@intermediate ⭐⭐⭐
├── fastify@expert ⭐⭐⭐⭐⭐
├── hono@advanced ⭐⭐⭐⭐
├── prisma@advanced ⭐⭐⭐⭐
├── git@advanced ⭐⭐⭐⭐
└── ... (view all packages)

$ npm info typescript

typescript@expert

Backend expertise with production-grade TypeScript development.
Built frameworks, APIs, and scalable applications.

Keywords: backend, framework, type-safety, node.js
Experience: 4+ years
Projects: Reiatsu, Telemetry, ArcHive

$ npm info --all
# Shows all skills with details
```

**Visualization Options**:

- Package.json style listing
- Progress bars for proficiency
- Group by category (Backend, Frontend, DevOps, Tools)
- Interactive - click to see details

---

### 8. Contact Section

```
$ cat contact.sh

#!/bin/bash

echo "📬 Get in Touch"
echo "================================"
echo ""
echo "📧 Email:    your.email@domain.com"
echo "🐙 GitHub:   github.com/atharvdange618"
echo "💼 LinkedIn: linkedin.com/in/atharvdange"
echo "🐦 Twitter:  @yourhandle"
echo ""
echo "💡 Available for:"
echo "  • Backend Engineering Roles"
echo "  • Open Source Collaborations"
echo "  • Technical Consulting"
echo ""
echo "$ ./send-message.sh"

$ ./send-message.sh
# Opens contact form or email client
```

**Interactive Form**:

```
$ ./send-message.sh

From: visitor@example.com
Subject: [___________________________]
Message:
┌─────────────────────────────────────┐
│                                      │
│                                      │
│                                      │
└─────────────────────────────────────┘

[Send Message] [Cancel]
```

---

## 🎨 Visual Design Elements

### Color Scheme (Backend/DevOps Inspired)

**Dark Terminal Theme**:

- Background: `#0d1117` (GitHub dark)
- Secondary BG: `#161b22`
- Terminal BG: `#0d1117`

**Text Colors**:

- Primary: `#c9d1d9` (light gray)
- Success/Green: `#50fa7b` (terminal green)
- Info/Cyan: `#8be9fd`
- Warning/Yellow: `#f1fa8c`
- Error/Red: `#ff5555`
- Accent/Blue: `#78dce8`

**Syntax Highlighting**:

- Comments: `#6272a4` (muted gray)
- Strings: `#f1fa8c` (yellow)
- Keywords: `#ff79c6` (pink)
- Functions: `#50fa7b` (green)

### Typography

**Fonts** (in order of preference):

1. `JetBrains Mono` (primary)
2. `Fira Code`
3. `Monaco`
4. `Consolas`
5. `monospace` (fallback)

**Settings**:

- Font size: 14px - 16px
- Line height: 1.6
- Letter spacing: 0.5px
- Font ligatures: enabled
- Font variant ligatures: contextual

### Cursor

**Styles**:

- Blinking block cursor: `█`
- Animation: 530ms blink interval
- Colors: `#50fa7b` or `#8be9fd`

### Animations

**Typing Effect**:

- Speed: 30-50ms per character
- Cursor follows
- Smooth and realistic

**Loading Spinners** (ASCII):

```
⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏  (braille spinner)
[    ] → [=   ] → [==  ] → [=== ] → [====]  (progress bar)
```

**Transitions**:

- Fade in: 200ms
- Slide up: 300ms ease-out
- Smooth scroll: momentum-based

**Progress Bars**:

```
[||||||||··········] 45%
[█████░░░░░░░░░░░░░] 28%
```

---

## 🚀 Trust & Credibility Features

### 1. Live System Metrics

```
$ uptime
15:42:34 up 847 days, 12:34, load average: 0.45, 0.52, 0.48

$ free -h
              total        used        free      shared
Mem:           16Gi       5.2Gi       8.4Gi       2.4Gi
Swap:          8.0Gi       0.0Gi       8.0Gi
```

### 2. Real API Integrations

**GitHub Stats**:

```
$ curl -s api.github.com/users/atharvdange618 | jq

{
  "name": "Atharv Dange",
  "public_repos": 42,
  "followers": 156,
  "following": 89,
  "created_at": "2021-01-15",
  "total_stars": 247,
  "contributions_2025": 1847
}
```

**NPM Downloads** (for Reiatsu):

```
$ npm info reiatsu

reiatsu@2.0.0 | MIT | deps: 0 | versions: 12
Zero-dependency TypeScript web framework

Downloads:
  Last Week:  2,847 ↑ 12%
  Last Month: 11,234 ↑ 8%
  Total:      45,678

https://github.com/atharvdange618/reiatsu
https://npmjs.com/package/reiatsu
```

### 3. Test Coverage Reports

```
$ npm test

Running test suites...

✓ reiatsu
  94% coverage | 847 tests | 0 failing

✓ telemetry
  87% coverage | 423 tests | 0 failing

✓ archive
  91% coverage | 234 tests | 0 failing

Total: 1,504 tests passing
Average coverage: 90.7%

All systems ✓
```

### 4. Production Logs (Sanitized & Safe)

```
$ tail -f /var/log/projects.log

[2025-12-10 14:23:45] [INFO] Reiatsu: Request handled in 12ms
[2025-12-10 14:23:47] [INFO] Telemetry: Active users: 127
[2025-12-10 14:23:50] [SUCCESS] Health check: All services healthy
[2025-12-10 14:23:52] [INFO] Archive: Upload completed (2.3MB)
[2025-12-10 14:23:55] [INFO] API response time: 43ms avg
[2025-12-10 14:23:58] [SUCCESS] Database: Connection pool healthy
```

### 5. Deployment Status

```
$ kubectl get pods

NAME                        READY   STATUS    RESTARTS   AGE
reiatsu-6d4f8c9b-xk7p2      1/1     Running   0          847d
telemetry-8c9d2f1a-mn4q5    1/1     Running   0          423d
archive-3b6a7e2c-rt8w9      1/1     Running   0          234d

$ docker ps

CONTAINER ID   IMAGE              STATUS          PORTS
a1b2c3d4e5f6   reiatsu:latest    Up 847 days     3000/tcp
b2c3d4e5f6g7   telemetry:latest  Up 423 days     8080/tcp
```

---

## 🎮 Interactive Elements & Easter Eggs

### Standard Commands

| Command      | Description       | Output                         |
| ------------ | ----------------- | ------------------------------ |
| `help`       | Show all commands | Command list with descriptions |
| `clear`      | Clear terminal    | Clears screen                  |
| `history`    | Command history   | Shows previous commands        |
| `ls`         | List sections     | File/directory listing         |
| `cat <file>` | View section      | Display content                |
| `cd <dir>`   | Navigate          | Change section                 |
| `pwd`        | Current path      | Show current location          |
| `man <cmd>`  | Manual pages      | Help for specific command      |

### Easter Eggs (For Developers) 🥚

**1. Dangerous Commands (Safe & Funny)**

```
$ sudo rm -rf /
[sudo] password for visitor:
⚠️  ABORT! ABORT! ABORT!
Nice try, but I'm not falling for that one 😄

$ :(){ :|:& };:
Detected fork bomb attempt!
🎭 You're a cheeky one, aren't you?
```

**2. Fun Commands**

```
$ cowsay "Hire me!"
 ___________
< Hire me! >
 -----------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

$ sl
# ASCII train animation crosses the screen

$ matrix
# Matrix-style falling characters animation

$ fortune
"The best error message is the one that never shows up." - Thomas Fuchs

$ asciiquote
  _________________________________
 / Atharv builds frameworks,       \
| not just applications.            |
 \ - Someone who knows TypeScript /
  ---------------------------------
```

**3. System Info Commands**

```
$ neofetch
                   atharv@portfolio-v2
       ___         -------------------------
      (.. |        OS: Portfolio Linux v2.0
      (<> |        Host: atharvdange.dev
     / __  \       Kernel: TypeScript 5.x
    ( /  \ /|      Uptime: 847 days
   _/\ __)/_)      Packages: 42 (projects)
   \/-____\/       Shell: zsh 5.9
                   Resolution: Pixel Perfect
                   Theme: Dracula Terminal
                   CPU: Brain (100%)
                   Memory: Coffee-powered

$ whoami
atharvdange618
Backend engineer who loves building frameworks

$ uname -a
Portfolio 2.0 TypeScript Node.js React TailwindCSS Framer-Motion
```

**4. Developer Jokes**

```
$ sudo make me a sandwich
Okay.
🥪 *makes you a sandwich*

$ please
What's the magic word?

$ git gud
Already at peak performance 😎

$ npm install girlfriend
Error: Package not found
Did you mean: focusing-on-career?
```

---

## 📱 Mobile Responsiveness

### Approach

- **Simplified UI** with touch-optimized controls
- **Command suggestions** instead of free typing
- **Swipe gestures** for navigation
- **Bottom command bar** always visible
- **Larger touch targets** (min 44x44px)

### Mobile Layout

```
┌─────────────────────────┐
│ atharvdange.dev    [≡] │ <- Header with menu
├─────────────────────────┤
│                         │
│   Terminal Output       │
│   (scrollable)          │
│                         │
│                         │
│                         │
├─────────────────────────┤
│ ⌨️ Commands            │ <- Collapsible
│ [about] [projects]      │
│ [skills] [contact]      │
├─────────────────────────┤
│ $ █                     │ <- Input (optional)
└─────────────────────────┘
```

### Gestures

- **Swipe left/right**: Navigate sections
- **Pull down**: Refresh/reload
- **Double tap**: Zoom text
- **Long press**: Copy text

---

## 🛠️ Tech Stack

### ✅ FINALIZED TECH STACK (December 10, 2025)

### Frontend Framework

- **Next.js 14+** - React framework with App Router, SSR/SSG support
- **TypeScript** - Type safety and excellent developer experience
- **React 18+** - UI library with latest features

### Terminal Emulation

- **xterm.js** - Industry-standard terminal emulator (used by VS Code, AWS Cloud9)
- **@xterm/addon-fit** - Responsive terminal sizing
- **@xterm/addon-web-links** - Clickable links in terminal
- Custom command parser and executor

### Styling

- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- Custom terminal theme with CSS variables
- PostCSS for optimization

### Animation

- **Framer Motion** - Production-ready animation library
- Custom typing effect hooks
- CSS transitions for performance-critical animations

### State Management

- **Zustand** - Lightweight, scalable state management
  - Terminal history tracking
  - Current path/directory state
  - Command execution state
  - User preferences

### API Integration

- **Native Fetch API** - Built-in, no extra dependencies
- **GitHub API** - Repository stats, user data, contributions
- **NPM Registry API** - Download statistics, package info
- Client-side data fetching with caching

### Utilities

- **date-fns** - Modern date formatting and manipulation
- **clsx** - Conditional className composition
- Built-in Next.js utilities (cn helper from shadcn)

### Development Tools

- **ESLint** - Code linting with Next.js config
- **Prettier** (optional) - Code formatting
- **TypeScript Compiler** - Type checking

---

## 📋 Implementation Phases

### Phase 1: Foundation (Week 1)

- [x] Initialize Next.js project with TypeScript
- [x] Set up Tailwind CSS
- [x] Install and configure shadcn/ui
- [x] Install xterm.js and addons
- [x] Install Zustand for state management
- [x] Install Framer Motion for animations
- [x] Create project structure (components, utils, types, data)
- [x] Set up environment variables
- [x] Create TypeScript types
- [x] Set up Zustand store
- [x] Create portfolio data files
- [x] Create API utility functions
- [ ] Build terminal UI component
- [ ] Implement command parser
- [ ] Create basic navigation system
- [ ] Design color scheme & typography
- [ ] Build MOTD/login screen

### Phase 2: Core Sections (Week 2)

- [ ] About section (`cat about.md`)
- [ ] Projects as services (`systemctl status`)
- [ ] Experience timeline (`git log`)
- [ ] Skills listing (`npm list`)
- [ ] Contact section (`./contact.sh`)

### Phase 3: Interactivity (Week 3)

- [ ] Command history
- [ ] Tab completion
- [ ] Auto-typing animations
- [ ] Loading states
- [ ] Error handling

### Phase 4: Live Data (Week 4)

- [ ] GitHub API integration
- [ ] NPM API integration
- [ ] Real-time metrics
- [ ] Analytics tracking
- [ ] Performance monitoring

### Phase 5: Polish (Week 5)

- [ ] Easter eggs implementation
- [ ] Mobile optimization
- [ ] Accessibility (ARIA labels, keyboard nav)
- [ ] Performance optimization
- [ ] SEO optimization

### Phase 6: Testing & Launch

- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance audits
- [ ] User testing
- [ ] Deploy to production

---

## 🎯 Success Metrics

### User Engagement

- Average session duration > 2 minutes
- Command usage rate (% of visitors who type commands)
- Easter egg discovery rate
- Mobile vs desktop usage

### Technical Performance

- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse score > 90
- Core Web Vitals passing

### Trust Indicators

- API data freshness (< 5 min old)
- Error rate < 0.1%
- Uptime > 99.9%

---

## 🔒 Security Considerations

### Input Sanitization

- Sanitize all user inputs
- No `eval()` or code execution
- Command whitelist only

### API Keys

- Environment variables for secrets
- Rate limiting on APIs
- CORS properly configured

### XSS Prevention

- Sanitize all output
- CSP headers configured
- No inline scripts

---

## ♿ Accessibility

### WCAG 2.1 AA Compliance

- [ ] Keyboard navigation for all features
- [ ] Screen reader support (ARIA labels)
- [ ] High contrast mode option
- [ ] Focus indicators
- [ ] Skip links
- [ ] Alt text for all visuals

### Features

- `Tab` to navigate commands
- `Enter` to execute
- `Esc` to clear/cancel
- Screen reader announces command output

---

## 🌐 SEO Optimization

### Meta Tags

```html
<title>Atharv Dange - Backend Engineer & Framework Author</title>
<meta
  name="description"
  content="Backend engineer specializing in TypeScript, Node.js, and framework development. Creator of Reiatsu framework."
/>
```

### Structured Data

- JSON-LD for Person schema
- Open Graph tags
- Twitter Card meta

### Performance

- Server-side rendering (optional)
- Static generation where possible
- Image optimization
- Code splitting

---

## 📚 Resources & References

### Design Inspiration

- [cool-retro-term](https://github.com/Swordfish90/cool-retro-term)
- [powerlevel10k](https://github.com/romkatv/powerlevel10k)
- [github.com terminal aesthetic](https://github.com)

### Terminal Emulators

- [xterm.js](https://xtermjs.org/)
- [react-terminal](https://github.com/rohanchandra/react-terminal-component)

### Color Schemes

- Dracula Theme
- Nord Theme
- GitHub Dark
- Monokai Pro

---

## 💡 Future Enhancements

### V2.1 Features

- [ ] AI chatbot as `./assistant.sh`
- [ ] Blog section as `vim blog/`
- [ ] Resume download as `wget resume.pdf`
- [ ] Code editor integration
- [ ] Multiplayer/guest book (`wall` command)

### V2.2 Features

- [ ] WebGL terminal rendering
- [ ] Custom font rendering
- [ ] Terminal recording playback
- [ ] Share command outputs
- [ ] Dark/light theme toggle

---

## 📝 Notes

- Keep it performant - avoid heavy animations
- Test on slow connections (3G simulation)
- Ensure graceful degradation
- Make mobile experience delightful
- Keep easter eggs tasteful and professional
- Update metrics weekly
- Monitor analytics for user behavior

---

**End of Context Document**

This document serves as the single source of truth for Portfolio V2 development.
Last updated: December 10, 2025
