function setupTabSwitching() {
  const menuItems = document.querySelectorAll('.menu-link');
  const tabs = document.querySelectorAll('.tab');

  menuItems[0].classList.add('active');
  tabs[0].classList.add('active');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('target');
      toggleActiveStateOnMenuItem(targetId);
      toggleTabVisibility(targetId);
    });
  });

}

function toggleActiveStateOnMenuItem(targetId) {
  const menuItems = document.querySelectorAll('.menu-link');
  menuItems.forEach(item => {
    item.classList.remove('active');
  });
  
  const current = document.querySelector("[target=" + targetId + "]");
  current.classList.toggle('active');
}

function toggleTabVisibility(targetId) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  
  const current = document.getElementById(targetId)
  current.classList.toggle('active');
}

export {setupTabSwitching, toggleActiveStateOnMenuItem, toggleTabVisibility}
