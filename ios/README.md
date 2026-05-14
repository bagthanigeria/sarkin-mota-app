# SARKIN MOTA iOS App

## Overview

Native iOS application built with Swift and SwiftUI for the SARKIN MOTA Luxury Cars Platform.

## Requirements

- **Xcode** 14.0 or later
- **iOS** 15.0 or later
- **Swift** 5.7+
- **CocoaPods** for dependency management

## Key Features

- 🏎️ Virtual Car Tours (3D/360°)
- 🔍 Advanced Search & Filtering
- 🏠 Home Screen with Featured Vehicles
- ❤️ Wishlist Management
- 📱 Real-time Messaging
- 📅 Booking System
- 💳 Payment Integration (Paystack, Stripe)
- 👤 User Profile Management
- ⭐ Reviews & Ratings
- 🔐 JWT Authentication

## Architecture

### MVVM (Model-View-ViewModel)

```
App/
├── Views/
│   ├── Home/
│   ├── Vehicles/
│   ├── Profile/
│   ├── Messages/
│   ├── Wishlist/
│   └── Bookings/
├── ViewModels/
├── Models/
├── Services/
│   ├── APIService
│   ├── AuthService
│   ├── VehicleService
│   └── MessageService
├── Utilities/
└── Resources/
    ├── Assets
    └── Localization
```

## Dependencies

### CocoaPods

```ruby
pod 'Alamofire'           # HTTP Networking
pod 'Kingfisher'          # Image Loading & Caching
pod 'SwiftyJSON'          # JSON Parsing
pod 'KeychainAccess'      # Secure Token Storage
pod 'SnapKit'             # Auto Layout
pod 'Moya'                # Network Abstraction
pod 'SDWebImage'          # Image Caching
pod 'Firebase/Analytics'  # Analytics
pod 'Firebase/Messaging'  # Push Notifications
pod 'Socket.IO-Client-Swift' # WebSocket for Chat
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd ios
pod install
```

### 2. Configure API Base URL

**File:** `App/Services/APIConfiguration.swift`

```swift
struct APIConfiguration {
    #if DEBUG
    static let baseURL = "http://localhost:5000/api/v1"
    #else
    static let baseURL = "https://api.sarkinmota.com/api/v1"
    #endif
}
```

### 3. Configure Firebase

1. Download `GoogleService-Info.plist` from Firebase Console
2. Add to Xcode project
3. Ensure "Copy items if needed" is checked

### 4. Open Project

```bash
open SarkinMota.xcworkspace
```

## Development

### Running on Simulator

1. Select simulator: **iPhone 14 Pro**
2. Press **Cmd + R** or click Play button
3. App launches automatically

### Running on Device

1. Connect iPhone via USB
2. Select device in Xcode
3. Press **Cmd + R**
4. Trust app on device if prompted

## Code Structure

### Models

```swift
struct Vehicle: Codable {
    let id: UUID
    let brand: String
    let model: String
    let year: Int
    let price: Decimal
    let specifications: VehicleSpecifications
}

struct User: Codable {
    let id: UUID
    let email: String
    let firstName: String
    let lastName: String
    let userType: UserType
}
```

### Services

```swift
// API Service
class APIService {
    static let shared = APIService()
    
    func getVehicles(filters: VehicleFilters) async -> Result<[Vehicle], Error> {
        // Implementation
    }
}

// Auth Service
class AuthService {
    static let shared = AuthService()
    
    func login(email: String, password: String) async -> Result<AuthResponse, Error> {
        // Implementation
    }
}
```

### ViewModels

```swift
@MainActor
class VehiclesViewModel: ObservableObject {
    @Published var vehicles: [Vehicle] = []
    @Published var isLoading = false
    @Published var error: Error?
    
    func fetchVehicles() {
        // Implementation
    }
}
```

### Views

```swift
struct VehicleListView: View {
    @StateObject private var viewModel = VehiclesViewModel()
    
    var body: some View {
        NavigationStack {
            List(viewModel.vehicles) { vehicle in
                NavigationLink(destination: VehicleDetailView(vehicle: vehicle)) {
                    VehicleRowView(vehicle: vehicle)
                }
            }
            .navigationTitle("Luxury Cars")
        }
    }
}
```

## Testing

### Unit Tests

```bash
# Run all tests
Cmd + U

# Or in terminal
xcodebuild test -workspace SarkinMota.xcworkspace -scheme SarkinMota
```

### UI Tests

```swift
func testVehicleSearch() {
    let app = XCUIApplication()
    app.launch()
    
    let searchField = app.searchFields["Search cars"]
    searchField.tap()
    searchField.typeText("Mercedes")
    
    XCTAssertTrue(app.tables.cells.count > 0)
}
```

## Code Style

- Follow [Swift API Design Guidelines](https://swift.org/documentation/api-design-guidelines/)
- Use meaningful variable/function names
- Mark sections with `// MARK: -`
- Add documentation comments

```swift
/// Fetches vehicles matching the given filters
/// - Parameter filters: Search filters for vehicles
/// - Returns: Array of matching vehicles
/// - Throws: NetworkError if request fails
func getVehicles(filters: VehicleFilters) async throws -> [Vehicle]
```

## Debugging

### View Hierarchy Debugger

- **Debug** → **View Hierarchy**
- Inspect views and their properties

### Console Output

```swift
print("DEBUG: Vehicle loaded: \(vehicle.brand) \(vehicle.model)")
```

### Network Debugging

- Use **Charles Proxy** or **Proxyman** to inspect network requests
- Enable verbose logging in APIService

## Deployment

### TestFlight

1. Archive app: **Product** → **Archive**
2. Upload to TestFlight via Xcode organizer
3. Add testers and distribute

### App Store

1. Set version and build number
2. Create release notes
3. Archive and submit
4. Wait for review (typically 1-3 days)

## Resources

- [SwiftUI Documentation](https://developer.apple.com/xcode/swiftui/)
- [Alamofire Guide](https://github.com/Alamofire/Alamofire)
- [HIG (Human Interface Guidelines)](https://developer.apple.com/design/human-interface-guidelines/)

## Support

- 📧 Email: ios@sarkinmota.com
- 🐛 Issues: [GitHub Issues](https://github.com/bagthanigeria/sarkin-mota-app/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/bagthanigeria/sarkin-mota-app/discussions)

---

Made with ❤️ by SARKIN MOTA Team
