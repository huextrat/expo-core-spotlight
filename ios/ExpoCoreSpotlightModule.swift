import ExpoModulesCore
import CoreSpotlight
import MobileCoreServices
import Foundation

public class ExpoCoreSpotlightModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoCoreSpotlight")
    
    // Check if Core Spotlight is available
    AsyncFunction("isAvailable") {
      return true
    }
    
    // Add or update a single item
    AsyncFunction("indexItem") { (item: [String: Any]) -> Void in
      guard let uniqueIdentifier = item["uniqueIdentifier"] as? String,
            let title = item["title"] as? String else {
        throw CoreSpotlightError.invalidItem("uniqueIdentifier and title are required")
      }
      
      let searchableItem = try self.createSearchableItem(from: item)
      CSSearchableIndex.default().indexSearchableItems([searchableItem]) { error in
        if let error = error {
          print("Error indexing item: \(error.localizedDescription)")
        }
      }
    }
    
    // Add or update multiple items
    AsyncFunction("indexItems") { (items: [[String: Any]]) -> Void in
      let searchableItems = try items.map { item in
        guard let uniqueIdentifier = item["uniqueIdentifier"] as? String,
              let title = item["title"] as? String else {
          throw CoreSpotlightError.invalidItem("uniqueIdentifier and title are required")
        }
        return try self.createSearchableItem(from: item)
      }
      
      CSSearchableIndex.default().indexSearchableItems(searchableItems) { error in
        if let error = error {
          print("Error indexing items: \(error.localizedDescription)")
        }
      }
    }
    
    // Remove a single item
    AsyncFunction("removeItem") { (uniqueIdentifier: String) -> Void in
      CSSearchableIndex.default().deleteSearchableItems(withIdentifiers: [uniqueIdentifier]) { error in
        if let error = error {
          print("Error removing item: \(error.localizedDescription)")
        }
      }
    }
    
    // Remove multiple items
    AsyncFunction("removeItems") { (uniqueIdentifiers: [String]) -> Void in
      CSSearchableIndex.default().deleteSearchableItems(withIdentifiers: uniqueIdentifiers) { error in
        if let error = error {
          print("Error removing items: \(error.localizedDescription)")
        }
      }
    }
    
    // Remove all items
    AsyncFunction("removeAllItems") {
      CSSearchableIndex.default().deleteAllSearchableItems { error in
        if let error = error {
          print("Error removing all items: \(error.localizedDescription)")
        }
      }
    }
    
    // Remove all items from a domain
    AsyncFunction("removeAllItemsFromDomain") { (domainIdentifier: String) -> Void in
      CSSearchableIndex.default().deleteSearchableItems(withDomainIdentifiers: [domainIdentifier]) { error in
        if let error = error {
          print("Error removing items from domain: \(error.localizedDescription)")
        }
      }
    }
  }
  
  // Helper function to create CSSearchableItem from dictionary
  private func createSearchableItem(from item: [String: Any]) throws -> CSSearchableItem {
    guard let uniqueIdentifier = item["uniqueIdentifier"] as? String,
          let title = item["title"] as? String else {
      throw CoreSpotlightError.invalidItem("uniqueIdentifier and title are required")
    }
    
    let attributeSet = CSSearchableItemAttributeSet(itemContentType: kUTTypeText as String)
    
    // Set basic properties
    attributeSet.title = title
    attributeSet.contentDescription = item["contentDescription"] as? String
    
    // Set keywords
    if let keywords = item["keywords"] as? [String] {
      attributeSet.keywords = keywords
    }
    
    // Set URL
    if let urlString = item["url"] as? String,
       let url = URL(string: urlString) {
      attributeSet.url = url
    }
    
    // Set domain identifier
    if let domainIdentifier = item["domainIdentifier"] as? String {
      attributeSet.domainIdentifier = domainIdentifier
    }
    
    // Set eligibility flags
    if let isEligibleForSearch = item["isEligibleForSearch"] as? Bool {
      attributeSet.isEligibleForSearch = isEligibleForSearch
    }
    
    if let isEligibleForPrediction = item["isEligibleForPrediction"] as? Bool {
      attributeSet.isEligibleForPrediction = isEligibleForPrediction
    }
    
    // Set thumbnail data
    if let thumbnailDataString = item["thumbnailData"] as? String,
       let thumbnailData = Data(base64Encoded: thumbnailDataString) {
      attributeSet.thumbnailData = thumbnailData
    }
    
    // Set thumbnail URL
    if let thumbnailURLString = item["thumbnailURL"] as? String,
       let thumbnailURL = URL(string: thumbnailURLString) {
      attributeSet.thumbnailURL = thumbnailURL
    }
    
    // Set dates
    if let startDate = item["startDate"] as? Double {
      attributeSet.startDate = Date(timeIntervalSince1970: startDate / 1000)
    }
    
    if let endDate = item["endDate"] as? Double {
      attributeSet.endDate = Date(timeIntervalSince1970: endDate / 1000)
    }
    
    if let lastUsedDate = item["lastUsedDate"] as? Double {
      attributeSet.lastUsedDate = Date(timeIntervalSince1970: lastUsedDate / 1000)
    }
    
    if let creationDate = item["creationDate"] as? Double {
      attributeSet.creationDate = Date(timeIntervalSince1970: creationDate / 1000)
    }
    
    if let modificationDate = item["modificationDate"] as? Double {
      attributeSet.modificationDate = Date(timeIntervalSince1970: modificationDate / 1000)
    }
    
    if let expirationDate = item["expirationDate"] as? Double {
      attributeSet.expirationDate = Date(timeIntervalSince1970: expirationDate / 1000)
    }
    
    // Set numeric properties
    if let rating = item["rating"] as? Double {
      attributeSet.rating = NSNumber(value: rating)
    }
    
    if let viewCount = item["viewCount"] as? Int {
      attributeSet.viewCount = NSNumber(value: viewCount)
    }
    
    if let useCount = item["useCount"] as? Int {
      attributeSet.useCount = NSNumber(value: useCount)
    }
    
    if let contentRating = item["contentRating"] as? Double {
      attributeSet.contentRating = NSNumber(value: contentRating)
    }
    
    // Set location properties
    if let latitude = item["latitude"] as? Double {
      attributeSet.latitude = NSNumber(value: latitude)
    }
    
    if let longitude = item["longitude"] as? Double {
      attributeSet.longitude = NSNumber(value: longitude)
    }
    
    if let altitude = item["altitude"] as? Double {
      attributeSet.altitude = NSNumber(value: altitude)
    }
    
    if let speed = item["speed"] as? Double {
      attributeSet.speed = NSNumber(value: speed)
    }
    
    if let course = item["course"] as? Double {
      attributeSet.course = NSNumber(value: course)
    }
    
    // Set string properties
    attributeSet.countryCode = item["countryCode"] as? String
    attributeSet.languageCode = item["languageCode"] as? String
    attributeSet.phoneNumber = item["phoneNumber"] as? String
    attributeSet.emailAddress = item["emailAddress"] as? String
    attributeSet.organizationName = item["organizationName"] as? String
    attributeSet.departmentName = item["departmentName"] as? String
    attributeSet.jobTitle = item["jobTitle"] as? String
    attributeSet.givenName = item["givenName"] as? String
    attributeSet.familyName = item["familyName"] as? String
    attributeSet.middleName = item["middleName"] as? String
    attributeSet.nickname = item["nickname"] as? String
    attributeSet.namePrefix = item["namePrefix"] as? String
    attributeSet.nameSuffix = item["nameSuffix"] as? String
    attributeSet.genre = item["genre"] as? String
    attributeSet.type = item["type"] as? String
    attributeSet.platform = item["platform"] as? String
    attributeSet.version = item["version"] as? String
    attributeSet.author = item["author"] as? String
    attributeSet.editor = item["editor"] as? String
    attributeSet.director = item["director"] as? String
    attributeSet.producer = item["producer"] as? String
    attributeSet.composer = item["composer"] as? String
    attributeSet.artist = item["artist"] as? String
    attributeSet.album = item["album"] as? String
    
    // Set array properties
    if let instantMessageAddresses = item["instantMessageAddresses"] as? [String] {
      attributeSet.instantMessageAddresses = instantMessageAddresses
    }
    
    if let relatedUniqueIdentifiers = item["relatedUniqueIdentifiers"] as? [String] {
      attributeSet.relatedUniqueIdentifiers = relatedUniqueIdentifiers
    }
    
    // Set user info
    if let userInfo = item["userInfo"] as? [String: Any] {
      attributeSet.userInfo = userInfo
    }
    
    return CSSearchableItem(uniqueIdentifier: uniqueIdentifier, domainIdentifier: item["domainIdentifier"] as? String, attributeSet: attributeSet)
  }
}

// Custom error types
enum CoreSpotlightError: Error {
  case invalidItem(String)
  case indexingFailed(String)
  case removalFailed(String)
}