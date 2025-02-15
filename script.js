document.addEventListener("DOMContentLoaded", function() {
    const resources = ["Ovce", "Skale", "Gozd", "Opeka", "Žito"];
    const minEach = 1;
    const maxEach = 10;
    let sliders = {};
    
    const sizeValue = document.getElementById("island-size-value");
    const container = document.getElementById("island-setup");
    
    function generateSliders() {
        container.innerHTML = "";
        sliders = {};
        resources.forEach(resource => {
            let div = document.createElement("div");
            div.innerHTML = `<label>${resource}: <span id="${resource}-value">1</span></label>
                            <input type="range" id="${resource}" min="${minEach}" max="${maxEach}" value="1">`;
            container.appendChild(div);
            sliders[resource] = div.querySelector("input");
        });
        
        Object.values(sliders).forEach(slider => {
            slider.addEventListener("input", function() {
                document.getElementById(`${this.id}-value`).textContent = this.value;
                updateIslandSize();
            });
        });
        
        updateIslandSize();
    }
    
    function updateIslandSize() {
        let counts = resources.map(res => parseInt(sliders[res].value));
        let total = counts.reduce((sum, val) => sum + val, 0);
        sizeValue.textContent = total;
        calculateCombinations(total, counts);
    }
    
    function calculateCombinations(total, counts) {
        function factorial(n) {
            return n <= 1 ? 1 : n * factorial(n - 1);
        }
        
        let numerator = factorial(total);
        let denominator = counts.map(factorial).reduce((a, b) => a * b, 1);
        let combinations = numerator / denominator;
        
        document.getElementById("result").textContent = combinations.toLocaleString();
    }
    
    generateSliders();
});