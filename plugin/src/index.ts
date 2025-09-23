import { type ConfigPlugin, withAppDelegate } from "@expo/config-plugins";

const withExpoCoreSpotlight: ConfigPlugin = (config) => {
	return withAppDelegate(config, (config) => {
		const appDelegateContent = config.modResults.contents;

		if (
			appDelegateContent.includes("import CoreSpotlight") &&
			appDelegateContent.includes("handleCoreSpotlightSearchResult") &&
			appDelegateContent.includes("CSSearchableItemActionType")
		) {
			return config;
		}

		let modifiedContent = appDelegateContent;

		if (!modifiedContent.includes("import CoreSpotlight")) {
			modifiedContent = modifiedContent.replace(
				"import Expo",
				"import Expo\nimport CoreSpotlight\nimport MobileCoreServices",
			);
		}

		if (!modifiedContent.includes("handleCoreSpotlightSearchResult")) {
			const coreSpotlightMethod = `
  // MARK: - Core Spotlight Handling
  func handleCoreSpotlightSearchResult(_ userActivity: NSUserActivity) -> Bool {
      guard userActivity.activityType == CSSearchableItemActionType else {
        return false
      }
      
      guard let uniqueIdentifier = userActivity.userInfo?[CSSearchableItemActivityIdentifier] as? String else {
        return false
      }

	  guard let url = URL(string: uniqueIdentifier) else {
		return false
	  }
      
      DispatchQueue.main.async {
        UIApplication.shared.open(url, options: [:])
      }
      
      return true
    }`;

			modifiedContent = modifiedContent.replace(
				/(public class AppDelegate: ExpoAppDelegate \{[\s\S]*?)\n\}/,
				`$1${coreSpotlightMethod}\n}`,
			);
		}

		if (
			modifiedContent.includes("continue userActivity") &&
			!modifiedContent.includes("handleCoreSpotlightSearchResult(userActivity)")
		) {
			modifiedContent = modifiedContent.replace(
				/(\/\/ Universal Links[\s\S]*?public override func application\(\s*_ application: UIApplication,\s*continue userActivity: NSUserActivity,\s*restorationHandler: @escaping \(\[UIUserActivityRestoring\]\?\) -> Void\s*\) -> Bool \{[\s\S]*?)(let result = RCTLinkingManager\.application)/,
				`$1// Handle Core Spotlight search result taps
    if handleCoreSpotlightSearchResult(userActivity) {
      return true
    }
    
    $2`,
			);
		}

		config.modResults.contents = modifiedContent;
		return config;
	});
};

export default withExpoCoreSpotlight;
