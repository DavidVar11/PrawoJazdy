Papa.parse("pytania_egzaminacyjne_na_kierowcę_2025.csv", {
  download: true,
  complete: function(results) {
    const data = results.data;

    const row = Math.floor(Math.random() * (2021 - 1)) + 1;

    const colQuestion = 2;
    const colFile = 7;
    const colAnswer = 6;
    const optionA = 3;
    const optionB = 4;
    const optionC = 5;
    correctAnswer = data[row]?.[colAnswer]?.trim();

    document.getElementById("csvQuestion").textContent = data[row]?.[colQuestion]?.trim() ?? "N/A";
    if (correctAnswer == "T") {
      document.getElementById("csvAnswer").textContent = "Tak";
    } else if (correctAnswer == "N") {
      document.getElementById("csvAnswer").textContent = "Nie";
    } else {
      document.getElementById("csvAnswer").textContent = correctAnswer ?? "N/A";
    }
    if (data[row]?.[optionA]?.trim() != "") {
      document.getElementById("optionA").textContent = "A. " + (data[row]?.[optionA]?.trim() ?? "N/A");
      document.getElementById("optionB").textContent = "B. " + (data[row]?.[optionB]?.trim() ?? "N/A");
      document.getElementById("optionC").textContent = "C. " + (data[row]?.[optionC]?.trim() ?? "N/A");
      document.getElementById("optionA").style.display = "block";
      document.getElementById("optionB").style.display = "block";
      document.getElementById("optionC").style.display = "block";
    } else {
      document.getElementById("optionT").textContent = "Tak";
      document.getElementById("optionN").textContent = "Nie";
      document.getElementById("optionT").style.display = "block";
      document.getElementById("optionN").style.display = "block";
    }
    const fileName = (data[row]?.[colFile] ?? "").trim();
    if (!fileName) return;

    const extension = fileName.split('.').pop().toLowerCase();

    if (extension === 'mp4') {
      const videoSource = document.getElementById("csvVideo");
      videoSource.onerror = () => {
        videoSource.parentElement.setAttribute("poster", "https://placehold.co/640x360?text=Błąd+wideo");
        videoSource.parentElement.removeAttribute("controls");
      }
      videoSource.src = `filmy i zdjęcia/filmy_mp4/${fileName}`;
      videoSource.parentElement.style.display = "block";
      videoSource.parentElement.load();
      document.getElementById("csvImage").style.display = "none";
    } else if (extension === 'jpg') {
      const imageSource = document.getElementById("csvImage");

      imageSource.onerror = () => imageSource.src = "https://placehold.co/640x360?text=Błąd+obrazu";
      imageSource.src = `filmy i zdjęcia/zdjęcia/${fileName}`;

      imageSource.style.display = "block";
      document.getElementById("csvVideo").parentElement.style.display = "none";
    }

  },
  error: function(err) {
    console.error("Error parsing CSV:", err);
    document.getElementById("csvQuestion").textContent = "Error loading CSV";
  }
});
function showAnswer() {
  document.getElementById("csvAnswer").style.display = "block";
  if (correctAnswer == "T") {
    document.getElementById("optionT").style.backgroundColor = "lightgreen";
    document.getElementById("optionN").style.backgroundColor = "lightcoral";
  } else if (correctAnswer == "N") {
    document.getElementById("optionN").style.backgroundColor = "lightgreen";
    document.getElementById("optionT").style.backgroundColor = "lightcoral";
  } else if (correctAnswer == "A") {
    document.getElementById("optionA").style.backgroundColor = "lightgreen";
    document.getElementById("optionB").style.backgroundColor = "lightcoral";
    document.getElementById("optionC").style.backgroundColor = "lightcoral";
  } else if (correctAnswer == "B") {
    document.getElementById("optionB").style.backgroundColor = "lightgreen";
    document.getElementById("optionA").style.backgroundColor = "lightcoral";
    document.getElementById("optionC").style.backgroundColor = "lightcoral";
  } else if (correctAnswer == "C") {
    document.getElementById("optionC").style.backgroundColor = "lightgreen";
    document.getElementById("optionA").style.backgroundColor = "lightcoral";
    document.getElementById("optionB").style.backgroundColor = "lightcoral";
  }
}
