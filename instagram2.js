console.log("js2 연결완료")

const logo = document.querySelector('.logo');
const iconList = document.querySelector('.icon-list');
const sideMenu = document.querySelector('.side-menu');
const storyModal = document.querySelector(".story-modal");
const storyImage = document.querySelector('.story-image');
let sideMenuopened = false;

logo.addEventListener('click', () => {
    location.reload();
})

// 대부분의 브라우저는 이벤트 버블링을 활용한다. 자식 엘리먼트의 이벤트리스너가 먼저 실행되고 부모 엘리먼트의 이벤트리스너가 나중에 실행된다. 하위에서 상위로 퍼저냐가는 방식이다.
// 반대로 이벤트 캡처링은 상위 엘리먼트의 이벤트 리스너를 먼저 실행한다. 따라서 useCapture=true를 추가한다면 이벤트캡처링을 사용할 수 있고 document의 eventlistner를 먼저 처리할 수 있는 셈이다.
// 아니면 조건문에 넣어주어도 된다. 근데 너무 무섭다이거
document.addEventListener('click', (event) => {
    if (sideMenuopened && !sideMenu.contains(event.target)) {
        console.log('doc: disappear event happen')
        sideMenu.style.animation = "myDisappear 1s ease-out forwards";
        sideMenuopened = false;
    }
}, true);


iconList.addEventListener('click', () => {
    if (sideMenuopened === false) {
        sideMenu.style.display = "block";
        sideMenu.style.animation = "mySlide 1s ease-out forwards";
        sideMenuopened = true;
        console.log('icon: appear event happen')
    } else {
        sideMenu.style.animation = "myDisappear 1s ease-out forwards";
        sideMenuopened = false;
        console.log('icon: disappear event happen')
    }
})



storyModal.addEventListener("click", (e) => {
    const evTarget = e.target;
    if (evTarget.classList.contains("story-modal")) {
        storyModal.style.display = "none";
    }
})

const emojisDiv = document.getElementById("emojis");
const emojis = [ "⭐️", "🚀", "🌼", "🦁", "😁", "😀", "😃", "🤣", "😍", "🥰", "🥸", "😶‍🌫️", "🤩", "🥳", "🤬", "👾", "🦾", "🫶", "👳‍♀️", "😯", "🧛‍♀️", "💋"];
emojis.forEach((emoji) => {
    const emojiNode = document.createElement("div");
    emojiNode.innerText = emoji;
    emojiNode.className = "emoji"; 
    emojisDiv.appendChild(emojiNode);
    }
);

const allEmojis = document.querySelectorAll(".emoji")

allEmojis.forEach((eachEmoji) => {
    eachEmoji.addEventListener("click", (emo) => {
        commentInput.value += emo.target.innerText;
    })
})

const smile = document.querySelector(".smile");
const emojisContainer = document.querySelector(".emoji-container");

smile.addEventListener("click", () => {
    emojisContainer.style.display = "flex";
   }
);

document.addEventListener("click", (event) => {
    const isClickSmileInside = emojisContainer.contains(event.target) || smile.contains(event.target);
    if (!isClickSmileInside) {
        emojisContainer.style.display = "none";
    }
});
