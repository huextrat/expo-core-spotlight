import { ConfigPlugin, withAppDelegate } from '@expo/config-plugins';

const withExpoCoreSpotlight: ConfigPlugin = (config) => {
  return withAppDelegate(config, (config) => {
    const appDelegateContent = config.modResults.contents;
    
    // Check if Core Spotlight handling is already added
    if (appDelegateContent.includes('handleCoreSpotlightSearchResult')) {
      return config;
    }
    
    // Add import for CoreSpotlight if not already present
    if (!appDelegateContent.includes('import CoreSpotlight')) {
      const importIndex = appDelegateContent.indexOf('import UIKit');
      if (importIndex !== -1) {
        config.modResults.contents = 
          appDelegateContent.slice(0, importIndex) +
          'import UIKit\nimport CoreSpotlight\n' +
          appDelegateContent.slice(importIndex);
      }
    }
    
    // Add Core Spotlight handling method
    const classEndIndex = appDelegateContent.lastIndexOf('}');
    if (classEndIndex !== -1) {
      const coreSpotlightMethod = `
  // MARK: - Core Spotlight Handling
  func handleCoreSpotlightSearchResult(_ userActivity: NSUserActivity) -> Bool {
    guard userActivity.activityType == CSSearchableItemActionType else {
      return false
    }
    
    guard let uniqueIdentifier = userActivity.userInfo?[CSSearchableItemActivityIdentifier] as? String else {
      print("No unique identifier found in Core Spotlight search result")
      return false
    }
    
    // Get the URL from the searchable item
    if let url = userActivity.userInfo?[CSSearchableItemActivityURL] as? URL {
      print("Core Spotlight search result tapped: \\(uniqueIdentifier)")
      print("Opening URL: \\(url)")
      
      // Open the URL (this will trigger universal link handling)
      DispatchQueue.main.async {
        UIApplication.shared.open(url, options: [:]) { success in
          if success {
            print("Successfully opened URL from Core Spotlight: \\(url)")
          } else {
            print("Failed to open URL from Core Spotlight: \\(url)")
          }
        }
      }
      return true
    }
    
    // If no URL, handle by unique identifier
    print("Core Spotlight search result tapped: \\(uniqueIdentifier)")
    print("No URL found, handling by unique identifier")
    
    return true
  }`;
      
      config.modResults.contents = 
        appDelegateContent.slice(0, classEndIndex) +
        coreSpotlightMethod + '\n' +
        appDelegateContent.slice(classEndIndex);
    }
    
    // Now handle the continue userActivity method
    const userActivityMethodRegex = /func application\(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping \(\[UIUserActivityRestoring\]\?\) -> Void\) -> Bool/;
    
    if (userActivityMethodRegex.test(appDelegateContent)) {
      // Method exists, add Core Spotlight handling to it
      config.modResults.contents = appDelegateContent.replace(
        userActivityMethodRegex,
        `func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    // Handle Core Spotlight search result taps
    if handleCoreSpotlightSearchResult(userActivity) {
      return true
    }
    
    // Call existing implementation
    return super.application(application, continue: userActivity, restorationHandler: restorationHandler)
  }`
      );
    } else {
      // Method doesn't exist, add it
      const classEndIndex = appDelegateContent.lastIndexOf('}');
      if (classEndIndex !== -1) {
        const userActivityMethod = `
  // MARK: - User Activity Handling
  func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    // Handle Core Spotlight search result taps
    if handleCoreSpotlightSearchResult(userActivity) {
      return true
    }
    
    // Handle other user activities (like universal links)
    return super.application(application, continue: userActivity, restorationHandler: restorationHandler)
  }`;
        
        config.modResults.contents = 
          appDelegateContent.slice(0, classEndIndex) +
          userActivityMethod + '\n' +
          appDelegateContent.slice(classEndIndex);
      }
    }
    
    return config;
  });
};

export default withExpoCoreSpotlight;