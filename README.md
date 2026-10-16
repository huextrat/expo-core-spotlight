<div align="center">

# 🔍 Expo Core Spotlight

**Make your app content discoverable through iOS Spotlight search**

<p align="center">
  <a href="https://github.com/huextrat/expo-core-spotlight/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/expo-core-spotlight">
    <img alt="npm version" src="https://img.shields.io/npm/v/expo-core-spotlight.svg?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/expo-core-spotlight">
    <img alt="npm downloads" src="https://img.shields.io/npm/dm/expo-core-spotlight.svg?style=for-the-badge" />
  </a>
</p>

*An Expo module that provides access to iOS Core Spotlight functionality, allowing you to add, update, and remove items from the iOS Spotlight search index. When users tap on search results, your app will be opened with the corresponding deeplink.*

</div>

---

## ✨ Features

- Add / Update / Remove items to iOS Spotlight search
- Rich metadata support (title, description, keywords, URLs, dates, location, etc.)
- Automatic deeplink handling when users tap search results

---

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install expo-core-spotlight

# Using yarn
yarn add expo-core-spotlight

# Using pnpm
pnpm add expo-core-spotlight

# Using Expo CLI
npx expo install expo-core-spotlight
```

## 🧩 Compatibility

| expo-core-spotlight | Expo SDK | Minimum iOS | Config plugin |
|---|---|---|---|
| **3.x** | 58+ | 16.4 | None |
| **2.x** | 56 – 57 | 16.4 | Required |
| **1.2.x** | 55 | 15.1 | Required |
| **1.0.x – 1.1.x** | 54 | 15.1 | Required |

On Expo SDK 57 or older, install the matching major version, for example `npm install expo-core-spotlight@^2`, and follow the README of that version.

## ⚙️ Configuration

No config plugin is needed: Spotlight search result taps are handled natively by the module, through an Expo AppDelegate subscriber. This works with the scene-based life cycle used by Expo SDK 58+.

### ⬆️ Migrating from 2.x

1. Upgrade your app to Expo SDK 58.
2. Remove `'expo-core-spotlight'` from the `plugins` array of your app config: 3.x no longer ships a config plugin. If you keep it, Expo CLI fails with `No "app.plugin.{js,cjs,mjs,ts,cts,mts}" file was found in "expo-core-spotlight"`.
3. Run `npx expo prebuild --clean` so the native project is regenerated without the code 2.x injected into your `AppDelegate`.

### 🔗 Deeplink Configuration

> **⚠️ Important:** The library uses the `uniqueIdentifier` as the deeplink URL.

You must include your app's URL scheme as a prefix in the `uniqueIdentifier` when creating Spotlight items.

<div align="center">

| ✅ **Correct** | ❌ **Incorrect** |
|---|---|
| `uniqueIdentifier: 'myapp://document/1'` | `uniqueIdentifier: 'document-1'` |
| `uniqueIdentifier: 'myapp://user/123'` | `uniqueIdentifier: 'user-123'` |

</div>

> **ℹ️ Note:**  
> Currently, the library uses the `uniqueIdentifier` property as the deeplink URL for Spotlight items.  
> **In the future, this should be changed so that the `url` property is used as the deeplink instead of `uniqueIdentifier`.**  
> This will better align with iOS Core Spotlight best practices and make the API more intuitive.  
> For now, always include your app's URL scheme as a prefix in the `uniqueIdentifier`.

> **ℹ️ Cold start:** When a search result launches your app, the deeplink is delivered through `expo-linking` (`Linking.useLinkingURL()` / `Linking.getLinkingURL()`), which Expo Router uses. React Native's `Linking.getInitialURL()` does not receive it.


## 📖 Usage

### 🎯 Basic Example

```typescript
import ExpoCoreSpotlight, { CoreSpotlightItem } from 'expo-core-spotlight';

// Check if Core Spotlight is available
const isAvailable = await ExpoCoreSpotlight.isAvailable();
console.log('Core Spotlight available:', isAvailable); // true on iOS, false on Android

// Create a Spotlight item with deeplink in uniqueIdentifier
const item: CoreSpotlightItem = {
  uniqueIdentifier: 'myapp://document/1', // Include your app scheme as prefix
  title: 'My Important Document',
  contentDescription: 'This is a sample document from my app',
  keywords: ['document', 'important', 'my-app'],
  url: 'myapp://document/1', // Optional: can be the same as uniqueIdentifier
  domainIdentifier: 'com.myapp.documents',
};

// Add the item to Spotlight
await ExpoCoreSpotlight.indexItem(item);
```

### 🚀 Advanced Example

```typescript
import ExpoCoreSpotlight, { CoreSpotlightItem } from 'expo-core-spotlight';

