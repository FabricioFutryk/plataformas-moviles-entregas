const createSpinner = () => {
  const spinner = document.createElement("div");
  const status = document.createElement("span");

  status.innerText = "Loading...";

  spinner.role = "status";

  spinner.className = "spinner-border mx-auto my-5";
  status.className = "visually-hidden";

  return spinner;
};

const createModalBody = (data) => {
  const body = document.createElement("div");
  const spritesElement = document.createElement("div");
  const typesElement = document.createElement("div");
  const statsElement = document.createElement("div");

  const frontDefaultSprite = document.createElement("img");
  const frontShinySprite = document.createElement("img");
  const backDefaultSprite = document.createElement("img");
  const backShinySprite = document.createElement("img");

  body.className = "container";
  spritesElement.className = "row justify-content-center text-center";
  typesElement.className = "row justify-content-center text-center";
  statsElement.className = "row justify-content-around text-center p-2";

  frontDefaultSprite.src = data.sprites.front_default;
  frontDefaultSprite.className = "col-3";
  frontShinySprite.src = data.sprites.front_shiny;
  frontShinySprite.className = "col-3";
  backDefaultSprite.src = data.sprites.back_default;
  backDefaultSprite.className = "col-3";
  backShinySprite.src = data.sprites.back_shiny;
  backShinySprite.className = "col-3";

  spritesElement.append(
    ...[
      frontDefaultSprite,
      frontShinySprite,
      backDefaultSprite,
      backShinySprite,
    ]
  );

  typesElement.append(
    ...data.types.map((type) => {
      const typeElement = document.createElement("div");
      typeElement.innerText = type.type.name;
      typeElement.className = `type-${type.type.name} col-4 m-2`;

      return typeElement;
    })
  );

  statsElement.append(
    ...data.stats.map((stat) => {
      const statElement = document.createElement("div");

      statElement.className = `stat-${stat.stat.name} col-4`;
      statElement.innerText = stat.base_stat;

      return statElement;
    })
  );

  body.appendChild(spritesElement);
  body.appendChild(typesElement);
  body.appendChild(statsElement);

  return body;
};

const createPokemonCard = (pokemon) => {
  const card = document.createElement("div");
  const image = document.createElement("img");
  const body = document.createElement("div");
  const title = document.createElement("h5");
  const button = document.createElement("button");
  const spinner = createSpinner();

  button.className = "btn btn-primary";
  button.innerText = "Ver más";

  fetch(pokemon.url)
    .then((res) => res.json())
    .then((data) => {
      title.innerText = pokemon.name.toUpperCase()[0] + pokemon.name.slice(1);

      image.src = data.sprites.front_default;
      image.style.width = "50%";
      image.style.height = "50%";
      image.className = "mx-auto d-block";

      card.replaceChild(image, spinner);
      body.appendChild(title);
      body.appendChild(button);

      button.addEventListener("click", () => {
        const modal = new bootstrap.Modal(document.querySelector("#pokeModal"));

        document.querySelector(".modal-title").innerText = `#${data.id} ${pokemon.name.toUpperCase()}`;
        document.querySelector(".modal-body").innerHTML =createModalBody(data).innerHTML;

        modal.show();
      });

      const firstType = data.types[0].type.name;

      if (data.types.length > 1) {
        const secondType = data.types[1].type.name;

        card.classList.add(
          "rounded-type-border",
          `border-${firstType}-to-${secondType}`
        );
      } else {
        card.classList.add(`border-${firstType}`);
      }
    });

  card.className = "card";
  image.className = "card-img-top";
  body.className = "card-body";
  title.className = "card-title";

  card.appendChild(spinner);
  card.appendChild(body);

  return card;
};

const fetchPokemons = async (offset = 0, limit = 151) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  const data = await res.json();

  data.results.forEach((pokemon) => {
    const col = document.createElement("div");
    const card = createPokemonCard(pokemon);

    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    col.appendChild(card);
    row.appendChild(col);
  });
  row.append(selectMoreButton);

  return offset + limit;
};
