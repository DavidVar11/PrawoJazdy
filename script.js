let correctAnswerCount = parseInt(localStorage.getItem('correctAnswerCount') || '0');
let totalAnswerCount = parseInt(localStorage.getItem('totalAnswerCount') || '0');
let selectedCategory = localStorage.getItem('selectedCategory') || 'B';
let userAnswer = null;
let correctAnswer;
let question;
let optionAText;
let optionBText;
let optionCText;
const buttons = ['optionA', 'optionB', 'optionC', 'optionT', 'optionN'];
const categorySelect = document.getElementById("categorySelect");
categorySelect.value = selectedCategory;
categorySelect.addEventListener("change", () => {
  selectedCategory = categorySelect.value;
  localStorage.setItem('selectedCategory', selectedCategory);
  loadNewQuestion();
});


function loadNewQuestion() {
  Papa.parse("PytaniaEgzaminacyjneFull.csv", {
    download: true,
    delimiter: ";",
    complete: function(results) {
      const data = results.data;

      // Columns
      const categoryCol = 9;
      const colQuestion = 2;
      const colFile = 7;
      const colAnswer = 6;
      const optionA = 3;
      const optionB = 4;
      const optionC = 5;

      // Skip header row
      const rows = data.slice(1);

      // Filter rows by selected category
      const matchingRows = rows.filter(row => {
        const categoriesText = row[categoryCol]?.split(",").map(c => c.trim());
        return categoriesText?.includes(selectedCategory);
      });

      if (matchingRows.length === 0) {
        console.log("Brak pytań dla wybranej kategorii.");
        return;
      }

      // Pick a random row
      const row = matchingRows[Math.floor(Math.random() * matchingRows.length)];

      // Assign question/answers
      correctAnswer = row[colAnswer]?.trim();
      question = row[colQuestion]?.trim();
      optionAText = row[optionA]?.trim();
      optionBText = row[optionB]?.trim();
      optionCText = row[optionC]?.trim();

      userAnswer = null;

      resetButtons();

      // Display question/options
      document.getElementById("csvQuestion").textContent = question ?? "N/A";

      // Debug (Do not remove)
      // console.log("Selected Row:", row); 
      // console.log("Question:", question); 
      // console.log("Correct Answer:", correctAnswer); 
      // console.log("Option A:", optionAText); 
      // console.log("Option B:", optionBText); 
      // console.log("Option C:", optionCText); 

      if (optionAText) {
        document.getElementById("optionA").textContent = "A. " + optionAText;
        document.getElementById("optionB").textContent = "B. " + optionBText;
        document.getElementById("optionC").textContent = "C. " + optionCText;
        document.getElementById("optionA").style.display = "block";
        document.getElementById("optionB").style.display = "block";
        document.getElementById("optionC").style.display = "block";
      } else {
        document.getElementById("optionT").textContent = "Tak";
        document.getElementById("optionN").textContent = "Nie";
        document.getElementById("optionT").style.display = "block";
        document.getElementById("optionN").style.display = "block";
      }

      // Media handling
      const videoSource = document.getElementById("csvVideo");
      const imageSource = document.getElementById("csvImage");

      videoSource.parentElement.style.display = "none";
      imageSource.style.display = "none";

      const fileName = (row[colFile] ?? "").trim();
      if (!fileName) return;

      const extension = fileName.split('.').pop().toLowerCase();

      if (extension === 'mp4') {
        videoSource.onerror = () => {
          videoSource.parentElement.setAttribute("poster", "https://placehold.co/640x360?text=Błąd+wideo");
          videoSource.parentElement.removeAttribute("controls");
        };
        videoSource.src = `Pytania egzaminacyjne na prawo jazdy/filmy_mp4/${fileName}`;
        videoSource.parentElement.style.display = "block";
        videoSource.parentElement.load();
      } else if (extension === 'jpg' || extension === 'jpeg') {
        imageSource.onerror = () => imageSource.src = "https://placehold.co/640x360?text=Błąd+obrazu";
        imageSource.src = `Pytania egzaminacyjne na prawo jazdy/zdjęcia/${fileName}`;
        imageSource.style.display = "block";
      } else {
        videoSource.src = "";
        videoSource.parentElement.style.display = "none";
        imageSource.src = "";
        imageSource.style.display = "none";
      }
      // Debug (Do not remove)
      // console.log("File Name:", fileName);
    },
    error: function(err) {
      console.error("Error parsing CSV:", err);
      document.getElementById("csvQuestion").textContent = "Error loading CSV";
    }
  });
}

function resetButtons() {
  buttons.forEach(id => {
    const btn = document.getElementById(id);
    btn.style.backgroundColor = '';
    btn.style.cursor = '';
    btn.style.display = 'none';
    btn.disabled = false;
  });
}

function selectedAnswer(answer) {
  userAnswer = answer;
  totalAnswerCount++;
  buttons.forEach(id => {
    document.getElementById(id).disabled = true;
  });
  // console.log("Selected Answer:", answer);
  if (userAnswer == correctAnswer) {
    correctAnswerCount++;
    // console.log("Correct Answers Count:", correctAnswerCount);
  }
}

function resetStats() {
  const confirmed = confirm("Czy na pewno chcesz usunąć wszystkie statystyki?");
  if (!confirmed) return;
  
  localStorage.removeItem('correctAnswerCount');
  localStorage.removeItem('totalAnswerCount');
  location.reload();
}

function showAnswer() {
  // document.getElementById("csvAnswer").style.display = "block";
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
  document.getElementById("optionA").style.cursor = "not-allowed";
  document.getElementById("optionB").style.cursor = "not-allowed";
  document.getElementById("optionC").style.cursor = "not-allowed";
  document.getElementById("optionT").style.cursor = "not-allowed";
  document.getElementById("optionN").style.cursor = "not-allowed";
  localStorage.setItem('correctAnswerCount', correctAnswerCount);
  localStorage.setItem('totalAnswerCount', totalAnswerCount);
  document.getElementById("correctAnswerNumber").textContent = "Poprawne: " + correctAnswerCount;
  document.getElementById("totalAnswerNumber").textContent = "Wszystkie: " + totalAnswerCount;
  document.getElementById("wrongAnswerNumber").textContent = "Błędne: " + (totalAnswerCount - correctAnswerCount);
}

loadNewQuestion();
document.getElementById("correctAnswerNumber").textContent = "Poprawne: " + correctAnswerCount;
document.getElementById("totalAnswerNumber").textContent = "Wszystkie: " + totalAnswerCount;
document.getElementById("wrongAnswerNumber").textContent = "Błędne: " + (totalAnswerCount - correctAnswerCount);