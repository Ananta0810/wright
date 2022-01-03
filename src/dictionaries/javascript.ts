export const dict: { [k: string]: string | any } = {
    keywords: {
        unchangeable: ["const", "var", "let", "function", "while", "class"],
        changeable: {
            and: "&&",
            or: "||",
            none: "null",
            "is none": "=== null",
            "is not none": "!== null",
        },
        changeableWithSyntax: {
            not: "$before !$after",
        },
    },
    if: {
        syntax:
            "boolean $condition = true;\n" +
            "if ($condition) {\n" +
            "$indent$1\n" +
            "}\n",
        exceptions: new Set(["remove", "pop", "function", "const", "let", "class"]),
    },
    for: {
        syntax: "for ($condition) {\n" + "$indent$1\n" + "}",
        loop: "int index = 0; index < $value; ++index",
        iterator: "$type $child: $parent",
    },
    function: {
        call: "this.$functionName()",
        declaration: "$type $functionName() {\n" + "$indent\n" + "}",
        types: {
            public: "public",
            protected: "protected",
            private: "private",
        },
    },
    functions: {
        // No parameter
        trim: "$element.trim()",
        uppercase: "$element.toUpperCase()",
        lowercase: "$element.toLowerCase()",

        // 1 parameter
        "slice from": "$element.slice(0, $index)",
        "slice to": "$element.slice($index)",
        "starts with": "$parent.startsWith($child)",
        "ends with": "$parent.endsWith($child)",
        in: "$parent.includes($0child)",
        remove: "$parent.filter(item => item !== $child)",
        pop: "$element.splice($index, 1)",

        // 2 parameter
    },
};
