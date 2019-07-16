(function(){

	let lab = [
	  '111111111111111111111',
	  '100010000010001000001',
	  '111010111010111011101',
	  '100010101000000000101',
	  '101110101010111110111',
	  '100000100010100000101',
	  '101111111110101110101',
	  '101000100000100010001',
	  '111011101110111111111',
	  '100010000010000000001',
	  '101111101010111111101',
	  '100000001010001000001',
	  '111111111111111111111'
	];

	let Lab = document.getElementById('lab');
	let html = '';

	// create maze
	for (let i=0; i < lab.length; i++){
		html += '<p>';
		for(let j=0; j < lab[i].length; j++){
			let c = lab[i][j] === '1' ? ' class="wall"' : '';
			html += `<span${c}></span>`;
		}
		html += '</p>';
	}
	Lab.innerHTML = html;

	setRandomCell('hero');
	setRandomCell('monster');
	setRandomCell('gold');

	const maxY = Lab.children.length - 1;
	const maxX = Lab.children[0].children.length - 1;

	document.getElementById('up').onclick = function(){ goHero('up'); };
	document.getElementById('down').onclick =  function(){ goHero('down'); };
	document.getElementById('left').onclick =  function(){ goHero('left'); };
	document.getElementById('right').onclick =  function(){ goHero('right'); };
	window.addEventListener('keyup', function(event){
		if (event.code === 'ArrowUp'){
			goHero('up');
		}
		if (event.code === 'ArrowDown'){
			goHero('down');
		}
		if (event.code === 'ArrowLeft'){
			goHero('left');
		}
		if (event.code === 'ArrowRight'){
			goHero('right');
		}
	});

	// random start location of hero, monster or beer 
	function setRandomCell(who){
		let spans = Lab.querySelectorAll('span');
		while (1) {
			let i = random(spans.length);
			if (spans[i].classList.length === 0){
				spans[i].classList.add(who);	
				break;
			}
		}
	
		function random(max){
			return Math.floor(Math.random() * max);
		}
	}

function goHero(dir){
	let heroSpan = Lab.querySelector('.hero');
	let {x, y} = getCoordinates(heroSpan);

	let targetSpan;
	let maxX = heroSpan.parentElement.children.length - 1;
	let maxY = Lab.children.length - 1;
	if (dir === 'up') {
		if (y === 0) return;
		targetSpan = heroSpan.parentElement.previousElementSibling.children[x];
	}
	if (dir === 'down') {
		if (y === maxY) return;
		targetSpan = heroSpan.parentElement.nextElementSibling.children[x];
	}
	if (dir === 'left') {
		if (x === 0) return;
		targetSpan = heroSpan.previousElementSibling;
	}
	if (dir === 'right') {
		if (x === maxX) return;
		targetSpan = heroSpan.nextElementSibling;
	}
	
	if (targetSpan.classList.contains('wall')) return;
	let isGold = targetSpan.classList.contains('gold');
	let isMonstr = targetSpan.classList.contains('monster');
	if (isGold || isMonstr) {
		alert(isGold ? 'You win!!!\nCongratulations!' : 'Потрачено');
		location.reload();
		return;
	}
	heroSpan.classList.remove('hero');
	targetSpan.classList.add('hero');

}

	function getCoordinates(span){
		let res = { x: 0, y: 0 };
		let prev = span.previousElementSibling;
		while (prev) {
			res.x++;
			prev = prev.previousElementSibling;
		}
		prev = span.parentElement.previousElementSibling;
		while (prev) {
			res.y++;
			prev = prev.previousElementSibling;
		}
		return res;
	}

	function monsterTime(){
		let monsterSpan = Lab.querySelector('.monster');
		let {x, y} = getCoordinates(monsterSpan);
		let route = findHero(x, y, []);
		let targetSpan = Lab.children[route[0][1]].children[route[0][0]];

		if (targetSpan.classList.contains('hero')){
			alert('Потрачено');
			location.reload();
			return;
		}

		monsterSpan.classList.remove('monster');
		targetSpan.classList.add('monster');
	}

	function findHero(x, y, route){
		let arr = arrIn.concat();

		if (y > 0 && canGo(x, y -1, arr)) findHero(x, y - 1, arr); // up
		if (y < maxY && canGo(x, y + 1, route)) findHero(x, y + 1, route); // down
		if (x > 0 && canGo(x - 1, y, route)) findHero(x - 1, y, route); //left
		if (x < maxX && canGo(x + 1, y, route)) findHero(x + 1, y, route); // right

		function canGo(x, y, route){
			let wall = Lab.children[y].children[x].classList.contains('wall');
			let visit = route.some(function(item){
				return item[0] === x && item[1] === y;
			});
			return !wall && !visit;
		}

	}
})();
