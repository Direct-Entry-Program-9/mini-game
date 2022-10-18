const imgUrls = [
    'img/background.png',
    'img/Tile (1).png',
    'img/Tile (2).png',
    'img/Tile (3).png',
    'img/ArrowSign.png',
    'img/background.png'
];
for(let i = 1; i <= 10; i++){
    imgUrls.push(`img/adventure_girl/png/Idle (${i}).png`);
    imgUrls.push(`img/adventure_girl/png/Jump (${i}).png`);
    if (i <= 8)
    imgUrls.push(`img/adventure_girl/png/Run (${i}).png`);
}

const progress = document.getElementById('progress');
progress.style.width = `0`;
let loaded = 0;

imgUrls.forEach((url) => {
    const img = new Image();
    img.addEventListener('load', () => {
        loaded++;
        progress.style.width = `${Math.ceil(loaded / imgUrls.length * 100)}%`;
        if (loaded === imgUrls.length)
        setTimeout(()=> document.getElementById('overlay').remove(), 500);
    });
    img.src = url;
});

const player = document.getElementById('player');
const ground = document.getElementById('ground');
let dx = 0;
let dy = 2;
let acceleration = 0.3;
let fire = false;
let index = 1;

const draw = ()=> {
    if (dy !== 0){
        player.style.backgroundImage = `url('img/adventure_girl/png/Jump (${index++}).png')`;
    } else if (dy === 0 && dx !== 0){
        player.style.backgroundImage = `url('img/adventure_girl/png/Run (${index++}).png')`;
    }else{
        if (!fire){
            player.style.backgroundImage = `url('img/adventure_girl/png/Idle (${index++}).png')`;
        }else{
            player.style.backgroundImage = `url('img/adventure_girl/png/Shoot (${index++}).png')`;
        }
    }
    if (index > 3 && fire) index = 1;
    if (index > 8 && dx !== 0){
        index = 1;
    }
    if (index > 10){
        if (dy !== 0){
            index = 10;
        }else{
            index = 1;
        }
    } 
    requestAnimationFrame(draw);
}

const animate = () => {
    if ((player.offsetLeft + player.offsetWidth ) > innerWidth) {
        dx = 0;
        player.style.left = `${innerWidth - player.offsetWidth}px`;
    } else if (player.offsetLeft < 0)    {
        dx = 0;
        player.style.left = '0';
    }
    dy += acceleration;
    if ((player.offsetTop + player.offsetHeight) > ground.offsetTop){
        dy = 0;
        player.style.top = `${ground.offsetTop - player.offsetHeight}px`;
        acceleration = 0;
    }
    player.style.left = `${player.offsetLeft + dx}px`;   
    player.style.top = `${player.offsetTop + dy}px`;   
    requestAnimationFrame(animate);
}

addEventListener('keydown', ({ key }) => {
    if (key === 'ArrowRight') {
        index = 1;
        player.classList.remove('turn');
        dx = 10;
    } else if (key === 'ArrowLeft') {
        index = 1;
        player.classList.add('turn');
        dx = -10;
    } else if (key === "f"){
        fire = true;
    }
});

addEventListener('keypress', ({key}) => {
    if (key === ' ' && dy === 0){
        index = 1;
        dy = -10;
        acceleration = 0.3;
    }
});

addEventListener('keyup', ({ key }) => {
    if (key === 'ArrowRight' || key === 'ArrowLeft') {
        dx = 0;
    }else if (key === "f"){
        fire = false;
    }
});

requestAnimationFrame(draw);
requestAnimationFrame(animate);

// let j = 0;
// let t1 = 0;
// const interval = 2;

// function repaint(timestamp){
//     if (!t1) t1 = timestamp;
//     const diff = timestamp - t1;
//     if (diff >= (interval * 1000)) {
//         t1 = timestamp;
//         console.log('Painted: ' + j++);
//     }
//     requestAnimationFrame(repaint);
// }

// requestAnimationFrame(repaint);