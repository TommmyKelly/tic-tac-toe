document.addEventListener('DOMContentLoaded', ()=>{
    const squares = document.querySelectorAll('.grid div')
    const squares2 = document.querySelectorAll('.grid div')
    const playerDisplay = document.getElementById('player')
    const confettiDisplay = document.getElementById('canvas')
    const grid = document.getElementById('grid')
    const wincombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let currentPlayer = 'playerx'
    

    squares.forEach(square => {
        
        square.addEventListener('click',clickOutcome,{once: true})
    });
    function clickOutcome(e){
        const squareArray = Array.from(squares)
        const index = squareArray.indexOf(e.target)
        
        var player = (currentPlayer == 'playerx') ? "Player O's turn" : "Player X's turn"
        
        playerDisplay.innerHTML = player

        if(currentPlayer === 'playerx'){
            squares[index].classList.add('playerx')
            
            if(checkForWin(currentPlayer)){
               endGame(false)
            }else if (checkForDram()) {endGame(true)}
            currentPlayer = 'playero'
            
        }else {
            squares[index].classList.add('playero')
            
            
            if(checkForWin(currentPlayer)){
               endGame(false)
            }else if(checkForDram()) {endGame(true)}
            currentPlayer = 'playerx'
        }
        
        
    }

    function endGame (draw){
        if(draw){
            playerDisplay.innerHTML = "Draw"
        }else{
            var player = (currentPlayer == 'playerx') ? "Player X" : "Player O"
            playerDisplay.innerHTML = `${player} wins`
            // playerDisplay.style.color = "green"
            confettiDisplay.style.display = "block"
            grid.style.display = "none"
            render()
            squares.forEach(square => {
        
                square.removeEventListener('click',clickOutcome,{once: true})
            });
        }
    }
    
    
    function checkForWin(currentPlayer){
        
       return wincombo.some(combo => {
           return combo.every(index =>{
               return squares[index].classList.contains(currentPlayer)
            
           })
       })
       
    }

    function checkForDram(){
        
        return [...squares].every(square => {
            return square.classList.contains('playerx') || square.classList.contains('playero')

            
        })
        
    }
})


//con

canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	cx = ctx.canvas.width/2;
	cy = ctx.canvas.height/2;

	let confetti = [];
	const confettiCount = 600;
	const gravity = 0.5;
	const terminalVelocity = 5;
	const drag = 0.075;
	const colors = [
	  { front : 'red', back: 'darkred'},
	  { front : 'green', back: 'darkgreen'},
	  { front : 'blue', back: 'darkblue'},
	  { front : 'yellow', back: 'darkyellow'},
	  { front : 'orange', back: 'darkorange'},
	  { front : 'pink', back: 'darkpink'},
	  { front : 'purple', back: 'darkpurple'},
	  { front : 'turquoise', back: 'darkturquoise'},
	];

    initConfetti = () => {
        for (let i = 0; i < confettiCount; i++) {
          confetti.push({
            color      : colors[Math.floor(randomRange(0, colors.length))],
            dimensions : {
              x: randomRange(10, 20),
              y: randomRange(10, 30),
            },
            position   : {
              x: randomRange(0, canvas.width),
              y: canvas.height - 1,
            },
            rotation   : randomRange(0, 2 * Math.PI),
            scale      : {
              x: 1,
              y: 1,
            },
            velocity   : {
              x: randomRange(-25, 25),
              y: randomRange(0, -50),
            },
          });
        }
      }
  
      randomRange = (min, max) => Math.random() * (max - min) + min

      render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        confetti.forEach((confetto, index) => {
          let width = (confetto.dimensions.x * confetto.scale.x);
          let height = (confetto.dimensions.y * confetto.scale.y);
  
          // Move canvas to position and rotate
  
          ctx.translate(confetto.position.x, confetto.position.y);
          ctx.rotate(confetto.rotation);
  
          // Apply forces to velocity
  
          confetto.velocity.x -= confetto.velocity.x * drag;
          confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
          confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
  
          // Set position
  
          confetto.position.x += confetto.velocity.x;
          confetto.position.y += confetto.velocity.y;
  
          // Delete confetti when out of frame
  
          if (confetto.position.y >= canvas.height) confetti.splice(index, 1);
  
          // Loop confetto x position
  
          if (confetto.position.x > canvas.width) confetto.position.x = 0;
          if (confetto.position.x < 0) confetto.position.x = canvas.width;
  
          // Spin confetto by scaling y
  
          confetto.scale.y = Math.cos(confetto.position.y * 0.1);
          ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
  
          // Draw confetto
  
          ctx.fillRect(-width / 2, -height / 2, width, height);
  
          // Reset transform matrix
  
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        });
  
        // Fire off another round of confetti
  
        if (confetti.length <= 10) initConfetti();
  
        window.requestAnimationFrame(render);
      }

      