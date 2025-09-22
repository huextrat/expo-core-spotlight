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
      const importIndex = appDelegateContent.indexOf('import Expo');
      if (importIndex !== -1) {
        config.modResults.contents = 
          appDelegateContent.slice(0, importIndex) +
          'import Expo\nimport CoreSpotlight\n' +
          appDelegateContent.slice(importIndex);
      }
    }
    
    // Find the AppDelegate class and add the Core Spotlight method to it
    const appDelegateClassRegex = /public class AppDelegate: ExpoAppDelegate \{[\s\S]*?\n\}/;
    const appDelegateMatch = appDelegateContent.match(appDelegateClassRegex);
    
    if (appDelegateMatch) {
      const appDelegateClass = appDelegateMatch[0];
      
      // Add the Core Spotlight method to the AppDelegate class
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
      
      // Insert the method before the closing brace of the AppDelegate class
      const updatedAppDelegateClass = appDelegateClass.replace(/\n\}$/, `${coreSpotlightMethod}\n}`);
      
      config.modResults.contents = appDelegateContent.replace(appDelegateClassRegex, updatedAppDelegateClass);
    }
    
    // Now handle the continue userActivity method in the AppDelegate class
    const userActivityMethodRegex = /public override func application\(\s*_ application: UIApplication,\s*continue userActivity: NSUserActivity,\s*restorationHandler: @escaping \(\[UIUserActivityRestoring\]\?\) -> Void\s*\) -> Bool \{[\s\S]*?\n\s*\}/;
    
    if (userActivityMethodRegex.test(appDelegateContent)) {
      // Method exists, add Core Spotlight handling to it
      config.modResults.contents = appDelegateContent.replace(
        userActivityMethodRegex,
        `public override func application(
    _ application: UIApplication,
    continue userActivity: NSUserActivity,
    restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
  ) -> Bool {
    // Handle Core Spotlight search result taps
    if handleCoreSpotlightSearchResult(userActivity) {
      return true
    }
    
    let result = RCTLinkingManager.application(application, continue: userActivity, restorationHandler: restorationHandler)
    return super.application(application, continue: userActivity, restorationHandler: restorationHandler) || result
  }`
      );
    } else {
      // Method doesn't exist, add it to the AppDelegate class
      const appDelegateClassRegex = /public class AppDelegate: ExpoAppDelegate \{[\s\S]*?\n\}/;
      const appDelegateMatch = appDelegateContent.match(appDelegateClassRegex);
      
      if (appDelegateMatch) {
        const appDelegateClass = appDelegateMatch[0];
        const userActivityMethod = `
  // Universal Links
  public override func application(
    _ application: UIApplication,
    continue userActivity: NSUserActivity,
    restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
  ) -> Bool {
    // Handle Core Spotlight search result taps
    if handleCoreSpotlightSearchResult(userActivity) {
      return true
    }
    
    let result = RCTLinkingManager.application(application, continue: userActivity, restorationHandler: restorationHandler)
    return super.application(application, continue: userActivity, restorationHandler: restorationHandler) || result
  }`;
        
        // Insert the method before the closing brace of the AppDelegate class
        const updatedAppDelegateClass = appDelegateClass.replace(/\n\}$/, `${userActivityMethod}\n}`);
        
        config.modResults.contents = appDelegateContent.replace(appDelegateClassRegex, updatedAppDelegateClass);
      }
    }
    
    return config;
  });
};

export default withExpoCoreSpotlight;