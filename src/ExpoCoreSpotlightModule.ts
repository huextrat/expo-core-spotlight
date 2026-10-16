import { NativeModule, requireNativeModule } from 'expo';

import { type CoreSpotlightItem } from './ExpoCoreSpotlight.types';

declare class ExpoCoreSpotlightModule extends NativeModule {
  /**
   * Add or update an item in the Spotlight index.
   * Rejects with `ERR_INVALID_ITEM` or `ERR_INDEXING_FAILED` on iOS.
   */
  indexItem(item: CoreSpotlightItem): Promise<void>;

  /**
   * Add or update multiple items in the Spotlight index.
   * Rejects with `ERR_INVALID_ITEM` or `ERR_INDEXING_FAILED` on iOS.
   */
  indexItems(items: CoreSpotlightItem[]): Promise<void>;

  /**
   * Remove an item from the Spotlight index by unique identifier.
   * Rejects with `ERR_REMOVAL_FAILED` on iOS.
   */
  removeItem(uniqueIdentifier: string): Promise<void>;

  /**
   * Remove multiple items from the Spotlight index by unique identifiers.
   * Rejects with `ERR_REMOVAL_FAILED` on iOS.
   */
  removeItems(uniqueIdentifiers: string[]): Promise<void>;

  /**
   * Remove all items from the Spotlight index.
   * Rejects with `ERR_REMOVAL_FAILED` on iOS.
   */
  removeAllItems(): Promise<void>;

  /**
   * Remove all items from a specific domain from the Spotlight index.
   * Rejects with `ERR_REMOVAL_FAILED` on iOS.
   */
  removeAllItemsFromDomain(domainIdentifier: string): Promise<void>;

  /** Check if Core Spotlight is available on the device */
  isAvailable(): Promise<boolean>;
}

export default requireNativeModule<ExpoCoreSpotlightModule>('ExpoCoreSpotlight');
