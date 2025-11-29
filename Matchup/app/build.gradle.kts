plugins {
    id("com.android.application")
    kotlin("android")
    id("com.google.gms.google-services")

}

android {
    namespace = "com.matchup.app"
    compileSdk = 36   // ou 33 se preferir compatibilidade com AGP 8.1

    defaultConfig {
        applicationId = "com.matchup.app"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    // Se quiser suprimir o aviso sobre compileSdk > suporte do AGP:
    // adicione em gradle.properties: android.suppressUnsupportedCompileSdk=36

    buildFeatures {
        compose = true
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.5" // ajuste conforme seu Compose BOM / versão Kotlin
    }

    kotlinOptions {
        // Legacy form still works, mas se você preferir o novo compilerOptions, adapte.
        jvmTarget = "11"
    }

    // Usar toolchain para compilar Java se preferir:
    kotlin {
        jvmToolchain {
            (this as JavaToolchainSpec).languageVersion.set(JavaLanguageVersion.of(11))
        }
    }
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2024.09.00")) // exemplo
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
    implementation("androidx.core:core-ktx:1.10.1")
    implementation("androidx.activity:activity-compose:1.9.0")
    implementation(platform("com.google.firebase:firebase-bom:34.6.0"))

    // Firebase (exemplo) — só adicione se for usar Firebase e tiver google-services.json
    // implementation("com.google.firebase:firebase-auth-ktx:24.0.1")
    // implementation("com.google.firebase:firebase-firestore-ktx:24.6.0")
}

// Se tiver posto uma linha apply(plugin = ...) ao final em vez do block plugins, remova; prefira o block plugins.
