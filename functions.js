	function DrawBoard()
	{
		for(var i=3;i<20;i++)
		{
			for(var o=0;o<10;o++)
			{
				//Check lose
				if(i==2&&board[i][o] == 8)
				{
					clearInterval(up);
					document.write('<center><h1>Game Over</h1></br><h2>Your score: '+score+'</h2><a href="tetris.html">Refresh</a></center>');
					return;
				}
				if(board[i][o] != 0)
				{
					document.getElementById(i+"k"+o).style.backgroundColor = colors[board[i][o]-1];
				}
				else
				{
					document.getElementById(i+"k"+o).style.backgroundColor = "lightgray";
				}
				//Anti gpx glitch
				if(i==0)
				{
					document.getElementById(i+"k"+o).style.backgroundColor = "lightgray";
				}
			}
		}
		
	}
	
	function CanPlace(myBoard, myPiece, x, y)
	{
		dim = myPiece.length;
		for(var py = 0; py < dim; py++)
		{
			for(var px = 0; px < dim; px++)
			{
				var coordx = x + px;
				var coordy = y + py;
				if (myPiece[py][px] !=0)
				{
					if (coordx < 0 || coordx >= 10)
					{
						return placeStates.offscreen;
					}
					if (coordy >= 20 || myBoard[coordy][coordx] == 8)
					{
						return placeStates.blocked;
					}
				}
			}
		}
		return placeStates.canPlace;
	}
	
	function removeLines()
	{
		var lines=0;
		for (var y = 19; y >= 0; y--)
		{
			var isComplete = true;
			for (var x = 0; x < 10; x++)
			{
				if (board[y][x] != 8)
				{
					isComplete = false;
				}
			}
			if (isComplete)
			{
				for (var yc = y; yc > 0; yc--)
				{
					for (var x = 0; x < 10; x++)
					{
						board[yc][x] = board[yc - 1][x];
					}
				}
				y++;
				lines++;
			}
		}
		switch (lines)
		{
			case 0:
				break;
			case 1:
				UpdateScore(100);	
				break;			
			case 2:
				UpdateScore(400);
				break;
			case 3:
				UpdateScore(900);
				break;
			case 4:
				UpdateScore(1600);
				break;
		}
			
	}
	
	function Rotate(myPiece)
	{
		dim = piece.length;
		var npiece = new Array(dim);
		for (var u = 0; u < dim; u++) 
		{
			npiece[u] = new Array(dim);
		}
		for (var i = 0; i < dim; i++)
		{
			for (var j = 0; j < dim; j++)
			{
				if(board[j+YPos][i+XPos]!=0&&board[j+YPos][i+XPos]!=8)
				{
					board[j+YPos][i+XPos]=0;
				}
				npiece[j][i] = piece[dim - 1 - i][j];
			}
		}
		DrawBoard();
		return npiece;
	}
	
	function UpdateScore(myScore)
	{
		score+=myScore;
		document.getElementById("score").innerHTML=""+score;
	}
	
	function RandomBlock()
	{
		piece = new Array(4);
		for (var i = 0; i < 4; i++) 
		{
			piece[i] = new Array(4);
		}
		//first move
		if(rand==-1)
		{
			rand = Math.floor(Math.random() * listOfBlocks.length); //firstblock
			rand2 = Math.floor(Math.random() * listOfBlocks.length); //nextblock
		}
		else
		{
			rand = rand2; //past nextblock to currentblock
			rand2 = Math.floor(Math.random() * listOfBlocks.length); //nextblock
		}
		piece = listOfBlocks[rand];
		dim = piece.length;
		

		for (var y = 0; y < dim; y++)
		{
			for (var x = 0; x < dim; x++)
			{
				//board[y][x+3] = piece[y][x];
			}
		}
		
		piece2 = listOfBlocks[rand2];
		dim2 = piece2.length;
		for (var y = 0; y < 4; y++)
		{
			for (var x = 0; x < 4; x++)
			{
				document.getElementById(y+"p"+x).style.backgroundColor = "lightgray";
				if(y < dim2 && x < dim2)
					if(piece2[y][x]!=0)
						document.getElementById(y+"p"+x).style.backgroundColor = colors[piece2[y][x]-1];
					
			}
		}

		//reset pos
		YPos=0;
		XPos=3;
	}
		
	function Move (direction)
	{
		lastMoveX+=direction;
		dim=piece.length;
		for (var j = 0; j < dim; j++)
		{
			for (var i = 0; i < dim; i++)
			{
				if(piece[j][i]!=0&&piece[j][i]!=8)
				{
					board[j+YPos][i+XPos]=0;
				}
			}
		}
		XPos+=direction;
		for (var j = 0; j < dim; j++)
		{
			for (var i = 0; i < dim; i++)
			{
				if(piece[j][i]!=0&&piece[j][i]!=8)
				{
					board[j+YPos][i+XPos]=0;
				}
				if(piece[j][i]!=0)
					board[j+YPos][i+XPos] = piece[j][i];
			}
		}
		DrawBoard();
	}
	
	function Check(e) 
	{
		var code = e.keyCode;
		switch (code) 
		{
			case 37:
				if(CanPlace(board, piece, XPos-1, YPos)==0)
				{
					Move(-1);
				}
				break; //Left key
			
			case 38: 
				dim = piece.length;
				var npiece = new Array(dim);
				for (var u = 0; u < dim; u++) 
				{
					npiece[u] = new Array(dim);
				}
				npiece = Rotate(piece); 
				if(CanPlace(board, npiece, XPos, YPos)==0)
				{
					piece=npiece;
				}
				DrawBoard();
				break; //Up key
			
			case 39: 
				if(CanPlace(board, piece, XPos+1, YPos)==0)
				{
					Move(1);
				}
				break; //Right key
			
		}
	}
		
	function Update()
	{
		DrawBoard();
		if(CanPlace(board,piece,XPos,YPos+1)==0)
		{
			for (var y = 0; y < dim; y++)
			{
				for (var x = 0; x < dim; x++)
				{
					if(piece[y][x]!=0)
						board[y+lastMoveY][x+lastMoveX] = 0;
				}
			}
			YPos++;
			for (var y = 0; y < dim; y++)
			{
				for (var x = 0; x < dim; x++)
				{
					if(piece[y][x]!=0)
						board[y+YPos][x+XPos] = piece[y][x];
				}
			}
			lastMoveX=XPos;
			lastMoveY=YPos;
		}
		else if(CanPlace(board,piece,XPos,YPos+1)==1)
		{
			for (var y = 0; y < dim; y++)
			{
				for (var x = 0; x < dim; x++)
				{
					if(piece[y][x]!=0)
						board[y+YPos][x+XPos] = 8;
					
					lastMoveY=0;
					lastMoveX=0;
				}
			}
			removeLines();
			RandomBlock();
		}
		DrawBoard();
	}
