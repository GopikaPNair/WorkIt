function startApp() {
  if (window.electronAPI) {
    try {
      window.electronAPI.navigateToTasks();
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = 'tasks.html';
    }
  } else {
    console.log('Start button clicked - would navigate to tasks.html');
    window.location.href = 'tasks.html';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Date Box Setup
  const now = new Date();
  const options = { weekday: 'long', month: 'long' };
  document.getElementById('dayName').textContent = now.toLocaleDateString('en-US', { weekday: 'long' });
  document.getElementById('dateNumber').textContent = now.getDate();
  document.getElementById('monthName').textContent = now.toLocaleDateString('en-US', { month: 'long' });

  // Task + Progress Logic
  const input = document.getElementById('taskInput');
  const addBtn = document.getElementById('addTaskBtn');
  const list = document.getElementById('taskList');
  const progressBar = document.getElementById('progressBar');

  let totalTasks = 0;
  let completedTasks = 0;

  function updateProgress() {
    if (totalTasks === 0) {
      progressBar.style.width = '0%';
    } else {
      const percentage = (completedTasks / totalTasks) * 100;
      progressBar.style.width = `${percentage}%`;
    }
  }

  addBtn.addEventListener('click', () => {
    const task = input.value.trim();
    if (task !== '') {
      const li = document.createElement('li');
      li.textContent = task;
      li.style.cursor = 'pointer';

      li.addEventListener('click', () => {
        li.style.textDecoration = 'line-through';
        li.style.opacity = '0.6';
        completedTasks++;
        updateProgress();
      });

      list.appendChild(li);
      totalTasks++;
      input.value = '';
      updateProgress();
    }
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addBtn.click();
    }
  });
});
