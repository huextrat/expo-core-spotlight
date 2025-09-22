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

```bash
npx expo install expo-core-spotlight
# or
npm install expo-core-spotlight
# or
yarn add expo-core-spotlight
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
    rating: 4.5
  },
  {
    uniqueIdentifier: 'document-2',
    title: 'Document 2',
    contentDescription: 'Second document',
    keywords: ['document', 'second'],
    url: 'myapp://document/2',
    domainIdentifier: 'com.myapp.documents',
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

## Platform Support

- **iOS**: Full Core Spotlight functionality
- **Android**: Empty implementations (returns successfully but does nothing)
- **Web**: Not supported

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
