"use strict";

const colors = {
    fire: "#fddfdf",
    grass: "#defde0",
    electric: "#fcf7de",
    water: "#def3fd",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#f5f5f5",
    fighting: "#e6e0d4",
    normal: "#f5f5f5",
};

//? Search button
const search = document.querySelector(".search-pokemon");
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");

btn.addEventListener("click", () => {
    search.classList.toggle("active");
});

btn.addEventListener("mouseleave", () => {
    search.classList.remove("active");
});

//? Main pokedex

const pokemonContainer = document.querySelector(".container");
const pokemonContainerLeft = document.querySelector(".left-container");

const getPokemonByID = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokeData = await (await fetch(url)).json();
    createPokemonCard(pokeData);
};

const createPokemonCard = (pokeData) => {
    const pokemonEl = document.createElement("div");
    const pokemonImageEl = document.createElement("div");

    pokemonEl.classList.add("right-container");
    pokemonImageEl.classList.add("pokemon-img-container");

    const pokemonName = String(pokeData.name).replace(
        pokeData.name[0],
        pokeData.name[0].toUpperCase()
    );
    const pokemonNumber = pokeData.id.toString().padStart(3, "0");

    const pokemonHeight = pokeData.height;
    const pokemonWeight = pokeData.weight;
    const pokemonStatsAll = pokeData.stats;
    const pokemonStats = {
        hp: pokemonStatsAll[0].base_stat,
        attack: pokemonStatsAll[1].base_stat,
        defense: pokemonStatsAll[2].base_stat,
        specialAttack: pokemonStatsAll[3].base_stat,
        specialDefense: pokemonStatsAll[4].base_stat,
        speed: pokemonStatsAll[5].base_stat,
    };

    const pokemonTypes = pokeData.types.map((type) => type.type.name);
    const pokemonTypesString = pokemonTypes
        .map((type) => `<span class="type">${type}</span>`)
        .join(" ");

    const pokemonElInnerHTML = `           
                <div class="about-pokemon">
                    <p class="pokemon-name">
                        ${pokemonName} <span class="pokemon-id-number">#${pokemonNumber}</span>
                    </p>
                    <div class="pokemon-types">
                        ${pokemonTypesString}
                    </div>
                </div>
                <div class="stats-container">
                    <p class="height">Height: <span class="l">${pokemonHeight}</span></p>
                    <p class="weight">Weight: <span class="r">${pokemonWeight}</span></p>
                    <p class="hp">HP: <span class="l">${pokemonStats.hp}</span></p>
                    <p class="speed">Speed: <span class="r">${pokemonStats.speed}</span></p>
                    <p class="attack">Attack: <span class="l">${pokemonStats.attack}</span></p>
                    <p class="special-Attack">
                        Special-Attack: <span class="r">${pokemonStats.specialAttack}</span>
                    </p>
                    <p class="defense">Defense: <span class="l">${pokemonStats.defense}</span></p>
                    <p class="special-defense">
                        Special-Defense: <span class="r">${pokemonStats.specialDefense}</span>
                    </p>
                </div>
            `;

    const pokemonImageElInnerHTML = `
                <img
                    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonNumber}.png"
                    alt="${pokemonName} image"
                    class="pokemon-img"
                />
                `;

    pokemonEl.innerHTML = pokemonElInnerHTML;
    pokemonImageEl.innerHTML = pokemonImageElInnerHTML;
    pokemonContainer.appendChild(pokemonEl);
    pokemonContainerLeft.appendChild(pokemonImageEl);
};

let currentId = 1;

getPokemonByID(currentId);

const upButton = document.querySelector(".up");
const rightButton = document.querySelector(".right");
const downButton = document.querySelector(".down");
const leftButton = document.querySelector(".left");

const nextPokemon = () => {
    currentId++;
    if (currentId > 905) currentId = 905;
    getPokemonByID(currentId);
};

const prevoiusPokemon = () => {
    currentId--;
    if (currentId < 1) currentId = 1;
    getPokemonByID(currentId);
};

upButton.addEventListener("click", nextPokemon);
rightButton.addEventListener("click", nextPokemon);

downButton.addEventListener("click", prevoiusPokemon);
leftButton.addEventListener("click", prevoiusPokemon);
