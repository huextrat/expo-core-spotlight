import { NativeModule, requireNativeModule } from 'expo';

export interface CoreSpotlightItem {
  /** Unique identifier for the item */
  uniqueIdentifier: string;
  /** The title displayed in search results */
  title: string;
  /** The content description for the item */
  contentDescription?: string;
  /** Keywords for search indexing */
  keywords?: string[];
  /** The URL to open when the item is selected */
  url?: string;
  /** Additional user info to pass when the item is selected */
  userInfo?: Record<string, any>;
  /** The domain identifier for grouping items */
  domainIdentifier?: string;
  /** Whether the item can be deleted from search results */
  isEligibleForSearch?: boolean;
  /** Whether the item can be suggested in search */
  isEligibleForPrediction?: boolean;
  /** The thumbnail data for the item (base64 encoded) */
  thumbnailData?: string;
  /** The thumbnail URL for the item */
  thumbnailURL?: string;
  /** The start date for the item */
  startDate?: Date;
  /** The end date for the item */
  endDate?: Date;
  /** The rating for the item (0.0 to 5.0) */
  rating?: number;
  /** The number of times the item has been viewed */
  viewCount?: number;
  /** The number of times the item has been used */
  useCount?: number;
  /** The last used date for the item */
  lastUsedDate?: Date;
  /** The creation date for the item */
  creationDate?: Date;
  /** The modification date for the item */
  modificationDate?: Date;
  /** The expiration date for the item */
  expirationDate?: Date;
  /** The latitude for location-based search */
  latitude?: number;
  /** The longitude for location-based search */
  longitude?: number;
  /** The altitude for location-based search */
  altitude?: number;
  /** The speed for location-based search */
  speed?: number;
  /** The course for location-based search */
  course?: number;
  /** The country code for the item */
  countryCode?: string;
  /** The language code for the item */
  languageCode?: string;
  /** The phone number for the item */
  phoneNumber?: string;
  /** The email address for the item */
  emailAddress?: string;
  /** The organization name for the item */
  organizationName?: string;
  /** The department name for the item */
  departmentName?: string;
  /** The job title for the item */
  jobTitle?: string;
  /** The given name for the item */
  givenName?: string;
  /** The family name for the item */
  familyName?: string;
  /** The middle name for the item */
  middleName?: string;
  /** The nickname for the item */
  nickname?: string;
  /** The name prefix for the item */
  namePrefix?: string;
  /** The name suffix for the item */
  nameSuffix?: string;
  /** The instant message addresses for the item */
  instantMessageAddresses?: string[];
  /** The related unique identifiers for the item */
  relatedUniqueIdentifiers?: string[];
  /** The content rating for the item */
  contentRating?: number;
  /** The genre for the item */
  genre?: string;
  /** The type for the item */
  type?: string;
  /** The platform for the item */
  platform?: string;
  /** The version for the item */
  version?: string;
  /** The author for the item */
  author?: string;
  /** The editor for the item */
  editor?: string;
  /** The director for the item */
  director?: string;
  /** The producer for the item */
  producer?: string;
  /** The composer for the item */
  composer?: string;
  /** The artist for the item */
  artist?: string;
  /** The album for the item */
  album?: string;
}

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

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoCoreSpotlightModule>('ExpoCoreSpotlight');