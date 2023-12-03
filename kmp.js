function computeLPSArray(pattern) {
  const lps = [0];
  let len = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

function KMPSearch(text, pattern) {
  const lps = computeLPSArray(pattern);
  const matches = [];
  let i = 0;
  let j = 0;

  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }
    if (j === pattern.length) {
      matches.push(i - j);
      j = lps[j - 1];
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  return matches.length > 0;
}

// Usage:
const popularArtists = [
  "Drake", "Billie Eilish", "Ed Sheeran", "Ariana Grande", "Taylor Swift",
  "BTS", "Justin Bieber", "The Weeknd", "Dua Lipa", "Post Malone", "Playboi Carti", "Kanye West", 
  // Add more artists here...
];

function getMatchingArtists(input) {
  const matchingArtists = popularArtists.filter(artist => KMPSearch(artist.toLowerCase(), input.toLowerCase()));
  return matchingArtists.slice(0, 5); // Limit suggestions to 5
}

// Rest of the code for the search bar handling remains the same as in the previous example


// Example usage:
const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");

searchInput.addEventListener("input", function() {
  const inputValue = this.value;
  suggestions.innerHTML = ""; // Clear previous suggestions

  if (inputValue.length === 0) {
    return;
  }

  const matchingArtists = getMatchingArtists(inputValue);
  if (matchingArtists.length > 0) {
    for (const artist of matchingArtists) {
      const suggestionItem = document.createElement("div");
      suggestionItem.textContent = artist;
      suggestionItem.classList.add("suggestion");
      suggestionItem.addEventListener("click", function() {
        searchInput.value = artist;
        suggestions.innerHTML = ""; // Clear suggestions on click
      });
      suggestions.appendChild(suggestionItem);
    }
  } else {
    const noMatch = document.createElement("div");
    noMatch.textContent = "No matching artists found";
    suggestions.appendChild(noMatch);
  }
});
