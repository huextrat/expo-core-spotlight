package expo.modules.corespotlight

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise

class ExpoCoreSpotlightModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoCoreSpotlight")
    
    // Check if Core Spotlight is available (always false on Android)
    AsyncFunction("isAvailable") {
      return@AsyncFunction false
    }
    
    // Add or update a single item (empty implementation for Android)
    AsyncFunction("indexItem") { item: Map<String, Any>, promise: Promise ->
      promise.resolve(Unit)
    }
    
    // Add or update multiple items (empty implementation for Android)
    AsyncFunction("indexItems") { items: List<Map<String, Any>>, promise: Promise ->
      promise.resolve(Unit)
    }
    
    // Remove a single item (empty implementation for Android)
    AsyncFunction("removeItem") { uniqueIdentifier: String, promise: Promise ->
      promise.resolve(Unit)
    }
    
    // Remove multiple items (empty implementation for Android)
    AsyncFunction("removeItems") { uniqueIdentifiers: List<String>, promise: Promise ->
      promise.resolve(Unit)
    }
    
    // Remove all items (empty implementation for Android)
    AsyncFunction("removeAllItems") { promise: Promise ->
      promise.resolve(Unit)
    }
    
    // Remove all items from a domain (empty implementation for Android)
    AsyncFunction("removeAllItemsFromDomain") { domainIdentifier: String, promise: Promise ->
      promise.resolve(Unit)
    }
  }
}