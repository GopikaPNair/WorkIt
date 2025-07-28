function startApp() {
  // Check if we're in Electron environment
  if (window.electronAPI) {
    try {
      window.electronAPI.navigateToTasks();
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to browser behavior if Electron API fails
      window.location.href = 'tasks.html';
    }
  } else {
    // Fallback for browser testing
    console.log('Start button clicked - would navigate to tasks.html');
    window.location.href = 'tasks.html';
  }
}

// Debugging
console.log('Start button handler loaded');