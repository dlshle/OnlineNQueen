let solutionCounter;

function nqueens(n, node){
	if(n<4||n>50)
		return false;	
	//clear the node
	node.innerHTML = "";
	//reset the solution counter
	solutionCounter = 0;
	//new board
	let board = [];

	for(let i=0;i<n;i++)
		board.push(2*n);

	//solve it!
	solve(board, 0, node);

	//description of the solution
	let result = document.createElement("p");
	result.innerHTML = "Solution for "+n+" queens problem is as follow:<br>There are "+solutionCounter+" solutions.";
	node.insertBefore(result, node.firstChild);
	return true;
}

function solve(board, p, node){
	if(p==board.length){
		solutionCounter++;
		printBoard(board, node);
		return ;
	}
	for(let i=0;i<board.length;i++){
		board[p]=i;
		if(validate(board,p)){
			solve(board, p+1, node);
		}
	}
	board[p]=2*board.length;
}

function printBoard(board, node){
	//print the board using canvas
	let canvas = document.createElement("canvas");
	canvas.width = 320;
	canvas.height = 320;
	let ctx = canvas.getContext("2d");
	let n = board.length;
	let pieceLength = Math.floor(320/n);
	let r = pieceLength/2;
	let cx, cy;

	//draw grid 
	for(let i=pieceLength;i<320;i+=pieceLength){
		ctx.beginPath();
		//horizontal
		ctx.moveTo(0,i);
		ctx.lineTo(320,i);
		ctx.stroke();
		//vertical
		ctx.moveTo(i,0);
		ctx.lineTo(i,320);
		ctx.stroke();
	}
	
	//draw pieces
	for(let i=0;i<n;i++){
		cx = board[i]*pieceLength+r;
		cy = i*pieceLength+r;
		ctx.beginPath();
		ctx.arc(cx,cy,r,0,2*Math.PI,false);
		ctx.fill();
		ctx.stroke();
	}
	node.append(document.createElement("br"));
	node.append(document.createElement("hr"));
	node.append(canvas);
}

function validate(board, p){
	//up-down
	for(let i=0;i<board.length;i++){
		if(i==p)
			continue;
		if(board[i]==board[p])
			return false;
	}

	//diagnoal
	for(let i=0;i<p;i++){
		if(board[i]==(board[p]+(p-i))||board[i]==(board[p]-(p-i)))
			return false;
	}
	for(let i=p+1;i<board.length;i++){
		if(board[i]==(board[p]+(i-p))||board[i]==(board[p]-(i-p)))
			return false;
	}

	return true;
}

/*
 * Genetic algorithm solver of the n queen problem
 * USE insertSample only!
 * sample = {sample:sample, fitness:fitness}
 */
function gaSolver(boardSize){
	//original population
	let population = generateSamples(10, boardSize);

	//TODO:choose best n samples and cross-over

	//TODO:randomly choose n of the cross-overed sample and mutate them randomly
	
}

function generateSamples(n, size){
	let population = [];
	while(set.size<n){
		let sample = generateRandList(size);
		let fitness = getFitness(sample);
		insertSample({sample:sample, fitness:fitness});
	}
	return population;
}

function insertSample(sample, list){
	list.push(sample);
	let i = list.length-1;
	while(i>0){
		if(list[i].fitness>list[i-1].fitness){
			let temp = list[i];
			list[i] = list[i-1];
			list[i-1] = temp;
		}
		i--;
	}
}

function generateRandNumber(low, high){
	return Math.floor(Math.random() *high)+low;
}

function generateRandList(len){
	let list = [];
	for(let i=0;i<len;i++)
		list.push(generateRandNumber(0, len-1);
	return list;
}

/*
 * getFitness calculates number of conflictions
 * fitness = board_size*board_size - #conflictions
 */
function getFitness(sample){
	return getNumConflictionsOnBoard(sample)/(sample.length*sample.length);
}

function getNumConflictionsOnBoard(board){
	let result = 0;
	for(let i=0;i<borad.length;i++){
		result+=getNumberConflictions(board, i);
	}
	return result;
}

function getNumConflictions(board, p){
	let result = 0;
	//up-down
	for(let i=0;i<board.length;i++){
		if(i==p)
			continue;
		if(board[i]==board[p])
			result++;
	}

	//diagnoal
	for(let i=0;i<p;i++){
		if(board[i]==(board[p]+(p-i))||board[i]==(board[p]-(p-i)))
			result++;
	}
	for(let i=p+1;i<board.length;i++){
		if(board[i]==(board[p]+(i-p))||board[i]==(board[p]-(i-p)))
			result++;
	}

	return result;
}

function crossOver(sample0, sample1){
	//TODO:randomly choose a position and intersect two samples to generate one new sample
	//123|456789 & 987|654321 => 123654321
}

function getMutatedSample(sample){
	//TODO:randomly choose one position and assign a random number to that position
}
