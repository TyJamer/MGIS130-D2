const affirmations = [
  "I am capable of achieving anything I set my mind to.",
  "I choose to focus on the positive and let go of what I cannot control.",
  "Every day is a fresh start and a new opportunity to grow.",
  "I am worthy of happiness, success, and love.",
  "My possibilities are endless and my potential is limitlessness.",
  "I trust myself and my ability to handle whatever comes my way.",
  "I radiate positivity, confidence, and strength."
];

const affirmationEl = document.getElementById("affirmation");
const newBtn = document.getElementById("new-btn");

function getRandomAffirmation() {
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  return affirmations[randomIndex];
}

newBtn.addEventListener("click", () => {
  affirmationEl.textContent = getRandomAffirmation();
});
    
            
       
        
        
   
           

            
    
               
       
        
      

        
                
   
