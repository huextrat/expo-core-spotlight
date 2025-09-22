# Expo Core Spotlight

An Expo module that provides access to iOS Core Spotlight functionality, allowing you to add, update, and remove items from the iOS Spotlight search index.

## Features

- ✅ Add items to iOS Spotlight search
- ✅ Update existing items in Spotlight
- ✅ Remove items from Spotlight
- ✅ Remove all items or items by domain
- ✅ Rich metadata support (title, description, keywords, URLs, dates, location, etc.)
- ✅ iOS-only (Android returns empty implementations)
- ✅ TypeScript support

## Installation

### 1. Install the package

```bash
npm install expo-core-spotlight
# or
yarn add expo-core-spotlight
```

### 2. Configure the plugin

Add the plugin to your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": [
      "expo-core-spotlight"
    ]
  }
}
```

### 3. Rebuild your app

After adding the plugin, you need to rebuild your app:

```bash
npx expo run:ios
```

## Usage

### Basic Example

```typescript
import ExpoCoreSpotlight, { CoreSpotlightItem } from 'expo-core-spotlight';

// Check if Core Spotlight is available
const isAvailable = await ExpoCoreSpotlight.isAvailable();
console.log('Core Spotlight available:', isAvailable); // true on iOS, false on Android

// Create a Spotlight item
const item: CoreSpotlightItem = {
  uniqueIdentifier: 'my-app-document-1',
  title: 'My Important Document',
  contentDescription: 'This is a sample document from my app',
  keywords: ['document', 'important', 'my-app'],
  url: 'myapp://document/1',
  domainIdentifier: 'com.myapp.documents',
  isEligibleForSearch: true,
  isEligibleForPrediction: true,
  userInfo: {
    documentId: '1',
    category: 'important'
  }
};

// Add the item to Spotlight
await ExpoCoreSpotlight.indexItem(item);
```

### Advanced Example

```typescript
import ExpoCoreSpotlight, { CoreSpotlightItem } from 'expo-core-spotlight';

// Add multiple items at once
const items: CoreSpotlightItem[] = [
  {
    uniqueIdentifier: 'document-1',
    title: 'Document 1',
    contentDescription: 'First document',
    keywords: ['document', 'first'],
    url: 'myapp://document/1',
    domainIdentifier: 'com.myapp.documents',
    creationDate: new Date(),
    rating: 4.5
  },
  {
    uniqueIdentifier: 'document-2',
    title: 'Document 2',
    contentDescription: 'Second document',
    keywords: ['document', 'second'],
    url: 'myapp://document/2',
    domainIdentifier: 'com.myapp.documents',
    creationDate: new Date(),
    rating: 3.8
  }
];

await ExpoCoreSpotlight.indexItems(items);

// Remove a specific item
await ExpoCoreSpotlight.removeItem('document-1');

// Remove multiple items
await ExpoCoreSpotlight.removeItems(['document-2']);

// Remove all items from a domain
await ExpoCoreSpotlight.removeAllItemsFromDomain('com.myapp.documents');

// Remove all items
await ExpoCoreSpotlight.removeAllItems();
```

## API Reference

### Methods

#### `isAvailable(): Promise<boolean>`
Check if Core Spotlight is available on the device.
- **Returns**: `true` on iOS, `false` on Android

#### `indexItem(item: CoreSpotlightItem): Promise<void>`
Add or update a single item in the Spotlight index.

#### `indexItems(items: CoreSpotlightItem[]): Promise<void>`
Add or update multiple items in the Spotlight index.

#### `removeItem(uniqueIdentifier: string): Promise<void>`
Remove a single item from the Spotlight index by its unique identifier.

#### `removeItems(uniqueIdentifiers: string[]): Promise<void>`
Remove multiple items from the Spotlight index by their unique identifiers.

#### `removeAllItems(): Promise<void>`
Remove all items from the Spotlight index.

#### `removeAllItemsFromDomain(domainIdentifier: string): Promise<void>`
Remove all items from a specific domain from the Spotlight index.

### CoreSpotlightItem Interface

```typescript
interface CoreSpotlightItem {
  // Required
  uniqueIdentifier: string;
  title: string;
  
  // Optional basic properties
  contentDescription?: string;
  keywords?: string[];
  url?: string;
  userInfo?: Record<string, any>;
  domainIdentifier?: string;
  isEligibleForSearch?: boolean;
  isEligibleForPrediction?: boolean;
  
  // Media
  thumbnailData?: string; // base64 encoded
  thumbnailURL?: string;
  
  // Dates
  startDate?: Date;
  endDate?: Date;
  lastUsedDate?: Date;
  creationDate?: Date;
  modificationDate?: Date;
  expirationDate?: Date;
  
  // Numeric properties
  rating?: number; // 0.0 to 5.0
  viewCount?: number;
  useCount?: number;
  contentRating?: number;
  
  // Location
  latitude?: number;
  longitude?: number;
  altitude?: number;
  speed?: number;
  course?: number;
  
  // Contact information
  phoneNumber?: string;
  emailAddress?: string;
  organizationName?: string;
  departmentName?: string;
  jobTitle?: string;
  
  // Personal information
  givenName?: string;
  familyName?: string;
  middleName?: string;
  nickname?: string;
  namePrefix?: string;
  nameSuffix?: string;
  
  // Arrays
  instantMessageAddresses?: string[];
  relatedUniqueIdentifiers?: string[];
  
  // Content metadata
  genre?: string;
  type?: string;
  platform?: string;
  version?: string;
  author?: string;
  editor?: string;
  director?: string;
  producer?: string;
  composer?: string;
  artist?: string;
  album?: string;
  
  // Localization
  countryCode?: string;
  languageCode?: string;
}
```

## Platform Support

- **iOS**: Full Core Spotlight functionality
- **Android**: Empty implementations (returns successfully but does nothing)
- **Web**: Not supported

## Requirements

- iOS 9.0+
- Expo SDK 49+
- React Native 0.72+

## Troubleshooting

### Items not appearing in Spotlight search

1. Make sure you've rebuilt your app after adding the plugin
2. Check that `isEligibleForSearch` is set to `true` (default)
3. Ensure the `uniqueIdentifier` is unique
4. Wait a few minutes for Spotlight to index the items
5. Try searching in Settings > Siri & Search > Search in Apps

### Build errors

1. Make sure you've added the plugin to your `app.json`
2. Run `npx expo run:ios` to rebuild with the plugin
3. Check that your iOS deployment target is 9.0 or higher

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
