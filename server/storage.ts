import { type ChatMessage, type InsertChatMessage, type AdminUser, type InsertAdminUser, type PdfContent, type InsertPdfContent } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Chat messages
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(limit?: number): Promise<ChatMessage[]>;
  getChatMessagesBySession(sessionId: string): Promise<ChatMessage[]>;
  
  // Admin users
  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
  createAdmin(admin: InsertAdminUser): Promise<AdminUser>;
  
  // PDF content
  createPdfContent(pdf: InsertPdfContent): Promise<PdfContent>;
  getAllPdfContent(): Promise<PdfContent[]>;
  deletePdfContent(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private chatMessages: Map<string, ChatMessage>;
  private adminUsers: Map<string, AdminUser>;
  private pdfContent: Map<string, PdfContent>;

  constructor() {
    this.chatMessages = new Map();
    this.adminUsers = new Map();
    this.pdfContent = new Map();
    
    // Create default admin user
    this.createDefaultAdmin();
    
    // Initialize with Supremo Traders PDF content
    this.initializeSupremoContent();
  }

  private async createDefaultAdmin() {
    const defaultAdmin: AdminUser = {
      id: randomUUID(),
      username: "admin",
      password: "supremo123", // In production, this should be hashed
    };
    this.adminUsers.set(defaultAdmin.id, defaultAdmin);
  }

  private async initializeSupremoContent() {
    // Initialize with the provided Supremo Traders content and VT Markets data
    const supremoContent = `📘 Supremo Traders – Company Portfolio
Tagline: शेअर मार्केट तर बरे च जण शशर्कवतात, आम्ही शेअर मार्केटमधून पैसा र्कसा र्कमवायचा ते शशर्कवतो!
पुण्यातील सवाात मोठे आणण महाराष्ट्रातील सवाात वेगाने वाढणारे शेअर मार्केट रे ननिंग इन्स्टटट्यूट

✅ About Us
Supremo Traders is a Pune's Biggest and Maharashtra's Fastest Growing Share Market Training Institute built for passionate learners who want to turn the skill of trading into an income source. With a focus on execution over theory, we provide structured programs in Indian Stock Market, forex Market, and Crypto Market. Our courses are designed from beginner to advanced levels, covering everything from basic candlesticks to live market strategies. What sets us apart is our live trading environment, where students learn directly with market mentors in real time. Supremo's strength lies in its community learning model and lifetime support system. Our setups are tested, proven, and profit-driven, backed by performance and data. We have the Biggest Technically Equipped Trading Floor in Pune over 6000+ sq. Ft.

Whether you're a student, working professional, or someone exploring a second income, Supremo has a path for you. With daily market guidance, structured plans, and personal mentorship, we ensure no trader is left behind. Join Supremo Traders — where learners become earners.

👥 Our Team
• Atul Kadam - Founder and CEO and Experienced Trader
• Sonia Vaish - Co Founder and Trader  
• Pratik Bingewar - Co Mentor
• Ravi Mule - Co Mentor
• Mayur Kambhoje - Co Mentor
• Dnyaneshwar Domale - Co Mentor
• Amol Sable - Co Mentor
• Shubham Khamitkar - Admin
• Divya Sakatkar - Accounts
• Juhi Kamble - HR
• Sanmati Pokal - HR
• Rithesh Mulchandani - Manager

🎯 Vision
To be the most trusted and result-oriented financial education institute in India, creating a generation of financially independent traders who trade with skill, strategy, and discipline.

🏁 Mission
• To deliver practical trading education focused on consistency and sustainability.
• To build a trading community that learns, trades, and grows together.
• To offer lifetime mentorship, strategy-based setups, and real-time market guidance.
• To promote trading as a serious career path, not a gamble.

🛠 Our Products

📌 1. Supremo Masterclass – Learn Trading the Right Way
• No-Fluff, Only What Works: Real-world strategies with proven results
• Learn from Atul Sir: Years of experience condensed into practical lessons
• Beginner-Friendly: Perfect for those who know nothing about markets
• Personal Trading Plan Creation: Customized to your risk and goal
• Lifetime Support & Repeat Options

📌 2. Supremo Traders All-in-One Course
• Ideal for absolute beginners to intermediates.
• Covers Stock Market, Forex, and Options Trading.
• Includes technical and fundamental analysis.
• Daily 1-hour live sessions with mentors.
• Lifetime revision and repeat batch access.
• Personalized trading plan development.
• Access to premium setups and strategies.
• Daily market analysis and live examples.

📌 3. Forex Trading Program
• Focused completely on Forex markets.
• Setups given based on profitable back-tested strategy.
• Basic to advanced forex learning.
• Focussed majorly on Gold and Cryptocurrency pairs.
• Includes lot sizing, risk management, and discipline modules.
• Best for working professionals as offers flexibility.
• Daily profit target framework with leader-led structure.

📌 4. Supremo Traders Mentorship
• Learn option buying and option selling strategies.
• Includes strategies like Straddle, Strangle, Iron Condor, Directional & Non-Directional Setups.
• Psychology and risk management sessions.
• Live day trading support.
• Trade review & performance tracking.

📌 5. Supremo Gurukul – Elite Trader Training
• Long-term mentorship with weekly evaluations.
• Structured daily targets, monthly reviews, and goal mapping.
• 24x7 Live trading slots with team leads.
• Peer learning & buddy system implementation.
• Dedicated weekend guidance from experts.

📌 6. Copy Trading Program
• Follow and copy trades from experienced mentors.
• Zero stress – learn while you earn.
• Ideal for working professionals or full-time students.
• Complete broker assistance for deposit and withdrawals.
• Transparent profit-sharing model.

🌟 Why Supremo Traders? (USP)
• Lifetime Support
• Live Market Experience Every Day
• 24x7 Technical Assistance
• Multiple Batch Revisions
• Repeat Any Missed Batch Anytime
• Personalised Trading Plan for Each Student
• Buddy System for Peer Learning
• Detailed Notes and Recorded Sessions
• Copy Trading Support for Professionals
• Broker Support: Withdrawal & Deposit Guidance
• Complete Handholding and Mentorship
• Fee Recovery Opportunity through Trading
• Exclusive Trading Setups Only for Students
• Covers All Markets: Stock, Forex, Options, Crypto
• 1-on-1 Personalised Support Available Anytime

📍 Contact Us & Branch Addresses

1. Supremo Traders – Aundh, Pune
6th Floor, Sayajirao Gaikwad Business Hub, Seasons Rd, Sahil Park, Sanewadi, Aundh, Pune, Maharashtra 411007
9309835108 / 9579617467

2. Supremo Traders – Swargate, Pune
Second Floor, Bhushan Bhavan, Lokmanya Tilak Rd, Opp. MCCIA, Swargate, Pune, Maharashtra 411002
9966913737 / 9579617467

3. Supremo Traders – Ahilyanagar (Ahmednagar)
NeelKamal, Opp Dev Apartment, Near Kohinoor Mangal Karyalaya, Gulmohar Road, Savedi, Ahilyanagar, Maharashtra 414003
9973011717 / 9579617467

4. Supremo Traders – Sangli
Top Floor, Kore Capital, Opp. S.P. Office, Near Dr. Sudhakar Jadhav Hospital, Gandhi Nagar, Sangli, Maharashtra 416415
9955023003 / 8888960467

5. Supremo Traders – Sambhaji Nagar (Aurangabad)
23/B, Vishwakarma Co-operative Housing Society, N-8, Cidco, Chhatrapati Sambhaji Nagar, Maharashtra 431003
9309835108 / 9579617467

EMI Facility Now Available – 0% Interest!
Supremo Traders has officially tied up with Bajaj Finance to bring you easy No-Cost EMI options!

Benefits of Trading in Stock Market
Trading in the stock market comes with a number of benefits. There is a reason why everyone is shifting from traditional investing (Fixed deposits, Regular deposits, etc.) to Stock Market Trading. Stock Market Trading is the best solution of the Rising Inflation.

Provides Safety Against Inflation: Investing in the stock market provides safety against inflation.
Liquid Assets: Stock are considered liquid assets as they can be easily converted into cash.
Hassle-free Trading: Buying and Selling of Stocks has become very easy and hassle-free in this modern age.
Investment gains: Investors can gain the benefit of Investment gains by Trading in Stock Market.
Dividend benefits: Companies give dividends to their investors annually.
Lifelong Learning: Share market training is an ongoing learning process.

Forex Course Content
🧠 Module 1: Introduction to Forex Market
• What is the Forex Market?
• History and Evolution of Forex
• Difference between Forex and Stock Market
• Understanding Currency Pairs – Major, Minor, Exotic
• Base Currency vs Quote Currency
• Market Participants (Retail Traders, Banks, Institutions)

💹 Module 2: Basic Forex Concepts  
• What is a Pip, Pipette & Tick?
• What is Lot Size? (Micro, Mini, Standard)
• What is Leverage and Margin?
• Spread, Commission & Swap
• Bid Price vs Ask Price
• Order Types – Market, Limit, Stop

🏦 Module 3: Broker & Account Setup
• How to Choose the Right Forex Broker
• Introduction to VT Markets
• MT4 vs MT5 Platforms
• How to Open a Live/Demo Account
• KYC, Deposits, Withdrawals`;

    const defaultPdf: PdfContent = {
      id: randomUUID(),
      filename: "Supremo_Traders_Company_Portfolio.pdf",
      content: supremoContent,
      uploadedAt: new Date(),
    };
    
    // Add VT Markets comprehensive data
    const vtMarketsContent = `📊 VT Markets - Comprehensive Broker Information

## 1. Regulatory Structure & Company Details (Updated 2025)
• Founded: 2015, celebrating 10th anniversary in 2025, headquartered in Sydney, Australia
• 2025 Milestone: Record-breaking growth year with expanded global presence
• Currently regulated via:
  - Australia (ASIC): Primary regulation
  - South Africa (FSCA): VT Markets (Pty) Ltd, FSP No. 50865
  - Mauritius (FSC): VT Markets Limited registered
  - Now independent, holds only two main regulatory licenses (ASIC & FSCA)

## 2. Account Types & Specifications

### Standard STP Account (2025 Update)
• EUR/USD: 1.2 pips, GBP/USD: 1.8 pips, AUD/USD: 1.6 pips
• Commission: Zero commission (costs embedded in spread)
• Minimum deposit: $100
• Min trade size: 0.01 lot
• Maximum leverage: 500:1
• Currencies: AUD, USD, HKD, GBP, EUR, CAD

### Raw ECN Account (2025 Update)  
• Spread: 0.0 pips (zero-pip spreads available)
• Commission: $6 per standard lot per round turn
• Minimum deposit: $500 (increased from previous)
• Maximum leverage: Up to 500:1

### Cent Account
• Trades CFDs of Forex, Gold, Silver, Oil
• Deposit: $50
• Standard STP: spread ~1.1 pips, no commission
• ECN: 0.0 pips + $6 commission

### Swap-Free (Islamic) Account
• Available on STP or ECN
• No overnight swap interest
• Suitable for long-term or Shariah-compliant trading

### Account Restrictions
• Not Available To: Residents of U.S., Singapore, Russia, FATF-sanctioned jurisdictions

## 3. Fees, Deposits & Withdrawals

| Type | Details |
|------|---------|
| Minimum Deposit | $50 generally; $100 via bank transfer |
| Deposit Fees | None from broker; banks/payment providers may apply charges |
| Withdrawal Fees | First wire transfer per month: free; subsequent: $20 each |
| | Fasapay: 0.5%; Skrill: 1%; Neteller: 2% |
| Inactivity Fees | None |
| Forex/CFD Spreads | Standard STP: EUR/USD ~1.2 pips; Raw ECN: effective ~0.83 pips |

## 4. Tradable Instruments & Leverage

### Forex
• 40+ pairs (majors, minors, exotics)
• Spreads from ~1.2 pips
• Leverage up to 1:1000 (region-dependent)

### Indices
• 15+ global indices
• Spreads from 0.0 pips
• Up to 1:500 leverage

### Energetics (Oil/Gas)
• Spreads ~5 pips
• Leverage up to 1:500

### Precious Metals
• Gold, Silver, Copper
• Gold leverage up to 1:1000
• Spreads ~0.1 pips

### Soft Commodities
• Cocoa, Coffee, Cotton, etc.
• Spreads ~12 pips
• Leverage ~1:20

### ETFs
• 51+ ETFs available
• Leverage up to 1:33

### Share CFDs
• 800+ stocks globally
• Leverage up to 1:33 (non-earnings season)

### Bond CFDs
• Spreads ~0.1 pips
• Leverage up to 1:100

### Options
• Not available

## 5. Platform Features & Tools

### Trading Platforms (2025 Enhanced)
• MetaTrader 4 (MT4) with Trading Central tools
• MetaTrader 5 (MT5) with Trading Central tools
• WebTrader Plus powered by TradingView
• VT Markets App (relaunched 2025) - "Trading can be easy"
• TradingView integration
• Ultra-fast execution speeds

### Mobile App Features
• Watchlists
• Pivot point analyses
• Basic charts with ~30 indicators
• 10 timeframes
• Limited drawing tools
• Syncs across devices

### Additional Tools (2025 Features)
• Trading Central Pro Tools (for $500+ deposits)
• Alpha Generation indicators (for $1000+ deposits)
• Economic Calendar with news from 38 countries
• Market sentiment tools and actionable trading signals
• Real-time price alerts and performance analytics
• Smart signals newsletter
• Market news powered by FX Street
• Educational "Learn" feature in mobile app
• 50% welcome bonus up to $500
• Additional 20% bonus for $1000+ deposits (up to $10,000 credit)
• 7-day loss recovery for new accounts

## 6. Recent Updates & Community Feedback

### Leverage Changes (April 2024)
• US Shares CFD leverage adjusted from 33:1 to 20:1
• MT5 new positions near open/close limited to 5:1, reverting afterward
• MT4 unaffected

### MT5 Upgrade (April 2024)
• System upgrade on April 27, 2024 (00:30–06:00 GMT+3)
• Required version ≥4150
• Downtime affected trading, portal, deposits/withdrawals

### Trust & Withdrawal Experiences
• Mixed feedback: several users report smooth, fast crypto withdrawals
• Others express frustration over document requests or delayed profit withdrawals

## 7. VT Markets Account Opening Process
1. Visit VT Markets official website
2. Choose account type (Standard STP, Raw ECN, Cent, or Swap-Free)
3. Complete online application form
4. Submit required KYC documents
5. Make minimum deposit based on account type
6. Download trading platform (MT4/MT5 or mobile app)
7. Start trading with full broker support

## 8. Customer Support
• 24/7 multilingual support
• Live chat, email, and phone support
• Dedicated account managers for premium accounts
• Educational resources and webinars
• Technical analysis and market insights

This comprehensive information about VT Markets is provided to help traders make informed decisions about their broker selection and account types.`;

    const vtMarketsPdf: PdfContent = {
      id: randomUUID(),
      filename: "VT_Markets_Broker_Guide.pdf",
      content: vtMarketsContent,
      uploadedAt: new Date(),
    };
    
    this.pdfContent.set(defaultPdf.id, defaultPdf);
    this.pdfContent.set(vtMarketsPdf.id, vtMarketsPdf);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      timestamp: new Date(),
      isFiltered: insertMessage.isFiltered ?? false,
      filterReason: insertMessage.filterReason ?? null,
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getChatMessages(limit: number = 100): Promise<ChatMessage[]> {
    const messages = Array.from(this.chatMessages.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
    return messages;
  }

  async getChatMessagesBySession(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.sessionId === sessionId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(
      admin => admin.username === username
    );
  }

  async createAdmin(insertAdmin: InsertAdminUser): Promise<AdminUser> {
    const id = randomUUID();
    const admin: AdminUser = { ...insertAdmin, id };
    this.adminUsers.set(id, admin);
    return admin;
  }

  async createPdfContent(insertPdf: InsertPdfContent): Promise<PdfContent> {
    const id = randomUUID();
    const pdf: PdfContent = {
      ...insertPdf,
      id,
      uploadedAt: new Date(),
    };
    this.pdfContent.set(id, pdf);
    return pdf;
  }

  async getAllPdfContent(): Promise<PdfContent[]> {
    return Array.from(this.pdfContent.values());
  }

  async deletePdfContent(id: string): Promise<boolean> {
    return this.pdfContent.delete(id);
  }
}

export const storage = new MemStorage();
