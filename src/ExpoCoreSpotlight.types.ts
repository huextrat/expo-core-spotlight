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
  /** The domain identifier for grouping items */
  domainIdentifier?: string;
  /** The thumbnail data for the item (base64 encoded) */
  thumbnailData?: string;
  /** The thumbnail URL for the item */
  thumbnailURL?: string;
  /** The start date for the item */
  startDate?: number;
  /** The end date for the item */
  endDate?: number;
  /** The date after which the searchable item should no longer exist. */
  expirationDate?: number;
  /** The rating for the item (0.0 to 5.0) */
  rating?: number;
  /** The last used date for the item */
  lastUsedDate?: number;
  /** The latitude for location-based search */
  latitude?: number;
  /** The longitude for location-based search */
  longitude?: number;
  /** The altitude for location-based search */
  altitude?: number;
  /** The speed for location-based search */
  speed?: number;
  /** The instant message addresses for the item */
  instantMessageAddresses?: string[];
  /** The content rating for the item */
  contentRating?: number;
  /** The genre for the item */
  genre?: string;
  /** The version for the item */
  version?: string;
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
