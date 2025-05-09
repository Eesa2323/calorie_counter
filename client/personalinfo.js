document.addEventListener('DOMContentLoaded', function() {
  const userDataJSON = localStorage.getItem('userSetupData');
  const userAuthJSON = localStorage.getItem('userAuthData');

  if (userDataJSON) {
    const userData = JSON.parse(userDataJSON);

    // Set textboxes
    document.getElementById('age').value = userData.age;
    document.getElementById('current-weight').value = userData.currentWeight;
    document.getElementById('height').value = userData.height;

    // Set gender
    if (userData.gender.toLowerCase() === "male") {
      document.getElementById('male').checked = true;
    } else if (userData.gender.toLowerCase() === "female") {
      document.getElementById('female').checked = true;
    }

    // Set goal (based on current weight vs target weight)
    const current = parseFloat(userData.currentWeight);
    const target = parseFloat(userData.targetWeight);

    if (current > target) {
      document.getElementById('lose-weight').checked = true;
    } else if (current < target) {
      document.getElementById('gain-weight').checked = true;
    } else {
      document.getElementById('maintain-weight').checked = true;
    }
  } else {
    console.log("No user setup data found.");
  }

  if (userAuthJSON) {
    const userAuth = JSON.parse(userAuthJSON);

    document.getElementById('user-username').textContent = userAuth.username || "User";
    document.getElementById('user-email').textContent = userAuth.email || "No Email";
  }

  // BMI calculation
  function calculateBMI() {
    const userSetupData = JSON.parse(localStorage.getItem('userSetupData') || '{}');

    const weight = parseFloat(userSetupData.currentWeight);
    let heightString = userSetupData.height;

    if (weight && heightString) {
      heightString = heightString.replace(/[^0-9']/g, '');
      const heightParts = heightString.match(/(\d+)'(\d+)/);

      if (heightParts) {
        const feet = parseInt(heightParts[1] || 0);
        const inches = parseInt(heightParts[2] || 0);
        const totalInches = (feet * 12) + inches;
        const heightInMeters = totalInches * 0.0254;

        const bmi = weight / (heightInMeters * heightInMeters);

        let displayedBMI = 0;
        const targetBMI = bmi.toFixed(1);
        const targetPosition = Math.min(bmi, 40) / 40 * Math.PI + Math.PI;

        let frame = 0;
        const totalFrames = 60;

        const canvas = document.getElementById('bmi-graph');
        const ctx = canvas.getContext('2d');

        const sections = [16, 17, 18.5, 25, 30, 35, 40];
        const colors = ['#9b59b6', '#8e44ad', '#3498db', '#00b90f', '#f39c12', '#e67e22', '#e74c3c'];

        let startAngle = Math.PI;
        const fullSpan = Math.PI;

        function drawGraph() {
          ctx.clearRect(0, 0, 300, 150);
          startAngle = Math.PI;
          sections.forEach((limit, index) => {
            const prev = index > 0 ? sections[index - 1] : 0;
            const range = limit - prev;
            const arcLength = fullSpan * (range / 40);
            ctx.beginPath();
            ctx.arc(150, 150, 120, startAngle, startAngle + arcLength);
            ctx.lineWidth = 20;
            ctx.strokeStyle = colors[index];
            ctx.stroke();
            startAngle += arcLength;
          });
        }

        drawGraph();

        let color = '#00b90f';
        if (bmi < 16) color = '#9b59b6';
        else if (bmi < 17) color = '#8e44ad';
        else if (bmi < 18.5) color = '#3498db';
        else if (bmi < 25) color = '#00b90f';
        else if (bmi < 30) color = '#f39c12';
        else if (bmi < 35) color = '#e67e22';
        else color = '#e74c3c';

        document.getElementById('bmi-value').style.color = color;

        const animate = setInterval(() => {
          frame++;
          const progress = frame / totalFrames;

          displayedBMI = (targetBMI * progress);
          const currentPosition = Math.PI + (progress * (targetPosition - Math.PI));

          drawGraph();

          ctx.beginPath();
          ctx.moveTo(150, 150);
          ctx.lineTo(150 + 100 * Math.cos(currentPosition), 150 + 100 * Math.sin(currentPosition));
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 4;
          ctx.stroke();

          document.getElementById('bmi-value').textContent = displayedBMI.toFixed(1);

          if (frame >= totalFrames) {
            clearInterval(animate);

            let category = '';
            let activity = '';
            if (bmi < 16) {
              category = 'Severe Thinness';
              activity = 'Consult a health professional';
            } else if (bmi < 17) {
              category = 'Moderate Thinness';
              activity = 'Exercise 1-2 times/week';
            } else if (bmi < 18.5) {
              category = 'Mild Thinness';
              activity = 'Exercise 1-3 times/week';
            } else if (bmi < 25) {
              category = 'Normal';
              activity = 'Exercise 4-5 times/week';
            } else if (bmi < 30) {
              category = 'Overweight';
              activity = 'Exercise 5-6 times/week';
            } else if (bmi < 35) {
              category = 'Obese Class I';
              activity = 'Daily moderate exercise';
            } else if (bmi < 40) {
              category = 'Obese Class II';
              activity = 'Daily intense exercise';
            } else {
              category = 'Obese Class III';
              activity = 'Very intense supervised activity';
            }

            document.getElementById('bmi-category').textContent = category;
            document.getElementById('activity-level').textContent = 'Activity Level: ' + activity;
          }
        }, 15);

      } else {
        document.getElementById('bmi-value').textContent = '--';
        document.getElementById('bmi-category').textContent = 'Missing Data';
        document.getElementById('activity-level').textContent = 'Activity Level: --';
      }
    } else {
      document.getElementById('bmi-value').textContent = '--';
      document.getElementById('bmi-category').textContent = 'Missing Data';
      document.getElementById('activity-level').textContent = 'Activity Level: --';
    }
  }

  document.querySelector('.calculate-btn').addEventListener('click', function(event) {
    event.preventDefault();

    // Save updated form data first
    const updatedUserData = {
      age: document.getElementById('age').value,
      currentWeight: document.getElementById('current-weight').value,
      height: document.getElementById('height').value,
      gender: document.getElementById('male').checked ? 'male' : 'female'
    };
    localStorage.setItem('userSetupData', JSON.stringify(updatedUserData));

    // Then run BMI calculation
    calculateBMI();
  });
});
