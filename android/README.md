# SARKIN MOTA Android App

## Overview

Native Android application built with Kotlin and Jetpack Compose for the SARKIN MOTA Luxury Cars Platform.

## Requirements

- **Android Studio** 2023.1 or later
- **Android SDK** API 33 (Android 13) or higher
- **Java** 11 or later
- **Gradle** 8.0+
- **Kotlin** 1.9+

## Key Features

- 🏎️ Virtual Car Tours (3D/360°)
- 🔍 Advanced Search & Filtering
- 🏠 Home Screen with Featured Vehicles
- ❤️ Wishlist Management
- 📱 Real-time Messaging
- 📅 Booking System
- 💳 Payment Integration (Paystack, Flutterwave)
- 👤 User Profile Management
- ⭐ Reviews & Ratings
- 🔐 JWT Authentication

## Architecture

### MVVM + Clean Architecture

```
app/
src/
main/
├── java/com/sarkinmota/
│   ├── presentation/
│   │   ├── ui/
│   │   │   ├── home/
│   │   │   ├── vehicles/
│   │   │   ├── profile/
│   │   │   ├── messages/
│   │   │   └── bookings/
│   │   └── viewmodels/
│   ├── domain/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── usecases/
│   ├── data/
│   │   ├── api/
│   │   ├── local/
│   │   ├── repository/
│   │   └── datasource/
│   └── utils/
├── res/
│   ├── values/
│   ├── drawable/
│   ├── navigation/
│   └── layout/
└── AndroidManifest.xml
```

## Dependencies

### Core Android

```gradle
dependencies {
    // Jetpack Compose
    implementation 'androidx.compose.ui:ui:1.5.4'
    implementation 'androidx.compose.material3:material3:1.1.2'
    implementation 'androidx.activity:activity-compose:1.8.0'
    
    // Navigation
    implementation 'androidx.navigation:navigation-compose:2.7.2'
    
    // Lifecycle
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.6.2'
    implementation 'androidx.lifecycle:lifecycle-viewmodel-compose:2.6.2'
    
    // Networking
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:okhttp:4.11.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.11.0'
    
    // Image Loading
    implementation 'io.coil-kt:coil-compose:2.4.0'
    
    // Dependency Injection
    implementation 'com.google.dagger:hilt-android:2.47'
    kapt 'com.google.dagger:hilt-compiler:2.47'
    implementation 'androidx.hilt:hilt-navigation-compose:1.0.0'
    
    // Room Database
    implementation 'androidx.room:room-runtime:2.5.2'
    implementation 'androidx.room:room-ktx:2.5.2'
    kapt 'androidx.room:room-compiler:2.5.2'
    
    // Data Store
    implementation 'androidx.datastore:datastore-preferences:1.0.0'
    
    // Firebase
    implementation 'com.google.firebase:firebase-analytics-ktx:21.3.0'
    implementation 'com.google.firebase:firebase-messaging-ktx:23.2.1'
    
    // WebSocket
    implementation 'io.socket:socket.io-client-java:2.1.0'
    
    // Testing
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'io.mockk:mockk:1.13.5'
    androidTestImplementation 'androidx.compose.ui:ui-test-junit4:1.5.4'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}
```

## Setup Instructions

### 1. Clone and Open Project

```bash
cd android
open -a "Android Studio" .
```

### 2. Configure API Base URL

**File:** `app/build.gradle`

```gradle
android {
    buildTypes {
        debug {
            buildConfigField "String", "API_BASE_URL", 
                '"http://10.0.2.2:5000/api/v1"'  // Android emulator localhost
        }
        release {
            buildConfigField "String", "API_BASE_URL", 
                '"https://api.sarkinmota.com/api/v1"'
        }
    }
}
```

### 3. Sync Gradle

1. **File** → **Sync Now**
2. Wait for gradle build to complete

### 4. Configure Firebase

1. Download `google-services.json` from Firebase Console
2. Place in `app/` directory
3. Android Studio auto-detects it

## Development

### Running on Emulator

1. **Tools** → **Device Manager**
2. Create or select device (Pixel 6 recommended)
3. Press Play to launch emulator
4. **Run** → **Run 'app'** (or press Shift + F10)

### Running on Device

1. Enable Developer Mode on device
2. Connect via USB
3. Trust computer
4. **Run** → **Run 'app'**

## Code Structure

### Models (Domain Layer)

```kotlin
data class Vehicle(
    val id: UUID,
    val brand: String,
    val model: String,
    val year: Int,
    val price: BigDecimal,
    val specifications: VehicleSpecifications
)

data class User(
    val id: UUID,
    val email: String,
    val firstName: String,
    val lastName: String,
    val userType: UserType
)
```

### API Service (Data Layer)

