document.addEventListener('DOMContentLoaded', () => {
    const selectedActionsContainer = document.getElementById('selected-actions');
    const executeActionsBtn = document.getElementById('execute-actions-btn');
    let maxActionsPerTurn = 2; // Valeur de base des actions par tour

    document.querySelectorAll('.select-action-btn').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            addActionToTurn(action);
        });
    });

    executeActionsBtn.addEventListener('click', executeActions);

    function addActionToTurn(action) {
        const currentActions = selectedActionsContainer.querySelectorAll('.action-btn');
        const additionalActions = getAdditionalActions();
        const totalAllowedActions = maxActionsPerTurn + additionalActions;

        if (currentActions.length >= totalAllowedActions) {
            alert(`Vous ne pouvez sélectionner que ${totalAllowedActions} actions par tour.`);
            return;
        }

        const actionBtn = document.createElement('button');
        actionBtn.className = 'action-btn';
        actionBtn.textContent = action;
        actionBtn.addEventListener('click', () => {
            selectedActionsContainer.removeChild(actionBtn);
        });

        selectedActionsContainer.appendChild(actionBtn);
    }

    function getAdditionalActions() {
        let additionalActions = 0;
        const selectedCapabilities = document.querySelectorAll('.capabilities-list input[type="checkbox"]:checked');
        
        selectedCapabilities.forEach(capability => {
            const chargesElement = document.getElementById(`charges-${capability.id}`);
            let charges = parseInt(chargesElement.textContent);

            if (charges > 0) {
                if (capability.id === 'capability1') {
                    additionalActions += 1; // Ajoute une action supplémentaire pour "Fougue"
                }
            } else {
                capability.checked = false; // Désélectionner la capacité si elle n'a plus de charges
                alert(`${capability.labels[0].innerText} n'a plus de charges.`);
            }
        });

        return additionalActions;
    }

    function executeActions() {
        const selectedActions = Array.from(selectedActionsContainer.querySelectorAll('.action-btn')).map(btn => btn.textContent);
        let results = [];
        let damageResults = [];

        selectedActions.forEach(action => {
            const d20Result = rollD20();
            let damageResult;

            if (d20Result === 20) {
                damageResult = rollCriticalDamageDice();
            } else {
                damageResult = rollDamageDice();
            }

            const selectedCapabilities = document.querySelectorAll('.capabilities-list input[type="checkbox"]:checked');
            selectedCapabilities.forEach(capability => {
                const capabilityId = capability.id;
                const chargesElement = document.getElementById(`charges-${capabilityId}`);
                let charges = parseInt(chargesElement.textContent);

                if (charges > 0) {
                    charges--;
                    chargesElement.textContent = charges;

                    if (capabilityId === 'capability1') {
                        damageResult = modifyResultsForCapability1(damageResult);
                    } else if (capabilityId === 'capability2') {
                        damageResult = modifyResultsForCapability2(damageResult);
                    }
                    // Ajoutez d'autres modifications en fonction des capacités
                } else {
                    capability.checked = false; // Désélectionner la capacité si elle n'a plus de charges
                    alert(`${capability.labels[0].innerText} n'a plus de charges.`);
                }
            });

            results.push(d20Result);
            damageResults.push(damageResult);
        });

        displayResults(results, damageResults);
        clearSelectedActions(); // Clear the selected actions after execution
    }

    function rollD20() {
        return Math.floor(Math.random() * 20) + 1;
    }

    function rollDamageDice() {
        const d6Roll1 = Math.floor(Math.random() * 6) + 1;
        const d6Roll2 = Math.floor(Math.random() * 6) + 1;
        return d6Roll1 + d6Roll2 + 7; // 2d6 + 5 + 2
    }

    function rollCriticalDamageDice() {
        const d6Roll1 = Math.floor(Math.random() * 6) + 1;
        const d6Roll2 = Math.floor(Math.random() * 6) + 1;
        const d6Roll3 = Math.floor(Math.random() * 6) + 1;
        const d6Roll4 = Math.floor(Math.random() * 6) + 1;
        return d6Roll1 + d6Roll2 + d6Roll3 + d6Roll4 + 7; // 4d6 + 14
    }

    function modifyResultsForCapability1(damageResult) {
        // Modifier les résultats pour Capacité 1
        return damageResult + 2; // Par exemple, augmente les dégâts
    }

    function modifyResultsForCapability2(damageResult) {
        // Modifier les résultats pour Capacité 2
        return damageResult * 2; // Par exemple, double les dégâts
    }

    function displayResults(results, damageResults) {
        const resultsContainer = document.getElementById('dice-results');
        resultsContainer.innerHTML = results.map((result, index) => 
            `Action ${index + 1}: Résultat d20 = ${result}, Dégâts = ${damageResults[index]}`
        ).join('<br>');
    }

    function clearSelectedActions() {
        while (selectedActionsContainer.firstChild) {
            selectedActionsContainer.removeChild(selectedActionsContainer.firstChild);
        }
    }
});
