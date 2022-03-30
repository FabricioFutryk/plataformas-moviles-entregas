const apiLink =
  "https://api.github.com/repos/futrykfabricio/plataformas-moviles-entregas/git/trees/master";
const rawLink =
  "https://raw.githubusercontent.com/futrykfabricio/plataformas-moviles-entregas/master/";

const writingSpeed = 25;

const getTasks = async () => {
  let res = await axios.get(apiLink);
  const tree = res.data.tree;

  if (!tree) return;

  tree.forEach(async (dir) => {
    if (dir.type === "tree" && dir.path.startsWith("tp-")) {
      let readmeLink = rawLink + `${dir.path}/README.md`;
      let readmeResponse = await axios.get(readmeLink);

      if (!readmeResponse) return;

      const readmeContent = readmeResponse.data;

      let li = document.createElement("li");
      let a = document.createElement("a");
      let i = 0;

      let title = readmeContent.split("\n").shift().replace("# ", "");
      let date = readmeContent.split("\n")[2].replace("# ", "");
      let text = `${dir.path.toUpperCase()} | ${title} | ${date}.`;

      a.href = `./${dir.path}`;

      li.appendChild(a);
      container.appendChild(li);

      function typeWriter() {
        if (i < text.length) {
          a.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeWriter, writingSpeed);
        }
      }

      typeWriter();
    }
  });
};
