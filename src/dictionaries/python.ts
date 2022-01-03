export const dict: { [k: string]: string | any } = {
    keywords: {
        unchangeable: ["is", "not", "none", "while", "in", "def", "and", "or", "class"],
        changeable: {
            none: "None",
            "is none": "is None",
            "is not none": "is not None",
        },
        changeableWithSyntax: {
            not: "$before not $after",
        },
    },
    if: {
        syntax: "$condition: bool = True\n" + "if $condition:\n" + "$indent$1\n" + "\n",
        exceptions: new Set(["remove", "def", "class"]),
    },
    for: {
        syntax: "for $condition:\n" + "$indent$1\n",
        loop: "index in range(0, $value)",
        iterator: "$child in $parent",
    },
    function: {
        call: "self.$type$functionName()",
        declaration: "def $type$functionName(self):\n" + "$indent\n",
        types: {
            public: "",
            protected: "_",
            private: "__",
        },
    },
    functions: {
        // No parameter
        trim: "$element.strip()",
        upper: "$element.upper()",
        lower: "$element.lower()",

        // 1 parameter
        "slice to": "$element[:$index]",
        "slice from": "$element[:$index]",
        "starts with": "$parent.startswith($child)",
        "ends with": "$parent.endswith($child)",
        pop: "$element.pop(index)",
        remove: "$parent.remove($child)",
        in: "$child in $parent",
    },
};
