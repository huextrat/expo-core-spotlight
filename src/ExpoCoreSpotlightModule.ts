import { NativeModule, requireNativeModule } from 'expo';

import { type CoreSpotlightItem } from './ExpoCoreSpotlight.types';

declare class ExpoCoreSpotlightModule extends NativeModule {
  /** Add or update an item in the Spotlight index */
  indexItem(item: CoreSpotlightItem): Promise<void>;

  /** Add or update multiple items in the Spotlight index */
  indexItems(items: CoreSpotlightItem[]): Promise<void>;

  /** Remove an item from the Spotlight index by unique identifier */
  removeItem(uniqueIdentifier: string): Promise<void>;

  /** Remove multiple items from the Spotlight index by unique identifiers */
  removeItems(uniqueIdentifiers: string[]): Promise<void>;

  /** Remove all items from the Spotlight index */
  removeAllItems(): Promise<void>;

  /** Remove all items from a specific domain from the Spotlight index */
  removeAllItemsFromDomain(domainIdentifier: string): Promise<void>;

  /** Check if Core Spotlight is available on the device */
  isAvailable(): Promise<boolean>;
}

export default requireNativeModule<ExpoCoreSpotlightModule>('ExpoCoreSpotlight');
