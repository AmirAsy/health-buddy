function searchTips(e) {
  const keyword = e.target.value.toLowerCase();

  const filtered = allTips.filter(tip =>
    tip.title.toLowerCase().includes(keyword) ||
    tip.category.toLowerCase().includes(keyword) ||
    tip.content.toLowerCase().includes(keyword)
  );

  renderTips(filtered);
}