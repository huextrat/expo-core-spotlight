import CoreSpotlight
import ExpoModulesCore

// Opens the deeplink stored in `uniqueIdentifier` when the user taps a Spotlight search result.
// Registered through `expo-module.config.json`, so it works with both the legacy AppDelegate
// life cycle and the scene-based one (Expo SDK 58+), where `ExpoAppSceneDelegate` forwards
// user activities to app delegate subscribers.
public class ExpoCoreSpotlightAppDelegateSubscriber: ExpoAppDelegateSubscriber {
    public func application(
        _ application: UIApplication,
        continue userActivity: NSUserActivity,
        restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
    ) -> Bool {
        // The subscriber manager only calls the original handler once every subscriber has called it
        restorationHandler(nil)

        guard userActivity.activityType == CSSearchableItemActionType,
            let uniqueIdentifier = userActivity.userInfo?[CSSearchableItemActivityIdentifier]
                as? String,
            let url = URL(string: uniqueIdentifier)
        else {
            return false
        }

        DispatchQueue.main.async {
            UIApplication.shared.open(url, options: [:])
        }

        return true
    }
}
