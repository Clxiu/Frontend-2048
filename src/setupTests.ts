// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { isGameOver, generateTile, makeDownMove, makeLeftMove, makeRightMove, makeUpMove,  } from './services/gameLogicService';

describe('board function', () => {
    it('new tile value returns either 2 or 4', () => {
      const gameState = [
        [{ value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }],
      ]; 
      const newBoard = generateTile(gameState);
      let containsOnly24 = true;
      for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
          if (!(newBoard[i][j].value === 0 || newBoard[i][j].value === 1 || newBoard[i][j].value === 2)){
            containsOnly24 = false;
          }
        }
      }
      expect(containsOnly24).toBe(true);
    });
  
    it('moves tiles down', () => {
      const gameState = [
        [{ value: 4, new : false }, { value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 2, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 0, new : false }, { value: 8, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 4, new : false }, { value: 3, new : false }, { value: 0, new : false }],
      ];
      const update = makeDownMove(gameState);
      expect(update[3][0].value).toBe(4);
      expect(update[3][1].value).toBe(4);
      expect(update[2][1].value).toBe(2);
      expect(update[2][2].value).toBe(8);
      expect(update[3][2].value).toBe(3);
  
      // Make sure a new tile is generated.
      //let count = 0;
      //for (let i = 0; i < 4; i++){
        //for (let j = 0; j < 4; j++){
          //if (update[i][j].value !== 0){
            //count ++;
          //}
        //}
      //}
      //expect(count).toBe(6);
    });
  
    it('moves tiles up', () => {
      const gameState = [
        [{ value: 4, new : false }, { value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 2, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 0, new : false }, { value: 8, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 4, new : false }, { value: 3, new : false }, { value: 0, new : false }],
      ];
      const update = makeUpMove(gameState);
      expect(update[0][0].value).toBe(4);
      expect(update[0][1].value).toBe(2);
      expect(update[1][1].value).toBe(4);
      expect(update[0][2].value).toBe(8);
      expect(update[1][2].value).toBe(3);

    });
  
    it('moves tiles left', () => {
      const gameState = [
        [{ value: 4, new : false }, { value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 2, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 0, new : false }, { value: 8, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 4, new : false }, { value: 3, new : false }, { value: 0, new : false }],
      ];
      const update = makeLeftMove(gameState);
      expect(update[0][0].value).toBe(4);
      expect(update[1][0].value).toBe(2);
      expect(update[2][0].value).toBe(8);
      expect(update[3][0].value).toBe(4);
      expect(update[3][1].value).toBe(3);
    });
  
    it('moves tiles right', () => {
      const gameState = [
        [{ value: 4, new : false }, { value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 2, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 0, new : false }, { value: 8, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 4, new : false }, { value: 3, new : false }, { value: 0, new : false }],
      ];
      const update = makeRightMove(gameState);
      expect(update[0][3].value).toBe(4);
      expect(update[1][3].value).toBe(2);
      expect(update[2][3].value).toBe(8);
      expect(update[3][2].value).toBe(4);
      expect(update[3][3].value).toBe(3);
    });
  
    it('merges two tiles of the same value together', () => {
      const gameState = [
        [{ value: 2, new : false }, { value: 2, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 2, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false}, { value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }],
      ];
      const update = makeDownMove(gameState);
      expect(update[3][0].value).toBe(2);
      expect(update[3][1].value).toBe(3);
    });
  
    it("doesn't merge different tiles together", () => {
      const gameState = [
        [{ value: 2, new : false }, { value: 3, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 4, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false}, { value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }],
        [{ value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }, { value: 0, new : false }],
      ];
      const update = makeDownMove(gameState);
      expect(update[3][0].value).toBe(2);
      expect(update[3][1].value).toBe(4);
      expect(update[2][1].value).toBe(3);
    });

    it("game over", () => {
      const gameState = [
        [{ value: 1, new : false }, { value: 4, new : false }, { value: 2, new : false }, { value: 1, new : false }],
        [{ value: 2, new : false }, { value: 1, new : false }, { value: 3, new : false }, { value: 4, new : false }],
        [{ value: 1, new : false }, { value: 4, new : false }, { value: 5, new : false }, { value: 2, new : false }],
        [{ value: 3, new : false }, { value: 2, new : false }, { value: 6, new : false }, { value: 7, new : false }],
      ];
      expect(isGameOver(gameState)).toBe(true);
    });
});