```kotlin
interface SarkinMotaApi {
    @GET("vehicles")
    suspend fun getVehicles(
        @Query("page") page: Int = 1,
        @Query("limit") limit: Int = 20
    ): Response<List<Vehicle>>
    
    @POST("auth/login")
    suspend fun login(@Body credentials: LoginRequest): Response<AuthResponse>
}
```

### Repository Pattern

```kotlin
class VehicleRepository @Inject constructor(
    private val api: SarkinMotaApi,
    private val database: AppDatabase
) {
    suspend fun getVehicles(page: Int): Result<List<Vehicle>> {
        return try {
            val response = api.getVehicles(page)
            Result.success(response.data)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
```

### ViewModel with Compose State

```kotlin
@HiltViewModel
class VehiclesViewModel @Inject constructor(
    private val repository: VehicleRepository
) : ViewModel() {
    
    private val _state = MutableStateFlow<VehiclesUiState>(VehiclesUiState.Loading)
    val state: StateFlow<VehiclesUiState> = _state.asStateFlow()
    
    fun fetchVehicles() {
        viewModelScope.launch {
            val result = repository.getVehicles(1)
            _state.value = result.fold(
                onSuccess = { VehiclesUiState.Success(it) },
                onFailure = { VehiclesUiState.Error(it.message ?: "Unknown error") }
            )
        }
    }
}
```

### Compose UI

```kotlin
@Composable
fun VehicleListScreen(
    viewModel: VehiclesViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    
    LaunchedEffect(Unit) {
        viewModel.fetchVehicles()
    }
    
    when (state) {
        is VehiclesUiState.Loading -> LoadingScreen()
        is VehiclesUiState.Success -> VehicleList((state as VehiclesUiState.Success).vehicles)
        is VehiclesUiState.Error -> ErrorScreen((state as VehiclesUiState.Error).message)
    }
}

@Composable
fun VehicleCard(vehicle: Vehicle) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .clickable { /* Navigate to details */ }
    ) {
        Column {
            AsyncImage(
                model = vehicle.mainImageUrl,
                contentDescription = "${vehicle.brand} ${vehicle.model}",
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
            )
            Text(text = "${vehicle.brand} ${vehicle.model}", style = MaterialTheme.typography.headlineSmall)
            Text(text = "₦${vehicle.price.toPlainString()}", style = MaterialTheme.typography.bodyLarge)
        }
    }
}
```

## Testing

### Unit Tests

```bash
# Run all unit tests
./gradlew test

# Run specific test class
./gradlew test --tests VehicleRepositoryTest
```

### Instrumented Tests

```bash
# Run on device/emulator
./gradlew connectedAndroidTest
```

### Test Example

```kotlin
@HiltAndroidTest
class VehicleRepositoryTest {
    @get:Rule
    val hiltRule = HiltAndroidRule(this)
    
    @Inject
    lateinit var repository: VehicleRepository
    
    @Test
    fun testGetVehicles() = runTest {
        val result = repository.getVehicles(1)
        assertTrue(result.isSuccess)
    }
}
```

## Code Style

- Follow [Kotlin Style Guide](https://kotlinlang.org/docs/coding-conventions.html)
- Use meaningful names
- Keep functions under 20 lines
- Document public APIs

```kotlin
/**
 * Fetches vehicles matching the given filters
 * @param page Page number for pagination
 * @return Flow of vehicle list wrapped in Result
 */
fun getVehicles(page: Int): Flow<Result<List<Vehicle>>>
```

## Debugging

### Layout Inspector

- **Tools** → **Layout Inspector**
- Inspect Compose tree hierarchy

### Logcat

```kotlin
Log.d("VehicleVM", "Fetching vehicles for page $page")
Log.e("VehicleVM", "Error fetching vehicles", exception)
```

### Android Profiler

- **Tools** → **Profiler**
- Monitor CPU, memory, network, battery

## Deployment

### Google Play Internal Testing

1. **Build** → **Generate Signed Bundle/APK**
2. Create keystore if needed
3. Upload to Play Console internal testing track
4. Add testers

### Google Play Release

1. Prepare release notes
2. Set version code and name
3. Build signed APK/Bundle
4. Upload to Play Console
5. Submit for review

## Resources

- [Jetpack Compose Documentation](https://developer.android.com/jetpack/compose/documentation)
- [Kotlin Coroutines](https://kotlinlang.org/docs/coroutines-overview.html)
- [Hilt Dependency Injection](https://developer.android.com/training/dependency-injection/hilt-android)
- [Android Architecture Samples](https://github.com/android/architecture-samples)

## Support

- 📧 Email: android@sarkinmota.com
- 🐛 Issues: [GitHub Issues](https://github.com/bagthanigeria/sarkin-mota-app/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/bagthanigeria/sarkin-mota-app/discussions)

---

Made with ❤️ by SARKIN MOTA Team
