# Minty 🍃💳

> **Smart Expense Tracking Made Simple**

A powerful, privacy-focused expense tracker that automatically reads and categorizes your transaction SMS messages. Built with React Native for a seamless mobile experience on Android.

[![React Native](https://img.shields.io/badge/React%20Native-0.82.1-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-Local%20Storage-green.svg)](https://www.sqlite.org/)
[![Android](https://img.shields.io/badge/Android-15+-green.svg)](https://developer.android.com/)
[![Privacy First](https://img.shields.io/badge/Privacy-First-yellow.svg)](#-privacy--security)

## ✨ Features

### 🤖 Smart SMS Processing

- **Automatic SMS parsing** from 50+ banks and UPI apps (PhonePe, Google Pay, Paytm, etc.)
- **Intelligent detection** of amount, merchant, and transaction type
- **Real-time transaction tracking** with live SMS monitoring
- **Category auto-classification** with smart categorization rules
- **Duplicate detection** to prevent data redundancy
- **Bulk SMS scanning** on first launch for historical data

### 📊 Advanced Analytics

- **Enhanced donut charts** with category breakdowns and percentages
- **Spending velocity gauge** to track spending patterns in real-time
- **Monthly trend analysis** with beautiful line charts
- **Spending heatmap calendar** for pattern visualization
- **Category-wise pie charts** with interactive legends
- **Transaction timeline** with search and filter capabilities

### 💾 Robust Data Management

- **Offline-first architecture** with SQLite local storage
- **Fast database operations** with optimized queries
- **Transaction history** with unlimited storage capacity
- **Secure local storage** with no external dependencies

### 🎨 Modern UI/UX

- **Tab-based navigation** for organized data access (Home, Transactions, Analytics)
- **Custom app icon** with professional Minty branding
- **Smooth animations** and loading indicators
- **Responsive design** optimized for all Android screen sizes
- **Intuitive gesture controls** and touch interactions
- **Modal dialogs** for detailed transaction views

### 🔒 Privacy & Security

- **100% offline processing** - no data leaves your device
- **Local SQLite storage** - all data stays on your phone
- **No cloud dependencies** or external data sharing
- **No analytics or tracking** - complete privacy
- **Secure SMS permissions** with proper Android 15 compliance
- **Open source** - audit the code yourself

### 🛠️ Developer Experience

- **TypeScript** for type safety and better development
- **Modern React Native 0.82** with New Architecture enabled
- **Hermes engine** for optimal performance
- **Comprehensive error handling** and logging
- **Modular architecture** for easy maintenance
- **Custom native modules** for SMS reading

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- React Native CLI
- Android Studio (for Android development)
- JDK 17+
- Android device or emulator running Android 11+

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/atharvdange618/Minty.git
   cd Minty
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build and run on Android**

   For debug build:

   ```bash
   npx react-native run-android
   ```

   For release build:

   ```bash
   cd android
   ./gradlew assembleRelease
   adb install -r app/build/outputs/apk/release/app-release.apk
   ```

### Required Permissions

Minty requires the following Android permissions:

- **READ_SMS** - To read existing transaction SMS messages
- **RECEIVE_SMS** - To detect new incoming transaction SMS in real-time
- **INTERNET** - For app updates only (no data transmission)

All permissions are requested at runtime with clear explanations.

## 📱 Usage Guide

### Initial Setup

1. Launch the app and grant required permissions
2. The app will automatically start parsing SMS messages
3. Review detected transactions in the main dashboard

### Managing Transactions

- **View Details**: Tap any transaction card to see complete information
- **Add Manual**: Use the + button to manually add transactions
- **Filter by Type**: View debits, credits, or all transactions
- **Search**: Find transactions by merchant, amount, or category
- **Real-time Updates**: New SMS transactions appear automatically

### Analytics & Insights

- **Home Screen**: Monthly summary with total debits, credits, and balance
- **All Transactions**: Complete transaction timeline with filtering
- **Analytics Screen**:
  - Category-wise spending breakdown with pie charts
  - Monthly trend analysis with line charts
  - Spending heatmap calendar
  - Spending velocity gauge

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React Native 0.82.1 + TypeScript 5.8
- **Storage**: SQLite with react-native-sqlite-storage
- **Navigation**: React Navigation 7 (Bottom Tabs)
- **Charts**: Victory Native & react-native-svg-charts
- **Icons**: Lucide React Native
- **State Management**: Zustand
- **Native Modules**: Custom Kotlin modules for SMS reading
- **Architecture**: New Architecture enabled with Hermes

### Project Structure

```
app/
├── components/              # Reusable UI components
│   ├── AddTransactionModal.tsx
│   ├── CategoryPieChart.tsx
│   ├── EnhancedDonutChart.tsx
│   ├── MonthlyTrendChart.tsx
│   ├── SpendingHeatmap.tsx
│   ├── SpendingVelocityGauge.tsx
│   ├── TransactionCard.tsx
│   └── TransactionDetailsModal.tsx
├── hooks/                   # Custom React hooks
│   ├── useAppPermissions.ts
│   └── useSmsPermissions.ts
├── native/                  # Native module interfaces
│   └── SmsReader.ts
├── screens/                 # Main app screens
│   ├── HomeScreen.tsx
│   ├── AllTransactionsScreen.tsx
│   └── AnalyticsScreen.tsx
├── services/               # Business logic & APIs
│   ├── db/                # Database operations
│   │   └── database.ts
│   ├── sms/               # SMS parsing
│   └── liveSmsService.ts  # Real-time SMS monitoring
├── store/                  # Zustand state management
├── types/                  # TypeScript definitions
└── utils/                  # Utility functions
    ├── smsParser.ts       # SMS parsing logic
    ├── smsPatterns.ts     # Bank/UPI patterns
    └── transactionProcessor.ts

android/
└── app/src/main/java/com/minty/
    └── smsreader/         # Kotlin native modules
        ├── SmsReader.kt
        ├── SmsReceiver.kt
        ├── SmsReaderModule.kt
        └── SmsReaderPackage.kt
```

### Key Services

- **SMS Parser**: Advanced regex-based parser supporting 50+ banks and UPI apps
- **Database Service**: Optimized SQLite operations with transaction management
- **Live SMS Service**: Real-time SMS monitoring using native Android BroadcastReceiver
- **Transaction Processor**: Intelligent categorization and duplicate detection

## 🎯 Supported Banks & Services

Minty recognizes SMS patterns from 50+ Indian financial institutions:

### Banks

- **Public Sector**: SBI, Bank of Baroda, Canara Bank, PNB, Union Bank, Indian Bank
- **Private Sector**: HDFC Bank, ICICI Bank, Axis Bank, Kotak Mahindra, Yes Bank, IndusInd
- **Payment Banks**: Paytm Payments Bank, Airtel Payments Bank, IPPB, Fino Payments Bank
- **Cooperative Banks**: Poornawadi Bank, Saraswat Bank, and more

### UPI & Digital Wallets

- **UPI Apps**: PhonePe, Google Pay (GPay), Paytm, BHIM, Amazon Pay
- **Digital Wallets**: Mobikwik, Freecharge, PayU, PayZapp
- **Banking Apps**: iMobile Pay, YONO SBI, Axis Mobile

### Payment Gateways & Others

- Razorpay, PayU Money, CCAvenue
- Credit card transactions from all major providers
- ATM withdrawals and deposits
- NEFT, RTGS, IMPS transfers

## 🔧 Configuration & Customization

### Adding Custom Bank Patterns

Add custom bank SMS patterns in `app/utils/smsPatterns.ts`:

```typescript
{
  name: 'YOUR_BANK',
  pattern: /your-regex-pattern-here/i,
  priority: 1
}
```

### Category Customization

Categories are auto-assigned based on merchant keywords in `app/utils/transactionProcessor.ts`. You can modify the categorization logic to suit your needs.

### Build Configuration

- **Debug Build**: Uses debug keystore, suitable for testing
- **Release Build**: Requires proper keystore for production deployment
- **Android 15 Compatibility**: All security requirements met, including proper SMS receiver configuration and release signing

## 🛡️ Security-First Design Decisions

Minty prioritizes **user security and privacy** over feature completeness. Some design decisions reflect this commitment:

### Removed Features (Intentionally)

- **❌ Backup & Restore**: Removed to comply with Google Play Protect policies and avoid requesting sensitive storage permissions that could flag the app as malware
- **❌ Push Notifications**: Removed to eliminate network dependencies and potential privacy concerns
- **❌ Cloud Sync**: Never implemented - your data stays 100% on your device, period

### Why We Made These Choices

1. **Google Play Protect Compliance**: Apps requesting extensive SMS + storage permissions are flagged as potential malware
2. **True Privacy**: No backup means no data leakage risk - ever
3. **Minimal Permissions**: Only request what's absolutely necessary (READ_SMS, RECEIVE_SMS)
4. **User Trust**: Better to have fewer features than compromise user security

This approach means you won't lose data if you uninstall the app, but it also means **nobody else can access your financial data** - not even us, not even accidentally.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Guidelines

- Use TypeScript for all new code
- Follow existing code style and patterns
- Test on real Android devices (especially Android 15+)
- Keep components small and focused
- Write meaningful commit messages

### Areas for Contribution

- [ ] Add support for more banks and UPI apps
- [ ] Improve SMS parsing accuracy
- [ ] Enhance analytics visualizations
- [ ] Add widgets for home screen (within security constraints)
- [ ] Improve category auto-classification
- [ ] Add transaction notes and tags (local storage only)
- [ ] Budget tracking features
- [ ] Support for international SMS formats

## 📊 Performance

- **App Size**: ~60MB (includes native libraries and Hermes engine)
- **Memory Usage**: Optimized for low-end devices
- **SMS Processing**: Near-instant parsing with regex patterns
- **Database Operations**: Fast SQLite queries with indexing
- **Cold Start Time**: ~2 seconds on modern devices
- **Real-time SMS Detection**: Immediate transaction updates

## 🔒 Security & Privacy

### Data Protection

- **100% Local Processing**: All SMS parsing happens on-device
- **No Network Transmission**: Your financial data never leaves your phone
- **No Cloud Storage**: Everything stored in local SQLite database
- **No Analytics**: No tracking, no telemetry, no data collection
- **Open Source**: Full transparency - audit the code yourself

### Android 15 Security Compliance

- ✅ No high-priority SMS interception (removed malware-like behavior)
- ✅ Proper release signing (not debug keystore)
- ✅ SMS receiver set to `exported=false` for security
- ✅ Passes Google Play Protect checks
- ✅ Compliant with Android's privacy requirements
- ✅ Minimal permission footprint (only READ_SMS and RECEIVE_SMS)
- ✅ No sensitive storage permissions that could trigger security flags

### Permissions Justification

- **READ_SMS**: Read existing transaction SMS for historical data
- **RECEIVE_SMS**: Detect new transactions in real-time
- **INTERNET**: App updates only (no data transmission)

For complete privacy details, see [PRIVACY_POLICY.md](PRIVACY_POLICY.md)

## 📖 Documentation

- [Privacy Policy](PRIVACY_POLICY.md) - Complete transparency on data handling
- [Statement of Work](sow.md) - Original project scope and requirements

## 🙋‍♂️ Support & Contact

Having issues or suggestions? Reach out!

- **Bug Reports**: [GitHub Issues](https://github.com/atharvdange618/Minty/issues)
- **Feature Requests**: [GitHub Issues](https://github.com/atharvdange618/Minty/issues)
- **Email**: atharvdange.dev@gmail.com
- **GitHub**: [@atharvdange618](https://github.com/atharvdange618)

## 🌟 Acknowledgments

- **React Native Community** for the amazing framework and ecosystem
- **SQLite Team** for robust local database engine
- **Victory Charts** and **react-native-svg** for beautiful visualizations
- **Lucide Icons** for the clean icon set
- **Open Source Community** for inspiration and support

## 🚧 Known Limitations

- **Android Only**: Currently only supports Android (iOS support planned)
- **Indian Banks Focus**: Primarily optimized for Indian banking SMS formats
- **English SMS Only**: Best results with English language SMS messages
- **SMS Format Dependency**: Accuracy depends on standardized bank SMS formats

## 🗺️ Roadmap

### Planned Features

- [ ] iOS support (with privacy-first approach)
- [ ] Budget tracking and alerts (local only)
- [ ] Recurring transaction detection
- [ ] Bill payment reminders
- [ ] Multi-currency support
- [ ] Custom category creation
- [ ] Transaction notes and tags (local storage)
- [ ] Advanced filtering and search
- [ ] Spending goals and insights

### Intentionally NOT Planned (Privacy/Security)

- ❌ Cloud backup/sync - Conflicts with privacy-first approach
- ❌ Data export to external storage - Triggers security flags
- ❌ Push notifications - Requires network dependencies
- ❌ Third-party integrations - Compromises offline-first architecture

---

**Built with ❤️ for privacy-conscious expense tracking**

> 🔒 **Privacy Guarantee**: Minty will NEVER have cloud sync, NEVER request storage permissions beyond what's essential, and NEVER transmit your financial data. We intentionally limit features to protect your privacy. All processing happens locally on your device.

> 📱 **Platform**: Currently Android only (Android 11+). Fully tested and Google Play Protect compliant on Android 15.

> 🛡️ **Security-First**: Some features were intentionally removed to maintain Google Play Protect compliance and ensure your data remains truly private. We believe less is more when it comes to security.
