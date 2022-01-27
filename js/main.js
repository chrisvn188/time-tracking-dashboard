const dashboard = document.querySelector('.dashboard');
const cards = document.querySelectorAll('.card');

async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

const tabs = document.querySelectorAll('.header__tab');
tabs.forEach(tab =>
  tab.addEventListener('click', e => {
    // remove all active tab
    tabs.forEach(tab => tab.classList.remove('active'));

    // set active tab when tab clicked, then load content of the tab
    tab.classList.add('active');
    loadContent(tab);
  })
);

// load content based on current active tab
function loadContent(tab) {
  cards.forEach((card, index) => {
    const cardBigText = card.querySelector('.card__big-text');
    const cardSmallText = card.querySelector('.card__small-text');

    getData('../data.json').then(data => {
      const currentTime = data[index].timeframes[tab.dataset.tab].current;
      const previousTime = data[index].timeframes[tab.dataset.tab].previous;

      cardBigText.innerHTML = `${currentTime}hrs`;

      if (tab.dataset.tab === 'daily') {
        cardSmallText.innerHTML = `Yesterday - ${previousTime}hrs`;
      }

      if (tab.dataset.tab === 'weekly') {
        cardSmallText.innerHTML = `Last Week - ${previousTime}hrs`;
      }

      if (tab.dataset.tab === 'monthly') {
        cardSmallText.innerHTML = `Last Month - ${previousTime}hrs`;
      }
    });
  });
}

// load default content when DOM loaded
const weeklyTab = document.querySelector('[data-tab="weekly"]');
function loadDefaultContent() {
  weeklyTab.classList.add('active');
  loadContent(weeklyTab);
}
document.addEventListener('DOMContentLoaded', loadDefaultContent);
