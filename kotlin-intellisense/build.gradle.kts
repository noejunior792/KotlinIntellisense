plugins {
    kotlin("jvm") version "1.6.0"
    application
}

group = "com.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}

application {
    mainClass.set("com.example.KotlinIntellisenseKt")
}

tasks.jar {
    manifest {
        attributes["Main-Class"] = "com.example.KotlinIntellisenseKt"
    }
}
