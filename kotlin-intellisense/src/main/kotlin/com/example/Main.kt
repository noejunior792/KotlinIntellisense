package com.example

fun main(args: Array<String>) {
    if (args.isNotEmpty()) {
        when (args[0]) {
            "autocomplete" -> autocomplete(args.getOrNull(1) ?: "")
            "bugfix" -> bugfix(args.getOrNull(1) ?: "")
        }
    }
}

fun autocomplete(code: String) {
    // Simples exemplo de autocomplete
    val suggestions = listOf("fun", "val", "var", "class")
    suggestions.forEach { println(it) }
}

fun bugfix(code: String) {
    // Simples exemplo de correção de bugs
    if (code.contains("println")) {
        println("Sugestão: Use print ao invés de println para menos linhas.")
    }
}
