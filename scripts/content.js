const JIRA_DOMAIN = '<YOUR_JIRA_DOMAIN>';
const SUM_BADGE_ID = 'sum-badge';

function renderBadge(content) {
  const sumBadge = document.querySelector(`#${SUM_BADGE_ID}`)
  if (!!sumBadge) {
    sumBadge.textContent = content;
    return;
  } 

  const badge = document.createElement('p');
  // Use the same styling as the publish information in an article's header
  badge.id = 'sum-badge';
  badge.style.position = 'fixed';
  badge.style.bottom = '0';
  badge.style.right = '0';
  badge.style.backgroundColor = 'green';
  badge.style.fontSize = '1.5rem';
  badge.style.padding = '0.5rem';
  badge.style.color = 'white';
  badge.textContent = content;

  document.body.insertAdjacentElement('afterend', badge);
}

document.onclick = function () {
  if (document.location.hostname !== JIRA_DOMAIN) return;

  const selectedIssues = document.querySelectorAll('.js-issue.ghx-selected .ghx-statistic-badge');

  if (selectedIssues.length > 1) {
    let sum = 0;
    selectedIssues.forEach((issue) => {
      parseFloat(issue.textContent) ? sum += parseFloat(issue.textContent) : null;
    });
  
    renderBadge(`sum = ${sum.toFixed(1)}`);
  }
};
