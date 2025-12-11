# Portfolio V2 - TUI Terminal Interface

**A terminal-based portfolio experience** that makes you feel like you've SSH'd into a developer's server.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🎯 Concept

This portfolio reimagines the traditional portfolio website as a terminal user interface (TUI), showcasing backend engineering skills while remaining accessible to all visitors.

### Key Features

- 🖥️ **Terminal-style interface** with authentic Unix/Linux aesthetic
- ⌨️ **Command-line interaction** with command history (arrow keys)
- 📊 **Live metrics** from GitHub API, NPM downloads, and more
- 🎮 **Easter eggs** for fellow developers
- 📱 **Mobile-optimized** with touch-friendly controls
- ♿ **Accessible** with full keyboard navigation

## 📋 Available Commands

### Navigation & Info

- `help` / `?` - Show all available commands
- `ls` - List available sections
- `pwd` - Print current directory
- `whoami` - Display user information
- `neofetch` - Show system information
- `clear` / `cls` - Clear the terminal screen

### Content Commands

- `cat <file>` - View section content
  - `cat about.md` - View bio and background ✅
  - `cat contact.sh` - View contact information ✅
  - `cat skills.json` - Tip to use npm list
- `systemctl status` - View all running projects
- `systemctl status <project>` - View specific project details
- `systemctl show <project>` - Alias for detailed view
- `git log` - View experience timeline
- `git log --oneline` - Compact timeline view
- `npm list` - View all skills
- `npm info <skill>` - View skill details

### Utilities

- `echo <text>` - Print text to terminal
- `history` - Show command history tip (use ↑/↓ arrows)

## 🛠️ Tech Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **xterm.js** - Professional terminal emulator
- **Zustand** - Lightweight state management
- **Framer Motion** - Smooth animations
- **GitHub API** - Live repository stats _(integrating)_
- **NPM API** - Real-time download metrics _(integrating)_

## 📖 Documentation

- **[context.md](./context.md)** - Complete design specifications
- **[PROGRESS.md](./PROGRESS.md)** - Development progress tracker
- **[NEXT_STEPS.md](./NEXT_STEPS.md)** - Upcoming features & priority queue
- **[SETUP_COMPLETE.md](./SETUP_COMPLETE.md)** - Setup checklist
- **[PROJECT_STATUS.json](./PROJECT_STATUS.json)** - Current status snapshot

## 🎨 Design Philosophy

- **Progressive Complexity**: Easy for everyone, powerful for developers
- **Authenticity**: Real backend developer aesthetic
- **Trust**: Live metrics, not hardcoded stats
- **Interactivity**: Engaging and fun

## 🚧 Development Status

**Phase 1: Foundation & Core Terminal** ✅ Complete (100%)

- Terminal component with xterm.js
- Command system with 15+ commands
- Command history and keyboard shortcuts
- Welcome screen and responsive layout

**Phase 2: Enhanced Features & Polish** 🔄 In Progress (40%)

- Tab completion _(next)_
- Cat command for content _(next)_
- Live API integration _(next)_
- Easter egg commands
- Mobile optimization

**Phase 3: Advanced Features** 📅 Planned

- Animations and polish
- Session persistence
- Accessibility improvements
- Performance optimizations

See [PROGRESS.md](./PROGRESS.md) for detailed roadmap.

## ⌨️ Keyboard Shortcuts
- `Tab` - Auto-complete commands, files, and arguments ✨- `↑` / `↓` - Navigate command history
- `Ctrl+C` - Cancel current input
- `Ctrl+L` - Clear screen (same as `clear` command)
- `Tab` - Auto-complete _(coming soon)_

## 🎮 Easter Eggs

Try typing these commands for some fun surprises _(coming soon)_:

- `sudo rm -rf /` - Don't worry, it's safe! 😄
- `cowsay <message>` - ASCII cow art
- `sl` - Train animation
- `matrix` - Matrix falling characters
- `fortune` - Random developer quotes

## 📝 License

MIT

---

**Built with ❤️ by Atharv Dange**  
_Backend Engineer & Framework Author_
