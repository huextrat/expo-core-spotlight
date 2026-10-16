import CoreSpotlight
import ExpoModulesCore
import Foundation
import UniformTypeIdentifiers

public class ExpoCoreSpotlightModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoCoreSpotlight")

        // Check if Core Spotlight is available
        AsyncFunction("isAvailable") {
            return true
        }

        // Add or update a single item
        AsyncFunction("indexItem") { (item: [String: Any]) async throws -> Void in
            let searchableItem = try Self.createSearchableItem(from: item)
            try await Self.index([searchableItem])
        }

        // Add or update multiple items
        AsyncFunction("indexItems") { (items: [[String: Any]]) async throws -> Void in
            let searchableItems = try items.map { try Self.createSearchableItem(from: $0) }
            try await Self.index(searchableItems)
        }

        // Remove a single item
        AsyncFunction("removeItem") { (uniqueIdentifier: String) async throws -> Void in
            try await Self.remove {
                try await $0.deleteSearchableItems(withIdentifiers: [uniqueIdentifier])
            }
        }

        // Remove multiple items
        AsyncFunction("removeItems") { (uniqueIdentifiers: [String]) async throws -> Void in
            try await Self.remove {
                try await $0.deleteSearchableItems(withIdentifiers: uniqueIdentifiers)
            }
        }

        // Remove all items
        AsyncFunction("removeAllItems") { () async throws -> Void in
            try await Self.remove { try await $0.deleteAllSearchableItems() }
        }

        // Remove all items from a domain
        AsyncFunction("removeAllItemsFromDomain") { (domainIdentifier: String) async throws -> Void in
            try await Self.remove {
                try await $0.deleteSearchableItems(withDomainIdentifiers: [domainIdentifier])
            }
        }
    }

    // Resolves once Core Spotlight has indexed the items, rejects if it fails
    private static func index(_ items: [CSSearchableItem]) async throws {
        do {
            try await CSSearchableIndex.default().indexSearchableItems(items)
        } catch {
            throw IndexingFailedException().causedBy(error)
        }
    }

    // Resolves once Core Spotlight has removed the items, rejects if it fails
    private static func remove(_ removal: (CSSearchableIndex) async throws -> Void) async throws {
        do {
            try await removal(CSSearchableIndex.default())
        } catch {
            throw RemovalFailedException().causedBy(error)
        }
    }

    // Helper function to create CSSearchableItem from dictionary
    private static func createSearchableItem(from item: [String: Any]) throws -> CSSearchableItem {
        guard let uniqueIdentifier = item["uniqueIdentifier"] as? String,
            let title = item["title"] as? String
        else {
            throw InvalidItemException()
        }

        let attributeSet = CSSearchableItemAttributeSet(contentType: UTType.text)

        // Set basic properties
        attributeSet.title = title
        attributeSet.contentDescription = item["contentDescription"] as? String

        // Set keywords
        if let keywords = item["keywords"] as? [String] {
            attributeSet.keywords = keywords
        }

        // Set URL
        if let urlString = item["url"] as? String,
            let url = URL(string: urlString)
        {
            attributeSet.url = url
        }

        // Set domain identifier
        if let domainIdentifier = item["domainIdentifier"] as? String {
            attributeSet.domainIdentifier = domainIdentifier
        }

        // Set thumbnail data
        if let thumbnailDataString = item["thumbnailData"] as? String,
            let thumbnailData = Data(base64Encoded: thumbnailDataString)
        {
            attributeSet.thumbnailData = thumbnailData
        }

        // Set thumbnail URL
        if let thumbnailURLString = item["thumbnailURL"] as? String,
            let thumbnailURL = URL(string: thumbnailURLString)
        {
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

        // Set numeric properties
        if let rating = item["rating"] as? Double {
            attributeSet.rating = NSNumber(value: rating)
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

        // Set string properties
        attributeSet.genre = item["genre"] as? String
        attributeSet.version = item["version"] as? String
        attributeSet.director = item["director"] as? String
        attributeSet.producer = item["producer"] as? String
        attributeSet.composer = item["composer"] as? String
        attributeSet.artist = item["artist"] as? String
        attributeSet.album = item["album"] as? String

        // Set array properties
        if let instantMessageAddresses = item["instantMessageAddresses"] as? [String] {
            attributeSet.instantMessageAddresses = instantMessageAddresses
        }

        let searchableItem = CSSearchableItem(
            uniqueIdentifier: uniqueIdentifier,
            domainIdentifier: item["domainIdentifier"] as? String, attributeSet: attributeSet)

        if let expirationDate = item["expirationDate"] as? Double {
            searchableItem.expirationDate = Date(timeIntervalSince1970: expirationDate / 1000)
        }

        return searchableItem
    }
}

internal final class InvalidItemException: Exception, @unchecked Sendable {
    override var reason: String {
        "uniqueIdentifier and title are required"
    }
}

internal final class IndexingFailedException: Exception, @unchecked Sendable {
    override var reason: String {
        "Failed to index items in Spotlight"
    }
}

internal final class RemovalFailedException: Exception, @unchecked Sendable {
    override var reason: String {
        "Failed to remove items from Spotlight"
    }
}
