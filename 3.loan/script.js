let totalAmount1 = 0;
let totalAmount2 = 0;
let nickname1 = "";
let nickname2 = "";


// // 項目の追加ページのJavaScript
// const itemInput1 = document.getElementById("item1");
// const itemInput2 = document.getElementById("item2");

// itemInput1.addEventListener("focus", function() {
//   // ユーザー1のニックネームを取得して入力フィールドに設定
//   const nickname = getNickname(1);
//   itemInput1.value = nickname;
// });

// itemInput2.addEventListener("focus", function() {
//   // ユーザー2のニックネームを取得して入力フィールドに設定
//   const nickname = getNickname(2);
//   itemInput2.value = nickname;
// });


// ニックネーム入力フィールドを無効にする関数
function disableNicknameInput(user) {
  const nameInput = document.getElementById(`name${user}`);
  nameInput.disabled = true;
}

// ニックネームを取得
function getNickname(user) {
  const storedNickname = localStorage.getItem(`nickname${user}`);
  if (storedNickname) {
    return storedNickname;
  }
  return "";
}

// ニックネームを設定
function setNickname(user, nickname) {
  localStorage.setItem(`nickname${user}`, nickname);
}

// アイテム候補を取得
function getItemSuggestions(user) {
  const storedItems = localStorage.getItem(`items${user}`);
  if (storedItems) {
    return JSON.parse(storedItems);
  }
  return [];
}

// アイテム候補を設定
function setItemSuggestions(user, items) {
  localStorage.setItem(`items${user}`, JSON.stringify(items));
}

// ページ読み込み時にニックネームとアイテム候補を取得
document.getElementById("name1").value = getNickname(1);
document.getElementById("name2").value = getNickname(2);

// ページ読み込み時にアイテム候補を自動補完に設定
const itemInput1 = document.getElementById("item1");
const itemInput2 = document.getElementById("item2");
itemInput1.setAttribute("list", "itemSuggestions1");
itemInput2.setAttribute("list", "itemSuggestions2");

// アイテム候補を取得し、自動補完のデータリストに設定
const itemSuggestions1 = getItemSuggestions(1);
const itemSuggestions2 = getItemSuggestions(2);

const dataList1 = document.getElementById("itemSuggestions1");
const dataList2 = document.getElementById("itemSuggestions2");

itemSuggestions1.forEach((item) => {
  const option = document.createElement("option");
  option.value = item;
  dataList1.appendChild(option);
});

itemSuggestions2.forEach((item) => {
  const option = document.createElement("option");
  option.value = item;
  dataList2.appendChild(option);
});

const previousAmounts = {};

function addItem(user) {
  const nameInput = document.getElementById(`name${user}`);
  const itemInput = document.getElementById(`item${user}`);
  const amountInput = document.getElementById(`amount${user}`);
  const differenceElement1 = document.getElementById("difference1");
  const differenceElement2 = document.getElementById("difference2");

  const name = nameInput.value.trim();
  const item = itemInput.value.trim();
  const amount = parseInt(amountInput.value);

  if (name !== "" && item !== "" && !isNaN(amount)) {
    // ニックネームを設定
    setNickname(user, name);

    // アイテム候補を保存
    const itemSuggestions = getItemSuggestions(user);
    if (!itemSuggestions.includes(item)) {
      itemSuggestions.push(item);
      setItemSuggestions(user, itemSuggestions);
    }

    // 以前の金額を取得して設定
    if (previousAmounts[item]) {
      amountInput.value = previousAmounts[item];
    } else {
      previousAmounts[item] = amount;
    }
    const itemList = document.getElementById(`itemList${user}`);
    const listItem = document.createElement("li");

    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateText = currentDate.toLocaleDateString('ja-JP', options);

    listItem.innerHTML = `
      項目: ${item} - 金額: ¥${amount.toLocaleString()}: ${dateText}
      <button onclick="removeItem(this, ${amount}, ${user})">削除</button>
    `;
    itemList.appendChild(listItem);

    if (user === 1) {
      totalAmount1 += amount;
      updateTotalAmount(user);
      if (nickname1 === "") {
        nickname1 = name;
      }
      document.getElementById("dateInfo1").textContent = `最終追加日付: ${dateText}`;
    } else if (user === 2) {
      totalAmount2 += amount;
      updateTotalAmount(user);
      if (nickname2 === "") {
        nickname2 = name;
      }
      document.getElementById("dateInfo2").textContent = `最終追加日付: ${dateText}`;
    }

    const difference = totalAmount1 - totalAmount2;
    differenceElement1.textContent = `差額: ¥${difference.toLocaleString()}`;
    differenceElement2.textContent = `差額: ¥${(-difference).toLocaleString()}`;

    nameInput.value = "";
    itemInput.value = "";
    amountInput.value = "";
  }
}

function removeItem(button, amount, user) {
  const listItem = button.parentNode;
  listItem.parentNode.removeChild(listItem);

  if (user === 1) {
    totalAmount1 -= amount;
    updateTotalAmount(user);
  } else if (user === 2) {
    totalAmount2 -= amount;
    updateTotalAmount(user);
  }

  const difference = totalAmount1 - totalAmount2;
  const differenceElement1 = document.getElementById("difference1");
  const differenceElement2 = document.getElementById("difference2");
  differenceElement1.textContent = `差額: ¥${difference.toLocaleString()}`;
  differenceElement2.textContent = `差額: ¥${(-difference).toLocaleString()}`;
}

function updateTotalAmount(user) {
  const totalAmountElement = document.getElementById(`totalAmount${user}`);
  if (user === 1) {
    totalAmountElement.textContent = `合計金額: ¥${totalAmount1.toLocaleString()}`;
  } else if (user === 2) {
    totalAmountElement.textContent = `合計金額: ¥${totalAmount2.toLocaleString()}`;
  }
}

function calculateTotalAmount(user) {
  const itemList = document.getElementById(`itemList${user}`);
  const amountInputs = itemList.querySelectorAll("li input[type='number']");
  let totalAmount = 0;

  amountInputs.forEach((input) => {
    totalAmount += parseInt(input.value) || 0;
  });

  const totalAmountElement = document.getElementById(`totalAmount${user}`);
  totalAmountElement.textContent = `合計金額: ¥${totalAmount}`;
}