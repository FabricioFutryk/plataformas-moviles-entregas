const apiLink =
  "https://api.github.com/repos/futrykfabricio/plataformas-moviles-entregas/git/trees/master";
const rawLink =
  "https://raw.githubusercontent.com/futrykfabricio/plataformas-moviles-entregas/master/";

class Activity {
  constructor(readmeContent, path) {
    this.name = readmeContent.split("\n").shift().replace("# ", "");
    this.date = readmeContent.split("\n")[2].replace("# ", "");
    this.path = path;
    this.text = `${this.path.toUpperCase()} | ${this.name} | ${this.date}.`;
  }

  buildElement() {
    let li = document.createElement("li");
    let a = document.createElement("a");

    a.href = `./${this.path}`;

    li.appendChild(a);

    return li;
  }
}

const dirHandler = async (dir) => {
  if (dir.type === "tree" && dir.path.startsWith("tp-")) {
    let readmeLink = rawLink + `${dir.path}/README.md`;
    let readmeResponse = await axios.get(readmeLink);

    if (!readmeResponse) return;

    const readmeContent = readmeResponse.data;
    return new Activity(readmeContent, dir.path);
  }
};

const getActivities = async () => {
  let res = await axios.get(apiLink);
  const tree = res.data.tree;

  if (!tree) return;

  const githubFolders = tree.map((dir) => dirHandler(dir));
  const activities = (await Promise.all(githubFolders)).filter(
    (value) => value
  );

  return activities.sort((a, b) => {
    let output = 0;
    a.path < b.path ? (output = -1) : (output = 1);

    return output;
  });
};
