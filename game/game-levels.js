function nextLevel() {
    if (score >= 20) {
        clearInterval(fallingElementsGeneratorIntervalId);
        clearInterval(fallingElementsIntervalId);
        removeActiveClass();
        removeAllPoints();
    }
    
}