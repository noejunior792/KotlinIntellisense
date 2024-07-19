package com.example

fun getCompletions(code: String): List<String> {
    
    return listOf("fun", "val", "var", "if", "else", "class", "interface")
}

fun getBugFixSuggestions(code: String): List<String> {
    
    return listOf("Check null pointer", "Use lateinit for uninitialized variable", "Use safe call operator")
}

fun main(args: Array<String>) {
    if (args.isNotEmpty()) {
        when (args[0]) {
            "autocomplete" -> {
                val completions = getCompletions(args[1])
                completions.forEach { println(it) }
            }
            "bugfix" -> {
                val suggestions = getBugFixSuggestions(args[1])
                suggestions.forEach { println(it) }
            }
            else -> {
                println("Unknown command")
            }
        }
    } else {
        println("No arguments provided")
    }
}
