console.log("연결완료")

const useLocalStorage = true;

const story = document.querySelector(".story-modal");
const storyElements = document.querySelectorAll('.story-element');
const profileName = document.getElementById('profile-name');
const profileImage = document.getElementById('profile-image');
const profileModal = document.getElementById('profile-modal');
const profile = document.querySelector(".profile");
const likeCount = document.getElementById('like-count');
const likeBtn = document.getElementById('like-btn');
const likedBtn = document.getElementById('liked-btn');

storyElements.forEach(e => {
    e.addEventListener('click', () => {
      story.style.display = "block"
    })
})

// story.addEventListener('click', () => {
//     story.style.display = "none"
// })

profile.addEventListener('mouseover', () => {
    profileModal.style.display = "block"
})

profile.addEventListener('mouseout', () => {
    profileModal.style.display = "none"
})

// 좋아요를 누르지 않은 상태의 버튼
likeBtn.addEventListener('click', () => {
  likedBtn.style.display = "block";
  likeBtn.style.display = "none";

  const count = likeCount.innerText;
  likeCount.innerText = `${parseInt(count) + 1}`;
})
// count가 innerText로 받아와지는데 이를 int로 만들어주기 위해 parseInt를 써준다.

// 좋아요를 누른 상태의 버튼
likedBtn.addEventListener('click', () => {
  likeBtn.style.display = "block";
  likedBtn.style.display = "none";

  const count = likeCount.innerText;
  likeCount.innerText = `${parseInt(count) - 1}`;
})

const commentsCreateForm = document.querySelector('.comments-create-form');
const commentContainer = document.querySelector('.comments-container');
const commentInput = document.querySelector('.comment-input');

// 댓글을 만드는 로직
// JSON string 을 parse함으로써 javascript array로 바꾸어준다.
// window.localStorage에서 'comments'를 찾아서 갖고와라 없으면 빈 배열로 초기화하자.
const commentsList = JSON.parse(window.localStorage.getItem('comments')) || [];

window.onload = () => {
    if (commentsList.length > 0){
      commentContainer.innerHTML = commentsList.map((comment, index)  => `
        <div class="comment-wrapper">
          <span class="comment">${comment}</span>
          <img id="${index}" class="comment-delete-icon" onclick="deleteComment(${index})" src="./images/close.png" alt="comment" />
        </div>`).reverse().join('');
      }
  }

let commentId = 0;

commentsCreateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const commentText = commentInput.value;
  // !!commentText를 하면 Not을 적용하는게 아니라 empty nonempty를 확인한다. 빈 배열에서 유용하겠지
  if (!commentText) return;

  commentsList.push(commentText);

  if (useLocalStorage){
    const locallyStoredComments = JSON.parse(window.localStorage.getItem('comments')) || [];
    window.localStorage.setItem('comments', JSON.stringify([...locallyStoredComments, commentText]));
  }

  const commentNode = 
  `
    <div class="comment-wrapper">
      <span class="comment">${commentText}</span>
      <img
        id="${commentId}" 
        class="comment-delete-icon" 
        onclick="deleteComment(${commentId})" 
        src="./images/close.png" 
        alt="comment" 
      />
    </div>
  `;
  commentId = commentsList.length;

  // 새로운 댓글이 위에 쌓이는 게 좋다고 생각하기 때문에. commentContainer html코드 안에다 직접 넣어주는 셈
  commentContainer.innerHTML = commentNode + commentContainer.innerHTML;
  // 매번 input창을 비워주는 셈이다.
  commentInput.value = "";
})

const deleteComment = (id) => {
    commentsList.splice(id, 1);
    if (useLocalStorage){
      const locallyStoredComments = JSON.parse(window.localStorage.getItem('comments'));
      locallyStoredComments.splice(id, 1);
      window.localStorage.setItem('comments', JSON.stringify(locallyStoredComments));  
    } // JSON.stringify => array 를 JSONstring으로 바꾸어주는 method
  
  commentContainer.innerHTML = commentsList.map((comment, index)  => `
    <div class="comment-wrapper">
      <span class="comment">${comment}</span>
      <img id="${index}" class="comment-delete-icon" onclick="deleteComment(${index})" src="./images/close.png" alt="comment" />
    </div>`).reverse().join('');
  }

const footer = document.querySelector('.footer-message');
footer.innerText = `Ⓒ ${new Date().getFullYear()} INSTAGRAM FROM META`;