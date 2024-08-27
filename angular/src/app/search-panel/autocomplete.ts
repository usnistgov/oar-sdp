// these first two functions are taken from github,
// https://github.com/Glench/fuzzyset.js for more details
function levenshtein(str1: String, str2: String) {
    var current = [], prev, value;

    for (var i = 0; i <= str2.length; i++)
        for (var j = 0; j <= str1.length; j++) {
            if (i && j)
                if (str1.charAt(j - 1) === str2.charAt(i - 1))
                    value = prev;
                else
                    value = Math.min(current[j], current[j - 1], prev) + 1;
            else
                value = i + j;

            prev = current[j];
            current[j] = value;
        }

    return current.pop();
};

// return an edit distance from 0 to 1
function distance(str1: String, str2: String) {
    if (str1 === null && str2 === null) throw 'Trying to compare two null values';
    if (str1 === null || str2 === null) return 0;
    str1 = String(str1); str2 = String(str2);

    var distance = levenshtein(str1, str2);
    if (str1.length > str2.length) {
        return 1 - distance / str1.length;
    } else {
        return 1 - distance / str2.length;
    }
};

function get_similarity(str1: String, str2: String) {
    var words1 = str1.split(" ");
    var words2 = str2.split(" ");

    var total = 0;
    if (words2.length < words1.length) {
        return 0;
    }
    words1.forEach(word1 => {
        var best = 0;
        words2.forEach(word2 => {
            if (word1.indexOf(word2.substring(0, word2.length / 2)) == 0 || word2.indexOf(word1) >= 0) {
                var sim = distance(word1, word2);
            } else {
                var sim = 0;
            }
            if (sim > best) {
                best = sim;
            }
        });
        total += best;
    });
    return total / Math.max(words1.length, words2.length);
}


export function find(search_phrase: String, parsed_data: String[][], parsed_data_headers: String[]) {
    search_phrase = search_phrase.toLowerCase().trim();
    var response = [];

    if (search_phrase.length == 0) {
        return response;
    }

    var term_reduced = parsed_data_headers.indexOf("TERM_REDUCED");
    var section = parsed_data_headers.indexOf("SECTION");
    var freq = parsed_data_headers.indexOf("FREQ");

    parsed_data.forEach(data => {
        try {
            if (data) {
                var similarity = get_similarity(search_phrase, data[term_reduced].toLowerCase().trim());
                var rank = similarity + Math.pow(parseInt(data[freq].toString()), 0.0625);
                if (rank >= 0.5 && similarity > 0.4) {
                    response.push([data[term_reduced], {
                        "data": {
                            "SECTION": data[section],
                            "FREQ": parseInt(data[freq].toString()),
                        },
                        "similarity": similarity,
                        "rank": rank
                    }]);
                }
            }
        } catch (e) {
            // MARK 08/21/2024: This keeps logging ["\"quality of experience"] (1) so I disabled
            // the logging
            // console.log(data)
        }
    });

    response.sort((elem1, elem2) => (elem2[1]["rank"] - elem1[1]["rank"]));
    var i = 0;
    var responses_unique = new Set();
    while (true) {
        if (i >= response.length) break;

        if (responses_unique.has(response[i][0])) {
            response.splice(i, 1);
        } else {
            responses_unique.add(response[i][0])
            i = i + 1;
        }
    }
    response = response.slice(0, 10);
    return response;
};