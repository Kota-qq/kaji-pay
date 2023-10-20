


// ページ読み込み時に保存された家事項目を読み込み
document.addEventListener("DOMContentLoaded", loadHouseworkItems);

// 家事項目の追加
function addHousework() {
  const houseworkNameInput = document.getElementById("houseworkName");
  const houseworkCostInput = document.getElementById("houseworkCost");
  const houseworkItemsList = document.getElementById("houseworkItems");

  const name = houseworkNameInput.value.trim();
  const cost = parseFloat(houseworkCostInput.value);

  if (name && !isNaN(cost)) {
    // 家事項目を表示
    const listItem = document.createElement("li");
    listItem.innerHTML = `${name} - 金額: ¥${cost.toLocaleString()}`;
    houseworkItemsList.appendChild(listItem);

    // 家事項目を保存
    saveHouseworkItem(name, cost);

    // 入力フィールドをクリア
    houseworkNameInput.value = "";
    houseworkCostInput.value = "";
  }
}

// 家事項目の保存
function saveHouseworkItem(name, cost) {
  // 家事項目を保存するロジックを実装（ローカルストレージまたはデータベースなどを使用）
  // ここではサンプルとしてコンソールに表示
  console.log(`家事名: ${name}, 金額: ¥${cost}`);
}

// 保存された家事項目を読み込み
function loadHouseworkItems() {
  // 保存された家事項目を読み込むロジックを実装（ローカルストレージまたはデータベースなどを使用）
  // ここではサンプルとしてコンソールに表示
  console.log("保存された家事項目を読み込み");
}