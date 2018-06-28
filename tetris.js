	var speed = 200;
	var score=0;
	var board = new Array(20);
	for (var i = 0; i < 20; i++) 
	{
		board[i] = new Array(10);
	}
	
	//Build board normal
	for(var i=0;i<20;i++)
	{
		for(var o=0;o<10;o++)
		{
			board[i][o] = 0;
			if(i<3)
				document.getElementById(i+"k"+o).style.backgroundColor = "gray";
			if(i==2)
				document.getElementById(i+"k"+o).style.borderBottom = "1px solid #f00";
			if(i==3)
				document.getElementById(i+"k"+o).style.borderTop = "1px solid #f00";
		}
	}


	var rand=-1;
	var rand2;
	var piece = new Array(4);
	for (var i = 0; i < 4; i++) 
	{
		piece[i] = new Array(4);
	}
	
	var piece2 = new Array(4);
	for (var i = 0; i < 4; i++) 
	{
		piece2[i] = new Array(4);
	}
	
	var dim;
	var dim2;
	var YPos=0;
	var XPos=0;
	
	var placeStates = Object.freeze({"canPlace":0, "blocked":1, "offscreen":2})
	var lastMoveY=0;
	var lastMoveX=0;
	var up=setInterval(Update, speed);
	RandomBlock();
	DrawBoard();
	
	window.addEventListener('keydown',this.Check,false);
