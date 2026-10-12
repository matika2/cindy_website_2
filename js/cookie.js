var basketCookieName="basketCookie";
setBasketItemCount();
setAllItemCount();

function invalidateUnavailableItems(itemIDs) {
    var basketCookie = getBasketCookie();
    var basketCookieItemList = basketCookie.items;
    const excludeIDs = [];
    for(var i = 0; i < basketCookieItemList.length; i++) {
        if(!itemIDs.includes(basketCookieItemList[i].itemId)) {
            excludeIDs.push(basketCookieItemList[i].itemId);
        }
    }

    for(let i = 0; i < excludeIDs.length; i++) {
        removeFromBasketCookie(excludeIDs[i]);
    }

    setBasketItemCount();
    setAllItemCount();
}

function getCookie(name) {
    // Add the = sign
    name = name + '=';

    // Get the decoded cookie
    var decodedCookie = decodeURIComponent(document.cookie);

    // Get all cookies, split on ; sign
    var cookies = decodedCookie.split(';');

    // Loop over the cookies
    for (var i = 0; i < cookies.length; i++) {
        // Define the single cookie, and remove whitespace
        var cookie = cookies[i].trim();

        // If this cookie has the name of what we are searching
        if (cookie.indexOf(name) == 0) {
            // Return everything after the cookies name
            return cookie.substring(name.length, cookie.length);
        }
    }

    // console.log("Cookie not found. Creating one.")

    return createEmptyBasketCookie();;
}

function getBasketCookie() {
    var basketCookieStr=getCookie(basketCookieName);
    return JSON.parse(basketCookieStr);
}

function createEmptyBasketCookie() {
    var emptyCookie = {
        "items": []
    }

    // console.log("Created cookie: " + JSON.stringify(emptyCookie))

    return emptyCookie;
}

function addItemToBasketCookie(itemId) {
    changeBasketItemCookie(itemId, +1);
}

function removeFromBasketItemCookie(itemId) {
    changeBasketItemCookie(itemId, -1);
    if(getCountOfItem(itemId) == 0) {
        removeFromBasketCookie(itemId);
    }
}

function removeFromBasketCookie(itemId) {
    var basketCookie = getBasketCookie();
    var basketCookieItemList = basketCookie.items;
    var index=0;
    for(var i = 0; i < basketCookieItemList.length; i++) {
        if( basketCookieItemList[i].itemId === itemId) {
            index = i;
            break;
        }
    }

    basketCookie.items.splice(i, 1);

    document.cookie = basketCookieName + "=" + encodeURIComponent(JSON.stringify(basketCookie));
}

function changeBasketItemCookie(itemId, diff) {
    // console.log("Adding item with id(" + itemId + ") to basket cookie.")
    var basketCookie = getBasketCookie();
    // console.log("Parsed basket cookie: " + basketCookie);
    var basketCookieItemList = basketCookie.items;
    // console.log("Parsed basket item list: " + basketCookieItemList);
    const filteredList = basketCookieItemList.filter(items => items.itemId === itemId);
    // console.log("Filtered list of basked items for item id (" + itemId + "): " + filteredList);
    if(filteredList.length == 1) {
        // console.log("Filtered list is length of 1. ItemID: (" + filteredList[0].itemId + ") and itemCount: (" + filteredList[0].itemCount + ")");
        // console.log("Increasing count.");
        if(filteredList[0].itemCount == 0 && diff < 0) {
            return;
        }
        filteredList[0].itemCount += diff;
        // console.log("After increase: ItemID: (" + filteredList[0].itemId + ") and itemCount: (" + filteredList[0].itemCount + ")");
    } else if (diff > 0) {
        // console.log("Seems item not found.");
        var newElem = {"itemId": itemId, "itemCount": 1};
        // console.log("Created elem: " + JSON.stringify(newElem));
        basketCookie.items.push(newElem);
    }

    // console.log("Basket cookie after increase: " + JSON.stringify(basketCookie));
    var maxAgeDays = 7;
    var secondsADay = 86400;
    document.cookie = basketCookieName + "=" + encodeURIComponent(JSON.stringify(basketCookie)) + "; max-age=" + (maxAgeDays * secondsADay) + "; path=/;";
    // console.log("Total item count after change: " + getItemCount());
    setItemCount(itemId);
}

function getCountOfItem(itemId) {
    var basketCookie = getBasketCookie();
    var basketCookieItemList = basketCookie.items;
    const filteredList = basketCookieItemList.filter(items => items.itemId === itemId);
    if(filteredList.length == 1) {
        return filteredList[0].itemCount;
    }

    return 0;
}

function getItemCount() {
    var basketCookie = getBasketCookie();
    var basketCookieItemList = basketCookie.items;
    const initialCount = 0;
    const itemCount = basketCookieItemList.reduce((prevVal, curVal) => prevVal + curVal.itemCount, initialCount);
    return itemCount;
}

function setBasketItemCount() {
    var counterSpan = document.getElementById('cart-counter');
    if(counterSpan != null) {
        counterSpan.innerText = counterSpan.textContent = getItemCount().toString();
    }

    displayCartCountDependentElements(getItemCount());
}

function setItemCount(itemId) {
    // console.log("Setting item count for id: (" + 'item' + itemId + ") to itemCount: (" + getCountOfItem(itemId).toString() + ")");

    const count_elems = new Array('item' + itemId, 'itempopup' + itemId );
    count_elems.forEach(elem => {
        var itemSpan = document.getElementById(elem);
        if(itemSpan != null) {
            itemSpan.innerText = itemSpan.textContent = getCountOfItem(itemId).toString();
        }
    })
}

// Update all the visible items' count
function setAllItemCount() {
    var basketCookie = getBasketCookie();
    var basketCookieItemList = basketCookie.items;

    basketCookieItemList.forEach(item => setItemCount(item.itemId));
}


function displayCartCountDependentElements(cartCount) {
    Array.from(document.getElementsByClassName('cart-count-dependent-visibility')).forEach(elem => {
        if(cartCount > 0) {
            elem.classList.remove('invisible');
        } else {
            elem.classList.add('invisible');
        }
    });

    Array.from(document.getElementsByClassName('cart-count-dependent-enable')).forEach(elem => {

        if(cartCount > 0) {
            elem.style.pointerEvents = "auto";
        } else {
            elem.style.pointerEvents = "none";
        }
    });
}