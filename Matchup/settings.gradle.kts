rootProject.name = "Matchup"
include(":app")

pluginManagement {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
    }
    plugins {
        // Versões aqui apenas para configuração do pluginManagement; no módulo usamos o plugin sem versão.
        id("com.android.application") version "8.1.0"
        id("com.android.library")    version "8.1.0"
        id("org.jetbrains.kotlin.android") version "1.9.10"
        id("com.google.gms.google-services") version "4.3.15"
    }
}

dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
    }
}
