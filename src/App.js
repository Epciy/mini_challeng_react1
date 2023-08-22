
import React,{useState,useEffect} from 'react';
import './App.css';
import Box from './components/Box'
const gridSize=6;

export default function App (){
  const [tiles,setTiles]=useState([])
  const [selectedTiles,setSelectedTiles]=useState([])
  const [matchedPairs,setMatchedPairs]=useState(0);
  const [lockBoard,setLockBoard]=useState(false);

  useEffect(()=>{
    initializeGame();
  },[])
  const initializeGame=()=>{
    const numbers= Array.from({length:gridSize*gridSize/2},(_,index)=>index+1)
    const shuffleNumbers=[...numbers,...numbers].sort(()=> Math.random()-0.5);
    setTiles(shuffleNumbers.map((number,index)=>({id:index,number,flipped:false,matched:false})));
    setMatchedPairs(0)
  }

  const handleTileClick=(tile)=>{
    if (lockBoard || tile.flipped || selectedTiles.length===2) return ;
    const updatedTiles=tiles.map((t)=>(t.id===tile.id?{...t,flipped:true}:t));
    setTiles(updatedTiles)
    setSelectedTiles([...selectedTiles,tile]);

    if (selectedTiles.length===1){
      if (selectedTiles[0].number===tile.number){
        setMatchedPairs(matchedPairs + 1);
        setSelectedTiles([]);
      }else{
        setLockBoard(true);
        setTimeout(()=>{
          flipBack(selectedTiles[0],tile);
        },1000);
      }
    }

  }
  const flipBack=(tile1,tile2)=>{
    const updatedTiles=tiles.map((tile)=>
      tile.id===tile1.id || tile.id===tile2.id ? {...tile,flipped:false} :tile
    )

    setTiles(updatedTiles);
    setSelectedTiles([]);
    setLockBoard(false);
  }

  useEffect(()=>{
    if (matchedPairs===gridSize*gridSize/2){
       
      setTimeout(()=>{
        initializeGame();
      },5000);

    }
  },[matchedPairs])
  return (
    <div className="App">
     <h1> Memory Game </h1>
     <Box  tiles={tiles} handleTileClick={handleTileClick}/>
     {matchedPairs === gridSize * gridSize / 2 && <div className="message">Congratulations! You won!</div>}
    </div>)

}