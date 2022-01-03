export const dict: { [k: string]: string | any } = {
    keywords: {
        unchangeable: ["static", "while", "return", "class"],
        changeable: {
            and: "&&",
            or: "||",
            none: null,
            "is none": "== null",
            "is not none": "!= null",
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
        exceptions: new Set(["remove", "pop", "class"]),
    },
    for: {
        syntax: "for ($condition) {\n" + "$indent$1\n" + "}",
        loop: "int index = 0; index < $value; ++index",
        iterator: "$type $child: $parent",
    },
    function: {
        call: "$functionName()",
        declaration: "$type void $functionName() {\n" + "$indent\n" + "}",
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
        "slice to": "$element.substring(0, $index)",
        "slice from": "$element.substring($index)",
        "starts with": "$parent.startsWith($child)",
        "ends with": "$parent.endsWith($child)",
        pop: "$element.remove($index)",
        remove: "$parent.remove($child)",
        in: "$parent.contains($0child)",

        // 2 parameter
    },
};