// Add multiple items at once
const items: CoreSpotlightItem[] = [
  {
    uniqueIdentifier: 'myapp://document/1', // Deeplink as uniqueIdentifier
    title: 'Document 1',
    contentDescription: 'First document',
    keywords: ['document', 'first'],
    url: 'myapp://document/1',
    domainIdentifier: 'com.myapp.documents',
    rating: 4.5
  },
  {
    uniqueIdentifier: 'myapp://document/2', // Deeplink as uniqueIdentifier
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
await ExpoCoreSpotlight.removeItem('myapp://document/1');

// Remove multiple items
await ExpoCoreSpotlight.removeItems(['myapp://document/2']);

// Remove all items from a domain
await ExpoCoreSpotlight.removeAllItemsFromDomain('com.myapp.documents');

// Remove all items
await ExpoCoreSpotlight.removeAllItems();
```

## 📚 API Reference

### 🔧 Methods

<table>
<tr>
<td width="50%">

#### `isAvailable(): Promise<boolean>`
Check if Core Spotlight is available on the device.
- **Returns**: `true` on iOS, `false` on Android

#### `indexItem(item: CoreSpotlightItem): Promise<void>`
Add or update a single item in the Spotlight index.

#### `indexItems(items: CoreSpotlightItem[]): Promise<void>`
Add or update multiple items in the Spotlight index.

</td>
<td width="50%">

#### `removeItem(uniqueIdentifier: string): Promise<void>`
Remove a single item from the Spotlight index by its unique identifier.

#### `removeItems(uniqueIdentifiers: string[]): Promise<void>`
Remove multiple items from the Spotlight index by their unique identifiers.

#### `removeAllItems(): Promise<void>`
Remove all items from the Spotlight index.

#### `removeAllItemsFromDomain(domainIdentifier: string): Promise<void>`
Remove all items from a specific domain from the Spotlight index.

</td>
</tr>
</table>

### ⚠️ Errors

On iOS, every method resolves once Core Spotlight has finished the operation, and rejects if it fails. Use `error.code` to tell the failures apart:

| Code | When |
|---|---|
| `ERR_INVALID_ITEM` | An item has no `uniqueIdentifier` or `title` |
| `ERR_INDEXING_FAILED` | Core Spotlight could not index the items |
| `ERR_REMOVAL_FAILED` | Core Spotlight could not remove the items |

```typescript
try {
  await ExpoCoreSpotlight.indexItem(item);
} catch (error) {
  if ((error as { code?: string }).code === 'ERR_INDEXING_FAILED') {
    // Retry later, or report the error
  }
}
```

---

## 📱 Platform Support

<table>
<tr>
<td width="33%" align="center">

**🍎 iOS**
- Full Core Spotlight functionality
- Automatic deeplink handling
- Rich metadata support

</td>
<td width="33%" align="center">

**🤖 Android**
- Empty implementations
- Returns successfully but does nothing
- No-op for compatibility

</td>
<td width="33%" align="center">

**🌐 Web**
- Not supported
- Will throw errors if used

</td>
</tr>
</table>

---

## 🛠️ Troubleshooting

### 🚨 Common Issues

<details>
<summary><strong>🔗 Deeplinks not working</strong></summary>

**Problem**: Tapping search results doesn't open your app.

**Solution**: Make sure your `uniqueIdentifier` includes your app's URL scheme:
```typescript
// ✅ Correct
uniqueIdentifier: 'myapp://document/1'

// ❌ Incorrect
uniqueIdentifier: 'document-1'
```

</details>

<details>
<summary><strong>⚙️ Taps open the app but not the deeplink</strong></summary>

**Problem**: Tapping a search result opens your app on its current screen.

**Solutions**:
1. If you upgraded from 2.x, remove the plugin from your app config and run `npx expo prebuild --clean`
2. If you maintain your native project yourself, make sure `AppDelegate` subclasses `ExpoAppDelegate` and `SceneDelegate` subclasses `ExpoAppSceneDelegate`, as in the Expo SDK 58 template: the module relies on them to receive Spotlight user activities

</details>

<details>
<summary><strong>🔍 Items not appearing in Spotlight</strong></summary>

**Problem**: Items don't show up in search results.

**Solutions**:
- ⏰ Wait a few minutes for iOS to index the items
- 🔐 Check that your app has the necessary permissions
- ✅ Verify that items have valid `title` and `uniqueIdentifier` properties
- 🔄 Try removing and re-adding items

</details>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🔄 **Open** a Pull Request

### 🐛 Found a Bug?

Please open an issue with:
- 📱 Device information
- 📋 Steps to reproduce
- 📸 Screenshots (if applicable)
- 📝 Expected vs actual behavior

### 💡 Have an Idea?

We'd love to hear your suggestions! Open an issue with the `enhancement` label.

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

</div>
