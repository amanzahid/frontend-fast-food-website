const updateList = (dataItems) => {
    dataItems.forEach((dataItem) => {
        const article = document.createElement("article");
        const img = document.createElement("img");
        const description = document.createElement("div");
        const title = document.createElement("h3");
        const items = document.createElement("ul");
        const price = document.createElement("h3");
        const orderBtn = document.createElement("a");
        const menuItemHeadDiv = document.createElement("div");

        article.className = offersListDiv
            ? "offer no-select"
            : "menu-item no-select";
        img.className = offersListDiv ? "offer-img" : "menu-item-img";
        img.setAttribute("src", dataItem.img.src);
        img.setAttribute("alt", dataItem.img.alt);
        description.className = offersListDiv
            ? "offer-description"
            : "menu-item-description";
        title.className = offersListDiv ? "offer-title" : "menu-item-title";
        title.textContent = offersListDiv ? dataItem.title : dataItem.name;
        items.className = offersListDiv
            ? "offer-items"
            : "menu-item-ingredients";
        price.className = offersListDiv ? "offer-price" : "menu-item-price";
        price.textContent = "$" + dataItem.price;
        orderBtn.className = "order-now";
        orderBtn.textContent = "Add to Cart";

        let listItems = offersListDiv ? dataItem.items : dataItem.ingredients;
        listItems.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.className = offersListDiv
                ? "offer-item"
                : "menu-item-ingredient";
            listItem.textContent = offersListDiv ? item.title : item;
            items.appendChild(listItem);
        });

        if (menuListDiv) {
            menuItemHeadDiv.classList.add("menu-item-head");
            menuItemHeadDiv.appendChild(title);
            menuItemHeadDiv.appendChild(items);
            description.appendChild(menuItemHeadDiv);
        } else {
            description.appendChild(title);
            description.appendChild(items);
        }
        description.appendChild(price);
        description.appendChild(orderBtn);
        article.appendChild(img);
        article.appendChild(description);

        offersListDiv
            ? offersListDiv.appendChild(article)
            : menuListDiv.appendChild(article);
    });
};

const updateListItems = (el, pageMode) => {
    el.classList.add("active");
    let listItems = pageMode == "offers" ? offers : menu;
    let catClass = el.classList[1];
    let category = catClass.substr(0, catClass.length - 4);
    if (category == "all-offers" || category == "all-menu") {
        filteredItemsList = listItems;
    } else {
        filteredItemsList = listItems.filter(
            (item) => item.category == category
        );
    }
    updateList(filteredItemsList);
};

const catBtnClickHandler = (e) => {
    let pageMode;
    if (offersListDiv) {
        offersListDiv.innerHTML = "";
        pageMode = "offers";
    } else {
        menuListDiv.innerHTML = "";
        pageMode = "menu";
    }
    catItems.forEach((item) => {
        item.classList.remove("active");
    });
    updateListItems(e.target, pageMode);
};

document.addEventListener("DOMContentLoaded", () => {
    if (offersListDiv) {
        offersListDiv.innerHTML = "";
        updateList(offers);
    } else {
        menuListDiv.innerHTML = "";
        updateList(menu);
    }
});

catItems.forEach((item) => {
    item.addEventListener("click", catBtnClickHandler);
});
