
    window.addEventListener("load", () => {
      const preloader = document.getElementById("preloader");
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
      }, 1500);
    });

const nowAtInit = new Date();
const targetDate = new Date(nowAtInit);
targetDate.setHours(10, 0, 0, 0);
if (nowAtInit >= targetDate) {
  targetDate.setDate(targetDate.getDate() + 1);
}
const totalTime = targetDate - nowAtInit;
let confettiActive = false;
    function updateCountdown(){
      const now = new Date().getTime();
      const distance = targetDate - now;
      const progress = ((totalTime - distance) / totalTime) * 100;

      document.getElementById("progress").style.width = Math.min(progress, 100) + '%';

      if(distance <= 0){
        document.querySelector(".countdown").innerHTML = "<h2 style='color: var(--accent); text-shadow: 0 0 20px rgba(255, 78, 125, 0.7); padding: 20px;'><i class='fas fa-trophy'></i> Result is Live! <i class='fas fa-trophy'></i></h2>";
        document.querySelector(".floating-text").style.display = "none";
        document.getElementById("progress").style.width = '100%';
        
        if (!confettiActive) {
          createConfetti();
          confettiActive = true;
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days").innerText = days.toString().padStart(2, '0');
      document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
      document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
      document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }

    function createConfetti() {
      const colors = ['#00e0ff', '#ffb347', '#ff4e7d', '#ffffff', '#c0c0c0', '#ffff00'];
      
      for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        document.body.appendChild(confetti);
        
        // Add animation
        setTimeout(() => {
          confetti.style.opacity = '1';
          confetti.style.transform = `translateY(100vh) rotate(${Math.random() * 720}deg)`;
        }, 10);
        
        // Remove after animation
        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }, 5000);
      }
      
      // Add celebration text
      const celebration = document.createElement('div');
      celebration.innerHTML = '<h2 style="color: var(--accent); position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: clamp(1.5rem, 5vw, 2.5rem); text-shadow: 0 0 20px rgba(255, 78, 125, 0.7); z-index: 100; text-align: center; padding: 20px; background: rgba(0, 0, 0, 0.7); border-radius: 20px; backdrop-filter: blur(10px);">🎉 Results Are Out! 🎉<br><span style="font-size: clamp(0.8rem, 2.5vw, 1rem);">Check the official website now</span></h2>';
      document.body.appendChild(celebration);
      
      setTimeout(() => {
        if (celebration.parentNode) {
          celebration.parentNode.removeChild(celebration);
        }
      }, 5000);
    }

    // Share functionality - copy URL to clipboard
    document.getElementById('shareBtn').addEventListener('click', () => {
      // Copy URL to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          // Create and show custom popup notification
          const notification = document.createElement('div');
          notification.textContent = 'Link copied to clipboard!';
          notification.style.position = 'fixed';
          notification.style.bottom = '20px';
          notification.style.left = '50%';
          notification.style.transform = 'translateX(-50%)';
          notification.style.backgroundColor = 'rgba(0, 224, 255, 0.9)';
          notification.style.color = 'white';
          notification.style.padding = '15px 30px';
          notification.style.borderRadius = '50px';
          notification.style.zIndex = '1000';
          notification.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
          notification.style.fontWeight = '600';
          notification.style.backdropFilter = 'blur(5px)';
          notification.style.animation = 'fadeIn 0.5s ease forwards';
          notification.style.fontSize = 'clamp(0.9rem, 3vw, 1.1rem)';
          
          document.body.appendChild(notification);
          
          // Remove notification after 3 seconds
          setTimeout(() => {
            notification.style.animation = 'fadeIn 0.5s ease reverse forwards';
            setTimeout(() => {
              if (notification.parentNode) {
                document.body.removeChild(notification);
              }
            }, 500);
          }, 3000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          alert('Failed to copy URL to clipboard. Please try again.');
        });
    });
    
    // Results Site functionality
    document.getElementById('resultsBtn').addEventListener('click', () => {
      window.open("https://itkhaver.com", "_blank");
    });

    setInterval(updateCountdown, 1000);
    updateCountdown();