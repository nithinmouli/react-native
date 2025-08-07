A React Native beauty and cosmetics e-commerce application built with Expo Router, featuring product browsing, authentication, and user profiles.

## Features

- **Authentication System**: Login/Register with persistent state using AsyncStorage
- **Product Catalog**: Browse beauty products from DummyJSON API
- **Product Details**: Detailed product views with ratings, reviews, and specifications
- **User Profile**: Complete profile management with settings and logout
- **Tab Navigation**: Home, Offers, Wishlist, and Profile sections
- **State Management**: Zustand for global state management

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI installed globally
- iOS Simulator (for iOS development) or Android Studio/Emulator (for Android)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npx expo start
   ```

3. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

### Project Structure

```
app/
├── (auth)/              # Authentication screens
│   ├── _layout.jsx      # Auth stack navigation
│   ├── login.jsx        # Login screen
│   └── register.jsx     # Registration screen
├── (tabs)/              # Main app tabs
│   ├── _layout.jsx      # Tab navigation
│   ├── home.jsx         # Product catalog
│   ├── offers.jsx       # Offers page (placeholder)
│   ├── profile.jsx      # User profile
│   └── whistlist.jsx    # Wishlist (placeholder)
├── product/
│   └── [id].jsx         # Dynamic product detail page
├── store/
│   └── authStore.js     # Zustand authentication store
├── _layout.jsx          # Root layout with auth routing
├── index.jsx            # GetStarted landing page
└── GetStartedPage.jsx   # GetStarted component
```

### Key Dependencies

- **expo**: ~52.0.11
- **expo-router**: File-based routing
- **@expo/vector-icons**: Icon library (FontAwesome, MaterialIcons, Ionicons, Feather)
- **zustand**: State management
- **@react-native-async-storage/async-storage**: Persistent storage

### API Integration

The app uses the [DummyJSON API](https://dummyjson.com) for product data:
- Products: `https://dummyjson.com/products?limit=20`

## Usage

### Authentication

1. **Default Credentials** (for testing):
   - Email: `test@gmail.com`
   - Password: `123`

2. **New User Registration**:
   - Navigate to Register page
   - Fill in required fields
   - Account created with demo credentials

### Navigation Flow

1. **GetStarted Page** → Login/Register
2. **Authentication** → Main App (Tabs)
3. **Home Tab** → Product browsing and details
4. **Profile Tab** → User settings and logout

### Product Browsing

- View product grid on Home tab
- Tap any product to view detailed information
- Browse reviews, ratings, and specifications
- "Add to Bag" functionality (UI only)

## Development Notes

### Code Organization

- **Code**: Simplified variable names and clean structure
- **Responsive design**: Works on various screen sizes
- **Error handling**: Graceful API error management

### State Management

- **Authentication**: Persistent login state with AsyncStorage
- **Global state**: Zustand store for user data
- **Local state**: Component-level state for UI interactions

## Assumptions

1. **Demo Authentication**: Uses hardcoded credentials (`test@gmail.com` / `123`) for demonstration


## Known Issues

1. **Offers & Wishlist Pages**: Currently placeholder implementations showing "to be implemented" messagen
2. **Search Functionality**: Search bar UI implemented but filtering logic not yet active
3. **Authentication**: Uses demo credentials only - not suitable for production use
4. **Product Reviews**: Limited to 2 reviews per product.




---#
