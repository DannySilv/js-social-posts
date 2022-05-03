// **Milestone 1** - Creiamo il nostro array di oggetti che rappresentano ciascun post (come da esempio).
// Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
// - id del post, numero progressivo da 1 a n
// - nome autore,
// - foto autore,
// - data in formato americano (mm-gg-yyyy: es 05-03-2022),
// - testo del post,
// - immagine (non tutti i post devono avere una immagine),
// - numero di likes.
// *Non è necessario creare date casuali*
// *Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)*
// **Milestone 2** - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
// **Milestone 3** - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
// ****BONUS**

//  1. Formattare le date in formato italiano (gg/mm/aaaa)
//  2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Olga Demina > OD).
//  3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

// MILESTONE 1
const posts = [
    {
        id : 1,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/300?image=171",
        author: {
            name: "Phil Mangione",
            image: "https://unsplash.it/300/300?image=15"
        },
        likes: 78,
        created: "25/06/2021"
    },
    {
        id : 2,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/300?image=174",
        author: {
            name: "Joe Perdipelo",
            image: "https://unsplash.it/300/300?image=348"
        },
        likes: 54,
        created: "07/01/2022"
    },
    {
        id : 3,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/300?image=253",
        author: {
            name: "Roberto Rollon",
            image: "https://unsplash.it/300/300?image=506"
        },
        likes: 37,
        created: "27/12/2021"
    },
    {
        id : 4,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/300?image=789",
        author: {
            name: "Erik Laravel",
            image: "https://unsplash.it/300/300?image=567"
        },
        likes: 112,
        created: "19/03/2022"
    },
    {
        id : 5,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/300?image=162",
        author: {
            name: "Baba Bassotuba",
            image: "https://unsplash.it/300/300?image=420"
        },
        likes: 420,
        created: "16/04/2022"
    },   
];

// MILESTONE 2
const postContainer = document.querySelector(".posts-list");
let postsLiked = []; // -> FOR MILESTONE 3

posts.forEach((element) => { 
    postContainer.append(genPost(element));
});

// FUNCTION-1 POST-GENERATOR (FOR MILESTONE 2)
/**
 * Description -> It generates the post in HTML
 * @param {any} element -> Input the element for which we are generating a post
 * @returns {any} -> The post
 */
function genPost(element) {
    const post = document.createElement("div")
    post.classList.add("post");

    const postHeader = document.createElement("div");
    postHeader.classList.add("post__header");
    postHeader.innerHTML = `
    <div class="post-meta">                    
        <div class="post-meta__icon">
            <img class="profile-pic" src="${element.author.image}" alt="${element.author.name}">                    
        </div>
        <div class="post-meta__data">
            <div class="post-meta__author">${element.author.name}</div>
            <div class="post-meta__time">${element.created}</div>
        </div>                    
    </div>`
    post.append(postHeader);

    const postText = document.createElement("div");
    postText.classList.add("post__text");
    postText.textContent = element.content;
    post.append(postText);

    const postImage = document.createElement("div");
    postImage.classList.add("post__image");
    postImage.innerHTML = `
    <img src="${element.media}" alt="">`
    post.append(postImage);
    
    const postFooter = document.createElement("div");
    postFooter.classList.add("post__footer")
    postFooter.innerHTML = `
    <div class="likes js-likes">
        <div class="likes__cta">
            <a class="like-button  js-like-button" href="#" data-postid="${element.id}">
                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                <span class="like-button__label">Mi Piace</span>
            </a>
        </div>
        <div class="likes__counter">
            Piace a <b id="like-counter-${element.id}" class="js-likes-counter">${element.likes}</b> persone
        </div>
    </div>`

    postFooter.querySelector(".like-button").addEventListener("click", likeBtn)
    post.append(postFooter);

    return post;
};

// MILESTONE 3
/**
 * Description -> It changes the "Mi piace" button color and increase the likes counter if clicked, and it push the liked elements in the "postsLiked" array. If clicked again it return to default.  
 * @param {any} event -> The event that starts this function
 * @returns {any}
 */
function likeBtn(event) {
    event.preventDefault();
    const thisPost = parseInt(this.dataset.postid);
    const likeCounter = document.getElementById(`like-counter-${thisPost}`);
    if (!postsLiked.includes(thisPost)) {
        this.classList.add("like-button--liked");
        postsLiked.push(thisPost);
        likeCounter.textContent = parseInt(likeCounter.textContent) + 1;
    // BONUS 3
    } else {
        this.classList.remove("like-button--liked");
        postsLiked = postsLiked.filter(element => element !== thisPost);
        likeCounter.textContent = parseInt(likeCounter.textContent) - 1;
    }
    console.log(postsLiked);
}


