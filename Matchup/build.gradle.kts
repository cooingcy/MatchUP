// Root build.gradle.kts
plugins {
    // apenas para tarefas do gradle root (sem aplicar no módulo)
    id("org.jetbrains.kotlin.jvm") version "1.9.10" apply false
    id("com.android.application") apply false
    id("org.jetbrains.kotlin.android") apply false
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}
