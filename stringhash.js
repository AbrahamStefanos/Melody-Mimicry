const popularArtists = [
  "Drake", "Travis Scott", "Michael Jackson", "Taylor Swift",
  "Lana Del Rey", "Justin Bieber", "The Weeknd", "NBA Youngboy", "Playboi Carti", "Kanye West", "Yeat",
  // Add more artists here...
];

function stringHash(text) {
  let hash = 0;
  if (text.length === 0) return hash;

  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32-bit integer
  }
  return hash;
}

function getMatchingArtists(input) {
  const matchingArtists = popularArtists.filter(artist => {
    return artist.toLowerCase().includes(input.toLowerCase());
  });
  return matchingArtists.slice(0, 5); // Limit suggestions to 5
}

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
