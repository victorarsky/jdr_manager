document.addEventListener('DOMContentLoaded', (event) => {
    const rollDiceBtn = document.getElementById('roll-dice-btn');
    const diceResultsDiv = document.getElementById('dice-results');

    rollDiceBtn.addEventListener('click', () => {
        // Exemple de lancer de dés (vous pouvez ajuster la logique selon les besoins du jeu)
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        diceResultsDiv.innerHTML = `<p>Vous avez roulé un ${diceRoll}</p>`;
    });

    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Exemple de logique pour les boutons d'option
            button.classList.toggle('active');
        });
    });
});
