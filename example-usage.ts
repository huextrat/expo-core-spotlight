import ExpoCoreSpotlight, { CoreSpotlightItem } from 'expo-core-spotlight';

// Example usage of the Core Spotlight module
export class CoreSpotlightExample {
  
  // Add a single item to Spotlight
  static async addItem() {
    const item: CoreSpotlightItem = {
      uniqueIdentifier: 'my-app-item-1',
      title: 'My App Document',
      contentDescription: 'This is a sample document from my app',
      keywords: ['document', 'sample', 'my-app'],
      url: 'myapp://document/1',
      domainIdentifier: 'com.myapp.documents',
      isEligibleForSearch: true,
      isEligibleForPrediction: true,
      userInfo: {
        documentId: '1',
        category: 'sample'
      }
    };

    try {
      await ExpoCoreSpotlight.indexItem(item);
      console.log('Item added to Spotlight successfully');
    } catch (error) {
      console.error('Failed to add item to Spotlight:', error);
    }
  }

  // Add multiple items to Spotlight
  static async addMultipleItems() {
    const items: CoreSpotlightItem[] = [
      {
        uniqueIdentifier: 'my-app-item-2',
        title: 'Another Document',
        contentDescription: 'Another sample document',
        keywords: ['document', 'another'],
        url: 'myapp://document/2',
        domainIdentifier: 'com.myapp.documents'
      },
      {
        uniqueIdentifier: 'my-app-item-3',
        title: 'Third Document',
        contentDescription: 'Third sample document',
        keywords: ['document', 'third'],
        url: 'myapp://document/3',
        domainIdentifier: 'com.myapp.documents'
      }
    ];

    try {
      await ExpoCoreSpotlight.indexItems(items);
      console.log('Multiple items added to Spotlight successfully');
    } catch (error) {
      console.error('Failed to add multiple items to Spotlight:', error);
    }
  }

  // Remove a single item from Spotlight
  static async removeItem() {
    try {
      await ExpoCoreSpotlight.removeItem('my-app-item-1');
      console.log('Item removed from Spotlight successfully');
    } catch (error) {
      console.error('Failed to remove item from Spotlight:', error);
    }
  }

  // Remove multiple items from Spotlight
  static async removeMultipleItems() {
    try {
      await ExpoCoreSpotlight.removeItems(['my-app-item-2', 'my-app-item-3']);
      console.log('Multiple items removed from Spotlight successfully');
    } catch (error) {
      console.error('Failed to remove multiple items from Spotlight:', error);
    }
  }

  // Remove all items from a specific domain
  static async removeAllItemsFromDomain() {
    try {
      await ExpoCoreSpotlight.removeAllItemsFromDomain('com.myapp.documents');
      console.log('All items from domain removed from Spotlight successfully');
    } catch (error) {
      console.error('Failed to remove all items from domain:', error);
    }
  }

  // Remove all items from Spotlight
  static async removeAllItems() {
    try {
      await ExpoCoreSpotlight.removeAllItems();
      console.log('All items removed from Spotlight successfully');
    } catch (error) {
      console.error('Failed to remove all items from Spotlight:', error);
    }
  }

  // Check if Core Spotlight is available
  static async checkAvailability() {
    try {
      const isAvailable = await ExpoCoreSpotlight.isAvailable();
      console.log('Core Spotlight available:', isAvailable);
      return isAvailable;
    } catch (error) {
      console.error('Failed to check Core Spotlight availability:', error);
      return false;
    }
  }
}

// Usage example
export async function runExample() {
  // Check if Core Spotlight is available
  const isAvailable = await CoreSpotlightExample.checkAvailability();
  
  if (!isAvailable) {
    console.log('Core Spotlight is not available on this device');
    return;
  }

  // Add some items
  await CoreSpotlightExample.addItem();
  await CoreSpotlightExample.addMultipleItems();
  
  // Wait a bit for indexing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Remove some items
  await CoreSpotlightExample.removeItem();
  
  // Clean up
  await CoreSpotlightExample.removeAllItems();
}
