const easterEgg =
  "QXJyb3dVcA==QXJyb3dVcA==QXJyb3dEb3duQXJyb3dEb3duQXJyb3dMZWZ0QXJyb3dSaWdodA==QXJyb3dMZWZ0QXJyb3dSaWdodA==Yg==YQ==RW50ZXI=";

const validKeys = [
  "QXJyb3dVcA==",
  "QXJyb3dEb3du",
  "QXJyb3dMZWZ0",
  "QXJyb3dSaWdodA==",
  "Yg==",
  "YQ==",
  "RW50ZXI=",
];

let currInput = "";

const checkEasterEgg = (ev) => {
  if (!validKeys.includes(btoa(ev.key))) return;
  currInput += btoa(ev.key);

  if (currInput === easterEgg) {
    alert("Easter Egg Unlocked!");
    container.innerHTML +=
      "<audio id='audio' autoplay><source src='./media/easteregg.ogg' type='audio/ogg'></audio>";

    document.getElementById("audio").volume = 0.1;
  }

  if (currInput.length >= easterEgg.length) {
    currInput = "";
  }
};
