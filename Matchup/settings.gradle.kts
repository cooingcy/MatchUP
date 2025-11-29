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
        id("com.android.application") version "8.13.1"
        id("com.android.library")    version "8.13.1"
        id("org.jetbrains.kotlin.android") version "1.9.10"
        id("com.google.gms.google-services") version "4.3.15"
    }
}
plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.8.0"
}

dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
    }
}
