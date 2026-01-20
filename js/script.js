const pokemonImage = document.querySelector(".pokemon__image");
const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonDescription = document.querySelector(".pokemon__description");
const searchForm = document.querySelector(".form");
const searchInput = document.querySelector(".input__search");
const randomBtn = document.querySelector(".btn-next");
const joystick = document.querySelector(".joystick");

let currentAudio = null;

/* ===============================
   Play Pokémon Cry
   =============================== */
function playCry(cryUrl) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(cryUrl);
    currentAudio.play();
}

/* ===============================
   Load Pokémon (Random / Search)
   =============================== */
async function loadPokemon(url, playSound = false) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            pokemonName.textContent = "Not found";
            pokemonNumber.textContent = "";
            pokemonImage.src = "";
            pokemonDescription.textContent = "Pokémon not found.";
            return;
        }

        const data = await response.json();

        pokemonName.textContent = data.name;
        pokemonNumber.textContent = data.dex;
        pokemonImage.src = data.sprite;
        pokemonDescription.textContent =
            data.description || "No description available.";

        if (playSound) {
            playCry(data.cry);
        }

    } catch (err) {
        console.error("Failed to load Pokémon:", err);
    }
}

/* ===============================
   Initial Load (Silent)
   =============================== */
loadPokemon("/random");

/* ===============================
   Random Pokémon (Button)
   =============================== */
randomBtn.addEventListener("click", () => {
    loadPokemon("/random", true);
});

/* ===============================
   Random Pokémon (Joystick 🎮)
   =============================== */
joystick.addEventListener("click", () => {
    loadPokemon("/random", true);
});

/* ===============================
   Search by Name or Number
   =============================== */
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    loadPokemon(`/pokemon/${query}`, true);
    searchInput.value = "";
});
