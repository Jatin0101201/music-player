let projects = [];

function createProject() {
  const title = document.getElementById('projectTitle').value;
  const description = document.getElementById('projectDesc').value;
  const goal = parseFloat(document.getElementById('fundingGoal').value);

  if (!title || !description || isNaN(goal)) {
    alert('Please fill out all fields.');
    return;
  }

  const project = {
    title,
    description,
    goal,
    raised: 0
  };

  projects.push(project);
  renderProjects();

  // Clear form
  document.getElementById('projectTitle').value = '';
  document.getElementById('projectDesc').value = '';
  document.getElementById('fundingGoal').value = '';
}

function contribute(index) {
  const amount = parseFloat(prompt('Enter contribution amount (INR):'));
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  projects[index].raised += amount;
  renderProjects();
}

function renderProjects() {
  const projectList = document.getElementById('projects');
  projectList.innerHTML = '';

  projects.forEach((project, index) => {
    const percent = Math.min((project.raised / project.goal) * 100, 100).toFixed(2);

    const projectHTML = `
      <div class="project">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p><strong>Goal:</strong> ₹${project.goal}</p>
        <p><strong>Raised:</strong> ₹${project.raised}</p>
        <div class="progress">
          <div class="progress-bar" style="width: ${percent}%">${percent}%</div>
        </div>
        <button onclick="contribute(${index})">Contribute</button>
      </div>
    `;

    projectList.innerHTML += projectHTML;
  });
}
