let solutionCounter;

function nqueens(n, node){
	if(n<3||n>10)
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
